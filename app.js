$('document').ready(function(){

	if(window.location.href.indexOf("access_token")>-1){
    oAuth = window.location.href.replace(/^.*token=/g,'');;
  };
  $(".nyt").hide();
})

$("input").keyup(function(e){
  if(e.keyCode === 13){
    $("button").click();
  }
});

$("button").click(function(){
  $(".nyt").html("");
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
    callbackNyt(result);
	}).fail(function(err) {
 	 throw err;
 	});
  $(".nyt").show();
 }

function callbackNyt(data){
  console.log(data)
  $(".nyt").append("<h1>The New York Times</h1>" + "<p>Recent articles about " + $("input").val() +"</p><br>")
  for(i=0; i<10; i++){
    if(data.response.docs[i].multimedia[0]) {
      $(".nyt").append("<div class = 'grid-item'><img src='http://www.nytimes.com/"
        + data.response.docs[i].multimedia[0].url + 
        "'/><br><h2>" + data.response.docs[i].headline.main + 
        "</h2><br><a href = '" + data.response.docs[i].web_url + "'>" + data.response.docs[i].snippet + 
      "</a>" + "</div>")
    }
  }
}