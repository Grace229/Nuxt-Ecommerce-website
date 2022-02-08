<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                 <div class="col-sm-6">
                     <div class="a-spacing-top-medium"></div>
                     <h2 class="center">Add a new owner</h2>
                     <form >
                       

                            <!--name -->
                            <div class="a-spacing-top-medium">
                                <label>Name</label>
                                <input type="text" v-model="name" class="a-input-text width">
                            </div>
                              <!--about -->
                            <div class="a-spacing-top-medium">
                                <label>About</label>
                                <input type="text" v-model="about" class="a-input-text width">
                            </div>
                                 <!--photo-->
                            <div class="a-spacing-top-medium">
                                <label>Add photo</label>
                               <div class="a-row a-spacing-top-medium">
                                   <label class="choosefile-button">
                                       <i class="fal fa-plus"></i>
                                       <input type="file" @change="onFileSelected">
                                    
                                   </label>
                                    <p class="width" >Name of photo</p>

                               </div>
                            </div>
                            
                             <!--button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onAddOwner">Add a new owner</span>
                                    </span>
                                </span>
                            </div>      
                     </form>
                     <br>
                     <ul class="list-group-item">
                         <li v-for="owner in owners" :key="owner._id">{{ owner.name }}</li>
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
             let response =  await $axios.$get('http://localhost:8000/api/owners'); 
             return{
                owners : response.owners
             }
            //  this.owners.push(data);
        } catch (err) {
           console.log(err) 
        }
    },
 data(){
     return{
        name: "",
        about: "",
        selectedFile: null,
        fileName: ""
     }
 },
 methods: { 
     onFileSelected(event){
            this.selectedFile = event.target.files[0],
            console.log(this.selectedFile)
            this.fileName = event.target.files[0].name
        },

     async onAddOwner(){
         try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);
        let response =  await this.$axios.$post('http://localhost:8000/api/owners', data); 
        this.owners.push(this.name)
        console.log(this.owners)
         } catch (err) {
             console.log(err)
         }
     }
 }

}
</script>