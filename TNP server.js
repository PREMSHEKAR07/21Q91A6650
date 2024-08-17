const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;


const productsFilePath = path.join(__dirname, 'products.json');


const loadProducts = () => {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
};


app.get('/test/companies/:companyname/categories/:categoryname/products', (req, res) => {
    const { companyname, categoryname } = req.params;
    const top = parseInt(req.query.top, 10) || 10; 
    const minPrice = parseInt(req.query.minPrice, 10) || 0; 
    const maxPrice = parseInt(req.query.maxPrice, 10) || Infinity; 

    const products = loadProducts();

    
    let filteredProducts = products.filter(product => 
        product.company === companyname &&
        product.category === categoryname &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

    
    filteredProducts = filteredProducts.slice(0, top);

    
    const response = filteredProducts.map(product => ({
        productName: product.productName,
        price: product.price,
        rating: product.rating,
        discount: product.discount,
        availability: product.availability
    }));

    res.json(response);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});
