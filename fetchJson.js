const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
    const products = response.data.products;

    // Convert the object into an array for sorting
    const productsArray = Object.keys(products).map(key => ({
      id: key,
      subcategory: products[key].subcategory,
      title: products[key].title,
      price: parseInt(products[key].price),
      popularity: parseInt(products[key].popularity)
    }));

    // Sort products by popularity in descending order
    productsArray.sort((a, b) => b.popularity - a.popularity);

    // Display products sorted by popularity
    console.log('Products sorted by descending popularity:');
    productsArray.forEach(product => {
      console.log(`Title: ${product.title}, Price: ${product.price}, Popularity: ${product.popularity}`);
    });

    // Optionally, return the sorted array for further manipulation or display
    return productsArray;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchData();
