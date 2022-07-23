import { useNavigate, useParams } from "react-router-dom"
import { Grid, styled } from "@mui/material"
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { BASE_URL } from "../Utilities";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '25em'
}));

export default function SearchPage() {
    const [headlineResults, setHeadlineResults] = useState([])
    const [peopleResults, setPeopleResults] = useState([])
    const navigate = useNavigate()


    const { query } = useParams()

    useEffect(() => {
        fetch(BASE_URL + '/headlines/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
            body: JSON.stringify({ search: query })
        })
            .then(resp => resp.json())
            .then(setHeadlineResults)
        fetch(BASE_URL + '/accounts/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
            body: JSON.stringify({ search: query })
        })
            .then(resp => resp.json())
            .then(setPeopleResults)
    }, [query])




    const headlineContent = headlineResults.map(result => {

        return (
            
            <Grid item xs={1} md={3} >
            <Card sx={{maxWidth: 345, bgcolor:'#aab0b445', color:'white'}}>
                <CardActionArea onClick={e => navigate(`/Article/${result.id}`)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={result.image_url}
                        alt={result.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {result.title.slice(0, 50) + '...'}
                        </Typography>
                        <Typography variant="body2" >
                            {result.content.slice(0, 100) + '...'}<small>click for more</small>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        )
    })


    const peopleContent = peopleResults.map(result => {
        
        return (
            
            <Grid item xs={1} md={3}>
            <Card sx={{ maxWidth: 345,bgcolor:'#aab0b445', color:'white' }}>
                <CardActionArea onClick={e => navigate(`/Profile/${result.id}`)}>
                    <CardMedia
                        component="img"
                        height="250"
                        image={result.image_url}
                        alt={result.first_name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {result.first_name + " " + result.last_name}
                        </Typography>
                        <Typography variant="body2" >
                            <small>{result.username}</small>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Grid>
        )
    })











    return (
        <Grid container spacing={4} sx={{ justifyContent: 'center', marginTop: '1em', marginBottom: '2em' }}>
            <Grid item xs={6} md={11} >
                <Item elevation={5} sx={{ height: '27em', overflow:'scroll',bgcolor:'#0000' }}>People on UNIFYED
                    <Grid container spacing={1} sx={{ }} >
                    {peopleContent.length < 1 ? <h2>{`No users found: "${query}" `}</h2> : null}
                    {peopleContent}
                    </Grid>
                </Item>
            </Grid>
            <Grid item xs={6} md={11}>
                <Item elevation={5} sx={{ height: '27em', overflow:'scroll', bgcolor:'#0000'}}>Headlines
                    <Grid container spacing={1} sx={{ }} >
                    {headlineContent.length < 1 ? <h1>{`No users found: "${query}" `}</h1> : null}
                    {headlineContent}
                    </Grid>
                </Item>
            </Grid>
        </Grid>
    )
}