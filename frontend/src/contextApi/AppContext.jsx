import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'


 export const Appcontext=createContext();

 export const AppProvider=({children})=>{
    const [isAuth,setIsAuth]=useState(false);
    const [user, setUser ] = useState(null);

    return (
      <Appcontext.Provider value={{isAuth,setIsAuth,user,setUser}}>
        {children}
      </Appcontext.Provider>

    );
 }

  
