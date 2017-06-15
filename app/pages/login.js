import React from 'react'

import Preloader from 'components/preloader'
import Layout from 'components/layout'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthenticating: false,
      service: null
    }

    this.onAuthClick = this.onAuthClick.bind(this)
  }

  async onAuthClick (event) {
    const { service } = event.target.dataset

    this.setState({ isAuthenticating: true, service })
  }

  showLoader () {
    return (
      <div>
        <style jsx>{`
          .valign-wrapper {
            height: 87vh;
            justify-content: center;
          }
        `}</style>

        <div className='valign-wrapper'>
          <Preloader message={`Wait a second, we are getting in touch with ${this.state.service}...`} />
        </div>
      </div>
    )
  }

  showPage () {
    return (
      <div>
        <style jsx>{`
          #google-login {
            margin: 2.1rem 0 1.68rem 0 !important;
          }
        `}</style>
        <div className='row'>
          <div className='col s6'>
            <h1 className='center-align'>Login</h1>
          </div>
          <div className='col s6'>
            <a
              href='/auth/google'
              className='btn-large waves-effect waves-light red darken-3'
              id='google-login'
              data-service='google'
              onClick={this.onAuthClick}>
              Login With Google
              <i className='large material-icons right'>account_box</i>
            </a>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Layout>
        {this.state.isAuthenticating ? this.showLoader() : this.showPage() }

      </Layout>
    )
  }
}

export default LoginPage
