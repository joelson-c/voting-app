import React from 'react'
import Link from 'next/link'

import Layout from 'components/layout'
import Card from 'components/card'

class DashboardPage extends React.Component {
  render () {
    return (
      <Layout title='Your Dashboard'>
        <h1>
          Hello,<br />
          <small>How can I help you?</small>
        </h1>

        <div className='row'>
          <div className='col s12 m6'>
            <Card actions={[
              <Link href='dashboard/addPoll'>
                <a>Create a new Poll</a>
              </Link>,
              <Link href='dashboard/myPolls'>
                <a>My Polls</a>
              </Link> ]}>
              <p>
                Maecenas eget facilisis metus, eu lobortis mauris. Quisque pellentesque aliquet porttitor.
                Donec diam erat, molestie sit amet suscipit id, sagittis eget justo. Sed eget tortor eu erat euismod egestas non non est.
                Duis ultricies lectus lacus, efficitur dictum orci auctor vel. Aliquam erat volutpat. Nam in blandit urna. Phasellus rhoncus.
              </p>
            </Card>
          </div>
          <div className='col s12 m6'>
            <Card actions={[
              <Link href='dashboard/myPolls'>
                <a>My Account</a>
              </Link>
            ]}>
              <p>
                Ut iaculis viverra nibh. Nam sagittis mi dui, eu pellentesque dolor convallis ac.
                Quisque ut interdum leo. Mauris mollis eros eu metus euismod, sit amet dictum arcu volutpat.
                Donec feugiat sagittis velit in tristique. Vivamus orci turpis, egestas ut turpis a, commodo tincidunt arcu.
                Aenean dapibus venenatis orci, eu ullamcorper.
              </p>
            </Card>
          </div>
        </div>
      </Layout>
    )
  }
}

export default DashboardPage
