const sendActivationEmail = require("../../helpers/email");
const { createJSONWebToken } = require("../../helpers/jsonwebtoken");

// signin  serivcess
const userLogin = async ({ email, password, user }) => {

    try {
        const expiresInOneYear = 365 * 24 * 60 * 60; // seconds in 1 year
        const accessToken = createJSONWebToken({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, expiresInOneYear);
        console.log(accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error in userLogin service:", error);
        throw new Error("Error occurred while logging in user");
    }
};
// forgot the password
const forgotPasswordService = async (email, user) => {
    try {
        // // Generate the one-time code
        // const oneTimeCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        // console.log(oneTimeCode,"this is one time code for jenerate for user ===================")
        
        // // Prepare email for activate user
        // const emailData = {
        //     email,
        //     subject: 'Account Activation Email',
        //     html: `
        //         <h1>Hello, ${user.name}</h1>
        //         <p>Your One Time Code is <h3>${oneTimeCode}</h3> to verify your email</p>
        //         <small>This Code is valid for 3 minutes</small>
        //     `
        // }
        // console.log(emailData,"this is one time code for emailData ===================")


        // Send email
        // try {
        //     await sendActivationEmail(email, user.name);
        //     console.log("this is one time code for emailData ===================")

        // } catch (emailError) {
        //     console.error('Failed to send verification email', emailError);
        //     throw new Error('Error sending activation email');
        // }

        // Set one-time code to user
        
        // console.log(oneTimeCode,"this is one time code for emailData ===================")


        // Save user with the same one-time code
        try {
           const emailResult= await sendActivationEmail(email, user.name);
            const oneTimeCode = emailResult.oneTimeCode;
            user.oneTimeCode = oneTimeCode;

            await user.save();
        } catch (saveError) {
            console.error('Failed to save oneTimeCode to user', saveError);
            throw new Error('Error saving oneTimeCode to user');
        }

        const expiresInOneHour = 3600; // seconds in 1 hour
        const accessToken = createJSONWebToken({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, expiresInOneHour);
       
        return accessToken;
    } catch (error) {
        console.error("Error in forgotPassword service:", error);
        throw new Error("Error occurred while processing forgotPassword request");
    }
};

// change the password sercvice
const changePasswordService = async ({user, password}) => {
    console.log(user.password=password,"this is password")
    try {
        if(user){
           
            user.password = password;
            await user.save();
            return true;
        }
        else{
            throw new Error("Error occurred while changing password");
        }
    } catch (error) {
        console.error("Error in changePassword service:", error.message);
        throw new Error("Error occurred while changing password");
    }
}
module.exports={
    userLogin,
    forgotPasswordService,
    changePasswordService
}