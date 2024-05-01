"use client";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ClassNames, ReactTags } from "react-tag-autocomplete";
import Image from "next/image";
import axios from "axios";

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

const suggestions = [
  { label: "USA", value: "USA" },
  { label: "Germany", value: "Germany" },
  { label: "Austria", value: "Austria" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Thailand", value: "Thailand" },
  { label: "Australia", value: "Australia" },
  { label: "Colombia", value: "Colombia" },
  { label: "Czech Republic", value: "Czech Republic" },
  { label: "Denmark", value: "Denmark" },
  { label: "Dominican Republic", value: "Dominican Republic" },
  { label: "Dominica", value: "Dominica" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "Spain", value: "Spain" },
  { label: "Estonia", value: "Estonia" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "Greece", value: "Greece" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Ireland", value: "Ireland" },
];

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

  const classNames: ClassNames = {
    root: "my-custom-root-class",
    rootIsActive: "my-custom-root-is-active",
    option: "my-custom-option",
    optionIsActive: "my-custom-option-is-active",
    rootIsDisabled: "",
    rootIsInvalid: "",
    label: "my-custom-label",
    tagList: "",
    tagListItem: "",
    tag: "",
    tagName: "",
    comboBox: "",
    input: "my-custom-input",
    listBox: "my-custom-list-box",
    highlight: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [selected, setSelected] = useState<any[]>([]);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const onAdd = useCallback(
    (newTag: any) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex: number) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  const onSubmit = (data: FormData) => {
    console.log("__________---------", data);
    const formData = {
      ...data,
      tags: selected.map((tag) => tag.label),
      imageUrl: file,
    };
    console.log("formData", formData);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "imageUrl") {
        form.append("profilePicture", value as File);
      } else {
        form.append(key, value as string);
      }
    });
    console.log("form", form);

    const res = axios.post("/api/articles/createArticle", form);
    console.log(res);

    console.log(formData);
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
          <ReactTags
            labelText="Select Category"
            selected={selected}
            suggestions={suggestions}
            onAdd={onAdd}
            onDelete={onDelete}
            noOptionsText="No matching category found"
            classNames={classNames}
          />
          {errors.tags && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.category?.message}
            </p>
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

        {/* <div className="mb-4">
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
        </div> */}

        <div className="mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div
              className={`bg-blue-200 p-6 rounded-lg shadow-md w-full max-w-md ${
                dragging
                  ? "border-dashed border-2 border-blue-500"
                  : "border-dashed border-2 border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Profile Picture:
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="relative p-4 rounded-lg cursor-pointer">
                  <div className="text-center">
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-12 w-12 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-gray-600 mt-2">
                        {file
                          ? (file as File).name
                          : "Drag and drop your file here"}
                      </p>
                      <Image
                        src={file ? URL.createObjectURL(file) : ""}
                        alt="upload"
                        width={100}
                        height={100}
                        className="mt-2"
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
