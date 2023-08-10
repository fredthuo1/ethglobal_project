import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CarDetails = () => {
    const { carId } = useParams();
    const [carDetails, setCarDetails] = useState(null);

    useEffect(() => {
        // Fetch car details using carId and update state
        // Example API call: axios.get(`/api/cars/${carId}`)
        // setCarDetails(response.data);
    }, [carId]);

    if (!carDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Car Details</h2>
            <p>Car ID: {carDetails.id}</p>
            <p>Car Name: {carDetails.name}</p>
            {/* Display other car details */}
        </div>
    );
};

export default CarDetails;
