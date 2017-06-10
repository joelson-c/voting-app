import Link from 'next/link'
import NavbarBase from './base'

export default () => (
  <NavbarBase>
    <div>
      <ul className='right hide-on-med-and-down'>
        <li><Link href='/login'><a>Login</a></Link></li>
      </ul>

      <ul className='side-nav' id='mobile-nav'>
        <li><Link href='/login'><a>Login</a></Link></li>
      </ul>
    </div>
  </NavbarBase>
)
