    var cart =[];

    var Orders =function (orderId,name,price,TableId,OrderStatus,count){
    this.orderId=orderId
    this.name=name
    this.price=price
    this.TableId=TableId
    this.OrderStatus=OrderStatus
    this.count=count

    };
    
    $(".add-to-cart").click(function(event){
    
    event.preventDefault();
  
    var orderId = Number($(this).attr("data-orderId"));
  
    var TableId = Number( $(this).attr("data-TableId"));
    var name =$(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
     
     

     addOderToCart(orderId, name,price,TableId, 0,1);
     displatCart();

    });

    function displatCart()
    { 
        var cartArray=listCart();
        var output ="";
        for(var i in cartArray)
        { 
            output +="<li>"+cartArray[i].name+" "+ cartArray[i].count+"</li>"

        }
        $("#show-cart").html(output);

    }

    //addOderToCart(OrderId,Name,Price,Count)
    function addOderToCart(orderId,name,price,TableId,OrderStatus,count)
    {      
        for( var i in cart)
        {
            if(cart[i].orderId===orderId)
            {
                cart[i].count +=count;
                return;
            }
        }

        var order = new Orders(orderId,name,price,TableId,OrderStatus,count);
        cart.push(order);
        SaveCart();
    }

    //removeOrderById(OrderId)
    function removeOrderFromCart(orderId)
    {       
        for( var i in cart)
        {
            if(cart[i].orderId==orderId)
            {
                cart[i].count --;
                if(cart[i].count ===0)
                {
                    cart.splice(i,1);
                }
                break;
            }
            
        } 
        SaveCart();
    }

    //removeFromCartAll() -> Removes specfiv order from the list 
    function removeOrderFromCartAll(orderId)  
    {       
        for( var i in cart)
        {                  
                if(cart[i].orderId ===orderId)
                {
                    cart.splice(i,1);
                }
                break;          
        } 
        SaveCart();
    }

    //clearCart() -> clears all orders list
    function clearCart()  
    {       
        cart =[];
        SaveCart();
        
    }

    //countCart()  -> 
    function countCart()  
    {        
        var totalCount = 0;
        for(var i in cart){

            totalCount +=cart[i].count;     

        }   
        return totalCount;
    }

    //totalCost() ->total cost
    function totalCost()  
    {        
        var totalCost = 0;
        for(var i in cart){

            totalCost +=cart[i].price;     

        }   
        return totalCost;
    }
    //ListCart()
    function listCart()
    {        
        var CartCopy = [];
        for(var i in cart){
            
        var item=cart[i];
        var itemCopy={};
            
        for(var p in item){
            
            itemCopy[p]=item[p]; 
        }
        CartCopy.push(itemCopy);
        }
        
        return CartCopy;
    }

    //SaveCart()
    function SaveCart()
    {        
    localStorage.setItem("OrderList",JSON.stringify(cart));
    }

    //LoadCart()
    function LoadCart()
    {        
        cart =  JSON.parse(localStorage.getItem("OrderList",JSON.stringify(cart)));
    }
    LoadCart();
  
    // addOderToCart(1,"name",2,8,0,1)
    // console.log(cart);



