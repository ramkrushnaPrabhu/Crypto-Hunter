import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { HistoricalChart } from "../Config/api"
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { chartDays } from "../Config/ChartDay"
import SelectButton from './SelectButton';




import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'



const useStyle = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },

}));


const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setdays] = useState(1);
    const [flag, setflag] = useState(false);



    const { currency } = CryptoState();

    const fetchHistoricalData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setflag(true);
        setHistoricalData(data.prices);
    }


    useEffect(() => {
        fetchHistoricalData();
        // eslint-disable-next-line
    }, [days]);


    const classes = useStyle();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicalData || flag === false ? (
                        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
                    ) : (
                        <>
                            <Line data={{
                                labels: historicalData.map(coin => {
                                    let date = new Date(coin[0]);
                                    let time = date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                                        : `${date.getHours()}:${date.getMinutes()}AM`;
                                    return days === 1 ? time : date.toLocaleDateString();
                                }),

                                datasets: [{
                                    data: historicalData.map((coin) => coin[1]),
                                    label: `Price (Past ${days} Days) in ${currency}`,
                                    borderColor: "#EEBC1D",
                                }],

                            }} options={{
                                elements: {
                                    point: {
                                        radius: 1,
                                    },
                                },
                            }} />
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 20,
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}>
                                {chartDays.map((day) => (
                                    <SelectButton
                                        key={day.value}
                                        onClick={() => {
                                            setdays(day.value);
                                            setflag(false);
                                        }}
                                        selected={day.value === days}
                                    >
                                        {day.label}
                                    </SelectButton>
                                ))}
                            </div>

                        </>
                    )
                }
            </div>

        </ThemeProvider>
    )
}

export default CoinInfo






