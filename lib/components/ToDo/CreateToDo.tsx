import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export const CreateToDo = ({ isOpen, onClose, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (status === "loading") {
    return <Loader />;
  }

  const handleCreateToDo = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/toDo/create").send({
      label,
      dueDate,
    });
    refetch();
    onClose();
  };

  const Optional = () => (
    <Text
      fontStyle="italic"
      color="gray.500"
      fontSize="xs"
      display="inline"
      ml={2}
    >
      (optional)
    </Text>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New To Do</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleCreateToDo}>
            <ModalBody>
              <FormControl mb={3} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={label}
                  placeholder="Ex: Meditate"
                  onChange={(event) => setLabel(event.target.value)}
                />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel optionalIndicator={<Optional />}>Due Date</FormLabel>
                <Input
                  value={dueDate}
                  type="date"
                  onChange={(event) => setDueDate(event.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
