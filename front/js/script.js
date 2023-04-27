//recuperation des donnees
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  //utilisation des donnees

  .then (data=>{
    let items = document.getElementById("items")
   data.forEach(element => {
    //creation des fiches produits pour chaque produits variable
    let link = document.createElement("a")
    let article = document.createElement("article")
    let img =document.createElement("img")
    let alt =document.createElement("alt")
    let title = document.createElement("h2")
    let color=document.createElement("p")
    let description = document.createElement("p")

    //insertion des parametres produitsdans les fiches
    link.href= `./product.html?${element._id}`
    img.src= element.imageUrl
    img.alt= element.altTxt
    title.classList.add('productName')
    title.innerText=element.name
    description.classList.add('productDescription')
    description.innerText=element.description
   

  //insertion des produit dans html
    items.appendChild(link)
    link.appendChild(article)
    article.appendChild(img)
    article.appendChild(title)
    article.appendChild(description)
    
 console.log(items);
 });
    console.log(data);

  })
  .catch(error => console.log(error));



        
   
  


  
