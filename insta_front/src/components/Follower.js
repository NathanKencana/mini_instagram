import React, { Component } from 'react';
import './profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { userlogin } from '../actions';
import { selectID } from '../actions';
import { Link } from 'react-router-dom';
import FolProf from './FolProf';

class Follower extends Component {
    constructor() {
        super()
        this.state = { follower: [] }
    }

    componentWillMount() {
        axios.get('http://localhost:3030/follower/' + this.props.Id)
            .then((getData) => {
                console.log(getData.data)
                this.setState({ follower: getData.data })
                console.log(this.state.follower);
            })
    }

    onclick = (id) => {
        this.props.selectID({ selectID: id });
    }

    render() {
        const folder = 'http://localhost:3030/images/';

        const bodyData = this.state.follower.map((item, index) => {
            var id = item.id
            var username = item.username
            var profpic = item.profile

            return (
                <div className="container-fluid">
                    <ul>
                        <Link to={`/folprof/${this.props.id_fol}`}><li key={index} onClick={() => { this.onclick(id) }}><img src={folder + profpic} style={{ width: 200, height: 100 }} /> &nbsp; {username}</li></Link>
                    </ul>
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
    return { username: state.login.Username, Id: state.login.Id, Profpic: state.login.Profpic, id_fol: state.selectId.ID };
};

export default connect(mapStateToProps, { userlogin, selectID })(Follower);