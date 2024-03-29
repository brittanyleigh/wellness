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
import { ToDo } from "@lib/components/ToDo";
import { CreateToDo } from "@lib/components/ToDo/CreateToDo";

const ToDos = () => {
  const { status } = useSession({
    required: false,
  });

  const toDosQuery = useQuery(["toDo/list"], async () => {
    const data = await superagent.get("/api/toDo/list").send();

    return data.body;
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (status === "loading") {
    return <Loader />;
  }

  const { data: toDos, refetch } = toDosQuery;

  return (
    <>
      <AppLayout>
        <ul>
          {toDos?.map((toDo) => {
            return <ToDo toDo={toDo} key={toDo.id} refetch={refetch} />;
          })}
        </ul>
        <Button onClick={onOpen}>
          <Icon as={FiPlus} mr={1} />
          Create New ToDo
        </Button>
        <CreateToDo isOpen={isOpen} onClose={onClose} refetch={refetch} />
      </AppLayout>
    </>
  );
};

export default ToDos;
