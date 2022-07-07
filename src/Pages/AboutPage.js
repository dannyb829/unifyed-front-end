import { Button, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';






function AboutPage() {

    const navigate = useNavigate()

    const { user } = useContext(UserContext)

    return (
        <Card elevation={12} sx={{ maxWidth: 1000, maxHeight: 600, minHeight: 680,margin:'auto', transform:'translate(0,10%)' }}>
            <img src='../images/unify-logo.png'></img>
            <Typography sx={{marginLeft:'7em', marginRight:'7em'}}>
                The social media for social understanding, Browse through the worlds utmost trending topics. Discuss with people all around the globe, agree or disagree with the assurance of absolute respect. Here, we are UNIFYED
            </Typography>
            {!user ? <Button variant='contained' sx={{top:'3em',background:"#2C2A4A"}} onClick={e => navigate('/login')}> Login or make an account today</Button> : null}
                </Card>
    )
}


export default AboutPage