import React from "react"
import ImageUpload from "../../component/imageUpload/ImageUpload"
import { AdhaarUploadProps } from "./types"

const AdhaarUpload: React.FC<AdhaarUploadProps> = ({ updateAdhaar, errors }) => {
    return (
        <div id="adhaar-preview" className="adhaar-preview relative bg-gray-100">
            <div className="grid sm:grid-cols-2 gap-2 py-10 justify-items-center    justify-center">
                <div className="relative">
                    <ImageUpload adhaarImage="front" updateAdhaar={updateAdhaar} />
                    <small
                        className="text-xs absolute left-[50%] translate-x-[-50%] bottom-2 font-bold capitalize leading-relaxed text-red-600 w-full text-center">
                        {errors && errors['adhaarFrontFile']}
                    </small>
                </div>
                <div className="relative">
                    <ImageUpload adhaarImage="back" updateAdhaar={updateAdhaar} />
                    <small
                        className="text-xs absolute left-[50%] translate-x-[-50%] bottom-2 font-bold capitalize leading-relaxed text-red-600 w-full text-center">
                        {errors && errors['adhaarBackFile']}
                    </small>
                </div>
                <small
                    className="text-xs absolute bottom-2 font-bold capitalize leading-relaxed text-red-600">
                    {errors && errors['common']}
                </small>
            </div>
        </div >
    )
}

export default AdhaarUpload