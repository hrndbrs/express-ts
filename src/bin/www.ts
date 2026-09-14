import "dotenv/config";
import createServer from "../main";

createServer().run(Number(process.env.PORT));
