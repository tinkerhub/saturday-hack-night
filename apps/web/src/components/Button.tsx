import { Button as CButton, Box } from '@chakra-ui/react';
import React from 'react';

const Button = ({ label, marginBlockStart, onClick }: ButtonProps) => (
    <Box paddingBlockStart={marginBlockStart}>
        <CButton
            variant="solid"
            borderRadius="11"
            padding="7"
            background="#E2DAD4"
            border="solid 1px #2A1437"
            color="#2A1437"
            size="lg"
            onClick={onClick}
            _hover={{
                background: '#2A1437',
                color: '#E2DAD4',
                border: 'solid 1px #E2DAD4',
            }}
        >
            {label}
        </CButton>
    </Box>
);
export default Button;

export interface ButtonProps {
    label: string;
    marginBlockStart?: string;
    onClick?: () => void;
}
