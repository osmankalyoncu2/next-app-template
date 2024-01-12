// NextError extends Error to modify objects given to the Error constructor into a string easily.

class NextError extends Error {
    constructor(obj) {
        if (typeof obj === "object") {
            obj = JSON.stringify(obj);
        }
        super(obj);
    }
}

export default NextError;