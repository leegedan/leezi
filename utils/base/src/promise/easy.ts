export function wait(timespan: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, timespan);
    });
}

export function countdown(
    seconds: number,
    callback?: (n: number) => void
): Promise<number> {
    if (callback) {
        callback(seconds);
    }
    if (seconds) {
        return wait(1000).then((x) => {
            return countdown(--seconds, callback);
        });
    }
    return Promise.resolve(0);
}
