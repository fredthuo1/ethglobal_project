import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CarListPage = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        // Fetch list of cars from your API or contract
        // Example API call: axios.get('/api/cars')
        // setCars(response.data);
        const dummyCars = [
            { id: 1, name: 'Car 1' },
            { id: 2, name: 'Car 2' },
            { id: 3, name: 'Car 3' },
        ];
        setCars(dummyCars);
    }, []);

    return (
        <div>
            <h2>Car List</h2>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        <Link to={`/cardetails/${car.id}`}>{car.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarListPage;
