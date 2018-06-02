import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = { username: '', password: '', userdata: [], Id: '', picture: '' };
    }

    componentWillMount() {
        axios.get('http://localhost:3030/login')
            .then((getData) => {
                this.setState({ userdata: getData.data });
                console.log(this.state.userdata)
            })
    }

    username = () => {
        this.setState({ username: this.refs.username.value })
    }
    password = () => {
        this.setState({ password: this.refs.password.value })
    }
    onChangeFile = (event) => {
        const state = this.state
        state.picture = event.target.files[0];
        this.setState(state);
    }

    edit = () => {
        var formData = new FormData();

        formData.append('file', this.uploadInput.files[0]);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        console.log(formData)

        const data = this.state.userdata.map((item, index) => {
            var username = item.username
            if (this.state.username === this.username) console.log('Username Sudah Terpakai')
            else {
                axios.post(`http://localhost:3030/editprofile/${this.props.Id}`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    })
                    .then(() => {
                        this.props.userlogin({ username: this.state.username })
                    })
            }
        })
    }

    render() {
        return (
            <div className="jumbotron text-center divlogin" id="page-top">
                <p>Username <input type="text" ref="username" placeholder="Username" onInput={this.username} required /></p>
                <p>Password <input type="password" ref="password" placeholder="Password" onInput={this.password} required /></p>
                <input type='file' name='picture' ref={(ref) => { this.uploadInput = ref }} onChange={this.onChangeFile} required />

                <p> <input className="btn btn-login" type="submit" onClick={() => { this.edit() }} value="Confirm Edit" /></p>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { username: state.login.Username, Id: state.login.Id, Profpic: state.login.Profpic };
};

export default connect(mapStateToProps, { userlogin })(EditProfile);
