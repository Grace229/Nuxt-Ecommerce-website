<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                 <div class="col-sm-6">
                     <div class="a-spacing-top-medium"></div>
                     <h2 class="center">Add a new category</h2>
                     <form >
                       

                            <!--title -->
                            <div class="a-spacing-top-medium">
                                <label>type</label>
                                <input type="text" v-model="type" class="a-input-text width">
                            </div>
                            
                             <!--button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddCategory">Add a product</span>
                                    </span>
                                </span>
                            </div>      
                     </form>
                     <br>
                     <ul class="list-group-item">
                         <li v-for="category in categories" :key="category._id">{{ category.type }}</li>
                     </ul>
                 </div>
                  <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    async asyncData( { $axios } ){
        try {
             let response =  await $axios.$get('http://localhost:8000/api/categories'); 
             return{
                 categories : response.categories
             }
             this.categories.push(data);
        } catch (err) {
           console.log(err) 
        }
    },
 data(){
     return{
         type: ""
     }
 },
 methods: {
     async onAddCategory(){
         let data = { type: this.type}
          let response =  await this.$axios.$post('http://localhost:8000/api/categories', data);
     }
 }

}
</script>