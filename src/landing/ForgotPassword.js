import { Button, TextField } from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { BASE_URL } from "../Utilities"



function ForgotPassword({setForgotPassword}) {
    const [isSubmitted ,setIsSubmitted] = useState(false) 
    const [email ,setEmail] = useState('') 
    const {enqueueSnackbar} = useSnackbar()


    function emailChange({target: {value}}) {
        setEmail(value)
    }

    function submitResetRequest() {
        fetch(BASE_URL + '/accounts/password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({account: {email: email}})})
        enqueueSnackbar('Check your email',{variant:'info'})
        setIsSubmitted(true)
        setTimeout(()=>{
            setForgotPassword(false)
        },5000)
    }

    return (
        <div style={{justifyContent:'center'}}>
        { !isSubmitted ? <>
        <h3>Please enter your email, once submitted you<br></br> will recieve an email with a link to verify your request</h3>
        <TextField
                    sx={{top:'3em'}}
                    id="outlined-name"
                    name="email"
                    value={email}
                    placeholder='enter email'
                    onChange={emailChange}
                /><br></br>
                <Button sx={{top:'6em'}}
                        onClick={submitResetRequest}
                        >Send reset email</Button><br></br>
                <Button sx={{top:'8em'}}
                        onClick={e => setForgotPassword(false)}
                        >login</Button>
        </> :
        <h3>If account exists with that email you will recieve notification shortly,<br></br> you will now be redirected to login..</h3>
        }
        </div>

    )





}


export default ForgotPassword