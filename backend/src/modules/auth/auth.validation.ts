import {

  AppError,

}

from "../../utils/AppError.js";

import {

  RegisterPayload,

  LoginPayload,

}

from "./auth.types.js";

export const validateRegister = (

  data: RegisterPayload

) => {

  if (

    !data.email

  ) {

    throw new AppError(

      "Email is required",

      400

    );

  }

  if (

    !data.password

  ) {

    throw new AppError(

      "Password is required",

      400

    );

  }

  if (

    data.password.length < 8

  ) {

    throw new AppError(

      "Password must be at least 8 characters",

      400

    );

  }

  if (

    !data.roleName

  ) {

    throw new AppError(

      "Role is required",

      400

    );

  }

};

export const validateLogin = (

  data: LoginPayload

) => {

  if (

    !data.email ||

    !data.password

  ) {

    throw new AppError(

      "Invalid credentials",

      400

    );

  }

};