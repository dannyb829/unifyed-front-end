import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'



function Headline({article}) {

    const navigate = useNavigate()
    
    const {
        id,
        content,
        title,
        date,
        source,
        author,
        image_url
    } = article

    return (
        <Card elevation={10} sx={{ maxWidth: 374 }}>
      <CardActionArea onClick={e=> navigate(`/Article/${id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={image_url}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {author}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            {formatRelative(new Date(date), new Date())}
          </Typography>
          <Typography sx={{maxHeight:'10em', overflow:'clip'}} variant="body2" color="text.secondary">
            {content}...
          </Typography>
          <Typography variant="p" color="text.secondary">
            {source}
          </Typography>
          <h5>CLICK FOR MORE..</h5>
        </CardContent>
      </CardActionArea>
    </Card>
    )
}

export default Headline