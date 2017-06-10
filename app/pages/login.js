import React from 'react'
import Layout from 'components/layout'

class LoginPage extends React.Component {
  render () {
    return (
      <Layout>
        <style jsx>{`
          #google-login {
            margin: 2.1rem 0 1.68rem 0 !important;
        `}</style>

        <div className='row'>
          <div className='col s6'>
            <h1 className='center-align'>Login</h1>
          </div>
          <div className='col s6'>
            <a href='/auth/google' className='btn-large waves-effect waves-light red darken-3' id='google-login'>
              Login With Google
              <i className='large material-icons right'>account_box</i>
            </a>
          </div>
        </div>
      </Layout>
    )
  }
}

export default LoginPage
