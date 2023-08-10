import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditMaintenancePage = () => {
    const { carId, maintenanceId } = useParams();
    const [maintenanceRecord, setMaintenanceRecord] = useState(null);

    useEffect(() => {
        // Fetch maintenance record details based on carId and maintenanceId
        // Example API call: axios.get(`/api/cars/${carId}/maintenances/${maintenanceId}`)
        // setMaintenanceRecord(response.data);
        const dummyMaintenanceRecord = {
            id: maintenanceId,
            date: '2023-08-10',
            description: 'Oil change',
        };
        setMaintenanceRecord(dummyMaintenanceRecord);
    }, [carId, maintenanceId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Update maintenance record details
        // Example API call: axios.put(`/api/cars/${carId}/maintenances/${maintenanceId}`, maintenanceRecord)
    };

    return (
        <div>
            <h2>Edit Maintenance Record</h2>
            {maintenanceRecord ? (
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" value={maintenanceRecord.date} onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, date: e.target.value })} />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" value={maintenanceRecord.description} onChange={(e) => setMaintenanceRecord({ ...maintenanceRecord, description: e.target.value })} />
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            ) : (
                    <p>Loading maintenance record...</p>
                )}
        </div>
    );
};

export default EditMaintenancePage;
