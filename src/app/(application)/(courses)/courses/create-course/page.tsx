"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

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
  duration: string;
  deliveryMode: string;
  isFree: boolean;
  price: number;
  learnings: string[];
  imageUrl: File | null;
  courseContent: Chapter[];
  additionalInfo: string[];
}

const CourseForm: React.FC = () => {
  const { register, handleSubmit, setValue, reset } = useForm<CourseData>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState("");
  const [duration, setDuration] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState<File | null>(null);
  const [courseContent, setCourseContent] = useState<Chapter[]>([
    { chapter: "", lectures: [{ id: `${Date.now()}`, title: "", type: "" }] },
  ]);
  const [additionalInfo, setAdditionalInfo] = useState<string[]>([""]);
  const [learnings, setLearnings] = useState<string[]>([""]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImageUrl(file);
    setValue("imageUrl", file);
    console.log("file", file);
  };

  const handleAddLecture = (chapterIndex: number) => {
    const newLecture = { id: `${Date.now()}`, title: "", type: "" };
    const updatedChapters = [...courseContent];
    updatedChapters[chapterIndex].lectures.push(newLecture);
    setCourseContent(updatedChapters);
  };

  const handleAddChapter = () => {
    const newChapter = {
      chapter: "",
      lectures: [{ id: `${Date.now()}`, title: "", type: "" }],
    };
    setCourseContent([...courseContent, newChapter]);
  };

  const handleAddAdditionalInfo = () => {
    setAdditionalInfo([...additionalInfo, ""]);
  };

  const handleAddLearnings = () => {
    setLearnings([...learnings, ""]);
  };

  const handleInputChange = (
    chapterIndex: number,
    lectureIndex: number,
    field: keyof Lecture,
    value: string
  ) => {
    const updatedChapters = [...courseContent];
    updatedChapters[chapterIndex].lectures[lectureIndex][field] = value;
    setCourseContent(updatedChapters);
  };

  const handleChapterChange = (chapterIndex: number, value: string) => {
    const updatedChapters = [...courseContent];
    updatedChapters[chapterIndex].chapter = value;
    setCourseContent(updatedChapters);
  };

  const handleAdditionalInfoChange = (index: number, value: string) => {
    const updatedAdditionalInfo = [...additionalInfo];
    updatedAdditionalInfo[index] = value;
    setAdditionalInfo(updatedAdditionalInfo);
  };

  const handleLearningsChange = (index: number, value: string) => {
    const updatedLearnings = [...learnings];
    updatedLearnings[index] = value;
    setLearnings(updatedLearnings);
  };

  const onSubmit = async (data: CourseData) => {
    data.courseContent = courseContent;
    data.additionalInfo = additionalInfo;
    data.learnings = learnings;
    data.imageUrl = imageUrl;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("teacher", data.teacher);
    formData.append("duration", data.duration);
    formData.append("deliveryMode", data.deliveryMode);
    formData.append("isFree", data.isFree.toString());
    formData.append("price", data.price.toString());
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    formData.append("courseContent", JSON.stringify(data.courseContent));
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("learnings", JSON.stringify(data.learnings));

    try {
      const response = await axios.post("/api/course/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      reset();
      setTitle("");
      setDescription("");
      setTeacher("");
      setDuration("");
      setDeliveryMode("");
      setIsFree(false);
      setPrice(0);
      setImageUrl(null);
      setCourseContent([
        {
          chapter: "",
          lectures: [{ id: `${Date.now()}`, title: "", type: "" }],
        },
      ]);
      setAdditionalInfo([""]);
      setLearnings([""]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Create Course</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Title
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Teacher
        </label>
        <input
          type="text"
          {...register("teacher", { required: true })}
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Duration
        </label>
        <input
          type="text"
          {...register("duration", { required: true })}
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Delivery Mode
        </label>
        <input
          type="text"
          {...register("deliveryMode", { required: true })}
          value={deliveryMode}
          onChange={(e) => setDeliveryMode(e.target.value)}
          className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Is Free
        </label>
        <input
          type="checkbox"
          {...register("isFree")}
          checked={isFree}
          onChange={(e) => setIsFree(e.target.checked)}
          className="m-1 py-2 px-3 bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      {!isFree && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
            Price
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="m-1 py-2 px-3 block w-full bg-indigo-100 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Image
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Chapters
        </label>
        {courseContent.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="mb-4">
            <input
              type="text"
              value={chapter.chapter}
              onChange={(e) =>
                handleChapterChange(chapterIndex, e.target.value)
              }
              className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
              Lectures
            </label>
            {chapter.lectures.map((lecture, lectureIndex) => (
              <div key={lecture.id} className="mb-2">
                <input
                  type="text"
                  value={lecture.title}
                  placeholder="Title"
                  onChange={(e) =>
                    handleInputChange(
                      chapterIndex,
                      lectureIndex,
                      "title",
                      e.target.value
                    )
                  }
                  className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                />
                <input
                  type="text"
                  value={lecture.type}
                  placeholder="Type"
                  onChange={(e) =>
                    handleInputChange(
                      chapterIndex,
                      lectureIndex,
                      "type",
                      e.target.value
                    )
                  }
                  className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddLecture(chapterIndex)}
              className="m-1 py-2 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
            >
              Add Lecture
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddChapter}
          className="m-1 py-2 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Chapter
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Additional Info
        </label>
        {additionalInfo.map((info, index) => (
          <input
            key={index}
            type="text"
            value={info}
            onChange={(e) => handleAdditionalInfoChange(index, e.target.value)}
            className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
          />
        ))}
        <button
          type="button"
          onClick={handleAddAdditionalInfo}
          className="m-1 py-2 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Additional Info
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          What You&apos;ll Learn
        </label>
        {learnings.map((learning, index) => (
          <input
            key={index}
            type="text"
            value={learning}
            onChange={(e) => handleLearningsChange(index, e.target.value)}
            className="m-1 py-2 px-3 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
          />
        ))}
        <button
          type="button"
          onClick={handleAddLearnings}
          className="m-1 py-2 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Learning
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
