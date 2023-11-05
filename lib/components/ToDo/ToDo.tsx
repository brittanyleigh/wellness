import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { IconButton, Text } from "@chakra-ui/react";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { useState } from "react";

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
      <IconButton
        variant="ghost"
        aria-label="Complete"
        icon={isComplete ? <FiCheckCircle /> : <FiCircle />}
        borderRadius="full"
        mr={3}
        onClick={() => handleToDoCompleted(toDo?.id)}
        isDisabled={isComplete}
      />
      <Text as={isComplete ? "s" : "p"} display="inline">
        {toDo?.label}
      </Text>
    </li>
  );
};
