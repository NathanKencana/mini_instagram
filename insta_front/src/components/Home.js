import React, { Component } from 'react';
import axios from 'axios';
import './home.css';
import { connect } from 'react-redux';
import { userlogin } from '../actions';

class Home extends Component {

    constructor() {
        super()
        this.state = { timelineuser: [], timelinefollow: [], picture: '', caption: '', checker: [], like: [] };
    }

    componentWillMount() {
        console.log(this.props.Id)
        axios.get(`http://localhost:3030/timeline/${this.props.Id}`)
            .then((getData) => {
                console.log(getData)
                this.setState({ timelinefollow: getData.data.tfollow, timelineuser: getData.data.tuser })
                console.log('ini state timeline', this.state.timeline)
            })

        axios.get('http://localhost:3030/like')
            .then((getdata) => {
                this.setState({ like: getdata.data })
            })
    }

    upload = (event) => {
        let formData = new FormData();

        formData.append('file', this.uploadInput.files[0]);
        formData.append('caption', this.refs.caption.value)

        console.log(this.uploadInput.files[0])
        console.log(this.refs.caption.value)

        axios.post('http://localhost:3030/post/ ' + this.props.Id,
            formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(() => {
                console.log(this.uploadInput.files[0])
                console.log('upload success')
            })
    }

    onChangeFile = (event) => {
        const state = this.state

        state.picture = event.target.files[0];
        this.setState(state);
    }
    // likecheck = () => {
    //     const check = this.state.like.map((item, index) => {
    //         var id = item.id
    //         var user = item.id_user
    //         var post = item.id_post

    //         if (this.state.timeline.id == id && this.state.timeline.id == post && this.state.timeline.id == user) {

    //         }

    //     })
    // }

    render() {
        const folder = 'http://localhost:3030/images/';

        const fbodydata = this.state.timelinefollow.map((item, index) => {
            var username = item.username
            var picture = item.image
            var caption = item.caption
            var prof_pic = item.profile

            return (
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <span>
                            <p style={{ color: 'blue' }}><img src={folder + prof_pic} className="" style={{ width: 50, height: 50 }} /> {username}</p>
                        </span>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <img src={folder + picture} className='card-img-top' style={{ width: 700, height: 400 }} />
                    </div>
                    <div className='card-footer'>
                        <sub style={{ color: 'white' }}>Caption : {caption}</sub> <br />
                        <button className='small' value='like' onClick={() => { }} />
                    </div>
                    <br /><br />
                </div>
            )
        })

        const ubodydata = this.state.timelineuser.map((item, index) => {
            var username = item.username
            var picture = item.image
            var caption = item.caption
            var prof_pic = item.profile

            return (
                <div className='container'>
                    <div className='row d-flex justify-content-center'>
                        <span>
                            <p style={{ color: 'blue' }}><img src={folder + prof_pic} className="" style={{ width: 50, height: 50 }} /> {username}</p>
                        </span>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <img src={folder + picture} className='card-img-top' style={{ width: 700, height: 400 }} />
                    </div>
                    <div className='card-footer'>
                        <sub style={{ color: 'white' }}>Caption : {caption}</sub> <br />
                        <button className='small' value='like' onClick={() => { }} />
                    </div>
                    <br /><br />
                </div>
            )
        })

        return (
            <div>
                <div>
                    <h3>Post Something New? </h3>
                    <p><input type='text' name='caption' ref="caption" onChange={this.onChange} /></p>
                    <input type='file' name='picture' ref={(ref) => { this.uploadInput = ref }} onChange={this.onChangeFile} required />
                    <button type='submit' onClick={this.upload}>Upload It! </button>
                </div>
                {ubodydata}
                {fbodydata}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { username: state.login.Username, Id: state.login.Id, Profpic: state.login.Profpic };
};

export default connect(mapStateToProps, { userlogin })(Home);
