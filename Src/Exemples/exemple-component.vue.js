Vue.component('app-exemple-component', {
  data: function () {
    return {
      count: 0
    }		
  },
	methods:{
		add: function(){
			this.count++
			console.log(this.count)
		}
	},
  template: `
	<div class="component exemple-component">
		<button v-on:click={ add() }>add {{ count }}</button>
	</div>
	`
})