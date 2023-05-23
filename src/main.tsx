import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthWrapper } from './lib/hoc.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </React.StrictMode >,
)

