import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

const AuthProvider = {
    is_loggedin: function(){
        const token = localStorage.getItem('access_token');
        console.log(token)
        if(token === undefined ){
            return <Redirect to="/admin"/>
        }
        else if(token === ""){
            return <Redirect to="/admin"/>
        }
        else if(token === null){
            return <Redirect to="/admin"/>
        }
        else{
            return <Redirect to="/admin/dashboard"/>
        }

    },
    'endpoint':'http://localhost:5000',
    'token': localStorage.getItem('access_token')
}

export default AuthProvider;
