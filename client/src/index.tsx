import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { themes } from './themes'
import { themeToCssVariables } from './utils'
import { EventProvider } from './contexts/EventContext'
import { TokenProvider } from './contexts/TokenContext'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

const cssVariables = themeToCssVariables(themes)

const styleElement = document.createElement('style')
styleElement.textContent = `:root { ${cssVariables} }`
document.head.appendChild(styleElement)

root.render(
  <Router>
    <TokenProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </TokenProvider>
  </Router>
)
