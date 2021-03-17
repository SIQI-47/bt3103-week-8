import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: []
        },
        options: {
            legend: { 
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)',
              fontColor: 'Gray',
              fontSize: 15,
            },
            scales:{
              yAxes:[{
                ticks:{
                  min: 40,
                  max: 60
                }
              }],
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        var line_info = {
            "west": [],
            "national": [],
            "east": [],
            "central": [],
            "south": [],
            "north": []
        }
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp);
                var curr_item = data.readings.psi_twenty_four_hourly;
                line_info["west"].push(curr_item.west);
                line_info["national"].push(curr_item.national);
                line_info["east"].push(curr_item.east);
                line_info["central"].push(curr_item.central);
                line_info["south"].push(curr_item.south);
                line_info["north"].push(curr_item.north);
            })
            const color_family = ["plum", "mediumPurple", "darkSalmon", "darkSeaGreen", "steelBlue", "darkGray"]
            const directions = Object.keys(line_info)
            const values = Object.values(line_info)
            for(let i=0; i<directions.length; i++){
                this.datacollection.datasets.push({
                    label: directions[i],
                    data: values[i],
                    fill: false,
                    borderColor: color_family[i]
                })
            }
        }).then(() => {
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}