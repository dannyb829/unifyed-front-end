import LoginForm from "./LoginForm"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"




function LoginPage() {
    const [isNewUser ,setIsNewUser] = useState(false) 
    const [forgotPassword ,setForgotPassword] = useState(false) 
    const {user} = useContext(UserContext)

    const navigate = useNavigate()
    
    useEffect(()=>{
        if (user?.id) navigate('/home')
    },[])

    return (
        <div id='login-page'>
            <div id='login-items' style={{overflow:'scroll'}}>
            <img id='home-page-logo' src='images/UNifyed.png'></img>
            {forgotPassword ? <ForgotPassword setForgotPassword={setForgotPassword}/> : isNewUser? 
                <SignUp setIsNewUser={setIsNewUser}/>
                : <LoginForm setIsNewUser={setIsNewUser} setForgotPassword={setForgotPassword}/>}
            <img id='home-page-slogan' src='images/slogan.png'></img>
            </div>
        </div>
    )
}

export default LoginPage

