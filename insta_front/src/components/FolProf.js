import React, { Component } from 'react';
import './profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { selectID } from '../actions';
import { Link } from 'react-router-dom'

class Profile extends Component {
    constructor() {
        super();
        this.state = { profile: [], follower: [], following: [], post: [] }
    }
    componentWillMount() {
        axios.get('http://localhost:3030/profile/' + this.props.id_fol)
            .then((getData) => {
                this.setState({ profile: getData.data })
                console.log('ini state profile ', this.state.profile);
            })
        axios.get('http://localhost:3030/postprofile/' + this.props.Id)
            .then((getdata) => {
                this.setState({ post: getdata.data })
                console.log(this.state.post)
            })
    }
    render() {
        const folder = 'http://localhost:3030/images/';

        const bodydata = this.state.post.map((item, index) => {
            console.log(bodydata)
            var picture = item.image
            var caption = item.caption

            return (

                <div className='container' key={index}>
                    <div className='row'>
                        <img src={folder + picture} className='card-img-top' style={{ width: 700, height: 400 }} />
                    </div>
                    <div className='card-footer'>
                        <sub style={{ color: 'white' }}>Caption : {caption}</sub>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div class="twitter-widget">
                    <div class="header cf">
                        <img src={`${folder + this.state.profile.profile}`} className="card-img-top" style={{ width: 200, height: 100 }} alt="200x100" />
                        <h2>{this.state.profile.username}</h2>
                    </div>
                    <div class="stats cf">
                        <Link to={`/following/${this.props.Id}`} class="stat">
                            <strong>{this.state.following.length}</strong>
                            following
			            </Link>
                        <Link to={`/follower/${this.props.Id}`} class="stat">
                            <strong>{this.state.follower.length}</strong>
                            followers
			            </Link>
                        <ul class="menu cf">
                            <li><Link to={`/editprofile/${this.props.Id}`} class="ico-settings">Settings</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='rows d-flex justify-content-center' style={{ paddingTop: 500 }} >
                    {bodydata}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.login.Username, Id: state.login.Id, Profpic: state.login.Profpic, id_fol: state.selectId.ID };
};

export default connect(mapStateToProps, { userlogin, selectID })(Profile);
