// Buses.js

import { useEffect, useState } from 'react';

export function Buses() {
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        getBuses();
    }, []);

    async function getBuses() {
        const response = await fetch('/.netlify/functions/getBuses');
        const { buses } = await response.json();
        setBuses(buses);
    }

    return (
        <ul>
            {buses.map((bus) => (
                <li key={bus.numero}>{bus.numero}</li>
            ))}
        </ul>
    );
}

export default Buses;
