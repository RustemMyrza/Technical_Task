// pages/api/posts/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } else if (req.method === 'DELETE') {
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Post deleted' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
