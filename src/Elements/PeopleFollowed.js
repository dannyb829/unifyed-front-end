import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PeopleFollowed({people}) {

    const navigate = useNavigate()



    const peopleList = people.map(person => (
        <div key={person.id}>
        <CardActionArea onClick={e => navigate(`/Profile/${person.id}`)}>

        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={person.first_name} src={person.image_url}/>
        </ListItemAvatar>
        <ListItemText
          primary={person.username}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                <b>{person.first_name} {person.last_name}</b>
              </Typography>
              {person.follows_user ? <><br></br>follows you too</> : null}
            </>
          }
        />
              
        
      </ListItem>
        </CardActionArea>
      <Divider variant="inset" component="li" />
        </div>


    ))







  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflowX:'clip' }}>
      {peopleList}
    </List>
  );
}

export default PeopleFollowed
