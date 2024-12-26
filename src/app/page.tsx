"use client";

import PostForm from "@/components/PostForm";
import PostCard from "@/components/PostCard";
import { useState, useEffect } from "react";


interface Post {
  id: string;
  title: string;
  content: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  // Загружаем посты с API при монтировании компонента
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  // Функция для добавления нового поста
  const handleAddPost = async (title: string, content: string) => {
    const newPost = { title, content };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const addedPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, addedPost]); // Обновляем список постов
    } else {
      alert("Не удалось добавить пост");
    }
  };

  // Функция для удаления поста
  const handleDeletePost = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setPosts(posts.filter((post) => post.id !== id)); // Убираем удалённый пост из списка
    } else {
      alert("Не удалось удалить пост");
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Добавить пост</h1>
      <PostForm onAddPost={handleAddPost} /> {/* Передаем обработчик сюда */}

      <h2 className="text-xl font-semibold mt-8">Список постов</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onDeletePost={handleDeletePost} />
          ))
        ) : (
          <p>Постов нет</p>
        )}
      </div>
    </main> 
  );
}
