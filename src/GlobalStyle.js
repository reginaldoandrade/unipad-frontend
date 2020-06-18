import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    *{
    margin: 0;
    padding:0;
    outline: none;
    box-sizing: border-box;
    }
    html {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: #2F3437;
    font-family: 'Montserrat', sans-serif;
    }

    body{
    -webkit-font-smoothing: antialiased !important;
    }
`