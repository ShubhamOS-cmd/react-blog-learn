import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
// dispatch is merger when we use redux with react
import authService from './appwrite/auth'
import {login , logout} from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/Footer/Footer'
function App() {
  //console.log(process.env.REACT_APP_APPWRITE); it's notr work beacuse we make our app by vite 
  // if we make app from create react then we used REACT_APP_.... for .env
  // but we used VITE so we used VITE_.... 
  // read docs for taking acess of .env we used diffrent syntax

  // as soon our app is load we have to check that is our user is login or not based on that we give our outlet
  // as soon our app is load then take use effect and ask that you are loggedIn based on that 
  // we make loading state why -> beacuse our database is far from client so network request take time on this basis we do conditional rendering
  // so if loading is true loading icon otherwise data

  const [loading , setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser() // is there a logged-in user?
    .then((userData) => {
      if(userData){
        dispatch(login({userData})) // login action with user data 
      }
      else{ // if we not get userdata then we call an activity by this atleast our state is update 
        dispatch(logout()) // logout action 
      }
    })
    .finally(() => setloading(false))
  } , []) // empty dependecies means run once when your components mounts
  // assignment 
  return !loading ? (
    <div className='min-h-screen flex flex-wrap 
    content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* todo  <Outlet /> */} 
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
