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
} from "@chakra-ui/react";

export const CreateModal = ({ isOpen, onClose, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState("");

  if (status === "loading") {
    return <Loader />;
  }

  const handleCreateToDo = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/toDo/create").send({
      label,
    });
    refetch();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New To Do</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleCreateToDo}>
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={label}
                  placeholder="Ex: Meditate"
                  onChange={(event) => setLabel(event.target.value)}
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
