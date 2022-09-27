import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { memberRepository } from "../repositores/memberRepository";

type jwtPayload = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        
        if (!authorization)
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
        
        const token = authorization.split(' ')[1]
        
        const { id } = jwt.verify(token, process.env.JWT_PASS ?? '') as jwtPayload
        
        const member = await memberRepository.findOneBy({ id })

        if (!member)
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });

        req.member

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server Error'
        });
    }
}