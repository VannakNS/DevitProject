import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './page/layout/MainlayoutPage'
import HomePage from './page/home/HomePage'
import NotFound from './page/error/RouteNotfound'
import ContactPage from './page/contact/ContactPage'
import BlogPage from './page/blog/BlogPage'
import AboutPage from './page/about/AboutPage'

function App() {
  

  return (
   <BrowserRouter>
   <Routes>
    <Route element={<AdminLayout/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      <Route path='/blog' element={<BlogPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
