import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface UserStatsChartProps {
    data: {
        date: string;
        count: number;
    }[];
}

const UserStatsChart: React.FC<UserStatsChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.date),
        datasets: [
            {
                label: 'New Users',
                data: data.map(d => d.count),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Daily User Signups (Last 7 Days)',
            },
        },
    };

    return <Bar options={options} data={chartData} />;
};

export default UserStatsChart;
