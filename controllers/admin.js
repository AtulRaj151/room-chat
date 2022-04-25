const Admin = require('../model/Admin');

module.exports.registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!(username && password)) {
            return res.status(400).send({
                message: "invalid input"
            });
        }
        const oldAdmin = await Admin.findOne({username});
        if(oldAdmin) {
            return res.status(409).send({
                message: "user already exits, please login"
            })
        }
        const admin = await Admin.create({username, password});
        return res.status(200).send({
            message: true,
            admin,
            password
        })
    
        
    } catch (error) {
       
        return res.status(500).json({ success: false, error: error })
    }
}

module.exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!(username && password)) {
            return res.status(400).send({
                message: "invalid input"
            });
        }
        const oldAdmin = await Admin.findOne({username});
        if(oldAdmin) {
            return res.status(200).send({
                message: true,
            })
        }
        return res.status(200).send({
            message: "please register!",
        })
    
        
    } catch (error) {
       
        return res.status(500).json({ success: false, error: error })
    }
}