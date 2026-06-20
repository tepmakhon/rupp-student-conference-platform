import {

 Request,

 Response,

 NextFunction,

}

from "express";

import * as searchService
from "./search.service.js";

import {

 successResponse,

}

from "../../utils/apiResponse.js";

export const globalSearch =

async (

 req: Request,

 res: Response,

 next: NextFunction

) => {

 try {

   const q =

   String(

    req.query.q ||

    ""

   );

   const data =

   await searchService

   .globalSearch(q);

   return successResponse(

     res,

     data,

     "Search results"

   );

 }

 catch(error){

   next(error);

 }

};