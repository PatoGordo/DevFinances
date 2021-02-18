const About = Vue.component('About', {
  data: function () {
    return {
			giant: "ABOUT",
  		title: "VueRouter CDN Template with Less - About"
    }
  },
	methods:{
		
	},
	created(){
		document.title = this.title 
	},
  template: `
	<div class="component about">
		<h1><strong>{{ giant }}</strong></h1>
		<h3>Project by <a href="https://github.com/PatoGordo">PatoGordo</a></h3>
	</div>
	`
})