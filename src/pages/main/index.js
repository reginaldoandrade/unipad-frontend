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
    async renderUnipad(e) {
        e.preventDefault()
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
            <div>
                <div className="container">
                    <form onSubmit={this.renderUnipad}>
                        <header>
                            <h1>Unipad</h1>
                        </header>

                        <div className="divUrl">
                            <input type="url" defaultValue="unipad.herokuapp.com/" disabled className="estatica" />
                            <input type="text" name="url" id="url" autoFocus={true} required onChange={this.mudaDado} value={this.state.form.url} className="inputUrl" placeholder="exemplo"/><span>*</span>
                            <button type="submit">Ir</button>
                        </div>

                        <label htmlFor="password">
                            Senha:
                            </label>
                        <input type="password" autoComplete="false" name="password" id="password" placeholder="senha de acesso" onChange={this.mudaDado} value={this.state.form.password} />


                        <label htmlFor="formatation">
                            Formatação:
                            </label>
                        <select name="format" id="formatation" value={this.state.form.format} onChange={this.mudaDado}>
                            <option value="javascript">javascript</option>
                            <option value="java">java</option>
                            <option value="json">json</option>
                            <option value="text">text</option>
                        </select>


                        <label htmlFor="expira">
                            Expira em:
                            </label>
                        <select name="expiration" id="expira" value={this.state.form.expiration} onChange={this.mudaDado}>
                            <option value=''>Indefinido</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 1)}>1 dia</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia + 7)}>1 semana</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes + 1, this.state.form.dia)}>1 mês</option>
                            <option value={new Date(this.state.form.ano + 1, this.state.form.mes, this.state.form.dia)}>1 ano</option>
                        </select>


                    </form>

                    <footer>
                        <p>Desenvolvido por <a href="https://jarodmateus.herokuapp.com/" target="_blanck">Jarod Cavalcante</a> - 2020</p>
                    </footer>
                </div>

            </div>
        )
    }
}

export default Main