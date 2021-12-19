import {  createTheme, makeStyles, AppBar, Container, Toolbar, Typography, Button, Select, MenuItem, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

const useStyles = makeStyles(() => ({ 
    title: {
        flex: 1,
        color:"#66fcf1",
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: "pointer",
    }
}))



const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    // const { currency, setCurrency } = CryptoState();
    const currency="EUR"

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

        
            <AppBar color="transparent" position='static'>
                <Container>
                    <Toolbar>
                
                        <Typography onClick={() => navigate("/")} className={classes.title}> Crypto Kraken </Typography>
                        
                        <Select variant="outlined" style = {{
                            width: 100,
                            height:40,
                            marginLeft:15,
                        }}
                         value={currency}
                        // onChange={(e) => setCurrency(e.target.value)}
                        >
                            

                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                        
                    </Toolbar>
                </Container>
            </AppBar>

        </ThemeProvider>
    )
}

export default Header
