// //Récupération du numéro de commande en passant par l'URL
// //Déclaration de la constante url
// const urlConfirm = new URL(window.location.href);
// //Fonction pour récupérer l'orderId de l'url
// const getOrderId = () => {  
//     const params = urlConfirm.searchParams;
//     const orderConfirm =params.get('name');
//     document.getElementById('orderId').innerHTML = orderConfirm;
// };
// getOrderId();



let tagOrderId = document.querySelector("#orderId");
const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);
tagOrderId.innerHTML = urlSearchParams.get("orderId"); //récupère la clé orderId et l'insère dans le span