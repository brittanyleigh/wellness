import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const DeleteModal = ({ isOpen, onClose, toDo, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return <Loader />;
  }

  const handleDeleteToDo = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/toDo/delete").send({
      id: toDo.id,
    });
    refetch();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleDeleteToDo}>
            <ModalBody>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  This will permanately delete the to do{" "}
                  <strong>{toDo?.label}</strong> and cannot be undone.
                </AlertDescription>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="gray" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" type="submit">
                Yes, DELETE
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
