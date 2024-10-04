import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skeleton.scss'; 

const SingleProductSkeleton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`singleProductSkeleton ${isVisible ? 'fade-in' : ''}`}>
            <div className="left">
                <Skeleton height={300} width={300} />
                <div className="images">
                    <Skeleton height={100} count={3} />
                </div>
            </div>
            <div className="right">
                <Skeleton height={30} width="80%" />
                <Skeleton height={20} width="30%" />
                <Skeleton height={100} />
                <div className="quantity">
                    <Skeleton width={50} height={30} />
                </div>
                <div className="links">
                    <Skeleton height={30} width="30%" />
                    <Skeleton height={30} width="30%" />
                </div>
                <Skeleton height={30} />
                <div className="info">
                    <Skeleton height={20} width="40%" />
                    <Skeleton height={20} width="60%" />
                </div>
            </div>
        </div>
    );
};

export default SingleProductSkeleton;
