// "use client";

// import { useForm, Resolver, SubmitHandler } from "react-hook-form";
// import Image from "next/image";
// import { useState } from "react";

// import { PostTenant, FormValues } from "@/app/usecase";
// import { GetAddress } from "@/app/util";

// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values,
//     errors: {
//       title: values.title
//         ? undefined
//         : { type: "required", message: "This is required." },
//       postalCode: values.postalCode
//         ? values.postalCode.match(/^\d{3}-\d{4}$/)
//           ? undefined
//           : { type: "pattern", message: "This is not a valid postal code." }
//         : { type: "required", message: "This is required." },
//       address: values.address
//         ? undefined
//         : { type: "required", message: "This is required." },
//       area: values.area
//         ? undefined
//         : { type: "required", message: "This is required." },
//       rent: values.rent
//         ? undefined
//         : { type: "required", message: "This is required." },
//       images: values.images
//         ? Array.from(values.images).every((file) => file.size < 5000000) &&
//           Array.from(values.images).every((file) =>
//             ["image/png", "image/jpeg"].includes(file.type)
//           )
//           ? undefined
//           : { type: "validate" }
//         : { type: "required", message: "This is required." },
//     },
//   };
// };

// export function Form() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     watch,
//   } = useForm<FormValues>({ resolver });

//   const [currentSlide, setCurrentSlide] = useState(0);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const images = watch("images");

//   const postalCode = watch("postalCode");

//   const fetchAddress = async () => {
//     if (postalCode && postalCode.match(/^\d{3}-\d{4}$/)) {
//       const address: string = await GetAddress(postalCode);
//       setValue("address", address);
//     }
//   };

//   const onSubmit: SubmitHandler<FormValues> = handleSubmit((data) => {
//     console.log("test");
//     PostTenant(data);
//   });

//   return (
//     <form
//       onSubmit={onSubmit}
//       className="w-1/2 mx-auto bg-white p-8 rounded-lg shadow"
//     >
//       <div className="mb-4">
//         <label
//           htmlFor="title"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           物件名:
//         </label>
//         <input
//           {...register("title")}
//           id="title"
//           className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {errors.title && (
//           <p className="text-sm text-red-500">{errors.title.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="postalCode"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           郵便番号:
//         </label>
//         <div className="flex">
//           <input
//             {...register("postalCode")}
//             id="postalCode"
//             className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//           />
//           <button
//             type="button"
//             onClick={fetchAddress}
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
//           >
//             検索
//           </button>
//         </div>
//         {errors.postalCode && (
//           <p className="text-sm text-red-500">{errors.postalCode.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="address"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           住所:
//         </label>
//         <input
//           {...register("address")}
//           id="address"
//           className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {errors.address && (
//           <p className="text-sm text-red-500">{errors.address.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="area"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           面積:
//         </label>
//         <input
//           {...register("area")}
//           id="area"
//           className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {errors.area && (
//           <p className="text-sm text-red-500">{errors.area.message}</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <label
//           htmlFor="rent"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           賃料:
//         </label>
//         <input
//           {...register("rent")}
//           id="rent"
//           className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//         />
//         {errors.rent && (
//           <p className="text-sm text-red-500">{errors.rent.message}</p>
//         )}
//       </div>
//       {/* <div className="mb-4">
//         <label
//           htmlFor="images"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           物件画像:
//         </label>
//         <input
//           type="file"
//           {...register("images")}
//           id="images"
//           className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:rounded-md file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
//           multiple
//         />
//         {errors.images && (
//           <p className="text-sm text-red-500">{errors.images.message}</p>
//         )}
//         <div className="mt-4 flex justify-center">
//           {images && images.length > 0 && (
//             <div className="relative w-full">
//               <div className="absolute inset-0 flex justify-between items-center">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
//                 >
//                   ‹
//                 </button>
//                 <button
//                   onClick={nextSlide}
//                   className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
//                 >
//                   ›
//                 </button>
//               </div>
//               <Image
//                 src={URL.createObjectURL(images[currentSlide])}
//                 alt={`Preview ${currentSlide + 1}`}
//                 width={300}
//                 height={200}
//                 className="mx-auto max-w-full h-auto rounded-md object-cover w-auto"
//               />
//             </div>
//           )}
//         </div>
//       </div> */}
//       <div className="mb-4">
//         <label
//           htmlFor="description"
//           className="block text-sm font-semibold text-gray-700"
//         >
//           備考:
//         </label>
//         <textarea
//           {...register("description")}
//           id="description"
//           className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
//         />
//       </div>

//       <input
//         type="submit"
//         value="送信"
//         className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
//       />
//     </form>
//   );
// }
