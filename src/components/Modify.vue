<template>
<div>
    <p v-for= "(data, seq) in datapacket" v-bind:key= "data.name">
        {{data.name}}: {{data.count}}
        <br>
        <input v-bind:id = "seq" placeorder =0 type="number" min="0" v-model= "updates[seq]">
       </p>
       <div id="button">
       <button type= "button" v-on:click= "updateOrder">Update Order</button></div>
       </div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: "Modify",
    data(){
        return{
            datapacket: [],
            updates: [],
        }
    },
    props: ['order_id'],
    methods: {
        fetchItems: function(){
            //fetch orders from the database.
            database.collection('orders').doc(this.order_id).get()
            .then(snapshot => {
                this.datapacket = snapshot.data().order;
            });
        },
        updateOrder: function(){
            var order = [];
            var size = this.datapacket.length;
            for(let i=0; i<size; i++){
                var curr_item = this.datapacket[i];
                if(this.updates[i]){
                    order.push({name: curr_item.name, count: Number(this.updates[i])});
                }else{
                    order.push({name: curr_item.name, count: curr_item.count});
                }
            }
            database.collection('orders').doc(this.order_id).update({order})
            .then(()=> {this.$router.push({name: "orders"})});
        },
    },
    created(){
        this.fetchItems()
    },
}
</script>

<style scoped>
button{
    font-family: Arial;
    text-align: center;
    background-color: lightsteelblue;
}
</style>