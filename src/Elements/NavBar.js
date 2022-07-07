import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { BASE_URL } from '../Utilities';





const Search = styled('div')(({ theme }) => ({
    left:'3em',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginTop: '1em',
    width: '100%',
    height: '60%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '45ch',
        },
    },
}));

const NavBar = ({pages}) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const { user, setUser } = useContext(UserContext)

    // useEffect(()=>{
    //     console.log('re-render')
    // },[])
    
    const handleOpenChat = () => {
        console.log('not yett.... chat menu coming soon')
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navToProfile = (e) => {
        navigate(`/${e.target.innerText}/${user.id}`)
        handleCloseUserMenu()
    }

    const logOut = () => {
        fetch(BASE_URL + '/logout', { method: 'DELETE' })
            .then(resp => {
                if (resp.ok) {
                    setUser(null)
                    navigate('/login')
                }
            })
        handleCloseUserMenu()
    }

    const navToAccount = () => {
        handleCloseUserMenu()
        navigate('/Account')
    }

    const handleSearchEnter = (e) => {
        e.preventDefault()
        navigate(`/Search/${search}`)
    }

    return (
        <AppBar position="sticky" style={{ background: '#2C2A4A', height: '5em' }} >
            <Container maxWidth="xl" id='nav-bar'>
                <Toolbar disableGutters>
                    <img src='/images/unify-logo.png' style={{ maxWidth: '3em' }}></img>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/Home"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <img src='/images/header-unifyed.png' id='header-unifyed'></img>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                name={page}
                                onClick={e => navigate(`/${e.target.name}`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}




                        {user ? <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <form onSubmit={handleSearchEnter}>
                            <StyledInputBase
                                placeholder="Search People and Articles..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            </form>
                        </Search> : null}


                    </Box>

                    {user ? <><Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.first_name} src={user.image_url} />
                            </IconButton>
                            </>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={navToProfile}>
                                <Typography textAlign="center">Profile</Typography>
                            </MenuItem>
                            <MenuItem onClick={navToAccount}>
                                <Typography textAlign="center">Account</Typography>
                            </MenuItem>
                            <MenuItem onClick={logOut}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                        <Typography sx={{ marginLeft: '1em' }}>Hello {user.first_name}!</Typography>
                    </>
                        : <Button sx={{color:'white'}} onClick={e => navigate('/login')}>Login</Button>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
