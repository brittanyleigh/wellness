import { NextApiRequest, NextApiResponse } from "next";
import isEmpty from "lodash/isEmpty";
import nc from "next-connect";
import prisma, { Prisma } from "@db";
import { getSession } from "@lib/auth/session";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const selectInput = isEmpty(req.body?.select) ? undefined : req.body?.select;
  const whereInput = { completed: false };
  const includeInput = isEmpty(req.body?.include)
    ? undefined
    : req.body?.include;
  const orderByInput = { dueDate: { sort: "asc", nulls: "last" } };
  const cursorInput = isEmpty(req.body?.cursor) ? undefined : req.body?.cursor;
  const takeInput = isEmpty(req.body?.take) ? undefined : req.body?.take;
  const skipInput = isEmpty(req.body?.skip) ? undefined : req.body?.skip;
  const distinctInput = isEmpty(req.body?.distinct)
    ? undefined
    : req.body?.distinct;

  const findManyArgs: Prisma.ToDoFindManyArgs = {
    select: selectInput,
    where: whereInput,
    include: includeInput,
    orderBy: orderByInput,
    cursor: cursorInput,
    take: takeInput,
    skip: skipInput,
    distinct: distinctInput,
  };
  try {
    const toDos = await prisma.toDo.findMany(findManyArgs);

    return res.status(200).json(toDos);
  } catch (error) {
    console.error("[api] user", error);
    return res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default nc().get(handler);
