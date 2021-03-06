var chart, x, y;
var chartWidth = 800;
var chartHeight = 600;
var barWidth = 25;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

function drawPieChart(className, bigID, chartID, rawJson, width, height)
{
    //Pass data as the top level arrays in the large JSon shit I sent
    //IE, pass "ALLJSON.Finance" as rawJson
    
    var arrLength = rawJson.length;
    var data = new Array(2);
    var dictDems = {"label":"Democrats", "value":0};
    var dictReps = {"label":"Republicans", "value":0};
    
    for(var i = 0; i < arrLength; i++)
    {
        dictDems.value += rawJson[i].democrat;
        dictReps.value += rawJson[i].republican;
    }
    
    data[0] = dictDems;
    data[1] = dictReps;
    
    var r = 100;
    var color = d3.scale.category20c();

    if(width) chartWidth = width;
    if(height) chartHeight = height;
    barWidth = chartHeight/(data.length*1.2);
		
    chart = d3.select("#" + bigID) 
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
        .attr("fill", function(d,i) {if(i == 0) return "#3D6AFF"; else return "#FC6060";})
        .attr("d", arc);
        
    arcs.append("svg:text")
        .attr("fill", "white")
        .attr("transform", function(d)
            {
                d.innerRadius = 0;
                d.outerRadius = r;
                var center = arc.centroid(d);
                var x = center[0];
                var y = center[1]-6;
                return "translate(" + x+","+ y + ")";
            })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return data[i].label;})
        
    arcs.append("svg:text")
        .attr("fill", "white")
        .attr("transform", function(d)
            {
                d.innerRadius = 0;
                d.outerRadius = r;
                var center = arc.centroid(d);
                var x = center[0];
                var y = center[1]+6;
                return "translate(" + x + "," + y + ")";
            })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return "$" + numberWithCommas(data[i].value);})
}

//function drawBig(
