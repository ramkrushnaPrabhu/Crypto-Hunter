import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import Homepage from './Components/Homepage';
import Coinpage from './Components/Coinpage'
import { makeStyles } from '@material-ui/core';
import Alert from './Components/Alert';


const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: "white",
    minHeight: "100vh",
  }
}));

function App() {

  const classes = useStyles();

  return (
    

    <div className = { classes.App } >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<Coinpage />} />
        </Routes>
        <Alert/>
      </BrowserRouter>
    </div>

  );
}

export default App;
