import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface ModalType {
    isOpen: boolean;
    image: string;
    onClose: () => void;
}

export const Team = ({ isOpen, onClose, image }: ModalType) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size={{ base: 'sm', lg: '2xl' }}
        >
            <ModalOverlay />
            <ModalContent bg="rgba(12, 15, 23, 1)" minH="650px">
                <ModalHeader p={0}>
                    <Box h="150px" bg="#637081">
                        <img src={image} alt="" style={{ padding: '20px' }} />
                    </Box>
                </ModalHeader>
                <ModalCloseButton
                    color="rgba(226, 76, 75, 1)"
                    border="2px solid rgba(226, 76, 75, 1)"
                    borderRadius="full"
                />
                <ModalBody mt="6">
                    <Flex
                        justifyContent="space-between"
                        flexDirection={{ base: 'column', lg: 'row' }}
                    >
                        <Box>
                            <Heading fontFamily="Clash Display" as="h2" color="white">
                                Team Details
                            </Heading>
                            <Flex flexDirection="column" mt="20px">
                                <FormControl>
                                    <FormLabel color="white">Team Name</FormLabel>
                                    <Input
                                        ref={initialRef}
                                        placeholder="First name"
                                        bg="rgba(255, 255, 255, 0.15)"
                                        w="300px"
                                        color="white"
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel color="white">Github repository</FormLabel>
                                    <Input
                                        placeholder="www.github.com/project"
                                        bg="rgba(255, 255, 255, 0.15)"
                                        color="white"
                                    />
                                </FormControl>
                            </Flex>
                        </Box>
                        <Flex flexDirection="column" mt="60px">
                            <FormControl>
                                <FormLabel color="white">Member 1</FormLabel>
                                <Input
                                    ref={initialRef}
                                    placeholder="Devs"
                                    bg="rgba(255, 255, 255, 0.15)"
                                    w="300px"
                                    color="white"
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel color="white">Member 2</FormLabel>
                                <Input
                                    placeholder="www.github.com/project"
                                    bg="rgba(255, 255, 255, 0.15)"
                                    color="white"
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel color="white">Member 3</FormLabel>
                                <Input
                                    placeholder="www.github.com/project"
                                    bg="rgba(255, 255, 255, 0.15)"
                                    color="white"
                                />
                            </FormControl>
                        </Flex>
                    </Flex>
                </ModalBody>

                <ModalFooter justifyContent="flex-start">
                    <Button
                        backgroundColor="rgba(255, 255, 255, 1)"
                        onClick={onClose}
                        fontFamily="Clash Display"
                    >
                        Update Details
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
