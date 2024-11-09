import React from "react"
import ImageUpload from "../../component/imageUpload/ImageUpload"
import { AdhaarUploadProps } from "./types"

const AdhaarUpload: React.FC<AdhaarUploadProps> = ({ updateAdhaar, errors }) => {
    console.log(errors)
    return (
        <div id="adhaar-preview" className="adhaar-preview relative bg-gray-100 ">
            <div className="grid sm:grid-cols-2 gap-2 py-4 justify-items-center   justify-center">
                <div className="relative">

                    <ImageUpload adhaarImage="front" updateAdhaar={updateAdhaar} />
                    <small className="text-xs absolute left-[50%] translate-x-[-50%] bottom-2 font-bold capitalize leading-relaxed text-red-600">{errors&&errors.key==='adhaarFrontFile'&&errors.message}</small>
                </div>
                <div className="relative">
                    <ImageUpload adhaarImage="back" updateAdhaar={updateAdhaar} />
                    <small className="text-xs text-red-600">{errors&&errors.key==='adhaarBackFile'&&errors.message}</small>
                </div>
            </div>

        </div >
    )
}

export default AdhaarUpload