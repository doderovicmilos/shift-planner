import React from 'react'
import { Route } from 'react-router-dom'
import { ShiftListPage } from './containers/shift-list-page'

const App = () => (
    <div className="container">
        <main>
            <Route exact path="/" component={ShiftListPage}/>
        </main>
    </div>
)

export default App
