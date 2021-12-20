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


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }




// Cant import the data try again tomorroe





const CoinsTable = () => {
    const  currency  = "EUR"
    const symbol = "€"
    


    const [coins, setCoins] = useState([]);
    
    const [loading, setLoading] = useState(false);
    // search functionality
     const [search, setSearch ] = useState("")
     const [page, setPage] = useState(1);

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
          backgroundColor: "#0B0C10",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#1F2833",
          },
          fontFamily: "Montserrat",
        },
        pagination: {
          "& .MuiPaginationItem-root": {
            color: "#45A29E",
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
                            <LinearProgress style={{ backgroundColor: "#66FCF1"}} />
                        ) : (
                            <Table aria-label="simple table">
                                <TableHead style={{ backgroundColor: "#45A29E"}}>      
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
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
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
                                                     
                                                    {row.price_change_percentage_24h?.toFixed(2)}%
                                                    
                                                    </TableCell>
                                                    
                                                    <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row.market_cap.toString().slice(0, 12)
                                                    )}
                                                     
                                                     
                                                    </TableCell>   

                                            </TableRow>
                                        )
                                                    })}
                                </TableBody>

                            </Table>
                        )}
                </TableContainer> 

                <Pagination
                count={(handleSearch()?.length / 10).toFixed(0)}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
                />

             </Container>
            </ThemeProvider>
    ) 
}

export default CoinsTable
