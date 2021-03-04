import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const tipoTripulanteSchema = {
    name: 'tipoTripulanteSchema',
    schema: '../persistence/schemas/tipoTripulanteSchema',
  };

  const tipoViaturaSchema = {
    name: 'tipoViaturaSchema',
    schema: '../persistence/schemas/tipoViaturaSchema',
  };

  const percursoSchema = {
    name: 'percursoSchema',
    schema: '../persistence/schemas/percursoSchema',
  };

  const linhaSchema = {
    name: 'linhaSchema',
    schema: '../persistence/schemas/linhaSchema',
  };

  const noSchema = {
    name: 'noSchema',
    schema: '../persistence/schemas/noSchema',
  };

  const tipoTripulanteController = {
    name: config.controller.tipoTripulante.name,
    path: config.controller.tipoTripulante.path
  };

  const tipoViaturaController = {
    name: config.controller.tipoViatura.name,
    path: config.controller.tipoViatura.path
  };

  const percursoController = {
    name: config.controller.percurso.name,
    path: config.controller.percurso.path
  };

  const linhaController = {
    name: config.controller.linha.name,
    path: config.controller.linha.path
  };

  const importarDadosController = {
    name: config.controller.importarDados.name,
    path: config.controller.importarDados.path
  };

  const noController = {
    name: config.controller.no.name,
    path: config.controller.no.path
  };

  const tipoTripulanteRepo = {
    name: config.repos.tipoTripulante.name,
    path: config.repos.tipoTripulante.path
  };

  const tipoViaturaRepo = {
    name: config.repos.tipoViatura.name,
    path: config.repos.tipoViatura.path
  };

  const percursoRepo = {
    name: config.repos.percurso.name,
    path: config.repos.percurso.path
  };

  const linhaRepo = {
    name: config.repos.linha.name,
    path:config.repos.linha.path
  };

  const noRepo = {
    name: config.repos.no.name,
    path: config.repos.no.path
  };

  const tipoTripulanteService = {
    name: config.services.tipoTripulante.name,
    path: config.services.tipoTripulante.path
  };

  const tipoViaturaService = {
    name: config.services.tipoViatura.name,
    path: config.services.tipoViatura.path
  };

  const percursoService = {
    name: config.services.percurso.name,
    path: config.services.percurso.path
  };

  const linhaService = {
    name: config.services.linha.name,
    path: config.services.linha.path
  };

  const importarDadosService = {
    name: config.services.importarDados.name,
    path: config.services.importarDados.path
  };

  const noService = {
    name: config.services.no.name,
    path: config.services.no.path
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      tipoTripulanteSchema,
      tipoViaturaSchema,
      percursoSchema,
      linhaSchema,
      noSchema
    ],
    controllers: [
      tipoTripulanteController,
      tipoViaturaController,
      percursoController,
      linhaController,
      importarDadosController,
      noController
    ],
    repos: [
      tipoTripulanteRepo,
      tipoViaturaRepo,
      percursoRepo,
      linhaRepo,
      noRepo
    ],
    services: [
      tipoTripulanteService,
      tipoViaturaService,
      percursoService,
      linhaService,
      importarDadosService,
      noService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
