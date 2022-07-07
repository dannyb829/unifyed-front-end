import { useState, useEffect, useContext } from "react"
import * as React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


function ActivityFeed({ account = '', userActivities = null, setUserActivities}) {

    const { user } = useContext(UserContext)

    const [activities, setActivities] = useState([])

    
    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetch(`/activities/${account}`)
            .then(resp => resp.ok ? resp.json().then(setActivities)
                : resp.json().then(data => enqueueSnackbar(data.error, { variant: 'error' })))
        if (userActivities) {
            setActivities([userActivities,...activities])
            setUserActivities(null)
        }
    }, [userActivities,account])


    function deletUserPost(postId) {
        fetch(`/posts/${postId}`,{ method: 'DELETE' })
        .then(resp => setActivities(prev => prev.filter(act => act.trackable.id !== postId)))
    }



    function manageActivity(activity) {
        const {owner, recipient, trackable, trackable_type, recipient_type} = activity
        switch (trackable_type) {
            case 'Comment':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            <b onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        </Typography>
                        {" "}commented on <b>{recipient_type === 'Headline' ? recipient?.author : recipient?.first_name + "'s"}</b> {recipient_type} - {trackable?.content}
                    </React.Fragment>
                );

            case 'Like':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        </Typography>
                        {" "}liked <b>{recipient_type === 'Headline' ? recipient?.author + "'s" : recipient?.first_name + "'s"}</b> {trackable?.likeable_type}
                    </React.Fragment>
                );
            case 'Post':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        </Typography>
                        {" "}posted on <b>Feed</b> -<strong style={{fontSize:'1.3em'}}>  "{trackable.content}"</strong> 
                        { user?.id === owner.id ? <IconButton aria-label="delete" sx={{float:'right'}} onClick={e => deletUserPost(trackable.id)}>
          <DeleteIcon />
        </IconButton> : null}
                    </React.Fragment>
                )
            case 'Friendship':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        </Typography>
                        {" "}now follows <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${recipient.id}`)}>{recipient.first_name + " " + recipient.last_name}</b>
                    </React.Fragment>
                )
            case 'Headline':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="h6"
                            color="text.primary"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        </Typography>
                        {" "}published an article <b style={{cursor:'pointer'}} onClick={e => navigate(`/Article/${trackable.id}`)}>{trackable?.title}</b>
                    </React.Fragment>
                )

        }
    }








    const displayActivities = activities.map(act => (
        <div key={act.id}>
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                <Avatar alt={act.owner.first_name} src={act.owner.image_url} />
            </ListItemAvatar>
            <ListItemText
                primary={formatDistance(new Date(act.created_at), new Date(), { addSuffix: true })}
                secondary={
                    manageActivity(act)
                }
            />

        </ListItem>
        <Divider variant="inset" component="li" />
        </div>
    )
    )


    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', overflow:'scroll' }}>
            {displayActivities}
        </List>
    )
}

export default ActivityFeed