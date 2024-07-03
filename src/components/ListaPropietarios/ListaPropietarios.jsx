import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPropietarios,
  deletePropietario,
} from "../../services/propietarios";
import {
  Card,
  CardHeader,
  Avatar,
  Button,
  Text,
  Flex,
  VStack,
  HStack,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  ModalFooter,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import Calendar from "../Calendar/Calendar";
import "./ListaPropietarios.css";

const ListaPropietarios = () => {
  const navigate = useNavigate();
  const [propietarios, setPropietarios] = useState([]);
  const [propietarioSeleccionado, setPropietarioSeleccionado] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorder = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPropietarios();
        console.log("Propietarios obtenidos en el front:", result);
        setPropietarios(result);
      } catch (error) {
        console.error("Error al obtener los propietarios:", error);
      }
    };
    fetchData();
  }, []);

  const navegarAFormulario = (propietario) => {
    navigate("/enter-owner", {
      state: { propietarioSeleccionado: propietario },
    });
  };

  const handleEliminarPropietario = async (id) => {
    await deletePropietario(id);
    setPropietarios(propietarios.filter((prop) => prop._id !== id));
  };

  const handleVerDetalles = (propietario) => {
    setPropietarioSeleccionado(propietario);
    onOpen();
  };

  return (
    <VStack spacing={5} className="container-card" width="100%" >
      {propietarios.length > 0 ? (
        propietarios.map((propietario) => (
          <Card
            key={propietario._id}
            bg={cardBg}
            borderColor={cardBorder}
            className="card"
            cursor="pointer"
          >
            <CardHeader>
              <Flex display="flex" flexDirection="column" space-between align="center">
                <Box>
                  <Text fontSize="xl">
                    {propietario.nombres} {propietario.apellidos}
                  </Text>
                </Box>
                <Avatar
                  name={`${propietario.nombres} ${propietario.apellidos}`}
                  size="sm"
                />
                <VStack align="start" ml={3}>
                  <HStack spacing={2}>
                    <Button
                      onClick={() => navegarAFormulario(propietario)}
                      leftIcon={<BiEdit />}
                      colorScheme="blue"
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleEliminarPropietario(propietario._id)}
                      leftIcon={<BiTrash />}
                      colorScheme="red"
                    >
                      Eliminar
                    </Button>
                    <Button
                      onClick={() => handleVerDetalles(propietario)}
                      colorScheme="teal"
                    >
                      Ver Detalles
                    </Button>
                  </HStack>
                </VStack>
              </Flex>
            </CardHeader>
          </Card>
        ))
      ) : (
        <Text>No se encontraron propietarios.</Text>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
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
          <ModalHeader
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            w="67%"
            mt="20px"
          >
            <h2>
              {propietarioSeleccionado?.nombres}{" "}
              {propietarioSeleccionado?.apellidos}
            </h2>
            <ModalCloseButton w="2%" />
          </ModalHeader>
          <ModalBody
            id="modal-body"
            w="64%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            {propietarioSeleccionado && (
              <div>
                <Text>
                  <strong>Tipo de Documento:</strong>{" "}
                  {propietarioSeleccionado.tipoDocumento}
                </Text>
                <Text>
                  <strong>Número de Documento:</strong>{" "}
                  {propietarioSeleccionado.numeroDocumento}
                </Text>
                <Text>
                  <strong>Fecha de Nacimiento:</strong>{" "}
                  {new Date(
                    propietarioSeleccionado.fechaNacimiento
                  ).toLocaleDateString()}
                </Text>
                <Text>
                  <strong>Edad:</strong> {propietarioSeleccionado.edad}
                </Text>
                <Text>
                  <strong>Correo Electrónico:</strong>{" "}
                  {propietarioSeleccionado.correoElectronico}
                </Text>
                <Text>
                  <strong>Celular:</strong> {propietarioSeleccionado.celular}
                </Text>
              </div>
            )}
            <ModalFooter>
              <Calendar />
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default ListaPropietarios;
