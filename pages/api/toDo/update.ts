import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "@db";
import { getSession } from "@lib/auth/session";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;

  console.log(req.body);

  try {
    const toDo = await prisma.toDo.update({
      where: {
        id: req.body.id,
      },
      data: {
        label: req.body.label,
        completed: req.body.completed,
      },
    });

    return res.status(200).json({
      message: "ToDo updated.",
      data: toDo,
    });
  } catch (error) {
    console.error("[api] toDo/update", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().post(post);
