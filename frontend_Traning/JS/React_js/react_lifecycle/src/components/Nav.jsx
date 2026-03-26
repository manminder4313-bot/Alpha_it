import React from 'react'
import Lifecycle from './lifecycle';
import about from './about';
import Home from
function Nav() {
  return (
    <div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
