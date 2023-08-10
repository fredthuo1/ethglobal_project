import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MaintenanceRecordPage = () => {
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

    return (
        <div>
            <h2>Maintenance Record Details</h2>
            {maintenanceRecord ? (
                <div>
                    <p>Date: {maintenanceRecord.date}</p>
                    <p>Description: {maintenanceRecord.description}</p>
                </div>
            ) : (
                    <p>Loading maintenance record details...</p>
                )}
        </div>
    );
};

export default MaintenanceRecordPage;
