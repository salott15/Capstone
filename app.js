var oAuth

//App was originally made with Instagram instead of 500px.  Due to a time crunch, instagram was kept where it did not change user comprehension.
$('document').ready(function(){

	if(window.location.href.indexOf("access_token")>-1){
    oAuth = window.location.href.replace(/^.*token=/g,'');
    localStorage.setItem("instagram", oAuth);
	 console.log(oAuth);
  };
  $(".nyt").hide();
  $(".instagram").hide();
})

$('#instructions .close').click(function(){ 
  $('#instructions').remove(); 
});

$("input").keyup(function(e){
  if(e.keyCode === 13){
    $("button").click();
  }
});

$("button").click(function(){
  $(".centered").removeClass();
  $(".nyt").html("");
  loadInstagram();
	loadNyt();
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
    callbackNyt(result);
	}).fail(function(err) {
 	 throw err;
 	});
  $(".nyt").show();
 }

 function loadInstagram(){

  $(".instagram").show();
	_500px.api('/photos/search', { term: $("input").val(), page: 1 }, function (response) {
    console.log(response.data,response.data.photos);
		callbackInsta(response.data.photos)
	});
 }

function callbackInsta(data){
	console.log(data);
	$(".instagram").show();
  if(localStorage.getItem("500px_isLoggedIn")){
    $(".instagram").html("");
  $(".instagram").append("<h1>500px</h1>" + "<p>Photos taken in " + $("input").val() +"</p>")
	for(i=0; i<data.length; i++){
		$(".instagram").append('<img src=' + data[i].image_url + '>' + "<br>")
		$(".instagram").append(data[i].name + "<br>")
	}
}
else{
  $(".iglog").show();
}
}


function callbackNyt(data){
  console.log(data);
  $(".nyt").append("<h1>The New York Times</h1>" + "<p>Recent articles about " + $("input").val() +"</p>")
  for(i=0; i<data.response.docs.length; i++){
    if(!data.response.docs[i].multimedia.length){continue}
    $(".nyt").append("<img src ='http://www.nytimes.com/" + data.response.docs[i].multimedia[1].url + "'><br>")
    $(".nyt").append("<h2>" + data.response.docs[i].headline.main + "</h2>")
    $(".nyt").append("<a href = '" + data.response.docs[i].web_url + "'>" + data.response.docs[i].snippet + "</a>" + "<br>")
  }
}
