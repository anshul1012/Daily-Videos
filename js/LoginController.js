/**
 * Created by achaturvedi on 8/20/2015.
 */
app.controller('LoginController', ['$scope','$window','$location','LoggedUser','$route',function ($scope,$window,$location,LoggedUser,$route) {
    LoggedUser.isSignedIn.then(function(googleUser){
        console.log("user already signed in");
        LoggedUser.setLoggedUser(googleUser);
        $location.path('/home');
    });
    if(LoggedUser.apiStatus()){
        gapi.load('auth2,signin2', function() {
            gapi.auth2.init({
                'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com',
                'cookie_policy': 'none'
            });
            gapi.signin2.render('google_signin_button', {
                'onsuccess': 'onSignIn',
                'theme': 'dark',
                'immediate': false,
                'approvalprompt': "force"
            });
        });
    }
    else{
        LoggedUser.isApiLoaded.then(function(response){
            gapi.load('auth2,signin2', function() {
                gapi.auth2.init({
                    'client_id': '930528780724-lgcd56cg3dm6gbb5rlnmcu972sjn9tc4.apps.googleusercontent.com',
                    'cookie_policy': 'none'
                });
                gapi.signin2.render('google_signin_button', {
                    'onsuccess': 'onSignIn',
                    'theme': 'dark',
                    'immediate': false,
                    'approvalprompt': "force"
                });
            });
        });
    }


}]);