// src/components/PostCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "@/components/ui/Modal"; // Импортируем модальное окно
// import { useRouter } from 'next/router';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string; // Добавляем дату публикации поста
  };
  onDeletePost: (id: string) => void; // Добавляем пропс для удаления
}

export default function PostCard({ post, onDeletePost }: PostCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const router = useRouter(); // Инициализируем useNavigate

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    onDeletePost(post.id);
    closeModal(); // Закрываем модальное окно после удаления
  };

  // Обрезаем контент до 50 символов, если он длиннее
  const truncatedContent = post.content.length > 50 ? post.content.substring(0, 100) + "..." : post.content;

  // const handleCardClick = () => {
  //   router.push(`/post/${post.id}`); // Перенаправляем на страницу поста
  // };
  

  return (
    <Card key={post.id} className="relative"> {/* Добавляем обработчик клика на карточку */}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{truncatedContent}</p> {/* Показываем укороченный контент */}
        <Button
          variant="destructive"
          onClick={openModal} // Открываем модальное окно
          className="absolute top-2 right-2"
        >
          х
        </Button>
      </CardContent>

      {/* Модальное окно подтверждения удаления */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Подтверждение удаления"
        message={`Вы уверены, что хотите удалить пост "${post.title}"?`}
      />
    </Card>
  );
}
