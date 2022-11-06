import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./Config/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("INR");
  const [symbol, setsymbol] = useState("₹");
  const [user, setuser] = useState([]);
  const [userEx, setuserEx] = useState("");
  const [Watchlist, setWatchlist] = useState([]);
  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(false);
  const [Alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [Disable, setDisable] = useState(false);

  const fetchCoins = async () => {
    setloading(true);
    const { data } = await axios.get(CoinList(currency));
    setcoins(data);
    setloading(false);
  };

  const getUser = async () => {
    const response = await fetch("https://crypto-hunter-website-project.herokuapp.com/api/auth/getUserInfo", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
  
    setuser(json);
  };

  const getWatchCoins = async () => {
    const response = await fetch(
      `https://crypto-hunter-website-project.herokuapp.com/api/watchCoin/fetchallCoins`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();

    setWatchlist(json);
  };

  const addCointoWatchlist = async (coinName) => {
    const response = await fetch(
      `https://crypto-hunter-website-project.herokuapp.com/api/watchCoin/addCoins`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ coinName }),
      }
    );
    const coinname = await response.json();

    setWatchlist(Watchlist.concat(coinname));
  };

  const removeFromWatchlist = async (id) => {
    try {
      const response = await fetch(
        `https://crypto-hunter-website-project.herokuapp.com/api/watchCoin/deleteCoins/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const json = await response.json();
      const newCoin = Watchlist.filter((WC) => {
        return WC._id !== id;
      });
      setWatchlist(newCoin);
      setAlert({
        open: true,
        message: `${json.coin.coinName} is Remove from Watchlist`,
        type: "success",
      });
      
    } catch (error) {
      setAlert({
        open: true,
        message: `Error : coin is not found in Watchlist`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (currency === "INR") setsymbol("₹");
    else if (currency === "USD") setsymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setcurrency,
        user,
        getUser,
        userEx,
        setuser,
        setuserEx,
        Watchlist,
        setWatchlist,
        getWatchCoins,
        coins,
        setcoins,
        loading,
        setloading,
        fetchCoins,
        addCointoWatchlist,
        removeFromWatchlist,
        Alert,
        setAlert,
        Disable,
        setDisable,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
