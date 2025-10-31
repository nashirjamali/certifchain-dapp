# 🤖 CertiChain - Cursor AI Integration Guide

## Purpose
This document provides complete project context for Cursor AI to assist you in implementing the CertiChain platform. All technical decisions, architecture choices, and implementation details are documented here for seamless AI-assisted development.

---

## 📋 Project Overview

### What is CertiChain?
A Web 2.5 decentralized certificate platform that combines:
- **Blockchain**: Immutable proof of certificate issuance (Ethereum/Polygon)
- **IPFS**: Decentralized metadata storage
- **Traditional Backend**: Fast queries, email notifications, PDF generation
- **Modern Frontend**: Next.js 14 with Web3 integration

### Core Philosophy: Hybrid Architecture (Web 2.5)
```
NOT Pure Web3: Would be too expensive and slow
NOT Pure Web2: Would lose blockchain benefits
✓ HYBRID: Best of both worlds
```

**Blockchain Layer** (Source of Truth):
- Certificate ownership (Soulbound NFT)
- Issuance proof & timestamps
- Revocation status
- IPFS hash pointers

**Backend + Database** (Performance & UX):
- Fast queries & search
- Personal data (GDPR compliant)
- Email notifications
- PDF generation
- Analytics

---

## 🎯 Key Technical Decisions

### 1. Why Hybrid Architecture?

**Problem with Full On-Chain:**
```solidity
// Storing strings on-chain is EXPENSIVE
struct Certificate {
    string recipientName;      // ~20,000 gas per character
    string recipientEmail;     // ~20,000 gas per character
    string description;        // ~20,000 gas per character
}
// Cost: $30+ per certificate ❌
```

**Solution with Hybrid:**
```solidity
struct Certificate {
    uint256 tokenId;        // Fixed gas
    address recipient;      // Fixed gas
    address issuer;         // Fixed gas
    string tokenURI;        // IPFS hash only (~50 chars)
    uint256 issuedAt;      // Fixed gas
    bool isRevoked;        // Fixed gas
}
// Cost: ~$0.50 per certificate ✅
```

### 2. Authentication Strategy

**Support BOTH authentication methods:**

**Option A: Social Login (Web3Auth)** - For regular users
- Login with email/Google
- Auto-generate Ethereum wallet (invisible to user)
- Wallet managed by Web3Auth (MPC key management)
- Best UX for mass adoption

**Option B: Direct Wallet Connection** - For crypto users
- MetaMask / WalletConnect
- User brings their own wallet
- Full decentralization

### 3. Data Storage Strategy

**ON-CHAIN (Ethereum/Polygon):**
```javascript
- Certificate ownership (NFT)
- Issuance timestamp
- Revocation status
- Issuer & recipient addresses
- IPFS metadata hash
- Optional: Data hash for verification
```

**OFF-CHAIN (IPFS via Pinata):**
```javascript
- Certificate metadata (JSON)
- Certificate images
- Large text content
```

**OFF-CHAIN (PostgreSQL Database):**
```javascript
- Personal Identifiable Information (PII)
- Email addresses
- Search indexes
- Analytics data
- Verification logs
- Email notification status
```

---

## 🏗️ Tech Stack

### Smart Contract
```yaml
Language: Solidity ^0.8.20
Framework: Hardhat
Libraries: 
  - @openzeppelin/contracts (ERC721, AccessControl)
Network: Ethereum Sepolia (testnet) → Mainnet/Polygon
Gas Optimization: Batch minting, minimal storage
```

### Frontend
```yaml
Framework: Next.js 14 (App Router)
Language: TypeScript
Styling: TailwindCSS + shadcn/ui
Web3: 
  - ethers.js v6
  - wagmi v2
  - @rainbow-me/rainbowkit
  - @web3auth/modal (for social login)
State Management: React Query (TanStack Query)
Forms: react-hook-form + zod
```

### Backend
```yaml
API: Next.js API Routes
Database: PostgreSQL
ORM: Prisma
Authentication: NextAuth.js + Web3Auth
Email: Resend
File Storage: IPFS (Pinata)
PDF Generation: PDFKit or @react-pdf/renderer
```

