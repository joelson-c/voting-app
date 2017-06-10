import Layout from 'components/layout'

export default () => (
  <Layout hasContainer={false}>
    <style jsx>{`
      .full-height {
        height: 88vh;
        padding: .8rem;
        background: url(http://via.placeholder.com/1024x720) center/cover fixed;
      }

      .valign-wrapper {
        height: 100%;
        justify-content: center;
        flex-flow: column;
      }
    `}</style>
    <div className='section center-align full-height'>
      <div className='valign-wrapper'>
        <h1>Welcome</h1>
        <p>
          Duis blandit convallis lectus, sed accumsan sem pharetra a.
          Cras mattis, orci sit amet bibendum consequat, dui mauris imperdiet lectus, at tincidunt neque tortor vel felis.
          Etiam ac turpis mi. Praesent nec quam ac ipsum aliquam ullamcorper sed nec eros. Phasellus non elit dolor.
          Fusce nec aliquet diam, in dictum arcu. Sed nisi ante, lacinia nec aliquam ut, gravida eu libero.
        </p>
        <a href='/login' className='btn'>Login</a>
      </div>
    </div>
    <div className='section'>
      <div className='row'>
        <div className='col m6'>
          <p>
            Duis blandit convallis lectus, sed accumsan sem pharetra a.
            Cras mattis, orci sit amet bibendum consequat, dui mauris imperdiet lectus, at tincidunt neque tortor vel felis.
            Etiam ac turpis mi. Praesent nec quam ac ipsum aliquam ullamcorper sed nec eros. Phasellus non elit dolor.
            Fusce nec aliquet diam, in dictum arcu. Sed nisi ante, lacinia nec aliquam ut, gravida eu libero.
          </p>
        </div>

        <div className='col m6'>
          <p>
            Suspendisse ac tortor eu ipsum rhoncus porttitor.
            Donec eu dictum turpis, ac varius libero.
            Pellentesque maximus ultrices volutpat.
            Maecenas nec tortor ultrices, rhoncus libero in, semper quam. Curabitur eget fermentum diam.
            Phasellus sed purus mauris. Ut nec metus ac dolor elementum dictum nec eget sem.
            Donec rutrum gravida interdum. Etiam tincidunt magna non vestibulum lobortis.
            Nullam scelerisque ut metus non luctus.
            Quisque euismod, risus et ornare ultricies, libero elit lobortis ex, et tristique erat lorem sed purus.
            Ut et tortor congue, pharetra odio eget, dictum eros.
          </p>
        </div>
      </div>
    </div>
  </Layout>
)
