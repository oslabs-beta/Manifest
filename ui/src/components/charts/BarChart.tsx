import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, scales, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FlareSharp } from '@mui/icons-material';
import annotationPlugin from 'chartjs-plugin-annotation'
import { yellow } from '@mui/material/colors';
import './BarChart.scss'
ChartJS.register(annotationPlugin, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

type Props = {
  byteUsage: number;
  softLimit: number | null;
  hardLimit: number | null;
  softLimitString: string;
  hardLimitString: string;
  totalMemString: string,
};

const getGradientColor = (byteUsage: number, softLimit: number | null, hardLimit: number | null): string => {
  let rgb = [255, 255, 0]
  if (!softLimit) {
    if (hardLimit) softLimit = hardLimit / 2;
    else return 'rgb(255, 0, 0)';
  }

  if (byteUsage < softLimit) {
    const perc = byteUsage / softLimit;
    rgb[0] = Math.floor(rgb[0] * perc);
  } else if (byteUsage > softLimit) {
    if (hardLimit) {
      const perc = softLimit / (hardLimit - softLimit);
      rgb[1] = Math.floor(rgb[1] * perc);
    } else return 'rgb(255, 255, 0)';
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export default function BarChart(props: Props){
  
  const labels = [props.totalMemString]
  const data = {
    labels: labels,

    datasets: [{
      barPercentage: 0.4,
      data: [props.byteUsage],
      backgroundColor: [
        `${getGradientColor(props.byteUsage, props.softLimit, props.hardLimit)}`,
      ],
      borderRadius: 10,
      borderSkipped: false,
      // borderColor: [
      //   'white',
      // ],
      borderWidth: 1,
      color: 'white',
    }]
  };

  console.log(data);

  const options = {
    indexAxis: 'y', 

    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          color: 'white',
        }
      }
      
    },

    aspectRatio: 3.75,

    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            xMin: props.softLimit,
            xMax: props.softLimit,
            borderColor: 'rgb(234,104,20)',
            borderWidth: 2,
            label: {
              content: 'Soft Limit: ' + props.softLimitString,
              backgroundColor: 'rgb(234,120,20)',
              display: true,
              position: '100%',
            }
          },
          line2: {
            type: 'line',
            xMin: props.hardLimit,
            xMax: props.hardLimit,
            borderColor: 'rgb(175, 0, 0)',
            borderWidth: 2,
            label: {
              content: 'Hard Limit ' + props.hardLimitString,
              backgroundColor: 'rgb(175, 0, 0)',
              display: true,
              position: '0%',
            }
          }
        }
      }
    }
  }
  

  return (
    <div className = 'barGraphWrapper'>
      <Bar data = {data} 
      options = {options} 
      />
    </div>
  )
}