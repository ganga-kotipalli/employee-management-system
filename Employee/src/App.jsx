import React from 'react'

import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Employeedetails from './Employeedetails';
import Register from "./Register";
import Login from "./Login";
import "./App.css"

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Register/>
    },
    {
      path:"/login",
      element:<Login/>
    },

    {
      path:"/employee",
      element:<Employeedetails/>
    }
  ])
 

  return (
    <div className="container">

<RouterProvider router={router}/>
    </div>
  )
}

export default App