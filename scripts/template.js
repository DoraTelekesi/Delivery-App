function dishesTemplate(indexDish) {
    return `<div class="dish-group" id="${myDishes[indexDish].title}">
          <div class="dish-group-header">
            <img
              class="dish-img"
              src="./assets/img/${myDishes[indexDish]["headerImage"]}"
              alt=""
            />
            <h2>${myDishes[indexDish].title}</h2>
          </div>
          <div class="dish-list">
            ${displayLists(indexDish)}
          </div>
        </div>`
};

function dishListsTemplate(indexDish,indexList){
    return `<div class="dish-table">
              <div class="dish-info">
                <h3 class="name">${myDishes[indexDish].dishes[indexList].name}</h3>
                <p class="description">
                ${myDishes[indexDish].dishes[indexList].description}
                </p>
                <p class="price">${myDishes[indexDish].dishes[indexList].price}€</p>
              </div>
              <span>
                <img
                  onclick="addToBasket(${indexDish},${indexList})"
                  class="addBtn"
                  src="./assets/icons/plus-solid.svg"
                  alt=""
                />
              </span>
            </div>`
};

function basketTemplate(indexDish,indexList) {
  return `<div class="filled-basket" id ="item-${indexDish}-${indexList}">
            <h4 id="name-${indexDish}-${indexList}">${myDishes[indexDish].dishes[indexList].name}</h4>
            <div class="addedDish">
              <img
                onclick="minusAmount(${indexDish},${indexList})"
                class="basket-imgs-amount hovicon effect-7 sub-b"
                src="./assets/icons/minus-solid.svg"
                alt="Minus the amount"
              />
              <p class="amountToIterate" id="amount-${indexDish}-${indexList}">${myDishes[indexDish].dishes[indexList].amount}x</p>
              <img
                onclick="addAmount(${indexDish},${indexList})"
                class="basket-imgs-amount"
                src="./assets/icons/plus-solid.svg"
                alt="Adding the amount"
              />
              <div class="price-insets">
              <p id="price-${indexDish}-${indexList}" class="price-${indexDish}-${indexList} priceToIterate">${myDishes[indexDish].dishes[indexList].price}</p>
              <p>€</p>
              </div>
              <img
                onclick="deleteItem(${indexDish},${indexList})"
                class="basket-imgs trash"
                src="./assets/icons/trash-solid.svg"
                alt="Delete item"
              /><tr>
            </div>
            <div></div>`
};

  function costsTemplate(){
      return `<table id="table-price" class="table-price">
                <tr>
                  <td>Zwischensumme</td>
                  <td id="subtotal"></td>
                </tr>
                <tr>
                  <td>Lieferkosten</td>
                  <td>5€</td>
                </tr>
                <tr>
                  <td><b>Gesamt</b></td>
                  <td id="total"></td>
                </tr>
              </table>`
  };

  function foodOrderedTemplate() {
    return `<div class="order-btn" id="order-btn" onclick="foodOrdered()">Bestellen!</div>`
  }
