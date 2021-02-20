const routes = [
	//set your routes here
  { path: '/', component: Home },

	
  { path: '*', component: Page404 }
]

const router = new VueRouter({
  routes
})
