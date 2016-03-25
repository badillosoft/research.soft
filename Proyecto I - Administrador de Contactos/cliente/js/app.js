/* global $ */
var app,
	data,
	id_count = 0,
	empty = {
		id: -1,
		name: '',
		price: 0,
		count: 0
	};
	
window.onload = function () {
	data = {
		products: [
			/*{name: "Abc", price: 123, count: 0},
			{name: "Def", price: 345, count: 1},
			{name: "Ghi", price: 567, count: 2},
			{name: "Jkl", price: 789, count: 3},
			{name: "Mno", price: 901, count: 4}*/
		]
	};
	
	app = new Vue({
		el: "#app",
		data: {
			index: -1,
			text_search: '',
			new_product: empty,
			mod_product: empty,
			messages: {
				search: ''
			},
			products: []
		},
		ready: function () {
			/*var self = this;
			data.contacts.forEach(function (contact) {
				self.contacts.push(contact);
			});*/
		},
		methods: {
			selectProduct: function(index) {
				console.log('Se ha seleccionado el producto ' + index);
				console.log(this.products[index]);
				
				var p = this.products[index];
				
				this.index = index;
				this.mod_product = {
					id: p.id,
					name: p.name,
					price: p.price,
					count: p.count,
				};
			},
			addProduct: function() {
				console.log('Producto nuevo: ');
				console.log(this.new_product);
				
				data.products.push({
					id: id_count++,
					name: this.new_product.name,
					price: this.new_product.price,
					count: this.new_product.count
				});
				
				this.text_search = this.new_product.name;
				this.search();
				
				this.new_product.name = '';
				this.new_product.price = 0;
			},
			editProduct: function () {
				for (var i = 0; i < data.products.length; i++) {
					if (data.products[i].id == this.mod_product.id) {
						data.products[i] = {
							id: this.mod_product.id,
							name: this.mod_product.name,
							price: this.mod_product.price,
							count: this.mod_product.count
						};
					}
				}
				
				this.text_search = this.mod_product.name;
				this.search();
				
				this.index = -1;
				this.mod_product = empty;
			},
			closeProduct: function () {
				this.index = -1;
				this.mod_product = empty;
			},
			search: function() {
				console.log(this.text_search);
				
				var self = this;
				
				if (this.text_search) {
					var compare = function(a, b) {
						console.log('Comparando: ' + a + ' ' + b);
						return a.indexOf(b) >= 0 || b.indexOf(a) >= 0 
					};
					
					this.products = data.products.filter(function (p) {
						var words = self.text_search.trim().toLowerCase().split(' ');
						console.log(words);
						var pass = pass;
						words.forEach(function (w) {
							pass = pass || compare(w,
								p.name.trim().toLowerCase());
						});
						return pass;
					});
				} else {
					this.products = [];
					
					data.products.forEach(function (p) {
						self.products.push(p);
					});
				}
				
				this.messages.search = this.products.length > 0 ? '' :
					'No se ha encontrado ningún producto';
				
				console.log('Mensaje: ' + this.messages.search);
				
				this.text_search = '';
			}
		}
	});
	
	
};