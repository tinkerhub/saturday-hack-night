import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Avatar,
    Center,
    Heading,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { getDoc, doc, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Select, AsyncSelect, OptionBase, GroupBase } from 'chakra-react-select';
import bg from '../../assets/bg01.png';
import User from '../../assets/physicalHack.png';
import { useFirebase } from '../context/firebase';

interface ProfileMod {
    isOpen: boolean;
    onClose: () => void;
}

interface UserData {
    phno: string;
    email: string;
    district: string;
}

interface Options extends OptionBase {
    label: string;
    value: string;
}

const districts = [
    { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
    { label: 'Kollam', value: 'Kollam' },
    { label: 'Pathanamthitta', value: 'Pathanamthitta' },
    { label: 'Kottayam', value: 'Kottayam' },
    { label: 'Alappuzha', value: 'Alappuzha' },
    { label: 'Idukki', value: 'Idukki' },
    { label: 'Ernakukam', value: 'Ernakukukam' },
    { label: 'Thrissur', value: 'Thrissur' },
    { label: 'Palakkad', value: 'Palakkad' },
    { label: 'Malappuram', value: 'Malappuram' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Wayanad', value: 'Wayanad' },
    { label: 'Kannur', value: 'Kannur' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Kannur', value: 'Kannur' },
    { label: 'Kasarkode', value: 'Kasarkode' },
    { label: 'other', value: 'other' },
];

export const ProfileModal = ({ isOpen, onClose }: ProfileMod) => {
    const { auth, db } = useFirebase();
    const [data, setData] = useState<UserData>({ phno: '', email: '', district: '' });
    const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);

    const fetchCampus = async () => {
        const coll: [Options] = [
            {
                label: 'Other',
                value: 'Other',
            },
        ];
        const req = await fetch(
            `https://us-central1-educational-institutions.cloudfunctions.net/getCollegeByDistrict?district=${data.district}`,
        );
        const res = await req.json();
        res.forEach((college: any) => {
            console.log(college.name);
            coll.push({ label: college.name, value: college.name });
        });
        return coll;
    };

    useEffect(() => {
        auth.onAuthStateChanged(async (authUser: any) => {
            if (!authUser) signInWithPopup(auth, new GithubAuthProvider());
            else {
                const snap = await getDoc(doc(db, `users/${authUser.uid}`));
                setUser(snap);
                setData({
                    phno: snap.get('phno'),
                    email: snap.get('email'),
                    district: snap.get('district') || '',
                });
                // setCampuses({ id: snap.get('campusID') || '', name: snap.get('campusName') || '' });
            }
        });
    }, [auth, db]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }}>
            <ModalOverlay />
            <ModalContent
                minH="600px"
                position="relative"
                borderRadius="10px"
                backgroundColor="#0C0F17"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <ModalBody
                    h="300px"
                    backgroundImage={`
                    linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                    linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                    url(${bg}) `}
                >
                    <ModalCloseButton
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                    <Center flexDirection="column" mt="50px">
                        <Avatar src={User} order="2px solid #DBF72C" width="150px" height="150px" />
                        <Heading color="white" fontFamily="Clash Display">
                            Sreehari jayaraj
                        </Heading>
                        <Heading
                            color="rgba(233, 229, 225, 1)"
                            fontFamily="Clash Display"
                            fontSize="18px"
                            opacity="0.5"
                        >
                            Hello@gmail.com
                        </Heading>
                    </Center>
                    <Flex justifyContent="space-between" alignItems="center" mt="50px">
                        <FormControl label="District" id="District">
                            <FormLabel>District</FormLabel>
                            <Select isClearable options={districts} />

                            <FormErrorMessage>Please pick an option</FormErrorMessage>
                        </FormControl>

                        <FormControl label="College" id="College">
                            <FormLabel>I currenlty study at</FormLabel>
                            <AsyncSelect<Options, true, GroupBase<Options>>
                                isClearable
                                defaultOptions
                                loadOptions={fetchCampus}
                                // loadOptions={() => fetchCampus()}
                                // onInputChange={handleInputChange}
                            />

                            <FormErrorMessage>Please pick an option</FormErrorMessage>
                        </FormControl>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
