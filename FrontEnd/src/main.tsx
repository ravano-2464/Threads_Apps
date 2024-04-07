import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import RootReducer from "@/store/RootReducer.ts";
import { BrowserRouter as Router } from 'react-router-dom'

const client = new QueryClient()

const store = configureStore({
  reducer: RootReducer
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
)
