import React, { useContext, useEffect } from 'react'
import HeroSection from './Herosection'
import Working from './Working'
import Categories from './Categories'
import { Appcontext } from '../../contextApi/AppContext'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
  const {isAuth}=useContext(Appcontext)
  console.log(isAuth);
  // useEffect(()=>{
  //     if(!isAuth){
  //   navigate('/login');
  // }
  // },[isAuth])
  if(!isAuth){
    return <Navigate to={'/login'}/>
  }
  
 
  return (
    <>
    <HeroSection/>
    <Working/>
    <Categories/>

    </>
  )
}

export default Home