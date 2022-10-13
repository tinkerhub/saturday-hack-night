import React from 'react';
import { motion } from 'framer-motion';
import { Flex } from '@chakra-ui/react';

interface ParallaxProps {
    text: string;
    duration: number;
}

const ParallaxView = ({ text, duration }: ParallaxProps) => {
    const marqueeVariants = {
        animate: {
            x: ['-100vw', '100vw'],
            transition: {
                x: {
                    duration,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatType: 'loop',
                },
            },
        },
    };
    return (
        <Flex overflow="hidden" width="100vw" alignItems="center" flexWrap="nowrap" zIndex="1">
            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    whiteSpace: 'nowrap',
                    columnGap: '25px',
                    flexWrap: 'nowrap',
                    color: 'white',
                    x: '-200vw',
                    fontFamily: 'Clash Display',
                    fontWeight: 'bold',
                    fontSize: '80px',
                }}
                animate="animate"
                variants={marqueeVariants}
            >
                {`${text} `}
            </motion.div>
        </Flex>
    );
};

export default ParallaxView;
