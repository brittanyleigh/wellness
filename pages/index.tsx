import AppLayout from "@lib/components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import superagent from "superagent";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  Icon,
} from "@chakra-ui/react";
import { IoMdPause, IoMdPlay, IoMdShuffle } from "react-icons/io";
import { GrPowerReset } from "react-icons/gr";
import { RxShuffle } from "react-icons/rx";
import { LuTimer } from "react-icons/lu";
import { GiPartyPopper } from "react-icons/gi";

const Page = () => {
  const [habitList, setHabitList] = useState([]);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(300);
  const [downtimeIsRunning, setDowntimeIsRunning] = useState(false);
  const [downtimeIsFinished, setDowntimeIsFinished] = useState(false);

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

  useEffect(() => {
    if (habits && habits.length) {
      setHabitList(createTimerList(habits, seconds));
    }
  }, [habits, seconds]);

  return (
    <>
      <AppLayout>
        <Center>
          <VStack>
            {downtimeIsFinished && (
              <>
                <Icon as={GiPartyPopper} boxSize={12} />
              </>
            )}
            {!downtimeIsRunning && !downtimeIsFinished && (
              <>
                <Heading size="md">Set-up Downtime</Heading>
                <HStack w="8rem">
                  <Input
                    textAlign="center"
                    value={seconds / 60}
                    type="number"
                    onChange={(event) =>
                      setSeconds(parseInt(event.target.value) * 60)
                    }
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
                    setDowntimeIsRunning(false);
                    setDowntimeIsFinished(true);
                    setTimeout(() => {
                      setDowntimeIsFinished(false);
                    }, 10000);
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
                  {timerIsRunning ? (
                    <>
                      <Icon as={IoMdPause} mr={1} /> Pause
                    </>
                  ) : (
                    <>
                      <Icon as={IoMdPlay} mr={1} /> Play
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => {
                    setDowntimeIsRunning((current) => !current);
                    setTimerIsRunning((current) => !current);
                  }}
                >
                  <Icon as={GrPowerReset} mr={1} /> Reset
                </Button>
              </>
            )}
            {!downtimeIsRunning && (
              <>
                <Button
                  onClick={() => {
                    setDowntimeIsRunning((current) => !current);
                    setTimerIsRunning((current) => !current);
                  }}
                >
                  <Icon as={LuTimer} mr={1} />
                  Start Timer
                </Button>
              </>
            )}
          </VStack>
        </Center>
      </AppLayout>
    </>
  );
};

export default Page;

/* 
//// TO DOs ////

** General **
[ ] Logged out welcome page
[ ] Styling
[ ] Authentication etc
[ ] Clean up - pull out components, etc

** To Do List component **
[ ] To Do models
[ ] Queries
[ ] Mutations

** Habits **
[x] Create
[x] Delete
[ ] Fix page refresh after update

*/
