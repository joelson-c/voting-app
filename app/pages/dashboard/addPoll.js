import React from 'react'
import Router from 'next/router'

import Layout from 'components/layout'
import PollForm from 'components/pollForm'

import axios from 'helpers/axios'
import { MIN_OPTIONS, MAX_OPTIONS } from 'helpers/pollConfig'

class AddPollPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isCreating: false,
      options: []
    }

    for (let i = 0; i < MIN_OPTIONS; i++) {
      this.state.options.push({ name: '' })
    }

    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleRemoveOption = this.handleRemoveOption.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleAddOption () {
    if (this.state.options.length < MAX_OPTIONS) {
      const newOptions = [...this.state.options]
      newOptions.push({ name: '' })

      this.setState({ options: newOptions })
    }
  }

  handleRemoveOption () {
    if (this.state.options.length > MIN_OPTIONS) {
      const newOptions = [...this.state.options]
      newOptions.pop()

      this.setState({ options: newOptions })
    }
  }

  handleInputChange (event) {
    const { id, value, name } = event.target

    if (name === 'option') {
      let newOptions = [...this.state.options]
      const modifiedIndex = id

      newOptions[modifiedIndex] = { name: value }

      this.setState({ options: newOptions })
    } else {
      this.setState({ [name]: value })
    }
  }

  async handleFormSubmit (event) {
    event.preventDefault()

    this.setState({ isCreating: true })

    const { title, options } = this.state

    await axios.post('/api/poll', {
      title,
      options
    })

    Router.replace('/dashboard/myPolls')
  }

  render () {
    return (
      <Layout title='Create a new Poll'>
        <div className='row'>
          <div className='col s12'>
            <h1>Create a new Poll</h1>
            <PollForm
              handleFormSubmit={this.handleFormSubmit}
              handleInputChange={this.handleInputChange}
              handleAddOption={this.handleAddOption}
              handleRemoveOption={this.handleRemoveOption}
              title={this.state.title}
              options={this.state.options}
              isSending={this.state.isCreating}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default AddPollPage
