fetch(`http://localhost:3000/api/products?_id`)
  .then(response => response.json())
  .then(element => {
    // Traiter les données du produit récupérées
    let item = document.getElementById("item")
    data.forEach(element => {
        let img =document.createElement("item__img")
        img.src= element.imageUrl
        article.appendChild(img)
    
  }})
  .catch(error => console.error(error));