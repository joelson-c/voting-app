import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Layout from 'components/layout'
import Fab from 'components/fab'

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
            <form onSubmit={this.handleFormSubmit}>
              <div className='input-field'>
                <input
                  type='text'
                  name='title'
                  onChange={this.handleInputChange}
                  required />
                <label htmlFor='title'>Poll Title</label>
              </div>
              {this.state.options.map((option, i) => (
                <div className='input-field' key={i}>
                  <input
                    type='text'
                    name='option'
                    id={i}
                    onChange={this.handleInputChange}
                    required />
                  <label htmlFor={i}>Option #{i + 1}</label>
                </div>
              ))}

              <button type='submit' className='btn waves-effect waves-light green darken-3' disabled={this.state.isCreating}>Create</button>
              <Link href='/dashboard'>
                <a className='btn' disabled={this.state.isCreating}>Cancel</a>
              </Link>
            </form>

            <Fab>
              <a className='btn-floating red' onClick={this.handleAddOption}>
                <i className='material-icons'>add</i>
              </a>
              <a className='btn-floating teal' onClick={this.handleRemoveOption}>
                <i className='material-icons'>remove</i>
              </a>
            </Fab>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AddPollPage
