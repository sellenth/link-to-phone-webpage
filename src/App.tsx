import { Box, Center, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import SignUp from './SignUp';

function App() {
  return (
    <Center minH="100%" mx={{ "sm": "5%", "lg": "30%" }}>
      <Grid>
        <GridItem>
          <Heading fontSize={{ "base": "4xl", "lg": "6xl" }}>
            Link-To-Phone
          </Heading>
        </GridItem>
        <GridItem>
          <Box borderY="7px solid limegreen" p="1%" fontSize={{ "sm": "xl", "md": "2xl" }}>
            <Text mb="1em">
              <strong>Brief: </strong> Use your browser to text data to your phone with a couple of clicks.
            </Text>
            <Text mb="1em">
              <strong>Motivation:</strong> Sometimes you find yourself reading an article or watching a video on your computer and want to continue viewing it on your phone.
              There are many ways to do that, such as copying the link and emailing it to yourself or
              checking your watch history on YouTube from the mobile app. These methods work but aren't very elegant. First-party solutions such as iMessage on desktop
              offer a better experience but are coupled to specific platforms.
            </Text>
            <SignUp></SignUp>
          </Box>
        </GridItem>
      </Grid>
    </Center>
  );
}

export default App;
