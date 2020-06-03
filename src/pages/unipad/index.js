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
            expiration: null,
            secure: false,
            status: '👍',
            padSalvo: ''
        }

        this.salva = this.salva.bind(this)
        this.mudaDado = this.mudaDado.bind(this)
    }

    // Executa a busca pela url e verifica se é protegida
    async componentDidMount() {
        let state = this.state
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
        }


        // Verifica se o password bate
        if (unipad.secure === true) {
            let passed = false
            while (!passed) {
                let password = window.prompt('Digite a senha')
                let url = state.url
                password = await cripto(password)

                const verification = await api.post('/auth', { url, password })

                if (verification.data.success === false) {
                    alert('Dados incorretos')
                } else {
                    passed = true
                }
            }

        }

        state.pad = unipad.pad
        state.format = unipad.format
        this.setState(state)
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
        const { status } = this.state
        return (
            <div className="container-unipad">
                <p className="titulo-status"><Link to="/">unipad </Link>{status}</p>
                <div className="divTextarea">
                    {/* TextArea */}
                    <textarea name="pad" id="pad" autoFocus={true} datatype={this.state.format} value={this.state.pad} onChange={this.mudaDado}>
                    </textarea>
                </div>

                <footer>
                    <p>Desenvolvido por <a href="https://jarodmateus.herokuapp.com/" target="_blanck">Jarod Cavalcante</a> - 2020</p>
                </footer>
            </div>
        )
    }
}

export default Unipad