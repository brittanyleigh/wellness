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

export const CreateHabit = ({ isOpen, onClose, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState("");
  const [length, setLength] = useState(5);

  if (status === "loading") {
    return <Loader />;
  }

  const handleCreateHabit = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/habit/create").send({
      label,
      length,
    });
    refetch();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Habit</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleCreateHabit}>
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Name</FormLabel>
                <Input
                  value={label}
                  placeholder="Ex: Meditate"
                  onChange={(event) => setLabel(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Minutes</FormLabel>
                <Input
                  type="number"
                  value={length}
                  onChange={(event) => setLength(parseInt(event.target.value))}
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
