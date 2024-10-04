import React, { useEffect, useState } from 'react';
import "./list.scss";
import Card from '../Card/Card';
import apiRequest from '../../lib/apiRequest';
import Loading from '../Loading/Loading'; // Import your loading component

const List = ({ category, maxPrice, sort, filters }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        let queryString = `/products?maxPrice=${maxPrice}`;

        if (category) {
          queryString += `&cat=${category}`; // Add category
        }

        // Adding filters for subcategories
        const selectedSubcategories = Object.entries(filters)
          .filter(([key, value]) => value) // Only keep checked subcategories
          .map(([key]) => key); // Get the names of the checked subcategories

        if (selectedSubcategories.length > 0) {
          queryString += `&subCategory=${selectedSubcategories.join(',')}`; // Join with a comma
        }

        if (sort) {
          queryString += `&sort=${sort}`; // Add sort option
        }

        console.log('Fetching data from:', queryString);  // Debugging

        const res = await apiRequest.get(queryString);

        if (res.data && res.data.length > 0) {
          setData(res.data);
        } else {
          setData([]);  // Clear data if no products found
        }
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError('Failed to fetch products');
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [category, maxPrice, sort, filters]);

  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='list'>
      {data.length > 0 ? (
        data.map(item => (
          <Card item={item} key={item._id} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default List;
