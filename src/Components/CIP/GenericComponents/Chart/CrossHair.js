import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
 
class CrossHair extends Component {
  render() {
		const options = {
			animationEnabled: true,
			theme: "light2",
			height:184,
			axisX:{
				valueFormatString: "DD MMM",
				crosshair: {
					enabled: true,
					snapToDataPoint: true
				}
			},
			axisY: {
				title: "Persons",
				includeZero: false,
				valueFormatString: "0K",
				crosshair: {
					enabled: true,
					snapToDataPoint: true,
					labelFormatter: function(e) {
						return CanvasJS.formatNumber(e.value, "0")+"K";
					}
				}
            },
			data: [{
				type: "area",
				xValueFormatString: "DD MMM",
				yValueFormatString: "0K",
				dataPoints: [
				]
				
			}]
		}
		for(var i=0;i<this.props.chartArray.length;i++){
			options.data[0].dataPoints.push(
				{ x: new Date(this.props.chartArray[i].date), y: this.props.chartArray[i].value}
			);
		}
		return (
		  <div className="CrossHair">
			<CanvasJSChart options = {options} 
				onRef={ref => this.CrossHair = ref}
				/>
		  </div>
		);
	}
}
 
export default CrossHair;