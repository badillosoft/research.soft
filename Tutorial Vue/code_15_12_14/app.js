/* global Vue */

var app,
	data,
	list_app;

window.onload = function () {
	data = {
		name: "Anonymous"
	};
	
	app = new Vue({
		el: '#app',
		data: data
	});
	
	list_app = new Vue({
		el: "#list_app",
		data: {
			items: [
				{name: "Alan", email: "badillo.soft@hotmail.com"},
				{name: "Other", email: "momo@example.com"}
			]
		}
	});
};