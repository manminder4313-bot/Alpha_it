import React from 'react'
import Student from './components/Student'

function App() {
  return (
    <div>
      <h1>Props Example</h1>
      <Student  name="Manminder singh" age={23} />
      <Student  name="Keshav" age={26} />
      <Student  name="Sandeep singh" age={23} />
      <Student  name="Pramjit singh" age={23} />
    </div>
  );
}
export default App;
