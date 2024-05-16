export default async function handler(req, res) {
    try {
      const response = await fetch('https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/', {
        headers: {
          'X-API-Key': process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch weapon data');
      }
  
      const data = await response.json();
      const weapons = Object.values(data.Response).filter(item => item.itemType === 3); // Filtering weapon items
  
      res.status(200).json(weapons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }