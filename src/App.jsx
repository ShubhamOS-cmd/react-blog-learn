import { useState } from 'react'
import './App.css'

function App() {
  //console.log(process.env.REACT_APP_APPWRITE); it's notr work beacuse we make our app by vite 
  // if we make app from create react then we used REACT_APP_.... for .env
  // but we used VITE so we used VITE_.... 
  // read docs for taking acess of .env we used diffrent syntax

  console.log(import.meta.env.VITE_APPWRITE_URL); // this used for vite
  
  return (
    <>
      <h1>A blog with appwrite</h1>
    </>
  )
}

export default App
