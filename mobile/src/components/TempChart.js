import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function TempChart({ detailData }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
    
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: detailData.map(data => data.time), // 시간 데이터
                datasets: [{
                    label: '습도',
                    data: detailData.map(data => data.value), // 데이터 값
                    borderColor: '#05C67A',
                    backgroundColor: '#05C67A',
                },
                {
                    label: '온도',
                    data: detailData.map(data => data.anotherValue), // 두 번째 데이터 값, anotherValue는 새로운 데이터 배열을 가정
                    borderColor: '#FF9A9A',
                    backgroundColor: '#FF9A9A', // 새로운 그래프의 배경색
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // 이 옵션을 false로 설정하여 원하는 대로 비율을 유지하지 않도록 할 수 있습니다.
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [detailData]);

    return <canvas ref={chartRef} style={{ marginTop:"20px" }}></canvas>;
}

export default TempChart;
