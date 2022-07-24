import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack'
import { BASE_URL } from '../Utilities'

const defaultSignUp = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    account_access: "creator"
}


function SignUp({ setIsNewUser }) {

    const [signUp, setSignUp] = useState(defaultSignUp)
    const [isSignedUp ,setIsSignedUp] = useState(false) 
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const {
        first_name,
        last_name,
        email,
        username,
        password,
        password_confirmation,
        account_access
    } = signUp
    
    const handleServerMessage = (messages, variant) => {
        messages.forEach((mess => enqueueSnackbar(mess,{variant})))
    }

    function handleSignUp(e) {
        e.preventDefault()
        fetch(BASE_URL + '/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signUp)
        })
            .then(resp => { if (resp.ok) {
                 resp.json().then(data => handleServerMessage([data.message], 'info'))
                 setIsSignedUp(true)
                }
                else resp.json().then(data => handleServerMessage(data.error, 'error'))
            })
    }

    function handleCredentials({ target: { name, value } }) {
        setSignUp(prev => ({ ...prev, [name]: value }))
    }

    return !isSignedUp ? (
        <Box
            id='sign-up'
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
                input:{bgcolor:'white', borderRadius:'5px'}
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSignUp}
        >
            <TextField
                id="outlined-name"
                name="first_name"
                value={first_name}
                placeholder='First name'
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <TextField
                id="outlined-name"
                name="last_name"
                value={last_name}
                placeholder='Last name'
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <TextField
                id="outlined-name"
                name="email"
                value={email}
                placeholder='valid email'
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <TextField
                id="outlined-name"
                name="username"
                value={username}
                placeholder='valid username'
                autoComplete='off'
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <TextField
                id="outlined-name"
                name="password"
                type="password"
                value={password}
                autoComplete='new-password'
                placeholder='enter password'
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <TextField
                id="outlined-uncontrolled"
                name="password_confirmation"
                type="password"
                placeholder='confirm password'
                value={password_confirmation}
                onChange={handleCredentials}
                color='secondary'
            /><br></br>
            <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}} type='submit'>Submit</Button><br></br>
            <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}} onClick={e => setIsNewUser(false)}>Already a user? Login</Button>
        </Box>
    ) : (
        <>
            <h2> Thank you for signing up!, please check your email for a confirmation link.</h2>
            <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}} onClick={e => setIsNewUser(false)}> Login </Button><br></br>
        </>
        )
}

export default SignUp