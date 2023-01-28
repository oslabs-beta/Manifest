import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { withTheme } from '@emotion/react';
import './doughnut.scss';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
  color: string;
};

interface data {
  labels: string[];
  datasets: datasets[];
}

interface props {
  containerNames: string[];
  containerMemPerc: number[];
  maxMem: any;
}

export default function DoughnutChart(props: props) {
  const { containerNames, containerMemPerc, maxMem } = props;
  // console.log(MemPerc);
  const [data, setData] = React.useState<data>({
    labels: [''],
    datasets: [
      {
        label: 'Percentage',
        data: [0],
        backgroundColor: [
          '#42a5f5',
          '#ba68c8',
          '#ef5350',
          '#ff9800',
          '#4caf50',
        ],
        borderColor: ['rgba(0, 0, 0, 0.54)'],
        color: '#FFF',
      },
    ],
  });

  // console.log(containerNames);

  useEffect(() => {
    // we are gonna need 2 set datas for each of the doughnut charts
    // add an if statement to check if maxMem is defined
    let sum = containerMemPerc.reduce((acc, curr) => {
      return (acc += curr);
    }, 0);

    if (maxMem) {
      setData({
        labels: ['Remaining Memory', ...containerNames],
        datasets: [
          {
            label: 'Raw Memory',
            data: [maxMem - sum, ...containerMemPerc],
            backgroundColor: [
              'whitesmoke',
              '#42a5f5',
              '#ba68c8',
              '#ef5350',
              '#ff9800',
              '#4caf50',
            ],
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: '#FFF',
          },
        ],
      });
    } else {
      setData({
        labels: containerNames,
        datasets: [
          {
            label: 'Raw Memory',
            data: containerMemPerc,
            backgroundColor: [
              '#42a5f5',
              '#ba68c8',
              '#ef5350',
              '#ff9800',
              '#4caf50',
            ],
            borderColor: ['rgba(0, 0, 0, 0.54)'],
            color: '#FFF',
          },
        ],
      });
    }
  }, [containerMemPerc, maxMem]);

  let title = 'Memory Usage Ratio per Container';
  if (maxMem) {
    title = 'Memory Usage by Containers';
  }

  const options: any = {
    maintainAspectRatio: true,
    responsive: true,
    aspectRatio: 1,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#FFF',
          font: {
            size: 12,
            lineHeight: 1.2,
            // style: 'color: white',
          },
          padding: 15,
        },
      },
      title: {
        fullSize: true,
        color: '#FFF',
        display: true,
        position: 'top',
        text: title,
        padding: {
          top: 30,
          bottom: 0,
        },
        font: {
          size: 20,
        },
      },
    },
  };

  // const textCenter = {
  //   id: 'textCenter',
  //   beforeDatasetsDraw(chart, args, pluginOptions) {
  //     const { ctx, data } = chart;

  //     const number = data.datasets[0].data[0];

  //     ctx.save();
  //     ctx.font = 'bold 30px sans-serif';
  //     ctx.fillStyle = 'white';
  //     ctx.textAlign = 'center';
  //     ctx.textBaseLine = 'middle';
  //     ctx.fillText(
  //       `${(Math.round(number * 100) / 100).toFixed(2)}%`,
  //       chart.getDatasetMeta(0).data[0].x,
  //       chart.getDatasetMeta(0).data[0].y
  //     );
  //   },
  // };

  // console.log(options.plugins.title);

  return (
    <div className="gaugeChart">
      <Doughnut
        className="totalMemUsageChart"
        data={data}
        options={options}
        // plugins={}
      />
    </div>
  );
}
