import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import Cookies from 'universal-cookie';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import axios from "axios";
import jwt_decode from "jwt-decode";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import BookIcon from '@mui/icons-material/Book';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import configData from "./config.json";

export default function Header() {
  const baseURL = configData.BACKEND_URL

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [data, setData] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const cookies = new Cookies();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/userprofile';
  };

  const myposts = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/myposts';
  };

  const mydrafts = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/mydrafts';
  };

  const notifications = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/notifications';
  };

  const myreadinglist = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/myreadinglist';
  };

  const create = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location = '/create';
  };

  const logout = () => {
    cookies.remove("access_token", { path: '/' })
    setAnchorEl(null);
    handleMobileMenuClose();
    window.location.reload();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    const tokenStr = cookies.get('access_token')

    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }

    axios.get(baseURL + 'user', { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} style={{ color: "black", fontFamily: 'Playfair Display' }}>Profile</MenuItem>
      <MenuItem onClick={logout} id="logout" style={{ color: "black", fontFamily: 'Playfair Display' }}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p >Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "white" }}>
        <Toolbar>
          <img src="/favicon.ico" alt="logo" style={{ maxWidth: 30, marginRight: '10px' }} />
          <a href="/" style={{ textDecoration: 'none' }} >

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ color: "black", fontWeight: 'bold', fontSize: 26, fontFamily: "Playfair Display"  }}>
              Epitomize
            </Typography>
          </a>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="notifications"
          >
            <NotificationsIcon onClick={notifications} />
            
          </IconButton>
          <IconButton
            size="large"
            aria-label="posts"
          >
            <DriveFileRenameOutlineIcon onClick={create} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="posts"
          >
            <BookIcon onClick={myposts} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="drafts"
          >
            <SaveAsIcon onClick={mydrafts} />
          </IconButton>
          <IconButton
            size="large"
            aria-label="reading list"
          >
            <AutoStoriesIcon onClick={myreadinglist} />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              id="account"
              style={{ color: "black" }}
            >
              {data && data.Profilepicture ?
                <Box>
                  <img className="preview" src={require("./images/" + data.Profilepicture)} 
                  alt={data.Username}
                  style={{
                    borderRadius: "50%",
                    width: 40,
                    height: 40
                  }} />

                </Box>
                :
                <AccountCircle />
              }

            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}