import React, { Component } from 'react'
import api from '../../service/api'
import cripto from '../../util/encripty'

import { Container, Form, Head, DivUrl, UrlEstatica, FormLabel, Input, Select, Option, Span, Links, Button, Footer } from './styles'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                url: '',
                password: '',
                format: 'javascript',
                expiration: '',
                secure: false,
                dia: new Date().getDate(),
                mes: new Date().getMonth(),
                ano: new Date().getFullYear(),
                hora: new Date().getHours(),
                minutos: new Date().getMinutes(),
                segundos: new Date().getSeconds(),
                milisegundos: new Date().getMilliseconds()
            },
        }
        this.renderUnipad = this.renderUnipad.bind(this)
        this.mudaDado = this.mudaDado.bind(this)
    }

    //Verifica se há urls com a data de expiração expirada e deleta a mesma
    async componentDidMount() {
        await api.delete('/expiration')
    }

    // Adiciona os dados no banco de dados e redireciona para a página da url
    async renderUnipad(e) {
        e.preventDefault()
        let { url, format, password, expiration, secure } = this.state.form

        // Caso o input esteja vazio, não faça nada
        if (url.length <= 0) return

        const response = await api.get(`/${url}`)

        // Se a url já existir, apenas redireciona ela
        if (response !== null) {
            window.location.href = `/${url}`
        }

        // Setando password como null caso o input esteja vazio, para salvar no DB
        // Se o user tiver digitado um passowrd, ele encripta o mesmo
        if (password.length <= 0) {
            password = null
        } else {
            password = cripto(password)
        }

        await api.post(`/${url}`, {
            url,
            password,
            format,
            expiration,
            secure
        })

        window.location.href = `/${url}`
    }

    mudaDado(e) {
        let form = this.state.form
        form[e.target.name] = e.target.value

        this.setState({ form: form })
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.renderUnipad}>
                    <Head>
                        <h1>Unipad</h1>
                    </Head>
                    <DivUrl>
                        <UrlEstatica type="url" defaultValue="unipad.herokuapp.com/" disabled />
                        <Input type="text" name="url" id="url" className="inputUrl" placeholder="exemplo" required
                            autoFocus={true} onChange={this.mudaDado} value={this.state.form.url} />
                        <Span>*</Span>
                        <Button type="submit">Ir</Button>
                    </DivUrl>

                    <FormLabel htmlFor="password">
                        Senha:
                    </FormLabel>
                    <Input type="password" name="password" id="password" autoComplete="off" placeholder="senha de acesso"
                        onChange={this.mudaDado} value={this.state.form.password} />

                    <FormLabel htmlFor="formatation">
                        Formatação:
                    </FormLabel>
                    <Select name="format" id="formatation" value={this.state.form.format} onChange={this.mudaDado}>
                        <Option value="javascript">javascript</Option>
                        <Option value="java">java</Option>
                        <Option value="json">json</Option>
                        <Option value="c">C</Option>
                        <Option value="sql">SQL</Option>
                    </Select>


                    <FormLabel htmlFor="expira">
                        Expira em:
                    </FormLabel>
                    <Select name="expiration" id="expira" value={this.state.form.expiration} onChange={this.mudaDado}>
                        <Option value=''>Indefinido</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora, this.state.form.minutos + 30, this.state.form.segundos, this.state.form.milisegundos)}>30 minutos</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 1, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>1 hora</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 8, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>8 horas</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 1)}>1 dia</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 7)}>1 semana</Option>
                        <Option value={new Date(this.state.form.ano, this.state.form.mes + 1, this.state.form.dia)}>1 mês</Option>
                        <Option value={new Date(this.state.form.ano + 1, this.state.form.mes, this.state.form.dia)}>1 ano</Option>
                    </Select>


                </Form>

                <Footer>
                    <p>Desenvolvido por
                        <Links href="https://jarodmateus.herokuapp.com/" target="_blanck">
                            Jarod Cavalcante
                        </Links>
                     - 2020
                    </p>
                </Footer>
            </Container>
        )
    }
}

export default Main