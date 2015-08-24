/**
 * Created by achaturvedi on 8/19/2015.
 */
app.controller('PlayerController', ['$scope','$routeParams','$window','ytapiready', function($scope,$routeParams,$window,ytapiready){
    $scope.videoId = $routeParams.id;
    if(ytapiready.getApiStatus()){
        ytapiready.playVideo($scope.videoId);
    }
    else{
        var tag = $window.document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = $window.document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        $window.onYouTubeIframeAPIReady = function() {
            ytapiready.playVideo($scope.videoId);
            ytapiready.setApiStatus(true);
        }
    }

}]);

