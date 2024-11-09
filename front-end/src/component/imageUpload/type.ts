import { AdhaarUploadProps } from "../../pages/adhaar_upload/types";

export interface ImageUploadProps
  extends Partial<
    Pick<AdhaarUploadProps, 'updateAdhaar'>
  > {
  adhaarImage: "front" | "back";
}
