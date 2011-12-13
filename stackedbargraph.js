var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;
function drawStackedBarGraph(className, bigID, chartID, rawJson, width, height)
{
    rawJson = [
	{ "name":"Harvard University", "democrat":453933, "republican":61900, "total":515834 },
	{ "name":"Stanford University", "democrat":282906, "republican":53886, "total":336793 },
	{ "name":"John Templeton Foundation", "democrat":0, "republican":36960, "total":336000 },
	{ "name":"US Government", "democrat":130229, "republican":162787, "total":295977 },
	{ "name":"National Community Action Foundation", "democrat":213339, "republican":51309, "total":270050 },
	{ "name":"Dodge Jones Foundation", "democrat":0, "republican":118098, "total":218700 },
	{ "name":"University of California", "democrat":202207, "republican":12906, "total":215114 },
	{ "name":"US Dept of State", "democrat":198980, "republican":14976, "total":213957 },
	{ "name":"Colombia University", "democrat":179736, "republican":13528, "total":193265 },
	{ "name":"US Senate", "democrat":171874, "republican":19097, "total":190972 },
	{ "name":"University of Pennsylvania", "democrat":145849, "republican":4557, "total":151927 },
	{ "name":"Apollo Group", "democrat":63227, "republican":87313, "total":150541 },
	{ "name":"Full Sail", "democrat":42563, "republican":49428, "total":137300 },
	{ "name":"University of Texas", "democrat":105294, "republican":14358, "total":119653 },
	{ "name":"City University of New York", "democrat":105069, "republican":6706, "total":111776 },
	{ "name":"Bridgepoint Education", "democrat":40963, "republican":69748, "total":110712 },
	{ "name":"Yale University", "democrat":107158, "republican":1082, "total":108241 },
	{ "name":"US Army", "democrat":33803, "republican":70776, "total":105636 },
	{ "name":"City of Los Angeles", "democrat":93130, "republican":5944, "total":99075 },
	{ "name":"State of Texas", "democrat":22353, "republican":74834, "total":97188 }
  ];
  
    var arrLength = rawJson.length;
    var dems = new Array(arrLength);
    var repubs = new Array(arrLength);
    var totals = new Array(arrLength);
    var labels = new Array(arrLength);
    
    for(var i = 0; i < arrLength; i++)
    {
        dems[i] = rawJson[i].democrat;
        repubs[i] = rawJson[i].republican;
        totals[i] = rawJson[i].total;
        labels[i] = rawJson[i].name;
    }
    
    if(width) chartWidth = width;
    if(height) chartHeight = height;
    barWidth = chartHeight/(totals.length*1.2);
    
    var padding = chartHeight - (barWidth * totals.length);
    padding /= (totals.length*2);
    
    var bigView = (height > 400);
    if(bigView)
    {
        padding = 0;
        //chartHeight += 60;
    }

		
    chart = d3.select("#" + bigID)
        .append("svg:svg")
            .attr("id", chartID)
            .attr("class",className)
            .attr("width",chartWidth)
            .attr("height",chartHeight)
            
    xT = d3.scale.linear()
        .domain([0, d3.max(totals)])
        .range([4,chartWidth - 16]);
    xD = d3.scale.linear()
        .domain([0, d3.max(dems)])
        .range([4,(chartWidth - 16) * d3.max(dems)/d3.max(totals)]);
    xR = d3.scale.linear()
        .domain([0, d3.max(repubs)])
        .range([4,(chartWidth - 16) * d3.max(repubs)/d3.max(totals)]);
    y = d3.scale.ordinal()
        .domain(totals)
        .rangeBands([0, barWidth*totals.length]);
    
    if(bigView)
    {
    chart.selectAll("line")
        .data(x.ticks(10)).enter().append("svg:line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", chartHeight-38)
            .attr("stroke", "#ccc");
    chart.selectAll("text.rule")
        .data(x.ticks(10)).enter().append("svg:text")
            .attr("class", "rule")
            .attr("x", x)
            .attr("y", chartHeight-24)
            .attr("dy", -3)
            .attr("text-anchor", "middle")
            .text(String);
    }
    
    if(0) //Aggregate
    {
        chart.selectAll("rect").data(totals).enter()
        .append("svg:rect")
            .attr("x",4)
            .attr("y", function(d,i) {return i*barWidth*1.2;})
            .attr("width",xT)
            .attr("height",barWidth);
    }
    else //Stacked
    {
        chart.selectAll("rectD").data(dems).enter()
        .append("svg:rect")
            .attr("x",4)
            .attr("y", function(d,i) {return i*barWidth*1.2;})
            .attr("width",xD)
            .attr("height",barWidth);
            
        chart.selectAll("rectR").data(repubs).enter()
        .append("svg:rect")
            .attr("x", function(d,i)
                {return 4 + dems[i]/d3.max(dems) * ((chartWidth - 16) * d3.max(dems)/d3.max(totals));})
            .attr("y", function(d,i) {return i*barWidth*1.2;})
            .attr("width",xR)
            .attr("height",barWidth);
          //  */
    }
            
    if(0) //Aggregate
    {
    /*
    chart.selectAll("text.nameLabels").data(totals).enter()
        .append("svg:text")
            .attr("class", "nameLabels")
            .attr("x", 8)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2; })
            .attr("dx", 0)
            .attr("dy", ".5em")
            .text(function(d,i)
            {
                return labels[i];
            });
    */
            
    chart.selectAll("text.valueLabels").data(totals).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", x)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2})
            .attr("dx", -3)
            .attr("dy", ".48em")
            .attr("text-anchor", "end")
            .text(function(v)
            {
                return "$" + Math.floor(v/100);
            });
    }
    else
    {
        chart.selectAll("text.nameLabels").data(dems).enter()
        .append("svg:text")
            .attr("class", "nameLabels")
            .attr("x", 8)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2; })
            .attr("dx", 0)
            .attr("dy", ".5em")
            .text(function(d,i)
            {
                return labels[i];
            });
            
        chart.selectAll("text.valueLabels").data(dems).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", xD)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2})
            .attr("dx", -3)
            .attr("dy", ".48em")
            .attr("text-anchor", "end")
            .text(function(v)
            {
                return "$" + Math.floor(v/100);
            });
            
        chart.selectAll("text.valueLabelsR").data(repubs).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", function(d, i) {return xD(dems[i]) + xR(repubs[i]);})
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2})
            .attr("dx", -3)
            .attr("dy", ".48em")
            .attr("text-anchor", "end")
            .text(function(v)
            {
                return "$" + Math.floor(v/100);
            });
            
 //           */
    }

    var lineHeight = (arrLength-1)*barWidth*1.2+barWidth;
//    if(bigView) lineHeight -= ;
    chart.append("svg:line")
        .attr("x1", 4)
        .attr("x2", 4)
        .attr("y1", 0)
        .attr("y2", lineHeight)
        .attr("stroke", "#000");
}
