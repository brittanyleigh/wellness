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

export const DeleteModal = ({ isOpen, onClose, habit, refetch }) => {
  const { status } = useSession({
    required: false,
  });

  if (status === "loading") {
    return <Loader />;
  }

  const handleDeleteHabit = async (event) => {
    event.preventDefault();
    const response = await superagent.post("/api/habit/delete").send({
      id: habit.id,
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
          <form onSubmit={handleDeleteHabit}>
            <ModalBody>
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  This will permanately delete the habit{" "}
                  <strong>{habit?.label}</strong> and cannot be undone.
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
