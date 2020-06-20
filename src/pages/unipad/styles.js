import styled, { keyframes, css } from 'styled-components'
import Editor from 'react-simple-code-editor';
import { CopyToClipboard } from 'react-copy-to-clipboard'

export const Container = styled.div`
    width: 100%;
    height: 95vh;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const animate = keyframes`
     from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg)
    }
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

    ${props => props.loading &&
        css`
            svg{
                animation: ${animate} 2s linear infinite;
            }
        `
    }
`

export const Head = styled.header`
    width: 100%;
    display: flex;
    flex-direction: row;
`

export const TituloStatus = styled.p`
    margin: 0px auto 5px auto;
    height: 15px;
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
`

export const Textarea = styled(Editor)`
    width: 100%;
    min-height: 90vh;
    border-radius: 3px;
    background-color: #FFF;
    color: black;
    resize: none;
    border: none;
    outline: none;
`

export const DivLogin = styled.div`
    width: 100%;
    form {
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

            input{
                width: 200px;
                height: 40px;
                color: #FFF;
                background-color: #2F3437;
                border-radius: 3px;
                font-size: 18px;
                outline: none;
                border: 1px solid #DDD;
            }

            button{
                width: 80px;
                cursor: pointer;
                border-radius: 3px;
                border: none;
                background-color: #FFF;

                &:hover{
                background-color: #2F3437;
                color: #FFF;
                border: 1px solid #DDD;
                }
            }
    }
`

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    color: #FFF;
    display: flex;
    flex-direction: column;
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
    margin-top: 0.1%;
    color: #FFF;
    text-align: center;
    font-size: 12px;
`

export const LinkFooter = styled.a`
    text-decoration: none;
    color: rgb(1, 135, 224);
`

export const DivPad = styled.div`
    width: 100%;
`

export const CopiarAreadeTransferencia = styled(CopyToClipboard)`
    height: 20px;
    margin: 4px;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    background-color: #FFF;

    &:hover{
        svg{
            color: #FFF;
        }
        background-color: #373C3F;
    }
`

export const CompartilharUrl = styled(CopyToClipboard)`
    height: 20px;
    margin: 4px;
    cursor: pointer;
    border-radius: 3px;
    border: none;
    background-color: #FFF;

    &:hover{
        svg{
            color: #FFF;
        }
        background-color: #373C3F;
    }
`

export const SelectForm = styled.select`
    border-radius: 4px;
    cursor: pointer;
`