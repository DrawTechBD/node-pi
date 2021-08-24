// import dependencies
// load libraries
const validator = require("validator");
const UserModel = require("./userModel");

// load utility functions
const utils = require("../../helper/utils");

module.exports = {
    validateRegisterInput: async function (data){
        let errors = {};

        data.name = !utils.isEmpty(data.name) ? data.name : "";
        data.email = !utils.isEmpty(data.email) ? data.email : "";
        data.password = !utils.isEmpty(data.password) ? data.password : "";

        // TODO: validate duplicate email
        const user = await UserModel.findOne({email: data.email});

        if (user) {
            console.log(user);
            errors.email = "Email already exists!"
        }

        if (!validator.isLength(data.name, {min: 2, max: 30})) {
            errors.name = "Name must be between 2 and 30 characters";
        }

        if (validator.isEmpty(data.name)) {
            errors.name = "Name field is required";
        }

        if (!validator.isEmail(data.email)) {
            errors.email = "Invalid Email";
        }

        if (validator.isEmpty(data.email)) {
            errors.email = "Email field is required";
        }

        if (validator.isEmpty(data.password)) {
            errors.password = "Password field is required";
        }

        if (!validator.isLength(data.password, {min: 6, max: 30})) {
            errors.password = "Password must be at least 6 characters";
        }
        return {
            errors,
            isValid: utils.isEmpty(errors),
        };
    },


    validateLoginInput: function (data) {
        let errors = {};

        data.email = !utils.isEmpty(data.email) ? data.email : "";
        data.password = !utils.isEmpty(data.password) ? data.password : "";

        if (!validator.isEmail(data.email)) {
            errors.email = "Invalid Email";
        }

        if (validator.isEmpty(data.email)) {
            errors.email = "Email field is required";
        }

        if (validator.isEmpty(data.password)) {
            errors.password = "Password field is required";
        }

        return {
            errors,
            isValid: utils.isEmpty(errors),
        };
    }
}
