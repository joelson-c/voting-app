import React from 'react'
import Router from 'next/router'
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

    this.handleDelete = this.handleDelete.bind(this)
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

  async handleDelete () {
    await axios.delete(`/api/user/${this.state.user._id}`)

    Router.replace('/auth/logout')
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
              actions={<button type='button' className='btn red' onClick={this.handleDelete}>Delete My Account</button>}>
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
