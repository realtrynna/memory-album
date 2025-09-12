export function responseWrap<T>(
    response: {
        statusCode: number;
        message: string;
    },
    data: T,
) {
    return {
        ...response,
        data,
    };
}
