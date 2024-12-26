// src/pages/post/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string; // Дата публикации
}

export default function PostPage() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query; // Получаем id из URL

  useEffect(() => {
    if (!id) return;

    // Загружаем пост с API по id
    const fetchPost = async () => {
      const response = await fetch(`http://localhost:3000/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        alert("Не удалось загрузить пост");
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">Дата публикации: {new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
