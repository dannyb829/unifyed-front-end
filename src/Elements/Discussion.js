import { useContext, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { Button, TextField, Box, Card } from '@mui/material';
import { UserContext } from '../UserContext';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { BASE_URL } from '../Utilities';

export default function Discussion({ article }) {
  const [comments, setComments] = useState(null)
  const [newComment, setNewComment] = useState('')

  const {user} = useContext(UserContext)

  const {enqueueSnackbar} = useSnackbar()

  useEffect(() => {
    if (article.comments) setComments(article.comments)
  }, [article])

  const handlePostComment = () => {
    fetch(BASE_URL + '/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem('token') },
      body: JSON.stringify({ content: newComment, id: article.id, type:'Headline' })
    })
      .then(resp => resp.ok ? resp.json().then(data => setComments(prev => [...prev, data]))
        : resp.json().then(data => enqueueSnackbar(data.error,{variant:'error'}))).catch(err => enqueueSnackbar('something went wrong',{variant: 'error'}))
    setNewComment('')
  }

  
  const handleDeleteComment = (id) => {
    fetch(`/comments/${id}`, {method: 'DELETE', headers: {"Authorization": localStorage.getItem('token')}})
    .then(resp => {if (resp.ok) setComments(prev => prev.filter(comment => comment.id !== id))})
  }
  
  const discussion = comments ? comments.map(comment => {
    
    const {likes} = comment

    const handleLike = (method, type, type_id) => {
      method === 'POST' ? 
      fetch(BASE_URL +`/likes`,{
        method,
        headers: {'Content-Type': 'application/json', "Authorization": localStorage.getItem('token')},
        body: JSON.stringify({type,type_id})})
        .then(resp => resp.ok ? resp.json().then(update => setComments(prev => prev.map(comm => comm.id === update.id ? update : comm)))
              : resp.json().then(({error}) => enqueueSnackbar(error,{variant:'error'}))) :
      fetch(BASE_URL +'/likes/1',{
        method,
        headers: {'Content-Type':'application/json', "Authorization": localStorage.getItem('token')},
        body: JSON.stringify({type, type_id})})
        .then(resp => resp.ok ? setComments(prev => prev.map(comm => comm.id === type_id ? {...comm, 'likes': likes.filter(like => like.account_id !== user.id), 'user_liked': !comm.user_liked} : comm))
              : resp.json().then(({error}) => enqueueSnackbar(error, 'error')))
    }
    
    if (comments) return (
    <div key={comment.id} >
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt={comment?.account.username} src={comment?.account.image_url} />
        </ListItemAvatar>
        <ListItemText
          primary={comment?.account.username}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment?.content}
              </Typography>
              <br></br>{formatDistance(new Date(comment?.created_at), new Date(), {addSuffix: true})}
            </>
          }
        />
        <IconButton onClick={e=> handleLike(comment.user_liked ? 'DELETE' : 'POST', 'Comment', comment.id)}>
          {comment.user_liked ? <ThumbUpAltOutlined/> : <ThumbUpAltIcon/>}
        </IconButton>
          {comment?.likes.length + " " + "likes"}
        { user?.id === comment?.account.id ? <IconButton aria-label="delete" onClick={e => handleDeleteComment(comment.id)}>
          <DeleteIcon />
        </IconButton> : null}
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  )}) : null




  return (
    <Card elevation={12}> 

      <List sx={{ maxWidth: 380, bgcolor: 'background.paper' }}>
        <Box>

          <TextField
            id="outlined-name"
            name="comment"
            value={newComment}
            placeholder={discussion ? 'what are your thoughts?' : 'Be the first to comment!'}
            onChange={e => setNewComment(e.target.value)}
          />
          <Button variant='contained' onClick={handlePostComment} >Post</Button>
        </Box>
        {discussion}
      </List>
    </Card>
  );
}
