const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'OpenAPI',
            version: '1.0.0',
        },

    },
    apis: ['./pages/spec.yml'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/backend', swaggerUi.serve, swaggerUi.setup(swaggerSpec));