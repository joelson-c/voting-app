import React from 'react'

export default ({ children }) => (
  <div className='fixed-action-btn horizontal'>
    <a className='btn-floating btn-large waves-effect waves-light red'>
      <i className='material-icons'>menu</i>
    </a>

    <ul>
      {React.Children.map(children, (child, i) => (
        <li>
          {child}
        </li>
      ))}
    </ul>
  </div>
)
