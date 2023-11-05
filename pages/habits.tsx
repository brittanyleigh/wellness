import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FiEdit3, FiPlus } from "react-icons/fi";
import { UpdateModal } from "@lib/components/Habit/UpdateModal";
import { Habit } from "@lib/components/Habit";
import { CreateModal } from "@lib/components/Habit/CreateModal";

const Page = () => {
  const { status } = useSession({
    required: false,
  });
  const habitsQuery = useQuery(["habit/list"], async () => {
    const data = await superagent.get("/api/habit/list").send();

    return data.body;
  });

  const [label, setLabel] = useState("");
  const [length, setLength] = useState(5);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (status === "loading") {
    return <Loader />;
  }

  const { data: habits, refetch } = habitsQuery;

  return (
    <>
      <AppLayout>
        <ul>
          {habits?.map((habit) => {
            return <Habit habit={habit} key={habit.id} refetch={refetch} />;
          })}
        </ul>
        <Button onClick={onOpen}>
          <Icon as={FiPlus} mr={1} />
          Create New Habit
        </Button>
        <CreateModal isOpen={isOpen} onClose={onClose} refetch={refetch} />
      </AppLayout>
    </>
  );
};

export default Page;
