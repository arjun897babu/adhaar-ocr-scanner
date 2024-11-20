import { Request } from "express";

export interface MulterRequst extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
  imagepath?: {
    frontImage: string;
    backImage: string;
  };
}

export type ErrorObj = {[fieldName: string]: string} 
