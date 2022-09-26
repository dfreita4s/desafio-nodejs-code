import { Router } from 'express'
import { DepartmentController } from './controllers/DepartmentController';
import { MemberController } from './controllers/MemberController';
import { RoleController } from './controllers/RoleController';

const routes = Router();

routes.post('/member/create', new MemberController().create);
routes.get('/member/:id', new MemberController().view);
routes.delete('/member/:id', new MemberController().remove)
routes.get('/members', new MemberController().get);


routes.post('/role/create', new RoleController().create);
routes.delete('/role/:id', new RoleController().remove)
routes.post('/department/create', new DepartmentController().create);

export default routes;