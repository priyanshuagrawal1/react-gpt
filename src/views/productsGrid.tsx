import { useState } from 'react'
import "./productsGrid.css"
import { Product } from '../features/products'
import CartMenu from './cart'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cart'
export default function PhotosGrid(props: { products: Product[] }) {
    const products = props.products
    const [hover,setHover] = useState("")
    const [showCartMenu, setShowCartMenu] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const dispatch = useDispatch();
    function handleAddToCart(product:Product) {
        dispatch(addToCart({product:product,selectedSizes:selectedSizes}))
        setShowCartMenu(true);
    }
    function toggleCartMenu() {
        setShowCartMenu(!showCartMenu);
    }
    function front(product: Product) {
        setHover(product.title)
    }
    function back() {
        setHover("")
    }
    function updateSelectedSize(product:Product,value:string){
        setSelectedSizes(prevState => {
            let newState = [...prevState]
            newState[product.id] = value;
            return newState;
        })
    }
    return (
        <div className="product-grid">

            {products.map((product) => (
                <div className="product-sheet" key={product.id}>
                    <div style={{position: "relative"}}>
                     <img className='product-image' src={`https://raw.githubusercontent.com/jeffersonRibeiro/react-shopping-cart/main/src/static/products/${product.sku}-${hover == product.title ? 2 : 1}-product.webp`} alt="Product 1 Image"
                            onMouseOver={() => front(product)} onMouseLeave={back} />
                    {product.isFreeShipping && <div className='product-image' style={{zIndex:"9",position:"absolute",top:"0",right:"3px",backgroundColor:"black",height:"15px",color:"white",fontSize:"9px",padding:"3px"}}> Free Shipping</div>}
                    </div>
                    <div className="product-info">
                        <span style={{ padding: "10px 0 10px 0 ", textAlign: "center" }}>{product.title}</span>
                        <div style={{ width: "25px", height: "2.3px", margin: "0 0 10px 0 ",backgroundColor:"rgb(234, 191, 0)"}}></div>
                        <span style={{ fontSize: "12px", fontWeight: "300" }}>{product.currencyFormat}
                            <span style={{ fontSize: "18px", fontWeight: "500" }}>{Math.floor(product.price)}</span>
                            <span style={{ fontSize: "14px", fontWeight: "400" }}>.{((product.price % 1) * 100).toFixed(0)}</span>
                        </span>
                        <span style={{ color: "gray", fontWeight: "500" }}> or {product.installments != 0 ? product.installments:1} x {product.currencyFormat}{(product.installments!=0?(product.price/product.installments):product.price).toFixed(2)}</span>
                        <div style={{
                            display: "flex", margin: "10px 0 0 0 ", }}> 
                            <button className='add-to-cart' onClick={()=>handleAddToCart(product)}>Add to Cart</button>
                            <select className='size-select' value={selectedSizes[product.id]} onChange={(event) => updateSelectedSize(product, event.target.value)}>{product.availableSizes.map(size => <option key={size} value={size}>{size}</option>)}</select>
                        </div>
                    </div>
                </div>
            ))}
            
            {<CartMenu showCartMenu={showCartMenu} onClose={toggleCartMenu} ></CartMenu>}
        </div>
    )
}
