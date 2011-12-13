var senators = new Array();

function addSenatorsToSideBar() {
	for(var i = 0; i < senatorsObj.Senators.length; i++){
		$("#senatorsList").append("<li onClick=\"addCard(this)\" class=\"senatorBar\" id=\"sl" + senatorsObj.Senators[i].ID + "\">" + senatorsObj.Senators[i].Name + "</li>");
	}
}

function createCandContribUrl(senId) {
	var url = "http://www.opensecrets.org/api/?method=candContrib&cid=" + senId + "&cycle=2010&apikey=b2f04b41bc14f3ba04c32a3959bcddeb";
	return url;
}

function addCard(item) {
	var senId = $(item).attr("id").substring(2);
	var getUrl = createCandContribUrl(senId);
	console.log(getUrl);
	//getUrl = "http://www.opensecrets.org/api/?method=candIndustry&cid=N00000019&cycle=2006&apikey=b2f04b41bc14f3ba04c32a3959bcddeb"
	var senObj;
	
	getCrossDomainJson(getUrl, function(data) {
		createCard(data, senId);
	});
}

//2010
//H8NM01174

addSenatorsToSideBar();

function getArrayLength(senator) {
	var arrLength = senator.query.results.response.contributors.contributor.length;
	if(arrLength > 10){
		arrLength = 20;
	}
	return arrLength;
}
var drawn = false;
function updateGraph(idName, senator, senatorID){
		var arrLength = getArrayLength(senator);
		var totals = new Array(arrLength);
		var organizations = new Array(arrLength);
		var contributors = senator.query.results.response.contributors.contributor;
		for(var i = 0; i < arrLength; i++) {
			totals[i] = parseFloat(contributors[i].total);
			organizations[i] = contributors[i].org_name;
		}
		console.log("hello");
		drawBarGraph("cardChart", idName, "sc" + senatorID, totals, organizations, 5, 340, 200);
}

$("#cardList").sortable();
$("#cardList").disableSelection();

function addSenator(item) {
	createCard();
}

function getSenatorName(senatorString) {
	return senatorString.substr(0, senatorString.length - 4);
}

function getSenatorParty(senatorString) {
	if(senatorString.indexOf("(R)") > -1){
		return "Republican";
	}else if (senatorString.indexOf("(D)") > -1){
		return "Democrat";
	}else if(senatorString.indexOf("(I)") > -1){
		return "Independent"
	}
	
	return "";
}



function remove(item) {
   $("#sen" + $(item).attr("id")).remove();
}

function removeBig(item) {
	console.log("hey");
	$("#big" + $(item).attr("id").substring(2)).remove();
}

function toggleBigCard(item) {
	var id = $(item).attr("id");
	var senator = sen3;
	var arrLength = getArrayLength(senator);

	var totals = new Array(arrLength);
	var organizations = new Array(arrLength);

	for(var i = 0; i < arrLength; i++) {
		totals[i] = parseFloat(senator.records[i].totals);
		organizations[i] = senator.records[i].organization;
	}
	console.log("bc" + id.substring(2));
	redraw("bc" + id.substring(2), totals, organizations);
}


function toggleCard(item) {
	var id = $(item).attr("id");
	var senator = sen3;
	var arrLength = getArrayLength(senator);

	var totals = new Array(arrLength);
	var organizations = new Array(arrLength);

	for(var i = 0; i < arrLength; i++) {
		totals[i] = parseFloat(senator.records[i].totals);
		organizations[i] = senator.records[i].organization;
	}
	console.log("sc" + id.substring(2));
	redraw("sc" + id.substring(2), totals, organizations);
}

getWikiXDomain('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDaniel_Akaka%22%0A&format=json&diagnostics=true', function(data) {
	console.log("shit");
	console.log(data);
});

function viewMore(item) {
	var id = $(item).attr("id");
	
	var senator = senators[id];
	var senatorID = id;
	console.log(senator);
	var senatorString = senator.query.results.response.contributors.cand_name;
	var senatorName = getSenatorName(senatorString);
	var senatorParty = getSenatorParty(senatorString);
	var arrLength = getArrayLength(senator);
	
	var totals = new Array(arrLength);
	var organizations = new Array(arrLength);
	
	console.log(senator);
	for(var i = 0; i < arrLength; i++) {
		totals[i] = parseFloat(senator.query.results.response.contributors.contributor[i].total);
		organizations[i] = senator.query.results.response.contributors.contributor[i].org_name;
	}
	
	$("<div class=\"bigView\" id=\"big" + id + "\"><div class=\"senName Big\">" + senatorName + "</div> <input type=\"button\" class=\"removeBig\" onClick=\"removeBig(this)\" value=\"heyyyyy\" id=\"bv" + id + "\">" + "<input type=\"button\" class=\"toggleBigCard\" onClick=\"toggleBigCard(this)\" value=\"toggleBig\" id=\"tb" + senatorID + "\">" + "</div>").appendTo("body");
	drawBarGraph("bigChart", "big" + senatorID, "bc" + senatorID , totals, organizations, 10 , 500, 400);
}

var count = 0;

function getWikiXDomain(url, callback) {
	$.ajax({
      url: url,
      data: {
          q: 'select * from xml where url="' + url + '"',
          format: "json"
      },
      dataType: "jsonp",
      success: callback
  });
}


function getCrossDomainJson(url, callback) {
    $.ajax({
        url: "http://query.yahooapis.com/v1/public/yql?callback=?",
        data: {
            q: 'select * from xml where url="' + url + '"',
            format: "json"
        },
        dataType: "jsonp",
        success: callback
    });
}

function createCard(senObj, senID){
	
	var senator = senObj;
	senators[senID] = senator;
	var senatorID = senID;
	console.log(senator);
	var senatorString = senator.query.results.response.contributors.cand_name;
	var senatorName = getSenatorName(senatorString);
	var senatorParty = getSenatorParty(senatorString);
	
	$("<li id=\"sen" + count + "\" class=\"cardList\"><div class=\"senName\">" + senatorName + "</div> <div class=\"" + senatorParty + "\">" + senatorParty + "</div> <input type=\"button\" class=\"remove\" onClick=\"remove(this)\" value=\"x\" id=\"" + count + "\">" + "<input type=\"button\" class=\"viewMore\" onClick=\"viewMore(this)\" value=\"view more\" id=\""  + senatorID + "\">" + "<input type=\"button\" class=\"toggleCard\" onClick=\"toggleCard(this)\" value=\"toggleBig\" id=\"ts" + senatorID + "\">" + "</li>").appendTo("#cardList");
	updateGraph("sen"+count, senator, senatorID);
	
	count++;
}

console.log(senatorsObj);
