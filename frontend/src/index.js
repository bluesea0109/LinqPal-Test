import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

axios.defaults.baseURL = 'http://localhost:4000/'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
