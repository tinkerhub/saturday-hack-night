import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))
document.documentElement.classList.add('dark')

root.render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
