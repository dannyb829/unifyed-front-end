import LoginForm from "./LoginForm"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"
import SignUp from "./SignUp"
import ForgotPassword from "./ForgotPassword"
import { Grid } from "@mui/material"




function LoginPage() {
    const [isNewUser ,setIsNewUser] = useState(false) 
    const [forgotPassword ,setForgotPassword] = useState(false) 
    const {user} = useContext(UserContext)

    const navigate = useNavigate()
    
    useEffect(()=>{
        if (user?.id) navigate('/home')
    },[])

    return (
        <Grid container spacing={3} height='100vh'>
            <Grid item display={{xs:'none', lg:'block'}} lg={6}>
            <img id='home-globe' alt='world unifyed' src='images/worldunifyed.png'></img>
            <img id='home-page-slogan' src='images/slogan.png'></img>
            </Grid>
            <Grid item xs={12} lg={6} style={{overflow:'scroll'}}>
            <img id='home-page-logo' src='images/UNifyed.png'></img>
            {forgotPassword ? <ForgotPassword setForgotPassword={setForgotPassword}/> : isNewUser? 
                <SignUp setIsNewUser={setIsNewUser}/>
                : <LoginForm setIsNewUser={setIsNewUser} setForgotPassword={setForgotPassword}/>}
            </Grid>
        </Grid>
    )
}

export default LoginPage

