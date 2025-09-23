export interface ResponseMeta<T> {
    statusCode: number;
    message: string;
    data?: T | null;
}

export function responseWrap<T>(response: ResponseMeta<T>, data: T) {
    return {
        ...response,
        data,
    };
}
