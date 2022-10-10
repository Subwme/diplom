const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const tokenSevice = require("../services/token.service");
const Token = require("../models/Token");
const router = express.Router({ mergeParams: true });

router.post("/sign-up", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const { email, password } = req.body;

      const exitingUser = await User.findOne({ email });
//TODO: Валидировать регистрацию
      if (exitingUser) {
        return res.status(200).json({
          error: {
            email: "Такой email уже существует",
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
        password: hashedPassword,
        gender: req.body.gender,
      });

      const tokens = tokenSevice.generate({
        isAdmin: newUser.isAdmin,
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
      });
      await tokenSevice.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, _id: newUser._id });
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

router.post("/sign-in", [
  check("email", "Указан некорректный Email").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const { email, password } = req.body;
      const existingUser = await User.findOne({ email });
//TODO: Валидировать логин
      if (!existingUser) {
        return res.status(200).send({
          error: {
            email: "Нверный Email или пароль",
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(200).send({
          error: {
            password: "Неверный Email или пароль",
          },
        });
      }

      const tokens = tokenSevice.generate({
        isAdmin: existingUser.isAdmin,
        name: existingUser.name,
        email: existingUser.email,
        _id: existingUser._id,
      });
      await tokenSevice.save(existingUser._id, tokens.refreshToken);
      res.status(200).send({ ...tokens, _id: existingUser._id });
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenSevice.validateRefreshToken(refreshToken);
    const dbToken = await tokenSevice.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenSevice.generate({
      _id: data._id,
    });

    await tokenSevice.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, _id: data._id });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
