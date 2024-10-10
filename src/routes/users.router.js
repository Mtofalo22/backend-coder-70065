import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { SECRET_KEY } from "../config/config.js";
import isAuthenticated from "../config/passport.js";
import { UserDTO } from "../dao/DTOs/user.dto.js";

const router = express.Router();
const userRepository = new UserRepository();

// Ruta para registro
router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    };

    const createdUser = await userRepository.createUser(newUser);
    const userDTO = new UserDTO(createdUser); 

    res.status(201).json({ message: "User registered successfully", user: userDTO });
  } catch (error) {
    if (error.message === "Email already in use") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "User has no password set." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    
    res.cookie("jwt", token, { httpOnly: true, secure: false });
    
    res.redirect("/auth/profile");
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: error.message });
  }
});



router.get("/current", isAuthenticated, async (req, res) => {
  
  try {
    const userDTO = new UserDTO(req.user); 
    res.json(userDTO); 
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
  res.clearCookie("jwt"); 
  res.redirect("/login"); 
});

export default router;
