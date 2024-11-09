import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import OcrRoute from "./routes/route"; 
import { HttpStatusCode } from "./utility/enum";
import { errorHandler } from "./routes/error-handler";

dotenv.config();

const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.ORIGIN || "*";
const HOST = process.env.HOST || "localhost";

const app = express();

app.use(
  cors({
    origin: ORIGIN,
    methods: ["GET", "POST"],
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", OcrRoute);


app.use(errorHandler);

app.all("*", (req: Request, res: Response) => {
  return res.status(HttpStatusCode.NOT_FOUND).json({
      status: "error",
      message: "The requested URL not found on this server",
      error: {
        key: "invalid route",
        message: "The requested URL not found on this server",
      },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
