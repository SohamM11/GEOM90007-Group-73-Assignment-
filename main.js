var width = document.getElementById("id_genderPie").clientWidth,
    height = document.getElementById("id_genderPie").clientHeight,
    barWidth = 30;

var data = jsonData;
var processedData = [];

//Data preprocessing to get the data in single object to be used in all the charts.
var pieProcessing = function (s) {
    processedData = [];
    for (const iterator of d3.map(data, function (k) { return k.geography; }).entries()) {
        var obj = {},
            o = {};
        var count = 0;
        var temp = [];
        //Getting the City of Melbourne data in the object for the first render
        if (!processedData.find(({ suburb }) => suburb === iterator[1]) && iterator[1] != 'Greater Melbourne') {
            if (s === "All") {
                obj['suburb'] = iterator[1];
                var tenYearGroup = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Age - 10 year groups')
                });
                var eduLevel = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Non-school qualification: level of education - detailed' && !(k.sub_category.includes('nfd') || k.sub_category.includes('inadequately described') || k.sub_category.includes('not stated')))
                });
                var hhGroup = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Household composition - detailed')
                });
                var incomeGroup = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Household income - overview' && !(k.sub_category.includes('stated')))
                });
                var genderGroup = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Gender')
                });
                var migrationGroup = data.filter(function (k) {
                    return (k.geography === iterator[1] && k.category === 'Country of birth - detailed')
                });
                for (const i of tenYearGroup) {
                    o = {};
                    o['sub_category'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                    count += parseFloat(i.value);
                }
                obj['grpCount'] = temp;
                temp = [];
                for (const i of eduLevel) {
                    o = {};
                    o['edu_level'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                }
                obj['eduLevel'] = temp;
                temp = [];
                for (const i of hhGroup) {
                    o = {};
                    o['hh_comp'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                }
                obj['hhComp'] = temp;
                temp = [];
                for (const i of incomeGroup) {
                    o = {};
                    o['income_group'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                }
                obj['incomeGroup'] = temp;
                temp = [];
                for (const i of genderGroup) {
                    o = {};
                    o['gender'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                }
                obj['gender'] = temp;
                temp = [];
                for (const i of migrationGroup) {
                    o = {};
                    o['country'] = i.sub_category;
                    o['count'] = i.value;
                    temp.push(o);
                }
                obj['migration'] = temp;
                obj['totalCount'] = count;
                processedData.push(obj);
            }
            //Getting the data of the specific suburbs in the object to enhance user interaction
            else {
                if (!processedData.find(({ suburb }) => suburb === s) && iterator[1] != 'Greater Melbourne') {
                    obj['suburb'] = s;
                    var tenYearGroup = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Age - 10 year groups')
                    });
                    var eduLevel = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Non-school qualification: level of education - detailed' && !(k.sub_category.includes('nfd') || k.sub_category.includes('inadequately described') || k.sub_category.includes('not stated')))
                    });
                    var hhGroup = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Household composition - detailed')
                    });
                    var incomeGroup = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Household income - overview' && !(k.sub_category.includes('stated')))
                    });
                    var genderGroup = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Gender')
                    });
                    var migrationGroup = data.filter(function (k) {
                        return (k.geography === s && k.category === 'Country of birth - detailed')
                    });
                    for (const i of tenYearGroup) {
                        o = {};
                        o['sub_category'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                        count += parseFloat(i.value);
                    }
                    obj['grpCount'] = temp;
                    temp = [];
                    for (const i of eduLevel) {
                        o = {};
                        o['edu_level'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                    }
                    obj['eduLevel'] = temp;
                    temp = [];
                    for (const i of hhGroup) {
                        o = {};
                        o['hh_comp'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                    }
                    obj['hhComp'] = temp;
                    temp = [];
                    for (const i of incomeGroup) {
                        o = {};
                        o['income_group'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                    }
                    obj['incomeGroup'] = temp;
                    temp = [];
                    for (const i of genderGroup) {
                        o = {};
                        o['gender'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                    }
                    obj['gender'] = temp;
                    temp = [];
                    for (const i of migrationGroup) {
                        o = {};
                        o['suburb'] = i.geography;
                        o['country'] = i.sub_category;
                        o['count'] = i.value;
                        temp.push(o);
                    }
                    obj['migration'] = temp;
                    obj['totalCount'] = count;
                    processedData.push(obj);
                }
            }
        }
    }
    return processedData;
}

