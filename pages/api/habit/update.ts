import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "@db";
import { getSession } from "@lib/auth/session";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;

  try {
    const habi = await prisma.habit.update({
      where: {
        id: req.body.id,
      },
      data: {
        label: req.body.label,
        length: req.body.length,
      },
    });

    return res.status(200).json({
      message: "Habit updated.",
      data: habi,
    });
  } catch (error) {
    console.error("[api] habit/update", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().post(post);
