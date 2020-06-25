import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase,{providerTwitter} from "./base";
import {Button} from "@material-ui/core";

class App extends React.Component{
    loginWithTwitter() {
        firebase.auth().signInWithRedirect(providerTwitter).then(function(result) {
            // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
            // You can use these server side with your app's credentials to access the Twitter API.
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    };
    render(){
        return (
            <div>
                <div>
                    略
                    <Button onClick={this.loginWithTwitter}>Login</Button>
                </div>
            </div>
        );
    }
}
export default App;
