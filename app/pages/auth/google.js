import Layout from 'components/layout'
import Preloader from 'components/preloader'

export default () => (
  <Layout>
    <style jsx>{`
      .valign-wrapper {
        height: 87vh;
        justify-content: center;
      }
    `}</style>

    <div className='valign-wrapper'>
      <Preloader message='Wait a second, we are getting in touch with google...' />
    </div>
  </Layout>
)
