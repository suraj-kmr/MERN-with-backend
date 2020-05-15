import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import Axios from 'axios';

export default class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: 'Admin',
            redirect: false,
            error: '',
            pass_disp:'',
            token: localStorage.getItem('access_token')
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
        console.log(this.state.token)
        if(this.state.token != null){
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${this.state.token}`
            };
            // console.log(AuthProvider.token)
            Axios.get(`http://localhost:5000/admin/token-verify`, {
                headers: headers
            }).then(res => {
                this.setState({ redirect: true });
            }).catch(error => {
                this.setState({ redirect: false })
            })
        }
                
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    handleSubmit(event) {
        event.preventDefault();
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const data = {
            email: this.state.email,
            password: this.state.password,
            role: 'Admin'
        };
        Axios.post(AuthProvider.endpoint + `/admin/authenticate`, data, {
            headers: headers
        })
            .then(res => {
                // console.log(res.data.accessToken)
                localStorage.setItem('access_token', res.data.accessToken)
                this.setState({ success: res.data.message , pass_disp: 'show'})
                this.setState({ redirect: true });
            })
            .catch(error => {
                this.setState({ error: error.response.data.message , pass_disp: 'show'})
                console.log(error.response)
            })
    }

    render() {
        console.log(this.state.redirect)
        if(this.state.redirect){
            return <Redirect to="/admin/dashboard"/>
        }
        return (
            <div>
                <div className="page-header header-filter" style={{ backgroundImage: 'url("https://rawgit.com/creativetimofficial/material-kit/master/assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                                <div className="card card-login">
                                    <form className="form" onSubmit={this.handleSubmit}>
                                        <div className="card-header card-header-primary text-center">
                                            <h4 className="card-title">Sign In</h4>
                                        </div>
                                        {/* <p className="description text-center">Or Be Classical</p> */}
                                        <div className="card-body">
                                            <div className={"alert fade p-2 " + (this.state.success ? "alert-success show" : (this.state.error ? "alert-danger show" : ""))} role="alert" >
                                                <a className="close" onClick={this.handleClick}>&times;</a>
                                                {(this.state.success ? this.state.success : (this.state.error ? this.state.error : ""))}
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="material-icons">mail</i>
                                                    </span>
                                                </div>
                                                <input type="email" className="form-control" autoComplete="off" placeholder="Email..." onChange={(e) => this.handleChange({ email: e.target.value })} required />
                                            </div>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="material-icons">lock_outline</i>
                                                    </span>
                                                </div>
                                                <input type="password" className="form-control" placeholder="Password..." onChange={(e) => this.handleChange({ password: e.target.value })} required />
                                            </div>

                                        </div>
                                        <div className="footer text-center">
                                            <button type="submit" className="btn btn-primary btn-link btn-wd btn-lg">Sign In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
