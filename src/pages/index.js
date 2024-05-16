// pages/index.js
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button, Box, Text } from '@chakra-ui/react';
import UserStats from '@components/UserStats'; // Ensure the path matches your jsconfig.json

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <Box textAlign="center" py={10} px={6}>
      {status === 'unauthenticated' ? (
        <Button colorScheme="teal" onClick={() => signIn('bungie')}>
          Sign in with Bungie
        </Button>
      ) : (
        <Box>
          <Button colorScheme="teal" onClick={() => signOut()}>
            Sign out
          </Button>
          <Text mt={4}>Signed in as {session?.user?.name}</Text>
          <UserStats />
        </Box>
      )}
    </Box>
  );
}
