var senators = new Array();

function addSenatorsToSideBar() {
	for(var i = 0; i < senatorsObj.Senators.length; i++){
		$("#senatorsList").append("<li onClick=\"addCard(this)\" class=\"senatorBar\" id=\"sl" + senatorsObj.Senators[i].ID + "\">" + senatorsObj.Senators[i].Name + "</li>");
	}
}

function addFinanceCard(item) {
	
	
	
	if($(item).attr("id") == "ciFinance") {
		console.log("finance");
		$("<li id=\"finance\" class=\"cardList\"><div class=\"indName\">Finance Industry</div> <input type=\"button\" class=\"remove\" onClick=\"remove(this)\" value=\"x\" id=\"remFinance\">" + "<input type=\"button\" class=\"viewMore\" onClick=\"viewMore(this)\" value=\"view more\" id=\"vFinance\">" + "</li>").appendTo("#cardList");
		//updateGraph("sen"+ senID, senator, senatorID);
		drawPieChart("cardChart", finance, "scFinance", financeData.Finance, 355, 200);
	}else if ($(item).attr("id") == "ciHealth") {
		console.log("health");
	}else if ($(item).attr("id") == "ciLawyersLobbyists") {
		console.log("lawyers");
	}else if ($(item).attr("id") == "ciOther") {
		console.log("other");
	}
}

function addIndustriesToSideBar() {
	console.log(financeData);
	$("#senatorsList").append("<li onClick=\"addFinanceCard(this)\" class=\"senatorBar\" id=\"ciFinance\">Finance Industry</li>");
	$("#senatorsList").append("<li onClick=\"addFinanceCard(this)\" class=\"senatorBar\" id=\"ciHealth\">Health Industry</li>");
	$("#senatorsList").append("<li onClick=\"addFinanceCard(this)\" class=\"senatorBar\" id=\"ciLawyersLobbyists\">Lawyers/Lobbyists Industry</li>");
	$("#senatorsList").append("<li onClick=\"addFinanceCard(this)\" class=\"senatorBar\" id=\"ciOther\">Other Industries</li>");
}

function createCandContribUrl(senId) {
	var url = "http://www.opensecrets.org/api/?method=candContrib&cid=" + senId + "&cycle=2010&apikey=1f034a0ada9447c9f2139a3be4514cf9";
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

addIndustriesToSideBar();

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
		drawBarGraph("cardChart", idName, "sc" + senatorID, totals, organizations, 5, 355, 200);
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
   $("#sen" + $(item).attr("id").substring(3)).remove();
	$("#sl" + $(item).attr("id").substring(3)).removeClass();
	$("#sl" + $(item).attr("id").substring(3)).addClass("senatorBar");
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

function viewLess(item) {
	// console.log(item);
	// var id = $(item).attr("id");
	id = $(item).attr("id");
	var senator = senators[id];
	var senatorID = id;
	$("#sc" + senatorID).remove();
	
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
	console.log("bitch tits");
	console.log("#sc" + senatorID);
	
	$("#sc" + senatorID).remove();
	
	console.log("attempt");
	drawBarGraph("cardChart", "sen" + senatorID, "sc" + senatorID, totals, organizations, 5, 355, 200);
	$("#" + senatorID).click(function(){
		console.log("why");
		viewMore(this);
	});
	
	$("#" + senatorID).removeClass("textExpanded");
	$("#sen" + senatorID).removeClass("Expanded");
	$("#" + senatorID).fadeOut('fast', function(){
		$("#" + senatorID).val("view more");
		$("#" + senatorID).fadeIn('fast', function(){
			//$("#" + senatorID).val("view less");
		});
	});

	//console.log(item);
}

function viewMore(item) {
	var id = $(item).attr("id");
	
	console.log(id);
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
	var openSecretsUrl = "http://www.opensecrets.org/politicians/summary.php?cid=" + senatorID + "&cycle=2010";
	//$("<div class=\"bigView\" id=\"big" + id + "\"><div class=\"nameContainer\"><div class=\"senName Big\">" + senatorName + "</div> <div class=\"" + senatorParty + " Medium\">" + senatorParty + "</div> <a class=\"openSecretsLink\" target=\"_blank\" href=\"" + openSecretsUrl + "\"> View More from OpenSecrets.org </a> </div>" +  "<input type=\"button\" class=\"removeBig\" onClick=\"removeBig(this)\" value=\"X\" id=\"bv" + id + "\">" + "<input type=\"button\" class=\"toggleBigCard\" onClick=\"toggleBigCard(this)\" value=\"toggleBig\" id=\"tb" + senatorID + "\">" + "</div>").appendTo("body");
	
	$("#sen" + senatorID).addClass("Expanded");
	$("#sc" + senatorID).remove();
	$("#" + senatorID).addClass("textExpanded");

	$("#" + senatorID).fadeOut('fast', function(){
		$("#" + senatorID).val("view less");
		$("#" + senatorID).fadeIn('fast', function(){
			//$("#" + senatorID).val("view less");
		});
	});

	
	//$( "#" + senatorID ).bind( "click", viewLess )
	// $("#" + senatorID).click(function() {
	// 	viewLess(this);
	// });
	drawBarGraph("cardChart", "sen" + senatorID, "sc" + senatorID, totals, organizations, 10, 355, 400);
	//drawBarGraph("bigChart", "sen" + senatorID, "bc" + senatorID , totals, organizations, 10 , 500, 400);

	$("#" + senatorID).removeAttr("onclick", null);
	$("#" + senatorID).click(function(){
		console.log("why");
		viewLess(this);
	});
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


function viewByIndustry(item) {
	var senatorID = $(item).attr("id").substring(2);
	console.log(iN00007653);
	var labels = new Array();
	var totals = new Array();
	$("#sv" + senatorID).text("View By Employer");
	for(var i = 0; i < 10; i++) {
		labels[i] = iN00007653.records[i].indus;
		totals[i] = parseFloat(iN00007653.records[i].totals);
		
	}
	redraw("sc" + senatorID, totals, labels);
}

function createCard(senObj, senID){
	
	var senator = senObj;
	senators[senID] = senator;
	var senatorID = senID;
	console.log(senator);
	var senatorString = senator.query.results.response.contributors.cand_name;
	var senatorName = getSenatorName(senatorString);
	var senatorParty = getSenatorParty(senatorString);
	$("#sl" + senatorID).addClass("selected" + senatorParty);
	$("<li id=\"sen" + senID + "\" class=\"cardList\"><div class=\"senName\">" + senatorName + "</div> <div class=\"" + senatorParty + "\">" + senatorParty + "</div> <div class=\"otherView\" id=\"sv" + senatorID + "\">View By Industry</div> <input type=\"button\" class=\"remove\" onClick=\"remove(this)\" value=\"x\" id=\"rem" + senatorID + "\">" + "<input type=\"button\" class=\"viewMore\" onClick=\"viewMore(this)\" value=\"view more\" id=\""  + senatorID + "\">" + "<input type=\"button\" class=\"toggleCard\" onClick=\"toggleCard(this)\" value=\"toggleBig\" id=\"ts" + senatorID + "\">" + "</li>").appendTo("#cardList");
	$("#sv" + senatorID).click(function(){
		viewByIndustry(this);
	});
	
	updateGraph("sen"+ senID, senator, senatorID);
}

console.log(senatorsObj);
