import isEmpty from 'lodash.isempty'

export default ({ message }) => {
  const Indicator = (
    <div className='preloader-wrapper big active'>
      <div className='spinner-layer spinner-blue-only'>
        <div className='circle-clipper left'>
          <div className='circle' />
        </div>
        <div className='gap-patch'>
          <div className='circle' />
        </div>
        <div className='circle-clipper right'>
          <div className='circle' />
        </div>
      </div>
    </div>
  )

  if (isEmpty(message)) {
    return Indicator
  } else {
    return (
      <div>
        <div className='row'>
          <div className='col s3 m1'>
            { Indicator }
          </div>
          <div className='col s7 m11'>
            <p className='flow-text'>{ message }</p>
          </div>
        </div>
      </div>
    )
  }
}
