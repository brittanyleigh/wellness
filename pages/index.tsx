import AppLayout from "@lib/components/Layouts/AppLayout";
import { useQuery } from "react-query";
import superagent from "superagent";

const Page = () => {
  const habitsQuery = useQuery(["habit/list"], async () => {
    const data = await superagent.get("/api/habit/list").send();

    return data.body;
  });

  console.log(habitsQuery.data);

  const handleCreateHabit = async () => {
    console.log("handle create habit");
    const response = await superagent.post("/api/habit/create");
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
        <button onClick={handleCreateHabit}>Create Habit Test</button>
      </AppLayout>
    </>
  );
};

export default Page;
