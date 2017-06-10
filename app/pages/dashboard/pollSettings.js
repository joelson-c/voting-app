import React from 'react'
import Router from 'next/router'
import isEmpty from 'lodash.isempty'
import assignIn from 'lodash.assignin'

import Layout from 'components/layout'
import Preloader from 'components/preloader'
import Card from 'components/card'
import PollForm from 'components/pollForm'

import axios from 'helpers/axios'
import { MIN_OPTIONS, MAX_OPTIONS } from 'helpers/pollConfig'

const isServer = (typeof window === 'undefined')

class EditPollPage extends React.Component {
  static async getInitialProps ({ query: { id }, req }) {
    let poll = {}

    if (isServer) {
      poll = req.poll
    }

    return { id, poll }
  }

  constructor (props) {
    super(props)

    this.state = {
      poll: null,
      hasFetched: false,
      shouldRunEdit: false,
      isPatching: false
    }

    this.pollUrl = `/api/poll/${props.id}`

    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleRemoveOption = this.handleRemoveOption.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async componentDidMount () {
    let poll = this.props.poll || {}

    if (isEmpty(poll)) {
      const pollRequest = await axios(this.pollUrl)
      poll = pollRequest.data
    }

    this.setState({ poll, hasFetched: true })
  }

  getPollOptions () {
    return isEmpty(this.state.options) ? this.state.poll.options : this.state.options
  }

  handleAddOption () {
    const pollOptions = this.getPollOptions()

    if (pollOptions.length < MAX_OPTIONS) {
      const newOptions = [...pollOptions]
      newOptions.push({ name: '' })

      this.setState({ options: newOptions })
    }
  }

  handleRemoveOption () {
    const pollOptions = this.getPollOptions()

    if (pollOptions.length > MIN_OPTIONS) {
      const newOptions = [...pollOptions]
      newOptions.pop()

      this.setState({ options: newOptions })
    }
  }

  handleInputChange (event) {
    const { id, value, name } = event.target
    const pollOptions = this.getPollOptions()

    if (name === 'option') {
      let newOptions = [...pollOptions]
      const modifiedIndex = id

      newOptions[modifiedIndex] = { name: value }

      this.setState({ options: newOptions, shouldRunEdit: true })
    } else {
      this.setState({ [name]: value, shouldRunEdit: true })
    }
  }

  async handleFormSubmit (event) {
    event.preventDefault()

    if (this.state.shouldRunEdit) {
      this.setState({ isPatching: true, shouldRunEdit: false })

      const title = this.state.title || this.state.poll.title
      const options = this.state.options || this.state.poll.options

      await axios.patch(this.pollUrl, {
        title,
        options
      })

      this.setState({ isPatching: false })
    }
  }

  async handleDelete () {
    this.setState({ isPatching: true, shouldRunEdit: false })

    await axios.delete(this.pollUrl)

    Router.replace('/dashboard/myPolls')
  }

  showDangerArea () {
    return (
      <div>
        <style jsx>{`
          .danger-area {
            border: 2px dashed #F44336;
            padding: .9rem;
          }
        `}</style>

        <div className='danger-area'>
          <h3>Danger Area</h3>
          <Card
            actions={<button type='button' className='btn red' onClick={this.handleDelete}>Delete</button>}>
            <p>When you delete a poll, all the data associated with it will be deleted.</p>
          </Card>
        </div>
      </div>
    )
  }

  showPage () {
    return (
      <div>
        <div className='section'>
          <PollForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            handleAddOption={this.handleAddOption}
            handleRemoveOption={this.handleRemoveOption}
            title={isEmpty(this.state.title) ? this.state.poll.title : this.state.title}
            options={isEmpty(this.state.options) ? this.state.poll.options : this.state.options}
            isSending={this.state.isPatching}
          />

        </div>
        <div className='divider' />
        <div className='section'>
          { this.showDangerArea() }
        </div>
      </div>
    )
  }

  render () {
    return (
      <Layout title='Edit Poll'>
        <div className='row'>
          <div className='col s12'>
            <h1>Edit Poll</h1>
            {this.state.hasFetched ? this.showPage() : <Preloader message='Loading...' /> }
          </div>
        </div>
      </Layout>
    )
  }
}

EditPollPage.defaultProps = {
  poll: {}
}

export default EditPollPage
