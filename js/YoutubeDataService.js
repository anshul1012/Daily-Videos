/**
 * Created by achaturvedi on 8/25/2015.
 */
app.factory('YoutubeDataService', ['$http','$q',function($http,$q){
    var access_token = undefined;
    var apikey = 'AIzaSyD8kv4KcECaCUvRNQKAJU0HBUMvTrXWmYA';
    var setAccessToken = function(token){
        access_token = token;
    };
    var subscriptionsUrl = "https://www.googleapis.com/youtube/v3/subscriptions?part=contentDetails,snippet&fields=nextPageToken,items(id,snippet(resourceId(channelId),title))&mine=true&order=relevance";
    var videosUrl = "https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails,snippet&fields=nextPageToken,items(snippet(publishedAt,title,thumbnails(medium(url))),contentDetails(videoId))"
    var subscriptions = [];
    var videos = [];
    var i=0;
    var subscriptionPromise;
    var videoListPromise;

    var fetchSubscriptions = function(result){
        angular.forEach(result.data.items, function(value,key){
            subscriptions[i] = {
                id: value.id,
                channelId: value.snippet.resourceId.channelId,
                title: value.snippet.title
            };
            i++;
        });
        if(typeof result.data.nextPageToken !== 'undefined'){
            $http.get(subscriptionsUrl+"&pageToken="+result.data.nextPageToken+"&access_token="+access_token).then(function(response){
                fetchSubscriptions(response);
            });
        }
        else{
            subscriptionPromise.resolve(subscriptions);
            subscriptions = [];
            i=0;
        }
    };
    var getSubscriptions = function(){
        $http.get(subscriptionsUrl+"&access_token="+access_token).then(function(data){
            fetchSubscriptions(data);
        });

    };
    var fetchVideos = function(result,listId){
        angular.forEach(result.data.items, function(value,key){
            videos[i] = {
                id: value.contentDetails.videoId,
                pubDate: value.snippet.publishedAt,
                title: value.snippet.title,
                thumbnail: value.snippet.thumbnails.medium.url
            };
            i++;
        });
        if(typeof result.data.nextPageToken !== 'undefined'){
            $http.get(videosUrl+"&playlistId="+listId+"&pageToken="+result.data.nextPageToken+"&key="+apikey).then(function(response){
                fetchVideos(response,listId);
            });
        }
        else{

            videoListPromise.resolve(videos);
            videos = [];
            i=0;
        }
    }

    var getVideos = function(listId){
        $http.get(videosUrl+"&playlistId="+listId+"&key="+apikey).then(function(data){
            fetchVideos(data,listId);
        });
    };

    var uploadList = function(channelId){
        videoListPromise = $q.defer();
        $http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id="+channelId+"&fields=items(contentDetails(relatedPlaylists(uploads)))&key="+apikey).then(function(response){
            var listId = response.data.items[0].contentDetails.relatedPlaylists.uploads;
            getVideos(listId);
        });
        return videoListPromise.promise;
    }

    return {
        setAccessToken: setAccessToken,
        getSubscriptions: function(){
            subscriptionPromise = $q.defer();
            getSubscriptions();
            return subscriptionPromise.promise;
        },
        getVideoList: uploadList
    };
}]);
