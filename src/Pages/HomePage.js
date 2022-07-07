import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Headline from "../Elements/Headline";
import PeopleFollowed from "../Elements/PeopleFollowed";
import Preview from "../Elements/Preview";
import ActivityFeed from "../Elements/ActivityFeed";
import { formatRelative } from 'date-fns'
import { BASE_URL } from "../Utilities";





function HomePage() {
    const [headlines ,setHeadlines] = useState([])
    const [peopleFollowed ,setPeopleFollowed] = useState([])  
    const { user } = useContext(UserContext)
    const navigate = useNavigate()



  //Getting articles below
  useEffect(()=>{
    if (user) {
    fetch(BASE_URL + '/headlines')
    .then(resp=> resp.json())
    .then(setHeadlines)
    fetch(BASE_URL + '/followees')
    .then(resp => resp.json())
    .then(setPeopleFollowed)
    }
  },[user])






  const content = headlines?.map(article =><Grid key={article.id} item> <Headline article={article}/></Grid>)
  const today = new Date()

    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    

             if (user) return (
            <Box sx={{ flexGrow: 1, margin:'1em'}}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={2} >
                  <Item elevation={10} sx={{height:'74.45em', overflowY:'scroll'}} >
                  <h2 style={{margin:0}}>People you follow</h2>
                    <PeopleFollowed people={peopleFollowed}/>
                  </Item>
                </Grid>
                <Grid item xs={6} md={10} >
                  <Item elevation={10} sx={{marginBottom:'1.5em', height:'41.8em', overflow:'scroll'}} >
                    <Grid container spacing={2} >
                    <h1 style={{width:'100%'}} >THE LATEST HERE ON UNIFYED: {formatRelative(today, new Date())}</h1>
                  {content}
                    </Grid>
                  Latest Articles HERE</Item>
                <Item elevation={10} sx={{height:'30em', overflow:'scroll'}} >
                 <h1 style={{width:'100%',margin:0}}>Activity</h1> 
                  <ActivityFeed/>
                </Item>
                </Grid>
              </Grid>
            </Box>
          )
          else return <Preview/>
          
        
}

export default HomePage