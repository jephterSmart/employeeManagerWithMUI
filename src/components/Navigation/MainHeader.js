import React from 'react';
import {Link} from 'react-router-dom';
import { Grid,AppBar, Toolbar,Button,Typography,IconButton,Badge, MenuItem, Menu} from '@material-ui/core'
import {makeStyles,useTheme} from '@material-ui/core/styles';
import {ArrowForwardIos,ArrowBackIos,Dashboard,NotificationImportant, AccountCircle} from '@material-ui/icons';
import clsx from 'clsx';


const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(5),
      },
      hide: {
        display: 'none',
      }
}))
const MainHeader = props => { 
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const {open, setOpen,header} = props;
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
      
    };

    const menuId = 'primary-search-account-menu';
    let label = "Employees Management";
    if(header == '/user')
    label = "Dashboard";
    let isAuthenticated = localStorage.getItem('idToken') != null;
    
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link style={{textDecoration:'none', color:'inherit'}} to='/logout'>Logout</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
return ( 
    <>
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            <Grid container justify='space-between' >

            <Grid item>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(false)}
            edge="start"
            variant='contained'
            className={clsx(classes.menuButton, !open && classes.hide)}
          >
            <ArrowBackIos size="medium" />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <ArrowForwardIos size="medium" />
          </IconButton>
          <Typography variant="h6" component='span' noWrap>
            {label}
          </Typography>
          </Grid>
          <Grid item>
            {isAuthenticated ?
            (<>
                <Link style={{textDecoration:'none', color:'inherit'}} to='/user'>
                <IconButton
                color="inherit"
                aria-label="Dashboard"
                >
                    <Dashboard />
                </IconButton>
                </Link>
                <IconButton
                color="inherit"
                aria-label="Dashboard"
                >
                    <Badge badgeContent={3}  color="secondary">
                        <NotificationImportant />
                    </Badge>
                </IconButton>
                <IconButton onClick={handleProfileMenuOpen}>
                    <AccountCircle style={{color:'white'}}/>
                </IconButton>
                
               
                 </>) :(
                 <Link style={{textDecoration:'none', color:'inherit'}} to='/login'>
                <IconButton
                color="inherit"
                aria-label="Dashboard"
                onClick={() => {return "love"}}>
                    Login
                </IconButton>
                </Link>)}
          </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
      </>
    );

}


export default MainHeader;