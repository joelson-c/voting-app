import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import isEmpty from 'lodash.isempty'

import Layout from 'components/layout'
import Preloader from 'components/preloader'

import axios from 'helpers/axios'

class PollPage extends React.Component {
  static async getInitialProps ({ query: { id } }) {
    return { id }
  }

  constructor (props) {
    super(props)

    this.state = {
      poll: null,
      hasFetched: false,
      selectedOption: null,
      shouldRedraw: false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
  }

  componentDidMount () {
    this.fetchPolldata()
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.shouldRedraw) {
      this.setState({ shouldRedraw: false })
    }
  }

  async fetchPolldata () {
    const pollRequest = await axios(`/api/poll/${this.props.id}`)
    const poll = pollRequest.data

    this.setState({ poll, hasFetched: true, shouldRedraw: true })
  }

  async handleFormSubmit (event) {
    event.preventDefault()

    if (isEmpty(this.state.selectedOption) === false) {
      try {
        const option = this.state.selectedOption

        await axios.post(`api/poll/vote/${this.props.id}`, { option })

        this.fetchPolldata()
      } catch (e) {
        window.alert('You can\'t vote to this poll')
      }
    }
  }

  handleOptionSelect (event) {
    const { id } = event.target

    this.setState({ selectedOption: id })
  }

  getChartData () {
    const chartData = this.state.poll.options.map((option) => option.votes)
    const chartLabels = this.state.poll.options.map((option) => option.name)

    return {
      labels: chartLabels,
      datasets: [{
        data: chartData,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    }
  }

  showPage () {
    return (
      <div>
        <div className='col s12 m6'>
          <h1 className='center-align'>{this.state.poll.title}</h1>

          <div className='section'>
            <form onSubmit={this.handleFormSubmit}>
              {this.state.poll.options.map((option, i) => (
                <p key={i}>
                  <input type='radio' name='selected-option' id={option._id} onChange={this.handleOptionSelect} />
                  <label htmlFor={option._id}>{option.name}</label>
                </p>
              ))}

              <button type='submit' className='btn green darken-2'>Vote!</button>
            </form>
          </div>
          <div className='divider' />
          <div className='section'>
            <h3>Share</h3>

            <div className='input-field'>
              <input
                type='text'
                value={`${window.location.hostname}/poll/${this.state.poll._id}`}
                onFocus={(event) => event.target.select()}
              />
            </div>
          </div>
        </div>

        <div className='col s12 m6'>
          <h2 className='center-align'>Results</h2>

          <div className='video-container'>
            <Doughnut
              redraw={this.shouldRedraw}
              data={this.getChartData()}
              options={{ responsive: true }} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <Layout title='Edit Poll'>
        <div className='row'>
          <div className='col s12'>
            {this.state.hasFetched ? this.showPage() : <Preloader message='Loading...' /> }
          </div>
        </div>
      </Layout>
    )
  }
}

export default PollPage
