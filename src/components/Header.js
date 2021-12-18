import {  createTheme, makeStyles, AppBar, Container, Toolbar, Typography, Button, Select, MenuItem, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({ 
    title: {
        flex: 1,
        color:"gold",
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        cursor: "pointer",
    }
}))


const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();
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
                
                        <Typography onClick={() => navigate("/")} className={classes.title}> Crypto Hunter </Typography>
                        
                        <Select variant="outlined" style = {{
                            width: 100,
                            height:40,
                            marginLeft:15,
                        }}>
                            

                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                        </Select>
                        
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </Container>
            </AppBar>

        </ThemeProvider>
    )
}

export default Header
