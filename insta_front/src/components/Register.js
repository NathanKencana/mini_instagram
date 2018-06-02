import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import axios from 'axios';

class Register extends Component {
    constructor() {
        super();
        this.state = { data: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:3030/login')
            .then((getData) => {
                console.log(getData.data)
                this.setState({ data: getData.data });
                console.log(this.state.data);
            })
    }

    register = () => {
        const isi_data = this.state.data.map((item, index) => {
            console.log(this.refs)
            var username = item.username
            if (this.refs.username.value === username) {
                console.log('username sudah terpakai!');
                <Redirect to='/' />
            }
            else {
                console.log('Register Success')
                
                axios.post('http://localhost:3030/register',
                    {
                        username: this.refs.username.value,
                        password: this.refs.password.value
                    })
                    .then(<Redirect to='/' />)
            }
        })
    }

    render() {

        return (
            <div className="jumbotron text-center divlogin" id="page-top">
                <h2 className="form-signin-heading">Register</h2>
                <p>Username <input type="text" id="username" ref="username" placeholder="Username" required /></p>
                <p>Password <input type="password" id="password" ref="password" placeholder="Password" required /></p>
                <p><button className="btn btn-lg btn-primary" type="submit" onClick={() => { this.register() }}>Register</button></p>
                <Link to="/">Login</Link>
            </div>

        );
    }
}
export default Register;