
// **getAllProducts**: 
//Requette à l'API et récuperation de tous les produits
const getAllProducts = async () => {
    await fetch("http://localhost:3000/api/products/")

    .then((response) => {
        if(response.ok){
            return response.json()
        } 
    })
    .then((productsData) => {

        // Boucle sue le resultat : productsData
        // for (product of productsData ) {           
            productsData.forEach(product =>
                document.querySelector("#items").innerHTML += 
                `<a href="./product.html?id=${product._id}"/>
                    <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                    </article>
                </a> `  
            )
    })  
    // En cas d'erreur un message est affiché
    .catch((err) => {
        alert("Une erreur est survenue");
    })
}

//Execution
getAllProducts();