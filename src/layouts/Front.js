import React, { Component } from 'react'

export default class Front extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>Header1</h1>
                { this.props.children }
                <h1>Footer 1</h1>
            </div>
        )
    }
}
