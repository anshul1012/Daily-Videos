/**
 * Created by achaturvedi on 8/18/2015.
 */
app.controller('HomeController', ['$scope','$location','videoList','LoggedUser','$route', function($scope,$location,videoList,LoggedUser,$route){
    console.log("generating home page");
    $scope.user = LoggedUser.getLoggedUser();
    if(typeof $scope.user === 'undefined') {
        console.log("You have not logged in... redirectin to login");
        $location.path('/login');
    }

    $scope.signOut = function(){
        //console.log(gapi.auth2.GoogleAuth);
        gapi.auth2.getAuthInstance().signOut().then(function(){
            console.log(gapi.auth2.getAuthInstance());
            $scope.user = undefined;
            $location.path('/login');
            console.log($location.path());
            $scope.$apply();
        });
    };

    /*gapi.auth2.getAuthInstance().isSignedIn.listen(function(isLoggedIn){
        console.log("signing out");
        console.log(isLoggedIn);
        if(!isLoggedIn){
            $scope.user = undefined;
            $location.path('/login');
            $scope.$apply();
        }
    });*/

    var myVideos = videoList;
    $scope.videos=[];
    for(var i=0; i<myVideos.length; i++){
        $scope.videos[i] = {
            img_src: 'http://img.youtube.com/vi/'+myVideos[i]+'/hqdefault.jpg',
            url: 'http://youtube.com/watch?v='+myVideos[i],
            id: myVideos[i]
        };
        //console.log($scope.videos);
    }

    $scope.playVideo = function(index){
        $location.path('/play/'+$scope.videos[index].id);
    }
} ]);