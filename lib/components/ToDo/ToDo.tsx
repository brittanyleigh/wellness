import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { Box, Flex, IconButton, Tag, Text } from "@chakra-ui/react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { useState } from "react";
import moment from "moment";

export const ToDo = ({ toDo, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [isComplete, setIsComplete] = useState(false);

  if (status === "loading") {
    return <Loader />;
  }

  const handleToDoCompleted = async (id) => {
    const response = await superagent.post("/api/toDo/update").send({
      id,
      completed: true,
    });
    setIsComplete(true);
    setTimeout(() => {
      refetch();
    }, 2000);
  };

  return (
    <li key={toDo?.label}>
      <Flex alignItems="center">
        <IconButton
          variant="ghost"
          aria-label="Complete"
          icon={isComplete ? <FiCheckCircle /> : <FiCircle />}
          borderRadius="full"
          mr={3}
          onClick={() => handleToDoCompleted(toDo?.id)}
          isDisabled={isComplete}
        />
        <Text as={isComplete ? "s" : "p"} display="inline" mr={2}>
          {toDo?.label}
        </Text>
        {toDo?.dueDate ? (
          <Tag colorScheme="green">
            DUE {moment(toDo?.dueDate).format("YYYY-MM-DD")}
          </Tag>
        ) : null}
      </Flex>
    </li>
  );
};
