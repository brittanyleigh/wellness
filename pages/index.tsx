import AppLayout from "@lib/components/Layouts/AppLayout";
import { useState } from "react";
import { useQuery } from "react-query";
import superagent from "superagent";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Page = () => {
  const [label, setLabel] = useState("");
  const [length, setLength] = useState(5);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
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
        <CountdownCircleTimer
          isPlaying={timerIsRunning}
          duration={10}
          colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[10, 5, 2, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        <button onClick={() =>setTimerIsRunning((current) => !current)}>Start/Pause</button>
        {/* <form>
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
        <button onClick={handleCreateHabit}>Create Habit Test</button> */}
      </AppLayout>
    </>
  );
};

export default Page;

/* 
Logged out welcome page
Homepage
  - Timer
  - Button to generate habits list
Habits page
  - Habits list
  - Create new habit
  - Update habits
  - Delete habits
Settings
  - User info
  - General settings 
    - randomize / by priority



- Auth etc
*/
