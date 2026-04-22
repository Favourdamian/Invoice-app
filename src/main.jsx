import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { InvoiceProvider } from './context/InvoiceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </ThemeProvider>
  </StrictMode>,
)
