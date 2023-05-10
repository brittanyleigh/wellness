import AppLayout from "@lib/components/Layouts/AppLayout";
import { useState } from "react";
import { useQuery } from "react-query";
import superagent from "superagent";

const Page = () => {
  const [label, setLabel] = useState("");
  const [length, setLength] = useState(5);
  const habitsQuery = useQuery(["habit/list"], async () => {
    const data = await superagent.get("/api/habit/list").send();

    return data.body;
  });

  console.log(habitsQuery.data);
  const habits = habitsQuery.data;

  const handleCreateHabit = async () => {
    const response = await superagent.post("/api/habit/create").send({
      label,
      length,
    });
  };

  const handleUpdateHabit = async () => {
    const response = await superagent.post("/api/habit/update").send({
      id: habits[0].id,
      label,
      length,
    });
  };

  return (
    <>
      <AppLayout>
        {/* <blockquote> */}
        <h1>Welcome to the PlanetScale Next.js Starter App!</h1>
        <p>
          This is an example site to demonstrate how to use{" "}
          <a href={`https://next-auth.js.org`}>NextAuth.js</a> for
          authentication with PlanetScale and Prisma.
        </p>
        <form>
          <input
            type="text"
            onChange={(e) => setLabel(e.target.value)}
            value={label}
          />
          <input
            type="number"
            onChange={(e) => setLength(parseInt(e.target.value))}
            value={length}
          />{" "}
          Minutes
        </form>
        <button onClick={handleUpdateHabit}>Create Habit Test</button>
      </AppLayout>
    </>
  );
};

export default Page;
