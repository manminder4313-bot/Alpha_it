import { useState} from 'react'

function UseState() {
  const [count, setCount] = useState("maan");

  console.log("component rendered .Count is :", count);

  return (
    <div>
        <h2>useState Hook</h2>
      <p>count:{count}</p>
      <button onClick={() => setCount(count + 10)}>
        Increment
      </button>
    </div>
  )
}

export default UseState
