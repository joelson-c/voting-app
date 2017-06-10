import Head from 'next/head'

export default ({ children, title = 'Voting APP', hasContainer = true }) => {
  const contentSection = (
    <div className='section'>
      { children }
    </div>
  )

  return (
    <div>
      <Head>
        <title>{ title }</title>
      </Head>

      <style jsx global>{`
        a, button {
          margin: 0 .25rem !important;
        }

        .btn-floating {
          user-select: none;
        }
      `}</style>

      { hasContainer
        ? <div className='container'>
          { contentSection }
        </div> : contentSection }
    </div>
  )
}
