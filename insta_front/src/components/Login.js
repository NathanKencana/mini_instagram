import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = { username: '', password: '', userdata: [], Id: '' };
    }

    componentWillMount() {
        axios.get('http://localhost:3030/login')
            .then((getData) => {
                this.setState({ userdata: getData.data });
                console.log(this.state.userdata)
            })
    }


    // postlogin = (login_data) => {
    //     this.props.postLogin(login_data);
    //     console.log(login_data.username.value);
    //     console.log(login_data.password.value);
    // }

    username = () => {
        this.setState({ username: this.refs.username.value })
    }
    password = () => {
        this.setState({ password: this.refs.password.value })
    }

    login = () => {
        console.log(this.state.username, this.state.password, this.state.Id);
        const isi_data = this.state.userdata.map((item, index) => {
            if (this.state.username !== item.username && this.state.password !== item.password) {
                console.log('username/password salah');
            }
            else if (this.state.username === item.username && this.state.password === item.password) {
                this.setState({ Id: item.id });
                console.log('isi state', this.state.Id, 'isi item', item.id)
                this.props.userlogin({ Password: this.state.password, Username: this.state.username, Id: item.id, Profpic: item.profile })
            }
        })
    }

    render() {
        return (
            <div className="jumbotron text-center divlogin" id="page-top">
                <h2 className="form-signin-heading">Login</h2>
                <p>Username <input type="text" ref="username" placeholder="Username" onInput={this.username} required /></p>
                <p>Password <input type="password" ref="password" placeholder="Password" onInput={this.password} required /></p>

                <p><Link to={`/home/${this.state.Id}`}> <input className="btn btn-lg btn-primary" type="submit" onClick={() => { this.login() }} value="Login" /></Link></p>
                {/* <p><input className="btn btn-login" type="submit" onClick={() => this.postlogin(this.refs)} value="Login" /></p> */}
                <Link to="/register">Register</Link>

            </div>
        )
    }
}
export default connect(null, { userlogin })(Login);
