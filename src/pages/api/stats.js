export default async function handler(req, res) {
    const { membershipType, destinyMembershipId, characterId } = req.query;
  
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/`, {
      headers: {
        "X-API-Key": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
      },
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
  
    res.status(200).json(data);
  }
  