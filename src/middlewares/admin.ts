/* import { NextFunction, Request, Response } from 'express';

import objection from 'models/objection';
import { IRequest } from 'types/common';
import { responseError } from 'utils';
import { ERROR_CODE } from '../constants/error';

export const verifyAdminMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers || {};
  const token = authorization?.toString?.()?.replace?.('Bearer ', '');

  if (token) {
    try {
      const admin = await objection.User.$getInfoByToken(token);

      if (!admin) {
        throw new Error(ERROR_CODE.AUTH.UNAUTHORIZED);
      }

      req.admin = admin;
      next();
    } catch (error) {
      res.status(400).json(responseError({ error }));
    }
  } else {
    res.status(401).json(responseError({ message: ERROR_CODE.AUTH.UNAUTHORIZED }));
  }
};
 */
