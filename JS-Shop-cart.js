let menuIcon=document.querySelector(".menu-icon");
let card=document.querySelector(".card"); 

menuIcon.onclick = function(){
    card.classList.toggle("small-card");
}



const data = [
  {
      id : 0,
      img : 'E:/Shop-Cart/Images/Product-2.jpg',
      name : 'Realme 50i',
      price : 10000,
      save : '500',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 1,
      img : 'E:/Shop-Cart/Images/Product-2.jpg',
      name : 'Realme 50i',
      price : 10000,
      save : '500',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 2,
      img : 'E:/Shop-Cart/Images/Product-2.jpg',
      name : 'Realme 50i',
      price : 10000,
      save : '500',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 3,
      img : 'E:/Shop-Cart/Images/Product-3.jpg',
      name : 'IQOO Z6',
      price : 15000,
      save : '50',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 4,
      img : 'E:/Shop-Cart/Images/Product-3.jpg',
      name : 'IQOO Z6',
      price : 16000,
      save : '50',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 5,
      img : 'E:/Shop-Cart/Images/Product-3.jpg',
      name : 'IQOO Z6',
      price : 17000,
      save : '50',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 6,
      img : 'E:/Shop-Cart/Images/Product-1.jpg',
      name : 'Samsung M33 5G',
      price : 19000,
      save : '200',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },
  {
      id : 7,
      img : 'E:/Shop-Cart/Images/Product-1.jpg',
      name : 'Samsung M33 5G',
      price : 31000,
      save : '200',
      delivery : 'With-In 3 - 4 days',
      itemInCart : false
  },

];
  
  let cartList = [];  //array to store cart lists
  let i;
  
  let detail = document.getElementsByClassName("card-item");
  let detailsImg = document.getElementById("detail-img");
  let detailTitle = document.getElementById("detail-title");
  let detailPrice = document.getElementById("detail-price");
  let youSave = document.getElementById("you-save");
  let detailsPage = document.getElementById("details-page");
  let back = document.getElementById("back");
  
  back.addEventListener("click",refreshPage); //click events to go to home page
  let addToCart = document.querySelectorAll("#add-to-carts");
  let cart = document.getElementById("cart");
  
  cart.addEventListener("click",displayCart); //click event to display cart
  
  let carts = document.getElementById("carts");
  
  carts.addEventListener("click",()=>addToCarts(getId)); //click events to add item to cart from details page
  let getId;
  let home = document.getElementById("logo");
  home.addEventListener("click",hideCart); //click event to hide cart page and to return home page
  
  //click events on dynamically created elements to remove items from list
  document.addEventListener("click",function(e){
    if(e.target.id=="remove"){
      let itemId = e.target.parentNode.id;
      removeFromCart(itemId);
      }
  })
  
  //click event to display details page
  for(i=0;i<data.length;i++){
      detail[i].addEventListener("click",handleDetail)
  }
  
  //click events to add items to cart from homepage cart icon
  addToCart.forEach(val=>val.addEventListener("click",()=>addToCarts(val.parentNode.id)));
  
  //detail function
  function handleDetail() {
      detailsPage.style.display = "block";      //console.log("Calling");
      getId=this.parentNode.id;
      detailsImg.src=data[getId].img;
      detailTitle.innerHTML = data[getId].name;
      detailPrice.innerHTML = "Price : Rs " + data[getId].price;
      youSave.innerHTML = "You save : (Rs " + data[getId].save + ")";
  }

//function to display cart page;
function displayCart(){
    document.getElementById("main").style.display = "none";
    document.getElementById("details-page").style.display = "none";
    document.getElementById("cart-container").style.display = "block";
    if(cartList.length==0){
        document.getElementById("cart-with-items").style.display = "none";
        document.getElementById("empty-cart").style.display = "block";
    }
    else{
        document.getElementById("cart-with-items").style.display = "block";
        document.getElementById("empty-cart").style.display = "none";
    }

}

//add item to cart
 function addToCarts(id){
    if(!data[id].itemInCart){
        cartList = [...cartList,data[id]];
        addItem();

        alert("items added to your cart");
    }
    else{
        alert ("your items are already in the cart");
    }
    data[id].itemInCart = true;
}

let totalAmount;
let totalItems;
let totalSavings;

//add items to the cart
function addItem(){
    totalAmount = 0;
    totalItems = 0;
    totalSavings = 0;
    let clrNode = document.getElementById("item-body");
    clrNode.innerHTML = "";
    cartList.map((cart)=>{
        let cartCont = document.getElementById("item-body");
        totalAmount = totalAmount + cart.price;
        totalSavings = totalSavings + cart.save;
        totalItems = totalItems + 1;
        totalPrice = totalAmount + cart.price;

        let tempCart = document.createElement("div");
        tempCart.setAttribute("class","cart-list");
        tempCart.setAttribute("id",cart.id);

        let listImg = document.createElement("img");
        listImg.setAttribute("id","list-img");
        listImg.src = cart.img;
        tempCart.appendChild(listImg);

        let listName = document.createElement("h3");
        listName.setAttribute("class","list-name");
        listName.innerHTML = cart.name;
        tempCart.appendChild(listName);

        let listPay = document.createElement("h3");
        listPay.setAttribute("class","pay");
        listPay.innerHTML = cart.price;
        tempCart.appendChild(listPay);

        let listQuantity = document.createElement("h3");
        listQuantity.setAttribute("class","quantity");
        listQuantity.innerHTML = "1";
        tempCart.appendChild(listQuantity);

        let listTrash = document.createElement("i");
        listTrash.setAttribute("class", "fa-solid fa-trash");
        listTrash.setAttribute("id","remove");
        tempCart.appendChild(listTrash);

        cartCont.appendChild(tempCart);
    })
    document.getElementById("total-amount").innerHTML = "Total Amount : Rs" + totalAmount;
    document.getElementById("total-items").innerHTML = "Total Items : " + totalItems;
    document.getElementById("you-save").innerHTML = "You Save : Rs" + totalSavings;
    document.getElementById("total").style.display = "block";
}

//hide your cart page
function hideCart(){
    document.getElementById("main").style.display = "block";
    document.getElementById("cart-container").style.display = "none";
}

//back to home page from details page
function refreshPage(){
    detailsPage.style.display = "none";
}

//remove item from cart
function removeFromCart(itemId){
    data[itemId].itemInCart = false;
    cartList = cartList.filter((list)=>list.id!=itemId);
    addItem();
    if(cartList.length==0){
        document.getElementById("cart-with-items").style.display = "none";
        document.getElementById("empty-cart").style.display = "block";
    }
}
