import {
  Button,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "./CoinInfo";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sidebar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  description: {
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData: {
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

const Coinpage = () => {
  const { id } = useParams();
  const [coin, setcoin] = useState();

  const {
    currency,
    symbol,
    userEx,
    addCointoWatchlist,
    Watchlist,
    removeFromWatchlist,
    setAlert,

  } = CryptoState();

  const fetchCoins = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleAddCoinToWatchlist = (coinId) => {
    addCointoWatchlist(coinId);
    setAlert({
      open: true,
      message: `${coinId} is Add to Watchlist`,
      type: "success",
    });
  };

  const A = Watchlist.filter((WC) => {
    if (WC.coinName === id) {
      return WC._id;
    } else {
      return null;
    }
  });

  const B = Watchlist.filter((WC) => {
    if (WC.coinName === id) {
      return WC._id;
    } else {
      return null;
    }
  });
  console.log(B)


  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {userEx && (
            <div>
              {B[0] ? (
                <Button
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#ff0000",

                    color: "black",
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    removeFromWatchlist(A[0]._id);
                  }}
                >
                  Remove From Watchlist
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "gold",

                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleAddCoinToWatchlist(id);
                  }}
                >
                  Add to Watchlist
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;