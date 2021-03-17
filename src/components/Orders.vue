<template>
<div>
    <nav>
        <ul>
        <li><router-link to = "/">Home</router-link></li>
        <li><router-link to = "/orders">Orders</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        </ul>
    </nav>
    <ul v-for= "msg in orders" v-bind:key= "msg[0]">
        <li>
            <div v-for= "item in msg[1]" v-bind:key= "item.name">
            {{item.name}}: {{item.count}}
            </div>
            <button type= "button" v-bind:id= "msg[0]" v-on:click= "deleteItem($event)">Delete</button>
            <button type= "button" v-bind:id= "msg[0]" v-on:click= "route($event)">Modify</button> 
        </li>
    </ul>
</div>
</template>

<script>
import database from "../firebase.js"

export default {
    name: "Orders",
    data(){
        return{
            orders: [],
        }
    },
    methods: {
        fetchItems: function(){
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data().order]);
                });
            });
        },
        deleteItem: function(event){
            var doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(()=> {location.reload()});
        },
        route: function(event){
            var doc_id = event.target.getAttribute("id");
            this.$router.push({name: "modify", params: {order_id: doc_id}})
        }
    },
    created() {
        this.fetchItems()
    },
}
</script>
<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
</style>