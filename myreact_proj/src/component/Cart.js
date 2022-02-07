import React from 'react';


class Cart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      items:[],
      DataisLoaded: false,
      val :1 ,
    }
    
  }
  componentDidMount(){
    const fetchData = () => {
      return fetch("https://dnc0cmt2n557n.cloudfront.net/products.json")
            .then((response) => response.json())
            .then((data) => {console.log(data);
              this.setState({
                items: data.products,
                DataisLoaded: true
            });
            });}

    fetchData();
    
  
     
  }

  sayhi(id){
    alert("hiii"+id);
    console.log(this.state.items.pop())
    this.state.val++;
  }
  
  render() {
    return (
      <>
       
        <section className="h-100" >
          <div className="container h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-8">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                  <div>

                  </div>
                </div>
                {
                this.state.items.map((item,index) => ( 
                  <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                          className="img-fluid rounded-3" alt="Cotton T-shirt" />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.title} {index}</p>
                        <p><span className="text-muted">Size: </span>M <span className="text-muted">Color: </span>Grey</p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button className="btn btn-danger">
                          -
                        </button>

                        <input id="form1" min="0" name="quantity" defaultValue="2" type="number"
                          className="form-control form-control-sm" style={{ width: "100px" }} />

                        <button className="btn btn-success">
                          +
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{item.currency}{item.price}</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" onClick={(e)=>this.sayhi(index)} className="text-danger"><i className="fas fa-trash fa-lg"></i>delete</a>
                      </div>
                    </div>
                  </div>
                  </div>
                ))
                }

              </div>
              <div className="col-4">
                <div className="card">
                  <div className="card-body">
                    <button type="button" className="btn btn-warning btn-block btn-lg">Proceed to Pay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
}
export default Cart