import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany();
      
      if (posts.length > 0) {
        return res.status(200).json(posts);
      } else {
        return res.status(200).json({ error: "There are no posts" });
      }
    }

    if (req.method === 'POST') {

      if (!req.body || !req.body.title || !req.body.content) {
        return res.status(400).json({
          error: "Missing title or content in the form"
        });
      }

      const { title, content } = req.body;


      const newPost = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      return res.status(201).json(newPost);
    }


    return res.status(405).json({ error: 'Method Not Allowed' });

  } catch (error) {
    console.error("Error occurred: ", error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
