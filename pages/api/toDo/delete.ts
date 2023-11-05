import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "@db";
import { getSession } from "@lib/auth/session";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;

  try {
    const toDo = await prisma.toDo.delete({
      where: {
        id: req.body.id,
      },
    });

    return res.status(200).json({
      message: "ToDo deleted.",
      data: toDo,
    });
  } catch (error) {
    console.error("[api] toDo/delete", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().post(post);
