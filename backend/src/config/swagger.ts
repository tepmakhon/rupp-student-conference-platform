import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title:
        "RUPP Student Conference & Opportunity Platform API",
      version: "1.0.0",
      description:
        "Backend API Documentation",
    },

    servers: [
      {
        url: "http://localhost:5050",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/modules/**/*.ts",
  ],
});