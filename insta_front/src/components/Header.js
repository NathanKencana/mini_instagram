import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { Search } from '../actions';

class Header extends Component {
    constructor() {
        super()
        this.state = { Text: '' }
    }

    logout = () => {
        this.props.userlogin({ Username: '', Password: '' });
    }

    textSearch() {
        this.setState({ Text: this.refs.searchinput.value })
    }

    OnclickSearch = () => {
        console.log('ini click search', this.state.Text);
        this.props.Search({ search: this.state.Text })
    }

    render() {
        if (this.props.Id) {
            console.log('Ada Id Props', this.props.Id)
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <Link to={`/home/${this.props.Id}`} className="navbar-brand">Insta</Link>
                        <span className="input-group-btn"><input type="text" className="form-control" placeholder="Search for..." className="searchbar" ref='searchinput' onChange={() => { this.textSearch() }} />
                            <Link to={`/search/${this.state.Text}`}>
                                <button className="btn btn-danger" type="button" onClick={() => { this.OnclickSearch() }}>Go!</button>
                            </Link>
                        </span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={`/profile/${this.props.Id}`} className="nav-link">Welcome, {this.props.username}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={() => { this.logout() }} >Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
        else {
            console.log('Tidak ada Id', this.props.Id)
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container">
                        <Link to="/home" className="navbar-brand">Insta</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { username: state.login.Username, Id: state.login.Id };
};

export default connect(mapStateToProps, { userlogin, Search })(Header)