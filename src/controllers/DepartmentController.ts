import { Request, Response } from "express";
import { departmentRepository } from "../repositores/departmentRepository";

export class DepartmentController {
    async create(req: Request, res: Response){
        const newDepartment = departmentRepository.create(req.body);

        await departmentRepository.save(newDepartment);

        return res.status(201).json({
            success: true,
            payload: newDepartment,
        })
    } 
}