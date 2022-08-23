import React, { useRef } from 'react';
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import { Box, Flex } from '@chakra-ui/react';

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

const ParallaxView = ({ children, baseVelocity = 100 }: ParallaxProps) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    const prevT = useRef<number>(0);
    useAnimationFrame((t) => {
        if (!prevT.current) prevT.current = t;

        const timeDelta = t - prevT.current;
        let moveBy = directionFactor.current * baseVelocity * (timeDelta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);

        prevT.current = t;
    });

    return (
        <Flex
            overflow="hidden"
            background="#3C1F4E"
            overflowX="hidden"
            width={{ base: '98vw', '2xl': '1366px' }}
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
            </motion.div>
        </Flex>
    );
};

export default ParallaxView;
