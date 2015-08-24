/**
 * Created by achaturvedi on 8/19/2015.
 */
app.directive('youtubePlayer', ['$window', function($window){
    return{
        restrict: 'E',
        template: '<div></div>',
        link: function(scope, element, attrs){
            console.log("inside link fn");
            var tag = $window.document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = $window.document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            var player;
            $window.onYoutubeIframeAPIReady = function(){
                player = new YT.Player(element.childeren()[0], {
                    height: '390',
                    width: '640',
                    videoId: 'mWRsgZuwf_8'
                });
            };
        }
    }
}]);