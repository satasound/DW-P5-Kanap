//Récupération de l'ID du produit.
const productID = new URL(location.href).searchParams.get("id");

let product;
// **fetchProduct** :
// Requette avec insertion de l'ID et récuperation d'un seulproduit
const addProduct = async (productID) => {
  await fetch(`http://localhost:3000/api/products/${productID}`)
    .then((response) => response.json())
    .then((product) => {
      // affichage du titre de la page
      document.querySelector("title").innerHTML = product.name;

      //Affichage HTML
      // Insertion HTML
      document.querySelector("#item").innerHTML = `<article>
        <div class="item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}"> 
        </div>
        <div class="item__content">
            <div class="item__content__titlePrice">
            <h1 id="title">${product.name}</h1>
            <p>Prix : <span id="price">${product.price}</span>€</p>
            </div>
            <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id="description">${product.description}</p>
            </div>
            <div class="item__content__settings">
            <div class="item__content__settings__color">
                <label for="color-select">Choisir une couleur :</label>
                <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>
        </select>
            </div>
            <div class="item__content__settings__quantity">
                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
            </div>
            </div>
            <div class="item__content__addButton">
            <button id="addToCart">Ajouter au panier</button>
            </div>
        </div>
      </article> `;

      product.colors.forEach((color) => {
        document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`;
      });

      const btn = document.querySelector("#addToCart");

      // Ecoute de l'évenement Click sur le bouton
      btn.addEventListener("click", (e) => {
        // Appelle de la fonction **dataLocalStorage**
        addProductToLocalStorage();
      });
    });
};

/***************************** LOCAL STORAGE **********************/
const addProductToLocalStorage = () => {
  // Array des choix
  let productChoices = {
    id: productID,
    couleur: document.querySelector("#colors").value,
    quantite: document.querySelector("#quantity").value,
    nom: document.querySelector("title").innerText,
    image: document.querySelector(".item__img img").src,
    alt: document.querySelector(".item__img img").alt,
    prix: document.querySelector("#price").innerText,
    descript: document.querySelector("#description").innerText,
  };
  // Récupérer le localStorage
  let storedProductChoices = JSON.parse(localStorage.getItem("products"));
  if (productChoices.couleur != "" && productChoices.quantite > 0) {
    //Si localStorage est vide :créer un tableau vide
    if (!storedProductChoices) {
      storedProductChoices = [];
      storedProductChoices.push(productChoices);
    } else {
      // Si la couleur ET la quantité ont été choisies...

      /////////////////////////////////////////
      storedProductChoices.forEach((storedProduct) => {
        if (storedProduct.id === productChoices.id && storedProduct.couleur === productChoices.couleur) {
          storedProduct.quantite = parseInt(storedProduct.quantite) + parseInt(productChoices.quantite);
          console.log(
            "quantite" +
              " " +
              storedProduct.id +
              " " +
              productChoices.id +
              " " +
              storedProduct.couleur +
              " " +
              productChoices.couleur +
              " " +
              parseInt(storedProduct.quantite) +
              " " +
              parseInt(productChoices.quantite)
          );
        } else {
          storedProductChoices.push(productChoices);
          console.log("push");
        }
        ////////////////////////////////////////
      });
      // Stockage de l'array des choix dans le local storage

      // if (storedProductChoices.length > 0) {
      //   // storedProductChoices = [];
      //   storedProductChoices.push(productChoices);
      // }
    }
    localStorage.setItem("products", JSON.stringify(storedProductChoices));

    //Message d'ajout du produit et invitaion à consulter le panier
    // if (confirm("Le produit a été ajouté!\nVoulez-vous voir votre panier?")) {
    //   window.location.href = `cart.html`;
    // } else {
    //   window.location.href = `index.html`;
    // }
    // Message en cas d'absence de la couleur ET de la quantité
  } else {
    alert("Veuillez choisir une couleur et une quantité");
  }
};

//Execution!
addProduct(productID);

//          // Si localStorage est vide :créer un tableau vide
//  if (!storedProductChoices) {
//     storedProductChoices = [];
// }else if (productChoices.couleur == "" && productChoices.quantite == 0 ){
//     alert("Veuillez choisir une couleur et une quantité")
// }else {
//         // Stockage de l'array des choix dans le local storage
//         storedProductChoices.push(productChoices);
//         localStorage.setItem("products", JSON.stringify(storedProductChoices));

//         //Message d'ajout du produit et invitaion à consulter le panier
//         if (confirm("Le produit a été ajouté!\nVoulez-vous voir votre panier?")) {
//             window.location.href = `cart.html`;
//         } else{
//             window.location.href = `index.html`;
//         }
//     }

// const productAlreadyExists = storedProductChoices.filter(product => product.couleur === productChoices.couleur && product.id === productChoices.id)

// if (productAlreadyExists.length){
//     let Total =  productChoices.quantite+ productAlreadyExists[0].quantite ;

//     const indexProductAlreadyExists = storedProductChoices.indexOf(productAlreadyExists[0])

//     storedProductChoices[indexProductAlreadyExists].quantite = Total;
// }
