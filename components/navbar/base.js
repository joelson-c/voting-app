import Link from 'next/link'

export default ({ sideNav, children }) => (
  <nav className='blue darken-4'>
    <div className='nav-wrapper'>
      <a href='#' data-activates='mobile-nav' className='button-collapse'><i className='material-icons'>menu</i></a>

      <ul className='left hide-on-med-and-down'>
        <li><Link href='/'><a>Home</a></Link></li>
      </ul>

      { children }
    </div>
  </nav>
)
