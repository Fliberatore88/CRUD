const fs = require('fs');
const path = require('path');
const { measureMemory } = require('vm');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products, newProduct: this.store})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		const idToFind = req.params.id
		const product = products.find ( p =>  p.id == idToFind )
		const discounted = Math.round(product.price - (product.price * product.discount) / 100)
		
		return res.render ('detail', { product,discounted })
	},

	// Create - Form to create
	create: (req, res) => {
		const idToFind = req.params.id
		const product = products.find ( p =>  p.id == idToFind )
		return res.render ('product-create-form', {product})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		const newProduct =  req.body;

		newProduct.id = products.length + 1;
		newProduct.price = Number(newProduct.price);
		newProduct.image = req.file.filename;

		if (newProduct.discount == '') {
			newProduct.discount = 0
		} else {
			newProduct.discount = Number(newProduct.discount)
		}
		products.push (newProduct)

	 fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
		console.log(newProduct)

		res.redirect ('/products')

	},

	// Update - Form to edit
	edit: (req, res) => {
		const idToFind = req.params.id
		const product = products.find ( p =>  p.id == idToFind )
		
		res.render ('product-edit-form', {product})
	},
	// Update - Method to update
	update: (req, res) => {
		const idToFind = req.body.id;
		const product = products.find ( (p) => p.id == idToFind)
		const editedProduct = product = {
			id: req.params.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}
		return res.send('Ponele que se editó el producto')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		const idToFind = req.body.id;
		const deleteProduct = products.find ( (p) => p.id == idToFind)
		return res.send('Ponele que se borró el producto')
	}
};

module.exports = controller;