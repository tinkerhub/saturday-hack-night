import { Button as CButton, Box } from '@chakra-ui/react';
import React from 'react';

const Button = ({ label, marginBlockStart, onClick }: ButtonProps) => (
    <Box paddingBlockStart={marginBlockStart}>
        <CButton
            variant="solid"
            borderRadius="8px"
            paddingInline="64px"
            paddingBlock="24px"
            background="#F9D857"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.4)"
            size="lg"
            transition=".3s"
            onClick={onClick}
            _hover={{
                borderRadius: '16px',
                background: '#F9D857',
                boxShadow: '4px 4px rgba(0, 0, 0, 1)',
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
