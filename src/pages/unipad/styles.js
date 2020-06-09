import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const DivCarregamento = styled.div`
    width: 100%;
    height: 250px;
    max-width: 600px;
    margin: auto;
    background-color: #373C3F;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #FFF;
`

export const TituloStatus = styled.p`
    height: 20px;
    text-align: center;
    background-color: #2F3437;
    color: #FFF;

    a{
        color: #FFF;
        text-decoration: none;
    }
`
export const TituloStatusLogin = styled.h1`
    text-align: center;
    color: #FFF;

    a{
        color: #FFF;
        text-decoration: none;
    }
`

export const DivTextarea = styled.div`
    width: 100%;
    min-height: 80vh;
`

export const Textarea = styled.textarea`
    width: 100%;
    min-height: 80vh;
    border-radius: 3px;
    resize: none;
    border: none;
    outline: none;
`

export const DivLogin = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const FormButton = styled.button`
    width: 100px;
    height: 40px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    background-color: #FFF;
`

export const Footer = styled.footer`
    width: 100%;
    color: #FFF;
    text-align: center;
`

export const LinkFooter = styled.a`
    text-decoration: none;
    color: rgb(1, 135, 224);
`

export const DivPad = styled.div`
    width: 100%;
`