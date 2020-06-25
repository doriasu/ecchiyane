import React from 'react';
import logo from './logo.svg';
import './App.css';
import firebase,{providerTwitter} from "./base";
import {Button} from "@material-ui/core";
import {fetchHomeTimeline} from "twitter-api-ts";
import * as option from 'fp-ts/lib/Option';
interface IApp{

}
interface Iusers_info {
    consumerkey:string;
    consumersecret:string;
    token:string;
    sec_token:string;

}
class App extends React.Component<IApp,Iusers_info>{
    constructor(props:IApp) {
        super(props);
        let twitter_key=process.env.REACT_TWITTER_KEY;
        if(twitter_key === undefined){
            twitter_key="";
        }
        let twitter_sec_key=process.env.REACT_TWITTER_SECRET;
        if(twitter_sec_key === undefined){
            twitter_sec_key="";
        }
        this.state={consumerkey:twitter_key,consumersecret:twitter_sec_key,token:"",sec_token:""};

    }
    loginWithTwitter=()=> {
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
    get_user_infomation=()=>{
        let item_token=this.state.token;
        let item_sec_token=this.state.sec_token;
        firebase.auth().getRedirectResult().then(function(result) {
            console.log("JIHIOHDJEDJIOJ");
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
        ).then(()=>{this.setState({token:item_token,sec_token:item_sec_token});console.log(item_sec_token);console.log(item_token)});
        

    }
    get_twitter_info=()=>{
        fetchHomeTimeline({
            oAuth: {
                consumerKey: this.state.consumerkey,
                consumerSecret: this.state.consumersecret,
                token: option.some(this.state.token),
                tokenSecret: option.some(this.state.sec_token),
            },
            query: {
                count: option.some(50),
            },
        })
            // We use fp-ts’ Task type, which is lazy. Running the task returns a
            // promise.
            .run()
            .then(response => {
                console.log(response);
                // => Either<ErrorResponse, TwitterAPITimelineResponseT>
            });
    }


    render(){
        return (
            <div>
                <div>
                    略
                    <Button onClick={this.loginWithTwitter}>Login</Button>
                    <Button onClick={this.get_user_infomation}>取得year</Button>
                    <Button onClick={this.get_twitter_info}>data_year</Button>
                </div>
            </div>
        );
    }
}
export default App;
