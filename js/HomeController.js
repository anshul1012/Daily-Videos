/**
 * Created by achaturvedi on 8/18/2015.
 */
app.controller('HomeController', ['$scope','$location','LoggedUser','YoutubeDataService', function($scope,$location,LoggedUser,YoutubeDataService){
    console.log("generating home page");
    var initial = 1;
    $scope.user = LoggedUser.getLoggedUser();
    if(typeof $scope.user === 'undefined') {
        console.log("You have not logged in... redirectin to login");
        $location.path('/login');
        $scope.$apply();
    }

    $scope.signOut = function(){

        gapi.auth2.getAuthInstance().signOut().then(function(){
            LoggedUser.setLoggedUser(undefined);
            $location.path('/logout');
            $scope.$apply();
        });
    };

    $scope.subscriptions=[];
    $scope.videos =[];
    $scope.selectedChannel = "";
    YoutubeDataService.setAccessToken($scope.user.getAuthResponse(1).access_token);
    YoutubeDataService.getSubscriptions().then(function(data){
        $scope.subscriptions = data;
    });

    $scope.$watch('selectedChannel', function(newval,oldval){
        if(initial){
            initial = 0;
        }
        else{
            YoutubeDataService.getVideoList(newval).then(function(response){
                //$scope.subscriptions.filter(function(sub){return sub.channelId==$scope.selectedChannel})[0].videos = videos;
                $scope.videos = response;

            });
        }

    });

    /*YoutubeDataService.setAccessToken($scope.user.getAuthResponse(1).access_token);
    $scope.userSubscriptions = YoutubeDataService.getSubscriptions();*/



    /*//var myVideos = videoList;
    var videos=videoList.videos;
    //console.log(videos[0]);
    $scope.videos=[];
    for(var i=0; i<videos.length; i++){
        $scope.videos[i] = {
            img_src: 'http://img.youtube.com/vi/'+videos[i]+'/hqdefault.jpg',
            url: 'http://youtube.com/watch?v='+videos[i],
            id: videos[i]
        };
        //console.log($scope.videos[i]);
    }
    //console.log($scope.videos);*/

    $scope.playVideo = function(index){
        $location.path('/play/'+$scope.videos[index].id);
    }
} ]);