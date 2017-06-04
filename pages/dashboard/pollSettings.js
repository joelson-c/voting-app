import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import isEmpty from 'lodash.isempty'
import assignIn from 'lodash.assignin'

import Layout from 'components/layout'
import Preloader from 'components/preloader'
import Card from 'components/card'
import Fab from 'components/fab'

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

  handleAddOption () {
    if (this.state.poll.options.length < MAX_OPTIONS) {
      const newPoll = assignIn({}, this.state.poll)
      newPoll.options.push({ name: '' })

      this.setState({ poll: newPoll, shouldRunEdit: true })
    }
  }

  handleRemoveOption () {
    if (this.state.poll.options.length > MIN_OPTIONS) {
      const newPoll = assignIn({}, this.state.poll)
      newPoll.options.pop()

      this.setState({ poll: newPoll, shouldRunEdit: true })
    }
  }

  handleInputChange (event) {
    const { id, value, name } = event.target

    if (name === 'option') {
      let newOptions = [...this.state.poll.options]
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

      const { title } = this.state
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
            <p>????</p>

          </Card>
        </div>
      </div>
    )
  }

  showPage () {
    return (
      <div>
        <div className='section'>
          <form onSubmit={this.handleFormSubmit}>
            <div className='input-field'>
              <input
                type='text'
                name='title'
                defaultValue={this.state.poll.title}
                onChange={this.handleInputChange}
                required />
              <label htmlFor='title' className='active'>Poll Title</label>
            </div>
            {this.state.poll.options.map((option, i) => (
              <div className='input-field' key={i}>
                <input
                  type='text'
                  name='option'
                  id={i}
                  defaultValue={option.name}
                  onChange={this.handleInputChange}
                  required />
                <label htmlFor={i} className={isEmpty(option.name) || 'active'}>Option #{i + 1}</label>
              </div>
            ))}

            <button type='submit' className='btn waves-effect waves-light green darken-3' disabled={this.state.isPatching}>Edit</button>
            <Link href='/dashboard'>
              <a className='btn' disabled={this.state.isPatching}>Cancel</a>
            </Link>
          </form>
        </div>
        <div className='divider' />
        <div className='section'>
          { this.showDangerArea() }
        </div>

        <Fab>
          <div>
            <a className='btn-floating red' onClick={this.handleAddOption}>
              <i className='material-icons'>add</i>
            </a>
            <a className='btn-floating teal' onClick={this.handleRemoveOption}>
              <i className='material-icons'>remove</i>
            </a>
          </div>
        </Fab>
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
