<template>
<div>
    <nav>
        <ul>
        <li><router-link to = "/">Home</router-link></li>
        <li><router-link to = "/orders">Orders</router-link></li>
        <li><router-link to = "/dashboard">Dashboard</router-link></li>
        </ul>
    </nav>
    <h1 id = "title">Bar chart</h1>
    <bar-chart></bar-chart>
    <h1 id = "title">Line Chart</h1>
    <line-chart></line-chart>
</div>
</template>

<script>
import BarChart from "./BarChart.vue";
import LineChart from "./LineChart.vue";

export default {
  components:{
    BarChart,
    LineChart
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
button {
  width: 65px;
  height: 30px;
  background-color: lightsteelblue;
  border-width: 1px;
}
#title {
  text-align: center;
}   
</style>
