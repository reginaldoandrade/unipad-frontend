import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 90vh;
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Form = styled.form`
    width: 500px;
    min-height: 500px;
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.267);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #373C3F;

    @media screen and (max-width: 600px) {
        width: 100%;
    }
`

export const Head = styled.header`
    width: 100%;
    text-align: center;
`

export const DivUrl = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;

    input{
        @media screen and (max-width: 600px) {
            width: 100%;
        }
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

export const UrlEstatica = styled.input`
    width: 190px;
    color: #FFF;
    background-color: #2F3437;
    height: 30px;
    border-radius: 3px;
    font-size: 18px;
    outline: none;
    border: 1px solid #DDD;
`

export const FormLabel = styled.label`
        width: 90%;
        margin-top: 10px;
`

export const Input = styled.input`
    width: 90%;
    height: 30px;
    border-radius: 3px;
    font-size: 18px;
    outline: none;
    border: 1px solid #DDD;
`

export const Select = styled.select`
    width: 90%;
    height: 30px;
    border-radius: 3px;
    font-size: 18px;
    outline: none;
    border: 1px solid #DDD;
`

export const Option = styled.option`
    width: 90%;
    height: 30px;
    border-radius: 3px;
    font-size: 18px;
    outline: none;
    border: 1px solid #DDD;
`

export const Span = styled.span`
    color: red;
`

export const Links = styled.a`
    text-decoration: none;
    color: rgb(1, 135, 224);
`

export const Button = styled.button`
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

    @media screen and (max-width: 600px) {
        height: 40px;
        margin-top: 5px;
        margin-left: 75%;
    }
`