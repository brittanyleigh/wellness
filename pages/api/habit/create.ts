import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "@db";
import { getSession } from "@lib/auth/session";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;

  try {
    const habit = await prisma.habit.create({
      data: {
        userId,
        label: req.body.label,
        length: req.body.length,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      message: "Habit created.",
      data: habit,
    });
  } catch (error) {
    console.error("[api] habit/create", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().post(post);
