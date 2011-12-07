var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;
function drawBarGraph(subjectName, idName, data, labels, numItems, width, height)
{
    data = data.splice(0, numItems);
    labels = labels.splice(0, numItems);
    // data = [24, 13, 22, 10, 5];
    // labels = ["Aasdf", "asB", "C", "D", "E"];

    if(width) chartWidth = width;
    if(height) chartHeight = height;
    barWidth = chartHeight/(data.length*1.3);
    
    var padding = chartHeight - (barWidth * data.length);
    padding /= (data.length*2);
    
    var bigView = (height > 400);
    if(bigView)
    {
        padding = 0;
        //chartHeight += 60;
    }

		
    chart = d3.select("#" + idName)
        .append("svg:svg")
            .attr("class","chart")
            .attr("width",chartWidth)
            .attr("height",chartHeight)
        .append("svg:g")
            .attr("transform", "translate(10,15)");
            
    x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0,chartWidth - 20]);
    y = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, barWidth*data.length]);
    
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
    
    chart.selectAll("rect").data(data).enter()
        .append("svg:rect")
            .attr("y", function(d,i) {return i*barWidth*1.2 + padding;})
            .attr("width",x)
            .attr("height",barWidth);
            
    chart.selectAll("text.nameLabels").data(data).enter()
        .append("svg:text")
            .attr("class", "nameLabels")
            .attr("x", 3)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2+padding/2; })
            .attr("dx", 0)
            .attr("dy", ".5em")
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
            
    chart.selectAll("text.valueLabels").data(data).enter()
        .append("svg:text")
            .attr("class", "valueLabels")
            .attr("x", x)
            .attr("y", function(d, i) {return i*barWidth*1.2 + barWidth/2+padding/2; })
            .attr("dx", -3)
            .attr("dy", ".5em")
            .attr("text-anchor", "end")
            .text(function(v)
            {
                return "$" + Math.floor(v/100);
            });

    var lineHeight = chartHeight;
    if(bigView) lineHeight -= 38;
    chart.append("svg:line")
        .attr("y1", 0)
        .attr("y2", lineHeight)
        .attr("stroke", "#000");
}

function redraw(data, labels)
{
    x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0,chartWidth - 20]);
            
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
