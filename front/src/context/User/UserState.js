import axios from "axios"
import { useState } from "react";
import { useCookies } from "react-cookie";
import UserContext from "./UserContext"

const UserState = (props)=>{
    const [cookies, setCookie] = useCookies();
    const [user, setUser] = useState({});
    // const [token , setToken] = 
    console.log("token")
    console.log(cookies.token)

    const headers = {
        'Content-Type': 'application/json',
        'token': cookies.token
      }
    
    const getUser = async()=>{
        const res = await axios.get(`http://localhost:5000/v1/u/getUser`,{
            headers
        })
        console.log(res)
        setUser(res.data.user)
    }

    return(
        <UserContext.Provider value={{getUser, user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;