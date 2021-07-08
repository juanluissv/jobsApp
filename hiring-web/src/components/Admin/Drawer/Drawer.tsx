import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoTecho from '../../images/logo_techo_blanco.png';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import {
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Container,
  List,
  CssBaseline,
  Typography,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core/';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { useAuth } from '../../../services/supabase/auth/Auth';
import { useStyles } from './styles';

export default function DrawerNavBar() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openSupabase = Boolean(anchorEl);

  const { user: supabaseUser, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    history.push('/');
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Container>
            <Link to="/admin">
              <img className={classes.image} src={logoTecho} alt="Logo-Techo" />
            </Link>
          </Container>
          <Container className={classes.containerUser}>
            {supabaseUser ? (
              <Typography>{supabaseUser.email}</Typography>
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
              open={openSupabase}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push('/userUpdate')}>
                Profile
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
            </Menu>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <Container className={classes.toolbar}>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </Container>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/admin')}>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItem>
          <ListItem button onClick={() => history.push('/admin/createJob')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear postulacion" />
          </ListItem>
          <ListItem button onClick={() => history.push('/')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesion" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </Container>
  );
}
