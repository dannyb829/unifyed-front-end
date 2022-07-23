import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ActivityFeed from './ActivityFeed';
import PeopleFollowed from './PeopleFollowed';

export default function SideTabs({people}) {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', color:'white'}}>
          <TabList onChange={handleChange} 
          aria-label="lab API tabs example"
          textColor='inherit'
        indicatorColor="secondary"
          >
            <Tab label="People" sx={{fontWeight:'bold'}} value="1" />
            <Tab label="Activity" sx={{fontWeight:'bold'}} value="2" />
          </TabList>
        </Box>
        <Box sx={{position:'relative', height:'126vh', overflowY:'scroll'}}>

        <TabPanel value="1" sx={{padding:0}}><PeopleFollowed people={people} /></TabPanel>
        <TabPanel value="2" sx={{padding:0}}><ActivityFeed inSideBar={true}/></TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
