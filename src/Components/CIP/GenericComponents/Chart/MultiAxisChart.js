import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiAxisChart extends Component {
	constructor(props) {
		super(props);
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	render() {

		const options = {
			theme: "light2",
			animationEnabled: true,
			axisX: {
				title: "Europe",
				interval: 1,
				intervalType: "month",
				valueFormatString: "MMM"
			},
			axisY: {
				title: "EURO",
				titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0",
				includeZero: true
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			}
		}
		options.data = [];
		for (var i = 0; i < this.props.chartArray.length; i++) {

			options.data.push({
				type: "spline",
				name: this.props.chartArray[i].company,
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "€#,##0.#EUR",
				dataPoints: []
			});
		}

		
		for (var i = 0; i < this.props.chartArray.length; i++) {
			for (var j = 0; j < this.props.chartArray[i].stocks.length; j++) {
				options.data[i]["dataPoints"].push({ x: new Date(this.props.chartArray[i].stocks[j].date), y: this.props.chartArray[i].stocks[j].stock})
			}
		}
		console.log("options.data", options.data);
		console.log("this.props.viewSource" + this.props.viewSource);
		if (this.props.viewSource === "home") {
			options["height"] = 174;
		}
		else {
			options["height"] = 245;
		}

		return (
			<div className="MultipleAxisChart">
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default MultiAxisChart;