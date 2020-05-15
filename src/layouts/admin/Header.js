import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            admin: false,
            token: localStorage.getItem('access_token')
        }
    }

    componentDidMount(){
        let token = localStorage.getItem('access_token');
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        };
        Axios.get(`http://localhost:5000/admin/token-verify`, {
            headers: headers
        }).then(res => {
           
        }).catch(error => {
            this.setState({ redirect: true })
        })
    }

    render() {
        if(this.state.admin === true){
            return <Redirect to="/admin"/>
        }
        if(this.state.token === null){
            return <Redirect to="/admin"/>
        }
        return (
            <div className ="wrapper">
                <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                    <div className="logo"><a href="/admin" className="simple-text logo-normal">
                        Creative Tim</a></div>
                    <div className="sidebar-wrapper">
                        <ul className="nav">
                            <li className="nav-item active  ">
                                <a className="nav-link" href="/admin/dashboard">
                                    <i className="material-icons">dashboard</i>
                                    <p>Dashboard</p>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="/admin/profile">
                                    <i className="material-icons">person</i>
                                    <p>User Profile</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
