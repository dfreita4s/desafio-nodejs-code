import { Request, Response } from "express";
import { roleRepository } from "../repositores/roleRepository";

export class RoleController {
    async create(req: Request, res: Response) {
        const newRole = roleRepository.create(req.body);

        const roleExists = await roleRepository.findOneBy({ name: req.body.name })

        if (roleExists)
            return res.status(409).json({
                success: false,
                message: 'Role already exists'
            });

        await roleRepository.save(newRole);

        return res.status(201).json({
            success: true,
            payload: newRole,
        });
    }

    async remove(req: Request, res: Response) {
        const roleToRemove = await roleRepository.findOneBy({ id: req.params.id })

        if (!roleToRemove)
            return res.status(404).json({
                success: false,
                payload: [],
                message: 'Role with that ID not found'
            })

        await roleRepository.remove(roleToRemove);

        return res.status(200).json({
            success: true,
            message: 'Resource deleted successfully'
        })
    }

    async update(req: Request, res: Response) {
        try {
            const roleToEdit = await roleRepository.findOneBy({ id: req.params.id });
            if (!roleToEdit)
                return res.status(404).json({
                    success: false,
                    payload: [],
                    message: 'Role with that ID not found'
                })
            
        const roleExists = await roleRepository.findOneBy({ name: req.body.name })

        if (roleExists)
            return res.status(409).json({
                success: false,
                message: 'Role already exists'
            });

            const roleEdited = await roleRepository.update(roleToEdit, req.body);
            return res.status(200).json({
                success: true,
                payload: roleEdited,
                message: "Resource updated successfully",
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                payload: [],
                message: 'Internal server Error'
            })
        }
    }

    async view(req: Request, res: Response) {
        const viewrole = await roleRepository.findOneBy({ id: req.params.id })
        if (!viewrole)
            return res.status(404).json({
                success: false,
                payload: [],
                message: 'Role with that ID not found'
            })
        return res.status(200).json({
            success: true,
            payload: viewrole
        });
    }
}