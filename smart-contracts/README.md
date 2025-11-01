# CertiChain Smart Contracts

Smart contracts for the CertiChain certificate verification platform.

## Contract Overview

The `CertiChain` contract implements a soulbound NFT system for certificate management with the following features:

- **Soulbound Tokens**: Certificates are non-transferable (cannot be sold or transferred)
- **Access Control**: Role-based permissions (Admin, Issuer)
- **Batch Minting**: Efficient gas usage for bulk certificate issuance
- **Revocation**: Ability to revoke certificates when needed
- **Public Verification**: Anyone can verify certificate authenticity

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `SEPOLIA_RPC_URL`: Alchemy or Infura RPC URL for Sepolia testnet
- `POLYGON_RPC_URL`: RPC URL for Polygon mainnet (optional)
- `PRIVATE_KEY`: Deployer wallet private key
- `ETHERSCAN_API_KEY`: For contract verification on Etherscan
- `POLYGONSCAN_API_KEY`: For contract verification on PolygonScan

### Compile Contracts

```bash
npm run compile
```

### Run Tests

```bash
npm run test
```

### Generate Coverage Report

```bash
npm run coverage
```

## Deployment

### Local Network

```bash
npx hardhat node
npm run deploy:local
```

### Sepolia Testnet

```bash
npm run deploy:sepolia
```

### Verify Contract

```bash
npm run verify <CONTRACT_ADDRESS>
```

## Contract Functions

### Issue Certificate

Issue a single certificate:

```solidity
function issueCertificate(
    address recipient,
    string calldata certificateType,
    string calldata tokenURI
) external onlyRole(ISSUER_ROLE) returns (uint256)
```

### Batch Issue Certificates

Issue multiple certificates at once (max 100):

```solidity
function batchIssueCertificates(
    address[] calldata recipients,
    string[] calldata certificateTypes,
    string[] calldata tokenURIs
) external onlyRole(ISSUER_ROLE) returns (uint256[] memory)
```

### Verify Certificate

Check if a certificate is valid:

```solidity
function verifyCertificate(uint256 tokenId) public view returns (bool)
```

### Revoke Certificate

Revoke a certificate:

```solidity
function revokeCertificate(uint256 tokenId) external
```

### Get Certificate

Get certificate details:

```solidity
function getCertificate(uint256 tokenId) public view returns (Certificate memory)
```

## Security Considerations

- All functions use access control
- Input validation on all external functions
- Reentrancy guards on state-changing functions
- Checks-effects-interactions pattern followed
- Custom errors for gas efficiency

## Testing

The test suite covers:
- Contract deployment
- Certificate issuance
- Batch issuance
- Certificate verification
- Revocation
- Soulbound functionality (transfer prevention)
- Access control

Run tests with:

```bash
npm run test
```

## License

MIT

