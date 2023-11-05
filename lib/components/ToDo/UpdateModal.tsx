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

export const UpdateModal = ({ isOpen, onClose, toDo, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  const [label, setLabel] = useState(toDo?.label);

  if (status === "loading") {
    return <Loader />;
  }

  const handleUpdateToDo = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/toDo/update").send({
      id: toDo.id,
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
          <ModalHeader>{toDo?.label}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleUpdateToDo}>
            <ModalBody>
              <Input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
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
