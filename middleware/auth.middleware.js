import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { Teacher } from "../models/teacher.model.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
   
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
        throw new ApiError(400, 'Token not found');
    }

    try {

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const teacher = await Teacher.findOne({
            where: {
                teacher_id: decodedToken.teacher_id,
            },
        });

        if (!teacher) {
            throw new ApiError(404, 'Teacher not found');
        }

        req.teacher = teacher;

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(403, 'Invalid or expired token');
        }
        throw new ApiError(500, 'Internal server error');
    }
});

export { verifyjwt };
