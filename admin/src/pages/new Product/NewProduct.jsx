import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { productInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

const NewProduct = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { data, loading } = useFetch("/categories");
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCategorySelect = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategory(selectedCategoryId);

    const selectedCategory = data.find((category) => category._id === selectedCategoryId);
    if (selectedCategory) {
      setSubCategories(selectedCategory.subCategories.map(subCat => subCat.name) || []);
      setSelectedSubCategories([]); // Reset selected subcategories
    }
  };

  const handleSubCategorySelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSubCategories(selectedOptions);
  };

  const handleSizeSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSize(selectedOptions);
  };

  const handleColorSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setColor(selectedOptions);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Upload images to Cloudinary
      const list = await Promise.all(
        Array.from(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "mystore");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dneg17tpk/image/upload",
            data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
  
      // Prepare new product data
      const newProduct = {
        ...info,
        categories: [{
          category: categories.find(cat => cat._id === selectedCategory)?.name || selectedCategory, // Get the category name
          subCategories: selectedSubCategories, // Keep subcategories as array of names
        }],
        size,
        color,
        images: list,
      };
  
      // Send the new product to the backend
      await apiRequest.post("/products", newProduct);
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={files.length > 0
                ? URL.createObjectURL(files[0])
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="Product Preview"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {productInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>In Stock</label>
                <select id="stock" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>

              <div className="selectItems">
                {/* Categories Select */}
                <div className="selectCategories">
                  <label>Categories </label>
                  <select id="categories" onChange={handleCategorySelect}>
                    {loading
                      ? <option>Loading...</option>
                      : categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Subcategories Select */}
                <div className="selectCategories">
                  <label>Subcategories </label>
                  <select id="subCategories" multiple onChange={handleSubCategorySelect}>
                    {subCategories.length === 0
                      ? <option disabled>No subcategories available</option>
                      : subCategories.map((subCategory, index) => (
                          <option key={index} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                  </select>
                </div>

                {/* Sizes Select */}
                <div className="formInput">
                  <label>Sizes</label>
                  <select id="size" multiple onChange={handleSizeSelect}>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                {/* Colors Select */}
                <div className="formInput">
                  <label>Colors</label>
                  <select id="color" multiple onChange={handleColorSelect}>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                  </select>
                </div>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
