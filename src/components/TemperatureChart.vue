<template>
  <div>
    <canvas :ref="chartRef"></canvas>
  </div>
</template>

<script>
import { Line } from 'chart.js'

export default {
  name: 'TemperatureChart',
  props: {
    chartData: {
      type: Array,
      required: true
    },
    isHourly: {
      type: Boolean,
      required: true
    },
    chartId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  computed: {
    chartRef() {
      return `chart-${this.chartId}`
    }
  },
  mounted() {
    this.renderChart()
  },
  watch: {
    chartData() {
      this.renderChart()
    }
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy()
      }
      const ctx = this.$refs[this.chartRef].getContext('2d')
      const labels = this.chartData.map((data) => (this.isHourly ? data.time : data.date))
      const temperatures = this.chartData.map((data) => data.temp)

      this.chart = new Line(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: this.isHourly ? 'Hourly Temperature' : 'Daily Average Temperature',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            x: {
              type: this.isHourly ? 'time' : 'category',
              time: {
                unit: this.isHourly ? 'hour' : 'day'
              }
            },
            y: {
              beginAtZero: false
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}

@media (max-width: 600px) {
  canvas {
    height: 300px;
  }
}
</style>
