import { useEffect, useState, useContext } from "react"
import * as React from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { CardActionArea, Divider } from '@mui/material';
import { useSnackbar } from "notistack";
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { TextField } from "@mui/material";
import { UserContext } from "../UserContext";
import ActivityFeed from "../Elements/ActivityFeed";
import { BASE_URL } from "../Utilities";
import { Clear } from "@mui/icons-material";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ProfilePage() {
    const { user } = useContext(UserContext)
    const [currentProfile, setCurrentProfile] = useState({})
    const [userActivities, setUserActivities] = useState(null)
    const [userPost, setUserPost] = useState('')
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()


    const { id } = useParams()
    const {
        first_name,
        last_name,
        image_url,
        bio,
        email,
        account_access,
        followers_amount,
        followees_amount,
        user_followed,
        follows_user
    } = currentProfile


    useEffect(() => {
        fetch(BASE_URL + `/accounts/${id}`, { headers: { "Authorization": localStorage.getItem('token') } })
            .then(resp => resp.ok ? resp.json().then(setCurrentProfile)
                : resp.json().then(data => enqueueSnackbar(data.error, { variant: 'error' })))
    }, [id])



    function handlePost(e) {
        e.preventDefault()
        fetch(BASE_URL + '/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
            body: JSON.stringify({ content: userPost })
        }).then(resp => resp.ok ? resp.json().then(setUserActivities)
            : resp.json().then(data => enqueueSnackbar(data.error, { variant: 'error' }))
        )
        setUserPost('')
    }

    function handleFollows() {
        fetch(BASE_URL + `/friendships${!user_followed ? "" : "/" + id}`, {
            method: user_followed ? 'DELETE' : 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
            body: JSON.stringify({ id: id })
        })
            .then(resp => resp.ok ? resp.json().then(setCurrentProfile)
                : resp.json().then(data => enqueueSnackbar(data.error, { variant: 'error' })))
    }



    return (
            <Grid container spacing={1} >
                <Grid item xs={12} lg={4} xl={4} margin='1rem'>

                    <Card elevation={0} sx={{ bgcolor: '#00000000', color: 'white', textAlign: 'left' }}>
                        <CardActionArea sx={{width:'100%'}}>

                            <CardMedia
                                component="img"
                                alt={first_name}
                                // height="300"
                                image={image_url}
                            />
                        </CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h2" component="div" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                                {first_name}<br/> <b style={{color:'#fccef1'}} >{last_name}</b>
                            </Typography>
                            <Divider variant="inset" />
                            <br></br>
                            <Typography variant="body2">
                                {bio}
                            </Typography>
                            <br></br>
                            <Divider variant="inset" />
                            <br></br>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    fontWeight:'bold',
                                    float:'left'
                                }}>
                                    <PeopleIcon />
                                    <span>Followers: {followers_amount}</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    fontWeight:'bold',
                                    float:'right'
                                }}>
                                    <PeopleOutlineIcon />
                                    <span>Following: {followees_amount}</span>
                                </div>
                            {user?.id !== parseInt(id) ?
                                    <Button variant='contained' sx={{color:'white', 
                                                                    background:'#db56d775', 
                                                                    ":hover":{background:'#db56d795'},
                                                                    display:'block',
                                                                    clear:'left',
                                                                    top:'1rem'
                                                                    }} onClick={handleFollows}>{user_followed ? "Un-follow" : follows_user ? "Follow back" : "Follow"}</Button>
                                : null}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} lg={7.5} container marginTop='1rem'>

                    {user?.id === parseInt(id) ? <Grid item xs={12} marginBottom='1em'>
                        {/* <Item elevation={5} sx={{ height: '10.3em', marginBottom: '3em', bgcolor:'#d8d8d835' }} > */}

                            <TextField
                                label="Whats on your mind?"
                                placeholder="share you thoughts"
                                multiline
                                sx={{ width: '100%',textArea: { color: 'white',fontWeight:'bold' } }}
                                rows={3}
                                onChange={e => setUserPost(e.target.value)}
                                value={userPost}
                                color='secondary'
                            />

                            <Button id='feed-post-button'
                                variant='contained'
                                sx={{float:'right',margin:'1rem',color:'white', background:'#db56d775', ":hover":{background:'#db56d795'}}}
                                onClick={handlePost}
                            >POST</Button>


                        {/* </Item> */}
                    </Grid> : null}
                    <Grid item xs={12}  >
                        <Item elevation={5} sx={{ height: '43.51em', overflow: 'scroll', background: '#00000000',marginBottom:'1rem' }} >Activity
                            <ActivityFeed account={id} userActivities={userActivities} setUserActivities={setUserActivities} />
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        // </Box>
    )
}

export default ProfilePage