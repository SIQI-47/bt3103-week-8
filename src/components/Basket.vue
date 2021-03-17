<template>
    <div>
        <p>Menu:</p>
        <ul>
            <li v-for="item in itemsSelected" v-bind:key="item[0]">
                {{item[0]}} x {{item[1]}}
            </li>
        </ul>

        <button v-on:click= "calculate(); sendOrder()"> Calculate Total </button>
        <div v-show="this.show">
            <p>SubTotal: ${{findTotal}}</p>
            <p>GrandTotal: ${{findGrand}}</p>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: 'Basket',
    data(){
        return{
            show: false
        }
    },
    props: {
        itemsSelected:{
            type: Array
        },
        items:{
            type: Array
        },
    },
    methods: {
        calculate: function(){
            this.show = true;
        },
        sendOrder: function(){
            var order = [];
            var orderedname = {};
            //push the ordered item into the basket storage
            for(let i=0; i<this.itemsSelected.length; i++){
                var curr_item = this.itemsSelected[i];
                order.push({name: curr_item[0], count: curr_item[1]});
                orderedname[curr_item[0]]= curr_item[1];
            }
            //make use of the dictionary storage to check whether the dish is ordered or not.
            for(let i=0; i<this.items.length; i++){
                if(!(this.items[i].name in orderedname)){
                    order.push({name: this.items[i].name, count: Number(0)});
                }
            }
            database.collection('orders').add({order}).then(() => location.reload());
        },
    },
    computed: {
        findTotal: function(){
            var sum = 0;
            var i = 0;
            for(i=0; i<this.itemsSelected.length; i++){
                var curr_item = this.itemsSelected[i]
                sum += curr_item[1]*curr_item[2]
            }
            return sum
        },
        findGrand: function(){
            var sum = 0;
            var i = 0;
            for(i=0; i<this.itemsSelected.length; i++){
                var curr_item = this.itemsSelected[i]
                sum += curr_item[1]*curr_item[2]
            }
            return (sum*1.07).toFixed(2)
        }
    }
}
</script>

<style scoped>
button{
    font-family: Arial;
    text-align: center;
    background-color: lightsteelblue;
}
</style>