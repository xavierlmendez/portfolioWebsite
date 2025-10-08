'use client'

import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const BarChart = () => {

    const data: ChartData<'bar'> = {
        labels,
        datasets: [
            {
                label: 'My First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
            },
        ],
    };


    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Monthly Sales Data' },
        },

        scales: {
            x: { stacked: false },
            y: { beginAtZero: true },
        },
    };
    return <Bar data={data} options={options} />;
};

export default BarChart;