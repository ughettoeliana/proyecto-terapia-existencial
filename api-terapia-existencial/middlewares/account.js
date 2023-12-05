//import accountSchema from "../schemas/account.js";
import userSchema from "../schemas/user.js";
import accountServices from '../services/account.js';

export async function validateAccount(req, res, next) {
  try {
    const data = await userSchema.validate(req.body, { runValidators: true });
    req.body = data;
    next();
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function verifySession(req, res, next) {
  const token = req.headers['auth-token'];

  if (!token) {
    return res.status(401).json({ msg: "No se encuentra el token" });
  }

  try {
    const payload = await accountServices.verifyToken(token);
    req.token = token;
    req.session = payload;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "El Token no es valido" });
  }
}