//Suburb Pie Profile

var svgPie = d3.select("#id_genderPie")
            .append("svg")
            .attr("viewBox", [0, 0, width, height]);

var pieChart = svgPie.append("g")
                    .attr("transform", "translate(450,300) scale(1.2,1.2)");

var radius = Math.min(width, height) / 3 - 1;

var pie = d3.pie()
            .value(function(k) { if(k.suburb != 'City of Melbourne'){ return k.totalCount;}});

var arcLabel = d3.arc().innerRadius(Math.min(width, height) / 2 * 0.2).outerRadius(Math.min(width, height) / 2 * 0.8);

var piePath = pieChart.selectAll("path");

//Update function to be called everytime the Pie chart is rendered. Inline with the d3 design patterns
function updatePie(processData) {
    d3.selectAll("#piepath").remove();
    d3.selectAll("#pielabel").remove();
    var pieColor = d3.scaleOrdinal()
                    .domain(processData.map(function(k) { if(k.suburb != 'City of Melbourne'){ return  k.suburb;}}))
                    .range(["green", "blue", "red", "yellow", "violet", "orange", "indigo", "#32CD32", "#CC3399", "#6600FF", "#990000"]);
    var pieData = pie(processData);
    piePath.data(pieData)
        .join("path")
        .attr("id", "piepath")
        .attr("d", d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius))
        .attr('fill', k => pieColor(k.data.suburb))
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.6)
        //Mouse event to update the subsequent charts to allow user to drill down
        .on("click", function(e, k){
            updateAgeBarChart(pieProcessing(k.data.suburb)[0]);
            updateEduBarChart(pieProcessing(k.data.suburb)[0]);
            updateHHBarChart(pieProcessing(k.data.suburb)[0]);
            updateIncomeBarChart(pieProcessing(k.data.suburb)[0]);
            updateChoropleth(pieProcessing(k.data.suburb)[0]);
        })
        //Tooltip
        .on('mouseover', function (e, d) {
            let pos = d3.select(this).node().getBoundingClientRect();
            d3.select("#suburb").text(d.data.suburb);
            d3.select("#male").text(d.data.gender[0].count);
            d3.select("#female").text(d.data.gender[1].count);
            d3.select("#pieTooltip")
                .transition().duration(200)
                .style('left', (pos['x'] -150 ) + 'px')
                .style('top', (window.pageYOffset + pos['y'] - 10) + 'px')
                .style('opacity', 0.8);
        })
        .on('mousemove', function (e, d) {
            let pos = d3.select(this).node().getBoundingClientRect();
            d3.select("#suburb").text(d.data.suburb);
            d3.select("#male").text(d.data.gender[0].count);
            d3.select("#female").text(d.data.gender[1].count);
            d3.select("#pieTooltip")
                .transition().duration(200)
                .style('left', (pos['x'] - 150) + 'px')
                .style('top', (window.pageYOffset + pos['y'] - 10) + 'px')
                .style('opacity', 0.8);
        })
        .on('mouseout', function(e,d){
            d3.select("#pieTooltip").style('opacity', 0);
        });
}
updatePie(pieProcessing('All'));

//suburb Age Profile
//Static content to render the bar chart. Such as initialising axes and SVG
var curwidth = parseInt(d3.select("#id_ageGroup").style("width"), 10);
var svgBar = d3.select("#id_ageGroup")
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("preserveAspectRatio", "xMinYMin meet");

var barChart = svgBar.append("g")
                    .attr("transform", "translate(100, 0) scale(0.9,0.9)");

