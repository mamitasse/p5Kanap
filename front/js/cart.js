
/**
 * Récupère le panier du localStorage
 * @returns array
 */
const getCart = () => {
  let cart = localStorage.getItem("cart");
  //Si il n'y a rien dans le panier, on retourne un tableau vide
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
};
const addToCart = (product, color) => {
  let cart = getCart();
  let key = `${product._id}_${color}`;
  if (key in cart) {
    cart[key]++;
  } else {
    cart[key] = 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
};
const section = document.getElementById("cart__items");
const price = document.getElementById("totalPrice");
const quantity = document.getElementById("totalQuantity");

// Afficher chaque article du panier dans le DOM
const createArticle = () => {
  console.log(section.children);
  let sumPrices = 0;
  let sumQuantity = 0;
  // Eviter les doublons
  while (section.children.length > 0) {
    section.removeChild(section.childNodes[0]);
  }
  const localStorageProduct = getCart();
  if (localStorageProduct.length == 0) {
    section.innerText = "Votre panier est vide";
  } else {
    localStorageProduct.forEach(element => {
      let article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", element.product._id);
      article.setAttribute("data-color", element.color);
      article.innerHTML = `<article class="cart__item" data-id="${element.product._id}" data-color="${element.color}"><div class="cart__item__img">
          <img src="${element.img}" alt="${element.product.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${element.product.name}</h2>
            <p>${element.color}</p>
            <p>${element.product.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
        </article>
      `;
      
      section.appendChild(article);
      sumPrices += element.product.price * element.quantity;
      sumQuantity += element.quantity;
      
    });
  }
  price.innerText = sumPrices.toFixed(2);
  quantity.innerText = sumQuantity;

  // Ajouter l'événement pour changer la quantité au changement de la valeur de l'input

  /* On récupère ici tous les inputs portants la classe itemQuantity. GetElementsByClassName va donc créer un tableau
  regroupant toutes les balises itemQuantity  */
  let quantityInputs = document.getElementsByClassName("itemQuantity");

  /* On parcourt le tableau quantityInputs avec une boucle */
  for (let i = 0; i < quantityInputs.length; i++) {

    /*Pour chaque élément parcouru, on lui ajoute un event listener "change",
    ainsi, lorsque la quantité d'un input est changée, cela sera directement détecté
    et l'event listener s'activera */
    quantityInputs[i].addEventListener("change", function (e) {

      
      /* ON définit des variables pour mettre à jour le prix et la quantité globale, après la maj du cart */
      let sumPrices = 0;
      let sumQuantity = 0;
      
      /* On récupère le panier avec la fonction getCart() que l'on a créé plus haut, à la ligne 5
      Nous le récupérons car nous avons besoin de mettre à jour le localStorage */
      let cart = getCart();
      console.log('change', e.target.value, cart)

      /* On récupère ensuite l'id de l'élément cliqué au moment où l'utilisateur a changé la quantité */
      let dataId = this.closest("article").getAttribute("data-id")

      /* On récupère pour finir la couleur de l'élément cliqué au moment où l'utilisateur a changé la quantité*/
      let dataColor = this.closest("article").getAttribute("data-color")

      /* Cette fois, nous devons parcourir le panier pour pouvoir le mettre à jour, c'est pour cela que nous 
      créons une deuxième boucle avec l'index j, et non pas i, pour ne pas mélanger les indexs deux boucles */
      for (let j = 0; j < cart.length; j++) {

        /* ici, j'ajoute une condition, je vérifie que l'id de l'élément contenu dans le panier correspond bien à l'id de l'élément
        cliqué, et je fais la meme vérification pour la couleur */
        if (cart[j].id === dataId && cart[j].color === dataColor) {

          /* si la condition ci dessus est remplie, alors je met à jour la quantité de l'élément concerné dans le panier */
          cart[j].quantity = parseInt(e.target.value)
        }
        
        /* Ici, nous devons maintenant calculer la nouvelle somme totale de la page */
        sumPrices += cart[j].price * cart[j].quantity;
        sumQuantity += cart[j].quantity;
      }
      /* Pour finir, maintenant que le panier a été mis à jour, je le met à jour aussi dans le local storage */
      localStorage.setItem("cart", JSON.stringify(cart))

      /* On met à jour l'affichage de la somme totale du prix */
      price.innerText = sumPrices.toFixed(2);
      quantity.innerText = sumQuantity;

      
    });
    
  }
  
};

createArticle(); // Appel de la fonction pour afficher les articles du panier

// Récupérer les données du panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("cart"));

// Fonction pour supprimer un article du panier
function deleteArticle(productId, color) {
  // Trouver l'article correspondant
  let index = cart.findIndex((article) => article.id === productId && article.color === color);

  // Supprimer l'article s'il est trouvé
  if (index !== -1) {
    cart.splice(index, 1);
  }

  // Mettre à jour le panier dans le localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Mettre à jour l'affichage du panier
  createArticle();
}

// Ajouter un gestionnaire d'événements pour le bouton "Supprimer"
const deleteButtons = document.getElementsByClassName("deleteItem");
for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", function () {
    let article = this.closest("article");
    let productId = article.getAttribute("data-id");
    let color = article.getAttribute("data-color");

    // Appeler la fonction de suppression avec les bons arguments
    deleteArticle(productId, color);
  });
}
