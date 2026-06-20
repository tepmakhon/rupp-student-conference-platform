import helmet

from "helmet";

import compression

from "compression";

import rateLimit

from "express-rate-limit";

import hpp

from "hpp";

export const helmetMiddleware =

helmet();

export const compressionMiddleware =

compression();

export const hppMiddleware =

hpp();

export const apiLimiter =

rateLimit({

 windowMs:

 15 * 60 * 1000,

 max: 200,

 standardHeaders:

 true,

 legacyHeaders:

 false,

 message: {

  success: false,

  message:

  "Too many requests"

 }

});