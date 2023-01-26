import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CssTwoTone } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend);

type containerData = {
  ID: string;
  Name: string;
  MemPerc: string;
  MemUsage: string;
};

type datasets = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
};

interface data {
  labels: string[];
  datasets: datasets[];
}

export default function DoughnutChart(props: containerData) {
  const { ID, MemPerc, MemUsage, Name } = props;
  //   console.log(MemPerc);
  const [data, setData] = React.useState<data>({
    labels: ['Total Memory Used', 'Allocatable Space'],
    datasets: [
      {
        label: 'Percentage',
        data: [0, 0],
        backgroundColor: ['#1565c0', '#42a5f5'],
        borderColor: ['rgba(0, 0, 0, 0.54)'],
      },
    ],
  });

  useEffect(() => {
    const memNumber: number = parseFloat(MemPerc);
    setData({
      labels: ['Usage', 'Free space'],
      datasets: [
        {
          label: 'Container Use Ratio',
          data: [memNumber, 100 - memNumber],
          backgroundColor: ['#1565c0', '#42a5f5'],
          borderColor: ['rgba(0, 0, 0, 0.54)'],
        },
      ],
    });
  }, [MemPerc]);

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12,
            lineHeight: 1.2,
            // style: 'color: white',
          },
        },
      },
      title: {
        display: true,
        text: 'Memory Usage by Container',
      },
    },
  };

  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;

      const number = data.datasets[0].data[0];

      ctx.save();
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseLine = 'middle';
      ctx.fillText(
        `${(Math.round(number * 100) / 100).toFixed(2)}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <div className="gaugeChart">
      <Doughnut
        className="totalMemUsageChart"
        data={data}
        options={options}
        plugins={[textCenter]}
      />
    </div>
  );
}
