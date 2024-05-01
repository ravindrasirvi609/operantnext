"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  author?: string;
  tags: string[];
  category: string;
  status: "draft" | "published" | "archived";
  views: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ArticleDetailsProps {
  match: {
    params: {
      id: string;
    };
  };
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ params }: any) => {
  const id = params?.id;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.post(`/api/articles/articleDetails`, {
          id,
        });
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center mt-8">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-lime-100 rounded-lg shadow-md mt-40">
      <h1 className="text-3xl text-center font-bold mb-4">{article.title}</h1>
      {article.imageUrl && (
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={800}
          height={400}
          className="w-full h-auto mb-4 rounded-lg shadow-md"
        />
      )}
      <p className="text-gray-700">{article.content}</p>
      <div className="flex justify-between mt-4">
        <p className="text-gray-600">Category: {article.category}</p>
        <p className="text-gray-600">Status: {article.status}</p>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-gray-600">Views: {article.views}</p>
        <p className="text-gray-600">
          Published At: {new Date(article.createdAt).toLocaleString()}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Tags:</h2>
        <div className="flex flex-wrap">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
