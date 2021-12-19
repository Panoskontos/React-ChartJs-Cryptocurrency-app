import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
  Container,
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// export function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   }




// Cant import the data try again tomorroe





const CoinsTable = () => {
    const  currency  = "EUR"
    const symbol = "€"
    


    const [coins, setCoins] = useState([]);
        const [loading, setLoading] = useState(false);
    // search functionality
    const [search, setSearch ] = useState()

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        
        setCoins(data);
        setLoading(false);
    };
    
    // console.log(coins);

  
    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darktheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
          type: "dark",
        },
      });

    const handleSearch = () => {
        return coins.filter(
            (coin) => 
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search) 
            
            );
    };

    const useStyles = makeStyles({
        row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#131111",
          },
          fontFamily: "Montserrat",
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "gold",
          },
        },
      });

    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={darktheme}>
            <Container style={{ textAlign: "center" }}>
                {/* <Typography 
                variant="h4"
                style ={{ margin: 18, fontFamily: "Montserrat"}}
                >
                    crypto prices table
                </Typography> */}
                <TextField label="Search for Currency. ."
                 variant="outlined"
                 style={{ marginTop: 10, width: "100%" }}
                 onChange={(e) => setSearch(e.target.value)}
                 
                 />
                
                <TableContainer style={{marginTop:10}} component={Paper}>
                    { 
                        // have loading feature
                        loading ? (
                            <LinearProgress style={{ backgroundColor: "gold"}} />
                        ) : (
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#EEBC1D"}}>      
                                     <TableRow>
                                         {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                             <TableCell
                                                 style={{
                                                     color:"black",
                                                     fontWeight: "700",
                                                     fontFamily: "Montserrat",
                                                 }}
                                                 key ={head}
                                                 align={head === "Coin" ? "" : "right"}
                                                 >
                                                     {head}
                                             </TableCell>
                                         ))}
                                     </TableRow>
                                </TableHead>

                                <TableBody>
                                    {handleSearch().map((row) => {
                                        const profit = row.price_change_percentage_24h > 0;

                                        return (
                                            <TableRow
                                                onClick={() => navigate(`/coins/${row.id}`)}
                                                className={classes.row}
                                                key={row.name}
                                                  >

                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}
                                                    >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{ marginBottom: 10 }}
                                                    />
                                                     
                                                    <div
                                                        style={{ display: "flex", flexDirection: "column" }}
                                                    >
                                                        <span
                                                        style={{
                                                            textTransform: "uppercase",
                                                            fontSize: 22,
                                                        }}
                                                        >
                                                        {row.symbol}
                                                        </span>
                                                        <span style={{ color: "darkgrey" }}>
                                                        {row.name}
                                                        </span>
                                                    </div>
                                                    
                                                    {/*  
                                                    </TableCell>
                                                    <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(row.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell
                                                    align="right"
                                                    style={{
                                                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                        fontWeight: 500,
                                                    }}
                                                    >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, -6)
                                                    )}
                                                    M
                                                    */}
                                                    </TableCell>
                                                        

                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        )}
                </TableContainer> 
             </Container>
            </ThemeProvider>
    ) 
}

export default CoinsTable
