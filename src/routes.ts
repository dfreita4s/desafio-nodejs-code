import { Router } from 'express'
import { DepartmentController } from './controllers/DepartmentController';
import { MemberController } from './controllers/MemberController';
import { RoleController } from './controllers/RoleController';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

routes.post('/login', new MemberController().login)

routes.post('/member/create', authMiddleware, new MemberController().create);
routes.get('/member/view/:id', new MemberController().view);
routes.delete('/member/delete/:id', authMiddleware, new MemberController().remove);
routes.post('/member/update/:id', authMiddleware, new MemberController().update);

routes.post('/role/create', authMiddleware, new RoleController().create);
routes.get('/role/view/:id', new RoleController().view);
routes.delete('/role/delete/:id', authMiddleware, new RoleController().remove);
routes.post('/role/update/:id', authMiddleware, new RoleController().update)


routes.post('/department/create', authMiddleware, new DepartmentController().create);
routes.get('/department/view/:id', new DepartmentController().view);
routes.delete('/department/delete/:id', authMiddleware, new DepartmentController().remove);
routes.post('/department/update/:id', authMiddleware, new DepartmentController().update)

export default routes;