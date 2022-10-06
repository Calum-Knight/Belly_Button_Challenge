const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it

d3.json(url).then(function (data) {

    console.log(data);

    var dropdown = d3.select('#selDataset')

    data.names.forEach((id) => {

        dropdown.append('option').text(id).property('value')

    })

    charts(940)
    meta_data(940)
});




function charts(selected) {
    console.log(selected)
    // let selectedId = selected;

    d3.json(url).then(function (data) {

        // console.log(data);

        var results = data.samples.filter(obj => obj.id == selected)
        var object = results[0]
        // var topTen = object.slice(0, 9)
        // console.log(object);

        var otu_ids = results[0].otu_ids;
        var otu_labels = results[0].otu_labels;
        var sample_values = results[0].sample_values;

        var bar_otu_ids = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`)
        var bar_sample_values = sample_values.slice(0, 10)
        var bar_otu_labels = otu_labels.slice(0, 10)

        // Use Map and slice

        // console.log(otu_ids);

        var chart1Data = [{
            type: 'bar',
            x: bar_sample_values,
            y: bar_otu_ids,
            orientation: 'h',
            hovertemplate: bar_otu_labels
        }];
        var layout = {
            title: 'Top Ten Bacteria',
            xaxis: {
                title: 'Sample Values'
            },
            yaxis: {
                title: 'OTU IDS'
            }
        };



        Plotly.newPlot('bar', chart1Data, layout)



        var chart2Data = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: 'YlOrRd',
            }

        }];

        var layout = {
            title: 'Bacteria Found In Selected Participants Belly Button',
            xaxis: {
                title: 'OTU IDS'
            },
            yaxis: {
                title: 'Sample Values'
            }
        };

        Plotly.newPlot('bubble', chart2Data, layout)

        var washes = data.metadata.filter(obj => obj.id == selected)
        console.log(washes)

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washes[0]["wfreq"],
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] },
                    bar: { color: "cyan" },
                    steps: [
                        { range: [0, 1], color: "#996633" },
                        { range: [1, 2], color: "#bf8040" },
                        { range: [2, 3], color: "#cc9966" },
                        { range: [3, 4], color: "#d2a679" },
                        { range: [4, 5], color: "#d9b38c" },
                        { range: [5, 6], color: "#dfbf9f" },
                        { range: [6, 7], color: "#e6ccb3" },
                        { range: [7, 8], color: "#ecd9c6" },
                        { range: [8, 9], color: "#f2e6d9" },
                    ],
                }
            }
        ];

        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);

    })
}

function meta_data(selected) {

    d3.json(url).then(function (data) {

        var results = data.metadata.filter(obj => obj.id == selected)
        var result = results[0]

        var meta_Panel = d3.select("#sample-metadata")

        meta_Panel.html("");

        Object.entries(result).forEach(([key, value]) => {
            meta_Panel.append("h5").text(`${key.toUpperCase()} : ${value}`);
        })

        console.log('id tag: ' + result.id)
        return ('sample-metadata', result.id)



    })
}

function optionChanged(selected) {
    charts(selected);
    meta_data(selected);
}






