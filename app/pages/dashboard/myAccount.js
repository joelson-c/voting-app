import React from 'react'
import isEmpty from 'lodash.isempty'
import axios from 'helpers/axios'

import Layout from 'components/layout'
import Preloader from 'components/preloader'
import Card from 'components/card'

class MyAccountPage extends React.Component {
  async getInitialProps ({ req }) {
    const user = req.user

    return { user }
  }

  constructor (props) {
    super(props)

    this.state = {
      user: null,
      hasFetched: false
    }
  }

  async componentDidMount () {
    if (isEmpty(this.props.user)) {
      const userRequest = await axios('/api/user')
      const user = userRequest.data

      this.setState({ user, hasFetched: true })
    } else {
      this.setState({ user: this.props.user, hasFetched: true })
    }
  }

  showPage () {
    return (
      <div>
        <style jsx>{`
          .danger-area {
            border: 2px dashed #F44336;
            padding: .9rem;
          }
        `}</style>

        <div className='col s12 m6'>
          <h2>Overview</h2>

          <div className='col s12 m6'><b>Name</b></div>
          <div className='col s12 m6'>{this.state.user.name}</div>
        </div>

        <div className='col s12 m6'>
          <h2>Actions</h2>

          <div className='danger-area'>
            <Card
              actions={
                <form method='POST' action='/api/user?_method=DELETE'>
                  <button type='submit' className='btn red'>Delete My Account</button>
                </form>
              }>
              <p>After you delete your account, all the data associated with it will be deleted.</p>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Layout title='My Account'>
        <div className='row'>
          <div className='col s12'>
            <h1>My Account</h1>
            {this.state.hasFetched ? this.showPage() : <Preloader message='Loading...' />}
          </div>
        </div>
      </Layout>
    )
  }
}

export default MyAccountPage
