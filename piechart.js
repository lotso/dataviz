var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;
function drawPieChart(className, bigID, chartID, data, labels, numItems, width, height)
{
//    data = data.splice(0, numItems);
 //   labels = labels.splice(0, numItems);
    data = [20, 10, 15, 30, 25];
    labels = ["Aasdf", "asB", "C", "D", "E"];
    data = [{"label":"one", "value":20}, 
            {"label":"two", "value":50}, 
            {"label":"three", "value":50}];
    
    var r = 100;
    var color = d3.scale.category20c();

    if(width) chartWidth = width;
    if(height) chartHeight = height;
    barWidth = chartHeight/(data.length*1.2);
		
    chart = d3.select("body")
        .append("svg:svg")
            .data([data])
            .attr("id", chartID)
            .attr("class",className)
            .attr("width",chartWidth)
            .attr("height",chartHeight)
            .append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
            
    var arc = d3.svg.arc().outerRadius(r);
    var pie = d3.layout.pie()
        .value(function(d) {return d.value; });
    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter().append("svg:g").attr("class", "slice");
        
    arcs.append("svg:path")
        .attr("fill", function(d,i) {return color(i); })
        .attr("d", arc);
        
    arcs.append("svg:text")
        .attr("transform", function(d)
            {
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";
            })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return data[i].label; });
}

//function drawBig(
