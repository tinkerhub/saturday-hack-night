import React from 'react';
import {
    Flex,
    FormControl,
    FormLabel,
    Image,
    Input,
    InputGroup,
    InputRightAddon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface MemberProps {
    loading: boolean;
}

const Member = ({ loading }: MemberProps) => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'members.',
    });

    return (
        <VStack>
            <FormControl>
                <FormLabel color="white">Team Members</FormLabel>

                {fields.map((member: any, index: number) => (
                    <Controller
                        name={`members[${index}]`}
                        key={member.id}
                        control={control}
                        render={({ field }) => (
                            <InputGroup key={member[0]} width="325px" marginBottom="20px">
                                <Input
                                    disabled={loading}
                                    ref={field.ref}
                                    placeholder="Github Username"
                                    size="lg"
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    name={`members.${index}.value`}
                                    value={field.value}
                                    _focus={{
                                        boxShadow: '0px 3px 8px rgba(219, 247, 44, 0.15)',
                                        border: '1px solid #E9E5E1',
                                    }}
                                    _placeholder={{
                                        textColor: 'rgba(255, 255, 255, 0.25)',
                                    }}
                                    backgroundColor="rgba(255, 255, 255, 0.25)"
                                    textColor="white"
                                    border="none"
                                    borderRadius="10px"
                                />
                                <InputRightAddon
                                    border="none"
                                    textColor="#E24C4B"
                                    fontFamily="Clash Display"
                                    backgroundColor="rgba(255,255,255,0.25)"
                                    fontWeight="bold"
                                    height="48px"
                                    width="auto"
                                    onClick={() => {
                                        remove(index);
                                    }}
                                >
                                    Remove
                                </InputRightAddon>
                            </InputGroup>
                        )}
                    />
                ))}
            </FormControl>

            {fields.length < 3 && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    paddingInline="20px"
                    paddingBlock="5px"
                    columnGap="10px"
                    width="325px"
                    border="1px solid rgba(219, 247, 44, 0.15)"
                    borderRadius="10px"
                    transition="all 0.2s ease-in-out"
                    background="rgba(219, 247, 44, 0.15)"
                    onClick={() => {
                        append('');
                    }}
                    _hover={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: '1px dashed #DBF72C',
                    }}
                >
                    <Image height="40px" width="40px" src="/images/add-square.svg" alt="add" />
                    <Text
                        fontFamily="Clash Display"
                        textColor="#DBF72C"
                        fontSize="14px"
                        fontWeight="medium"
                    >
                        ADD TEAM MEMBER
                    </Text>
                </Flex>
            )}
        </VStack>
    );
};

export { Member };
