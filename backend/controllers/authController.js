const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Email Validation
const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        // Name validation
        if (cleanName.length < 2 || cleanName.length > 50) {
            return res.status(400).json({
                message: "Name must be between 2 and 50 characters",
            });
        }

        // Email validation
        if (!isValidEmail(cleanEmail) || cleanEmail.length > 254) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }

        // Password validation
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters",
            });
        }

        if (Buffer.byteLength(password, "utf8") > 72) {
            return res.status(400).json({
                message: "Password is too long",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: cleanEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name: cleanName,
            email: cleanEmail,
            password: hashedPassword,
        });

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(201).json({
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Register Error:", error);

        // Handle duplicate email race condition
        const isDuplicate = error.code === 11000 || (error.errorResponse && error.errorResponse.code === 11000);
        if (isDuplicate) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }

        return res.status(500).json({
            message: "Registration failed",
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const cleanEmail = email.trim().toLowerCase();

        if (!isValidEmail(cleanEmail)) {
            return res.status(400).json({
                message: "Please enter a valid email address",
            });
        }

        const user = await User.findOne({
            email: cleanEmail,
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user._id);

        res.cookie("token", token, cookieOptions);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Login failed",
        });
    }
};


// LOGOUT USER
const logoutUser = (req, res) => {
    const { maxAge, ...clearOptions } = cookieOptions;

    res.clearCookie("token", clearOptions);

    return res.status(200).json({
        message: "Logout successful",
    });
};


// GET LOGGED-IN USER
const getMe = (req, res) => {
    return res.status(200).json({
        user: req.user,
    });
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
};