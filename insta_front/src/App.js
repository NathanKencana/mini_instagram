import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import Follower from './components/Follower';
import Following from './components/Following';
import FolProf from './components/FolProf';
import search from './components/search';

class App extends Component {

  // constructor() {
  //   super();
  //   this.state = { id_user: '', username: '' }
  // }

  // postlogin = (data_login) => {
  //   console.log(data_login.username.value);
  //   console.log(data_login.password.value);
  //   axios.post('http://localhost:3030/login',
  //     {
  //       username: data_login.username.value,
  //       password: data_login.password.value
  //     })
  //     .then((ambilDataLogin) => {
  //       console.log(ambilDataLogin.data);
  //       if (ambilDataLogin.data.login_status === "login success") {
  //         this.setState({ username: ambilDataLogin.data.username, id_user: ambilDataLogin.data.id, status_login: ambilDataLogin.data.login_status });
  //         this.setState({ redirect_home: true });
  //         console.log(this.state.username);
  //         console.log(this.state.id_user);
  //         alert('Login Success!');
  //         // <Redirect to='/' />
  //       }
  //       else {
  //         alert('Wrong Username or Password!')
  //       }
  //     })
  // }

  // postregis = (data_register) => {
  //   console.log(data_register)
  //   axios.post('http://localhost:3030/register',
  //     {
  //       username: data_register.username.value,
  //       password: data_register.password.value,
  //     })
  //     .then((ambilStatusRegister) => {
  //       if (ambilStatusRegister.data === "register success") {
  //         alert("Register Sukses")
  //       }
  //       else {
  //         alert("Username sudah terpakai")
  //       }
  //     })
  // }

  render() {
    return (
      <div className='App'>
        <Header />

        <Switch>
          <Route exact path="/" component={Login} />} />
          {/* <Route exact path="/" render={() => <Login postLogin={this.postlogin} />} /> */}
          <Route exact path="/register" component={Register} />} />
          <Route exact path="/home/:id" component={Home} /> }} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/logout" render={() => { this.setState({ id_user: null, username: null }) }} />
          <Route exact path="/editprofile/:id" component={EditProfile} />
          <Route exact path="/follower/:id" component={Follower} />
          <Route exact path="/following/:id" component={Following} />
          <Route exact path="/folprof/:id" component={FolProf} />
          <Route exact path="/search/:id" component={search} />
        </Switch>
      </div>

    );
  }
}

export default App;
