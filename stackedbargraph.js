var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;
function drawStackedBarGraph(className, bigID, chartID, dems, repubs, totals, labelsD, labelsR, numItems, width, height)
{
    dems = dems.splice(0, numItems);
    repubs = repubs.splice(0, numItems);
    totals = totals.splice(0, numItems);
    labelsD = labelsD.splice(0, numItems);
    labelsR = labelsR.splice(0, numItems);
    // data = [24, 13, 22, 10, 5];
    // labels = ["Aasdf", "asB", "C", "D", "E"];

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
                return labelsD[i];
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
            
        chart.selectAll("text.nameLabelsR").data(repubs).enter()
        .append("svg:text")
            .attr("class", "nameLabels")
            .attr("x", function(d,i)
                {return 4 + dems[i]/d3.max(dems) * ((chartWidth - 16) * d3.max(dems)/d3.max(totals));})
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2; })
            .attr("dx", 5)
            .attr("dy", ".5em")
            .text(function(d,i)
            {
                return labelsR[i];
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

    var lineHeight = (numItems-1)*barWidth*1.2+barWidth;
//    if(bigView) lineHeight -= ;
    chart.append("svg:line")
        .attr("x1", 4)
        .attr("x2", 4)
        .attr("y1", 0)
        .attr("y2", lineHeight)
        .attr("stroke", "#000");
}

function redraw(idName, data, labels)
{    
    chart = d3.select("#" + idName);
    x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([4,chartWidth - 16]);
            
    chart.selectAll("rect")
        .data(data).transition()
        .duration(1000)
        .attr("width", x);
    
    chart.selectAll("text.nameLabels")
        .data(data).transition()
        .duration(1000)
        .text(function(v)
        {
            var i = 0;
                for(i=0;i<data.length;i++)
                {
                    if(v == data[i])
                        return labels[i];
                }
                return "";
        });
        
    chart.selectAll("text.valueLabels")
        .data(data).transition()
        .duration(1000)
        .attr("x", x)
        .text(function(v)
        {
            return "$" + Math.floor(v/100);
        });
}

//function drawBig(
