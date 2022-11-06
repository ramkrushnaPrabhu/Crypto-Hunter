import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import { CryptoState } from '../CryptoContext';
import { Avatar } from '@material-ui/core';
import { AiFillDelete } from "react-icons/ai";



const useStyles = makeStyles({
    container: {
        width: 350,
        height: "100%",
        padding: 25,
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",

    },
    picture: {
        width: 150,
        height: 150,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    logout: {
        height: "8%",
        width: "100%",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
        marginBottom: 5,
    },
    coin:{
        padding:10,
        borderRadius:5,
        color:"black",
        width:"100%",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#EEBC1D",
        boxShadow:"0 0 3px black",
    },
});

export default function UserSidebar() {
    const classes = useStyles();

    const { getUser, setuserEx, user, Watchlist, getWatchCoins, coins, symbol,removeFromWatchlist,setAlert,setDisable} = CryptoState();

    const [state, setState] = React.useState({

        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUser();
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getWatchCoins();
        }
        // eslint-disable-next-line
    }, [])



    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const handalLogout = () => {
        localStorage.removeItem('token');
        setuserEx(null);
        setAlert({
            open: true,
            message:"Log Out Successfull",
            type: "success",
          });
    }


    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.name}
                    />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.name}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}>
                                    {user.name || user.email}

                                </span>
                                <div className={classes.watchlist}>
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) => {
                                        return (
                                            Watchlist.map((WC) => {
                                                if (WC.coinName === coin.id) {
                                                    return (
                                                        <div key={WC._id} className={classes.coin}>
                                                            <span>{coin.name}</span>
                                                            <span style={{ display: "flex", gap: 8 }}>
                                                                {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
                                                                <AiFillDelete onClick={()=> {removeFromWatchlist(WC._id);setDisable(false)}} style={{ cursor:"pointer"}} fontSize="16" />
                                                            </span>
                                                        </div>
                                                    );
                                                }
                                                else{
                                                    return null ;
                                                }
                                            })
                                        )

                                    })}
                                </div>
                            </div>
                            <Button variant='contained' className={classes.logout} onClick={handalLogout}>Log Out</Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

