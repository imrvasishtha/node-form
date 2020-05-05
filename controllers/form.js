const Validator = require('validator');
const Mailer = require('../helpers/nodemailer');

const save = (req, res) => {
    try {

        //handling validation error
        const handleError = (message) => {
            res.status(400).send({ message: "Data fetched Successfully" });
        }

        let json = {};

        //validating email address
        !!Validator.isEmail(req.body.email) ? json.email = Validator.normalizeEmail(req.body.email) : handleError("Please enter valid email Address");

        json.name = req.body.name|| null;;
        json.status = req.body.status|| null;;
        json.address = req.body.address || null;

        //sending mail after user data saved
        let mailObj = {}
        mailObj.email = json.email;
        mailObj.subject = "Verify your Email Address";
        mailObj.html = `<h3>Hi ${json.name}, Thank you for fill form </h3>`
        try {
            Mailer(mailObj);
        } catch (err) {
            return res.status(404).send({
                message: "Error while Sending mail"
            })
        }
        return res.status(200).send({
            message: "Thank you for signup, Please verify your Email Address"
        });
    } catch (err) {
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }

}

module.exports = {
 save
}