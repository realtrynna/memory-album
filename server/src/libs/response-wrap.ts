export interface ResponseMeta<T> {
    message: string;
    data?: T | null;
}

export function responseWrap<T>(response: ResponseMeta<T>, data: T) {
    return {
        ...response,
        data,
    };
}
