import axios from 'axios';

const PINATA_API_URL = 'https://api.pinata.cloud';
const PINATA_API_KEY = process.env.PINATA_API_KEY!;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY!;

export async function uploadImageToIPFS(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await axios.post(
    `${PINATA_API_URL}/pinning/pinFileToIPFS`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    }
  );
  
  return response.data.IpfsHash;
}

export async function uploadMetadataToIPFS(metadata: object): Promise<string> {
  const response = await axios.post(
    `${PINATA_API_URL}/pinning/pinJSONToIPFS`,
    metadata,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
    }
  );
  
  return response.data.IpfsHash;
}
