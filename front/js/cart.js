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

const section = document.getElementById("cart__items");
const price = document.getElementById("totalPrice");
const quantity = document.getElementById("totalQuantity");

//Afficher chaque article du panier dans le DOM

const createArticle = () => {
  console.log(section.children);
  let sumPrices = 0;
  let sumQuantity = 0;
  //Eviter les doublons
  while (section.children.length > 0) {
    section.removeChild(section.childNodes[0]);
  }
  const localStorageProduct = getCart();
  console.log(localStorageProduct);
  if (localStorageProduct.length == 0) {
    section.innerText = "Votre panier est vide";
  } else {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((res) => {
        for (let product of res) {
          for (let article of localStorageProduct) {
            if (product._id == article.id) {
              sumPrices += article.quantity * product.price;
              sumQuantity += article.quantity;
              let productArticle = document.createElement("article");

              productArticle.classList.add("cart__item");
              productArticle.setAttribute("data-id", article.id);
              productArticle.setAttribute("data-color", article.color);
              section.appendChild(productArticle);

              let productDivImg = document.createElement("div");
              productDivImg.classList.add("cart__item__img");
              productArticle.appendChild(productDivImg);

              let productImg = document.createElement("img");
              productDivImg.appendChild(productImg);
              productImg.setAttribute("src", product.imageUrl);
              productImg.setAttribute("alt", product.altTxt);

              let cartItemContent = document.createElement("div");
              cartItemContent.classList.add("cart__item__content");
              productArticle.appendChild(cartItemContent);

              let cartItemContentDescription = document.createElement("div");
              cartItemContent.appendChild(cartItemContentDescription);
              cartItemContentDescription.classList.add(
                "cart__item__content__description"
              );

              let productName = document.createElement("h2");
              cartItemContentDescription.appendChild(productName);
              productName.innerText = product.name;

              let productColor = document.createElement("p");
              cartItemContentDescription.appendChild(productColor);
              productColor.innerText = article.color;

              let productPrice = document.createElement("p");
              cartItemContentDescription.appendChild(productPrice);
              productPrice.innerText = `${product.price} €`;

              let cartItemContentSettings = document.createElement("div");
              cartItemContent.appendChild(cartItemContentSettings);
              cartItemContentSettings.classList.add(
                "cart__item__content__settings"
              );

              let cartItemContentSettingsQuantity =
                document.createElement("div");
              cartItemContentSettings.appendChild(
                cartItemContentSettingsQuantity
              );
              cartItemContentSettingsQuantity.classList.add(
                "cart__item__content__settings__quantity"
              );

              let itemQuantity = document.createElement("p");
              itemQuantity.innerText = "Qté :";
              cartItemContentSettingsQuantity.appendChild(itemQuantity);

              let quantityInput = document.createElement("input");
              cartItemContentSettingsQuantity.appendChild(quantityInput);
              quantityInput.classList.add("itemQuantity");
              quantityInput.value = article.quantity;
              quantityInput.setAttribute("type", "number");
              quantityInput.setAttribute("min", "1");
              quantityInput.setAttribute("max", "100");
              quantityInput.setAttribute("name", "itemQuantity");

              quantityInput.addEventListener("change", (e) =>
                changeQuantity(e, quantityInput)
              );

              let cartItemContentSettingsDelete = document.createElement("div");
              cartItemContentSettings.appendChild(
                cartItemContentSettingsDelete
              );
              cartItemContentSettingsDelete.classList.add(
                "cart__item__content__settings__delete"
              );

              //Bouton "supprimer"
              let deleteBtn = document.createElement("p");
              cartItemContentSettingsDelete.appendChild(deleteBtn);
              deleteBtn.innerText = "Supprimer";
              deleteBtn.addEventListener("click", () => deleteItem(deleteBtn));

              price.innerText = sumPrices;
              quantity.innerText = sumQuantity;
            }
          }
        }
      });
  }
};

createArticle();
