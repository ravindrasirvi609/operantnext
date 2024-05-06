"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>(
          "/api/articles/articleList"
        );
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600">Loading...</h1>
          <div className="mt-4">
            <div className="inline-block animate-spin ease-linear rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Article List</h1>
      {articles.length === 0 ? (
        <p className="text-center text-xl font-semibold mb-4">
          No articles listed
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article._id} href={`/articles/${article._id}`}>
              <div
                key={article._id}
                className="border rounded-lg bg-blue-300 overflow-hidden shadow-md transition duration-300 transform hover:scale-105"
              >
                {article.imageUrl && (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-48"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-700 mb-2">{article.excerpt}</p>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <p>Category: {article.category}</p>
                    <p>Tags: {article.tags.join(", ")}</p>
                  </div>
                  <div className="flex justify-between text-gray-600 mb-2">
                    <p>Status: {article.status}</p>
                    <p>Views: {article.views}</p>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <p>
                      Created At: {new Date(article.createdAt).toLocaleString()}
                    </p>
                    <p>
                      Updated At: {new Date(article.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
