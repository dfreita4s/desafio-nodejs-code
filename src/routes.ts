import { Router } from 'express'
import { DepartmentController } from './controllers/DepartmentController';
import { MemberController } from './controllers/MemberController';
import { RoleController } from './controllers/RoleController';

const routes = Router();

routes.post('/member/create', new MemberController().create);
routes.get('/member/:id', new MemberController().view);
routes.delete('/member/:id', new MemberController().remove);
routes.post('/member/update/:id', new MemberController().update);
routes.post('/login', new MemberController().login)

routes.post('/role/create', new RoleController().create);
routes.get('/role/:id', new RoleController().view);
routes.delete('/role/:id', new RoleController().remove);
routes.post('/role/update/:id', new RoleController().update)


routes.post('/department/create', new DepartmentController().create);
routes.get('/department/:id',     new DepartmentController().view);
routes.delete('/department/:id',  new DepartmentController().remove);
routes.post('/department/update/:id', new DepartmentController().update)

export default routes;