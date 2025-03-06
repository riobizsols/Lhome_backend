const Lhome_User = require('../model/LhomeUser')
const { json } = require('sequelize');

// Fetch user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Lhome_User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
