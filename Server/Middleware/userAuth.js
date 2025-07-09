import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, msg: 'Not authorized, login again!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded?.id) {
            return res.json({ success: false, msg: 'Invalid token' });
        }

        req.user = { id: decoded.id }; 
        next();
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
};

export default userAuth;
