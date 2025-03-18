let price;
let deliveryCost = 5;
let subTotal= 0;
let total = 0;


function init() {
    displayDishes();
    toggleEmptyBasket();
}

//in myDishes array there are 4 main category (4 Objects)
function displayDishes(){ 
    let dishes = document.getElementById("dishes")
    dishes.innerHTML = "";
    for (let indexDish=0; indexDish < myDishes.length; indexDish++) {
       dishes.innerHTML += dishesTemplate(indexDish);
    }
}
// inside every category, there is a dishes array, with 4 dishes (4 Objects)
//to iterate through them we need the indexDish, to know which dishes array we are iterating through
function displayLists(indexDish) { 
    let dishLists = "";
    for (let indexList=0;  indexList< myDishes[indexDish].dishes.length;  indexList++) {
        dishLists += dishListsTemplate(indexDish,indexList);
    }
    return dishLists;
}

//to add a certain dish, we need to know the main category (indexDish), and also dish itself from dishlist (indexList)
function addToBasket(indexDish,indexList){
    // we save the relevant object to a variable
    let itemToAdd = myDishes[indexDish].dishes[indexList];
    let basketElementRef = document.getElementById("basket-elements");
    //all basket element has unique ID, which is added as a class, and marks the number of category, and the number in the sublist
    //to itemId we connect the whole HTML element
    let itemId = document.getElementById(`item-${indexDish}-${indexList}`);
    //at first when we add to Basket, itemId does not exists!! (null)
    // in case the food is already ordered, we remove that element which shows that it is ordered
    let foodOrderedElement = document.querySelector(".order-done");
    if (foodOrderedElement) {
        foodOrderedElement.remove();
    }
    // if the basketElement is empty, we should give the counter box to it, but only at first
    if (basketElementRef.innerHTML === "") {
        addCounter();
    }
    //if this HTML element does not exist - we add to it, and increase the amount from 0 to 1
    if(!itemId) {
        itemToAdd.amount = 1;
        basketElementRef.innerHTML += basketTemplate(indexDish,indexList);
    }
    //if already exists, then we dont add it again   
    else {
        addAmount(indexDish,indexList);
    }
    //the responsive Button which shows, if there is something in the basket or not
    toggleItemsInBasket();
    // as soon as we add something to the cart, it should calculate a price
    getPrices();
    //as soon as we add something to the cart, empty basket elements should disappear
    toggleEmptyBasket();
    //so at the Basket button we see how many amounts are already in basket (red number)
    countDishesInBasket()
}

function addAmount(indexDish,indexList) {
       // we save the relevant object to a variable
    let itemToAdd = myDishes[indexDish].dishes[indexList];
    //we have to increase the amount
    itemToAdd.amount++;
    //we grab the amount and price HTML element from the basket DOM
    //at first when we add to Basket, amountRef and PriceRef do not exist!! (null)
    let amountRef = document.getElementById(`amount-${indexDish}-${indexList}`);
    let priceRef = document.getElementById(`price-${indexDish}-${indexList}`);
    console.log(amountRef)
    // if amountRef and priceRef exist / we already added the dish to the basket
    if (amountRef && priceRef) {
        //we have to multiply the price with the amount
        price = itemToAdd.price*itemToAdd.amount;
        //we put out the amount
        amountRef.innerHTML = `${itemToAdd.amount}x`;
        //we put out the price, but check if it is integer, if not we should round them to 2 decimals
        priceRef.innerHTML = `${Number.isInteger(price) ? price : price.toFixed(2)}`;
        // we update the newPrice of our original array with this price
        itemToAdd.newPrice = price;
        //we calculate the other prices
        getPrices();
        countDishesInBasket();
    }
}

function minusAmount(indexDish,indexList) {
    // we save the relevant object to a variable
    let itemToMinus = myDishes[indexDish].dishes[indexList];
    //we create minAmount at 1, so it should not go to 0 or minus Nr
    let minAmount = 1;
    // if the amount is bigger than 1
    if (itemToMinus.amount > minAmount) {
        //we reduce the amount with one
        itemToMinus.amount--;
            //at first when we add to Basket, amountRef and PriceRef do not exist!! (null)
        let amountRef = document.getElementById(`amount-${indexDish}-${indexList}`);
        let priceRef = document.getElementById(`price-${indexDish}-${indexList}`);
            // if amountRef and priceRef exist / we already added the dish to the basket
        if (amountRef && priceRef) {
           //we have to multiply the price with the amount
           price = itemToMinus.price*itemToMinus.amount;
           amountRef.innerHTML = `${itemToMinus.amount}x`;
           //we put out the price, but check if it is integer, if not we should round them to 2 decimals
           priceRef.innerHTML = `${Number.isInteger(price) ? price : price.toFixed(2)}`;
           // we update the newPrice of our original array with this price
           itemToMinus.newPrice = price;
           //we calculate the other prices
           getPrices();
           countDishesInBasket();
        }
    }
    //but if the amount is already 1, then we delete the whole basket Element
    else if(itemToMinus.amount = minAmount){
        deleteItem(indexDish,indexList);
        countDishesInBasket();
    }
}

