import exp from 'express';

//create mini - express(Seperate Route) app
//one express is enough to handle so we will use mini express(it can handle routes but cant listen to request from client)
export const productApp=exp.Router();

let products=[];

//GET request handling route
productApp.get('/products',(req,res)=>{
    //send all products
    res.json({message:"products are",payload:products});
})

//POST request handling route
productApp.post('/products',(req,res)=>{
    //getting product from request
    let newProduct=req.body;
    //adding product
    products.push(newProduct);
    res.json({message:"Product added"});
})

//PUT request handling route
productApp.put('/products',(req,res)=>{
    //getting modified product from request
    let updatedProduct=req.body;

    //Finding product Index to be updated
    let productIndex=products.findIndex(product=>product.productId==updatedProduct.productId)
    
    //if product not found
    if(productIndex===-1){
        return res.json({message:"product not found"});
    }
    let modifiedProduct=products.splice(productIndex,1,updatedProduct);
    res.json({message:"product updated successfully"}); 
})

//GET request handling route (product by Id)

 productApp.get('/product-id/:id',(req,res)=>{

     let productId=Number(req.params.id);

     let product=products.find(p=>p.productId===productId);
     if(!product){
         return res.json({message:"product not found"});
     }
     res.json({message:"product",payload:product});

 })

//GET request handling route for (products by Brand)

  productApp.get('/product-brand/:brand',(req,res)=>{

      let brand=req.params.brand.toLowerCase();

      let brandProducts=products.filter(product=>product.brand.toLowerCase()===brand);

      if(!brandProducts){
          return res.json({message:"no products in this brand"});
      }
      res.json({message:"products in this brand are",payload:brandProducts});

  })

//DELETE request handling route (delete product by id)

 productApp.delete('/products/:id',(req,res)=>{

    let pId = Number(req.params.id);

    let productIndex = products.findIndex(product => product.productId===pId);
    
    if(productIndex===-1){
        return res.json({message:"product not found"});
    }

    let deletedProduct = products.splice(productIndex,1);

    res.json({message:"product deleted"});

 })
