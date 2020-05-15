import React, { Component } from 'react'
import Footer from '../layouts/admin/Footer'
import Topbar from '../layouts/admin/Topbar'
import Axios from 'axios';
import AuthProvider from '../AuthProvider';
import AdminLayout from '../layouts/AdminLayout';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            success: '',
            error: '',
            new_password: '',
            confirm_password: '',
            pass_error: '',
            pass_success: '',
            pass_disp: '',
            disp: '',
            selectedFile: '',
            profile_pic: '',
            title:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onFileChange = this.onFileChange.bind(this);

    }

    componentDidMount() {
        document.title = 'Profile';
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${AuthProvider.token}`
        };
        Axios.get(AuthProvider.endpoint+`/admin/user-profile`, {
            headers: headers
        }).then(res => {
            this.setState({ first_name: res.data.users.first_name })
            this.setState({ last_name: res.data.users.last_name })
            this.setState({ email: res.data.users.email })
            this.setState({ phone: res.data.users.phone })
            this.setState({ address: res.data.users.address })
            this.setState({ profile_pic: res.data.users.profile_pic })
        }).catch(error => {
            console.log(error.response)
            // this.setState({ error: error.response.data.message })
        })
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    handleSubmit(event) {
        event.preventDefault();
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${AuthProvider.token}`
        };
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address
        };
        Axios.post(AuthProvider.endpoint+`/admin/profile-update`, data, {
            headers: headers
        })
            .then(res => {
                this.setState({ success: res.data.message, pass_disp: 'show' })
            })
            .catch(error => {
                this.setState({ error: error.response.data.message })
            })
    }

    changePassword(event) {
        event.preventDefault();
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${AuthProvider.token}`
        };
        const data = {
            new_password: this.state.new_password,
            confirm_password: this.state.confirm_password,
        };
        Axios.post(AuthProvider.endpoint+`/admin/change-password`, data, {
            headers: headers
        })
            .then(res => {
                this.setState({ pass_success: res.data.message, pass_disp: 'show' })
            })
            .catch(error => {
                this.setState({ pass_error: error.response.data.message, pass_disp: 'show' })
            })
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({ pass_disp: undefined });
    }

    onFileChange(event) {
        event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        })
        const formData = new FormData();
        formData.append('profile_pic', event.target.files[0]);
        const headers = {
            Accept: 'multipart/form-data',
            'authorization': `Bearer ${AuthProvider.token}`,
            'Content-Type': `multipart/form-data`,
        };
        Axios.post(AuthProvider.endpoint+`/admin/upload-profile`, formData, {
            headers: headers
        })
            .then(res => {
                this.setState({ pass_success: res.data.message, pass_disp: 'show' })
            })
            .catch(error => {
                this.setState({ pass_error: error.response.data.message, pass_disp: 'show' })
            })
    }
  
    render() {
        return (
            <div>
                <AdminLayout/>
                <div className="main-panel">
                    <Topbar title="Profile"/>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                            <h4 className="card-title">Edit Profile</h4>
                                            <p className="card-category">Complete your profile</p>
                                        </div>
                                        <div className="card-body">
                                            <div className={"alert fade p-2 " + (this.state.success ? "alert-success show" : (this.state.error ? "alert-danger show" : ""))} role="alert" >
                                                <a className="close" onClick={this.handleClick}>&times;</a>
                                                {(this.state.success ? this.state.success : (this.state.error ? this.state.error : ""))}
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className={"form-group " + (this.state.first_name ? ' is-filled' : '')}>
                                                            <label className="bmd-label-floating">First Name</label>
                                                            <input type="text" className="form-control" value={this.state.first_name} onChange={(e) => this.handleChange({ first_name: e.target.value })} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className={"form-group " + (this.state.last_name ? ' is-filled' : '')}>
                                                            <label className="bmd-label-floating" >Last Name</label>
                                                            <input type="text" className="form-control" value={this.state.last_name} onChange={(e) => this.handleChange({ last_name: e.target.value })} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className={"form-group " + (this.state.email ? ' is-filled' : '')}>
                                                            <label className="bmd-label-floating" >Email address</label>
                                                            <input type="email" readonly className="form-control" value={this.state.email} onChange={(e) => this.handleChange({ email: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className={"form-group " + (this.state.phone ? ' is-filled' : '')}>
                                                            <label className="bmd-label-floating" >Phone no</label>

                                                            <input type="text" className="form-control" value={this.state.phone} onChange={(e) => this.handleChange({ phone: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Address</label>
                                                            <div className="form-group">
                                                                <textarea className="form-control" rows={5} onChange={(e) => this.handleChange({ address: e.target.value })} value={this.state.address} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary pull-right">Update Profile</button>
                                                <div className="clearfix" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-profile">
                                        <div className="card-avatar">
                                            <div className="avatar-preview">
                                                <img className="img" src={"../img/users/" + this.state.profile_pic } />
                                            </div>
                                        </div>
                                        <div className="upload-btn-wrapper">
                                            <form onSubmit={this.onFileupload}>
                                                <button className="btn btn-primary">Upload a file</button>
                                                <input type="file" name="profile_pic" onChange={this.onFileChange} />
                                            </form>
                                        </div>
                                        <div className="card-body">
                                            <div className={"alert fade p-2 " + (this.state.pass_success ? "alert-success " + this.state.pass_disp : (this.state.pass_error ? "alert-danger " + this.state.pass_disp : ""))} role="alert" >
                                                <a className="close" onClick={this.handleClick}>&times;</a>
                                                {(this.state.pass_success ? this.state.pass_success : (this.state.pass_error ? this.state.pass_error : ""))}
                                            </div>

                                            <form onSubmit={this.changePassword}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating" style={{ left: 0 }}>New Password</label>
                                                            <input type="password" className="form-control" value={this.state.new_password} onChange={(e) => this.handleChange({ new_password: e.target.value })} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating" style={{ left: 0 }}>Confirm Password</label>
                                                            <input type="password" className="form-control" value={this.state.confirm_password} onChange={(e) => this.handleChange({ confirm_password: e.target.value })} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-round">Update</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

            </div>
        )
    }
}
