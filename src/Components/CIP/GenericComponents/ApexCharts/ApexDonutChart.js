import React,{ useState } from 'react';
import Chart from "react-apexcharts";

const ApexDonutChart = (props) => {
  
  let names=[];
  let percents=[4,45,50];

  if(props.type === "Clinical Trial Development Phase" && props.chartArray.data!=undefined)
  {
    if(props.chartArray.data!=undefined)
    {
  for(var i=0;i<props.chartArray.data.phases.length;i++)
   names[i]=(props.chartArray.data.phases[i].phase_name);

   for(let i=0;i<props.chartArray.data.phases.length;i++)
  percents[i]=((props.chartArray.data.phases[i].study_count));
    }
// else
// names=["phase I","phase II","Phase III","Phase IV"];
//   for(let i=0;i<props.chartArray.length;i++)
//   percents[i]=(props.chartArray.data.phases[i].study_count)/(props.chartArray.data.total_count);
  }
  
  if(props.chartArray.data!=undefined)
  console.log(props.chartArray.data.phases,names,percents);
  
  let styles = { options: {
      labels: ["A","b","c"],
      dataLabels: {
          enabled: false
        },

        responsive: [{
          breakpoint: 480,
          options: {
            // donut: {
            //     // position: 'right',
            //     verticalAlign: 'center',
            //     width: 200,
            // },
            // plotOptions: {
            // donut: {
            //     verticalAlign: 'center'
            // }
            // },
            legend: {
              show: false
            }
          }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 200,
            verticalAlign: 'center'
        }
      },
      
      series: [40,45,50]
         
  }

  switch (props.type) {
    
    case "Development Status":
      styles = { options: {
        labels: ["Pipeline","Inactive","Approved"],
        //  labels: names,
        colors:['#9bbb58', '#c0504e','#4f81bc'],
        dataLabels: {
            enabled: false
          },
     
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
              position: 'bottom',
              // offsetY: 0,
              height: 'auto',
              width: 250
          }
        },
        
         series: [4,45,50]
           
    } 
   
    
    break;
  
  case "Clinical Trial Development Phase":
    styles = { options: {
      labels: names,
      colors:['#9bbb58', '#c0504e', '#23bfaa','#4f81bc'],
      dataLabels: {
          enabled: false
        },

        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              show: false
            }
          }
        }],
        legend: {
            position: 'bottom',
            offsetY: 0,
            height: 50,
        }
      },
      
      series: [7,71,11,11],
      
         }

         
    
  break;

  default:
  break;
      
  }
  
  
    return (
        <div className="donut">
        <Chart options={styles.options} series={percents}  type="donut" width = {props.width} />
      </div>

    );
}

export default ApexDonutChart;