import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import { Divider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { BASE_URL } from '../Utilities';


const defaultUpdate = {
    first_name: '',
    last_name: '',
    image_url: '',
    email: '',
    username: '',
    bio: ''
}


function AccountPage() {

    const { enqueueSnackbar } = useSnackbar()

    const { user, setUser } = useContext(UserContext)

    const [profileUpdate, setProfileUpdate] = useState(defaultUpdate)
    const [image, setImage] = useState(null)

    useEffect(() => {
        if (user) setProfileUpdate(user)
    }, [user])

    const {
        first_name,
        last_name,
        image_url,
        email,
        username,
        bio
    } = profileUpdate

    function faceDetectTransorm(link) {
       return [link.split('upload/')[0],"upload/c_thumb,g_faces,h_300,w_400/",link.split('upload/')[1]].join('')
    }


    const uploadImage = (e) => {
        e.stopPropagation()
        const formData = new FormData()
        formData.append('file', image)
        formData.append("upload_preset", "equlchhq")

        axios.post("https://api.cloudinary.com/v1_1/unifyed-media/image/upload", formData)
            .then(image => setProfileUpdate(prev => ({...prev, image_url: faceDetectTransorm(image.data.secure_url)})))
    }


    const handleChange = (e) => {
        setProfileUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleProfileUpdate = () => {
        fetch(BASE_URL + `/accounts/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
            body: JSON.stringify(profileUpdate)
        })
            .then(r => {
                if (r.ok) r.json().then(data => {
                    setUser(data)
                    enqueueSnackbar('Account updated', { variant: 'success' })
                })
            })
    }


    return (

        <Card elevation={3} sx={{margin:'3% auto', maxWidth: 1000, minHeight: 680, overflow: 'scroll' ,bgcolor:'#d8d8d845'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} container spacing={4} sx={{color:'white', textArea:{color:'white'}}}>
                            <Grid item xs={12} >
                            <h1 style={{float:'left', marginLeft:'.5em'}}>EDIT PROFILE</h1>
                            </Grid>
                            <Grid item xs={12} md={6}>

                            <TextField
                                id="outlined-multiline-flexible"
                                label="first name"
                                name="first_name"
                                multiline
                                maxRows={4}
                                value={first_name}
                                onChange={handleChange}
                                color='secondary'
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="last name"
                                name="last_name"
                                multiline
                                maxRows={4}
                                value={last_name}
                                onChange={handleChange}
                                color='secondary'
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>

                            <TextField
                                id="outlined-multiline-flexible"
                                label="username"
                                name="username"
                                multiline
                                maxRows={4}
                                value={username}
                                onChange={handleChange}
                                color='secondary'
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>


                            <TextField
                                id="outlined-multiline-flexible"
                                label="email"
                                name="email"
                                multiline
                                maxRows={4}
                                value={email}
                                onChange={handleChange}
                                color='secondary'
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Bio"
                                name="bio"
                                multiline
                                rows={4}
                                placeholder='Describe yourself'
                                value={bio}
                                onChange={handleChange}
                                color='secondary'
                            />
                            </Grid>
                            <Grid item xs={12} md={6}>

                        <Button variant='contained' endIcon={<SaveIcon />} onClick={handleProfileUpdate} >save changes</Button>
                            </Grid>
                        <Divider variant="inset" />
                </Grid>
                <Grid item xs={12} md={6} margin='5rem auto'>
                    <img src={image_url} style={{maxWidth:'15rem'}}/>
                    <label htmlFor="contained-button-file">
                        <input style={{color:'white'}} accept="image/*" id="contained-button-file" multiple type="file" name='image_url' onChange={e => setImage(e.target.files[0])}></input>
                    </label>
                        <Button variant="contained" component="span" onClick={uploadImage}>
                            Upload
                        </Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export default AccountPage