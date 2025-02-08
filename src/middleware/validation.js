const Joi = require('joi');

const itemSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(500)
});

const validateItem = (req, res, next) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateItem
};