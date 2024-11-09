import React from "react"
import { OcrResultProps } from "./types"

const OcrResult: React.FC<OcrResultProps> = ({ data }) => {

    return (
         
            <div className="py-6 sm:py-8 lg:py-12 bg-gray-100 capitalize">
                <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                    <div className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2  rounded shadow-lg bg-white p-4">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="name"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                name
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={data.name}
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="adhaar number"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                adhaar number
                            </label>
                            <input
                                name="adhaarNumber"
                                type="text"
                                value={data.aadhaarNumber}
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="dob"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                dob
                            </label>
                            <input
                                name="dob"
                                type="text"
                                value={data.dob}
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="gender"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                gender
                            </label>
                            <input
                                name="gender"
                                type="text"
                                value={data.gender}
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="message"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                address
                            </label>
                            <textarea
                                name="address"
                                 value={data.address}
                                className=" w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                                defaultValue={""}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="pincode"
                                className="mb-2 inline-block text-sm text-black sm:text-base"
                            >
                                pincode
                            </label>
                            <input
                                name="pincode"
                                type="text"
                                value={data.pincode}
                                className="w-full rounded border bg-gray-50 px-3 py-2 text-black outline-none ring-indigo-300 transition duration-100 focus:ring"
                            />
                        </div>
                    </div>
                </div>
            </div>


        
    )
}

export default OcrResult