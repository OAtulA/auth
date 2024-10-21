import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';
import User from '../models/User.model';
import { NextFunction, Request, Response } from 'express';

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    console.log("\n\n for the authenticateJWT\n");
    console.log("cookies are ", req.cookies); // Corrected to req.cookies

    try {
        // Access the token from cookies or authorization header
        const token = req.cookies.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
        
        if (token) {
            console.log("token is ", token);
            jwt.verify(token, JWT_SECRET, async (err: any, decoded: unknown) => {
                if (err) {
                    return res.status(401).json({ message: "Invalid token" });
                }

                // Check if decoded is an object and has an id property
                if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
                    const userId = (decoded as { id: string }).id; // Type assertion to extract id
                    try {
                        // Fetch the user from the database
                        const authUser = await User.findById(userId); // Use exec() for better promise handling
                        
                        if (!authUser) {
                            return res.status(404).json({ message: "User not found" });
                        }

                        req.user = authUser; // Attach user info to request
                        console.log("Our auth user in authenticateJWT is ", authUser.toJSON());
                        next(); // Proceed to next middleware or route handler
                    } catch (dbError) {
                        console.error("Database error:", dbError);
                        return res.status(500).json({ message: "Internal server error" });
                    }
                } else {
                    return res.status(401).json({ message: "Invalid token payload" });
                }
            });
        } else {
            return res.status(401).json({ message: "No token found" }); // Unauthorized if no token is present
        }
    } catch (err: any) {
        console.log("error is ", err);
        res.status(401).json({ message: "Error is " + err.message }); // Send error message in response
    }
}

export { authenticateJWT };
