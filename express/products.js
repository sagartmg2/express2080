/* make a function to fetchProducts, createProducts */

const fetchProducts = () => {
  console.log("list of products.");
};

const createProducts = () => {
  console.log("created products.");
};

/* default export
    module.exports = fetchProducts
    module.exports = createProducts
*/

/* named exports */
module.exports = {
  "retrive": fetchProducts,
  "store": createProducts,
  "createProducts": createProducts,
  fetchProducts,
};
