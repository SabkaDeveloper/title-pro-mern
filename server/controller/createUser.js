const User = require("../model/user");

exports.createUser = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
        const { title, name, email, household_role, responsibility, type } = req.body;

        // Validate required fields
        if (!title || !name || !email || !household_role || !responsibility || !type) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required.",
            });
        }

        // Check if the title is valid
        const validTitles = ["Mr.", "Mrs.", "Miss", "Ms.", "Dr.", "Prof."];
        if (!validTitles.includes(title)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid title. Choose from 'Mr.', 'Mrs.', 'Miss', 'Ms.', 'Dr.', or 'Prof.'.",
            });
        }

        // Check if the type is valid
        const validTypes = ["child", "mother", "father", "grandparent", "guardian"];
        if (!validTypes.includes(type)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid user type. Choose from 'child', 'mother', 'father', 'grandparent', or 'guardian'.",
            });
        }

        const newUser = await User.create({
            title,
            name,
            email,
            household_role,
            responsibility,
            type,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`, // Generates a profile image
        });

        return res.status(201).json({
            status: 201,
            message: "Family member added successfully.",
            data: newUser,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Server error. Please try again later.",
        });
    }
};
