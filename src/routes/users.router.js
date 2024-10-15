import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { SECRET_KEY } from "../config/config.js";
import { UserDTO } from "../dao/DTOs/user.dto.js";
import Cart from "../models/cart.model.js";

const router = express.Router();
const userRepository = new UserRepository();


router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCart = new Cart({ products: [] });
    await newCart.save();

    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      cart: newCart.id
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


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userRepository.findByEmail(email);
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "Email invalido" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Contraseña no encontrada" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
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

router.get("/logout", (req, res) => {
  res.clearCookie("jwt"); 
  res.redirect("/login"); 
});

export default router;