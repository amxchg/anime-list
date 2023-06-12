import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import themes from './themes'

import Anime from './views/Anime'
import Dashboard from './views/Dashboard'

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      },
    },
  })

  // const localStoragePersister = createSyncStoragePersister({
  //   storage: window.localStorage,
  // })
  
  // persistQueryClient({
  //   queryClient: queryClient,
  //   persister: localStoragePersister,
  // })

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />
    },
    {
      path: "anime/:id",
      element: <Anime />
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes()}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
