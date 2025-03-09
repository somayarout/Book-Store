import { createBrowserRouter } from 'react-router'
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
      }]
    }
  ])
  export default router;