### Infrastructure
```yaml
Blockchain RPC: Alchemy
IPFS: Pinata
Hosting: Vercel
Database: Vercel Postgres or Railway
Monitoring: Sentry (optional)
Analytics: Vercel Analytics (optional)
```

---

## 📁 Project Structure

```
certichain/
├── smart-contracts/
│   ├── contracts/
│   │   └── CertiChain.sol           # Main smart contract
│   ├── test/
│   │   └── CertiChain.test.ts       # Contract tests
│   ├── scripts/
│   │   └── deploy.ts                # Deployment script
│   ├── hardhat.config.ts
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/                     # Next.js App Router
    │   │   ├── page.tsx             # Landing page
    │   │   ├── layout.tsx           # Root layout
    │   │   ├── providers.tsx        # Web3 providers
    │   │   │
    │   │   ├── institution/
    │   │   │   ├── dashboard/
    │   │   │   ├── issue/
    │   │   │   └── batch-issue/
    │   │   │
    │   │   ├── verify/
    │   │   │   └── [tokenId]/       # Public verification
    │   │   │
    │   │   ├── certificate/
    │   │   │   └── [tokenId]/       # Certificate detail
    │   │   │
    │   │   └── api/                 # API Routes
    │   │       ├── auth/
    │   │       ├── certificates/
    │   │       ├── ipfs/
    │   │       └── email/
    │   │
    │   ├── components/
    │   │   ├── layout/
    │   │   ├── certificate/
    │   │   ├── verification/
    │   │   ├── auth/
    │   │   └── ui/                  # shadcn/ui components
    │   │
    │   ├── lib/
    │   │   ├── contracts/
    │   │   │   └── certichain.ts    # ABI & address
    │   │   ├── ipfs/
    │   │   │   └── pinata.ts        # IPFS functions
    │   │   ├── db/
    │   │   │   └── prisma.ts        # Prisma client
    │   │   ├── email/
    │   │   │   └── templates.tsx    # Email templates
    │   │   └── web3auth/
    │   │       └── config.ts        # Web3Auth config
    │   │
    │   ├── hooks/
    │   │   ├── useCertificateContract.ts
    │   │   ├── useWeb3Auth.ts
    │   │   └── useIPFS.ts
    │   │
    │   └── types/
    │       ├── certificate.ts
    │       ├── contract.ts
    │       └── user.ts
    │
    ├── prisma/
    │   └── schema.prisma            # Database schema
    │
    ├── public/
    ├── .env.local
    ├── .env.example
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
```

---

## 🔐 Smart Contract Architecture

### Contract: CertiChain.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title CertiChain
 * @dev Soulbound NFT Certificate System
 * 
 * Key Features:
 * - Non-transferable certificates (Soulbound)
 * - Role-based access control (Admin, Issuer)
 * - Batch minting for gas efficiency
 * - Revocation mechanism
 * - Public verification
 */
