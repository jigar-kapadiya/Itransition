import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/http';
import { logger } from '../utils/logger';

export function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction): void {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    logger.error(`Error: ${message} - Status: ${status}`);

    res.status(status).json({
        status,
        message,
    });
}
