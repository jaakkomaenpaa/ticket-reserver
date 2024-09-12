import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { themes } from './themes'
import { themeToCssVariables } from './utils'
import { EventProvider } from './contexts/EventContext'
import { TokenProvider } from './contexts/TokenContext'
import { getTheme, ThemeProvider } from './contexts/ThemeContext'
import { FontProvider, getFont } from './contexts/FontContext'

const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

const cssVariables = themeToCssVariables(themes[getTheme()])
const styleElement = document.createElement('style')
styleElement.textContent = `:root { ${cssVariables} }`

document.head.appendChild(styleElement)
document.documentElement.style.setProperty('--selected-font', getFont())

root.render(
  <Router>
    <ThemeProvider>
      <FontProvider>
        <TokenProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </TokenProvider>
      </FontProvider>
    </ThemeProvider>
  </Router>
)
