class LoginController {
  validate(req,res) {
    res.json({
      message:"Validation Ok..."
    })
  }
}
module.exports = new LoginController();
