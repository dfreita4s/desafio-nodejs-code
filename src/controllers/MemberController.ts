import { Request, Response } from "express";
import { In } from "typeorm";
import { Member } from "../entities/Member";
import { departmentRepository } from "../repositores/departmentRepository";
import { memberRepository } from "../repositores/memberRepository";
import { roleRepository } from "../repositores/roleRepository";

export class MemberController {
    async create(req: Request, res: Response) {

        const deps = await departmentRepository.find({ where: { id: In(req.body.departments) } })

        const newMember = memberRepository.create({ ...req.body } as Member);

        const member = await memberRepository.save(newMember);

        const roles = await roleRepository.find({ where: { id: In(req.body.role) } })


        member.departments = deps;
        member.role = roles;


        await memberRepository.save(member);

        return res.status(201).json({
            success: true,
            payload: member
        });

    }
    async remove(req: Request, res: Response) {

        const memberToRemove = await memberRepository.findOneBy({ id: req.params.id })

        if (!memberToRemove)
            return res.status(404).json({
                success: false,
                message: 'Member with that ID not found'
            })

        await memberRepository.remove(memberToRemove);

        return res.status(200).json({
            success: true,
            payload: memberToRemove.name,
            message: 'Resource deleted successfully'
        })
    }

    async update(req: Request, res: Response) {
        try {
            const memberToEdit = await memberRepository.findOneBy({ id: req.params.id });
            const deps = await departmentRepository.find({ where: { id: In(req.body.departments) } })
            const roles = await roleRepository.find({ where: { id: In(req.body.role) } })
            const editedMember = memberRepository.create({ ...req.body } as Member);

            if (!memberToEdit)
            return res.status(404).json({
                success: false,
                message: 'Member with that ID not found'
            })
            
            
            editedMember.departments = deps;
            editedMember.role = roles;
            
            console.log(memberToEdit)
            console.log(req.body)
            console.log(editedMember)

            const memberEdited = await memberRepository.update(memberToEdit, editedMember);

            console.log(memberEdited)

            return res.status(200).json({
                success: true,
                payload: memberEdited,
                message: 'Resource updated successfully'
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Internal server Error'
            });
        }
    }

    async view(req: Request, res: Response) {
        const viewMember = await memberRepository.findOneBy({ id: req.params.id })
        if (!viewMember)
            return res.status(404).json({
                success: false,
                message: 'Memeber with that ID not found'
            });

        return res.status(200).json({
            success: true,
            payload: viewMember
        })
    }

    async get(req: Request, res: Response) {
        const members = await memberRepository.find({
            relations: {
                departments: true
            }
        });
        return res.status(200).json({
            members
        })
    }
}