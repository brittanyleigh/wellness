import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Button,
  FormControl,
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
import moment from "moment";
import { log } from "console";

export const UpdateToDo = ({ isOpen, onClose, toDo, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState(toDo?.label);
  const [dueDate, setDueDate] = useState(
    toDo.dueDate ? moment(toDo?.dueDate).format("YYYY-MM-DD") : null
  );

  if (status === "loading") {
    return <Loader />;
  }

  const handleUpdateToDo = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/toDo/update").send({
      id: toDo.id,
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
          <ModalHeader>{toDo?.label}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateToDo}>
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={label}
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
              <Button type="submit">Update</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
