import { Grid, Card, IconButton } from "@mui/material"
import { TextField } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../UserContext"
import CardMedia from '@mui/material/CardMedia';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios, { Axios } from 'axios';
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utilities";






function Publish() {
    const { user } = useContext(UserContext)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()

    const defaultArticle = {
        account_id: user?.id,
        author: user?.first_name + " " + user?.last_name,
        source: 'Unifyed',
        title: '',
        image_url: '/images/uploadplaceholder.png',
        content: '',
        date: new Date()
    }

    const [newArticle, setNewArticle] = useState(defaultArticle)

    const {
        title,
        image_url,
        content
    } = newArticle

    useEffect(() => {
        if (user?.account_access !== 'creator') navigate('/Home')
    }, [user])

    const uploadImage = (image) => {
        const formData = new FormData()
        formData.append('file', image)
        formData.append("upload_preset", "equlchhq")

        axios.post("https://api.cloudinary.com/v1_1/unifyed-media/image/upload", formData)
            .then(image => setNewArticle(prev => ({ ...prev, image_url: image.data.secure_url })))
    }

    const handleArticleChange = (e) => {
        setNewArticle(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const publishArticle = () => {
        if (title && content.length > 500) {

            fetch(BASE_URL + '/headlines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
                body: JSON.stringify(newArticle)
            })
                .then(resp => {
                    if (resp.ok) {
                        setNewArticle(defaultArticle)
                        enqueueSnackbar('Article Published Successfully', { variant: 'success' })
                        navigate('/Home')
                    }
                })
        }
        else {
            enqueueSnackbar('please complete article', { variant: 'error' })
        }
    }

    return (
        <Grid container spacing={1} padding='1rem'>
            <Grid item xs={12}>
                <Card elevation={0} sx={{ bgcolor: '#0000', color: 'white', margin: 'auto' }}>
                    <IconButton aria-label="upload image" color='primary' sx={{ transform: 'scale(3)', left: '6%', top: '15%', position: 'absolute' }}>
                        <label htmlFor='upload-input'>
                            <AddCircleIcon />
                            <input accept="image/*" id="upload-input" multiple type="file" name='image_url' style={{ display: 'none' }} onChange={e => uploadImage(e.target.files[0])}></input>
                        </label>
                    </IconButton>

                    <CardMedia
                        component="img"
                        height="400"
                        image={image_url}
                        alt="something"
                    />
                    <h1 style={{ textAlign: 'left', marginLeft: '2rem' }}>Title</h1>
                    <TextField
                        sx={{ width: '95%', input: { color: 'white', fontWeight: 'bold' }, marginBottom: '2rem' }}
                        id="outlined-required"
                        name='title'
                        value={title}
                        onChange={handleArticleChange}
                        color='secondary'
                    />

                    <h1 style={{ textAlign: 'left', margin: '0 0 0 2rem' }}>Tell your story</h1>
                    <TextField
                        sx={{ width: '95%', textArea: { color: 'white', fontWeight: 'bold' } }}
                        id="outlined"
                        name='content'
                        multiline
                        rows={10}
                        value={content}
                        onChange={handleArticleChange}
                        color='secondary'
                    />
                    <Button variant='contained'
                        sx={{ float: 'right', margin: '.7rem 2.5%', background: '#db56d775', ":hover": { background: '#db56d795' } }}
                        onClick={publishArticle}
                    >Publish</Button>
                </Card>
            </Grid>
        </Grid>
    )


}

export default Publish