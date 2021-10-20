var width = document.getElementById("id_genderPie").clientWidth,
    height = document.getElementById("id_genderPie").clientHeight,
    barWidth = 30;

var data = jsonData;
var processedData = [];

var pieProcessing = function (s) {
    processedData = [];
    for (const iterator of d3.map(data, function (k) { return k.geography; }).entries()) {
        var obj = {},
            o = {};
        var count = 0;
        var temp = [];
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
                obj['totalCount'] = count;
                processedData.push(obj);
            }
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
                    .attr("transform", "translate(250,250)");

var radius = Math.min(width, height) / 3 - 1;

var pie = d3.pie()
            .value(function(k) { if(k.suburb != 'City of Melbourne'){ return k.totalCount;}});

var arcLabel = d3.arc().innerRadius(Math.min(width, height) / 2 * 0.2).outerRadius(Math.min(width, height) / 2 * 0.8);

var piePath = pieChart.selectAll("path");

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
        .on("click", function(e, k){
            updateAgeBarChart(pieProcessing(k.data.suburb)[0]);
            updateEduBarChart(pieProcessing(k.data.suburb)[0]);
            updateHHBarChart(pieProcessing(k.data.suburb)[0]);
            updateIncomeBarChart(pieProcessing(k.data.suburb)[0]);
        })
        .on('mouseover', function (e, d) {
            let pos = d3.select(this).node().getBoundingClientRect();
            d3.select("#suburb").text(d.data.suburb);
            d3.select("#male").text(d.data.gender[0].count);
            d3.select("#female").text(d.data.gender[1].count);
            d3.select("#pieTooltip")
                .transition().duration(200)
                .style('left', (pos['x'] + 10) + 'px')
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
                .style('left', (pos['x'] + 10) + 'px')
                .style('top', (window.pageYOffset + pos['y'] - 10) + 'px')
                .style('opacity', 0.8);
        })
        .on('mouseout', function(e,d){
            d3.select("#pieTooltip").style('opacity', 0);
        });
}
updatePie(pieProcessing('All'));

//suburb Age Profile
var curwidth = parseInt(d3.select("#id_ageGroup").style("width"), 10);
var svgBar = d3.select("#id_ageGroup")
            .append("svg")
            .attr("viewBox", [0, 0, width, height])
            .attr("preserveAspectRatio", "xMinYMin meet");

var barChart = svgBar.append("g")
                    .attr("transform", "translate(75, 0) scale(0.8,0.8)");

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
                return "#e89609"
            }
            else {
                return "#afadad"
            }
        });
    
    
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

var svgEduBar = d3.select("#id_eduGroup")
                .append("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("preserveAspectRatio", "xMinYMin meet");

var eduBarChart = svgEduBar.append("g")
                        .attr("transform", "translate(150,0) scale(0.7,0.7)");

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
                return "#e89609"
            }
            else {
                return "#afadad"
            }
        });
    
    
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

var svgHHBar = d3.select("#id_hhGroup")
                .append("svg")
                .attr("viewbox", [0, 0, width, height])
                .attr("preserveAspectRatio", "xMinYMin meet");

var hhBarChart = svgHHBar.append("g")
                        .attr("transform", "translate(150,0) scale(0.7,0.7)");

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

function updateHHBarChart(d) {
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
                return "#e89609"
            }
            else {
                return "#afadad"
            }
        });
    
    
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
var incomeWidth = document.getElementById("id_incomeGroup").clientWidth,
    incomeHeight = document.getElementById("id_incomeGroup").clientHeight;

var svgIncomeBar = d3.select("#id_incomeGroup")
                    .append("svg")
                    .attr("viewbox", [0, 0, incomeWidth, incomeHeight]);

var incomeBarChart = svgIncomeBar.append("g")
                                .attr("transform", "translate(150,0) scale(0.7,0.7)");

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
                    return "#e89609"
                }
                else {
                    return "#afadad"
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