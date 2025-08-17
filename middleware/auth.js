import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.query.token;
    const token = authHeader && (authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader);


    if (!token) return res.status(401).json({error: "Token required"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({error: "Invalid/expired token"});
        req.user = user;
        next();
    })
}
