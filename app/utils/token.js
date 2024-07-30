
const jwt = require('jsonwebtoken');
const Response = require('../../helpers/response');

const verifyTokenAndRole = (req, res) => {
    // Get the token from the request headers
    const tokenWithBearer = req.headers.authorization;
    let token;
    
    if (tokenWithBearer && tokenWithBearer.startsWith('Bearer ')) {
        // Extract the token without the 'Bearer ' prefix
        token = tokenWithBearer.slice(7);
    }
    
    if (!token) {
        return res.status(401).json(Response({ statusCode: 401, message: 'Token is missing.', status: 'failed' }));
    }
    
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // console.log(decoded); // Log the decoded token
        // if (decoded.role !== "Provider") {
        //     return res.status(404).json(Response({ statusCode: 404, message: 'You are not  Provider.', status: 'failed' }));
        // }
        
        // if (decoded.role !== "Provider") {
        //     return res.status(404).json(Response({ statusCode: 404, message: 'You are not a Provider.', status: 'failed' }));
        // }
        
        // Return the decoded token value
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(500).json(Response({ statusCode: 500, message: 'Internal server error.', status: 'failed' }));
    }
};

module.exports = verifyTokenAndRole;
