import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './containers/home'
import About from './containers/about'
import { ListPage } from './containers/city-list'
import FormPage from './containers/form/FormPage'

const App = () => (
  <div className="container">
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/about-us">About</Link>
      <Link className="nav-link" to="/list">ListPage</Link>
      <Link className="nav-link" to="/form">FormPage</Link>
    </nav>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/list" component={ ListPage } />
      <Route exact path="/form" component={ FormPage } />
    </main>
  </div>
)

export default App
