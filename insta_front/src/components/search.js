import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { selectID } from '../actions'

class Search extends Component {
    constructor() {
        super();
        this.state = { profile: [], follower: [], following: [], follow:[] };
    }

    componentWillMount() {
        axios.get('http://localhost:3030/follow')
        .then((getdata)=> {
            console.log('ini get data follow',getdata);
            this.setState({follow: getdata.data})
            console.log('ini follow', this.state.follow)
        })
        axios.get(`http://localhost:3030/search/${this.props.search}`)
            .then((getdata) => {
                console.log(getdata)
                this.setState({ profile: getdata.data.search });
                console.log(this.state.profile);
            })
        axios.get('http://localhost:3030/search/' + this.props.search)
            .then((getData) => {
                console.log(getData.data)
                this.setState({ follower: getData.data.follower })
                console.log(this.state.follower);
            })
        axios.get('http://localhost:3030/search/' + this.props.search)
            .then((getData) => {
                console.log(getData.data)
                this.setState({ following: getData.data.following })
                console.log(this.state.following);
            })
    }

    follow = () => {
        axios.post('http://localhost:3030/follow', 
    {
        id_user: this.props.id ,
        id_follow: this.state.profile.id
    })
    }
    unfollow = () => {
        axios.post('http://localhost:3030/unfollow',
    {
        id_user: this.props.id,
        id_follow: this.state.profile.id
    })

    }

    render() {
        const folder = 'http://localhost:3030/images/';

        const cekfollow = this.state.follow.map((item,index) => {
            var id_user = item.id_user
            var id_follow = item.id_follow

            if(this.state.profile.id === id_user){
                return (
                    <p>Hi there</p>
                )
            }
            else if(this.state.profile.id === id_follow && id_user === this.props.Id){
                return(
                    <button onClick={() => {this.follow}}>Follow</button>
                )
            }
            else {
                return(
                    <button onClick={()=> {this.unfollow}}>Unfollow</button>
                )
            }
        })

        const bodyData = this.state.profile.map((item, index) => {
            var username = item.username
            var profile = item.profile
            var jumlahfollower = this.state.follower.length
            var jumlahfollowing = this.state.following.length

            return (
                <div class="twitter-widget">
                    <div class="header cf">
                        <img src={`${folder + profile}`} className="card-img-top" style={{ height: 100, width: 200 }} />
                        <h2>{username}</h2>
                    </div>
                    <div class="stats cf">
                        <Link to={`/following/${this.props.search}`} class="stat">
                            <strong>{jumlahfollowing}</strong>
                            following
			            </Link>
                        <Link to={`/follower/${this.props.search}`} class="stat">
                            <strong>{jumlahfollower}</strong>
                            followers
			            </Link>
                        {cekfollow}
                    </div>
                </div>
            )

        })

        return (
            <div>
                {bodyData}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { search: state.search.SearchText, selectedID: state.selectId.ID, Id: state.login.Id };
};

export default connect(mapStateToProps, { selectID })(Search);