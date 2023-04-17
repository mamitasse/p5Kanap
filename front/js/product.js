// Récupérer la valeur de l'ID du produit à partir des paramètres de l'URL
let url = window.location.href;
let productId = url.split(`?`)[1];
fetch(`http://localhost:3000/api/products/` + productId)
  .then(function (response) {
    return response.json();
  })
  .then((product) => {
    console.log(product);
    document.getElementById("title").textContent = product.name;
    document.getElementById("description").textContent = product.description;
    document.querySelector(
      ".item__img"
    ).innerHTML = `<img src=${product.imageUrl} alt='${product.altTxt}'>`;
    document.getElementById("price").textContent = product.price;

    // Récupérer l'élément HTML pour afficher les couleurs
    let colorsElement = document.getElementById("colors");

    // Récupérer les données des couleurs du produit
    product = {
      colors: product.colors,
      name: product.name,
      price: product.price,
      id: product.id,
    };

    // Mettre à jour le contenu de l'élément HTML avec les couleurs du produit
    colorsElement.textContent = product.colors;

    // Parcourir les couleurs et ajouter les options au menu déroulant
    for (let i = 0; i < product.colors.length; i++) {
      let optionElement = document.createElement("option");
      optionElement.value = product.colors[i];
      optionElement.textContent = product.colors[i];
      colorsElement.appendChild(optionElement);
    }
    // Ajouter un gestionnaire d'événements pour le menu déroulant
    colorsElement.addEventListener("change", function (event) {
      // Récupérer la couleur sélectionnée
      let selectedColor = event.target.value;

      // Mettre à jour le contenu de l'élément HTML avec la couleur sélectionnée
      product.selectedColor = selectedColor;
      productColors = selectedColor;
      console.log(productColors);
    });
    // Récupérer l'élément HTML pour la quantité et le bouton d'ajout au panier
    let quantityElement = document.getElementById("quantity");
    let addToCartButton = document.getElementById("addToCart");

    // gestionnaire d'événements pour le bouton d'ajout au panier
    addToCartButton.addEventListener("click", function () {
      // Récupérer la quantité saisie par l'utilisateur
      let quantity = parseInt(quantityElement.value);

      // Vérifier si la quantité est un nombre valide
      if (isNaN(quantity) || quantity <= 0 || quantity > 100) {
        alert("Veuillez entrer une quantité valide.");
        return;
      }

      // Ajouter la quantité et le produit au panier
      let productToAddToCart = {
   
        product: product,
        quantity: quantity,
        color:productColors
      };
      console.log(productToAddToCart);
      console.log(quantity);
    });
    // Récupérer l'élément HTML pour afficher les couleurs
    let nameElement = document.getElementById("title");
    let priceElement = document.getElementById("price");

    product = {
      id: productId,
      name: product.name,
      color: product.color,
      price: product.price,
      quantity: quantity,
    };
    console.log(product);
    // Récupérer les produits déjà ajoutés au panier depuis localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Ajouter le produit sélectionné à la liste des produits du panier
    cartItems.push(product);
    console.log(cartItems);
    
  });
 
