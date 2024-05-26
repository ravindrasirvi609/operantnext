"use client";
import React from "react";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";

interface Lecture {
  id: string;
  title: string;
  type: string;
}

interface Chapter {
  chapter: string;
  lectures: Lecture[];
}

interface CourseData {
  title: string;
  description: string;
  teacher: string;
  rating: number;
  price: number;
  imageUrl: File | null;
  learnings: string[];
  courseContent: Chapter[];
  additionalInfo: string[];
}

const CourseForm: React.FC = () => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<CourseData>({
      defaultValues: {
        title: "",
        description: "",
        teacher: "",
        rating: 0,
        price: 0,
        imageUrl: null,
        learnings: [],
        courseContent: [
          {
            chapter: "",
            lectures: [{ title: "", type: "", id: "" }],
          },
        ],
        additionalInfo: [],
      },
    });

  const { fields: learningFields, append: appendLearning } = useFieldArray({
    control,
    name: "learnings",
  });
  const { fields: chapterFields, append: appendChapter } = useFieldArray({
    control,
    name: "courseContent",
  });

  const { fields: additionalInfoFields, append: appendAdditionalInfo } =
    useFieldArray({
      control,
      name: "additionalInfo",
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue("imageUrl", file);
  };

  const handleAddLecture = (chapterIndex: number) => {
    const newLecture = { id: `${Date.now()}`, title: "", type: "" };
    const updatedChapters = [...chapterFields];
    updatedChapters[chapterIndex].lectures.push(newLecture);
    setValue("courseContent", updatedChapters);
  };

  const onSubmit = async (data: CourseData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("teacher", data.teacher);
    formData.append("rating", data.rating.toString());
    formData.append("price", data.price.toString());
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    formData.append("learnings", JSON.stringify(data.learnings));
    formData.append("courseContent", JSON.stringify(data.courseContent));
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));

    try {
      const response = await axios.post("/api/course/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Create Course</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Title
        </label>
        <input
          type="text"
          {...register("title")}
          className="m-1 py-2 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          {...register("description")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Teacher
        </label>
        <input
          type="text"
          {...register("teacher")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Rating
        </label>
        <input
          type="number"
          {...register("rating")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Price
        </label>
        <input
          type="number"
          {...register("price")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Image
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Learnings
        </label>
        {learningFields.map((item, index) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="text"
              {...register(`learnings.${index}`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendLearning("")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Add Learning
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Course Content
        </label>
        {chapterFields.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">{`Chapter ${
              chapterIndex + 1
            }`}</label>
            <input
              type="text"
              {...register(`courseContent.${chapterIndex}.chapter`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
            {chapter.lectures.map((lecture, lectureIndex) => (
              <div key={lecture.id} className="pl-4 mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">{`Lecture ${
                  lectureIndex + 1
                }`}</label>
                <input
                  type="text"
                  {...register(
                    `courseContent.${chapterIndex}.lectures.${lectureIndex}.title`
                  )}
                  className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                />
                <input
                  type="text"
                  {...register(
                    `courseContent.${chapterIndex}.lectures.${lectureIndex}.type`
                  )}
                  className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddLecture(chapterIndex)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
            >
              Add Lecture
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendChapter({
              chapter: "",
              lectures: [{ title: "", type: "", id: "" }],
            })
          }
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Add Chapter
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Additional Info
        </label>
        {additionalInfoFields.map((item, index) => (
          <div key={item.id} className="flex items-center mb-2">
            <input
              type="text"
              {...register(`additionalInfo.${index}`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendAdditionalInfo("")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Add Info
        </button>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
