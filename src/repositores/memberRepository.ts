import { AppDataSource } from "../data-source";
import { Member } from "../entities/Member";

export const memberRepository = AppDataSource.getRepository(Member); 