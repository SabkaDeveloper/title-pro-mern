const pool = require("../config/database");

// Middleware to check if the user is an Admin
const adminAuth = async (req, res, next) => {
    try {
        const userId = req.user.id; 

        // Fetch the user role from the database
        const query = `SELECT role FROM users WHERE id = $1;`;
        const result = await pool.query(query, [userId]);

        if (result.rows.length === 0) {
            return res.status(403).json({ success: false, message: "User not found" });
        }

        if (result.rows[0].role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied: Admins only" });
        }

        next(); 
    } catch (error) {
        console.error("Admin auth error:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = adminAuth;
