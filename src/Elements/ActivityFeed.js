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
import { BASE_URL } from '../Utilities'


function ActivityFeed({ account = '', userActivities = null, setUserActivities, inSideBar = false}) {

    const { user } = useContext(UserContext)

    const [activities, setActivities] = useState([])

    const sideBarFont = inSideBar ? 'small' : 'h6'

    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        fetch(BASE_URL + `/activities/${account}`,{ headers: {"Authorization": localStorage.getItem('token')}})
            .then(resp => resp.ok ? resp.json().then(setActivities)
                : resp.json().then(data => enqueueSnackbar(data.error, { variant: 'error' })))
        if (userActivities) {
            setActivities([userActivities,...activities])
            setUserActivities(null)
        }
    }, [userActivities,account])


    function deletUserPost(postId) {
        fetch(BASE_URL +`/posts/${postId}`,{ method: 'DELETE', headers:{"Authorization": localStorage.getItem('token')} })
        .then(resp => setActivities(prev => prev.filter(act => act.trackable?.id !== postId)))
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
                            variant={sideBarFont}
                            color="white"
                        >
                            <b onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        {" "}commented on <b>{recipient_type === 'Headline' ? recipient?.author : recipient?.first_name + "'s"}</b> {recipient_type} - {trackable?.content}
                        </Typography>
                    </React.Fragment>
                );

            case 'Like':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={sideBarFont}
                            color="white"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        {" "}liked <b>{recipient_type === 'Headline' ? recipient?.author + "'s" : recipient?.first_name + "'s"}</b> {trackable?.likeable_type}
                        </Typography>
                    </React.Fragment>
                );
            case 'Post':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={sideBarFont}
                            color="white"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner.first_name + " " + owner.last_name}</b>
                        {" "}posted on <b>Feed</b> -<strong style={{fontSize:'1.3em'}}>  "{trackable.content}"</strong> 
                        </Typography>
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
                            variant={sideBarFont}
                            color="white"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner.id}`)}>{owner?.first_name + " " + owner?.last_name}</b>
                        {" "}now follows <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${recipient?.id}`)}>{recipient?.first_name + " " + recipient?.last_name}</b>
                        </Typography>
                    </React.Fragment>
                )
            case 'Headline':
                return (
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={sideBarFont}
                            color="white"
                        >
                            <b style={{cursor:'pointer'}} onClick={e => navigate(`/Profile/${owner?.id}`)}>{owner?.first_name + " " + owner?.last_name}</b>
                        {" "}published an article <b style={{cursor:'pointer'}} onClick={e => navigate(`/Article/${trackable?.id}`)}>{trackable?.title}</b>
                        </Typography>
                    </React.Fragment>
                )

        }
    }








    const displayActivities = activities?.map(act => (
        <div key={act.id} >
        <ListItem alignItems="flex-start" sx={{padding:.5}}>
            <ListItemAvatar>
                <Avatar alt={act?.owner.first_name} src={act?.owner.image_url} />
            </ListItemAvatar>
            {inSideBar ? <br></br> : null}
            <ListItemText
                primary={formatDistance(new Date(act.created_at), new Date(), { addSuffix: true })}
                secondary={
                    manageActivity(act)
                }
                style={{color:'white'}}
            />

        </ListItem>
        <Divider variant="inset" component="li" />
        </div>
    )
    )


    return (
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: '#00000000'}}>
            {displayActivities}
        </List>
    )
}

export default ActivityFeed