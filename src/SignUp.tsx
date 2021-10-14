import { Box, Center, Button, Link, Text, InputGroup, InputLeftAddon, Input, useToast } from '@chakra-ui/react';
import React from 'react';

function SignUp() {
    const toast = useToast();
    const [showSignupControls, setShowSignupControls] = React.useState(false)
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handlePhoneChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.charCodeAt(0) >= 48 && e.key.charCodeAt(0) <= 57) {
            if (phoneNumber.length < 10) {
                setPhoneNumber(phoneNumber + e.key)
            }
        } else if (e.key === "Backspace" || e.key === "Delete") {
            setPhoneNumber(phoneNumber.substr(0, phoneNumber.length - 1))
        }
    }

    const formatPhoneNumber = (phoneNumber: string): string => {
        if (phoneNumber.length >= 6) {
            return `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6)}`
        }
        else if (phoneNumber.length >= 3) {
            return `(${phoneNumber.substr(0, 3)}) ${phoneNumber.substr(3)}`
        } else {
            return `${phoneNumber}`
        }
    }

    const performNetworkCall = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber: `+1${phoneNumber}`, password: password })
        };
        fetch(process.env.NODE_ENV === "development" ?
            'http://localhost:3001/create-user' :
            'https://www.link-to-phone.com/create-user', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    return Promise.reject();
                } else {
                    toast({
                        title: "Success",
                        description: "Your account has been created, expect a text message from us shortly.",
                        status: "success",
                        duration: 5000,
                        isClosable: true
                    })
                }
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "Something went wrong, maybe a user already exists with that phone number",
                    status: "error",
                    duration: 5000,
                    isClosable: true
                })
            })
            .finally(() => {setIsProcessing(false)});

    }

    const submitCredentials = () => {
        if (phoneNumber.length < 10 || password.length < 5) {
            let toastMsg = ''
            toastMsg += "Please enter a valid 10 digit US phone number and a password 5+ characters long"
            toast({
                title: "Error",
                description: toastMsg,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        } else {
            setIsProcessing(true);
            performNetworkCall();
        }
    }

    return (
        <Center flexDir="column" my="2em">
            <Box position="absolute" visibility={showSignupControls ? 'hidden' : 'visible'}>
                <Button w="100%" size="lg" p="10px 10%" color="white" backgroundColor="limegreen" onClick={() => {setShowSignupControls(true)}}>Create Account</Button>
                <Text fontSize="medium"><em>Or click <Link href="https://www.github.com/sellenth/link-to-phone" textDecoration="underline">here</Link> to learn more.</em></Text>
            </Box>
            <Box visibility={showSignupControls ? 'visible' : 'hidden'} >
                <InputGroup mb="5px">
                    <InputLeftAddon children="+1" />
                    <Input focusBorderColor="limegreen" type="tel"
                        placeholder="phone number" value={formatPhoneNumber(phoneNumber)}
                        onChange={() => {/*Satisfy React*/ }} onKeyDown={handlePhoneChange} />
                </InputGroup>
                <InputGroup mb="5px">
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        maxlength="25"
                        focusBorderColor="limegreen"
                        type="password"
                        placeholder="Enter password"
                    />
                </InputGroup>
                <Center>
                    <Button size="lg" p="10px 10%" color="white" backgroundColor="limegreen" onClick={submitCredentials} isLoading={isProcessing}>Submit</Button>
                </Center>
            </Box>
        </Center>
    );
}

export default SignUp;
