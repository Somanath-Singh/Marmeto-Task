
let menuicon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navigation');

menuicon.onclick = () => {
    menuicon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

//alert message
function customAlert(message) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'block';
  }

  function closeCustomAlert() {
    document.getElementById('customAlert').style.display = 'none';
  }



var cartItem = [];


//load cart data
function getCartData(url)
{
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(data => {
        cartItem.push(data);
        //call the method to load all the item into the page
        getData(cartItem);
    })
}

//get cart data into the webpage
function getData(cartItem)
{

        var img=document.createElement("img");
        img.src=cartItem[0].items[0].image;
        img.width=108;
        img.height=105;
        img.id="cart-item-img";
        document.getElementById("product-img").appendChild(img);

        var prod_title=document.createElement("span");
        prod_title.innerText=cartItem[0].items[0].title;
        document.getElementById("product-title").appendChild(prod_title);


        var prod_price=document.createElement("span");
        prod_price.id="price"
        prod_price.innerText=innerText=cartItem[0].items[0].price;
        document.getElementById("product-price").appendChild(prod_price);

        var sub_total=document.createElement("span");
        sub_total.id="quantityPrice";
        sub_total.innerText=cartItem[0].items[0].price;
        document.getElementById("sub-total").appendChild(sub_total);
        
        document.getElementById("sub-total-amt").innerText=`Rs. ${cartItem[0].items[0].price}`;

        document.getElementById("total-amt").innerText=`Rs. ${cartItem[0].items[0].price}`;
        

}


//set quantity
function setQuantity()
{
    var quantity = document.getElementById("quantity");

    quantity.value=1;
}


//increase quantity
function increaseQuantity(){

    var quantity = document.getElementById("quantity").value;

    var price=document.getElementById("price").innerText;

    if(quantity >= 0)
    {
        price=quantity*price;

        document.getElementById("quantityPrice").innerText=price;

        document.getElementById("sub-total-amt").innerText=`Rs. ${price}`;

        document.getElementById("total-amt").innerText=`Rs. ${price}`;
    }    

}

var remove=0;


//delete cart item
document.getElementById("deleteCart").addEventListener("click",function(){

    customAlert("Cart item is removed from the cart ...\n please click the shopping icon to add item into cart ...");

   document.getElementById("cart_content").style.visibility="hidden";

   document.getElementById("sub-total-amt").innerText=`Rs. ${0}`;

    document.getElementById("total-amt").innerText=`Rs. ${0}`;

    remove=1;

})


//checkout items
document.getElementById("checkout").addEventListener("click",function(){

    var quantity = document.getElementById("quantity").value;

    var price = document.getElementById("total-amt").innerText;


    customAlert(`Item Name - ${cartItem[0].items[0].title}  Quantity - ${quantity}  TotalPrice - ${price} `);

})


//add to cart
function addToCart(){

    if(remove == 1)
    {

    document.getElementById("cart_content").style.visibility="visible";

    var price=document.getElementById("price").innerText;

    setQuantity()

    document.getElementById("quantityPrice").innerText=price;

    document.getElementById("sub-total-amt").innerText=`Rs. ${price}`;

    document.getElementById("total-amt").innerText=`Rs. ${price}`;
    }

    remove=0;
    
}

//bodyload
function bodyload()
{

    getCartData("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889");

    setQuantity();

}