/* ----- storedProductChoices ----- 
Récuperation des valeurs dans le local storage */
let storedProductChoices = JSON.parse(localStorage.getItem("products"));

/*********************************************************************** 
*******************  Calcul prix total du panier ***********************
************************************************************************/
const totalPrice = (storedProductChoices) => {
    if (storedProductChoices) {
        const total = storedProductChoices.reduce(
        (acc, produit) => acc + Number(produit.quantite * produit.prix),0);

        document.querySelector("#totalPrice").innerHTML = total;
    }
}; 
/*********************************************************************** 
******************  Calcul du nombre d'articles du panier  ****************
************************************************************************/
const displayTotalQuantity = (storedProductChoices) => {
    if (storedProductChoices) {
      const totalQuantity = storedProductChoices.reduce(
        (acc, produit) => acc + Number(produit.quantite),0);

      document.querySelector("#totalQuantity").innerHTML = totalQuantity;
      //Afficher nombre de produits dans le menu navigation
      document.querySelector('[href="./cart.html"] li').innerHTML = `Panier<span style='color: red;'>${totalQuantity}</span>` ;
    }
};
/*********************************************************************** 
***************  Modifier la quantité d'un article du panier  **********
************************************************************************/
let modifyItemQuantity = () => {
    let input = document.querySelector('#cart__items')

    input.addEventListener('input', (event) => {
        // Cibler l'ID et la couleur
        const id = event.target.closest('.cart__item').getAttribute("data-id");
        const color = event.target.closest('.cart__item').getAttribute("data-color")
        // Récupérer la valeur de l'input 
        const newQuantity = event.target.value;
        
        storedProductChoices.forEach(storedProduct =>{
            // On affiche la nouvelle valeur seulement si c'est le même produit avec la même couleur
            if(storedProduct.id === id && storedProduct.couleur === color){
                storedProduct.quantite = newQuantity
                // Mettre à jour le localStorage
                localStorage.setItem("products", JSON.stringify(storedProductChoices));
            }
        })

        displayTotalQuantity(storedProductChoices);
        totalPrice(storedProductChoices);
    })
}
/*********************************************************************** 
*******************  Supprimer un article du panier  *******************
************************************************************************/
let removeCartItem = () => {
    let cartItemDleteBtns =  document.getElementsByClassName("cart__item__content__settings__delete")

    for (let deleteBtn of cartItemDleteBtns) {       
        deleteBtn.addEventListener("click", (event) =>{  


             buttonClicked = event.target 
             buttonClicked.closest("article").remove();

             const id = event.target.closest('.cart__item').getAttribute("data-id");
             const color = event.target.closest('.cart__item').getAttribute("data-color")

             storedProductChoices.forEach(storedProduct =>{
            
                // On affiche la nouvelle valeur seulement si c'est le même produit avec la même couleur
                if(storedProduct.id === id && storedProduct.couleur === color){

                    let index = storedProductChoices.indexOf(storedProduct);//Récupèrer l'index 
                    storedProductChoices.splice(index, 1);//Le supprimer

                   
                   
                    // Mettre à jour le localStorage
                    localStorage.setItem("products", JSON.stringify(storedProductChoices));
                }
            })
         


        })   
    }
}
/*********************************************************************** 
*******************  Afficher les articles du panier  *******************
************************************************************************/
let displayCart = () => {
     
    // Si localStorage est vide
    if (!storedProductChoices) {
        
        document.querySelector("#cartAndFormContainer h1").innerHTML = "Panier vide";
        document.querySelector(".cart").remove();
    // Si non    
    } else {
        for (let storedProduct of storedProductChoices) {
            // Calcul du prix total d'UN produit
            unitTotalPrice = storedProduct.prix * storedProduct.quantite;
    
            //Hydrater l'élement <cart__items> dynamiquement  
            document.querySelector('#cart__items').innerHTML += 
                `<article class="cart__item" data-id="${storedProduct.id}" data-color="${storedProduct.couleur}">
                    <div class="cart__item__img">
                        <img src="${storedProduct.image}" alt="${storedProduct.alt}" />
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                        <h2>${storedProduct.nom}</h2>
                        <p>${storedProduct.couleur}</p>
                        <p>${unitTotalPrice} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté :</p>
                            <input type="number" class="itemQuantity" name="itemQuantity"   min="1" max="100" value="${storedProduct.quantite}" />
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;   
    
                totalPrice(storedProductChoices);
                displayTotalQuantity(storedProductChoices);
                modifyItemQuantity();
                removeCartItem();
        }
    }
}
displayCart();

/********************************* Autre MAIL ****************** */    

const form = document.querySelector(".cart__order__form");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const validateButton = document.querySelector("#order");
let emailError = document.querySelector("#emailErrorMsg");

let formFields = [firstName, lastName, address, city, email];

/***************************************************************** 
 Désactiver les attributs Required de tous les champs du formulaire */
let inputs = document.querySelectorAll("input");
for (atr of inputs) {atr.removeAttribute("required");}
/******************************************************* */

const emailRegex = /[\w-]+@([\w-]+\.)+[\w-]+/;
const stringRegex =    /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/
const addressRegex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/
const cityRegex = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/

form.addEventListener("submit", function(e) {

    e.preventDefault(); 

    // Validation firstName

    let firstNameInput = document.querySelector("#firstNameErrorMsg");
    if (firstName.value && stringRegex.test(firstName.value) == true) {  
        firstNameInput.innerHTML = `Prénom valide`;
        firstNameInput.style.color = "#a3f7e0";  
    }else if (firstName.value === ""){    
        firstNameInput.innerHTML = `Veuillez saisir votre prénom`;  
        firstNameInput.style.color = "#fbb4cc";
    }else{
        firstNameInput.innerHTML = `Prénom non invalide`;  
        firstNameInput.style.color = "#fbb4cc";      
    }
   
    let lastNameInput = document.querySelector("#lastNameErrorMsg");
    if (lastName.value && stringRegex.test(lastName.value) == true) {  
        lastNameInput.innerHTML = `Nom valide`;
        lastNameInput.style.color = "#a3f7e0";
    }else if (lastName.value === ""){    
        lastNameInput.innerHTML = `Veuillez saisir votre nom`;  
        lastNameInput.style.color = "#fbb4cc";
    }else{
        lastNameInput.innerHTML = `Nom non invalide`;  
        lastNameInput.style.color = "#fbb4cc";       
    } 

    let addressInput = document.querySelector("#addressErrorMsg");
    if (address.value && addressRegex.test(address.value) == true) {  
        addressInput.innerHTML = `Adresse valide`;
        addressInput.style.color = "#a3f7e0";     
    }else if (address.value === ""){    
        addressInput.innerHTML = `Veuillez saisir votre adresse`;  
        addressInput.style.color = "#fbb4cc"; 
    }else{
        addressInput.innerHTML = `Adresse non invalide`;  
        addressInput.style.color = "#fbb4cc";       
    } 

    let cityInput = document.querySelector("#cityErrorMsg");
    if (city.value && cityRegex.test(city.value) == true) {  
        cityInput.innerHTML = `Ville valide`;
        cityInput.style.color = "#a3f7e0";     
    }else if (city.value === ""){    
        cityInput.innerHTML = `Veuillez saisir votre ville`;  
        cityInput.style.color = "#fbb4cc"; 
    }else{
        cityInput.innerHTML = `Ville non invalide`;  
        cityInput.style.color = "#fbb4cc";       
    }
    
    let emailInput = document.querySelector("#emailErrorMsg");
    if (email.value && emailRegex.test(email.value) == true) {  
        emailInput.innerHTML = `Email valide`;
        emailInput.style.color = "#a3f7e0";     
    }else if (email.value === ""){    
        emailInput.innerHTML = `Veuillez saisir votre email`;  
        emailInput.style.color = "#fbb4cc";
    }else{
        emailInput.innerHTML = `Email non invalide`;  
        emailInput.style.color = "#fbb4cc";
        return false;        
    }  

    validForm();
})    

//Requête POST pour envoyer les données à l'API et récupérer le numéro de commande
const sendForm = (storedProductChoices, contact) => {

    let products = [];

  for (let i = 0; i < products; i++) {
    let productId = products.id;
    products.push(productId);
  }
console.log(products);
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/JSON",
      },
      body: JSON.stringify({products, contact}),
    })
      .then((data) => data.json())
      .then((data) => {
        const orderId = data.orderId;
  
        //Envoi de l'utilisateur vers la page de confirmation en supprimant le localStorage
        window.location.href = `confirmation.html?orderId=${orderId}`;
        // localStorage.clear();
      });
  };

//Soumission du formulaire et envoi de la commande
const validForm = () => {
    
    if (firstName.value && lastName.value && address.value && city.value && email.value
        ) 
    {
            const contact = {
                lastName: lastName.value,
                firstName: firstName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            };
            sendForm(storedProductChoices, contact);
            console.log("commande ok");
    }   
}

// toto@toto.com