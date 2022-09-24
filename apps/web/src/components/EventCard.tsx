import { Heading, Text, Image, VStack, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/firebase';
import ResultsModal from '../modal/ResultsModal';

const EventCard = ({ id, image, title, description, registration, results }: EventCardProps) => {
    const { auth } = useFirebase();
    const navigate = useNavigate();
    const {
        isOpen: isRegistrationOpen,
        onOpen: onRegistrationOpen,
        onClose: onRegistrationClose,
    } = useDisclosure();
    const register = () => {
        if (auth.currentUser) {
            navigate('/dashboard');
        } else {
            signInWithPopup(auth, new GithubAuthProvider());
        }
    };
    return (
        <>
            {results && isRegistrationOpen && (
                <ResultsModal id={id} isOpen={isRegistrationOpen} onClose={onRegistrationClose} />
            )}
            <Flex
                flexDirection="column"
                bg="#5B9E7D"
                textColor="#fff"
                width="300px"
                borderRadius="8px"
                minHeight="320px"
            >
                <Image
                    objectFit="cover"
                    width="300px"
                    height="150px"
                    borderRadius="8px 8px 0 0 "
                    src={image}
                />
                <VStack alignItems="flex-start" marginInline="10px" marginBlock="5px" flexGrow="1">
                    <Heading>{title}</Heading>
                    <Text fontSize="16px">{description}</Text>
                </VStack>
                <Flex
                    columnGap="10px"
                    marginInline="10px"
                    marginBlockEnd="5px"
                    marginTop="auto"
                    justifyContent="flex-end"
                >
                    {results && (
                        <Button
                            color="#5B9E7D"
                            variant="solid"
                            onClick={() => onRegistrationOpen()}
                            _focus={{
                                backgroundColor: '#fff',
                            }}
                        >
                            Results
                        </Button>
                    )}
                    {registration && (
                        <Button
                            color="#5B9E7D"
                            variant="solid"
                            onClick={register}
                            _focus={{
                                backgroundColor: '#fff',
                            }}
                        >
                            Register
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

interface EventCardProps {
    id: string;
    title: string;
    image: string;
    description: string;
    registration: boolean;
    results: boolean;
}
export default EventCard;
