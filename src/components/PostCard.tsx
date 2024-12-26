// src/components/PostCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
  onDeletePost: (id: string) => void; // Добавляем пропс для удаления
}

export default function PostCard({ post, onDeletePost }: PostCardProps) {
  return (
    <Card key={post.id} className="relative"> {/* Добавляем relative для контейнера */}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
        {/* Кнопка удаления */}
        <Button
          variant="destructive" // можно использовать вариант destructive для выделения
          onClick={() => onDeletePost(post.id)}
          className="absolute top-2 right-2" // Позиционируем кнопку
        >
          х
        </Button>
      </CardContent>
    </Card>
  );
}
