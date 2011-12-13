var senators = new Array();

function addSenatorsToSideBar() {
	for(var i = 0; i < senatorsObj.Senators.length; i++){
		$("#senatorsList").append("<li onClick=\"addCard(this)\" class=\"senatorBar\" id=\"sl" + senatorsObj.Senators[i].ID + "\">" + senatorsObj.Senators[i].Name + "</li>");
	}
}


function addCard(item) {
	console.log(item);
}

addSenatorsToSideBar();

function getArrayLength(senator) {
	var arrLength = senator.records.length;

	if(arrLength > 20){
		arrLength = 20;
	}
	
	return arrLength;
}
var drawn = false;
function updateGraph(idName, senator, senatorID){


		var arrLength = getArrayLength(senator);

		var totals = new Array(arrLength);
		var organizations = new Array(arrLength);

		for(var i = 0; i < arrLength; i++) {
			totals[i] = parseFloat(senator.records[i].totals);
			organizations[i] = senator.records[i].organization;
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

function getSenator() {
	var senatorName = $("#senators").val();
	var senator;
		if(senatorName == "sen1") {
			console.log("s1");
			senator = sen1;
		}else if(senatorName == "sen2") {
			console.log("s2");
			senator = sen2;
		}else if(senatorName == "sen3") {
			console.log("s3");
			senator = sen3;
		}else if(senatorName == "sen3") {
			console.log("s3");
			senator = sen3;
		}else if(senatorName == "sen4") {
			senator = sen4;
		}else if(senatorName == "sen5") {
			senator = sen5;
		}else if(senatorName == "sen6") {
			senator = sen6;
		}else if(senatorName == "sen7") {
			senator = sen7;
		}else if(senatorName == "sen8") {
			senator = sen8;
		}else if(senatorName == "sen9") {
			senator = sen9;
		}else if(senatorName == "sen10") {
			senator = sen10;
		}else if(senatorName == "sen11") {
			senator = sen11;
		}
		senators[senator.records[0].ID] = senator;
		return senator;
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


function viewMore(item) {
	var id = $(item).attr("id");
	
	var senator = senators[id];
	var senatorID = senator.records[0].ID;
	var senatorString = senator.records[0].crpname;
	
	var senatorName = getSenatorName(senatorString);
	var senatorParty = getSenatorParty(senatorString);
	var senator = senators[id];
	var arrLength = getArrayLength(senator);
	
	var totals = new Array(arrLength);
	var organizations = new Array(arrLength);
	
	for(var i = 0; i < arrLength; i++) {
		totals[i] = parseFloat(senator.records[i].totals);
		organizations[i] = senator.records[i].organization;
	}
	
	$("<div class=\"bigView\" id=\"big" + id + "\"><div class=\"senName Big\">" + senatorName + "</div> <input type=\"button\" class=\"removeBig\" onClick=\"removeBig(this)\" value=\"heyyyyy\" id=\"bv" + id + "\">" + "<input type=\"button\" class=\"toggleBigCard\" onClick=\"toggleBigCard(this)\" value=\"toggleBig\" id=\"tb" + senatorID + "\">" + "</div>").appendTo("body");
	drawBarGraph("bigChart", "big" + senatorID, "bc" + senatorID , totals, organizations, 10 , 500, 400);
}

var count = 0;

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

function createCard(){
	
	var senator = getSenator();
	var senatorID = senator.records[0].ID;
	var senatorString = senator.records[0].crpname;
	
	var senatorName = getSenatorName(senatorString);
	var senatorParty = getSenatorParty(senatorString);
	
	$("<li id=\"sen" + count + "\" class=\"cardList\"><div class=\"senName\">" + senatorName + "</div> <div class=\"" + senatorParty + "\">" + senatorParty + "</div> <input type=\"button\" class=\"remove\" onClick=\"remove(this)\" value=\"x\" id=\"" + count + "\">" + "<input type=\"button\" class=\"viewMore\" onClick=\"viewMore(this)\" value=\"view more\" id=\""  + senatorID + "\">" + "<input type=\"button\" class=\"toggleCard\" onClick=\"toggleCard(this)\" value=\"toggleBig\" id=\"ts" + senatorID + "\">" + "</li>").appendTo("#cardList");
	updateGraph("sen"+count, senator, senatorID);
	
	count++;
}

console.log(senatorsObj);
