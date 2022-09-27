import { Request, Response } from "express";
import { In } from "typeorm";
import { Member } from "../entities/Member";
import { departmentRepository } from "../repositores/departmentRepository";
import { memberRepository } from "../repositores/memberRepository";
import { roleRepository } from "../repositores/roleRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

type jwtPayload = {
    id: string
}

export class MemberController {
    async create(req: Request, res: Response) {

        const { email, password } = req.body

        const memberExist = await memberRepository.findOneBy({ email })

        if (memberExist)
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });

        const hasPassword = await bcrypt.hash(password, 10)


        const deps = await departmentRepository.find({ where: { id: In(req.body.departments) } })

        const newMember = memberRepository.create({
            ...req.body,
            password: hasPassword
        } as Member);

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

            const memberEdited = await memberRepository.preload({
                ...editedMember,
                id: memberToEdit.id,
            });

            if (memberEdited != undefined)
                memberRepository.save(memberEdited)

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

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const member = await memberRepository.findOneBy({ email });
        if (!member)
            return res.status(409).json({
                success: false,
                message: 'Email or Password not found'
            });

        const verifyPass = await bcrypt.compare(password, member.password);

        if (!verifyPass)
            return res.status(409).json({
                success: false,
                message: 'Email or Password not found'
            });


        const token = jwt.sign({ id: member.id }, process.env.JWT_PASS ?? '', {
            expiresIn: '8h'
        })

        return res.status(200).json({
            success: true,
            payload: token,
            message: 'Login successfully'
        })
    }

    async getMember(req: Request, res: Response) {
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

    }
}