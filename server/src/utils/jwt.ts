import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

// @ts-ignore
function authenticateJWT(req, res, next) {
    console.log("\n\n for the authenticateJWT\n");
    console.log("cookies are ", req.cookies); // Corrected to req.cookies

    try {
        // Access the token from cookies or authorization header
        const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
        
        if (token) {
            console.log("token is ", token);
            jwt.verify(token, JWT_SECRET, (err:any, user:unknown) => {
                if (err) {
                    return res.json({message: "Invalid token"});
                }
                // 💡📝 I need to grab the user from the db here and set it to the req.user
                req.user = user; // Attach user info to request
                next(); // Proceed to next middleware or route handler
            });
        } else {
            res.json({message:"No token found"}); // Unauthorized if no token is present
        }
    } catch (err:any) {
        console.log("error is ", err);
        res.status(401).json({ message: "error is " + err.message }); // Send error message in response
    }
}

export { authenticateJWT };
