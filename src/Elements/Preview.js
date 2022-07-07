import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";







function Preview() {

    const [previewArticles ,setPreviewArticles] = useState([]) 
    const { enquequeSnackbar } = useSnackbar()
    const navigate = useNavigate()

    useEffect(()=>{
        fetch('/preview')
        .then(resp => {if (resp.ok) resp.json().then(setPreviewArticles)})
        .catch(err => enquequeSnackbar(err,{variant:'error'}))
    },[])
   

    const preview = previewArticles.map(article => (

        <Grid item key={article.id}>
             <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={article.image_url}
          alt="Article preview image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title.slice(0,20)}...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.content.slice(0,38)}...
          </Typography>
        </CardContent>
    </Card>
        </Grid>
    ))
    

    return (
        <Card elevation={12} sx={{ maxWidth: 1000, maxHeight: 600, minHeight: 680, margin: 'auto', transform: 'translate(0,10%)' }}>
            <h1>Read these articles and more...</h1>
            <Grid container spacing={7} sx={{justifyContent:'center'}}>
                {preview}
            </Grid>
            <div style={{transform:'translate(0,10em)'}}>
            <h2>Join the UNIFYED community and stay up to date on the latest world news!</h2>
            <Button variant='contained' sx={{top:'3em',background:"#2C2A4A"}} onClick={e => navigate('/login')}> Login or make an account today</Button>
            </div>
        </Card>
    )
}

export default Preview