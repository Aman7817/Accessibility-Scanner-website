import { ApiError } from "../utils/ApiError.js";

export function validateURL(req, res, next) {
  const { url } = req.body;

  try {
    // Built-in URL constructor validates scheme + structure
    const parsed = new URL(url);

    // Allow only http & https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new ApiError('Only http and https URLs are allowed');
    }

    next();
  } catch (err) {
    next(new ApiError(400, `Invalid URL: ${err.message}`));
  }
}
