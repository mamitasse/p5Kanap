
// Récupérer la valeur de l'ID du produit à partir des paramètres de l'URL
let url = window.location.href;
let productId = url.split(`?`)[1];

 // Récupérer les produits déjà ajoutés au panier depuis localStorage
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
fetch(`http://localhost:3000/api/products/` + productId)
  .then(function (response) {
    return response.json();
  })
  .then((product) => {
    document.getElementById("title").textContent = product.name;
    document.getElementById("description").textContent = product.description;
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src=${product.imageUrl} alt='${product.altTxt}'>`;
    document.getElementById("price").textContent = product.price;

    // Récupérer l'élément HTML pour afficher les couleurs
    let colorsElement = document.getElementById("colors");
    
    // Mettre à jour le contenu de l'élément HTML avec les couleurs du produit
    colorsElement.textContent = product.colors;

    // Parcourir les couleurs et ajouter les options au menu déroulant
    for (let i = 0; i < product.colors.length; i++) {
      let optionElement = document.createElement("option");
      optionElement.value = product.colors[i];
      optionElement.textContent = product.colors[i];
      colorsElement.appendChild(optionElement);
    }
   
    // Récupérer l'élément HTML pour la quantité et le bouton d'ajout au panier
    let quantityElement = document.getElementById("quantity");
    let addToCartButton = document.getElementById("addToCart");

    // gestionnaire d'événements pour le bouton d'ajout au panier
    addToCartButton.addEventListener("click", function () {
      // Récupérer la quantité saisie par l'utilisateur
      let quantity = parseInt(quantityElement.value);
      let productColors = document.getElementById('colors').value

      // Vérifier si la quantité est un nombre valide
      if (isNaN(quantity) || quantity <= 0 || quantity > 100) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }
    

   

     // Vérifier si le produit est déjà présent dans le panier
      let existingProductIndex = cart.findIndex((item) => {
        return item.product._id === product._id && item.color === productColors;
      });

      // Si le produit est déjà présent dans le panier, mettre à jour la quantité
      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } 
      // Sinon, ajouter un nouvel article au panier
      else {
        let productToAddToCart = {
          product: product,
          quantity: quantity,
          color: productColors,
          img: product.imageUrl,
          price: product.price,
          id: product._id
        };
        cart.push(productToAddToCart);
        alert('vous avez ajouté cet article dans votre panier');
      }

      // Mettre à jour le panier dans localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log(cart);
    });
  });