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
                format: 'text',
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
            <div>
                <div className="container">
                    <form onSubmit={this.renderUnipad}>
                        <header>
                            <h1>Unipad</h1>
                        </header>
                        <div className="divUrl">
                            <input type="url" defaultValue="unipad.herokuapp.com/" disabled className="estatica" />
                            <input type="text" name="url" id="url" autoFocus={true} required onChange={this.mudaDado} value={this.state.form.url} className="inputUrl" placeholder="exemplo" /><span>*</span>
                            <button type="submit">Ir</button>
                        </div>

                        <label htmlFor="password">
                            Senha:
                            </label>
                        <input type="password" name="password" id="password" autoComplete="off" placeholder="senha de acesso" onChange={this.mudaDado} value={this.state.form.password} />

                        <label htmlFor="formatation">
                            Formatação:
                            </label>
                        <select name="format" id="formatation" value={this.state.form.format} onChange={this.mudaDado}>
                            <option value="javascript">javascript</option>
                            <option value="java">java</option>
                            <option value="json">json</option>
                            <option value="C">C</option>
                            <option value="C#">C#</option>
                            <option value="C++">C++</option>
                            <option value="PHP">PHP</option>
                            <option value="text">text</option>
                        </select>


                        <label htmlFor="expira">
                            Expira em:
                            </label>
                        <select name="expiration" id="expira" value={this.state.form.expiration} onChange={this.mudaDado}>
                            <option value=''>Indefinido</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora, this.state.form.minutos + 30, this.state.form.segundos, this.state.form.milisegundos)}>30 minutos</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 1, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>1 hora</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 5, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>5 horas</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 8, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>8 horas</option>
                            <option value={new Date(this.state.form.ano, this.state.form.mes, this.state.form.dia, this.state.form.hora + 12, this.state.form.minutos, this.state.form.segundos, this.state.form.milisegundos)}>12 horas</option>
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