var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

function drawStackedBarGraph(className, bigID, chartID, rawJson, width, height)
{
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
        chartHeight += 40;
    }

		
    chart = d3.select("#" + bigID)
        .append("svg:svg")
            .attr("id", chartID)
            .attr("class",className)
            .attr("width",chartWidth)
            .attr("height",chartHeight)
            
    xT = d3.scale.linear()
        .domain([0, d3.max(totals)])
        .range([4,chartWidth - 100]);
    xD = d3.scale.linear()
        .domain([0, d3.max(dems)])
        .range([4,(chartWidth - 100) * d3.max(dems)/d3.max(totals)]);
    xR = d3.scale.linear()
        .domain([0, d3.max(repubs)])
        .range([4,(chartWidth - 100) * d3.max(repubs)/d3.max(totals)]);
    y = d3.scale.ordinal()
        .domain(totals)
        .rangeBands([0, barWidth*totals.length]);
    
    if(bigView)
    {
    chart.selectAll("line")
        .data(xT.ticks(10)).enter().append("svg:line")
            .attr("x1", xT)
            .attr("x2", xT)
            .attr("y1", 0)
            .attr("y2", chartHeight-38)
            .attr("stroke", "#eee");
    chart.selectAll("text.rule")
        .data(xT.ticks(10)).enter().append("svg:text")
            .attr("class", "rule")
            .attr("x", xT)
            .attr("y", chartHeight-24)
            .attr("dy", -3)
            .attr("text-anchor", "middle")
            .text(function(v)
            {
                return "$" + numberWithCommas(v);
            });
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
            .attr("class", "stackDem")
            .attr("x",4)
            .attr("y", function(d,i) {return i*barWidth*1.2;})
            .attr("width",xD)
            .attr("height",barWidth);
            
        chart.selectAll("rectR").data(repubs).enter()
        .append("svg:rect")
            .attr("class", "stackRep")
            .attr("x", function(d,i)
                {return 4 + dems[i]/d3.max(dems) * ((chartWidth - 100) * d3.max(dems)/d3.max(totals));})
            .attr("y", function(d,i) {return i*barWidth*1.2;})
            .attr("width",xR)
            .attr("height",barWidth);
          //  */
    }
            
    if(0) //Aggregate
    {
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
        chart.selectAll("text.nameLabels").data(totals).enter()
        .append("svg:text")
            //.attr("class", "nameLabels")
            .attr("fill", "black")
            .attr("x", function(d, i) {return xD(dems[i]) + xR(repubs[i]);})
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2; })
            .attr("dx", 5)
            .attr("dy", ".5em")
            .attr("text-anchor", "start")
            .text(function(d,i)
            {
                return labels[i];
            });
            
        chart.selectAll("text.valueLabels").data(dems).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", function(d, i) {return xD(dems[i])/2;})
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2})
            .attr("dx", 0)
            .attr("dy", ".48em")
            .attr("text-anchor", "middle")
            .text(function(v)
            {
                if(v == 0) return "";
                return "$" + numberWithCommas(v);
            });
            
        chart.selectAll("text.valueLabelsR").data(repubs).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", function(d, i) {return xD(dems[i]) + xR(repubs[i])/2;})
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2})
            .attr("dx", 0)
            .attr("dy", ".48em")
            .attr("text-anchor", "middle")
            .text(function(v)
            {
                if(v == 0) return "";
                return "$" + numberWithCommas(v);
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
