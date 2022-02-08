<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                 <div class="col-sm-6">
                     <div class="a-spacing-top-medium"></div>
                     <h2 class="center">Update</h2>
                     <form >
                         <!-- Category dropdown -->
                            <div class="a-spacing-top-medium">
                                <label for="Catd">Category</label>
                                <select class="a-select-option">
                                    <option v-for="category in categories" 
                                    value="category._id"
                                     :key="category._id">{{ category.type }}</option>
                                   
                                </select>
                            </div>

                               <!--Owner dropdown -->
                            <div class="a-spacing-top-medium">
                                <label>Owner</label>
                                <select class="a-select-option">
                                    <option v-for="owner in owners"
                                     value="owner._id" 
                                    :key="owner._id">{{ owner.name }}</option>
                                   
                                </select>
                            </div>
                            <!--title -->
                            <div class="a-spacing-top-medium">
                                <label>Title</label>
                                <input type="text" v-model="title" class="a-input-text width" :placeholder="product.title">
                            </div>
                             <!--Price -->
                            <div class="a-spacing-top-medium">
                                <label>Price</label>
                                <input type="number" v-model="price" class="a-input-text width" :placeholder="product.price">
                            </div>
                             <!--stockquantity -->
                            <div class="a-spacing-top-medium">
                                <label>Stock Quantity</label>
                                <input type="number" v-model="stockQuantity" class="a-input-text width" :placeholder="product.stockQuantity">
                            </div>
                             <!--Description -->
                            <div class="a-spacing-top-medium">
                                <label>Description</label>
                               <textarea class="width" v-model="description" :placeholder="product.description"></textarea>
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
                                        <span class="a-button-text" @click="onUpdateProduct">Update a product</span>
                                    </span>
                                </span>
                            </div>
                            
                     </form>
                 </div>
                  <div class="col-sm-3"></div>
            </div>
        </div>
    </main>
</template>
<script>
export default {
    async asyncData({ $axios, params }){
        try {
             let categories =  $axios.$get('http://localhost:8000/api/categories');
             let owners = $axios.$get('http://localhost:8000/api/owners');
             let product = $axios.$get(`http://localhost:8000/api/products/${params.id}`);
            
        const [catResponse, ownerResponse, productResponse] = await Promise.all([
            categories,
            owners,
            product   
        ]);
        console.log(catResponse);
        console.log(ownerResponse);
        console.log(productResponse);
        return{
            categories: catResponse.categories,
            owners: ownerResponse.owners,
            product: productResponse.product
        };
            
        } catch (err) {
            console.log(err.response)
        }
    },
    data(){
        return{

            categoryID: null,
            ownerID: null,
            title: "",
            price: "",
            description: "",
            selectedFile: null,
            stockQuantity: "",
            fileName: ""
        };
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0],
            console.log(this.selectedFile)
            this.fileName = event.target.files[0].name
        },
    async onUpdateProduct(){
        let data = new FormData();
        data.append("title", this.title);
        data.append("price", this.price);
        data.append("description", this.description);
        data.append("ownerID", this.ownerID);
        data.append("stockQuantity", this.stockQuantity);
        data.append("categoryID", this.categoryID);
        data.append("photo", this.selectedFile, this.fileName);

        let result = await this.$axios.$put(`http://localhost:8000/api/products/${this.$route.params.id}`, data);
        this.$router.push("/")
    }
    }
}
</script>