import React, { Component } from 'react'

export default class Errorpage extends Component {
    render() {
        return (
            <div>
                <div className="page-header header-filter" style={{ backgroundImage: 'url("https://rawgit.com/creativetimofficial/material-kit/master/assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 ml-auto mr-auto">
                                <div className="card card-login">
                                    <div className="card-header card-header-primary text-center">
                                        <h4 className="card-title">Error</h4>
                                    </div>
                                    <p className="description text-center">Or Be Classical</p>
                                    <div className="card-body">
                                            <h1 style={{textAlign:"center"}}>404</h1>
                                            <p style={{textAlign:"center"}}>Page Not Found</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
