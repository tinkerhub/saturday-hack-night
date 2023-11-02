import { Heading, VStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const signinTexts = [
  "Brace yourself, login sequence initiated",
  "Sit tight, we're logging you in faster than you can say 'binary'",
  "Grab a coffee, logging you in.",
  "Logging you in...",
  "Logging you in, just like you log in to your bank account",
  "Hackers, grab a Red Bull, logging you in",
];

const LoadingAnimation = () => {
  const router = useRouter();
  const signin = router.pathname === "/auth";
  const [text, setText] = useState("Loading ...");
  useEffect(() => {
    setText(signinTexts[Math.floor(Math.random() * signinTexts.length)]);
  }, []);
  return (
    <VStack
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#0C0F17"
    >
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Heading
          fontSize={{ base: "48px", lg: "100px" }}
          fontWeight="bold"
          fontFamily="Clash Display"
          textAlign="center"
          textColor="white"
        >
          SATURDAY
          <br />
          <span style={{ color: "#DBF72C" }}>HACKNIGHT</span>
        </Heading>
        <Text
          fontSize="18px"
          textAlign="center"
          textColor="white"
          fontFamily="Clash Display"
        >
          {signin
            ? text
            : `Logging you out, don't worry, we're not going to delete your account`}
        </Text>
      </motion.div>
    </VStack>
  );
};
export { LoadingAnimation };
