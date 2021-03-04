import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controller: {
    tipoTripulante: {
      name: "TipoTripulanteController",
      path: "../controllers/tipoTripulanteController"
    },
    tipoViatura: {
      name: "TipoViaturaController",
      path: "../controllers/tipoViaturaController"
    },
    percurso: {
      name: "PercursoController",
      path: "../controllers/percursoController"
    },
    linha: {
      name: "LinhaController",
      path: "../controllers/linhaController"
    },
    no: {
      name: "NoController",
      path: "../controllers/noController"
    },
    importarDados: {
      name: "ImportarDadosController",
      path: "../controllers/importarDadosController"
    }
  },

  repos: {
    tipoTripulante: {
      name: "TipoTripulanteRepo",
      path: "../repos/tipoTripulanteRepo"
    },
    tipoViatura: {
      name: "TipoViaturaRepo",
      path: "../repos/tipoViaturaRepo"
    },
    no: {
      name: "NoRepo",
      path: "../repos/noRepo"
    },
    percurso: {
      name: "PercursoRepo",
      path: "../repos/percursoRepo"
    },
    linha: {
      name: "LinhaRepo",
      path: "../repos/linhaRepo"
    }
  },

  services: {
    tipoTripulante: {
      name: "TipoTripulanteService",
      path: "../services/tipoTripulanteService"
    },
    tipoViatura: {
      name: "TipoViaturaService",
      path: "../services/tipoViaturaService"
    },
    no: {
      name: "NoService",
      path: "../services/noService"
    },
    percurso: {
      name: "PercursoService",
      path: "../services/percursoService"
    },
    linha: {
      name: "LinhaService",
      path: "../services/linhaService"
    },
    importarDados: {
      name: "ImportarDadosService",
      path: "../services/importarDadosService"
    }
  }
};
