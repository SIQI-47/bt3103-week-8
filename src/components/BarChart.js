import database from '../firebase.js'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "",
                data: [],
                backgroundColor: ["plum", "mediumPurple", "darkSalmon", "darkSeaGreen", "steelBlue", "darkGray"]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish',
              fontColor: 'Gray',
              fontSize: 15,
            },
            scales:{
              yAxes:[{
                ticks:{
                  min: 0,
                  max: 12
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
      var counting = {}
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
            for(let i=0; i< doc.data().order.length; i++){
              var item = doc.data().order[i];
                if(!(item.name in counting)){
                  counting[item.name] = item.count;
                }else{
                  counting[item.name] += Number(item.count);
                }
            }
          })
        }).then(() => {
        this.datacollection.labels = Object.keys(counting)
        this.datacollection.datasets[0].data = Object.values(counting)
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}