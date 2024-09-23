export const logger = (message: string) => {
    if (process.env.DEBUG) {
        console.log(message);
    }
};
