// Récupérer la valeur de l'ID du produit à partir des paramètres de l'URL
var produitId = urlParams.get('id');

// Utiliser l'ID du produit pour récupérer les informations du produit à partir de votre source de données (par exemple, une base de données ou un service API)

fetch('http://localhost:3000/api/products' + productId) /
  .then(function(response) {
    return response.json();
  })
  .then(function(product) {
    
    document.getElementById('title').textContent = product.nom; // Remplacez 'nomProduit' par l'ID ou la classe de l'élément HTML pour afficher le nom du produit
    document.getElementById('item__content__description__title').textContent = product.description; // Remplacez 'descriptionProduit' par l'ID ou la classe de l'élément HTML pour afficher la description du produit
    document.getElementById('item_img').src = product.imageUrl; // l'ID ou la classe de l'élément HTML pour afficher l'image du produit
    document.getElementById('prixProduit').textContent = produit.prix + ' €'; // Remplacez 'prixProduit' par l'ID ou la classe de l'élément HTML pour afficher le prix du produit
  })
  .catch(function(error) {
    console.error('Erreur lors de la récupération des informations du produit :', error);
  });