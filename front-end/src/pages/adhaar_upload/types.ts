import { fileType } from "../../App";
import { ImageUploadProps } from "../../component/imageUpload/type";

export type AdhaarUploadProps = {
  
  updateAdhaar: (file: File,imageSide:ImageUploadProps['adhaarImage']) => void; 
  errors:{ key: fileType, message: string } | null
};
