import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ImageUploadProps } from "./type";

const ImageUpload: React.FC<ImageUploadProps> = ({ adhaarImage, updateAdhaar }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const divRef = useRef<HTMLDivElement>(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, imageSide: ImageUploadProps['adhaarImage']) => {
    const file = event.target.files?.[0];
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImageSrc(imageUrl)
    if (imageSide === 'front') {
      updateAdhaar?.(file, imageSide)
    } else {
      updateAdhaar?.(file, imageSide)
    }

  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc)
      }
    }
  })

  const handleImageClick = () => {
    if (uploadRef) {
      uploadRef.current?.click()
    }
  };

  return (

    <div className="max-w-xs bg-white rounded-lg shadow-md  ">
      <div className="px-4 py-6">
        <div
          id="image-preview"
          ref={divRef}
          onClick={handleImageClick}
          className={`max-w-xs p-4 mb-4 bg-gray-100 border-dashed border-2 border-indigo-400 rounded-lg items-center mx-auto text-center cursor-pointer ${imageSrc ? "" : "flex items-center justify-center"
            }`}
        >
          <input
            id="uploadInput"
            type="file"
            ref={uploadRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, adhaarImage)}
          />
          {!imageSrc ? (
            <label htmlFor="uploadInput" className="cursor-pointer capitalize">
              <FaUpload className="w-8 h-8 text-gray-700 mx-auto mb-4" />
              <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                upload adhaar {adhaarImage}
              </h5>
              <p className="font-normal text-sm text-gray-400 md:px-6">
                choose photo size should be less than{' '}
                <b className="text-gray-600">4mb</b>
              </p>
            </label>
          ) : (
            <div className="h-60 w-48 sm:h-32 sm:w-64  ">
              <img
                src={imageSrc}
                alt={`adhaar ${adhaarImage} preview`}
                className="w-full h-full object-scale-down"
              />
            </div>

          )}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleImageClick}
            className="w-full transition duration-100 text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
          >
            <span className="text-center ml-2">Upload</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
