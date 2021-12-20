import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
// import { Line } from "react-chartjs-2";
import { Chart ,LineElement } from 'chart.js'
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";

Chart.register(LineElement)

const CoinInfo = ({ coin }) => {

    // api data
  const [hdata, sethdata] = useState();
  const [days, setDays] = useState(1);
  const currency  = "eur"
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    sethdata(data.prices);
  };

  console.log(coin);
  console.log(hdata);

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  // Editing 

  const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles();

  const darktheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

//   our jsx



  return (
      <ThemeProvider theme={darktheme}>
          
          <div className={classes.container}>
            {!hdata ?( <CircularProgress style={{color:"#45A29E"}} size={250} />) : 
            (
            <div> Chart </div>
            )
            }
        </div>
      </ThemeProvider>
      
  )
};

export default CoinInfo;