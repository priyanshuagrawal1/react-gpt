import { useEffect, useState } from 'react';
import './homepage.css';
import { useDispatch } from 'react-redux';
import PhotosGrid from './productsGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { filteredProducts } from '../features/products';
const Homepage = () => {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const dispatch = useDispatch()
    const handleButtonClick = (size: string) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter((s) => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };
    useEffect(() => {
        dispatch(
            filteredProducts(selectedSizes))
    }, [selectedSizes])

    const shirtSizes = ["XS", 'S', 'M', "ML", 'L', 'XL', 'XXL'];
    const products = useSelector((state: RootState) =>state.products.products)
    return (
        <div className="homepage">
            <div className="column1">
                <span style={{fontWeight:"600"}}>Sizes:</span>
                <div className='sizes'>
                    {shirtSizes.map((size) => (
                        <button
                            className={`button ${selectedSizes.includes(size) ? 'selected' : ''}`}
                            key={size}
                            onClick={() => handleButtonClick(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
                <div style={{fontSize:"12px", textAlign:"start", padding:"20px 0px"}}>Leave a star on Github if this repository was useful :)</div>
            </div>
            <div className='right-side'>
                <span>{ products.length} product(s) found</span>
                <PhotosGrid products={products} />
            </div>
        </div>
    );
};

export default Homepage;