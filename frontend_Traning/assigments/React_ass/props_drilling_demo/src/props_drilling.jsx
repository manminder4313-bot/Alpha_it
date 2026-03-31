import React, { useState } from 'react';

// Task 5 - Passing Components as Props
const DisplayMessage = ({ messageComponent }) => {
    console.log('Rendering DisplayMessage');
    return (
        <div style={{ border: '2px solid purple', padding: '15px', margin: '15px', borderRadius: '5px' }}>
            <h3>Message Display Area</h3>
            {messageComponent}
        </div>
    );
};

// Task 4 - AddStudent (Sibling to StudentList)
const AddStudent = ({ onAddStudent }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('AddStudent: Submitting new student ->', { name, age });

        // Pass data up to parent (App)
        onAddStudent({ id: Date.now(), name, age: parseInt(age, 10), rating: 0 });

        setName('');
        setAge('');
    };

    return (
        <div style={{ border: '2px solid green', padding: '15px', margin: '15px', borderRadius: '5px' }}>
            <h3>Add New Student </h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit" style={{ padding: '5px 10px' }}>Add Student</button>
            </form>
        </div>
    );
};

// Task 2, 6 - Grandchild Component receiving props and returning data via callback
const StudentDetails = ({ student, onRateStudent }) => {
    console.log(`Rendering StudentDetails for ${student.name}`);

    const handleRate = (newRating) => {
        console.log(`StudentDetails: Rating ${student.name} with ${newRating} stars`);
        // Task 6: Function passed as props (Grandchild -> Parent)
        onRateStudent(student.id, newRating);
    };

    return (
        <div style={{ border: '2px dashed gray', padding: '10px', marginTop: '10px', backgroundColor: '#f9f9f9' }}>
            <h5>Details for {student.name} (StudentDetails)</h5>
            <p>Current Rating: {student.rating || 0} ⭐</p>
            <button onClick={() => handleRate((student.rating || 0) + 1)} disabled={student.rating >= 5} style={{ padding: '5px 10px' }}>
                    Increase Rating
            </button>
            <button onClick={() => handleRate((student.rating || 0) - 1)} disabled={student.rating <= 0} style={{ padding: '5px 10px' }}>
                Decrease Rating
            </button>
        </div>
    );
};

// Task 1, 2, 3 - Receiving mapped data, passing to grandchild, and callback to app
const StudentItem = ({ name, age, student, onDelete, onRateStudent }) => {
    console.log(`Rendering StudentItem for ${name}`);

    const handleDelete = () => {
        console.log(`StudentItem: Requesting deletion for ${name} (ID: ${student.id})`);
        // Task 3: Child -> Parent (Callback)
        onDelete(student.id);
    };

    return (
        <div style={{ border: '2px solid blue', padding: '15px', margin: '10px', borderRadius: '5px' }}>
            {/* Task 1: Basic Props usage */}
            <h4>{name} - Age: {age} (StudentItem)</h4>
            <button onClick={handleDelete} style={{ color: 'red', padding: '5px 10px' }}>Delete Student</button>

            {/* Task 2: Props Drilling (passing student object to grandchild) */}
            <StudentDetails student={student} onRateStudent={onRateStudent} />
        </div>
    );
};

// Task 2 - Props Drilling passing down array items
const StudentList = ({ students, onDeleteStudent, onRateStudent }) => {
    console.log('Rendering StudentList');
    return (
        <div style={{ border: '2px solid red', padding: '15px', margin: '15px', borderRadius: '5px' }}>
            <h2>Student List (StudentList)</h2>
            {students.length === 0 ? <p>No students available.</p> : null}

            {students.map((student) => (
                <StudentItem
                    key={student.id}
                    name={student.name}             // Task 1: Basic Props (Parent -> Child)
                    age={student.age}               // Task 1: Basic Props
                    student={student}               // Task 2: Props Drilling (passing object for grandchild)
                    onDelete={onDeleteStudent}      // Task 3: Callback for child
                    onRateStudent={onRateStudent}   // Task 6: Callback passed down to grandchild
                />
            ))}
        </div>
    );
};

const App = () => {
    console.log('============================');
    console.log('Rendering App component');

    const [students, setStudents] = useState([
        { id: 1, name: 'Alice', age: 20, rating: 5 },
        { id: 2, name: 'Bob', age: 22, rating: 4 }
    ]);

    // Task 4: Sibling -> Sibling (AddStudent calls this, updates state, passes to StudentList)
    const handleAddStudent = (newStudent) => {
        console.log('App: Received new student from AddStudent:', newStudent);
        setStudents([...students, newStudent]);
    };

    // Task 3: Child -> Parent (StudentItem calls this to delete a student)
    const handleDeleteStudent = (id) => {
        console.log('App: Deleting student with ID:', id);
        setStudents(students.filter(student => student.id !== id));
    };

    // Task 6: Grandchild -> Parent (StudentDetails calls this to update rating)
    const handleRateStudent = (id, newRating) => {
        console.log(`App: Rating updated for student ID ${id} to ${newRating}`);
        setStudents(students.map(student =>
            student.id === id ? { ...student, rating: newRating } : student
        ));
    };

    // Task 5: Component passed as prop
    const WelcomeMessage = <strong>Welcome to the Props Drilling Assignment! (Passed as a Prop)</strong>;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Props Drilling Assignment (App Component)</h1>
            <p>Check the browser console to see the data flow logs!</p>

            {/* Task 5: Component as prop */}
            <DisplayMessage messageComponent={WelcomeMessage} />

            {/* Task 4: Sibling sending data upwards */}
            <AddStudent onAddStudent={handleAddStudent} />

            {/* Task 1, 2, 3, 6 context passed through here */}
            <StudentList
                students={students}
                onDeleteStudent={handleDeleteStudent}
                onRateStudent={handleRateStudent}
            />
        </div>
    );
};

export default App;
