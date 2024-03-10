"use client";

import { useForm } from "react-hook-form";
import Image from "next/image";

import { PostTenant } from "@/app/usecase";
import { GetAddress } from "@/app/util";

export function Form() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  const image = watch("image");

  const postalCode = watch("postalCode");

  const fetchAddress = async () => {
    if (postalCode && postalCode.match(/^\d{3}-\d{4}$/)) {
      const address: string = await GetAddress(postalCode);
      setValue("address", address);
    }
  };

  const onSubmit = (data: any) => {
    PostTenant(data);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700"
        >
          物件名:
        </label>
        <input
          {...register("title", { required: true })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.propertyName && (
          <p className="text-sm text-red-500">物件名は必須です。</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="postalCode"
          className="block text-sm font-semibold text-gray-700"
        >
          郵便番号:
        </label>
        <input
          {...register("postalCode", {
            required: true,
            pattern: /^\d{3}-\d{4}$/,
          })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          onBlur={fetchAddress}
        />
        {errors.postalCode && (
          <p className="text-sm text-red-500">
            正しい郵便番号を入力してください（例: 123-4567）。
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-semibold text-gray-700"
        >
          住所:
        </label>
        <input
          {...register("address", { required: true })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.address && (
          <p className="text-sm text-red-500">住所は必須です。</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="area"
          className="block text-sm font-semibold text-gray-700"
        >
          面積:
        </label>
        <input
          {...register("area", { required: true, pattern: /^\d+(\.\d+)?$/ })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.area && (
          <p className="text-sm text-red-500">
            面積を数字で入力してください（例: 50.5）。
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="rent"
          className="block text-sm font-semibold text-gray-700"
        >
          賃料:
        </label>
        <input
          {...register("rent", { required: true, pattern: /^\d+(\.\d+)?$/ })}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.rent && (
          <p className="text-sm text-red-500">
            賃料を数字で入力してください（例: 80000）。
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-semibold text-gray-700"
        >
          物件画像:
        </label>
        <input
          type="file"
          {...register("image", {
            required: "画像ファイルを選択してください。",
            validate: {
              size: (files) =>
                files[0]?.size < 5000000 ||
                "ファイルサイズは5MB以下である必要があります。",
              type: (files) =>
                ["image/png", "image/jpeg"].includes(files[0]?.type) ||
                "PNGまたはJPEG形式の画像を選択してください。",
            },
          })}
          className="mt-1 block w-full text-sm text-gray-900 border-gray-300 rounded-md file:border-0 file:bg-blue-50 file:py-2 file:px-4 file:rounded-md file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.image && (
          <p className="text-sm text-red-500">画像が読み込めません</p>
        )}
        {image && image[0] && (
          <div className="mt-4">
            <Image
              src={URL.createObjectURL(image[0])}
              width={300}
              height={200}
              alt="Preview"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700"
        >
          備考:
        </label>
        <textarea
          {...register("description")}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <input
        type="submit"
        value="送信"
        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
      />
    </form>
  );
}
