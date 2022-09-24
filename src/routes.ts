import { Router } from 'express'
import { DepartmentController } from './controllers/DepartmentController';
import { MemberController } from './controllers/MemberController';
import { RoleController } from './controllers/RoleController';

const routes = Router();

routes.get('/', () => {console.log('DEU CERTO FML')});
routes.post('/member/create', new MemberController().create);
routes.get('/members', new MemberController().get);
routes.post('/role/create', new RoleController().create);
routes.post('/department/create', new DepartmentController().create);

export default routes;