import { Button, Card, Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';






function AboutPage() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    return (
        <Card elevation={0} sx={{ width:'40rem',margin:'auto', bgcolor:'#0000'}}>
            <img src='../images/unify-logo.png'></img>
            <Typography sx={{margin:'2em 5em',color:"#fff"}}>
                The social media for social understanding, Browse through the worlds utmost trending topics. Discuss with people all around the globe, agree or disagree with the assurance of absolute respect. Here, we are UNIFYED
            </Typography>
            {!user ? <Button variant='contained' sx={{background:'#db56d775', ":hover":{background:'#db56d795'}}} onClick={e => navigate('/login')}> Login or make an account today</Button> : null}
                </Card>
    )
}


export default AboutPage