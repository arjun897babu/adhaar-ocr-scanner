export type OcrResultProps = {
  data: OCRData;
};

export interface OCRData{
    name: string,
    aadhaarNumber: number;
    dob: string,
    gender:string,
    address: string,
    pincode: number
}
