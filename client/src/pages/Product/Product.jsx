import React, { useEffect, useState } from 'react';
import "./product.scss";
import TuneIcon from '@mui/icons-material/Tune';
import List from '../../Components/List/List';
import { useLocation, useParams } from 'react-router';
import apiRequest from '../../lib/apiRequest';
import Loading from '../../Components/Loading/Loading';

const Product = () => {
    const { id } = useParams();
    const [maxPrice, setMaxPrice] = useState(1000);
    const [sort, setSort] = useState(null);
    const [filters, setFilters] = useState({});
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [subCategories, setSubCategories] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('cat');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await apiRequest.get('/categories');
                const allCategories = res.data;
                const selectedCategory = allCategories.find(cat => cat.name === category);

                if (selectedCategory) {
                    setSubCategories(selectedCategory.subCategories || []);
                }
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, [category]);

    const handleFilters = (e) => {
        const { name, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: checked
        }));
        console.log('Updated filters:', {
            ...filters,
            [name]: checked
        });
    };
    

    const fetchData = async () => {
        setLoading(true);
        try {
            let queryString = `/products?maxPrice=${maxPrice}`;

            if (category) {
                queryString += `&cat=${category}`;
            }

            const selectedSubcategories = Object.entries(filters)
                .filter(([key, value]) => value)
                .map(([key]) => key);

            if (selectedSubcategories.length > 0) {
                queryString += `&subCategory=${selectedSubcategories.join(',')}`;
            }

            if (sort) {
                queryString += `&sort=${sort}`;
            }

            console.log('Fetching data from:', queryString);

            const res = await apiRequest.get(queryString);
            if (res.data && res.data.length > 0) {
                setData(res.data);
            } else {
                setData([]);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch products');
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [category, maxPrice, sort, filters]);

    return (
        <div className='product'>
            {loading ? (
                <div className="loading"></div>
            ) : (
                <>
                    <div className="left">
                        <span className='filterIcon' onClick={() => setOpen(!open)}>
                            <TuneIcon /> Filter
                        </span>
                        {open && (
                            <>
                                <div className="leftItems">
                                    <h3>Categories</h3>
                                    {subCategories.map((sub) => (
                                        <div key={sub.name} className="inputItem">
                                            <input
                                                type='checkbox'
                                                name={sub.name}
                                                onChange={handleFilters}
                                                checked={filters[sub.name] || false}
                                            />
                                            <span>{sub.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                <h3>Filter by Price</h3>
                                <div className="filterItem">
                                    <span>0</span>
                                    <input
                                        type='range'
                                        min={0}
                                        max={1000}
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                    <span>{maxPrice} TND</span>
                                </div>
                                <hr />
                                <div className="leftItems">
                                    <h3>Sort by</h3>
                                    <div className="inputItem">
                                        <input
                                            type="radio"
                                            name='sort'
                                            value="asc"
                                            onChange={() => setSort("asc")}
                                            checked={sort === "asc"}
                                        />
                                        <span>Price (Lowest first)</span>
                                    </div>
                                    <div className="inputItem">
                                        <input
                                            type="radio"
                                            name='sort'
                                            value="desc"
                                            onChange={() => setSort("desc")}
                                            checked={sort === "desc"}
                                        />
                                        <span>Price (Highest first)</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="right">
                        <div className="catImage">
                            <img 
                                src="https://shop.mango.com/cms-assets/v3/assets/blt351b9b24ac05a648/blt009c65c595e688aa/66afc3b58d57c670a114b2c0/LANDING_NN_(4).jpg?imdensity=1&im=RegionOfInterestCrop,width=1920,height=823,regionOfInterest=(1044.48,447.78000000000003)" 
                                alt="Category" 
                                className='topImage' 
                            />
                            <span>NEW NOW</span>
                        </div>
                        <List 
                            category={category} 
                            catId={id} 
                            maxPrice={maxPrice} 
                            sort={sort} 
                            filters={filters} 
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
