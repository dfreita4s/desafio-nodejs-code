import { Request, Response } from "express";
import { In } from "typeorm";
import { Member } from "../entities/Member";
import { departmentRepository } from "../repositores/departmentRepository";
import { memberRepository } from "../repositores/memberRepository";

export class MemberController {
    async create(req: Request, res: Response) {

        const deps = await departmentRepository.find({ where: { id: In(req.body.departments) } })

        const newMember = memberRepository.create({ ...req.body } as Member);

        const member = await memberRepository.save(newMember);

        member.departments = deps;

        await memberRepository.save(member);

        return res.status(201).json({
            success: true,
            payload: member
        });

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