const Home = Vue.component('Home', {
	data: function () {
		return {
			title: "Dev Finance$ - Home",
			isDark: null,
			balance:{
				total: 3000.00
			}
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
			
			<img class="logo" @click="changeTheme()" src="Src/Images/logo.svg" alt="Dev Finances">
		</header>
		<main class="container">
			<section class="balance">
				<h2 class="sr-only">Balanço</h2>
				
				<div class="card">
					<h3>
						<span>Entradas</span>
						<ion-icon class="card-icon up" name="arrow-up-circle-outline" alt="Imagem de entradas"></ion-icon>
					</h3>
					<p>R$ 5.000,00</p>
				</div>
				<div class="card">
					<h3>
						<span>Saidas</span>
						<ion-icon class="card-icon down" name="arrow-down-circle-outline" alt="Imagem de entradas"></ion-icon>
					</h3>
					<p>R$ 2.000,00</p>
				</div>
				<div class="card total">
					<h3>
						<span>Total</span>
						<span class="material-icons card-icon total">monetization_on</span>
					</h3>
					<p>R$ 3.000,00</p>
				</div>
			</section>
			
			<section class="transaction">
				<h2 class="sr-only">Transações</h2>
				<a href="#" class="button new"><ion-icon name="add-circle-outline"></ion-icon> Nova Transação</a>
				<table class="data-table">
					<thead>
						<tr>
							<th>Descrição</th>
							<th>Valor</th>
							<th>Data</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="description">Luz</td>
							<td class="expense">- R$ 250,00</td>
							<td class="date">2/02/2021</td>
							<td><ion-icon name="remove-circle-outline" class="transaction-icon" alt="remover trnasação"></ion-icon></td>
						</tr>
						<tr>
							<td class="description">Agua</td>
							<td class="expense">- R$ 140,00</td>
							<td class="date">5/02/2021</td>
							<td><ion-icon name="remove-circle-outline" class="transaction-icon" alt="remover trnasação"></ion-icon></td>
						</tr>
						<tr>
							<td class="description">Internet</td>
							<td class="expense">- R$ 99,90</td>
							<td class="date">1/02/2021</td>
							<td><ion-icon name="remove-circle-outline" class="transaction-icon" alt="remover trnasação"></ion-icon></td>
						</tr>
						<tr>
							<td class="description">Freela</td>
							<td class="income">R$ 2500,00</td>
							<td class="date">10/02/2021</td>
							<td><ion-icon name="remove-circle-outline" class="transaction-icon" alt="remover trnasação"></ion-icon></td>
						</tr>
					</tbody>
				</table>
			</section>			
		</main>
		<dk-modal />
		<footer>Dev Finances, by: <a href="https://github.com/patogordo" target="_blank">Pato Gordo</a></footer>
	</div>`
})