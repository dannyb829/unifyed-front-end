import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../Utilities'







function Preview() {

    const [previewArticles ,setPreviewArticles] = useState([]) 
    const { enquequeSnackbar } = useSnackbar()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch(BASE_URL + '/preview')
        .then(resp => {if (resp.ok) resp.json().then(setPreviewArticles)})
        .catch(err => enquequeSnackbar(err,{variant:'error'}))
    },[])
   

    const preview = previewArticles.map(article => (

        <Grid item key={article.id} xs={10}>
             <Card>
        <CardMedia
          component="img"
          height="140"
          image={article.image_url}
          alt="Article preview image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title.slice(0,40)}...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content.slice(0,150)}...
          </Typography>
        </CardContent>
    </Card>
        </Grid>
    ))
    

    return (
        <Card elevation={12} sx={{ maxWidth: 1000, margin: '5rem auto', bgcolor:'#d8d8d845', color:'white' }}>
            <h1>Read these articles and more...</h1>
            <Grid container spacing={7} sx={{justifyContent:'center'}}>
                {preview}
            </Grid>
            <h2>Join the UNIFYED community and stay up to date on the latest world news!</h2>
            <Button variant='contained' sx={{background:"#2C2A4A", marginBottom:'2rem'}} onClick={e => navigate('/login')}> Login or make an account today</Button>
        </Card>
    )
}

export default Preview