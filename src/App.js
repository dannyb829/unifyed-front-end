
import './App.css';
import LoginPage from './landing/LoginPage';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import ProfilePage from './Pages/ProfilePage'
import ArticlePage from './Pages/ArticlePage';
import AccountPage from './Pages/AccountPage';
import SearchPage from './Pages/SearchPage';
import NavBar from './Elements/NavBar';
import { UserContext } from './UserContext';
import { useEffect, useState } from 'react';
import {Routes,
        Route,
        useNavigate
} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import Publish from './Pages/Publish';
import { BASE_URL } from './Utilities';

function App() {
  const [user ,setUser] = useState(null) 
  document.title = 'UNIFYED'
  
  const navigate = useNavigate()

  const pages = user?.account_access === 'creator' ? ['Home', 'About', 'Publish'] : ['Home', 'About']

          


  useEffect(() => {
    fetch(BASE_URL + "/auth", {headers:{"Authorization": localStorage.getItem('token')}}).then((r) =>
      r.ok
        ? r.json().then((data) => {
            setUser(data);
          })
        : navigate("/login")
    );
  }, []);

  return (
    <div className="App">
    <SnackbarProvider maxSnack={3}
    anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
    }}
    // preventDuplicate
    >

    <UserContext.Provider value={{ user, setUser}}>
    <NavBar pages={pages}/>
    <Routes>
      <Route path='/login' element={<LoginPage setUser={setUser}/>}></Route>
      <Route path='/Home' element={<HomePage setUser={setUser}/>}></Route>
      <Route path='/Profile/:id' element={<ProfilePage/>}></Route>
      <Route path='/About' element={<AboutPage/>}></Route>
      <Route path='/Article/:id' element={<ArticlePage/>}></Route>
      <Route path='/Account' element={<AccountPage/>}></Route>
      <Route path='/Search/:query' element={<SearchPage/>}></Route>
      <Route path='/Publish' element={<Publish/>} ></Route>
    </Routes>
    </UserContext.Provider>
    </SnackbarProvider>
    </div>
  );
}

export default App;
