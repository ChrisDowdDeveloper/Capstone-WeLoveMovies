export default function hasProperties(...properties) {
    return function (req, res, next) {
        const { data = {} } = res.body;

        try {
            properties.forEach((property) => {
                const value = data[property];
                if (!value) {
                    const error = new Error(`A ${property} is required.`);
                    error.status = 400;
                    throw error;
                }
            });
            next();
        } catch (error) {
            next(error);
        }
    };
}