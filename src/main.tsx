import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
const syncMotion = () => document.documentElement.classList.toggle('motion-ok', motion.matches)
syncMotion()
motion.addEventListener('change', syncMotion)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
