import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../service/api'
import cripto from '../../util/encripty'

import { FaCopy, FaShare } from 'react-icons/fa'

// Editor de Código
import { highlight, languages } from 'prismjs/components/prism-core';

import { Container, DivCarregamento, TituloStatus, DivLogin, Form, FormButton, Footer, LinkFooter, TituloStatusLogin, DivTextarea, DivPad, Textarea, CopiarAreadeTransferencia, CompartilharUrl, Head, SelectForm } from './styles'

// Estilo do editor
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-sql';

import './prism.css';

class Unipad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pad: '',
            url: window.location.pathname,
            intervalo: '',
            format: null,
            password: null,
            passwordLogin: '',
            expiration: null,
            status: '👍',
            padSalvo: '',
            passed: true,
            secure: false,
            loading: true
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

            format = 'javascript'

            await api.post(`${state.url}`, {
                url,
                password,
                format,
                expiration,
                secure
            })
            this.componentDidMount()
            return null
            //  Caso haja senha, ele irá exibir o form de login
        } else if (unipad.secure === true) {
            state.passed = false
        }

        state.pad = unipad.pad
        state.format = unipad.format
        state.loading = false
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

    // Salva os dados
    async salva() {
        let { pad, url, status, format } = this.state

        status = '💾'
        this.setState({ status: status })

        try {
            await api.put(`edit${url}`, { pad, url, format })
            status = '✔️'
            this.setState({ url, status, padSalvo: pad })
        } catch (error) {
            console.log(error);
        }
    }

    mudaDado(e) {
        let state = this.state
        state[e.target.name] = e.target.value

        this.setState(state)
    }

    render() {
        const { status, passed, url, passwordLogin, pad, format, loading } = this.state
        return (
            <Container>
                {passed === true ?
                    (
                        loading ? (
                            <DivCarregamento>
                                <p>Carregando pad...</p>
                            </DivCarregamento>
                        ) : (
                                <DivPad>
                                    <Head>
                                        {/* Alterar o formato do código */}
                                        <SelectForm name="format" value={this.state.format} onChange={(e) => { this.mudaDado(e); this.salva() }}>
                                            <option value="javascript">javascript</option>
                                            <option value="java">java</option>
                                            <option value="json">json</option>
                                            <option value="c">C</option>
                                            <option value="sql">SQL</option>
                                        </SelectForm>

                                        {/* Título e status de salvamento do PAD */}
                                        <TituloStatus><Link to="/">unipad </Link>{status}</TituloStatus>

                                        {/* Copiar paa área de transferência */}
                                        <CopiarAreadeTransferencia text={pad}
                                            onCopy={() => this.setState({ copied: true })}>
                                            <button onClick={() => alert('PAD copiado para a sua área de transfrência')}>
                                                <FaCopy size={14} />
                                            </button>
                                        </CopiarAreadeTransferencia>

                                        {/* Compartilhar url */}
                                        <CompartilharUrl text={`unipad.herokuapp.com${url}`}
                                            onCopy={() => this.setState({ copied: true })}>
                                            <button onClick={() => alert(`Link copiado para a sua área de transferência \nunipad.herokuapp.com${url}`)}>
                                                <FaShare size={14} />
                                            </button>
                                        </CompartilharUrl>

                                    </Head>
                                    {/* TextArea */}
                                    <DivTextarea>
                                        <Textarea
                                            value={pad}
                                            onValueChange={pad => this.setState({ pad })}
                                            onKeyUp={this.salva}
                                            highlight={pad => highlight(pad, languages[format])}
                                            padding={10}
                                            style={{
                                                fontFamily: '"Fira code", "Fira Mono", monospace',
                                                fontSize: 14,
                                            }}
                                        />
                                    </DivTextarea>
                                </DivPad>
                            )
                    )
                    : (
                        <DivLogin>
                            <Form onSubmit={this.verificaSenha} id="form-login">
                                <TituloStatusLogin className="titulo-status-login">
                                    <Link to="/">unipad </Link>
                                </TituloStatusLogin>

                                <h3>A url "{url}" é protegida</h3>
                                <label htmlFor="password"></label>
                                <input type="password"
                                    name="password"
                                    id="password"
                                    placeholder="senha de acesso"
                                    value={passwordLogin}
                                    required autoFocus autoComplete="off"
                                    onChange={(e) => this.setState({ passwordLogin: e.target.value })} />

                                <p>
                                    <FormButton type="submit" id="btn-login">Entrar</FormButton>
                                </p>
                            </Form>
                        </DivLogin>
                    )}

                <Footer>
                    <p>Desenvolvido por
                        <LinkFooter href="https://jarodmateus.herokuapp.com/" target="_blanck">
                            Jarod Cavalcante
                        </LinkFooter>
                     - 2020</p>
                </Footer>
            </Container>
        )
    }
}

export default Unipad