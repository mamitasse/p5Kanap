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
      article.innerHTML=`<article class="cart__item" data-id="${element.product._id}" data-color="${element.color}"><div class="cart__item__img">
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
              <p>Qté :${element.quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
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

      console.log(element);
      console.log(element.product._id);
      console.log(element.color);
      console.log(element.product.name);
      console.log(element.product.price);
      console.log(element.quantity);
      console.log(element.img);
      console.log(element.product.altTxt);
    });
  }
  price.innerText = sumPrices.toFixed(2);
  quantity.innerText = sumQuantity;
};

createArticle(); // Appel de la fonction pour afficher les articles du panier da