function getPrices() {
    let subTotal = 0;
    // at every dish in the DOM there is already a price, we should collect them - 
    //priceClasses will be a HTML collection, we have to iterate through
    let priceClasses = document.querySelectorAll(".priceToIterate");
    //we created a variable subtotal above with 0, we iterate through this collection, and add them together, which will give us a subtotal price
    //although this will be a string got out from innerHTML so we have to turn into a number!
    priceClasses.forEach(priceClass => {
        subTotal += Number(priceClass.innerHTML)
        });
    //we put this number to the relevant place
    let subTotalRef = document.getElementById("subtotal");
    subTotalRef.innerHTML = `${Number.isInteger(subTotal) ? subTotal : subTotal.toFixed(2)}€`
    let totalRef = document.getElementById("total");
    //we create the total price, adding 5 euro delivery cost to it
    let total = Number(subTotal)+deliveryCost;
    totalRef.innerHTML = `<b>${(Number.isInteger(total) ? total : total.toFixed(2))}€</b>`
}



function deleteItem(indexDish,indexList) {
    let itemToDelete = myDishes[indexDish].dishes[indexList];
    let itemId = document.getElementById(`item-${indexDish}-${indexList}`);
    let basketElementRef = document.getElementById("basket-elements");
    //if this HTML element exists - we set back the amount to 0 in our original array
    if(itemId) {
        itemToDelete.amount = 0;
        //we remove the HTML basket element
        itemId.remove();
        //we calculate the prices again
        getPrices();
    }
    //in case there is no basket element, we have to remove the counter, and display the empty basket elements
    if (basketElementRef.innerHTML === "") {
        removeCounter();
        toggleEmptyBasket();
    }
    toggleItemsInBasket();
    countDishesInBasket();
}

function addCounter() {
    let basketPrices = document.getElementById("basket-price-elements");
    //we add the table with subtotal delicery cost and total price lists
    basketPrices.innerHTML += costsTemplate();
    //we add a button, with which we can order the food
    basketPrices.innerHTML += foodOrderedTemplate();
    //we calculate the prices
    getPrices();
}

function removeCounter () {
    //we remove the cost table
    let basketPrices = document.getElementById("basket-price-elements");
    basketPrices.innerHTML = "";
}

function toggleEmptyBasket() {
    let basketElementRef = document.getElementById("basket-elements");
    let emptyBasketRef = document.getElementById("empty-basket");
    let basketTitle = document.getElementById("basket-title");
    if (basketElementRef.innerHTML == "") {
        emptyBasketRef.classList.remove("dp-none-empty");
        basketTitle.classList.add("dp-none-title");
    }
    else {
        emptyBasketRef.classList.add("dp-none-empty");
        basketTitle.classList.remove("dp-none-title");
    }
}

function toggleBasket(){
    let basketWrapper = document.getElementById("basket-wrapper");
    let basketBtn = document.getElementById("resp-basket-btn");
    let overlay = document.getElementById("overlay")

    basketWrapper.classList.toggle("dp-none");

    if (!basketWrapper.classList.contains("dp-none")) {
    basketBtn.classList.add("btn-up");
    overlay.classList.remove("dp-none-overlay")
    }
    else {
    basketBtn.classList.remove("btn-up");
    overlay.classList.add("dp-none-overlay")
    }
}

function toggleItemsInBasket(){
    let basketElementRef = document.getElementById("basket-elements")
    let itemInBasket = document.getElementById("resp-btn-items-in");
    if (basketElementRef.innerHTML !== ""){
        itemInBasket.classList.remove("dp-none-resp-btn");
    }
    else {
        itemInBasket.classList.add("dp-none-resp-btn");
    }
}

function closeBasket(){
toggleBasket();
}

function foodOrdered(){
    let basketElementRef = document.getElementById("basket-elements");
    let itemInBasket = document.getElementById("resp-btn-items-in");
    removeCounter();
    basketElementRef.innerHTML = `<h2 class="order-done">Bestellung ist eingegangen!</h3>`;
    itemInBasket.classList.add("dp-none-resp-btn"); 
}

function countDishesInBasket(){
    let allAmount= 0;
    for (let i =0; i<myDishes.length;i++){
        for (let j =0; j < myDishes[i].dishes.length;j++){
            allAmount += myDishes[i].dishes[j].amount;
        }
    }
    document.getElementById("resp-btn-items-in").innerHTML = `( ${allAmount} )`;
}
