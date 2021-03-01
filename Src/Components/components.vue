Vue.component('dk-modal', {
	props: ['state'],
  data: function () {
    return {
			creditOrDebit: null,
			transaction:{
				id: transactions.length + 1,
				description: '',
				amount: 0.00,
				date: new Date().toISOString().split('T')[0]
			}
    }
  },
	methods:{
		closeModal(){
			document.querySelector('.modal-overlay').classList.toggle('active')
			setTimeout(() => {this.creditOrDebit = null}, 500)
		},
		addTransaction(){
			if(this.transaction.description != '' && this.transaction.amount != null && this.transaction.date != null){
				if(this.creditOrDebit == 0){
					this.transaction.amount = Math.abs(this.transaction.amount)
				}else{
					this.transaction.amount = Math.abs(this.transaction.amount) * -1
				}
				Transaction.add({
					id: this.transaction.id,
					description: this.transaction.description,
					amount: Utils.formatAmount(this.transaction.amount),
					date: Utils.formatDate(this.transaction.date)
				})
				this.transaction.id++
				this.transaction.description = ''
				this.transaction.amount = 0.00
				this.transaction.date = new Date().toISOString().split('T')[0]
				this.closeModal()
			}else{
				alert('Por favor preencha todos os valores.')
			}
		}
	},
	created(){
		window.onclick = (e) => {
			if (e.target == document.querySelector('.modal-overlay')) {
				this.creditOrDebit = null				
				document.querySelector('.modal-overlay').classList.toggle('active')
			}
		}
	},
  template: `
	<div class="modal-overlay">
		<div class="modal">
			<h2  :style="creditOrDebit != null ? 'display: none;' : 'display: block'">Qual o tipo de transação?</h2>
			<div class="modal-content">
				<a @click="creditOrDebit = 0" class="credito" :style="creditOrDebit != null ? 'display: none;' : 'display: flex'"><ion-icon name="arrow-up-circle-outline"></ion-icon> Crédito</a>
				<a @click="creditOrDebit = 1" class="debito" :style="creditOrDebit != null ? 'display: none;' : 'display: flex'"><ion-icon name="arrow-down-circle-outline"></ion-icon> Débito</a>
				<div class="form" :style="creditOrDebit != null ? 'display: flex;' : 'display: none'">
					<h2 :class="creditOrDebit == 0? 'green' : 'red'">Nova Transação ({{creditOrDebit == 0? 'Crédito' : 'Débito'}})</h2>
					<form @submit.prevent="addTransaction()">
						<label class="input-label">
							<label for="description" class="sr-only">Descrição</label>
							<input type="text" id="description" name="description" v-model="transaction.description" placeholder="Descrição" required/>
						</label>
						<label class="input-label">
							<label for="amount" class="sr-only">Valor</label>
							<span><p :class="creditOrDebit == 0 ? 'credit' : 'debit'">{{creditOrDebit == 0 ? ' + ' : ' - '}}</p><input type="number" step="0.01" id="amount" name="amount" v-model="transaction.amount" placeholder="0,00" required/></span>
						</label>
						<label class="input-label">
							<label for="date" class="sr-only">Data</label>
							<input type="date" id="date" name="date" v-model="transaction.date" placeholder="Data" required/>
						</label>
						<div class="input-label actions">
							<a class="button-cancel" @click="closeModal()">Cancelar</a>
							<button type="submit">Salvar</button>
						</div>
					</form>
				</div>
			</div>
		</modal
	</div>
	`
})

Vue.component('dk-modal-edit', {
	props: ['index', 'description', 'amount', 'date'],
  data: function () {
    return {
			creditOrDebit: null,
			transaction:{
				id: transactions.length + 1,
				description: this.description,
				amount: this.amount,
				date: this.date
			}
    }
  },
	methods:{
		closeModal(){
			document.querySelector('.modal-overlay').classList.toggle('active')
			setTimeout(() => {this.creditOrDebit = null}, 500)
		},
		editTransaction(){
			if(this.transaction.description != '' && this.transaction.amount != null && this.transaction.date != null){
				if(this.creditOrDebit == 0){
					this.transaction.amount = Math.abs(this.transaction.amount)
				}else{
					this.transaction.amount = Math.abs(this.transaction.amount) * -1
				}
				Transaction.editTransaction({
					id: this.transaction.id,
					description: this.transaction.description,
					amount: Utils.formatAmount(this.transaction.amount),
					date: Utils.formatDate(this.transaction.date)
				}, this.index)
				this.transaction.id++
				this.transaction.description = ''
				this.transaction.amount = 0.00
				this.transaction.date = new Date().toISOString().split('T')[0]
				this.closeModal()
			}else{
				alert('Por favor preencha todos os valores.')
			}
		}
	},
	created(){
		window.onclick = (e) => {
			if (e.target == document.querySelector('.modal-overlay')) {
				this.creditOrDebit = null				
				document.querySelector('.modal-overlay').classList.toggle('active')
			}
		}
	},
  template: `
	<div class="modal-overlay edit">
		<div class="modal">
			<h2  :style="creditOrDebit != null ? 'display: none;' : 'display: block'">Qual o tipo de transação? (edição)</h2>
			<div class="modal-content">
				<a @click="creditOrDebit = 0" class="credito" :style="creditOrDebit != null ? 'display: none;' : 'display: flex'"><ion-icon name="arrow-up-circle-outline"></ion-icon> Crédito</a>
				<a @click="creditOrDebit = 1" class="debito" :style="creditOrDebit != null ? 'display: none;' : 'display: flex'"><ion-icon name="arrow-down-circle-outline"></ion-icon> Débito</a>
				<div class="form" :style="creditOrDebit != null ? 'display: flex;' : 'display: none'">
					<h2 :class="creditOrDebit == 0? 'green' : 'red'">Nova Transação ({{creditOrDebit == 0? 'Crédito' : 'Débito'}})</h2>
					<form @submit.prevent="editTransaction()">
						<label class="input-label">
							<label for="description" class="sr-only">Descrição</label>
							<input type="text" id="edit-description" name="description" v-model="transaction.description" placeholder="Descrição" required/>
						</label>
						<label class="input-label">
							<label for="amount" class="sr-only">Valor</label>
							<span><p :class="creditOrDebit == 0 ? 'credit' : 'debit'">{{creditOrDebit == 0 ? ' + ' : ' - '}}</p><input type="number" step="0.01" id="amount" name="edit-amount" v-model="transaction.amount" placeholder="0,00" required/></span>
						</label>
						<label class="input-label">
							<label for="date" class="sr-only">Data</label>
							<input type="date" id="edit-date" name="date" v-model="transaction.date" placeholder="Data" required/>
						</label>
						<div class="input-label actions">
							<a class="button-cancel" @click="closeModal()">Cancelar</a>
							<button type="submit">Salvar</button>
						</div>
					</form>
				</div>
			</div>
		</modal
	</div>
	`
})

Vue.component('dk-modal-pwa', {
	props: ['state'],
  data: function () {
    return {
			
    }
  },
	methods:{
		closeModal(){
			document.querySelector('.modal-overlay.pwa').classList.toggle('active')
			setTimeout(() => {this.creditOrDebit = null}, 500)
		}
	},
	created(){
		
	},
  template: `
	<div class="modal-overlay.pwa">
		<div class="modal">
			<div class="modal-content">
				<button @click="close">Ok e fechar</button>
			</div>
		</modal
	</div>
	`
})