import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const UpdateModal = ({ isOpen, onClose, habit, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState(habit?.label);
  const [length, setLength] = useState(habit?.length);

  if (status === "loading") {
    return <Loader />;
  }

  const handleUpdateHabit = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/habit/update").send({
      id: habit.id,
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
          <ModalHeader>{habit?.label}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateHabit}>
            <ModalBody>
              <Input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />
              <Input
                type="number"
                value={length}
                onChange={(event) => setLength(parseInt(event.target.value))}
              />
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
