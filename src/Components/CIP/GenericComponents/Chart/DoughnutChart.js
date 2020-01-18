import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DoughnutChart extends Component {
	render() {
		const options = {
			animationEnabled: true,
			height: 184,
			subtitles: [{
				// text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}]
		}
		if (this.props.type === "Development Status") {
			options["data"] = [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: []
			}];
			for(var i=0;i<this.props.chartArray.length;i++){
				options.data[0].dataPoints.push({name:this.props.chartArray[i].name,y:this.props.chartArray[i].y})
			}
		}
		if (this.props.type === "Clinical Trial Development Phase") {
			options["data"] = [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: []
			}];
			for(var i=0;i<this.props.chartArray.length;i++){
				options.data[0].dataPoints.push({name:this.props.chartArray[i].name,y:this.props.chartArray[i].y})
			}
			options["height"] = 350;
		}
		if (this.props.type === "Competitor") {
			options["data"] = [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: []
			}];
			{console.log("chartArray dee",this.props.chartArray)}
			for(var i=0;i<this.props.chartArray.length;i++){
				options.data[0].dataPoints.push({name:this.props.chartArray[i].name,y:this.props.chartArray[i].percentage})
			}
			options["height"] = 161;
		}
		if (this.props.type === "Pipeline") {
			options["data"] = [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: []
			}];
			for(var i=0;i<this.props.chartArray.length;i++){
				options.data[0].dataPoints.push({
					name:this.props.chartArray[i].phaseName,y:this.props.chartArray[i].value
				});
			}
			options["height"] = 150;
		}
		if (this.props.type === "Sales & Contribution") {
			var dataPoints = [];
			console.log("this.props.chartArray" + JSON.stringify(this.props.chartArray));
			for (var i = 0; i < this.props.chartArray.length; i++) {
				if (this.props.chartArray[i].value !== null && this.props.chartArray[i].value !== undefined && this.props.chartArray[i].value !== "") {
					dataPoints.push({ y: Number(this.props.chartArray[i].value.replace("%", "")), name: this.props.chartArray[i].country })
				}
				else {
					dataPoints.push({ y: 0, name: this.props.chartArray[i].country })
				}
			}
			console.log("dataPoints", dataPoints);

			options["data"] = [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: dataPoints
			}];
			options["height"] = 150;
		}


		return (
			<div>
				<CanvasJSChart options={options}
				/* onRef={ref => this.chart = ref} */
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}

export default DoughnutChart;