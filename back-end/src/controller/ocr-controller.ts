import { NextFunction, Request, Response } from "express";
import { MulterRequst } from "../utility/types";
import { removeFiles } from "../utility/removeFiles";
import { isAdhaarBack, isAdhaarFront, validateFiles } from "../utility/validation";
import { createWorker } from "tesseract.js";
import {  generateData } from "../utility/extract-data";
import { HttpStatusCode } from "../utility/enum";


export const ocrController = async (req:Request,res:Response,next:NextFunction) => {
    try {

 
        const {adhaarBackFile,adhaarFrontFile} = (req as MulterRequst).files ?? undefined

        validateFiles(adhaarFrontFile,'adhaarFrontFile');
        validateFiles(adhaarBackFile,'adhaarBackFile');

        (req as MulterRequst).imagepath = {
            frontImage:adhaarFrontFile[0].path,
            backImage:adhaarBackFile[0].path
        }

        const worker = await createWorker('eng',1)

        await worker.setParameters({
            'tessedit_char_whitelist':'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,-:/'
        })
        
        const {data:{text:text1}} = await worker.recognize(adhaarFrontFile[0].path)
        const {data:{text:text2}} = await worker.recognize(adhaarBackFile[0].path)

        isAdhaarFront(text1)
        isAdhaarBack(text2)

         
        const data = generateData(text1,text2)
        console.log(data)
        await worker.terminate();

        removeFiles(adhaarFrontFile[0].path)
        removeFiles(adhaarBackFile[0].path)
        
        return res.status(HttpStatusCode.OK).json({
            status:'success',
            message:'data extracted successfully',
            data    
        })


    } catch (error) {
        next(error)
    }
};   
