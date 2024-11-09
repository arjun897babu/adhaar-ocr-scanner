import { FormEvent, useState } from 'react'
import './App.css'
import AdhaarUpload from './pages/adhaar_upload/AdhaarUpload'
import Home from './pages/home/Home'
import OcrResult from './pages/ocr-result/OcrResult'
import { ImageUploadProps } from './component/imageUpload/type'
import { server } from './service/axios'
import { OCRData } from './pages/ocr-result/types'
import { handleAxiosError, isErrorResponse } from './utils/validation'
import {  AxiosResponse, HttpStatusCode } from 'axios'
import { ApiResponse } from './service/type'

function App() {

  const [loading, setLoading] = useState(false)
  const [adhaarFrontFile, setAdhaarFrontFile] = useState<File | null>(null)
  const [adhaarBackFile, setAdhaarBackFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<{ key: string, message: string } | null>(null)


  const updateAdhaarFile = (file: File, adhaarImage: ImageUploadProps['adhaarImage']) => {
    if (adhaarImage !== 'back' && adhaarImage !== 'front') {
      return
    }
    if (adhaarImage === 'front') {
      setAdhaarFrontFile(file)
    } else {
      setAdhaarBackFile(file)
    }
  }


  const [ocrResult, setOcrResult] = useState<OCRData | null>(null)

  async function extractAdhaar(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setLoading(true)
    try {

      if (!adhaarFrontFile || !adhaarBackFile) {
        return
      }

      if(errors){
        setErrors(null)
      }

      const formData = new FormData()
      formData.append('adhaarFrontFile', adhaarFrontFile);
      formData.append('adhaarBackFile', adhaarBackFile);
      const response: AxiosResponse<ApiResponse> = await server.post('/ocr', formData)
      if (response.data.status === 'success') {
        setOcrResult(response.data.data)
      }

    } catch (error) {

      const apiError = handleAxiosError(error)

      if (isErrorResponse(apiError)) {
        if (apiError.statusCode === HttpStatusCode.BadRequest
          ||apiError.statusCode===HttpStatusCode.PayloadTooLarge) {
          setErrors({
            key: apiError.error.key,
            message: apiError.error.message
          })
        } else if (apiError.statusCode === HttpStatusCode.InternalServerError) {

        }
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Home />
      <AdhaarUpload updateAdhaar={updateAdhaarFile} errors={errors} />
      <div className={`${ocrResult ? 'hidden' : "float-right m-4 bg-gray-100 "}`}>
        <button
          onClick={extractAdhaar}
          className={`${loading ? "pointer-events-none" : ""} rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none  transition duration-100 hover:bg-indigo-600   active:text-gray-700 md:text-base lg:inline-block}`}>
          {loading ? 'processing...' : 'extract data'}
        </button>
      </div>
      {ocrResult && <OcrResult data={ocrResult} />}
    </>
  )
}

export default App
