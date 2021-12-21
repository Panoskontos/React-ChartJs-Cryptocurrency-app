import { useEffect, useState } from "react";
import { useParams, } from 'react-router-dom'
import axios from "axios";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import './CoinPage.css';


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }



const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    const { currency } = "EUR"
    const  symbol  = "€"

    // get coin
    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id))
    
    
        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
    }, [])
    // -----------------------

    
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
    }
    ,
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

  const classes = useStyles();


  if (!coin) return <LinearProgress style={{ backgroundColor: "#66FCF1" }} />;


    return (
        <div className={classes.container}>

            <div className={classes.sidebar}>
                <img
                className={"myimage"}
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
          />
          <Typography id="head1" variant="h3" className={classes.heading}>
          {coin?.name}
            </Typography>
        


        <div className={classes.marketData}>
            
            <span style={{ display: "flex" }}>
            <Typography id="sub" variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            id="sub"
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank}
            </Typography>
          </span>
            
          <span style={{ display: "flex" }}>
            <Typography id="sub" variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            id="sub"
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {coin?.market_data.current_price["eur"]} 
            </Typography>
          </span>
          
          <span style={{ display: "flex" }}>
            <Typography id="sub" variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
            id="sub"
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {
                coin?.market_data.market_cap["eur"]
                  .toString()
                  .slice(0, -9)
              } Billion
              
            </Typography>
          </span>
          
        </div>
        </div>
           
        <CoinInfo coin={coin} />
          
        {/* test */}
    </div>
    )
}

export default CoinPage
