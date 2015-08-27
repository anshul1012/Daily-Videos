/**
 * Created by achaturvedi on 8/20/2015.
 */
app.factory('LoggedUser', ['$window','$q', function($window,$q){
    var apistatusPromise = $q.defer();
    var signInPromise = $q.defer();
    var user = undefined;
    var apiStatus = false;
    var setUser = function(googleUser){
        user = googleUser;
    };
    var getUser = function(){
        return user;
    }
    var getApiStatus = function(){
        return apiStatus;
    }
    $window.onSignIn = function(googleUser){
        user = googleUser;
        signInPromise.resolve(googleUser);
    };
    $window.onLoad = function(){
        apiStatus = true;
        apistatusPromise.resolve(true);
    };

    var gscript = document.createElement('script');
    gscript.src = 'https://apis.google.com/js/platform.js?onload=onLoad';
    gscript.async = true;
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(gscript,firstScript);

    return{
        apiStatus: getApiStatus,
        isSignedIn: signInPromise.promise,
        isApiLoaded: apistatusPromise.promise,
        setLoggedUser: setUser,
        getLoggedUser: getUser
    }

   }]);
