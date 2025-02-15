/**
 * @file CrearSprintModal.js
 * @brief Modal cuando se crea un Sprint
 */

import { useRef } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  Center,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../api";
import { useAuth0 } from "@auth0/auth0-react";
const Crear = ({ projectId, isOpen, onClose }) => {
  const initialRef = useRef();
  const { user } = useAuth0();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await api.sprints.createSprint({
        projectId,
        creadoPor: user.sub,
        ...data,
      });
      onClose();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Sprint</ModalHeader>

        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.nombre}>
              <FormLabel fontSize="25px" htmlFor="nombre">
                Nombre
              </FormLabel>
              <Input
                id="nombre"
                ref={initialRef}
                {...register("nombre", {
                  required: "This is required",
                  minLength: {
                    value: 4,
                    message: "Debe tener al menos 4 caracteres",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.nombre && errors.nombre.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors["estimado"]}>
              <FormLabel fontSize="25px">Duración estimada(dias)</FormLabel>
              <Controller
                name="estimacion"
                control={control}
                rules={{ required: "Valor Requerido" }}
                defaultValue={1}
                render={(props) => (
                  <NumberInput
                    fontSize="lg"
                    value={props.field.value}
                    onChange={(n) => {
                      if (n > 0) {
                        props.field.onChange(n);
                      }
                    }}
                  >
                    <NumberInputField fontSize="lg" borderColor="grey.300" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              <FormErrorMessage>{errors["estimado"]?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              mr={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Crear
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Crear;
