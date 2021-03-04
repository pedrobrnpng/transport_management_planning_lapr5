import { Router } from 'express';
//import auth from './routes/authRoute';
import tipoTripulanteRoute from './routes/tipoTripulanteRoute';
//import { Console } from 'console';
import percursoRoute from './routes/percursoRoute';
import linhaRoute from './routes/linhasRoutes';
import importarDadosRoute from './routes/importarDadosRoute';
import noRoute from './routes/noRoute';
import tipoViaturaRoute from './routes/tipoViaturaRoute';

export default () => {
	const app = Router();
	tipoTripulanteRoute(app);
	percursoRoute(app);
	noRoute(app);
	linhaRoute(app);
	importarDadosRoute(app);
	tipoViaturaRoute(app);

	return app;
}