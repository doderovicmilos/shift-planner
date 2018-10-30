import React from 'react'
import { Route } from 'react-router-dom'
import { ListPage } from './containers/city-list'

const App = () => (
    <div className="container">
        <main>
            <Route exact path="/" component={ListPage}/>
        </main>
    </div>
)

export default App
