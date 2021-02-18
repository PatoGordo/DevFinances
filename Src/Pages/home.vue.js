const Home = Vue.component('Home', {
  data: function () {
    return {
			giant: "HOME",
  		title: "VueRouter CDN Template with Less - Home"
    }
  },
	created(){
		document.title = this.title 
	},
  template: `
	<div class="component home">
		<h1><strong>{{ giant }}</strong></h1>
		<img src="https://github-readme-stats.vercel.app/api/pin/?username=patogordo&repo=VueRouterCDNTemplateWithLess&show_owner=false" alt="" />
		<p>Card by <a href="https://github.com/anuraghazra">Anurag Hazra</a></p>
	</div>`
})