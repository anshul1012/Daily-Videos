/**
 * Created by achaturvedi on 8/20/2015.
 */
app.controller('LoginController', ['$scope','$window','$location','LoggedUser',function ($scope,$window,$location,LoggedUser) {
    console.log("Logging in");
    console.log(LoggedUser);
    LoggedUser.isSignedIn.then(function(googleUser){
        LoggedUser.setLoggedUser(googleUser);
        console.log("user signed in");
        console.log(googleUser);
        $location.path('/home');
    });
    console.log("api status: "+LoggedUser.apiStatus());
    if(LoggedUser.apiStatus()){
        console.log("api already loaded");
        gapi.load('auth2,signin2', function() {
            gapi.auth2.init({
                'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com'
            });
            gapi.signin2.render('google_signin_button', {
                'onsuccess': 'onSignIn',
                'theme': 'dark'
            });
        });
    }
    else{
        console.log("waiting for api to load");
        LoggedUser.isApiLoaded.then(function(response){
            console.log("api loaded");
            gapi.load('auth2,signin2', function() {
                gapi.auth2.init({
                    'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com'
                });
                gapi.signin2.render('google_signin_button', {
                    'onsuccess': 'onSignIn',
                    'theme': 'dark'
                });
            });
        });
    }

    /*if(LoggedUser.isApiLoaded){
        console.log("api ready");
        gapi.load('auth2,signin2', function() {
            gapi.auth2.init({
                'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com'
            });
            gapi.signin2.render('google_signin_button', {
                'onsuccess': 'onSignIn',
                'theme': 'dark'
            });
        });
    }*/
/*
    $window.onLoad = function(){
        gapi.load('auth2,signin2', function() {
            gapi.auth2.init({
                'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com'
            });
            gapi.signin2.render('google_signin_button', {
                'onsuccess': 'onSignIn',
                'theme': 'dark'
            });
        });
    };

    var gscript = document.createElement('script');
    gscript.src = 'https://apis.google.com/js/platform.js?onload=onLoad';
    gscript.async = true;
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(gscript,firstScript);
*/
}]);