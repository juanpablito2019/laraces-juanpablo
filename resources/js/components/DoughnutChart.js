import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart(props) {
    const data = {
        responsive: true,
        labels: ['Comite por falta academica', 'Comite por falta disciplinaria', 'Parte 3'],
        datasets: [
            {
                data: [10, 12, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
            }
        ]
    }
    return (
        <>
            <Doughnut data={data}/>
        </>
    )
}
export default DoughnutChart;