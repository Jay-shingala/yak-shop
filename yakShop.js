const express = require('express');
const fs = require('fs');
const app = express();

// Helper functions
const calculateMilk = (daysOld) => 50 - (daysOld * 0.03);
const calculateShaveInterval = (daysOld) => 8 + (daysOld * 0.01);
const convertYearsToDays = (years) => Math.floor(years * 100);

// Load the herd data from the input JSON file
let herdData = {};
const loadHerdData = (filePath) => {
    const rawData = fs.readFileSync(filePath);
    herdData = JSON.parse(rawData);
};

// Calculate the stock after T days
const calculateStock = (T) => {
    let totalMilk = 0;
    let totalSkins = 0;

    herdData.herd.forEach(yak => {
        let ageInDays = convertYearsToDays(yak.age);
        for (let day = 0; day < T; day++) {
            ageInDays += 1;
            if (ageInDays > 1000) continue; // Yak is dead
            totalMilk += calculateMilk(ageInDays);

            // Check if the yak can be shaved
            if (ageInDays >= 100 && (day === 0 || (day % Math.floor(calculateShaveInterval(ageInDays - 1)) === 0))) {
                totalSkins += 1;
            }
        }
    });

    return { milk: totalMilk.toFixed(2), skins: totalSkins };
};

// Calculate the herd status after T days
const getHerdStatus = (T) => {
    return herdData.herd.map(yak => {
        let ageInDays = convertYearsToDays(yak.age) + T;
        let ageInYears = ageInDays / 100;
        let lastShavedAge = Math.floor(ageInYears);
        
        // Return yak status
        return {
            name: yak.name,
            age: ageInYears.toFixed(2),
            "age-last-shaved": lastShavedAge.toFixed(2)
        };
    });
};

// API Endpoints
app.get('/yak-shop/stock/:T', (req, res) => {
    const T = parseInt(req.params.T);
    const stock = calculateStock(T);
    res.json(stock);
});

app.get('/yak-shop/herd/:T', (req, res) => {
    const T = parseInt(req.params.T);
    const herdStatus = getHerdStatus(T);
    res.json({ herd: herdStatus });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`YakShop server running on port ${port}`);
});

// Load initial herd data from the input file
const filePath = process.argv[2];
loadHerdData(filePath);
