import { Request, Response } from "express";
import { departmentRepository } from "../repositores/departmentRepository";

export class DepartmentController {
    async create(req: Request, res: Response){
        const newDepartment = departmentRepository.create(req.body);

        const depExists = await departmentRepository.findOneBy({ name: req.body.name })

        if (depExists)
            return res.status(409).json({
                success: false,
                message: 'Department already exists'
            });

        await departmentRepository.save(newDepartment);

        return res.status(201).json({
            success: true,
            payload: newDepartment,
        })
    } 

    async remove(req: Request, res: Response){
        const departmentToRemove = await departmentRepository.findOneBy({id: req.params.id})
        
        if(!departmentToRemove)
            return res.status(404).json({
                success: false, 
                message: 'department with that ID not found'
            })
            
        
        await departmentRepository.remove(departmentToRemove);

        return res.status(200).json({
            success: true,
            payload: departmentToRemove.name,
            message: 'Resource deleted successfully'
        })
    }

    async update(req: Request, res: Response){
        try{
            const departmentToEdit = await departmentRepository.findOneBy({id: req.params.id});
            if(!departmentToEdit)
                return res.status(404).json({
                    success: false,
                    message: 'department with that ID not found'
                })
            const departmentEdited = await departmentRepository.update(departmentToEdit, req.body);

            return res.status(200).json({
                success: true,
                payload: departmentEdited,
                message: 'Resource updated successfully'
            });
        } catch (error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Internal server Error'
            });
        }
    }

    async view(req: Request, res: Response){
        const viewdepartment = await departmentRepository.findOneBy({id: req.params.id})
        if(!viewdepartment)
            return res.status(404).json({
                success: false,
                message: 'Memeber with that ID not found'
            });

        return res.status(200).json({
            success: true,
            payload: viewdepartment
        })
    }

}