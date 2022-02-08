<template>
    <main>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3"></div>
                 <div class="col-sm-6">
                     <div class="a-spacing-top-medium"></div>
                     <h2 class="center">Profile Page</h2>
                     <a href="#" @click="onLogout">Logout</a>
                     <form >
                            <!--Name -->
                            <div class="a-spacing-top-medium">
                                <label>Name</label>
                                <input type="text" v-model="name" class="a-input-text width" :placeholder="$auth.$state.user.name">
                            </div>
                            <!--Email -->
                            <div class="a-spacing-top-medium">
                                <label>Email</label>
                                <input type="text" v-model="email" class="a-input-text width" :placeholder="$auth.$state.user.email">
                            </div>
                            <!--Password -->
                            <div class="a-spacing-top-medium">
                                <label>Password</label>
                                <input type="text" v-model="password" class="a-input-text width">
                            </div>
                            
                             <!--button -->
                            <div class="a-spacing-top-large">
                                <span class="a-button-register">
                                    <span class="a-button-inner">
                                        <span class="a-button-text" @click="onUpdateProfile">Update Profile</span>
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
 data(){
     return{
         name: "",
         email: "",
         password: "",
     }
 },

methods:{
  async onUpdateProfile(){
      let data = {
name: this.name,
email: this.email,
password: this.password
      }
      try {
       let response = await this.$axios.$put("/api/auth/user", data)  
       if (response.success) {
           this.name = "",
           this.email = "",
           this.password = "";
           await this.$auth.fetchUser();
       }

      } catch (err) {
          console.log(err)
      }
  },
  async onLogout(){
      await this.$auth.logout();
  }
}
}
</script>