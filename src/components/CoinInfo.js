import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";

import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
// test chart js
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export const options = {
  elements: {
    point: {
      radius: 1,
    },
  },
  layout: {padding:{bottom:25, left:25}},
  responsive: true,
  scales: {
    y: {
        ticks: {
          color:"white",
          font: {
            size: 12
          }
        }
      },
    
    x: {
        ticks: {
          color:"white",
          font: {
            size: 12
          }
        }
      }
  },
  plugins: {
    legend: { display:false,
    },
    title: {
      display: true,
      text: 'Price',
    },
  },
};



// ------------------------

const CoinInfo = ({ coin }) => {

    // api data
  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const currency  = "eur"
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  };

 
  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  console.log(coin);
  console.log(historicData);

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


 const data = {
  labels: historicData.map((coin) => {
    let date = new Date(coin[0]);
    let time = date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days === 1 ? time : date.toLocaleDateString();
  }),

  datasets: [
    {
      label: `Price ( Past ${days} Days ) in ${currency}`,
      data: historicData.map((coin) => coin[1]),
          borderColor: '#66fcf1',
      backgroundColor: '#66fcf1',
      fill:false,
    }
  ],
 };




  return (
      <ThemeProvider theme={darktheme}>
          
          <div className={classes.container}>
              <Line 
              options={options}
              data = {data}
              />
              <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
        </div>
      </ThemeProvider>
      
  )
};

export default CoinInfo;