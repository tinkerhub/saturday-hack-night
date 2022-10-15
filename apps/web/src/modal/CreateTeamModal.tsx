import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Heading,
} from '@chakra-ui/react';
import React from 'react';
import { useFirebase } from '../context/firebase';

export const CreateTeamModal = ({ isOpen, onClose, eventId }: CreateTeamModalProps) => {
    const { auth } = useFirebase();
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }} isCentered>
            <ModalOverlay />
            <ModalContent
                borderRadius="10px"
                backgroundColor="#0C0F17"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <ModalHeader
                    borderTopRadius="10px"
                    style={{
                        padding: '16px',
                    }}
                >
                    <Heading fontFamily="Clash Display" fontSize="32px" textColor="#E9E5E1">
                        Register Your Team
                    </Heading>
                    <Text
                        fontFamily="Clash Display"
                        fontSize="16px"
                        textColor="rgba(255,255,255,0.4)"
                    >
                        you&apos;r are currently logged in as{' '}
                        <span
                            style={{
                                color: 'white',
                            }}
                        >
                            {auth.currentUser?.email}
                        </span>
                    </Text>
                    <ModalCloseButton
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                </ModalHeader>
                <ModalBody marginTop="36px">
                    <Text>Create a team for the event. You can add members later.</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
}
