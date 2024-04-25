"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  content: yup.string().required("Content is required"),
  excerpt: yup.string(),
  tags: yup.array(),
  category: yup.string().required("Category is required"),
  status: yup
    .string()
    .oneOf(["draft", "published", "archived"], "Invalid status"),
  imageUrl: yup.string().url("Invalid URL"),
});

const ArticleForm = () => {
  type FormData = {
    excerpt?: string;
    tags?: any[];
    status?: string;
    imageUrl?: string;
    title: string;
    slug: string;
    content: string;
    category: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-lime-100 mt-20 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full md:w-3/4 lg:w-1/2"
      >
        <h2 className="text-2xl font-black mb-4 text-center">Add Article</h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 p-2 w-full bg-lime-100 border border-blue-500 rounded-md"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-600"
          >
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("slug")}
          />
          {errors.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-600"
          >
            Content
          </label>
          <textarea
            id="content"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("content")}
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-600"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("excerpt")}
          ></textarea>
          {errors.excerpt && (
            <p className="text-red-500 text-sm mt-1">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-600"
          >
            Tags
          </label>
          <input
            type="text"
            id="tags"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("category")}
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-600"
          >
            Status
          </label>
          <select
            id="status"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("status")}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            className="mt-1 p-2 w-full border bg-lime-100 border-blue-500 rounded-md"
            {...register("imageUrl")}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
