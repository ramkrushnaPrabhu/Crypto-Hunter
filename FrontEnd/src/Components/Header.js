import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import AuthModal from './AuthModal';
import UserSidebar from './UserSidebar';


const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer"
  }
}));


const Header = () => {

  const classes = useStyles();


  const navigator = useNavigate();

  const { currency, setcurrency, userEx } = CryptoState();


  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark"
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigator("/")} className={classes.title} variant='h6'>
              CrypTo-Hunter
            </Typography>
            <Select variant='outlined' style={{ width: 100, height: 40, marginLeft: 15 }} value={currency} onChange={(e) => setcurrency(e.target.value)}>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
            {userEx ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header