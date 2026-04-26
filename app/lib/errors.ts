export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500,
        public isOperational: boolean = true
    ) {
        super(message);
        this.name = "AppError";
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, public field?: string) {
        super(message, "VALIDATION_ERROR", 400);
        this.name = "ValidationError";
    }
}

export class ApiError extends AppError {
    constructor(
        message: string,
        statusCode: number,
        public endpoint?: string
    ) {
        super(message, "API_ERROR", statusCode);
        this.name = "ApiError";
    }
}

export class NutritionError extends AppError {
    constructor(message: string) {
        super(message, "NUTRITION_ERROR", 500);
        this.name = "NutritionError";
    }
}

export class StorageError extends AppError {
    constructor(message: string) {
        super(message, "STORAGE_ERROR", 500);
        this.name = "StorageError";
    }
}

export const ErrorCodes = {
    VALIDATION_ERROR: "VALIDATION_ERROR",
    API_ERROR: "API_ERROR",
    NUTRITION_ERROR: "NUTRITION_ERROR",
    STORAGE_ERROR: "STORAGE_ERROR",
    NETWORK_ERROR: "NETWORK_ERROR",
    TIMEOUT_ERROR: "TIMEOUT_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

export interface ErrorResponse {
    code: ErrorCode;
    message: string;
    field?: string;
    timestamp: string;
    details?: Record<string, unknown>;
}

export function formatError(error: unknown): ErrorResponse {
    const timestamp = new Date().toISOString();
    
    if (error instanceof AppError) {
        return {
            code: error.code as ErrorCode,
            message: error.message,
            field: error instanceof ValidationError ? error.field : undefined,
            timestamp,
        };
    }
    
    if (error instanceof Error) {
        return {
            code: ErrorCodes.API_ERROR,
            message: error.message || "An unexpected error occurred",
            timestamp,
        };
    }
    
    return {
        code: ErrorCodes.API_ERROR,
        message: "An unexpected error occurred",
        timestamp,
    };
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "An unexpected error occurred";
}

export function isOperationalError(error: unknown): boolean {
    if (error instanceof AppError) return error.isOperational;
    return false;
}