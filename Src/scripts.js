const App = {
	init(){
		DOM.refreshValues()

		Storage.set(Transaction.all)
	},
	reload(){
		this.init()
	}
}

const Storage = {
	get(){
		return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
	},
	set(transactions){
		return localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
	}
}

const Transaction = {
	all: Storage.get(),
	add(transaction){
		this.all.push(transaction)
		App.reload()
	},
	remove(index){
		this.all.splice(index, 1)
		App.reload()
	},
	incomes(){
		let income = 0
		this.all.forEach((transaction) => {
			if(transaction.amount > 0){
				income += transaction.amount
			}
		})
		return income
	},
	expenses(){
		let expense = 0
		this.all.forEach((transaction) => {
			if(transaction.amount < 0){
				expense += transaction.amount
			}
		})
		return expense
	},
	total(){
		return this.incomes() + this.expenses()
	}
}

const Utils = {
	formatCurrency(value){
		const signal = Number(value) < 0 ? '-' : ''
		value = String(value).replace(/\D/g, '')
		value = Number(value) / 100
		value = value.toLocaleString('pt-BR', { 
			style: 'currency',
			currency: 'BRL'
		})
		return signal + value
	},
	formatAmount(value){
		value = Number(value) * 100

		return value
	},
	formatDate(date){
		let splittedDate = date.split('-')
		return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
	}
}

const DOM = {
	refreshValues(){
		document.querySelector('#balanceIncomes').innerHTML = Utils.formatCurrency(Updates.incomes())
		document.querySelector('#balanceExpenses').innerHTML = Utils.formatCurrency(Updates.expenses())
		document.querySelector('#balanceTotal').innerHTML = Utils.formatCurrency(Updates.total())
		document.querySelector('#transactionsList').innerHTML = ''

		Transaction.all.forEach((item, index) => {
			document.querySelector('#transactionsList').innerHTML += `
				<tr key="${index}">
					<td class="description">${item.description}</td>
					<td class="${item.amount > 0 ? 'income' : 'expense'}">${Utils.formatCurrency(item.amount)}</td>
					<td class="date">${item.date}</td>
					<td onclick="Transaction.remove(${index})"><ion-icon name="remove-circle-outline" class="transaction-icon" alt="remover trnasação"></ion-icon></td>
				</tr>
			`
		})
	}
}

const Updates = {
	incomes(){
		return Transaction.incomes()
	},
	expenses(){
		return Transaction.expenses()
	},
	total(){
		return Transaction.total()
	}
}

App.init()