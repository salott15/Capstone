var oAuth

$('document').ready(function(){
	console.log(window.location.href);
	oAuth = window.location.href.replace(/^.*token=/g,'');
	console.log(oAuth);
})



$("button").click(function(){
	loadNyt();
	loadInstagram();
});

function loadNyt(){
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
  		'api-key': "b02c5ea8b4bd49308d278ab9e626ebf9",
  		'q': $("input").val()
	});
	$.ajax({
  		url: url,
  		method: 'GET',
	}).done(function(result) {
  	console.log(result);
	}).fail(function(err) {
 	 throw err;
 	});
 }

 function loadInstagram(){
 	var url = "https://api.instagram.com/v1/tags/" + $("input").val() + 
 	"?access_token=" + oAuth
 	$.ajax({
 		dataType: 'jsonp',
  		url: url,
  		method: 'GET',
	}).done(function(result) {
  	console.log(result);
	}).fail(function(err) {
 	 throw err;
 	});
 }
	//Spotify, will pick up later. 
	//$.ajax({
	//	url: "https://api.spotify.com/v1/browse/categories/" + $('input').val(),
	//	headers: {
	//		Authorization: "AQDygyh6AYTxYRxnDhVw5GRNj6XneNc37bV9I85_GhVwOlXhlyxK3L2OMDZoBbTvDqEdjNevgTYVRUYohfV4dqgy4e6IQX7__eq5-XsTKsfuC5juVXD-0XShrzf3tzfHdyhhp49jn_nYU6SDBeldQ9NxEweszwOhILABMrU-EOYMGgzti2XaKbcimIwdh9e-GCY6T7_6sNJMziY0B8zN"
	//	}
	//})
	//$.getJSON("https://api.spotify.com/v1/browse/categories/" + $('input').val(), obj, callback);

//function loadSpotify(){
//var request = request('require'); // "Request" library

//var client_id = '41330404e28d4c8eb6bde974de89f30a'; 
//var client_secret = 'cec1265923c44ca2865d2c0ce57f8382'; 

// your application requests authorization
//var authOptions = {
  //url: 'https://accounts.spotify.com/api/token',
  //headers: {
    //'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  //},
//  form: {
 //   grant_type: 'client_credentials'
//  },
//  json: true
//};

//request.post(authOptions, function(error, response, body) {
//  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
//    var token = body.access_token;
//    var options = {
//      url: 'https://api.spotify.com/v1/users/jmperezperez',
//      headers: {
//        'Authorization': 'Bearer ' + token
//      },
//      json: true
//    };
//    request.get(options, function(error, response, body) {
//      console.log(body);
//    });
//  }
//})
//}

function callback(data){
	console.log(data);
	for(i=0; i<data.items.length; i++){
		$(".instagram").append("<a href='" + "https://youtube.com/watch?v=" + data.items[i].id.videoId + "'>Click to watch video</a>" + "<br>")
		$(".instagram").append(data.items[i].snippet.title + "<br>")
		$(".instagram").append("<img src= '" + data.items[i].snippet.thumbnails.default.url + "'/>" + "<br>")
	}
}


