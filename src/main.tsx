import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PrintProvider } from './context/PrintContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrintProvider>
      <App />
    </PrintProvider>
  </React.StrictMode>,
)
