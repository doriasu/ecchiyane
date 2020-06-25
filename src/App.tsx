import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase,{providerTwitter} from "./base";
import {Button} from "@material-ui/core";
interface IApp{

}
interface Iusers_info {
    token:string;
    sec_token:string;

}
class App extends React.Component<IApp,Iusers_info>{
    constructor(props:IApp) {
        super(props);
        this.state={token:"",sec_token:""};

    }
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
    get_user_infomation(){
        let item_token=this.state.token;
        let item_sec_token=this.state.sec_token;
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                let credential = result.credential as firebase.auth.OAuthCredential;
                if(credential.accessToken!==undefined){
                item_token= credential.accessToken;}
                if(credential.secret!==undefined){
                item_sec_token = credential.secret;}

            }
            // The signed-in user info.
            var user = result.user;
            console.log(user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        }
        );
        this.setState({token:item_token,sec_token:item_sec_token});

    }
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
