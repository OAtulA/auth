import { Request } from 'express';
import { UserType } from '../models/User.model';

declare global {
  namespace Express {
    interface Request {
      /**
       * It shall hold the user upon authentication
       */
      user?: UserType |any; // You can specify a more specific type for user if needed
      /**
       * This will have the client url
       */
      client?: String;
    }
  }
}