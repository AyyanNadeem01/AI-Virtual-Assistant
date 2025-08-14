import React from 'react'
import { createContext } from 'react'
export const UserDataContext=createContext()
const UserContext = ({children}) => {
    const serverUrl="http://localhost:8000"
    const value={
        serverUrl
    }
    return (

    <div>
        <UserDataContext.Provider value={value}>
        {children}
        </UserDataContext.Provider>
        </div>
  )
}

export default UserContext
