import { react, useEffect, useState } from "react";

function ShopCart() {
  const [productData, setProductData] = useState([]);
  const [val, setVal] = useState(0);
  
  
  const fetchData = async () => {
    try {
      if(localStorage.getItem('cartdata')){
        const data = localStorage.getItem('cartdata');
        const pro = JSON.parse(data);
        setProductData(pro);
        setVal(val+1)
        //console.log('local');
        
      }
      else{
        const res = await fetch("https://dnc0cmt2n557n.cloudfront.net/products.json");
        const proddata = await res.json();
        proddata.products.map(item=>{item.qty=1});
        setProductData(proddata.products);
        
        setVal(val+1)
       // console.log(proddata);
        //console.log("api")
      }
    } catch (error) {
      console.log(error)
    }
  }
  


  
  useEffect(() => {
    
      fetchData()
  },[]);
  
  const savestate=()=>{
    var data = JSON.stringify(productData);
    localStorage.setItem('cartdata',data);
  }
 const deleteproduct = (index)=>{
  //alert(index);
  productData.splice(index,1);
  setProductData(productData);
  savestate();
  setVal(val+1);
}
const inc_dec_product=(index,inc)=>{
  if(inc==='i'){
    productData[index].qty+=1;
  }
  else{
    if(productData[index].qty===1){
      var x = window.confirm("Can't Have less then 1 \nDo you want to Delete Product")===true ?deleteproduct(index):"";
    }
    else{
      productData[index].qty-=1;
    }
  }
  setProductData(productData);
 // console.log(productData);
  
  savestate();
  setVal(val+1)
}
const setqty=(index,value)=>{
  //console.log(value);
  if(value<1){
    alert("Can't set value Less then 1--"+value);
  }
  else{
   // console.log("val added");
    productData[index].qty=value;
  }
  //console.log(productData);
  setProductData(productData);
  
  savestate();
  setVal(val+1);
}
const gettotalitem =()=>{ 
  let totalpro=0
  productData.map((item,index)=>{
    totalpro+=item.qty;
  });
  return totalpro;
}
const gettotalprice =()=>{ 
  let totalprice=0
  productData.map((item,index)=>{
    totalprice+=parseInt(item.price*item.qty);
  });
  return totalprice;
}

  return (
    <>

      <section className="h-100" >
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center h-100">
            <div className="col-8">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                <div>

                </div>
              </div>
              {
                productData.map((item,index)=>(
                  
                 
                <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                          className="img-fluid rounded-3" alt="Cotton T-shirt" />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.title}</p>
                        <p><span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey</p>
                        <p><span className="text-muted">Price: </span>{item.currency}{item.price} </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <a onClick={(e)=>inc_dec_product(index,'d')} href="#"><button className="btn btn-danger">-</button></a>
                       
                        <input id="form1" min="1" name="quantity" value={item.qty} type="number"
                          className="form-control form-control-sm" style={{ width: "100px" }} onChange={(e)=> setqty(index,e.target.value)} />
                        
                        <a onClick={(e)=>inc_dec_product(index,'i')} href="#"><button className="btn btn-success">
                          +
                        </button></a>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{item.currency}{item.price * item.qty} </h5>

                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" onClick={()=>deleteproduct(index)} className="text-danger"><i className="fas fa-trash fa-lg"></i>delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              }

            </div>
            <div className="col-lg-4 col-md-4">
            <div className="d-flex justify-content-between align-items-center mb-4"><h3 className="fw-normal mb-0 text-black">Cart Summary</h3></div>
              <div className="card">
                <div className="card-body">
                  <h3>Total Product {gettotalitem()}</h3>
                  <h3>Total Amount : {gettotalprice()}</h3>
                  
                  <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ShopCart
