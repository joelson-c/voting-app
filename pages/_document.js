import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import isEmpty from 'lodash.isempty'

import AuthenticatedNavbar from 'components/navbar/authenticated'
import UnauthenticatedNavbar from 'components/navbar/unauthenticated'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, req }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()

    const isAuthenticated = !isEmpty(req.user)

    return { html, head, errorHtml, chunks, styles, isAuthenticated }
  }

  render () {
    const { html, isAuthenticated } = this.props
    return (
      <html>
        <Head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />
          <link rel='stylesheet' type='text/css' href='/static/css/materialize.min.css' media='screen,projection' />

          <script type='text/javascript' src='/static/js/lib/jquery-2.2.4.min.js' />
          <script type='text/javascript' src='/static/js/lib/materialize.min.js' />
          <script type='text/javascript' src='/static/js/app.js' />
        </Head>

        <body className='container'>
          {isAuthenticated ? <AuthenticatedNavbar /> : <UnauthenticatedNavbar /> }
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
