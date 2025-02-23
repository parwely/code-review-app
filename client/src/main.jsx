import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <div className="min-h-screen bg-linear-to-tr from-fuchsia-700 to-sky-500 text-black">
      <App />
    </div>
  </StrictMode>,
)
