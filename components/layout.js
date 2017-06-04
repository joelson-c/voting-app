import Head from 'next/head'

export default ({ children, title = 'Voting APP' }) => (
  <div>
    <Head>
      <title>{ title }</title>
    </Head>

    <style jsx global>{`
      a, button {
        margin: 0 .25rem;
      }

      .btn-floating {
        user-select: none;
      }
    `}</style>

    <div className='section'>
      { children }
    </div>
  </div>
)
