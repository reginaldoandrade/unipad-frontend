import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../service/api'
import cripto from '../../util/encripty'


import './style.css'

class Unipad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pad: '',
            url: window.location.pathname,
            intervalo: '',
            format: '',
            password: null,
            passwordLogin: '',
            expiration: null,
            secure: false,
            status: '👍',
            padSalvo: '',
            passed: true
        }

        this.salva = this.salva.bind(this)
        this.mudaDado = this.mudaDado.bind(this)
        this.verificaSenha = this.verificaSenha.bind(this)
    }

    // Executa a busca pela url e verifica se é protegida
    async componentDidMount() {
        let state = this.state

        // Verifica se a url não está expirada
        await api.delete('/expiration')

        const response = await api.get(`${state.url}`)

        let unipad = response.data

        // Caso url não exista, ele cria uma
        if (unipad.success === false && unipad.description === 'url nao existe') {
            let { url, password, secure, expiration, format } = this.state

            format = 'text'

            await api.post(`${state.url}`, {
                url,
                password,
                format,
                expiration,
                secure
            })

            this.componentDidMount()
            //  Caso haja senha, ele irá exibir o form de login
        } else if (unipad.secure === true) {
            state.passed = false
        }

        state.pad = unipad.pad
        state.format = unipad.format
        this.setState(state)
    }

    // Verifica se a senha bate
    async verificaSenha(e) {
        e.preventDefault()
        let { url, passwordLogin } = this.state
        passwordLogin = await cripto(passwordLogin)

        const verification = await api.post('/auth', { url, password: passwordLogin })

        if (verification.data.success === false) {
            alert('Dados incorretos')
        } else {
            this.setState({
                passed: true
            })
        }
    }

    // Salva os dados a cada 2 segundos
    async salva() {
        let { pad, url, status } = this.state

        status = '💾'
        this.setState({ status: status })

        try {
            await api.put(`edit${url}`, { pad, url })
            status = '✔️'
            this.setState({ url, status, padSalvo: pad })
        } catch (error) {
            console.log(error);
        }
    }

    //Chama a função de atualizar os dados a cada 2 segundos
    intervalo = setInterval(() => {
        if (this.state.pad !== this.state.padSalvo) {
            this.salva()
        } else {
            return
        }
    }, 1000)


    mudaDado(e) {
        let state = this.state
        state[e.target.name] = e.target.value

        this.setState(state)
    }

    render() {
        const { status, passed, url, passwordLogin } = this.state
        return (
            <div className="container-unipad">
                {passed === true ?
                    (
                        <div>
                            <p className="titulo-status"><Link to="/">unipad </Link>{status}</p>
                            <div className="divTextarea">
                                {/* TextArea */}
                                <textarea name="pad" id="pad" autoFocus={true} datatype={this.state.format} value={this.state.pad} autoComplete="off" onChange={this.mudaDado} style={{ display: this.state.display_textarea }}>
                                </textarea>
                            </div>
                        </div>
                    )
                    : (
                        <div className="div-login">
                            <form onSubmit={this.verificaSenha} id="form-login">
                                <h1 className="titulo-status-login"><Link to="/">unipad </Link></h1>
                                <h3>A url "{url}" é protegida</h3>
                                <label htmlFor="password"></label>
                                <input type="password" name="password" id="password" value={passwordLogin} required autoFocus autoComplete="off" onChange={(e) => this.setState({ passwordLogin: e.target.value })} placeholder="senha de acesso"/>

                                <p><button type="submit" id="btn-login">Entrar</button></p>
                            </form>
                        </div>
                    )}

                <footer>
                    <p>Desenvolvido por <a href="https://jarodmateus.herokuapp.com/" target="_blanck">Jarod Cavalcante</a> - 2020</p>
                </footer>
            </div>
        )
    }
}

export default Unipad