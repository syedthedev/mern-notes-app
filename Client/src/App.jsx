import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Welcome from './Components/Welcome.jsx';

function App() {
  const routes = createBrowserRouter([
    {
      path : '/home',
      element : <Home />
    },
    {
      path : '/',
      element : <Welcome />
    },
    {
      path : '/login',
      element : <Login />
    },
    {
      path : '/register',
      element : <Register />
    }
  ])
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App