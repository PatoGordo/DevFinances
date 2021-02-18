const Page404 = Vue.component('Page404', {
  data: function () {
    return {
			giant: "Page404",
			title: "Page not found"
    }
  },
	created(){
		document.title = this.title 
	},
  template: `
	<div class="component 404">
		<h1><strong>{{ giant }}</strong></h1>
		<router-link to="/">Return to home</router-link>
	</div>`
})