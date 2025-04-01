let price;
let deliveryCost = 5;
let subTotal = 0;
let total = 0;

function init() {
  displayDishes();
  toggleEmptyBasket();
}

function displayDishes() {
  let dishes = document.getElementById("dishes");
  dishes.innerHTML = "";
  for (let indexDish = 0; indexDish < myDishes.length; indexDish++) {
    dishes.innerHTML += dishesTemplate(indexDish);
  }
}

function displayLists(indexDish) {
  let dishLists = "";
  for (
    let indexList = 0;
    indexList < myDishes[indexDish].dishes.length;
    indexList++
  ) {
    dishLists += dishListsTemplate(indexDish, indexList);
  }
  return dishLists;
}

function addToBasket(indexDish, indexList) {
  let itemToAdd = myDishes[indexDish].dishes[indexList];
  let basketElementRef = document.getElementById("basket-elements");
  let itemId = document.getElementById(`item-${indexDish}-${indexList}`);
  let foodOrderedElement = document.querySelector(".order-done");
  if (foodOrderedElement) {
    foodOrderedElement.remove();
  }
  if (basketElementRef.innerHTML === "") {
    addCounter();
  }
  if (!itemId) {
    itemToAdd.amount = 1;
    basketElementRef.innerHTML += basketTemplate(indexDish, indexList);
  } else {
    addAmount(indexDish, indexList);
  }
  toggleItemsInBasket();
  getPrices();
  toggleEmptyBasket();
  countDishesInBasket();
}

function addAmount(indexDish, indexList) {
  let itemToAdd = myDishes[indexDish].dishes[indexList];
  itemToAdd.amount++;
  let amountRef = document.getElementById(`amount-${indexDish}-${indexList}`);
  let priceRef = document.getElementById(`price-${indexDish}-${indexList}`);
  console.log(amountRef);
  if (amountRef && priceRef) {
    price = itemToAdd.price * itemToAdd.amount;
    amountRef.innerHTML = `${itemToAdd.amount}x`;
    priceRef.innerHTML = `${
      Number.isInteger(price) ? price : price.toFixed(2)
    }`;
    itemToAdd.newPrice = price;
    getPrices();
    countDishesInBasket();
  }
}

function minusAmount(indexDish, indexList) {
  let itemToMinus = myDishes[indexDish].dishes[indexList];
  let minAmount = 1;
  if (itemToMinus.amount > minAmount) {
    itemToMinus.amount--;
    let amountRef = document.getElementById(`amount-${indexDish}-${indexList}`);
    let priceRef = document.getElementById(`price-${indexDish}-${indexList}`);
    if (amountRef && priceRef) {
      price = itemToMinus.price * itemToMinus.amount;
      amountRef.innerHTML = `${itemToMinus.amount}x`;
      priceRef.innerHTML = `${
        Number.isInteger(price) ? price : price.toFixed(2)
      }`;
      itemToMinus.newPrice = price;
      getPrices();
      countDishesInBasket();
    }
  } else if ((itemToMinus.amount = minAmount)) {
    deleteItem(indexDish, indexList);
    countDishesInBasket();
  }
}

function getPrices() {
  let subTotal = 0;
  let priceClasses = document.querySelectorAll(".priceToIterate");
  priceClasses.forEach((priceClass) => {
    subTotal += Number(priceClass.innerHTML);
  });
  let subTotalRef = document.getElementById("subtotal");
  subTotalRef.innerHTML = `${
    Number.isInteger(subTotal) ? subTotal : subTotal.toFixed(2)
  }€`;
  let totalRef = document.getElementById("total");
  let total = Number(subTotal) + deliveryCost;
  totalRef.innerHTML = `<b>${
    Number.isInteger(total) ? total : total.toFixed(2)
  }€</b>`;
}

function deleteItem(indexDish, indexList) {
  let itemToDelete = myDishes[indexDish].dishes[indexList];
  let itemId = document.getElementById(`item-${indexDish}-${indexList}`);
  let basketElementRef = document.getElementById("basket-elements");
  if (itemId) {
    itemToDelete.amount = 0;
    itemId.remove();
    getPrices();
  }
  if (basketElementRef.innerHTML === "") {
    removeCounter();
    toggleEmptyBasket();
  }
  toggleItemsInBasket();
  countDishesInBasket();
}

function addCounter() {
  let basketPrices = document.getElementById("basket-price-elements");
  basketPrices.innerHTML += costsTemplate();
  basketPrices.innerHTML += foodOrderedTemplate();
  getPrices();
}

function removeCounter() {
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
  } else {
    emptyBasketRef.classList.add("dp-none-empty");
    basketTitle.classList.remove("dp-none-title");
  }
}

function toggleBasket() {
  let basketWrapper = document.getElementById("basket-wrapper");
  let basketBtn = document.getElementById("resp-basket-btn");
  let overlay = document.getElementById("overlay");

  basketWrapper.classList.toggle("dp-none");

  if (!basketWrapper.classList.contains("dp-none")) {
    basketBtn.classList.add("btn-up");
    overlay.classList.remove("dp-none-overlay");
  } else {
    basketBtn.classList.remove("btn-up");
    overlay.classList.add("dp-none-overlay");
  }
}

function toggleItemsInBasket() {
  let basketElementRef = document.getElementById("basket-elements");
  let itemInBasket = document.getElementById("resp-btn-items-in");
  if (basketElementRef.innerHTML !== "") {
    itemInBasket.classList.remove("dp-none-resp-btn");
  } else {
    itemInBasket.classList.add("dp-none-resp-btn");
  }
}

function closeBasket() {
  toggleBasket();
}

function foodOrdered() {
  let basketElementRef = document.getElementById("basket-elements");
  let itemInBasket = document.getElementById("resp-btn-items-in");
  removeCounter();
  basketElementRef.innerHTML = `<h2 class="order-done">Bestellung ist eingegangen!</h3>`;
  itemInBasket.classList.add("dp-none-resp-btn");
}

function countDishesInBasket() {
  let allAmount = 0;
  for (let i = 0; i < myDishes.length; i++) {
    for (let j = 0; j < myDishes[i].dishes.length; j++) {
      allAmount += myDishes[i].dishes[j].amount;
    }
  }
  document.getElementById("resp-btn-items-in").innerHTML = `( ${allAmount} )`;
}
