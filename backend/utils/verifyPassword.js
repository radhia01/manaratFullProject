 const verifyPasswordMiddleware = async (req, res,next) => {
    try {
      const {password} = req.body;
      const {email}=req.body
      if (password.length < 8) {
        return res.status(400).json({
          error: "MUST_8_CARACTERS",
        });
      } else if (password.includes(email)) {
        return res.status(400).json({
          error: "MUST_NOT_CONTENT_EMAIL",
        });
      } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return res.status(400).json({
          error:
            "MUST_CONTENT_LOWER_AND_LOWER",
        });
      } else if (!/[0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\-]/.test(password)) {
        return res.status(400).json({
          error: "MUST_CONTENT_SPECIFIC_CARACTERS",
        });
      }
      next();
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  module.exports=verifyPasswordMiddleware