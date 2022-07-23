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
import SideTabs from "../Elements/SideTabs"
import { BASE_URL } from "../Utilities";





function HomePage() {
    const [headlines ,setHeadlines] = useState([])
    const [peopleFollowed ,setPeopleFollowed] = useState([])  
    const { user } = useContext(UserContext)
    const navigate = useNavigate()



  //Getting articles below
  useEffect(()=>{
    if (user) {
    fetch(BASE_URL + '/headlines',{headers:{"Authorization": localStorage.getItem('token')}})
    .then(resp=> resp.json())
    .then(setHeadlines)
    fetch(BASE_URL + '/followees',{headers:{"Authorization": localStorage.getItem('token')}})
    .then(resp => resp.json())
    .then(setPeopleFollowed)
    }
  },[user])






  const content = headlines?.map(article =><Grid key={article.id} item> <Headline article={article}/></Grid>)
  const today = new Date()

    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#d8d8d835',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    

            if (user) return (
            <Box sx={{ flexGrow: 1, margin:'1em'}}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={2} >
                  <Item sx={{height:'131.5vh'}} >
                    <SideTabs people={peopleFollowed}/>
                  </Item>
                </Grid>
                <Grid  item xs={6} md={10} >
                    <h1 style={{color:'#fccef1',fontSize:'6vw',fontWeight:'bold',marginTop:0, textAlign:'right'}} >¶ THE LATEST HERE ON UNIFYED: {formatRelative(today, new Date())}</h1>
                    <Grid container spacing={2} sx={{height:'100vh',justifyContent:'right',paddingRight:'.3rem', overflow:'scroll'}}>
                  {content}
                    </Grid>
                </Grid>
              </Grid>
            </Box>
          )
          else return <Preview/>
          
        
}

export default HomePage