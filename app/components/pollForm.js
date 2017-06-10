import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash.isempty'
import Link from 'next/link'

class PollForm extends React.Component {
  render () {
    return (
      <form onSubmit={this.props.handleFormSubmit}>
        <div className='input-field'>
          <input
            type='text'
            name='title'
            onChange={this.props.handleInputChange}
            value={this.props.title}
            required />
          <label htmlFor='title' className={isEmpty(this.props.title) ? '' : 'active'}>Poll Title</label>
        </div>
        {this.props.options.map((option, i) => {
          return (
            <div className='input-field' key={i}>
              <input
                type='text'
                name='option'
                id={i}
                onChange={this.props.handleInputChange}
                value={option.name}
                required />
              <label htmlFor={i} className={isEmpty(option.name) ? '' : 'active'}>Option #{i + 1}</label>
            </div>
          )
        })}

        <button type='submit' className='btn waves-effect waves-light green darken-3' disabled={this.props.isSending}>Send</button>

        <button type='button' className='btn blue darken-4' onClick={this.props.handleAddOption} disabled={this.props.isSending}>
          Add an option
        </button>
        <button type='button' className='btn blue darken-2' onClick={this.props.handleRemoveOption} disabled={this.props.isSending}>
          Remove an option
        </button>

        <Link href='/dashboard'>
          <a className='btn' disabled={this.props.isSending}>Cancel</a>
        </Link>
      </form>
    )
  }
}

PollForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  options: PropTypes.array,
  handleAddOption: PropTypes.func,
  handleRemoveOption: PropTypes.func,
  isSending: PropTypes.bool
}

PollForm.defaultProps = {
  title: '',
  options: [],
  isCreating: false
}

export default PollForm
