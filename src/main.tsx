import { createRoot } from 'react-dom/client'
import App from './app/App'
import './index.css'
import * as React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
