import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Navigation from './components/Navigation'
import { CatalogProvider } from './context/CatalogContext'
import CreateKeyboard from './pages/CreateKeyboard'
import ViewKeyboards from './pages/ViewKeyboards'
import KeyboardDetails from './pages/KeyboardDetails'
import EditKeyboard from './pages/EditKeyboard'
import './App.css'

const NotFound = () => (
  <section className='page empty-state'>
    <h2>That page doesn't exist</h2>
    <p>Try the builder or your saved keyboards instead.</p>
    <Link to='/' className='btn btn-primary'>Go to the builder</Link>
  </section>
)

const App = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <CreateKeyboard title='ClackLab | Customize' />
    },
    {
      path: '/keyboards',
      element: <ViewKeyboards title='ClackLab | Custom Keyboards' />
    },
    {
      path: '/keyboards/:id',
      element: <KeyboardDetails title='ClackLab | View' />
    },
    {
      path: '/edit/:id',
      element: <EditKeyboard title='ClackLab | Edit' />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <CatalogProvider>
      <div className='app'>
        <Navigation />
        <main className='app-main'>{element}</main>
      </div>
    </CatalogProvider>
  )
}

export default App
