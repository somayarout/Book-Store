import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
import Home from './Pages/home/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import 'sweetalert2/dist/sweetalert2.js'
import Cart from './Pages/Book/Cart.jsx'
import Checkout from './Pages/Book/Checkout.jsx'

 
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[{
      path:"/home",
      element:<Home/>,
    },
    {
      path:"/about",
      element: <h1>About</h1>,
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/register",
      element:<Register/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/checkout",
      element:<Checkout/>
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
)
