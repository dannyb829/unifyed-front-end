import { Button, Card, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';






function AboutPage() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    return (
        <Grid container spacing={3} sx={{height:'100vh'}} >
            <Grid item xs={12}>
                <img alt='unifyed logo' src='../images/unify-logo.png' style={{maxWidth:'50%'}}></img>
                    <p style={{color:"#fff", maxWidth:'35%', margin:'auto'}}>
                The social media for social understanding, Browse through the worlds utmost trending topics. Discuss with people all around the globe, agree or disagree with the assurance of absolute respect. Here, we are<b style={{color:'pink'}}> UNIFYED</b>
                    </p>
                    {!user ? <Button variant='contained' sx={{background:'#db56d775', ":hover":{background:'#db56d795'}, margin:'1rem'}} onClick={e => navigate('/login')}> Login or make an account today</Button> : null}
            </Grid>
        </Grid>
    )
}


export default AboutPage