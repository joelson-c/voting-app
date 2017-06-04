import React from 'react'
import Link from 'next/link'

import Layout from 'components/layout'
import Preloader from 'components/preloader'

import axios from 'helpers/axios'

class MyPollsPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      pollList: [],
      hasFetched: false
    }
  }

  async componentDidMount () {
    const pollsRequest = await axios('/api/polls')
    const pollList = pollsRequest.data

    this.setState({ pollList, hasFetched: true })
  }

  render () {
    return (
      <Layout title='My Polls'>
        <div className='row'>
          <div className='col s12'>
            {this.state.hasFetched === false && <Preloader message='Loading...' />}

            <table className='responsive-table bordered centered'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Vote Count</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {this.state.pollList.map((poll, i) => (
                  <tr key={i}>
                    <td>{poll.title}</td>
                    <td>{poll.whoHasVoted.length}</td>
                    <td>
                      <Link href={`/poll?id=${poll._id}`} as={`/poll/${poll._id}`}>
                        <a className='btn waves-effect waves-blue blue darken-4'>View</a>
                      </Link>
                      <Link href={`/dashboard/pollSettings?id=${poll._id}`} as={`/dashboard/pollSettings/${poll._id}`}>
                        <a className='btn waves-effect waves-yellow yellow darken-4'>Edit</a>
                      </Link>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>

            <div className='fixed-action-btn'>
              <Link href='/dashboard/addPoll'>
                <a className='btn-floating btn-large waves-effect waves-light red'>
                  <i className='material-icons'>add</i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MyPollsPage
