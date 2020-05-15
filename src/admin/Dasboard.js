import React, { Component } from 'react'
import Header from '../layouts/admin/Header'
import Footer from '../layouts/admin/Footer'
import Topbar from '../layouts/admin/Topbar';
import AdminLayout from '../layouts/AdminLayout';

export default class Dasboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        document.title = "Dashboard"
        this.setState({ title: 'Dashboard' })
    }

    render() {
        return (
            <div>
                <AdminLayout />
                <div className="main-panel">
                    <Topbar title="Dashboard"/>
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-warning card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">content_copy</i>
                                            </div>
                                            <p className="card-category">Used Space</p>
                                            <h3 className="card-title">49/50<small>GB</small>
                                            </h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons text-danger">warning</i>
                                                <a href="#">Get More Space...</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">store</i>
                                            </div>
                                            <p className="card-category">Revenue</p>
                                            <h3 className="card-title">$34,245</h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">date_range</i> Last 24 Hours</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-danger card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">info_outline</i>
                                            </div>
                                            <p className="card-category">Fixed Issues</p>
                                            <h3 className="card-title">75</h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">local_offer</i> Tracked from Github</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 col-sm-6">
                                    <div className="card card-stats">
                                        <div className="card-header card-header-info card-header-icon">
                                            <div className="card-icon">
                                                <i className="fa fa-twitter" />
                                            </div>
                                            <p className="card-category">Followers</p>
                                            <h3 className="card-title">+245</h3>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">update</i> Just Updated</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card card-chart">
                                        <div className="card-header card-header-success">
                                            <div className="ct-chart" id="dailySalesChart" />
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Daily Sales</h4>
                                            <p className="card-category">
                                                <span className="text-success"><i className="fa fa-long-arrow-up" /> 55% </span> increase in today sales.</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">access_time</i> updated 4 minutes ago</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-chart">
                                        <div className="card-header card-header-warning">
                                            <div className="ct-chart" id="websiteViewsChart" />
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Email Subscriptions</h4>
                                            <p className="card-category">Last Campaign Performance</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">access_time</i> campaign sent 2 days ago</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card card-chart">
                                        <div className="card-header card-header-danger">
                                            <div className="ct-chart" id="completedTasksChart" />
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">Completed Tasks</h4>
                                            <p className="card-category">Last Campaign Performance</p>
                                        </div>
                                        <div className="card-footer">
                                            <div className="stats">
                                                <i className="material-icons">access_time</i> campaign sent 2 days ago</div>
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