var xBar = barChart.append("g")
                .attr("transform", "translate(0," + height + ")");

var yBar = barChart.append("g");

barChart.append("text")
        .attr("class", "yAxisLabel")
        .attr("transform", "translate(0," + (height / 2) + ") rotate(-90)")
        .attr("dy", "-4.2em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Age Group");

var bar = barChart.selectAll("rect");
//Update function to be called everytime the Bar chart is rendered. Inline with the d3 design patterns
function updateAgeBarChart(d) {
    var x = d3.scaleLinear()
            .domain([0, d3.max(d.grpCount, k => k.count)])
            .range([0, width - 20]);
    var y = d3.scaleBand()
            .domain(d.grpCount.map(k => k.sub_category))
            .range([0, height])
            .padding(0.4);
    xBar.call(d3.axisBottom().scale(x));
    yBar.transition().duration(100).call(d3.axisLeft().scale(y));

    d3.selectAll('#ageGroupRect').remove();
    d3.selectAll('#ageGroupLabel').remove();

    bar.data(d.grpCount)
        .enter()
        .append("rect")
        .attr("id", "ageGroupRect")
        .transition()
        .attr("y", function(k) { return y(k.sub_category)})
        .attr("width", k=> x(k.count))
        .attr("height", barWidth)
        .attr("fill", function(k){ 
            if (k.count === d3.max(d.grpCount, u => u.count)){
                return "#990000";
            }
            else {
                return "#58a758";
            }
        });
    
    //display the actual value on the bar chart
    var text = bar.data(d.grpCount)
                .join("text")
                .attr("id", "ageGroupLabel")
                .attr("x", function(k) { return x(k.count) + 20;})
                .attr("y", function(k) {return y(k.sub_category) + 20;})
                .attr("dy", ".35em")
                .attr("font-size", "10px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(function (k) { return k.count; });

}
updateAgeBarChart(pieProcessing("City of Melbourne")[0]);


//suburb Education Profile
//Static content to render the bar chart. Such as initialising axes and SVG
var svgEduBar = d3.select("#id_eduGroup")
                .append("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("preserveAspectRatio", "xMinYMin meet");

var eduBarChart = svgEduBar.append("g")
                        .attr("transform", "translate(200,50) scale(0.8,0.8)");

var xBar = eduBarChart.append("g")
                    .attr("transform", "translate(0," + height + ")");

var yBar = eduBarChart.append("g");

eduBarChart.append("text")
        .attr("class", "yAxisLabel")
        .attr("transform", "translate(0," + (height / 2 - 100) + ") rotate(-90)")
        .attr("dy", "-12em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Highest Level of Education");

var eduBar = eduBarChart.selectAll("rect");

//Update function to be called everytime the Bar chart is rendered. Inline with the d3 design patterns
function updateEduBarChart(d) {
    var x = d3.scaleLinear()
            .domain([0, d3.max(d.eduLevel, k => k.count)])
            .range([0, width]);
    var y = d3.scaleBand()
            .domain(d.eduLevel.map(k => k.edu_level))
            .range([0, height])
            .padding(0.4);
    xBar.call(d3.axisBottom().scale(x));
    yBar.transition().duration(100).call(d3.axisLeft().scale(y));

    d3.selectAll('#eduGroupRect').remove();
    d3.selectAll('#eduGroupLabel').remove();

    eduBar.data(d.eduLevel)
        .enter()
        .append("rect")
        .attr("id", "eduGroupRect")
        .transition()
        .attr("y", function(k) { return y(k.edu_level)})
        .attr("width", k=> x(k.count))
        .attr("height", barWidth)
        .attr("fill", function(k){ 
            if (k.count === d3.max(d.eduLevel, u => u.count)){
                return "#990000";
            }
            else {
                return "#58a758";
            }
        });
    
    //display the actual value on the bar chart
    var text = eduBar.data(d.eduLevel)
                    .join("text")
                    .attr("id", "eduGroupLabel")
                    .attr("x", function(k) { return x(k.count) + 20;})
                    .attr("y", function(k) {return y(k.edu_level) + 20;})
                    .attr("dy", ".35em")
                    .attr("font-size", "10px")
                    .attr("font-weight", "bold")
                    .attr("fill", "black")
                    .attr("text-anchor", "middle")
                    .text(function (k) { return k.count; });
}
updateEduBarChart(pieProcessing("City of Melbourne")[0]);

//suburb household Profile
//Static content to render the bar chart. Such as initialising axes and SVG
var svgHHBar = d3.select("#id_hhGroup")
                .append("svg")
                .attr("viewbox", [0, 0, width, height])
                .attr("preserveAspectRatio", "xMinYMin meet");

var hhBarChart = svgHHBar.append("g")
                        .attr("transform", "translate(50,20) scale(0.8,0.8)");

var xBar = hhBarChart.append("g")
                    .attr("transform", "translate(0," + height + ")");

var yBar = hhBarChart.append("g");

hhBarChart.append("text")
        .attr("class", "yAxisLabel")
        .attr("transform", "translate(0," + (height / 2 - 90)  + ") rotate(-90)")
        .attr("dy", "-6em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Household Composition");

var hhBar = hhBarChart.selectAll("rect");

//Update function to be called everytime the Bar chart is rendered. Inline with the d3 design patterns
function updateHHBarChart(d) {
    //Setting the domain & range for x & y axis.
    var x = d3.scaleLinear()
            .domain([0, d3.max(d.hhComp, k => k.count)])
            .range([0, width]);
    var y = d3.scaleBand()
            .domain(d.hhComp.map(k => k.hh_comp))
            .range([0, height])
            .padding(0.4);
    xBar.call(d3.axisBottom().scale(x));
    yBar.transition().duration(100).call(d3.axisLeft().scale(y));

    d3.selectAll('#hhGroupRect').remove();
    d3.selectAll('#hhGroupLabel').remove();

    hhBar.data(d.hhComp)
        .enter()
        .append("rect")
        .attr("id", "hhGroupRect")
        .transition()
        .attr("y", function(k) { return y(k.hh_comp)})
        .attr("width", k=> x(k.count))
        .attr("height", barWidth)
        .attr("fill", function(k){ 
            if (k.count === d3.max(d.hhComp, u => u.count)){
                return "#990000"; 
            }
            else {
                return "#58a758";
            }
        });
    
    //display the actual value on the bar chart
    var text = hhBar.data(d.hhComp)
                .join("text")
                .attr("id", "hhGroupLabel")
                .attr("x", function(k) { return x(k.count) + 20;})
                .attr("y", function(k) {return y(k.hh_comp) + 20;})
                .attr("dy", ".35em")
                .attr("font-size", "10px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("text-anchor", "middle")
                .text(function (k) { return k.count; });
}
updateHHBarChart(pieProcessing("City of Melbourne")[0]);

//suburb income Profile
//Static content to render the bar chart. Such as initialising axes and SVG
var incomeWidth = document.getElementById("id_incomeGroup").clientWidth,
    incomeHeight = document.getElementById("id_incomeGroup").clientHeight;

var svgIncomeBar = d3.select("#id_incomeGroup")
                    .append("svg")
                    .attr("viewbox", [0, 0, incomeWidth, incomeHeight]);

var incomeBarChart = svgIncomeBar.append("g")
                                .attr("transform", "translate(100,50) scale(0.8,0.8)");

var xBar = incomeBarChart.append("g")
                        .attr("transform", "translate(0," + incomeHeight + ")");

var yBar = incomeBarChart.append("g");

incomeBarChart.append("text")
            .attr("class", "yAxisLabel")
            .attr("transform", "translate(0," + (incomeHeight / 2) + ") rotate(-90)")
            .attr("dy", "-5.5em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Income Groups");

var incomeBar = incomeBarChart.selectAll("rect");
//Update function to be called everytime the Bar chart is rendered. Inline with the d3 design patterns
function updateIncomeBarChart(d) {
    var x = d3.scaleLinear()
            .domain([0, d3.max(d.incomeGroup, k => k.count)])
            .range([0, incomeWidth]);
    var y = d3.scaleBand()
            .domain(d.incomeGroup.map(k => k.income_group))
            .range([0, incomeHeight])
            .padding(0.4);
    xBar.call(d3.axisBottom().scale(x));
    yBar.transition().duration(100).call(d3.axisLeft().scale(y));

    d3.selectAll('#incomeGroupRect').remove();
    d3.selectAll('#incomeGroupLabel').remove();

    incomeBar.data(d.incomeGroup)
            .enter()
            .append("rect")
            .attr("id", "incomeGroupRect")
            .transition()
            .attr("y", function(k) { return y(k.income_group)})
            .attr("width", k=> x(k.count))
            .attr("height", barWidth)
            .attr("fill", function(k){ 
                if (k.count === d3.max(d.incomeGroup, u => u.count)){
                    return "#990000";
                }
                else {
                    return "#58a758";
                }
            });
    
    var text = incomeBar.data(d.incomeGroup)
                        .join("text")
                        .attr("id", "incomeGroupLabel")
                        .attr("x", function(k) { return x(k.count) + 20;})
                        .attr("y", function(k) {return y(k.income_group) + 20;})
                        .attr("dy", ".35em")
                        .attr("font-size", "10px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .attr("text-anchor", "middle")
                        .text(function (k) { return k.count; });
}
updateIncomeBarChart(pieProcessing("City of Melbourne")[0]);

//Chorpleth Map
//Static content to render the bar chart. Such as initialising axes and SVG

var mapBoxAccessToken = {token: "pk.eyJ1IjoibmlrZXRzaW5nbGEiLCJhIjoiY2t0M3dleWUwMGJzNTJubnFucHpvaDE3bCJ9.CdS7fCuMc-vGEBnFxnXDDA"};

var map = L.map('map').setView([20.5937, 78.9629], 2);
L.tileLayer('https://api.mapbox.com/styles/v1/niketsingla/ckv25v01z0r0s15p22a3ri42c/tiles/{z}/{x}/{y}?access_token=' + mapBoxAccessToken.token, {
    id: 'niketsingla/ckv25v01z0r0s15p22a3ri42c',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

function getColor(d) {
    return d > 3000 ? '#800026' :
           d > 1000  ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
var info = L.control();
var geojson;
geojson = L.geoJson(countries_geojson);

//Update Choropleth function to be called everytime the chart is rendered. This will update the chart when user click on Pie slice. 
function updateChoropleth(d){
    for (const iterator of d.migration) {
        if(iterator.country !== 'Born elsewhere' && iterator.country !== 'Australia' && iterator.country !== 'Not stated' && countries_geojson.features.find(element => element.properties.name === iterator.country) != undefined) {
            L.geoJson(countries_geojson.features.find(element => element.properties.name === iterator.country)).addTo(map);
            var myStyle = style(iterator.count);
            L.geoJson(countries_geojson.features.find(element => element.properties.name === iterator.country), {style: myStyle}).addTo(map);
            var k = countries_geojson.features.find(element => element.properties.name === iterator.country);
            k.properties['value'] = iterator.count;
            k.properties['suburb'] = iterator.suburb;
            geojson = L.geoJson(countries_geojson.features.find(element => element.properties.name === iterator.country), {
                style: myStyle,
                onEachFeature: onEachFeature
            }).addTo(map);
        }
    }
}

updateChoropleth(pieProcessing('City of Melbourne')[0]);

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    //geojson.resetStyle(e.target);
    e.target.setStyle(e.target.options.style);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Migration</h4>' +  (props ?
        '<b>'+ props.value + ' people migrated from ' + props.name + '</b><br /><b>to ' + props.suburb + '</b>'
        : 'Hover over a country');
};

info.addTo(map);
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [10, 20, 50, 100, 500, 1000, 3000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);

function goBack() {
    window.history.back();
}