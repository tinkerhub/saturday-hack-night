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
    Text,
    Select,
    Box,
    ModalHeader,
    Button,
    Input,
    FormErrorMessage,
} from '@chakra-ui/react';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { getDoc, doc, DocumentData, DocumentSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import bg from '../../assets/images/codeBg.png';
import User from '../../assets/images/physicalHack.png';
import { useFirebase } from '../context/firebase';
import { toTitleCase } from '../utils';

interface ProfileMod {
    isOpen: boolean;
    onClose: () => void;
}

interface UserData {
    phno: string;
    email: string;
    district: string;
    campus: string;
    campusId: string;
}

interface Campus {
    campusId: string;
    campusName: string;
}

const districts = [
    { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
    { label: 'Kollam', value: 'Kollam' },
    { label: 'Pathanamthitta', value: 'Pathanamthitta' },
    { label: 'Alappuzha', value: 'Alappuzha' },
    { label: 'Kottayam', value: 'Kottayam' },
    { label: 'Idukki', value: 'Idukki' },
    { label: 'Ernakulam', value: 'Ernakulam' },
    { label: 'Thrissur', value: 'Thrissur' },
    { label: 'Palakkad', value: 'Palakkad' },
    { label: 'Malappuram', value: 'Malappuram' },
    { label: 'Wayanad', value: 'Wayanad' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Kannur', value: 'Kannur' },
    { label: 'Kasaragod', value: 'Kasaragod' },
    { label: 'other', value: 'other' },
];

export const ProfileModal = ({ isOpen, onClose }: ProfileMod) => {
    const { auth, db } = useFirebase();
    const [data, setData] = useState<UserData>({
        phno: '',
        email: '',
        district: '',
        campus: '',
        campusId: '',
    });
    const [user, setUser] = useState<DocumentSnapshot<DocumentData> | null>(null);
    const [loading, setLoading] = useState(true);
    const [campuses, setCampuses] = useState<Array<Campus>>([{ campusId: '', campusName: '' }]);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const coll: [any] = [
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
                coll.push({ campusId: college.id, campusName: college.name });
            });
            setCampuses(coll);
            setLoading(false);
        })();
        return () => {
            setLoading(false);
        };
    }, [data.district]);

    useEffect(() => {
        auth.onAuthStateChanged(async (authUser: any) => {
            if (!authUser) return;
            const snap = await getDoc(doc(db, `users/${authUser.uid}`));
            setUser(snap);
            setData({
                phno: snap.get('phno'),
                email: snap.get('email'),
                district: snap.get('district') || '',
                campus: snap.get('campusName') || '',
                campusId: snap.get('campusID') || '',
            });
            // setCampuses({ id: snap.get('campusID') || '', name: snap.get('campusName') || '' });
        });
    }, [auth, db]);

    // eslint-disable-next-line consistent-return
    const updateProfile = async () => {
        setError(false);
        setLoading(true);
        if (!data.phno || !data.phno.match(/^(\+\d{1,3})?\d{10}$/g)) {
            setLoading(false);
            return setError(true);
        }
        if (data.district === 'Other')
            setData((d) => ({ ...d, district: '', campus: '', districtId: '' }));
        if (auth.currentUser) {
            updateDoc(user!.ref, {
                phno: data.phno,
                email: data.email,
                district: data.district,
                campusID: data.campusId,
                campusName: data.campus,
            })
                .then(() => {
                    setLoading(false);
                    onClose();
                })
                .catch((err) => {
                    throw err;
                });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', lg: 'xl' }}>
            <ModalOverlay />
            <ModalContent
                border="none"
                borderRadius="10px"
                minWidth={{
                    base: 'full',
                    lg: 'container.md',
                }}
            >
                <ModalHeader
                    border="none"
                    minHeight="200px"
                    borderTopRadius="10px"
                    backgroundImage={`
                    linear-gradient(180deg, rgba(12, 15, 23, 0) 67.85%, #0C0F17 100%),
                    linear-gradient(180deg, #0C0F17 0%, rgba(12, 15, 23, 0.8) 100%),
                    url(${bg}) `}
                >
                    <ModalCloseButton
                        padding="15px"
                        color="rgba(226, 76, 75, 1)"
                        border="2px solid rgba(226, 76, 75, 1)"
                        borderRadius="full"
                    />
                </ModalHeader>
                <ModalBody backgroundColor="#0C0F17" borderBottomRadius="10px" border="none">
                    <Center flexDirection="column" marginBlockStart="-120px">
                        <Avatar
                            src={user?.get('avatar') || User}
                            border="3px solid #DBF72C"
                            width="150px"
                            height="150px"
                        />
                        <Heading color="white" fontSize="40" fontFamily="Clash Display">
                            {user?.get('name')}
                        </Heading>
                        <Text
                            color="rgba(233, 229, 225, 1)"
                            fontFamily="Clash Display"
                            fontSize="18px"
                            opacity="0.5"
                        >
                            {user?.get('email')}
                        </Text>
                    </Center>
                    <Flex
                        marginTop="25px"
                        rowGap="30px"
                        flexDirection="column"
                        alignItems="stretch"
                    >
                        <FormControl isRequired label="Phone Number" id="Phone">
                            <Input
                                placeholder="Phone Number"
                                disabled={loading}
                                variant="filled"
                                height="45px"
                                fontWeight="regular"
                                transition="0.3s ease-in all"
                                defaultValue={data.phno}
                                fontSize="16px"
                                backgroundColor="rgba(255,255,255,0.15)"
                                textColor="white"
                                fontFamily="Clash Display"
                                border="none"
                                borderRadius="10px"
                                onChange={(e) => setData({ ...data, phno: e.target.value })}
                                _placeholder={{
                                    textColor: 'rgba(255, 255, 255, 0.25)',
                                }}
                                _focus={{
                                    boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                    border: '1px solid rgba(219, 247, 44, 0.15)',
                                }}
                                _hover={{
                                    backgroundColor: 'rgba(255,255,255,0.25)',
                                }}
                            />
                        </FormControl>
                        <Flex
                            flexDirection={{ base: 'column', lg: 'row' }}
                            columnGap="25px"
                            rowGap="25px"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormControl label="District" id="District">
                                <Select
                                    disabled={loading}
                                    name="district"
                                    variant="filled"
                                    backgroundColor="rgba(255,255,255,0.15)"
                                    iconColor="rgba(255,255,255,0.5)"
                                    height="45px"
                                    borderRadius="10px"
                                    fontWeight="regular"
                                    onChange={(e) => {
                                        setData({ ...data, district: e.target.value });
                                    }}
                                    transition="0.3s ease-in all"
                                    defaultValue={data.district}
                                    fontSize="16px"
                                    placeholder="Select District"
                                    fontFamily="Clash Display"
                                    _hover={{
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.15)',
                                    }}
                                    _focus={{
                                        border: '1px solid rgba(219, 247, 44, 0.15)',
                                    }}
                                >
                                    {districts.map((district) => (
                                        <option
                                            key={district.value}
                                            style={{
                                                padding: '10px',
                                                fontFamily: 'Clash Display',
                                                fontSize: '16px',
                                                fontWeight: 'regular',
                                            }}
                                            value={district.value}
                                        >
                                            {district.label}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>Please pick an District</FormErrorMessage>
                            </FormControl>
                            <FormControl label="Campus" id="campus">
                                <Select
                                    name="campus"
                                    variant="filled"
                                    disabled={loading}
                                    backgroundColor="rgba(255,255,255,0.15)"
                                    iconColor="rgba(255,255,255,0.5)"
                                    height="45px"
                                    fontWeight="regular"
                                    transition="0.3s ease-in all"
                                    borderRadius="10px"
                                    fontSize="16px"
                                    defaultValue={data.campus}
                                    placeholder="Select Campus"
                                    fontFamily="Clash Display"
                                    onChange={(e) => {
                                        const { campusId, campusName } = campuses.filter(
                                            (campus) => campus.campusName === e.target.value,
                                        )[0];
                                        setData({ ...data, campusId, campus: campusName });
                                    }}
                                    _hover={{
                                        backgroundColor: 'rgba(255,255,255,0.15)',
                                        boxShadow: '0px 2px 4px rgba(255, 255, 255, 0.15)',
                                    }}
                                    _focus={{
                                        border: '1px solid rgba(219, 247, 44, 0.15)',
                                    }}
                                >
                                    {campuses.map((campus) => (
                                        <option
                                            key={campus.campusId}
                                            style={{
                                                padding: '10px',
                                                fontFamily: 'Clash Display',
                                                fontSize: '16px',
                                                fontWeight: 'regular',
                                            }}
                                            value={campus.campusName}
                                        >
                                            {toTitleCase(campus.campusName)}
                                        </option>
                                    ))}
                                </Select>
                                <FormErrorMessage>Please pick an District</FormErrorMessage>
                            </FormControl>
                        </Flex>
                        <Box
                            display={error ? 'block' : 'none'}
                            backgroundColor="rgba(226,76,75,0.4)"
                            marginTop="-15px"
                            paddingInline="10px"
                            borderRadius="5px"
                            paddingBlock="5px"
                        >
                            <Text fontFamily="Clash Display" fontSize="12px" textColor="#E24C4B">
                                Please Enter a valid Mobile Number
                            </Text>
                        </Box>

                        <Center paddingBlockEnd="30px">
                            <Button
                                width="250px"
                                backgroundColor="rgba(256, 256, 256, 0.15)"
                                fontSize="18px"
                                fontWeight="medium"
                                textColor="rgba(255,255,255,0.5)"
                                height="45px"
                                transition=".5s all ease"
                                _hover={{
                                    boxShadow: '0px 8px 16px rgba(255, 255, 255, 0.15)',
                                    backgroundColor: '#DBF72C',
                                    textColor: '#0C0F17',
                                }}
                                _active={{
                                    textColor: '#DBF72C',
                                    background: 'rgba(219, 247, 44, 0.15)',
                                    boxShadow: '0px 8px 16px rgba(219, 247, 44, 0.15)',
                                    backdropFilter: 'blur(25px)',
                                }}
                                _focus={{
                                    border: '1px solid rgba(219, 247, 44, 0.15)',
                                }}
                                onClick={() => {
                                    updateProfile();
                                }}
                            >
                                Update Profile
                            </Button>
                        </Center>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
