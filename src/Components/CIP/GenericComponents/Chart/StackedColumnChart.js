import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class StackedColumnChart extends Component {
	constructor() {
		super();
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
			animationEnabled: true,
			exportEnabled: true,
			height: 120,
			axisY: {
			},
			toolTip: {
				shared: true,
				reversed: true
			},
			legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [],
		}
		for (var i = 0; i < this.props.chartArray.length; i++) {

			options.data.push({
				type: "stackedColumn",
				name: this.props.chartArray[i].field,
				showInLegend: true,
				yValueFormatString: "#,###k",
				dataPoints: []
			});
		}
		for (var i = 0; i < this.props.chartArray.length; i++) {
			for (var j = 0; j < this.props.chartArray[i].timeline.length; j++) {
				options.data[i]["dataPoints"].push({ label: this.props.chartArray[i].timeline[j].label, y: this.props.chartArray[i].timeline[j].y })
			}
		}

		return (
			<div>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default StackedColumnChart;