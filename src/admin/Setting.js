import React, { Component } from 'react'
import Topbar from '../layouts/admin/Topbar'
import Footer from '../layouts/admin/Footer'
import CKEditor from 'ckeditor4-react';
import Axios from 'axios';
import AuthProvider from '../AuthProvider';
import AdminLayout from '../layouts/AdminLayout';

export default class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: '',
            error: '',
            pass_disp: '',
            privacy_policy: '',
            terms_condition: '',
            about_us: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onEditorChange1 = this.onEditorChange1.bind(this);
        this.onEditorChange2 = this.onEditorChange2.bind(this);
    }

    componentDidMount() {
        document.title = "Welcome to setting page";
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${AuthProvider.token}`
        };
        Axios.get(AuthProvider.endpoint+'/admin/setting',{
            headers:headers
        })
        .then(res => {
            this.setState({ privacy_policy: res.data.setting.privacy_policy});
            this.setState({ terms_condition: res.data.setting.terms_and_condition});
            this.setState({ about_us: res.data.setting.about_us});
        })
        .catch(error => {
           
        })

    }
    
    onEditorChange( evt ) {
        this.setState( {
            privacy_policy: evt.editor.getData()
        } );
    }

    onEditorChange1( evt ) {
        this.setState( {
            terms_condition: evt.editor.getData()
        } );
    }

    onEditorChange2( evt ) {
        this.setState( {
            about_us: evt.editor.getData()
        } );
    }

    // handleChange( changeObject ) {
    //     this.setState(changeObject)
    // }

    handleClick(event) {
        event.preventDefault();
        this.setState({ pass_disp: undefined })
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': `Bearer ${AuthProvider.token}`
        };
        let data = {
            privacy_policy: this.state.privacy_policy,
            terms_and_condition: this.state.terms_condition,
            about_us: this.state.about_us,
        }
        Axios.post(AuthProvider.endpoint+'/admin/setting/save-setting', data,{
            headers: headers
        })
        .then(res => {
            this.setState({ success: res.data.message,pass_disp: 'show' })
        })
        .catch( error => {
            this.setState({ error: error.response.data.message,pass_disp: 'show' })
        })
    }

    render() {
        return (
            <div>
                <AdminLayout />
                <div className="main-panel">
                    <Topbar title="Setting"/>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-primary">
                                            <h4 className="card-title">Site Setting</h4>
                                            <p className="card-category">Update website privacy policy, about us and terms and conditions</p>
                                        </div>
                                        <div className="card-body">
                                            <div className={"alert fade p-2 " + (this.state.success ? "alert-success show" : (this.state.error ? "alert-danger show" : ""))} role="alert" >
                                                <a className="close" onClick={this.handleClick}>&times;</a>
                                                {(this.state.success ? this.state.success : (this.state.error ? this.state.error : ""))}
                                            </div>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Privacy Policy</label>
                                                            <div className="form-group">
                                                                    <CKEditor
                                                                    data={this.state.privacy_policy}
                                                                    onChange={this.onEditorChange} />
                                                                {/* <EditorPreview data={this.state.data} /> */}
                                                                {/* <textarea id="editor" className="form-control" rows={5} onChange={(e) => this.handleChange({ privacy_policy: e.target.value })} value={this.state.privacy_policy} /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>Terms and Conditions</label>
                                                            <div className="form-group">
                                                                <CKEditor
                                                                    data={this.state.terms_condition}
                                                                    onChange={this.onEditorChange1} />
                                                                {/* <textarea id="editor1" className="form-control" rows={5} onChange={(e) => this.handleChange({ terms_condition: e.target.value })} value={this.state.terms_condition} /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label>About Us</label>
                                                            <div className="form-group">
                                                                <CKEditor
                                                                    data={this.state.about_us}
                                                                    onChange={this.onEditorChange2} />
                                                                {/* <textarea id="editor2" className="form-control" rows={5} onChange={(e) => this.handleChange({ about_us: e.target.value })} value={this.state.about_us} /> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary pull-right">Save Setting</button>
                                                <div className="clearfix" />
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

