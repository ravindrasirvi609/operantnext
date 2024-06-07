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

interface LearningOutcome {
  skill: string;
  description: string;
}

interface Competency {
  skill: string;
  description: string;
}

interface Review {
  name: string;
  rating: number;
  review: string;
}

interface CourseData {
  title: string;
  description: string;
  teacher: string;
  category: string;
  duration: string;
  inLanguage: string;
  isFree: boolean;
  courseLevel: string;
  typicalLearningTime: string;
  hasDeliveryMode: boolean;
  requiresSkill: string;
  level: string;
  language: string;
  tags: string[];
  students: string[];
  isCourseAlreadyAttempted: boolean;
  isCourseCompleted: boolean;
  rating: number;
  price: number;
  imageUrl: File | null;
  learnings: string[];
  courseContent: Chapter[];
  additionalInfo: string[];
  reviewsCount: number;
  deliveryMode: string;
  contentMode: string[];
  learningOutcomes: LearningOutcome[];
  assessmentMethod: string;
  financialAssistance: string;
  competencyRequired: Competency[];
  requirements: string;
  educationalAlignment: string[];
  reviews: Review[];
}

const CourseForm: React.FC = () => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<CourseData>({
      defaultValues: {
        title: "",
        description: "",
        teacher: "",
        category: "",
        duration: "",
        inLanguage: "",
        isFree: false,
        courseLevel: "",
        typicalLearningTime: "",
        hasDeliveryMode: false,
        requiresSkill: "",
        level: "",
        language: "",
        tags: [],
        students: [],
        isCourseAlreadyAttempted: false,
        isCourseCompleted: false,
        rating: 0,
        price: 0,
        imageUrl: null,
        learnings: [],
        courseContent: [
          {
            chapter: "",
            lectures: [{ id: "", title: "", type: "" }],
          },
        ],
        additionalInfo: [],
        reviewsCount: 0,
        deliveryMode: "",
        contentMode: [],
        learningOutcomes: [],
        assessmentMethod: "",
        financialAssistance: "",
        competencyRequired: [],
        requirements: "",
        educationalAlignment: [],
        reviews: [],
      },
    });

  const { fields: chapterFields, append: appendChapter } = useFieldArray({
    control,
    name: "courseContent" as const,
  });

  const { fields: learningOutcomeFields, append: appendLearningOutcome } =
    useFieldArray({
      control,
      name: "learningOutcomes" as const,
    });

  const { fields: competencyFields, append: appendCompetency } = useFieldArray({
    control,
    name: "competencyRequired" as const,
  });

  const { fields: reviewFields, append: appendReview } = useFieldArray({
    control,
    name: "reviews" as const,
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
    formData.append("category", data.category);
    formData.append("duration", data.duration);
    formData.append("inLanguage", data.inLanguage);
    formData.append("isFree", data.isFree.toString());
    formData.append("courseLevel", data.courseLevel);
    formData.append("typicalLearningTime", data.typicalLearningTime);
    formData.append("hasDeliveryMode", data.hasDeliveryMode.toString());
    formData.append("requiresSkill", data.requiresSkill);
    formData.append("level", data.level);
    formData.append("language", data.language);
    formData.append("tags", JSON.stringify(data.tags));
    formData.append("students", JSON.stringify(data.students));
    formData.append(
      "isCourseAlreadyAttempted",
      data.isCourseAlreadyAttempted.toString()
    );
    formData.append("isCourseCompleted", data.isCourseCompleted.toString());
    formData.append("rating", data.rating.toString());
    formData.append("price", data.price.toString());
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    formData.append("learnings", JSON.stringify(data.learnings));
    formData.append("courseContent", JSON.stringify(data.courseContent));
    formData.append("additionalInfo", JSON.stringify(data.additionalInfo));
    formData.append("reviewsCount", data.reviewsCount.toString());
    formData.append("deliveryMode", data.deliveryMode);
    formData.append("contentMode", JSON.stringify(data.contentMode));
    formData.append("learningOutcomes", JSON.stringify(data.learningOutcomes));
    formData.append("assessmentMethod", data.assessmentMethod);
    formData.append("financialAssistance", data.financialAssistance);
    formData.append(
      "competencyRequired",
      JSON.stringify(data.competencyRequired)
    );
    formData.append("requirements", data.requirements);
    formData.append(
      "educationalAlignment",
      JSON.stringify(data.educationalAlignment)
    );
    formData.append("reviews", JSON.stringify(data.reviews));

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
        ></textarea>
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
          Category
        </label>
        <input
          type="text"
          {...register("category")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Duration
        </label>
        <input
          type="text"
          {...register("duration")}
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          In Language
        </label>
        <input
          type="text"
          {...register("inLanguage")}
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
          className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Learning Outcomes
        </label>
        {learningOutcomeFields.map((item, index) => (
          <div key={item.id}>
            <input
              type="text"
              {...register(`learningOutcomes.${index}.skill`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
            <input
              type="text"
              {...register(`learningOutcomes.${index}.description`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendLearningOutcome({ skill: "", description: "" })}
          className="m-1 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Learning Outcome
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Competency Required
        </label>
        {competencyFields.map((item, index) => (
          <div key={item.id}>
            <input
              type="text"
              {...register(`competencyRequired.${index}.skill`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
            <input
              type="text"
              {...register(`competencyRequired.${index}.description`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => appendCompetency({ skill: "", description: "" })}
          className="m-1 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Competency
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
          Chapters
        </label>
        {chapterFields.map((chapter, chapterIndex) => (
          <div key={chapter.id}>
            <input
              type="text"
              {...register(`courseContent.${chapterIndex}.chapter`)}
              className="m-1 py-2 bg-indigo-100 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
            />
            <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
              Lectures
            </label>
            {chapter.lectures.map((lecture, lectureIndex) => (
              <div key={lecture.id}>
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
              className="m-1 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
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
              lectures: [{ id: "", title: "", type: "" }],
            })
          }
          className="m-1 py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
        >
          Add Chapter
        </button>
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 text-white rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-zinc-800"
      >
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
