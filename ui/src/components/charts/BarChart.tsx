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

export default function BarChart(props: Props){
  
  const labels = [props.totalMemString]
  const data = {
    labels: labels,

    datasets: [{
      barPercentage: 0.5,
      data: [props.byteUsage],
      backgroundColor: [
        'green',
      ],
      borderColor: [
        'white',
      ],
      borderWidth: 1,
      color: 'white',
    }]
  };

  const options = {
    indexAxis: 'y', 

    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          color: "white"
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