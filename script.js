document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    let categories = [];
    let selectedCategory = 'Men';
  
    function fetchData() {
      fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json")
        .then(response => response.json())
        .then(data => {
          categories = data.categories;
          render();
        });
    }
  
    function handleCategoryChange(category) {
      selectedCategory = category;
      render();
    }
  
    function calculateDiscountPercentage(price, compareAtPrice) {
      if (!compareAtPrice) return 0;
      const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
      return Math.round(discount);
    }
  
    function addToCart() {
      console.log("Product added to cart");
    }
  
    function render() {
      container.innerHTML = '';
  
      const categoryButtons = document.createElement('div');
      categoryButtons.className = 'category-buttons';
      categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.category_name;
        button.className = selectedCategory === category.category_name ? 'active' : '';
        button.addEventListener('click', () => handleCategoryChange(category.category_name));
        categoryButtons.appendChild(button);
      });
  
      container.appendChild(categoryButtons);
  
      categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.style.display = selectedCategory === category.category_name ? 'block' : 'none';
        categoryDiv.innerHTML = `<h2>${category.category_name}</h2>`;
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
  
        category.category_products.forEach((product, index) => {
          const cardDiv = document.createElement('div');
          cardDiv.className = `col-md-3 card ${index === 0 ? 'wedding-special' : ''} ${index === 2 ? 'on-offer' : ''} ${index === 3 ? 'new-season' : ''}`;
          cardDiv.innerHTML = `
            <div class="card">
              <img src="${product.image}" alt="${product.title}" class="card-img-top" />
              <div class="card-body">
                <h4 class="card-title">${product.title}</h4>
                ${index === 2 ? '<div class="on-offer"></div>' : ''}
                ${index === 3 ? '<div class="new-season"></div>' : ''}
                ${product.vendor ? `<div class="vendor-info"><p class="vendor">•${product.vendor}</p></div>` : ''}
                <div class="price-info">
                  <p class="card-text">
                    <span class="price">RS.${product.price}</span>
                    ${product.compare_at_price ? `
                      <span class="compare-at-price">${product.compare_at_price}</span>
                      <span class="discount-percentage">
                        (${calculateDiscountPercentage(product.price, product.compare_at_price)}% Off)
                      </span>
                    ` : ''}
                  </p>
                </div>
                <button onclick="addToCart()" class="add-to-cart-button">Add to Cart</button>
                </div>
                </div>
              </div>
            `;
    
            rowDiv.appendChild(cardDiv);
          });
    
          categoryDiv.appendChild(rowDiv);
          container.appendChild(categoryDiv);
        });
      }
    
      fetchData();
    });
  