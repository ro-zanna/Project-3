function init() {
    // This initializes the selector with a list of hard-coded regions. These are the regions that have oil displacement data.
    let selector = d3.select("#selDataset")
    var regionName = ["USA", "China", "Europe", "India", "World"];
    for (let i = 0; i < regionName.length; i++) {
        selector.append("option").text(regionName[i]).property("value", regionName[i]);
    };
    // Starts off with the data from the first item in the region selector list, which will be USA, and renders the charts.
    let region1 = regionName[0];
    buildCharts(region1);
    buildTable(region1);
}

// This is called from the HTML file and re-renders the charts when the user selects a different region.
function optionChanged(nextRegion) {
    buildCharts(nextRegion);
    buildTable(nextRegion);
}

// Runs the init() function on load.
init();

function buildCharts(region) {
    // Request JSON-formatted sales data from our API, filter for BEV data in the selected region.
    d3.json("sales.json").then((data) => {
        let filteredData = data.filter(obj => obj.powertrain == "BEV").filter(obj => obj.region == region);

        // Make a vertical bar chart. The X axis is years and the Y axis is sales numbers - "value" in the JSON.
        var bardata = [{
            type: 'bar',
            x: filteredData.map(data => data.year),
            y: filteredData.map(data => data.value),
            text: "cars sold",
            orientation: 'v',
        }];
        var barLayout = {
            title: "BEVs sold per year"
        }

        // Use Plotly to render the chart. This will go to "bar" in the HTML.
        Plotly.newPlot('bar', bardata, barLayout);
    });
    // Request JSON-formatted oil displacement data from our API, filter for the selected region.
    // Only BEV data in this dataset, so no powertrain filter is necessary.
    d3.json("oil_displacement.json").then((data) => {
        let filteredData = data.filter(obj => obj.region == region);

        // Make a vertical bar chart. The X axis is years and the Y axis is oil displacement numbers - "value" in the JSON.
        var bardata = [{
            type: 'bar',
            x: filteredData.map(data => data.year),
            y: filteredData.map(data => data.value),
            text: "megabarrels",
            orientation: 'v'
        }];
        var barLayout = {
            title: "Megabarrels of oil conserved per year"
        }

        // Use Plotly to render the chart. This will go to "bar2" in the HTML.
        Plotly.newPlot('bar2', bardata, barLayout);
    });
};