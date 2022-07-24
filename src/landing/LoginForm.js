import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack'
import { BASE_URL } from '../Utilities'

function Login({ setIsNewUser, setForgotPassword }) {

    const [login, setLogin] = useState({ username: '', password: '' })
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    const handleMessageVariant = (message, variant) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
      };

    const { user, setUser } = useContext(UserContext)

    const { username, password } = login

    useEffect(() => {
        if (user) navigate('/home')
    }, [])

    function handleCredentials({ target: { name, value } }) {
        setLogin(prev => ({ ...prev, [name]: value }))
    }

    function handleUseAndToken(jwt, user) {
        localStorage.setItem('token', jwt)
        setUser(user)
    }

    function handleLogin(e) {
        e.preventDefault()
        fetch(BASE_URL + "/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(login)
        }).then(resp => resp.ok ? resp.json().then(data => handleUseAndToken(data.token, data.user), navigate('/Home'))
            : resp.json().then(data => handleMessageVariant(data.error,'error')))


    }

    return (
        <>
            <Box
                id='login'
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleLogin}
            >
                <TextField
                    sx={{input:{background:'white', borderRadius:'5px'}}}
                    id="outlined-name"
                    name="username"
                    value={username}
                    placeholder='enter username'
                    onChange={handleCredentials}
                    color='secondary'
                /><br></br>
                <TextField
                    sx={{input:{background:'white', borderRadius:'5px'}}}
                    id="outlined-uncontrolled"
                    name="password"
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={handleCredentials}
                    color='secondary'
                /><br></br>
                <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}} type='submit'>Submit</Button><br></br>
                <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}}  onClick={e => setIsNewUser(true)}>Sign-up</Button><br></br>
                <Button sx={{color:'#fff', ":hover":{color:'#db56d775'}}}  onClick={e => setForgotPassword(true)}>Forgot password?</Button>
            </Box>
        </>
    )
}

export default Login