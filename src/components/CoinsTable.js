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
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";




const CoinsTable = () => {
    const  currency  = "EUR"

    const [coins, setCoins] = useState([]);
        const [loading, setLoading] = useState(false);


    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        
        setCoins(data);
        setLoading(false);
    };
    
    console.log(coins);

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

    return (
        <ThemeProvider theme={darktheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography 
                variant="h4"
                style ={{}}
                >
                    crypto prices table
                </Typography>
             </Container>
            </ThemeProvider>
    ) 
}

export default CoinsTable
