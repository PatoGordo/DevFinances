const app = new Vue({
	router, //router from Src/router.js
	el: "#app",
	data: {

	},
	template: `
		<div id="app">
			<app-navbar /><!-- Component from: Src/Components/navbar.vue.js -->
			<router-view></router-view>
		</div>
	`
}).$mount("#app")