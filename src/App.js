import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import LayersIcon from '@material-ui/icons/Layers';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import SpaIcon from '@material-ui/icons/Spa';
import BuildIcon from '@material-ui/icons/Build';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import {
  dodaniePrzedmiotu,
  logowanie,
  rejestracja,
  dzialy,
  podgladPrzedmiotu,
  udostepnionePrzedmioty,
  wypozyczonePrzedmioty,
  wypozyczeniePrzedmiotu,
  edycjaPrzedmiotu,
  konto,
  widokuzytkownika,
  glowna,
  konkretny_dzial
}
  from '../src/common/routes';
import Pbject from '../src/dodanieprzedmiotu/dodanieprzedmiotu';
import Login from '../src/logowanie/logowanie';
import Registration from '../src/rejestracja/rejestracja';
import Dzialy from '../src/widokdziałow/dzialy';
import PreviewObject from '../src/widokdziałow/podgladPrzedmiotu';
import Sharing1 from '../src/widokPrzedmiotów/udostępionePrzedmioty';
import Sharing from '../src/widokPrzedmiotów/wypożyczonePrzedmioty';
import LendItem from '../src/wypozyczeniePrzedmiotu/wypozyczeniePrzedmiotu';
import DeleteBject from '../src/usuwanieEdycjaPrzedmiotu/usunEdytujPrzedmiot';
import Account from '../src/logowanie/konto';
import WidokUzytkownika from "../src/widokUzytkownika/widokuzytkownika";
import AuthService from "../src/api/auth";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  inAppBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 4,
    variant: 'h6',
    align: "center",
    component: "h3",
    fontWeight: 'bold',
    fontSize: '25px',
    position: 'relative',
    left: '170px',
    letterSpacing: '10px',
    fontStyle: 'italic',
  },
  buttonMenu: {
    marginRight: theme.spacing(2),
    backgroundColor: '#502664',
  },
  hide: {
    display: 'none',
  },
  toDrawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#502664',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#502664',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    justifyContent: 'flex-center',
    backgroundColor: '#502664',
  },
  menuItem: {
    backgroundColor: '#502664',
    color: 'white'
  },
  popup: {
    padding: theme.spacing(10),
  },
  container: {
    backgroundColor: '#502664'
  },
  link: {
    display: 'none',
  },
  grids: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const userid = AuthService.getCurrentUser();
  /***funkcja wylogywania */
  const HandleWyloguj = () => {
    AuthService.logout()
    window.location.reload();
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Router>
      <div>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: '#502664' }}
          position="absolute"
          className={clsx(classes.appBar, {
            [classes.inAppBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.buttonMenu, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              Wrap
              className={classes.title}
            >
              Wypożyczalnia
          </Typography>
            {console.log("AUTH USER", AuthService.getCurrentUser())}
            {
              (AuthService.getCurrentUser())
                ?
                <div className={classes.grids}>
                  <PopupState variant="popover" popupId="demo-popup-popover" className={classes.popup}>
                    {(popupState) => (
                      <Grid >
                        <Button variant="contained" style={{ backgroundColor: '#190423', color: 'white' }} {...bindTrigger(popupState)}>
                          Twoje przedmioty
          </Button>
                        <Menu {...bindPopover(popupState)} >
                          <Link to={dodaniePrzedmiotu} > <MenuItem onClick={popupState.close} className={classes.menuItem}>Dodaj przedmiot</MenuItem> </Link>
                          <Link to={`/udostepnionePrzedmioty/${userid.id}`}>  <MenuItem onClick={popupState.close} className={classes.menuItem}>Przedmioty udostępnione</MenuItem> </Link>
                          <Link to={`/wypozyczonePrzedmioty/${userid.id}`}> <MenuItem onClick={popupState.close} className={classes.menuItem}>Przedmioty wypożyczone</MenuItem> </Link>
                          <Link to={`/edycja/${userid.id}`}> <MenuItem onClick={popupState.close} className={classes.menuItem}>Edytuj/Usuń przedmiot</MenuItem> </Link>
                        </Menu>
                      </Grid>
                    )}
                  </PopupState>
                  <PopupState variant="popover" popupId="demo-popup-popover" className={classes.popup}>
                    {(popupState) => (
                      <Grid >
                        <Button variant="contained" style={{ background: '#190423', color: 'white' }} {...bindTrigger(popupState)}>
                          Twoje konto
          </Button>
                        <Menu {...bindPopover(popupState)} >
                          <Link to={konto}>  <MenuItem onClick={popupState.close} className={classes.menuItem}>Twoje konto</MenuItem></Link>
                          {console.log("AUTH USER", AuthService.getCurrentUser())}
                          {
                            (AuthService.getCurrentUser())
                              ?
                              <Link to="/" style={{ textDecoration: 'none', color: '#FFF' }}> <Button onClick={() => HandleWyloguj()} className={classes.menuItem}>Wyloguj sie</Button> </Link>
                              :
                              <Link to={logowanie}> <MenuItem onClick={popupState.close} className={classes.menuItem}>Zaloguj się</MenuItem>  </Link>
                          }
                        </Menu>
                      </Grid>
                    )}
                  </PopupState>
                </div>
                :
                <Link to={logowanie}> <MenuItem style={{ backgroundColor: '#190423', color: 'white' }}>Zaloguj się</MenuItem>  </Link>
            }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.toDrawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Link to={dzialy}>
            <ListItem button>
              <Button
                fullWidth={true}
                disableRipple
                style={{ backgroundColor: "transparent", color: 'white' }}
              >
                <ListItemIcon style={{ color: 'white' }}>
                  <LayersIcon />
                </ListItemIcon>
                 Działy
                </Button>
            </ListItem>
          </Link>
          <ListItem button>
            <Link to={`/dzial/1`}>
              <Button
                fullWidth={true}
                disableRipple
                style={{ backgroundColor: "transparent", color: 'white' }}
              >
                <ListItemIcon style={{ color: 'white' }}>
                  <SpaIcon />
                </ListItemIcon>
            Rolnictwo
                </Button>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to={`/dzial/3`}>
              <Button
                fullWidth={true}
                disableRipple
                style={{ backgroundColor: "transparent", color: 'white' }}
              >
                <ListItemIcon style={{ color: 'white' }}>
                  <DriveEtaIcon />
                </ListItemIcon>
            Motoryzacja
            </Button>
            </Link>
          </ListItem>
          <ListItem button>
            <Link to={`/dzial/4`}><Button
              fullWidth={true}
              disableRipple
              style={{ backgroundColor: "transparent", color: 'white' }}
            >
              <ListItemIcon style={{ color: 'white' }}>
                <LocalFloristIcon />
              </ListItemIcon>
            Dom i ogród
            </Button></Link>
          </ListItem>
          <ListItem button>
            <Link to={`/dzial/5`}><Button
              fullWidth={true}
              disableRipple
              style={{ backgroundColor: "transparent", color: 'white' }}
            >
              <ListItemIcon style={{ color: 'white' }}>
                <BuildIcon />
              </ListItemIcon>
            Narzędzia
            </Button></Link>
          </ListItem>
        </Drawer>
        <Container >
          <Switch>
            <Route path={dodaniePrzedmiotu} component={Pbject} />
            <Route path={logowanie} component={Login} />
            <Route path={rejestracja} component={Registration} />
            <Route path={dzialy} component={Dzialy} />
            <Route path={konkretny_dzial} component={Dzialy} />
            <Route path={podgladPrzedmiotu} component={PreviewObject} />
            <Route path={udostepnionePrzedmioty} component={Sharing1} />
            <Route path={wypozyczonePrzedmioty} component={Sharing} />
            <Route path={wypozyczeniePrzedmiotu} component={LendItem} />
            <Route path={edycjaPrzedmiotu} component={DeleteBject} />
            <Route path={konto} component={Account} />
            <Route path={widokuzytkownika} component={WidokUzytkownika} />
            <Route path={glowna} component={Dzialy} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}