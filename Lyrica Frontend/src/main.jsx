import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import Developers from './components/Developers/Developers.jsx'
import Search from './components/Search/Search.jsx'
import Redirect from './components/Redirect/Redirect.jsx'
import RecommendSongs from './components/Search/Recommend/RecommendSongs.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Redirect />
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/developers',
        element: <Developers />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/search/recommend/:param',
        element: <RecommendSongs />,
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
