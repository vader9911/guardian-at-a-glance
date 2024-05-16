import { useEffect, useState } from 'react';
import { Box, Heading, Text, Spinner, VStack } from '@chakra-ui/react';

export default function WeaponsPage() {
  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeapons() {
      try {
        const response = await fetch('/api/weapons');
        if (!response.ok) {
          throw new Error('Failed to fetch weapon data');
        }
        const data = await response.json();
        setWeapons(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeapons();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10} px={6}>
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Box py={10} px={6}>
      <Heading as="h1" mb={6}>
        Destiny 2 Weapons
      </Heading>
      <VStack spacing={4}>
        {weapons.map((weapon) => (
          <Box key={weapon.hash} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{weapon.displayProperties.name}</Heading>
            <Text mt={4}>{weapon.displayProperties.description}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
