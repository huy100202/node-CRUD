const Joi = require("joi");

async function student(req, res, next) {
  delete req.body.btn_submit;
  try {
    const registerSchema = Joi.object({
      full_name: Joi.string().min(3).max(30).required(),
      class: Joi.string().min(3).max(30),
      address: Joi.string().min(3).max(30).required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      image: Joi.string(),
      ctl: Joi.string(),
    });
    const result = await registerSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { student };
