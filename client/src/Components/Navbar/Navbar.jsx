import React, { useContext, useEffect, useState } from 'react';
import "./navbar.scss";
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Cart from '../Cart/Cart';
import { AuthContext } from '../../Context/AuthContext';
import SearchBar from '../SearchBar/SearchBar';
import apiRequest from '../../lib/apiRequest';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [move, setMove] = useState(false);
    const [catOpen, setCatOpen] = useState(false);

    const [searchOpen, setSearchOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await apiRequest.get("/categories");
            setCats(res.data);
        }
        getCats();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (currentUser) {
                try {
                    const res = await apiRequest.get(`/cart/${currentUser._id}`,{
                        headers: {
                          Authorization: `Bearer ${currentUser.accessToken}` 
                        }});
                    setCartItems(res.data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                setCartItems([]);
            }
        };
        fetchCartItems();
    }, [currentUser,cartItems]);

    const cartCount = cartItems.reduce((total, cart) => total + cart.products.length, 0);

    return (
        <div className='navbar'>
            <div className="wrapper">
                <div className="left">
                    <div className="item">
                        <img src="/img/en.png" alt='' />
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="item">
                        <span>USD</span>
                        <KeyboardArrowDownIcon />
                    </div>
                    
                    <div className="item">
                        <div className="links">
                            {cats.map((cat) => (
                                <Link className="link" to={`/products?cat=${cat.name}`} key={cat._id}>
                                    <h6>{cat.name}</h6>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="center">
                    <Link to="/" className='logoLink'>
                        <div className="logo">
                            <span className='dot'>.</span>
                            <span className='text'>STORE</span>
                        </div>
                    </Link>
                </div>
                <div className="right">
                    <div className="item">
                        <Link to="/" className='link'>Home</Link>
                    </div>
                    <div className="item">
                        <Link to="/about" className='link'>About</Link>
                    </div>
                    <div className="item">
                        <Link to="/contact" className='link'>Contact</Link>
                    </div>
                   
                    <div className="icons">
                        <SearchIcon className='searchIcon' onClick={() => setSearchOpen(!searchOpen)} />
                        {currentUser ? (
                            <>
                                <Link to="/profile" className='link'>
                                    <div className="user">
                                    <img src={currentUser.avatar || currentUser.photoURL  || "/img/noavatar.jpg"} alt="avatar" />

                                    </div>
                                </Link>
                                <Link to="/favorites" className='link'>
                                    <FavoriteBorderIcon className='favoriteBorder' />
                                </Link>
                            </>
                        ) : (
                            <Link className='link' to="/login"><PermIdentityIcon /></Link>
                        )}
                        <div className="cartIcon" onClick={() => setOpen(!open)}>
                            <ShoppingCartIcon />
                            <span>{cartCount}</span>
                        </div>
                    </div>
                    {open && (
                        <Cart />
                    )}
                    <div className="menuIcon">
                        <span onClick={() => setMove(!move)}><MenuIcon /></span>
                    </div>
                    <div className={move ? "menu active" : "menu"}>
                        <div className="searchBar">
                            <SearchIcon />
                            <input type="text" placeholder='Search by product ...' className='searchIcon' onClick={() => setSearchOpen(!searchOpen)}  />
                        </div>
                        <div className="top">
                            {currentUser ? (
                                <>
                                   <Link to="/profile" className='link'>
                                    <div className="userSm">
                                        <img src={currentUser.avatar || currentUser.photoURL || "/img/noavatar.jpg"} alt="avatar" />
                                    </div>
                                </Link>                                
                                </>
                            ):(
                                <Link className='link' to="/login"><PermIdentityIcon /></Link>

                            )}
                            <Link className='link' to="/favorites"><FavoriteBorderIcon /></Link>
                            <CloseIcon onClick={() => setMove(!move)} />
                        </div>
                        <div className="menuItems">
                            <Link to="/" className='link'>Home</Link>
                            <hr/>
                            <div className="categories">
                            <Link to="/products" className='link' onClick={() => setCatOpen(!catOpen)}>
                           <div className="catText">
                           <span >Categories</span> 
                           <ArrowDropDownIcon className='icon'/>
                           </div>
                             </Link>
                            <div className={`links ${catOpen ? "open" : ""}`}>
                            {cats.map((cat) => (
                            <Link className="link" to={`/products?cat=${cat.name}`} key={cat._id}>
                           <h6>{cat.name}</h6>
                           </Link>
                           ))}
                           </div>
                            </div>
                           
                        <hr/>

                            <Link to="/about" className='link'>About</Link>
                            <hr/>

                            <Link to="/contact" className='link'>Contact</Link>
                        </div>
                    </div>
                </div>
                {searchOpen && (
                    <SearchBar />
                )}
            </div>
        </div>
    );
}

export default Navbar;
