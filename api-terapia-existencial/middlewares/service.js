
export const validateCreateService = (req, res, next) => {
  const { name, modality, time, price} = req.body;

  if (!modality || !name || !time || !price) {
    return res.status(400).json({ msg: 'Datos del servicio no válidos' });
  }
  next();
};