contract CertiChain is ERC721, ERC721URIStorage, AccessControl {
    // Roles
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    
    // Certificate data structure
    struct Certificate {
        uint256 tokenId;
        address recipient;
        address issuer;
        string certificateType;
        uint256 issuedAt;
        bool isRevoked;
    }
    
    // State variables
    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) public recipientCertificates;
    mapping(address => uint256[]) public issuerCertificates;
    
    // Main functions
    function issueCertificate(...) external onlyRole(ISSUER_ROLE) returns (uint256);
    function batchIssueCertificates(...) external onlyRole(ISSUER_ROLE) returns (uint256[]);
    function revokeCertificate(uint256 tokenId) external;
    function verifyCertificate(uint256 tokenId) public view returns (bool);
    function getCertificate(uint256 tokenId) public view returns (Certificate memory);
    
    // Soulbound: Override transfer functions to prevent transfers
    function _beforeTokenTransfer(...) internal override {
        require(from == address(0) || to == address(0), "Soulbound: Transfer not allowed");
    }
}
```

**Important Implementation Details:**

1. **Soulbound Mechanism**: Certificates cannot be transferred
   - Override `_beforeTokenTransfer` to allow only mint/burn
   - Disable `approve()` and `setApprovalForAll()`

2. **Gas Optimization**:
   - Batch minting supports up to 100 certificates
   - Use memory instead of storage in loops
   - Minimal on-chain data storage

3. **Access Control**:
   - `DEFAULT_ADMIN_ROLE`: Platform administrator
   - `ISSUER_ROLE`: Verified institutions

4. **Events**:
   ```solidity
   event CertificateIssued(uint256 indexed tokenId, address indexed recipient, ...);
   event CertificateRevoked(uint256 indexed tokenId, address indexed revokedBy);
   ```

---

## 🗄️ Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  walletAddress String?  @unique
  role          Role     @default(RECIPIENT)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  institution   Institution?
  certificates  Certificate[] @relation("RecipientCertificates")
}

enum Role {
  ADMIN
  INSTITUTION
  RECIPIENT
}

model Institution {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  institutionName   String
  institutionType   String?
  logo              String?
  website           String?
  walletAddress     String   @unique
  isVerified        Boolean  @default(false)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  certificates      Certificate[]
}

model Certificate {
  id                  String   @id @default(cuid())
  tokenId             BigInt   @unique
  institutionId       String
  institution         Institution @relation(fields: [institutionId], references: [id])
  recipientName       String
  recipientEmail      String
  recipientWallet     String?
  recipientUser       User?    @relation("RecipientCertificates", fields: [recipientWallet], references: [walletAddress])
  certificateType     String
  description         String?
  issueDate           DateTime
  ipfsHash            String
  ipfsImageHash       String?
  transactionHash     String
  blockchainNetwork   String   @default("sepolia")
  isRevoked           Boolean  @default(false)
  revokedAt           DateTime?
  revokedReason       String?
  viewCount           Int      @default(0)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  
  verificationLogs    VerificationLog[]
  emailNotifications  EmailNotification[]
  
  @@index([tokenId])
  @@index([recipientEmail])
  @@index([recipientWallet])
  @@index([institutionId])
}

model VerificationLog {
  id              String   @id @default(cuid())
  certificateId   String
  certificate     Certificate @relation(fields: [certificateId], references: [id])
  verifierIp      String?
  verifierLocation String?
  userAgent       String?
  verifiedAt      DateTime @default(now())
  
  @@index([certificateId])
  @@index([verifiedAt])
}

model EmailNotification {
  id              String   @id @default(cuid())
  certificateId   String
  certificate     Certificate @relation(fields: [certificateId], references: [id])
  recipientEmail  String
  emailType       String
  sentAt          DateTime?
  status          String   @default("pending")
  errorMessage    String?
  createdAt       DateTime @default(now())
}
```

**Key Design Decisions:**

1. **Separate User & Institution**: Institutions are special users
2. **Flexible recipient**: Can link to User if they login, otherwise just email
3. **Verification logs**: Track who verifies certificates (analytics)
4. **Email tracking**: Monitor notification delivery
5. **Indexes**: Optimize common queries

---

## 🌐 Frontend Architecture

### Web3 Integration

**1. Wagmi Configuration** (`lib/wagmi.ts`):
```typescript
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'CertiChain',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [sepolia, polygon],
  ssr: true,
});
```

**2. Web3Auth Configuration** (`lib/web3auth/config.ts`):
```typescript
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";

export const web3auth = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: "sapphire_mainnet",
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7", // Sepolia
    rpcTarget: process.env.NEXT_PUBLIC_RPC_URL!,
  },
});
```

**3. Contract Integration** (`lib/contracts/certichain.ts`):
```typescript
export const CERTICHAIN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const CERTICHAIN_ABI = [
  // Full ABI from artifacts/contracts/CertiChain.sol/CertiChain.json
  {
    "inputs": [
      {"internalType": "address", "name": "recipient", "type": "address"},
      {"internalType": "string", "name": "certificateType", "type": "string"},
      {"internalType": "string", "name": "tokenURI", "type": "string"}
    ],
    "name": "issueCertificate",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ... rest of ABI
] as const;
```

