/**
 * Created by achaturvedi on 8/19/2015.
 */
app.service('ytapiready', function(){
    this.isApiReady = false;
    this.getApiStatus = function(){
        return this.isApiReady;
    };
    this.setApiStatus = function(state){
        this.isApiReady = state;
    }
    this.playVideo = function(id) {
        var player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: id
        });
    }
});