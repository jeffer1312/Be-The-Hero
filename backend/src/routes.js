const express = require("express");
const routes = express.Router();
const { celebrate, Segments, Joi } = require("celebrate");

//controladores
const ongsController = require("./controllers/ongsController");
const incidentsController = require("./controllers/incidentsController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

//rotas
routes.post(
    "/sessions",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required()
        })
    }),
    SessionController.create
);
routes.get("/ongs", ongsController.index);

//Celebrate para fazer validação dos dados dentro do body
routes.post(
    "/ongs",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string()
                .required()
                .email(),
            whatsapp: Joi.string()
                .required()
                .min(10)
                .max(11),
            city: Joi.string().required(),
            uf: Joi.string()
                .required()
                .length(2)
        })
    }),
    ongsController.create
);

//Celebrate para fazer validação dos dados dentro do headers
routes.get(
    "/profile",
    celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),
    ProfileController.index
);
// celebrate para validação nas query
routes.get(
    "/incidents",
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }),
    incidentsController.index
);
//validando headers e body
routes.post(
    "/incidents",
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required()
        }),
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    }),
    incidentsController.create
);
//validando nas params
routes.delete(
    "/incidents/:id",
    celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }),
    incidentsController.delete
);

module.exports = routes;