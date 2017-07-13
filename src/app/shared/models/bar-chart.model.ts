export interface BarChartData {
            labels: String[],
            datasets: [
                {
                    label: String,
                    backgroundColor: String,
                    borderColor: String,
                    data: number[]
                }
            ]
        }