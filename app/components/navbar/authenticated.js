import Link from 'next/link'

import NavbarBase from './base'

export default () => {
  const dashboardDropdown = (
    <ul id='dash-drop' className='dropdown-content'>
      <li><Link href='/dashboard/addPoll'><a>Create a new poll</a></Link></li>
      <li><Link href='/dashboard/myPolls'><a>My Polls</a></Link></li>
      <li className='divider' />
      <li><Link href='/dashboard/myAccount'><a>My Account</a></Link></li>
    </ul>
  )

  return (
    <NavbarBase>
      <div>
        <ul className='right hide-on-med-and-down'>
          <li>
            <a href='#' className='dropdown-button' data-activates='dash-drop'>
              Dashboard <i className='material-icons right'>arrow_drop_down</i>
            </a>
          </li>

          <li><Link href='/auth/logout'><a>Logout</a></Link></li>
        </ul>

        { dashboardDropdown }

        <ul className='side-nav' id='mobile-nav'>
          <li><Link href='/'><a>Home</a></Link></li>
          <li><Link href='/dashboard'><a>Dashboard</a></Link></li>
          <li><Link href='/auth/logout'><a>Logout</a></Link></li>
        </ul>
      </div>
    </NavbarBase>
  )
}
