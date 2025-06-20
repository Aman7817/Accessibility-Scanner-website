import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 1*60*1000, // 1miniute
    max: 100, // limit each IP to 100 requests per windowMs

    message: "Too many requests, please try again later."

});

export {
    rateLimiter
}

//  The express-rate-limit package is used here to throttle incoming requests
