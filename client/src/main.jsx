import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

if (import.meta.env.DEV && window.location.hostname === '127.0.0.1') {
  const normalizedUrl = `${window.location.protocol}//localhost:${window.location.port}${window.location.pathname}${window.location.search}${window.location.hash}`
  window.location.replace(normalizedUrl)
}

if (import.meta.env.DEV && window.location.hostname === 'localhost' && window.location.port !== '5173') {
  const normalizedUrl = `${window.location.protocol}//localhost:5173${window.location.pathname}${window.location.search}${window.location.hash}`
  window.location.replace(normalizedUrl)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
