import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { UpdateHabit } from "@lib/components/Habit/UpdateHabit";
import { DeleteHabit } from "@lib/components/Habit/DeleteHabit";

export const Habit = ({ habit, refetch }) => {
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <Box my={3}>
      {habit.label} | {habit.length} Minutes
      <Button onClick={onUpdateOpen} size="sm" ml={3}>
        <Icon as={FiEdit3} />
      </Button>
      <UpdateHabit
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        habit={habit}
        refetch={refetch}
      />
      <Button onClick={onDeleteOpen} size="sm" ml={1}>
        <Icon as={FiTrash2} />
      </Button>
      <DeleteHabit
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        habit={habit}
        refetch={refetch}
      />
    </Box>
  );
};
