import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { wrap } from '@motionone/utils';
import { Box, Flex } from '@chakra-ui/react';

interface ParallaxProps {
    children: React.ReactNode;
    color: string;
}

const ParallaxView = ({ children, color }: ParallaxProps) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
    useEffect(() => {
        const unsubscribe = scrollY.onChange((v) => {
            baseX.set(v * 0.01);
        });
        return () => unsubscribe();
    });
    return (
        <Flex
            overflow="hidden"
            background={color}
            overflowX="hidden"
            width="100vw"
            alignItems="center"
            flexWrap="nowrap"
        >
            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    whiteSpace: 'nowrap',
                    columnGap: '25px',
                    flexWrap: 'nowrap',
                    x,
                }}
            >
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
                <Box as="span"> {children} </Box>
            </motion.div>
        </Flex>
    );
};

export default ParallaxView;
