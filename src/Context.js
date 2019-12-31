import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data'; 

const ProductContext = React.createContext();

class ProductProvider extends Component {

    state = {
        products: [],
        detailProduct:detailProduct,
        cart:storeProducts,
        modelOpen:false,
        modelProduct: detailProduct,
        cartSubTotal:0,
        cartTax: 0,
        cartTotal: 0,
    };

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach (item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState( () => {
            return {products:tempProducts}
        })
    }

    getItem = id => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetails = (id) => {
        const product = this.getItem(id);
        this.setState( () => {
            return {detailProduct:product}
        })
    };

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState( () => {
            return {products:tempProducts, cart:[...this.state.cart, product] };
        }, () => {
            console.log(this.state);
        });
    };
    // tester = () => {
    //     console.log('state products :', this.state.products[0].inCart);
    //     console.log('data products :', storeProducts[0].inCart);

    //     const tempProducts = [...this.state.products];
    //     tempProducts[0].inCart = true
    //     this.setState ( () => {
    //         return {products: tempProducts}
    //     }, () => {
    //         console.log('state products :', this.state.products[0].inCart);
    //         console.log('data products :', storeProducts[0].inCart);
    //     })
    // }

    openModel = id => {
        const product = this.getItem(id);
        this.setState( () => {
            return {modelProduct:product, modelOpen:true}
        })
    }

    closeModel = () => {
        this.setState( () => {
            return {modelOpen:false}
        })
    }

    increment = (id) => {
        console.log("increment method")
    }

    decrement = (id) => {
        console.log("decrement method")
    }

    removeItem = (id) => {
        console.log("item moved")
    }

    clearCart = (id) => {
        console.log("cart was cleared")
    }

    render() {
        return (
            <ProductContext.Provider 
                value={{...this.state, 
                    handleDetails:this.handleDetails, 
                    addToCart:this.addToCart,
                    openModel:this.openModel,
                    closeModel:this.closeModel,
                    increment:this.increment,
                    decrement:this.decrement,
                    removeItem:this.removeItem,
                    clearCart:this.clearCart
                    }}>
                {/* <button onClick = {this.tester}>test me</button> */}
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };