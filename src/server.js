const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const cities = [
    { name: 'Yapkashnagar', distance: 60 },
    { name: 'Lihaspur', distance: 50 },
    { name: 'Narmis City', distance: 40 },
    { name: 'Shekharvati', distance: 30 },
    { name: 'Nuravgram', distance: 20 },
];

const vehiclesarr = [
    { name: 'EV Bike', range: 60, count: 2 },
    { name: 'EV Car', range: 100, count: 1 },
    { name: 'EV SUV', range: 120, count: 1 },
];

let copsSelections = [];
let fugitiveCity = '';

function selectFugitiveCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    fugitiveCity = cities[randomIndex].name;
}

selectFugitiveCity();

app.get('/cities', (req, res) => {
    res.json(cities);
});

app.get('/vehicles', (req, res) => {
    res.json(vehiclesarr);
});

app.post('/vehicles', (req, res) => {
    console.log(req.body);
    res.json(vehiclesarr);
});

app.post('/api/start-simulation', (req, res) => {
    console.log('Simulation request received:', req.body);

    const { vehicles } = req.body;
    console.log('Selected vehicles:', vehicles);
    const { cop1, cop2 } = vehicles;

    copsSelections = [];

    const selectedVehicleCop1 = vehiclesarr.find(v => v.name === cop1);
    const selectedVehicleCop2 = vehiclesarr.find(v => v.name === cop2);

    console.log('Cop1 selected vehicle:', selectedVehicleCop1);
    console.log('Cop2 selected vehicle:', selectedVehicleCop2);
    if (!selectedVehicleCop1 || !selectedVehicleCop2) {
        return res.status(400).json({ error: 'Invalid vehicle selection' });
    }

    const availableCities = [...cities];

    const cityForCop1 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];
    const cityForCop2 = availableCities.splice(Math.floor(Math.random() * availableCities.length), 1)[0];

    copsSelections.push({ copName: 'Cop1', cityName: cityForCop1.name, vehicleName: cop1 });
    copsSelections.push({ copName: 'Cop2', cityName: cityForCop2.name, vehicleName: cop2 });

    console.log("Cops' selections:", copsSelections);
    console.log('Fugitive city:', fugitiveCity);

    const capturingCop = copsSelections.find(selection => selection.cityName === fugitiveCity);
    console.log('Capturing cop:', capturingCop);

    const capturingCity = cities.find(city => city.name === fugitiveCity);
    console.log('Capturing city:', capturingCity);
    if (capturingCity && capturingCop) {
        res.json({ success: true, capturingCop: capturingCop.copName, city: capturingCity, vehicle: selectedVehicleCop1.name });
    } else {
        res.json({ success: false });
    }
});

app.get('/result', (req, res) => {
    console.log("Current selections:", copsSelections);

    const capturingCop = copsSelections.find(selection => selection.cityName === fugitiveCity);

    if (capturingCop) {
        const capturingCity = cities.find(city => city.name === fugitiveCity);
        const capturingVehicle = vehiclesarr.find(vehicle => vehicle.name === capturingCop.vehicleName);

        res.json({
            success: true,
            capturingCop: capturingCop.copName,
            city: capturingCity,
            vehicle: capturingVehicle
        });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
