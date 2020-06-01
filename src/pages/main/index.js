import React, { Component } from 'react'
import api from '../../service/api'
import cripto from '../../util/encripty'

import './style.css'

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
                ano: new Date().getFullYear()
            },
        }
        this.renderUnipad = this.renderUnipad.bind(this)
        this.mudaDado = this.mudaDado.bind(this)
    }

    //Verifica se há urls com a data de expiração expirada e deleta a mesma
    async componentDidMount() {
        api.delete('/expiration')
    }

    // Adiciona os dados no banco de dados e redireciona para a página da url
    async renderUnipad() {
        let { url, format, password, expiration, secure } = this.state.form

        if (url.length <= 0) return

        localStorage.setItem('url', url)
        const response = await api.get(`/${url}`)

        if (response !== null) {
            window.location.href = `/${url}`
        }

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
            <div className="container">
                <header>
                    <h1>Unipad</h1>
                </header>

                <div className="divUrl">
                    <label>
                        <input type="url" className="urlEstatica" defaultValue="unipad.netlify.com/" disabled />
                        <input type="url" name="url" id="url" className="inputUrl" autoFocus={true} required={true} onChange={this.mudaDado} value={this.state.form.url} />
                        <button className="btnIr" id="ir" onClick={this.renderUnipad}>Ir</button>
                    </label>
                </div>

                <div className="divOptions">
                    <form>
                        <label htmlFor="password">
                            Senha: <small><strong>Não é obrigatório</strong></small>
                            <input type="password" autoComplete="false" name="password" id="password" className="inputText" placeholder="senha de acesso" onChange={this.mudaDado} value={this.state.form.password} />
                        </label>
                    </form>
                </div>
                <div className="divOptions">
                    <label htmlFor="formatation">
                        Formatação:
                        <select name="format" id="format" value={this.state.form.format} onChange={this.mudaDado}>
                            <option value="javascript">javascript</option>
                            <option value="java">java</option>
                            <option value="json">json</option>
                            <option value="text">text</option>
                        </select>
                    </label>
                </div>
                <div className="divOptions">
                    <label htmlFor="expira">
                        Expira em:
                        <select name="expiration" id="expiration" value={this.state.form.expiration} onChange={this.mudaDado}>
                            <option value=''>Indefinido</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 1)}>1 dia</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 7)}>1 semana</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes + 1, this.state.form.dia)}>1 mês</option>
                            <option value={new Date(this.state.form.ano + 1, this.state.form.mes, this.state.form.dia)}>1 ano</option>
                        </select>
                    </label>
                </div>
                <footer>
                    <p>Desenvolvido por Jarod Cavalcante - 2020</p>
                </footer>
            </div>
        )
    }
}

export default Main