**4. Custom Hook** (`hooks/useCertificateContract.ts`):
```typescript
import { useWriteContract, useReadContract } from 'wagmi';
import { CERTICHAIN_ABI, CERTICHAIN_ADDRESS } from '@/lib/contracts/certichain';

export function useCertificateContract() {
  const { writeContractAsync, isPending } = useWriteContract();

  const issueCertificate = async (
    recipient: string,
    certificateType: string,
    tokenURI: string
  ) => {
    return await writeContractAsync({
      address: CERTICHAIN_ADDRESS,
      abi: CERTICHAIN_ABI,
      functionName: 'issueCertificate',
      args: [recipient, certificateType, tokenURI],
    });
  };

  const verifyCertificate = (tokenId: bigint) => {
    const { data, isLoading } = useReadContract({
      address: CERTICHAIN_ADDRESS,
      abi: CERTICHAIN_ABI,
      functionName: 'verifyCertificate',
      args: [tokenId],
    });
    return { isValid: data, isLoading };
  };

  return { issueCertificate, verifyCertificate, isPending };
}
```

### IPFS Integration (`lib/ipfs/pinata.ts`)

```typescript
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
```

---

## 🔄 Core User Flows

### Flow 1: Institution Issues Certificate

```typescript
/**
 * Complete flow for issuing a certificate
 * 
 * Steps:
 * 1. User fills form (recipient info, certificate details)
 * 2. Upload certificate image to IPFS
 * 3. Create metadata JSON
 * 4. Upload metadata to IPFS
 * 5. Call smart contract (mint NFT)
 * 6. Save to database
 * 7. Send email notification
 */

async function issueCertificateFlow(formData: FormData) {
  // Step 1: Upload image to IPFS
  const imageHash = await uploadImageToIPFS(formData.certificateImage);
  
  // Step 2: Create metadata
  const metadata = {
    name: `Certificate - ${formData.certificateType}`,
    description: formData.description,
    image: `ipfs://${imageHash}`,
    attributes: [
      { trait_type: "Recipient Name", value: formData.recipientName },
      { trait_type: "Certificate Type", value: formData.certificateType },
      { trait_type: "Issue Date", value: formData.issueDate },
    ],
  };
  
  // Step 3: Upload metadata to IPFS
  const metadataHash = await uploadMetadataToIPFS(metadata);
  const tokenURI = `ipfs://${metadataHash}`;
  
  // Step 4: Issue on blockchain
  const tx = await issueCertificate(
    formData.recipientWallet,
    formData.certificateType,
    tokenURI
  );
  
  // Step 5: Wait for transaction
  const receipt = await tx.wait();
  const tokenId = receipt.logs[0].args.tokenId;
  
  // Step 6: Save to database
  await fetch('/api/certificates/issue', {
    method: 'POST',
    body: JSON.stringify({
      tokenId,
      ...formData,
      ipfsHash: metadataHash,
      transactionHash: tx.hash,
    }),
  });
  
  // Step 7: Email notification happens in API route
  
  return { success: true, tokenId, transactionHash: tx.hash };
}
```

### Flow 2: Public Verification

```typescript
/**
 * Anyone can verify a certificate without authentication
 * 
 * Steps:
 * 1. Fetch certificate from database (fast)
 * 2. Verify on blockchain (source of truth)
 * 3. Log verification event
 * 4. Display results
 */

async function verifyCertificateFlow(tokenId: number) {
  // Step 1: Get from database (fast, includes all details)
  const response = await fetch(`/api/certificates/verify/${tokenId}`);
  const { certificate, blockchain } = await response.json();
  
  // Step 2: Direct blockchain verification (optional, for paranoid users)
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contract = new ethers.Contract(ADDRESS, ABI, provider);
  const onChainValid = await contract.verifyCertificate(tokenId);
  
  // Step 3: Compare results
  if (certificate.isRevoked !== !onChainValid) {
    console.warn("Database and blockchain mismatch!");
    // Blockchain is source of truth
    return { valid: onChainValid, source: 'blockchain' };
  }
  
  return {
    valid: onChainValid,
    certificate,
    blockchain,
    verifiedAt: new Date(),
  };
}
```

### Flow 3: Web3Auth Login + Certificate Claiming

```typescript
/**
 * User logs in with email and can claim certificates
 * 
 * Steps:
 * 1. User logs in with email/Google (Web3Auth)
 * 2. Web3Auth generates wallet automatically
 * 3. Check for pending certificates (by email)
 * 4. Allow user to claim certificates to their wallet
 */

