const db = require('../config/db');

exports.searchProperties = async (req, res) => {
    try {
        let { listing_type, location, property_type, min_price, max_price, bhk_size, verified_only } = req.query;

        let query = `
            SELECT p.*, u.full_name as agent_name, u.is_verified 
            FROM Properties p
            JOIN Users u ON p.owner_or_agent_id = u.user_id
            WHERE p.status = 'Available'
        `;
        let queryParams = [];

        if (listing_type) {
            queryParams.push(listing_type);
            query += ` AND p.listing_type = $${queryParams.length}`;
        }
        if (location) {
            queryParams.push(`%${location}%`);
            query += ` AND p.city ILIKE $${queryParams.length}`;
        }
        if (property_type) {
            queryParams.push(property_type);
            query += ` AND p.property_type = $${queryParams.length}`;
        }
        if (min_price && max_price) {
            queryParams.push(min_price, max_price);
            query += ` AND p.price BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
        }
        if (bhk_size) {
            queryParams.push(bhk_size);
            query += ` AND p.bhk_size = $${queryParams.length}`;
        }
        if (verified_only === 'true') {
            query += ` AND u.is_verified = TRUE`;
        }

        const { rows } = await db.query(query, queryParams);
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};