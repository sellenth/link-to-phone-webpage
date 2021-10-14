import { Box, Center, Button, Link, Text, InputGroup, InputLeftAddon, Input, InputRightElement, Divider, HStack } from '@chakra-ui/react';
import React, { ReactEventHandler } from 'react';

const signUpButtonShown = false;

function SignUp() {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const handlePhoneChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
            if (phoneNumber.length < 10) {
                setPhoneNumber(phoneNumber + e.key)
            }
        } else if (e.key === "Backspace") {
            setPhoneNumber(phoneNumber.substr(0, phoneNumber.length - 1))
        }
    }

    const formatPhoneNumber = (phoneNumber: string): string => {
        return `${phoneNumber}`
    }


    function showFields() {
        console.log('nice')
    }

    return (
        <Center flexDir="column" my="2em">
            <Box position="absolute" visibility={signUpButtonShown ? 'visible' : 'hidden'}>
                <Button size="lg" p="10px 10%" color="white" backgroundColor="limegreen" onClick={showFields}>Create Account</Button>
                <Text fontSize="medium"><em>Or click <Link textDecoration="underline">here</Link> to learn more.</em></Text>
            </Box>
            <Box visibility={signUpButtonShown ? 'hidden' : 'visible'} >
                <InputGroup mb="5px">
                    <InputLeftAddon children="+1" />
                    <Input type="tel" placeholder="phone number" value={formatPhoneNumber(phoneNumber)} onKeyDown={handlePhoneChange} />
                </InputGroup>
                <InputGroup>
                    <Input
                        type="password"
                        placeholder="Enter password"
                    />
                </InputGroup>
            </Box>
        </Center>
    );
}

export default SignUp;
