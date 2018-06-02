import React, { Component } from 'react';
import './profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { Link } from 'react-router-dom';

class Profile extends Component {
    constructor() {
        super();
        this.state = { profile: [], follower: [], following: [], post: [] }
    }
    componentWillMount() {
        console.log(this.props.Id);
        axios.get('http://localhost:3030/profile/' + this.props.Id)
            .then((getData) => {
                console.log(getData)
                this.setState({ profile: getData.data })
                console.log('profile', this.state.profile);
            })

        axios.get('http://localhost:3030/postprofile/' + this.props.Id)
            .then((getdata) => {
                this.setState({ post: getdata.data })
                console.log(this.state.post)
            })

        axios.get('http://localhost:3030/follower/' + this.props.Id)
            .then((getData) => {
                this.setState({ follower: getData.data })
                console.log('follower', this.state.follower);
            })

        axios.get('http://localhost:3030/following/' + this.props.Id)
            .then((getData) => {
                this.setState({ following: getData.data })
                console.log('following', this.state.following);
            })
    }
    render() {
        const folder = 'http://localhost:3030/images/';

        const bodydata = this.state.post.map((item, index) => {
            console.log(bodydata)
            var picture = item.image
            var caption = item.caption

            return (

                <div className='container'>
                    <div className='row'>
                        <img src={folder + picture} className='card-img-top' style={{ width: 700, height: 400 }} />
                    </div>
                    <div className='card-footer'>
                        <sub style={{ color: 'white' }}>Caption : {caption}</sub>
                    </div>
                    <br />
                </div>
            )
        })

        return (
            <div>
                <div>
                    <div class="twitter-widget">
                        <div class="header cf">
                            <img src={`${folder + this.props.Profpic}`} className="card-img-top" style={{ height: 100, width: 200 }} />
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
                </div>
                <div className='rows d-flex justify-content-center' style={{ paddingTop: 500 }} >
                    {bodydata}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.login.Username, Id: state.login.Id, Profpic: state.login.Profpic };
};

export default connect(mapStateToProps, { userlogin })(Profile);