async function loginAndClaimFlow(loginMethod: 'google' | 'email') {
  // Step 1: Login with Web3Auth
  const provider = await web3auth.connect({ loginProvider: loginMethod });
  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  const walletAddress = await signer.getAddress();
  
  // Step 2: Get user info
  const userInfo = await web3auth.getUserInfo();
  
  // Step 3: Save/update user in database
  await fetch('/api/auth/web3auth', {
    method: 'POST',
    body: JSON.stringify({
      email: userInfo.email,
      name: userInfo.name,
      walletAddress,
    }),
  });
  
  // Step 4: Check for pending certificates
  const response = await fetch(`/api/certificates/pending?email=${userInfo.email}`);
  const { pendingCertificates } = await response.json();
  
  if (pendingCertificates.length > 0) {
    // Show notification: "You have X certificates waiting!"
    // User can claim them to their wallet
  }
  
  return { walletAddress, email: userInfo.email, pendingCertificates };
}
```

---

## 🔑 Environment Variables

### Smart Contract (.env)
```bash
# RPC URLs
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# Deployment
PRIVATE_KEY=your_deployer_wallet_private_key_here

# Verification
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### Frontend (.env.local)
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/certichain"

# Blockchain
NEXT_PUBLIC_CONTRACT_ADDRESS="0x..." # Deployed contract address
NEXT_PUBLIC_CHAIN_ID="11155111" # Sepolia = 11155111, Mainnet = 1
RPC_URL="https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"

# IPFS (Pinata)
PINATA_API_KEY="your_pinata_api_key"
PINATA_SECRET_KEY="your_pinata_secret_key"

# Email (Resend)
RESEND_API_KEY="re_your_resend_api_key"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_with_openssl_rand_base64_32"

# Web3Auth
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID="your_web3auth_client_id"

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**How to Get Keys:**

1. **Alchemy RPC**: https://www.alchemy.com/ (free tier)
2. **Pinata**: https://www.pinata.cloud/ (free tier)
3. **Web3Auth**: https://dashboard.web3auth.io/ (free tier)
4. **WalletConnect**: https://cloud.walletconnect.com/ (free)
5. **Resend**: https://resend.com/ (free tier)
6. **Etherscan API**: https://etherscan.io/apis (free)

---

## 📝 IPFS Metadata Standard

### Structure
```json
{
  "name": "Certificate of Completion - Web3 Development",
  "description": "This certificate is awarded to John Doe for successfully completing the Web3 Development course",
  "image": "ipfs://QmImageHash...",
  "external_url": "https://certichain.app/certificate/123",
  "attributes": [
    {
      "trait_type": "Recipient Name",
      "value": "John Doe"
    },
    {
      "trait_type": "Recipient Email",
      "value": "john@example.com"
    },
    {
      "trait_type": "Institution",
      "value": "Tech Academy Indonesia"
    },
    {
      "trait_type": "Certificate Type",
      "value": "Course Completion"
    },
    {
      "trait_type": "Issue Date",
      "value": "2025-01-15",
      "display_type": "date"
    },
    {
      "trait_type": "Course Duration",
      "value": "12 weeks"
    }
  ]
}
```

**Important:**
- Follow ERC-721 metadata standard
- Use `ipfs://` URLs (not https gateway)
- Include all relevant certificate details in attributes
- Keep JSON size reasonable (<100KB)

---

## 🧪 Testing Strategy

### Smart Contract Tests (Hardhat)

```typescript
// test/CertiChain.test.ts
import { expect } from "chai";
import { ethers } from "hardhat";

describe("CertiChain", function () {
  // Test categories:
  
  describe("Deployment", function () {
    // - Correct owner
    // - Initial roles
  });
  
  describe("Certificate Issuance", function () {
    // - Single issuance
    // - Batch issuance
    // - Invalid inputs (should revert)
    // - Unauthorized access (should revert)
    // - Event emission
  });
  
  describe("Certificate Revocation", function () {
    // - Revoke by issuer
    // - Revoke by admin
    // - Unauthorized revoke (should revert)
    // - Already revoked (should revert)
  });
  
  describe("Certificate Verification", function () {
    // - Valid certificate
    // - Revoked certificate
    // - Non-existent certificate
  });
  
  describe("Soulbound Functionality", function () {
    // - Transfer should fail
    // - Approve should fail
    // - SetApprovalForAll should fail
  });
  
  describe("Access Control", function () {
    // - Add issuer (admin only)
    // - Remove issuer (admin only)
    // - Unauthorized role management
  });
  
  describe("Gas Optimization", function () {
    // - Measure gas for operations
    // - Compare batch vs individual
  });
});
```

