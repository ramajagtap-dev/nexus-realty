const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); // Aapka database connection pool

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. BASE ROUTE: Saari properties fetch karne ke liye
app.get('/api/properties', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Properties');
    res.json(rows); // Direct data array bhej rahe hain
  } catch (error) {
    console.error("Database fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. SEARCH ROUTE: Filters aur Buy/Rent categories ke sath search karne ke liye
app.get('/api/properties/search', async (req, res) => {
  try {
    const { city, property_type, bhk_size, listing_type } = req.query;
    
    let sql = 'SELECT * FROM Properties WHERE 1=1';
    const params = [];

    // Category Filter: Agar Buy/Rent selected hai toh condition lagao
    if (listing_type) {
      sql += ' AND listing_type = ?';
      params.push(listing_type);
    }

    if (city) {
      sql += ' AND city LIKE ?';
      params.push(`%${city}%`);
    }
    if (property_type && property_type !== 'Luxury Apartment') { 
      sql += ' AND property_type = ?';
      params.push(property_type);
    }
    if (bhk_size) {
      const numericBhk = parseInt(bhk_size);
      if (!isNaN(numericBhk)) {
        sql += ' AND bhk_size = ?';
        params.push(numericBhk);
      }
    }

    const [rows] = await db.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Database search error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 3. ADD ROUTE: Nayi property form se save karne ke liye
app.post('/api/properties', async (req, res) => {
  try {
    const {
      title, description, property_type, listing_type, 
      price, bhk_size, square_ft, address, city, state, image_url
    } = req.body;

    // Validation: Essential fields check ho rahi hain
    if (!title || !price || !city) {
      return res.status(400).json({ success: false, message: "Title, Price aur City zaroori hain!" });
    }

    const sql = `
      INSERT INTO Properties 
      (title, description, property_type, listing_type, price, bhk_size, square_ft, address, city, state, owner_or_agent_id, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Default user_id = 1 pass ho raha hai
    const values = [
      title, description || null, property_type || 'Luxury Apartment', listing_type || 'Buy',
      parseFloat(price), parseInt(bhk_size) || 2, parseInt(square_ft) || 1200,
      address || null, city, state || null, 1, 
      image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500'
    ];

    const [result] = await db.query(sql, values);
    
    res.json({ success: true, message: "Property successfully added!", property_id: result.insertId });
  } catch (error) {
    console.error("Database insert error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// 🔥 4. DELETE ROUTE: Database se property udaane ke liye (ADDED & INJECTED)
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const propertyId = req.params.id;

    if (!propertyId) {
      return res.status(400).json({ success: false, message: "Property ID provide karna zaroori hai!" });
    }

    const sql = 'DELETE FROM Properties WHERE id = ?';
    const [result] = await db.query(sql, [propertyId]);

    // Agar database me wo ID mili hi nahi
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Property nahi mili ya pehle hi delete ho chuki hai!" });
    }

    res.json({ success: true, message: "Property database se successfully uda di gayi hai!" });
  } catch (error) {
    console.error("Database delete error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server crawling on port ${PORT}`);
});