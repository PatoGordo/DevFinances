if(localStorage.getItem('theme') == null){
	localStorage.setItem('theme', 'dark')
}else{
	localStorage.getItem('theme', 'default')
}
function getTheme(){
	return localStorage.getItem('theme')
}