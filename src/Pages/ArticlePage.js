import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Discussion from '../Elements/Discussion';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useSnackbar } from 'notistack';
import { UserContext } from '../UserContext';
import { BASE_URL } from '../Utilities';

function ArticlePage() {
    const [article, setArticle] = useState({})
    
    const { user } = useContext(UserContext)
    
    const { enqueueSnackbar } = useSnackbar()
    
    const { id } = useParams()
    

 
    useEffect(() => {
        fetch(BASE_URL + `/headlines/${id}`,{headers:{"Authorization": localStorage.getItem('token')}})
        .then(resp => resp.json())
        .then(setArticle)
    }, [])
    
    const {
        content,
        title,
        date,
        source,
        author,
        image_url,
        likes,
        user_liked
    } = article
    
    


    const handleIncrementLike = (type,type_id) => {
        fetch(BASE_URL + '/likes',{
            method:'POST',
            headers: {'Content-Type':'application/json', "Authorization": localStorage.getItem('token')},
            body: JSON.stringify({type, type_id})})
        .then(resp => resp.ok ? resp.json().then(update => {console.log('like added',update);setArticle(update)})
            : resp.json().then(({error}) => enqueueSnackbar(error,{variant:'error'})))
    }
    const handleDecrementLike = (type,type_id) => {
        fetch(BASE_URL + '/likes/1',{
            method:'DELETE',
            headers: {'Content-Type':'application/json', "Authorization": localStorage.getItem('token')},
            body: JSON.stringify({type, type_id})})
        .then(resp => resp.ok ? setArticle(prev => ({...prev, 'likes': likes.filter(like => like.account_id !== user.id), 'user_liked': !user_liked}))
            : resp.json().then(({error}) => enqueueSnackbar(error, 'error')))
    }

    return (
        <Grid container spacing={3} sx={{justifyContent:'center',marginTop:'3em'}}>
            <Grid item xs={12} lg={8}>

                <Card elevation={12} sx={{ maxHeight: 600, minHeight: 680, overflow: 'scroll',bgcolor:'#40464a45', margin:'0 1rem'}}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={image_url}
                        alt={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color='white'>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="white">
                            {content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* <Button size="small">Share</Button> */}
                        <Button size="small" 
                        sx={{color:'white',background:'#db56d775',":hover":{background:'#db56d795'}}}
                        onClick={e => user_liked ? handleDecrementLike('Headline',id) : handleIncrementLike('Headline',id)} 
                        endIcon={user_liked ? <ThumbUpAltIcon/> : <ThumbUpOffAltIcon/>}>{`${likes?.length} ${likes?.length === 1 ?"Like" : "Likes"}`}</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} lg={3}>
                <Discussion article={article}/>
            </Grid>
        </Grid>
    );
}


export default ArticlePage