**Run tests:**
```bash
npx hardhat test
npx hardhat coverage # Code coverage
```

### Frontend Tests

**Component Tests** (Jest + React Testing Library):
```typescript
// __tests__/components/CertificateCard.test.tsx
import { render, screen } from '@testing-library/react';
import { CertificateCard } from '@/components/CertificateCard';

test('renders certificate information', () => {
  render(<CertificateCard {...mockProps} />);
  expect(screen.getByText('Course Completion')).toBeInTheDocument();
});
```

**E2E Tests** (Playwright):
```typescript
// e2e/issue-certificate.spec.ts
test('complete certificate issuance flow', async ({ page }) => {
  await page.goto('/institution/issue');
  await page.fill('[name="recipientName"]', 'John Doe');
  // ... fill form
  await page.click('button[type="submit"]');
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## 🚀 Deployment Guide

### Smart Contract Deployment

```bash
# 1. Compile
npx hardhat compile

# 2. Test
npx hardhat test
npx hardhat coverage

# 3. Deploy to Sepolia testnet
npx hardhat run scripts/deploy.ts --network sepolia

# 4. Verify on Etherscan
npx hardhat verify --network sepolia DEPLOYED_ADDRESS

# 5. Save contract address
# Add to frontend/.env.local: NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### Frontend Deployment (Vercel)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel --prod

# 4. Configure environment variables in Vercel dashboard
```

**Vercel Setup:**
1. Connect GitHub repository
2. Set environment variables
3. Configure build settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Enable Vercel Postgres (optional)

---

## 🔒 Security Considerations

### 1. Smart Contract Security

```solidity
// ✅ Access Control
- Use OpenZeppelin's AccessControl
- Only ISSUER_ROLE can mint
- Only issuer or admin can revoke

// ✅ Input Validation
- Validate addresses (non-zero)
- Validate string lengths
- Check array bounds

// ✅ Reentrancy Protection
- No external calls before state changes
- Use checks-effects-interactions pattern

// ✅ Gas Optimization
- Limit batch size (prevent DoS)
- Use memory vs storage appropriately
```

### 2. Frontend Security

```typescript
// ✅ Wallet Security
- Never ask for private keys
- Validate transaction data
- Show transaction previews

// ✅ API Security
- Rate limiting on all endpoints
- Input sanitization
- SQL injection prevention (use Prisma)
- XSS prevention

// ✅ Environment Variables
- Never expose private keys in frontend
- Use NEXT_PUBLIC_ prefix only for public vars
```

### 3. Data Privacy

```typescript
// ✅ GDPR Compliance
- Store minimal PII on-chain
- Allow data deletion from database
- Encrypt sensitive data
- Get user consent

// ✅ Access Control
- Implement proper authentication
- Check authorization on every request
- Log access attempts
```

---

## 🎯 Implementation Priorities

### Phase 1: MVP (Week 1-4)
```
Priority: HIGH
□ Smart contract development & testing
□ Basic frontend (Next.js setup)
□ Wallet connection (RainbowKit)
□ Issue single certificate
□ Public verification page
□ Database setup (Prisma)
```

### Phase 2: Core Features (Week 5-6)
```
Priority: HIGH
□ Web3Auth integration (email login)
□ Batch certificate issuance
□ IPFS integration (Pinata)
□ Email notifications
□ Institution dashboard
```

### Phase 3: Polish (Week 7-8)
```
Priority: MEDIUM
□ PDF generation
□ Analytics dashboard
□ Search & filters
□ Mobile responsive
□ Error handling improvements
```

### Phase 4: Advanced (Future)
```
Priority: LOW
□ Multi-chain support
□ API for third parties
□ Mobile app
□ Advanced analytics
```

---

## 💡 Common Issues & Solutions

### Issue: Transaction Reverted
```
Possible causes:
- Insufficient gas
- Invalid inputs
- Missing role permissions
- Contract not deployed

Solution:
1. Check gas limit in transaction
2. Validate all inputs
3. Verify user has ISSUER_ROLE
4. Confirm contract address is correct
```

### Issue: IPFS Upload Failed
```
Possible causes:
- Invalid API keys
- File too large
- Network error

