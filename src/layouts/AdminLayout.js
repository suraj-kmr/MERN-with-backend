import React, { Component } from 'react'
import Header from './admin/Header'
import Topbar from './admin/Topbar'

export default class AdminLayout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        )
    }
}
