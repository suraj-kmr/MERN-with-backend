import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                <div>
                    <footer className="footer">
                        <div className="container-fluid">
                            <nav className="float-left">
                                <ul>
                                    <li>
                                        <a href="#">
                                            Develope by Suraj
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="copyright float-right">
                                Copyright © {(new Date().getFullYear())} 
                            </div>
                        </div>
                    </footer>
                    </div>

            </div>
        )
    }
}
