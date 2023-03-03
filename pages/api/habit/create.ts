import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "@db";
import { getSession } from "@lib/auth/session";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const userId = session?.user?.id;

  try {
    const admin = await prisma.habit.create({
      data: {
        userId,
        label: "Habit One",
        length: 5,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      message: "Habit created.",
      data: admin,
    });
  } catch (error) {
    console.error("[api] habit/create", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().post(post);
