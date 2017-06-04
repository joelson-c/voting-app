import React from 'react'

export default ({ text, children, className = '', textClass = 'black-text', actions = null }) => (
  <div className={`card ${className}`}>
    <div className={`card-content ${textClass}`}>
      {children}
    </div>
    {actions !== null &&
    <div className='card-action'>
      {React.Children.toArray(actions)}
    </div>
    }
  </div>
)
