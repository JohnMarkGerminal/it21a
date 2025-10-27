class LineChart {
    constructor(canvasId, dataUrl) {
        this.canvasId = canvasId;
        this.dataUrl = dataUrl;
        this.chart = null;
    }

    renderChart(data) {
        const ctx = document.getElementById(this.canvasId).getContext("2d");
        this.chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Monthly Data",
                    data: data.values,
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error(`Failed to load data: ${response.statusText}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    async init() {
        const data = await this.fetchData();
        if (data) this.renderChart(data);
    }
}

class RadarChart {
    constructor(canvasId, dataUrl) {
        this.canvasId = canvasId;
        this.dataUrl = dataUrl;
        this.chart = null;
    }

    renderChart(data) {
        const ctx = document.getElementById(this.canvasId).getContext("2d");
        this.chart = new Chart(ctx, {
            type: "radar",
            data: {
                labels: data.labels,
                datasets: data.datasets
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "top" },
                    title: {
                        display: true,
                        text: "Radar Chart"
                    }
                },
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error(`Failed to load data: ${response.statusText}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return null;
        }
    }

    async init() {
        const data = await this.fetchData();
        if (data) this.renderChart(data);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const lineChart = new LineChart("lineChart", "linedata.json");
    lineChart.init();

    const radarChart = new RadarChart("radarChart", "radarData.json");
    radarChart.init();
});
