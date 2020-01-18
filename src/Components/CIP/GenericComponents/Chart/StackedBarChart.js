import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedBarChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e) {
		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
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
			theme: "light2",
			height: 255,
			title:{
				//text: "Evening Sales in a Restaurant"
			},
			toolTip: {
				shared: true
			},
			legend:{
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [
				{
					type: "stackedBar",
					name: "Phase 4",
					showInLegend: "true",
					// xValueFormatString: "Phase #",
					dataPoints: [
						{ y: 5, label: "Kidney Cancer" },
						{ y: 4, label: "Melonoma" },
						{ y: 16, label: "Breast Cancer" },
						{ y: 23, label: "Lung Cancer" },
						{ y: 56, label: "Hematology" }
					]
				},
				{
					type: "stackedBar",
					name: "Phase 3",
					showInLegend: "true",
					// xValueFormatString: "Phase #",
					dataPoints: [
						{ y: 28, label: "Kidney Cancer" },
						{ y: 47, label: "Melonoma" },
						{ y: 166, label: "Breast Cancer" },
						{ y: 188, label: "Lung Cancer" },
						{ y: 266, label: "Hematology" }
					]
				},
				{
					type: "stackedBar",
					name: "Phase 2",
					showInLegend: "true",
					// xValueFormatString: "Phase #",
					dataPoints: [
						{ y: 138, label: "Kidney Cancer" },
						{ y: 203, label: "Melonoma" },
						{ y: 505, label: "Breast Cancer" },
						{ y: 559, label: "Lung Cancer" },
						{ y: 581, label: "Hematology" }
					]
				},
				{
					type: "stackedBar",
					name: "Phase 1",
					showInLegend: "true",
					// xValueFormatString: "Phase #",
					dataPoints: [
						{ y: 82, label: "Kidney Cancer" },
						{ y: 152, label: "Melonoma" },
						{ y: 254, label: "Breast Cancer" },
						{ y: 286, label: "Lung Cancer" },
						{ y: 269, label: "Hematology" }
					]
				},
				{
					type: "stackedBar",
					name: "Early Phase 1",
					showInLegend: "true",
					// xValueFormatString: "Phase #",
					dataPoints: [
						{ y: 1, label: "Kidney Cancer" },
						{ y: 5, label: "Melonoma" },
						{ y: 16, label: "Breast Cancer" },
						{ y: 5, label: "Lung Cancer" },
						{ y: 11, label: "Hematology" }
					]
				}
			]
		}
		
		return (
		<div className="stackedBarChartContainer">
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedBarChart;