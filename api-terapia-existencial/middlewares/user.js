
export const validateCreateUser = (req, res, next) => {
  const { password, email, user} = req.body;

  if (!password || !email || !user) {
    return res.status(400).json({ msg: 'Datos de usuario no válidos' });
  }

  next();
};
