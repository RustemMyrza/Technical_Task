import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface PostFormProps {
  onAddPost: (title: string, content: string) => void; // Обработчик добавления поста
}

export default function PostForm({ onAddPost }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Передаем данные в родительский компонент
    onAddPost(title, content);

    // Очищаем форму
    setTitle("");
    setContent("");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        placeholder="Заголовок поста"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Контент поста"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit">Добавить</Button>
    </form>
  );
}
