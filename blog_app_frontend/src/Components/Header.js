import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { i18n } from "../index";
import { Translation } from "react-i18next";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchPosts from './SearchPosts';
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../store/slices/userSlice";
import { Logout } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user?.userDto);
  const dispatch = useDispatch()

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const logout = () => {
    dispatch(userLoggedOut())
    navigate("/")
  }

  const loginAndSignUpButtons = !user && (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={() => navigate('/register')}
      >
        <Translation>{(t) => t('signUp')}</Translation>

      </Button>
      <Button
        variant="outlined"
        size="small"
        sx={{ ml: 1, mr: "15px" }}
        onClick={() => navigate('/login')}
      >
        <Translation>{(t) => t('logIn')}</Translation>
      </Button>
    </>
  )

  const userDataComponent = user && (
    <>
      <Typography component="span" variant="subtitle1" color="inherit" noWrap>
        {user.email}
      </Typography>
      <Button
        variant="contained"
        startIcon={<Logout />}
        onClick={logout}
        color="secondary"
        sx={{
          ml: 1,
          mr: 3,
        }}
      >
        <Translation>{(t) => t('logOut')}</Translation>
      </Button>
    </>
  )


  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate('/posts/newpost')}
        >
          <Translation>{(t) => t('newPost')}</Translation>
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
          onClick={() => navigate('/posts/all')}
        >
          <Translation>{(t) => t('allPosts')}</Translation>
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          align="center"
          onClick={() => navigate('/')}
          noWrap
          sx={{ flex: 1, cursor: 'pointer', "&:hover": { color: "blue" } }}>
          <Translation>{(t) => t('title')}</Translation>
        </Typography>
        <IconButton>
          <SearchPosts />
        </IconButton>
        {
          loginAndSignUpButtons || userDataComponent
        }
        <Translation>
          {(t, { i18n }) => (
            <ToggleButtonGroup
              color="primary"
              size="small"

              value={t("language") === "en" ? "en" : "lt"}
              defaultValue="en"
              onChange={changeLanguage}
              sx={{ marginLeft: "auto", align: "right" }}
            >
              <ToggleButton value="en">En</ToggleButton>
              <ToggleButton value="lt">Lt</ToggleButton>
            </ToggleButtonGroup>
          )}
        </Translation>
      </Toolbar>
      </>
  );
}

export default Header;
