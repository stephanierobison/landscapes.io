import cx from 'classnames'
import axios from 'axios'
import React, { Component, PropTypes } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, RaisedButton, Checkbox, TextField } from 'material-ui'

import './login.style.scss'
import { auth } from '../../services/auth'
import { ErrorAlert } from '../../components'

class Login extends Component {

    state = {
        animated: true,
        viewEntersAnim: true,
        showError: false
    }

    componentDidMount() {
        const { enterLogin } = this.props
        enterLogin()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }

    componentWillUnmount() {
        const { leaveLogin } = this.props
        leaveLogin()
    }

    render() {
        const { animated, viewEntersAnim, showError } = this.state
        const { loading } = this.props

        return (
            <Row center='xs' middle='xs' className={cx({ 'screen-height': true, 'animatedViews': animated, 'view-enter': viewEntersAnim })}>
                <Col xs={6} lg={4} className={cx( { 'login-page': true } )}>
                    <Paper zDepth={1} rounded={false}>
                        {
                          showError
                          ?
                          <p style={{color:'red'}}>Incorrect Username/Password Combination</p>
                          :
                          <p></p>
                        }
                        <TextField id='username' ref='username' floatingLabelText='Username' fullWidth={true}/>
                        <TextField id='password' ref='password' floatingLabelText='Password' fullWidth={true} type='password'/>

                        {/* <Checkbox label='Remember Me' onCheck={this.handlesPasswordCookie}
                            style={{ margin: '20px 0px' }} labelStyle={{ fontFamily: 'Nunito, sans-serif', width: 'none' }}/> */}

                        <RaisedButton label='Login' fullWidth={true} type='primary' onClick={this.handlesOnLogin}
                            labelStyle={{ fontFamily: 'Nunito, sans-serif', textTransform: 'none' }}/>
                    </Paper>
                </Col>
            </Row>
        )
    }

    // TODO: Add remember capability
    handlesPasswordCookie = event => {
        event.preventDefault()
        // should add some validator before setState in real use cases
        this.setState({ password: event.target.value })
    }

    handlesOnLogin = event => {
        event.preventDefault()
        const { loginUser, groups, accounts } = this.props
        const { router } = this.context
        let { username, password } = this.refs

        username = username.getValue()
        password = password.getValue()
        this.setState({showError: false})

        // user login & auth token generation
        axios({
            method: 'post',
            url: `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/auth/signin`,
            data: {
                username,
                password
            }
        }).then(res => {
            let userWithPermissions = auth.setUserPermissions(res.data, groups, accounts)
            return axios({
                method: 'post',
                url: `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/generateToken`,
                data: userWithPermissions
            })
        }).then(res => {
            const { user, token } = res.data
            loginUser(token, user, groups)

            return axios({
                method: 'get',
                url: `${PROTOCOL}://${SERVER_IP}:${SERVER_PORT}/api/verifyToken`,
                headers: { 'x-access-token': token }
            })

        }).then(res => {
            router.push({ pathname: '/landscapes' })
        }).catch(err =>{
            this.setState({showError: true})
        })
    }

    closeError = event => {
        event.preventDefault()
        const { resetError } = this.props
        resetError()
    }
}

Login.propTypes = {
    // views props:
    currentView: PropTypes.string.isRequired,
    enterLogin: PropTypes.func.isRequired,
    leaveLogin: PropTypes.func.isRequired,
    // apollo props:
    user: PropTypes.shape({
        username: PropTypes.string
    }),

    // auth props:
    userIsAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object,

    // apollo actions
    loginUser: PropTypes.func.isRequired,

    // redux actions
    onUserLoggedIn: PropTypes.func.isRequired,
    resetError: PropTypes.func.isRequired
}

Login.contextTypes = {
    router: PropTypes.object
}

export default Login
