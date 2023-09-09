import AppLayout from "@lib/components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import superagent from "superagent";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  useToken,
  Icon,
} from "@chakra-ui/react";
import { IoMdPause, IoMdPlay, IoMdShuffle } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { RxShuffle } from "react-icons/rx";
import { LuTimer } from "react-icons/lu";

const Page = () => {
  const [label, setLabel] = useState("");
  const [length, setLength] = useState(5);
  const [habitList, setHabitList] = useState([]);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [downtimeIsRunning, setDowntimeIsRunning] = useState(false);

  const habitsQuery = useQuery(["habit/list"], async () => {
    const data = await superagent.get("/api/habit/list").send();

    return data.body;
  });

  const getRandomHabit = (list) => {
    return list?.length && list[Math.floor(Math.random() * list.length)];
  };

  const getTimerOptions = (list, timer) => {
    let options = list ? list.filter((h) => h.length === timer) : [];
    if (options.length === 0) {
      options = list ? list.filter((h) => h.length <= timer) : [];
    }
    return options;
  };

  const getOptions = (list, minutes) => {
    return list ? list.filter((h) => h?.length === minutes) : [];
  };

  const createTimerList = (list, timerSeconds) => {
    const timerList = [];
    let minutes = timerSeconds / 60;
    let options = getTimerOptions(list, minutes);

    while (minutes > 0) {
      const option = getRandomHabit(options);
      const index = options.indexOf(option);
      options.splice(index, 1);

      if (option) {
        timerList.push(option);
        minutes = minutes - option?.length;
        options = getTimerOptions(options, minutes);
      } else {
        minutes = 0;
      }
    }

    return timerList;
  };

  const habits = habitsQuery.data;
  // const habitList = createTimerList(habits, seconds) || [];

  useEffect(() => {
    if (habits && habits.length) {
      setHabitList(createTimerList(habits, seconds));
    }
  }, [habits, seconds]);

  console.log("HABIT LIST:", habitList);

  // const handleCreateHabit = async () => {
  //   const response = await superagent.post("/api/habit/create").send({
  //     label,
  //     length,
  //   });
  // };

  // const handleUpdateHabit = async () => {
  //   const response = await superagent.post("/api/habit/update").send({
  //     id: habits[0].id,
  //     label,
  //     length,
  //   });
  // };

  return (
    <>
      <AppLayout>
        <Center>
          <VStack>
            {!downtimeIsRunning && (
              <>
                <Heading size="md">Set-up Downtime</Heading>
                <HStack w="8rem">
                  <Input
                    textAlign="center"
                    value={seconds / 60}
                    type="number"
                    onChange={(event) => setSeconds(event.target.value * 60)}
                  />
                  <Text>Minutes</Text>
                </HStack>
                <Box>
                  <ul>
                    {habitList.map((h) => {
                      return (
                        <li
                          key={`${h.label}+${Math.floor(Math.random() * 100)}`}
                        >
                          {h?.label} | {h?.length} Minutes
                        </li>
                      );
                    })}
                  </ul>
                  <Button
                    onClick={() =>
                      setHabitList(createTimerList(habits, seconds))
                    }
                  >
                    <Icon as={RxShuffle} mr={1} />
                    Shuffle
                  </Button>
                </Box>
              </>
            )}
            {downtimeIsRunning && (
              <>
                <CountdownCircleTimer
                  isPlaying={timerIsRunning}
                  duration={seconds}
                  colors={["#3182CE", "#319795", "#38A169"]}
                  colorsTime={[seconds, seconds / 2, 0]}
                  strokeWidth={15}
                  strokeLinecap="butt"
                  onComplete={() => {
                    setTimerIsRunning(false);
                    return {
                      shouldRepeat: true,
                      delay: 1.5,
                      newInitialRemainingTime: seconds,
                    };
                  }}
                >
                  {({ remainingTime }) => {
                    const minutes = Math.floor(remainingTime / 60);
                    const seconds = remainingTime % 60;
                    let secondsDisplay = `${seconds}`;
                    if (seconds < 10) {
                      secondsDisplay = `0${seconds}`;
                    }

                    return (
                      <>
                        {minutes}:{secondsDisplay}
                      </>
                    );
                  }}
                </CountdownCircleTimer>
                <Button
                  onClick={() => setTimerIsRunning((current) => !current)}
                >
                  {timerIsRunning ? <IoMdPause /> : <IoMdPlay />}
                </Button>
              </>
            )}
            {!downtimeIsRunning && (
              <>
                {/* <Button
                  onClick={() => setDowntimeIsRunning((current) => !current)}
                >
                  <Icon as={LuTimer} mr={1} />
                  Start Timer
                </Button> */}
                <Button
                  onClick={() => setDowntimeIsRunning((current) => !current)}
                >
                  <Icon as={LuTimer} mr={1} />
                  Start Timer
                </Button>
              </>
            )}
          </VStack>
        </Center>

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
          seconds
        </form>
        <button onClick={handleCreateHabit}>Create Habit Test</button> */}
      </AppLayout>
    </>
  );
};

export default Page;

/* 
Set up Chakra styles
Style timer homepage
Add input for timer length
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
