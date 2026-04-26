interface FetchOptions extends RequestInit {
    timeout?: number;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public response?: Response
    ) {
        super(message);
        this.name = "ApiError";
    }
}

export async function fetchWithRetry<T>(
    url: string,
    options: FetchOptions = {},
    maxRetries = 3
): Promise<T> {
    const { timeout = 30000, ...fetchOptions } = options;
    let attempt = 0;
    let delay = 1000;

    while (attempt < maxRetries) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, {
                ...fetchOptions,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                // Retry on 5xx errors
                if (response.status >= 500) {
                    throw new ApiError(`Server error: ${response.status}`, response.status, response);
                }
                // Don't retry 4xx errors
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    errorData.message || `Client error: ${response.status}`,
                    response.status,
                    response
                );
            }

            const data = await response.json();
            return data as T;
        } catch (error) {
            const isLastAttempt = attempt === maxRetries - 1;

            if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
                throw error;
            }

            if (isLastAttempt) {
                if (error instanceof Error) {
                    throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
                }
                throw new Error(`Failed after ${maxRetries} attempts`);
            }

            console.warn(`Attempt ${attempt + 1} failed. Retrying in ${delay}ms...`, error);
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 2;
            attempt++;
        }
    }

    throw new Error("Unexpected end of retry loop");
}
