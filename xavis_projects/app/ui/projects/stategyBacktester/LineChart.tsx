'use client'

import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import {faker} from '@faker-js/faker';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
const LineChart = () => {

    const data = {
        labels,
        datasets: [
          {
            label: 'Dumy Data uno',
            data: labels.map(() => faker.number.int({ min: 30, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
          },
        ],
      };


    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Price Over Time',
            color: 'white', // title text color
            font: { size: 16 },
          },
          legend: {
            labels: {
              color: 'white',
            },
          },
        },
        scales: {
            x: {
              ticks: {
                color: 'white',
              },
              grid: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
            y: {
              ticks: {
                color: 'white', // Y-axis tick color
              },
              grid: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
          },
      };

    return <Line data={data} options={options} style={{ width: '100%', height: '100%' }}/>;
};

export default LineChart;