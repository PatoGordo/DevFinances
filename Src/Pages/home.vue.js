const Home = Vue.component('Home', {
	data: function () {
		return {
			title: "Dev Finance$ - Home",
			isDark: null,
			isModalOpen: false
		}
	},
	methods:{
		changeTheme(){
			if(localStorage.getItem('theme') == 'dark'){
				localStorage.setItem('theme', 'default')
				document.body.classList.toggle('dark')
				this.isDark = false
			}else{
				localStorage.setItem('theme', 'dark')
				document.body.classList.toggle('dark')
				this.isDark = true
			}
		},
		openModal(){
			document.querySelector('.modal-overlay').classList.toggle('active')
		}
	},
	created() {
		if(localStorage.getItem('theme') == 'dark'){
			this.isDark = true
		}else{
			this.isDark = false
		}
	},
	template: `
	<div class="component home">

		<header>
			<div class="toggler" @click="changeTheme()">
				<ion-icon class="header-icon" :id="isDark ? 'sun' : 'moon'" :name=" isDark ? 'sunny-outline' : 'moon-outline'"></ion-icon>
			</div>
			
			<img class="logo" src="Src/Images/logo.svg" alt="Dev Finances">
		</header>
		<main class="container">
			<section class="balance">
				<h2 class="sr-only">Balanço</h2>
				
				<div class="card">
					<h3>
						<span>Entradas</span>
						<ion-icon class="card-icon up" name="arrow-up-circle-outline" alt="Imagem de entradas"></ion-icon>
					</h3>
					<p id="balanceIncomes">R$ 00,00</p>
				</div>
				<div class="card">
					<h3>
						<span>Saidas</span>
						<ion-icon class="card-icon down" name="arrow-down-circle-outline" alt="Imagem de entradas"></ion-icon>
					</h3>
					<p id="balanceExpenses">R$ 00,00</p>
				</div>
				<div class="card total">
					<h3>
						<span>Total</span>
						<span class="material-icons card-icon total">monetization_on</span>
					</h3>
					<p id="balanceTotal">R$ 00,00</p>
				</div>
			</section>
			
			<section class="transaction">
				<h2 class="sr-only">Transações</h2>
				<a class="button new" @click="openModal()"><ion-icon name="add-circle-outline"></ion-icon> Nova Transação</a>
				<table class="data-table">
					<thead>
						<tr>
							<th>Descrição</th>
							<th>Valor</th>
							<th>Data</th>
							<th></th>
						</tr>
					</thead>
					<tbody id="transactionsList">
						
					</tbody>
				</table>
			</section>
		</main>
		<dk-modal />
		<div class="button-div">
			<button class="add-button">
				<ion-icon class="icon-button"></ion-icon>
				Instalar aplicativo
			</button>
		<button @click="openModal()" class="add-button-fixed"><ion-icon name="add-outline"></ion-icon></button>
		<footer style="width: min(80%, 420px)">Dev Finances, por: <a href="https://github.com/patogordo" target="_blank">Pato Gordo</a><br /><a href="https://patogordo.ga/#/feedback?lang=pt" target="_blank">Clique aqui</a> caso você queira me enviar um feedback reportando erros ou dando sua opinião sobre o projeto.</footer>
	</div>`
})