import { Member } from "../entities/Member";

declare global{
    namespace Express {
        export interface Request{
            member: Partial<Member>                            
        }
    }
}