Solution:
1. Verify Pinata API keys
2. Check file size (<10MB recommended)
3. Add retry logic with exponential backoff
```

### Issue: Wallet Connection Failed
```
Possible causes:
- Wrong network
- MetaMask not installed
- User rejected

Solution:
1. Check user is on correct network (Sepolia)
2. Show install MetaMask prompt
3. Handle rejection gracefully
```

### Issue: Web3Auth Not Working
```
Possible causes:
- Invalid client ID
- Network mismatch
- Browser compatibility

Solution:
1. Verify Web3Auth client ID
2. Check chainId configuration
3. Test in different browser
```

---

## 📚 Key Resources

### Documentation
- **Solidity**: https://docs.soliditylang.org/
- **Hardhat**: https://hardhat.org/docs
- **OpenZeppelin**: https://docs.openzeppelin.com/
- **Next.js**: https://nextjs.org/docs
- **Wagmi**: https://wagmi.sh/
- **Web3Auth**: https://web3auth.io/docs
- **Prisma**: https://www.prisma.io/docs
- **Pinata**: https://docs.pinata.cloud/

### Tools
- **Remix IDE**: https://remix.ethereum.org/ (test contracts)
- **Etherscan**: https://sepolia.etherscan.io/ (verify transactions)
- **Alchemy Dashboard**: https://dashboard.alchemy.com/ (monitor RPC)
- **Pinata Dashboard**: https://app.pinata.cloud/ (manage IPFS)

---

## 🤖 Cursor AI Development Tips

### When starting a new feature:
```
1. Reference this document for architecture decisions
2. Check CODE_EXAMPLES.md for code snippets
3. Follow IMPLEMENTATION_GUIDE.md for step-by-step
4. Use TECHNICAL_SPECS.md for implementation details
```

### Best practices for AI-assisted development:
```
✓ Be specific: "Implement issueCertificate function following the spec"
✓ Reference sections: "Create the component from TECHNICAL_SPECS.md section 4.2"
✓ Ask for explanations: "Explain why we use soulbound tokens"
✓ Request tests: "Write tests for this function"
✓ Iterate: "Refactor this to match the architecture in PROJECT_BLUEPRINT.md"
```

### Common prompts:
```
- "Create the smart contract following the spec in this document"
- "Implement Web3Auth login as described in the authentication section"
- "Add error handling to this function following best practices"
- "Write tests for the certificate issuance flow"
- "Optimize this code for gas efficiency"
- "Add TypeScript types for this component"
```

---

## ✅ Development Checklist

Use this checklist to track progress:

### Setup
- [ ] Clone/create repository
- [ ] Install dependencies (smart-contracts & frontend)
- [ ] Configure environment variables
- [ ] Set up database (Prisma)

### Smart Contract
- [ ] Write CertiChain.sol
- [ ] Write comprehensive tests
- [ ] Deploy to Sepolia testnet
- [ ] Verify on Etherscan
- [ ] Test all functions on testnet

### Frontend - Core
- [ ] Next.js project setup
- [ ] Install dependencies (wagmi, web3auth, etc.)
- [ ] Configure Web3 providers
- [ ] Create database schema (Prisma)
- [ ] Setup authentication (Web3Auth + RainbowKit)

### Frontend - Features
- [ ] Landing page
- [ ] Wallet connection
- [ ] Issue certificate form
- [ ] Batch issuance
- [ ] Public verification page
- [ ] Certificate detail page
- [ ] Institution dashboard
- [ ] Email notifications
- [ ] PDF generation

### Testing & Deployment
- [ ] Smart contract tests (>90% coverage)
- [ ] Frontend component tests
- [ ] E2E tests
- [ ] Security audit checklist
- [ ] Deploy smart contract to mainnet
- [ ] Deploy frontend to Vercel
- [ ] Configure production environment variables

---

## 🎉 You're Ready!

This document contains everything Cursor AI needs to help you build CertiChain. 

**Next Steps:**
1. Start with smart contract development
2. Deploy and test on Sepolia
3. Build frontend features incrementally
4. Test thoroughly
5. Deploy to production

**Remember:**
- Blockchain is the source of truth
- Database is for performance
- User experience is paramount
- Security comes first

Good luck building! 🚀