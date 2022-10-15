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
} from '@chakra-ui/react';
import React from 'react';

export const CreateTeamModal = ({ isOpen, onClose, image, eventId }: CreateTeamModalProps) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Create Team</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
interface CreateTeamModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: string;
    eventId: string;
}
