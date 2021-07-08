import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny } from 'react-redux';

import SweetAlert from 'sweetalert2';

import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import Sweet from '../Sweet/Sweet';
import logoTecho from '../images/logo-123px.png';
import { useAuth } from '../../services/supabase/auth/Auth';

import { useStyles } from './styles';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user: supabaseUser, signOut } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  const userInfo = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfo
  );

  const open = Boolean(anchorEl);

  const logOut = () => {
    signOut().then(() => {
      history.push('/');
    });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdmin = () => {
    history.push('/admin');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.navbar}>
          <Link to="/" className={classes.techoContainer}>
            <img
              className={classes.image}
              src={logoTecho}
              data-height-percentage="54"
              alt="Logo-Techo"
              data-actual-width="269"
              data-actual-height="83"
            />
          </Link>

          {userInfo?.role === 'admin' && (
            <Button onClick={handleAdmin} className={classes.adminButton}>
              Dashboard
            </Button>
          )}

          <div className={classes.rightContainer}>
            {!!supabaseUser ? (
              <div className={classes.userContainer}>
                {supabaseUser ? (
                  userInfo.firstName ? (
                    <p>Hola, {userInfo.firstName}!</p>
                  ) : (
                    <p>{supabaseUser.email}</p>
                  )
                ) : null}
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar src={supabaseUser?.user_metadata?.avatar_url} />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => history.push('/userUpdate')}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <div style={{ height: 'inherit ' }}>
                <Sweet swal={SweetAlert} text="Login" />
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.navbar} />
    </div>
  );
}
