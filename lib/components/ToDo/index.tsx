import AppLayout from "@lib/components/Layouts/AppLayout";
import { useSession } from "next-auth/react";
import Loader from "@lib/components/Loader";
import superagent from "superagent";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
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
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { UpdateToDo } from "@lib/components/ToDo/UpdateToDo";
import { DeleteToDo } from "@lib/components/ToDo/DeleteToDo";

export const ToDo = ({ toDo, refetch }) => {
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
      <Flex alignItems="center">
        {toDo.label}
        {toDo?.dueDate ? (
          <Tag ml={2} colorScheme="green">
            DUE {new Date(toDo?.dueDate).toDateString()}
          </Tag>
        ) : null}
        <Button onClick={onUpdateOpen} size="sm" ml={3}>
          <Icon as={FiEdit3} />
        </Button>
        <UpdateToDo
          isOpen={isUpdateOpen}
          onClose={onUpdateClose}
          toDo={toDo}
          refetch={refetch}
        />
        <Button onClick={onDeleteOpen} size="sm" ml={1}>
          <Icon as={FiTrash2} />
        </Button>
        <DeleteToDo
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          toDo={toDo}
          refetch={refetch}
        />
      </Flex>
    </Box>
  );
};
