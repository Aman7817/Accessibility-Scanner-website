import 'dotenv/config';
import { app } from "./app.js";

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

