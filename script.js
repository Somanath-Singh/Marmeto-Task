
let menuicon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navigation');

menuicon.onclick = () => {
    menuicon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

//alert message
function customAlert(message) {
    document.getElementById('alertMessage').innerHTML = message;
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
    
    
    if(quantity == 0){

        customAlert("Quantity can't be zero ...");

        setQuantity();

    }   

}

var remove=true;


//delete cart item
document.getElementById("delete").addEventListener("click",function(){


    const remove = `Are you sure you want to remove the item from cart ... <br><br>
                    <button class="alert-btn" onClick="deleteCart()">Remove<button>`;

    customAlert(remove);

    document.getElementById("ok").style.display="none";

})

function deleteCart()
{
    const deleteItem = `Cart item is removed from the cart ... <br> please click the <span class="checkout-item">shopping icon</span> to add item into cart ...`;

    customAlert(deleteItem);

   document.getElementById("cart_content").style.visibility="hidden";

   document.getElementById("sub-total-amt").innerText=`Rs. ${0}`;

    document.getElementById("total-amt").innerText=`Rs. ${0}`;

    document.getElementById("quantity").value=0;

    document.getElementById("ok").style.display="block";

    remove=false;
}


//checkout items
document.getElementById("checkout").addEventListener("click",function(){

    var quantity = document.getElementById("quantity").value;

    var price = document.getElementById("total-amt").innerText;

    var checkout = "First add the item into cart ...";

    //if cart item is not removed
    if(remove == true)
    {
        checkout = `<span class="checkout-item">Item Name</span> - ${cartItem[0].items[0].title} <br> <span class="checkout-item">Description</span> - ${cartItem[0].items[0].product_description} <br> <span class="checkout-item">Actual Price<span> - ${cartItem[0].items[0].price} <br> <span class="checkout-item">Quantity<span> - ${quantity} <br> <span class="checkout-item">TotalPrice<span> - ${price} <br>  `;
    }

    customAlert(checkout);

})


//add to cart
function addToCart(){

    if(remove == false)
    {

    customAlert(`Item added to cart ...`);

    document.getElementById("cart_content").style.visibility="visible";

    var price=document.getElementById("price").innerText;

    setQuantity()

    document.getElementById("quantityPrice").innerText=price;

    document.getElementById("sub-total-amt").innerText=`Rs. ${price}`;

    document.getElementById("total-amt").innerText=`Rs. ${price}`;
    }

    remove=true;
    
}

//bodyload
function bodyload()
{

    getCartData("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889");

    setQuantity();

}