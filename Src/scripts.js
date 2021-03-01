const PWA = {
	init(){
		let deferredPrompt
		const addBtn = document.querySelector('.add-button')
		const iconBtn = document.querySelector('.icon-button')
		addBtn.style.display = 'none'

		var mobileType = this.getMobileOperatingSystem()
		if( mobileType == "Android" ){
			iconBtn.name = 'logo-google-playstore'
		}else if( mobileType == "iOS" ){
			iconBtn.name = 'logo-apple-appstore'
		}else{
			iconBtn.name = 'storefront-outline'
		}

		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault()
			// Stash the event so it can be triggered later.
			deferredPrompt = e
			// Update UI to notify the user they can add to home screen
			addBtn.style.display = 'flex'

			addBtn.addEventListener('click', (e) => {
				// hide our user interface that shows our A2HS button
				addBtn.style.display = 'none'
				// Show the prompt
				deferredPrompt.prompt()
				// Wait for the user to respond to the prompt
				deferredPrompt.userChoice.then((choiceResult) => {
					if (choiceResult.outcome === 'accepted') {
						alert('A instalação pode demorar um pouco!\n\nPor favor fique na página!')
					} else {
						addBtn.style.display = 'flex'
					}
					deferredPrompt = null
				})
			})
		})
	},
	getMobileOperatingSystem() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera

		if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
			return 'iOS'
		}else if(userAgent.match( /Android/i )){
			return 'Android'
		}else{
			return 'unknown'
		}
	}
}

const App = {
	init(){
		DOM.refreshValues()
		PWA.init()
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
	},
	editTransaction(transaction, index) {
    const items = Storage.get()
    const itemsUpdated = items.map((item, i) => {
      return (i == index) ? transaction : item
    })

    this.all = itemsUpdated
    App.reload()
  },
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