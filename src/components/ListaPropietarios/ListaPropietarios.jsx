import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Text, Flex, Box,} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure,} from "@chakra-ui/react";
import Calendar from "../Calendar/Calendar";
import "./ListaPropietarios.css";

const ListaPropietarios = ({ propietarios }) => {
  const navigate = useNavigate();
  const [propietariosLista, setPropietariosLista] = useState(propietarios);
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState(null);

  const eliminarPropietario = (index) => {
    const nuevosPropietarios = propietariosLista.filter((_, i) => i !== index);
    setPropietariosLista(nuevosPropietarios);
    localStorage.setItem("propietarios", JSON.stringify(nuevosPropietarios));
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("propietarios", JSON.stringify(propietariosLista));
  }, [propietariosLista]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const seleccionarPropietario = (propietario) => {
    setPropietarioSeleccionado(propietario);
    onOpen();
  };

  const navegarAFormulario = (propietario) => {
    navigate('/enter-owner', { state: { propietarioSeleccionado: propietario } });
 };

  return (
    <div>
      <Card onClick={onOpen} cursor="pointer">
      <div className="container-card" width="100%">
        {propietarios.map((propietario, index) => (
          <div
            key={index}
            className="card"
            onClick={() => seleccionarPropietario(propietario)}
          >
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontSize="xl">
                    {propietario.nombres} {propietario.apellidos}
                  </Text>
                </Box>
                <Avatar
                  size="sm"
                  name={`${propietario.nombres} ${propietario.apellidos}`}
                />
              </Flex>
              <Text mt="5px">Documento: {propietario.numeroDocumento}</Text>
            </CardHeader>

            <Modal onClose={onClose} size="lg" isOpen={isOpen}>
              <ModalOverlay bg="#00000054" />
              <ModalContent
                m="50px"
                borderRadius="15px"
                bg="white"
                display="flex"
                flexDirection="column"
                justify="space-between"
                alignItems="center"
              >
                <ModalHeader display="flex" flexDirection="row" justifyContent="space-between" w="67%" mt="20px" >
                  <h2>
                  {propietarioSeleccionado?.nombres}{" "}
                  {propietarioSeleccionado?.apellidos}
                  </h2>
                <ModalCloseButton w="2%"/>
                </ModalHeader>
                <ModalBody id="modal-body"
                w="64%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between">
                      <CardBody display="flex" flexDirection="column" justifyContent="center"
                      >
                        <Text display="flex" mt="5px">
                          Tipo de documento:{" "}
                          {propietarioSeleccionado?.tipoDocumento}
                        </Text>
                        <Text display="flex">
                          Número de documento:{" "}
                          {propietarioSeleccionado?.numeroDocumento}
                        </Text>
                        <Text display="flex">
                          Fecha de nacimiento:{" "}
                          {propietarioSeleccionado?.fechaNacimiento}
                        </Text>
                        <Text display="flex">
                          Edad: {propietarioSeleccionado?.edad}
                        </Text>
                        <Text display="flex">
                          Correo electrónico:{" "}
                          {propietarioSeleccionado?.correoElectronico}
                        </Text>
                        <Text display="flex">
                          Celular: {propietarioSeleccionado?.celular}
                        </Text>
                        <Button onClick={() => {navegarAFormulario(propietarioSeleccionado)}}
                          leftIcon={<BiEdit />}
                          variant="outline"
                        >
                          Actualizar
                        </Button>
                        <Button
                          onClick={() => eliminarPropietario(index)}
                          leftIcon={<BiTrash />}
                          variant="outline"
                        >
                          Eliminar
                        </Button>
                      </CardBody>
                      <CardFooter m="20px">
                        <Calendar />
                      </CardFooter>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        ))}
      </div>
      </Card>
    </div>
  );
};

ListaPropietarios.propTypes = {
  propietarios: PropTypes.array.isRequired,
};

export default ListaPropietarios;
