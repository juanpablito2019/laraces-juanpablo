import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart(props) {
    const data = {
        responsive: true,
        labels: ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4', 'Grupo 5'],
        datasets: [
            {
                label: props.label,
                data: [10, 6, 2, 4, 10],
                backgroundColor: [
                    props.color
                ],
            }
        ]
    }
    return (
        <>
            <Line data={data}/>
        </>
    )
}
export default LineChart;