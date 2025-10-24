export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        // Maintain proper stack trace (only available on V8 engines)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class ConflictException extends HttpException {
    constructor(message = 'Resource already exists') {
        super(409, message);
    }
}

export class NotFoundException extends HttpException {
    constructor(message = 'Resource not found') {
        super(404, message);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message = 'Forbidden') {
        super(403, message);
    }
}

export class BadRequestException extends HttpException {
    constructor(message = 'Forbidden') {
        super(400, message);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = 'Forbidden') {
        super(401, message);
    }
}