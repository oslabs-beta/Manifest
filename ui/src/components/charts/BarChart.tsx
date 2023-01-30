import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, scales, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FlareSharp } from '@mui/icons-material';
import annotationPlugin from 'chartjs-plugin-annotation'

ChartJS.register(annotationPlugin, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

type Props = {
  byteUsage: number;
  softLimit: number | null;
  hardLimit: number | null;
};

export default function BarChart(props: Props){
  
  const labels = ['memUsage']
  const data = {
    labels: labels,
    datasets: [{
      
      data: [props.byteUsage],
      backgroundColor: [
        'green',
      ],
      borderColor: [
        'white',
      ],
      borderWidth: 1
    }]
  };

  const options = {
    indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    }
  }
  

  return (
    <div className = 'barGraphWrapper'>
      <Bar data = {data} 
      options={options} 
      />
    </div>
  )
}