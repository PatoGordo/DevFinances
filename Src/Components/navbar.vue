Vue.component('app-navbar', {
  data: function () {
    return {

    }		
  },
	methods:{
		
	},
  template: `
	<p class="navbar">
		<router-link to="/" class="navbar-item title">Vue Router 🚀</router-link>
		<router-link to="/" class="navbar-item">Home</router-link>
		<router-link to="/about" class="navbar-item">About</router-link>
	</p>
	`
})