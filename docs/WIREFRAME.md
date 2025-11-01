# 🎨 CertiChain Frontend Wireframe

## Design Principles

- **Modern & Clean**: Minimalist design with clear visual hierarchy
- **Web3 Native**: Integrates blockchain elements naturally
- **User-Friendly**: Accessible to both Web3 and Web2 users
- **Responsive**: Mobile-first approach, works on all devices
- **Fast**: Optimized for performance with React Query caching
- **Trustworthy**: Visual indicators for blockchain verification

---

## 🏗️ Layout Structure

### Global Layout Components

```
┌─────────────────────────────────────────────────────────┐
│ Header (Layout Component)                               │
│ ┌──────────┐  ┌──────────────────┐  ┌───────────────┐  │
│ │ Logo     │  │ Navigation Menu  │  │ Connect Wallet│  │
│ └──────────┘  └──────────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────────┘
│                                                          │
│ Main Content Area                                        │
│                                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ Footer (Layout Component)                               │
│ Links | Social | Copyright                              │
└─────────────────────────────────────────────────────────┘
```

---

## 📄 Page Wireframes

### 1. Landing Page (`/`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header                                │
├──────────────────────────────────────────────────────────┤
│                                                          │
│              ┌──────────────────────┐                   │
│              │   CertiChain Logo    │                   │
│              │   Decentralized      │                   │
│              │   Certificates       │                   │
│              └──────────────────────┘                   │
│                                                          │
│         ┌──────────────────────────────────────┐        │
│         │   Hero Section                       │        │
│         │   "Issue & Verify Certificates       │        │
│         │    on the Blockchain"                │        │        │         │   ┌─────────┐  ┌─────────┐  │        │
│         │   [Get Started] [Verify Now]         │        │
│         └──────────────────────────────────────┘        │
│                                                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│   │ Feature 1    │  │ Feature 2    │  │ Feature 3    │ │
│   │ Immutable    │  │ Fast Verify │  │ Email Notif   │ │
│   │ Blockchain   │  │ Public      │  │ IPFS Storage  │ │
│   └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                          │
│   ┌────────────────────────────────────────────┐        │
│   │ Quick Verify Section                       │        │
│   │ [Certificate ID Input] [Verify Button]     │        │
│   └────────────────────────────────────────────┘        │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `Hero` - Main value proposition
- `FeatureCards` - 3 key features
- `QuickVerify` - Certificate ID input + verify button
- `CTAButtons` - Get Started / Verify Now

---

### 2. Authentication Modal (`/auth/login`)

```
┌──────────────────────────────────────────┐
│         Connect Wallet Modal              │
├──────────────────────────────────────────┤
│                                          │
│  Choose Authentication Method:           │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ 🌐 Social Login                     │ │
│  │ Email / Google                      │ │
│  │ (Auto-generates wallet)             │ │
│  │ [Continue with Email]               │ │
│  │ [Continue with Google]               │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │ 🦊 Wallet Connection               │ │
│  │ MetaMask / WalletConnect            │ │
│  │ [Connect MetaMask]                  │ │
│  │ [WalletConnect]                     │ │
│  └────────────────────────────────────┘ │
│                                          │
│                    [Close]               │
└──────────────────────────────────────────┘
```

**Components:**
- `AuthModal` - Modal wrapper
- `SocialLoginOptions` - Web3Auth options
- `WalletConnectOptions` - RainbowKit options
- `AuthStatus` - Connection status indicator

---

### 3. Institution Dashboard (`/institution/dashboard`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header (Logged In)                    │
│                    [Institution Name] ▼                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Dashboard Stats                                     │ │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │ │
│  │ │ Total    │ │ This     │ │ Pending  │ │ Revoked│ │ │
│  │ │ Issued   │ │ Month    │ │ Verif    │ │        │ │ │
│  │ │ 150      │ │ 25       │ │ 12       │ │ 2      │ │ │
│  │ └──────────┘ └──────────┘ └──────────┘ └────────┘ │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Quick Actions                                        │ │
│  │ [Issue Certificate] [Batch Issue] [View All]         │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Recent Certificates                                  │ │
│  │ ┌──────────────────────────────────────────────────┐ │ │
│  │ │ #1234 | John Doe | Course | Valid | [View]      │ │ │
│  │ │ #1233 | Jane Smith | Achievement | Valid | [View]│ │ │
│  │ │ ...                                              │ │ │
│  │ └──────────────────────────────────────────────────┘ │ │
│  │                          [Load More]                  │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `DashboardStats` - Stat cards with numbers
- `QuickActions` - Action buttons
- `CertificateTable` - List of certificates with filters
- `SearchBar` - Search certificates
- `Pagination` - Load more / pagination

---

### 4. Issue Certificate Page (`/institution/issue`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Issue New Certificate                               │ │
│  │                                                     │ │
│  │ Recipient Information:                              │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ Name *          [________________]            │ │ │
│  │ │ Email *         [________________]            │ │ │
│  │ │ Wallet Address [________________] [Generate]  │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ Certificate Details:                                │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ Type *         [Dropdown: Course|Diploma...]  │ │ │
│  │ │ Description * [Text Area]                    │ │ │
│  │ │ Issue Date *   [Date Picker]                 │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ Certificate Image:                                  │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ [Upload Image] [Preview]                      │ │ │
│  │ │ Max 10MB, PNG/JPG                              │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ Transaction Preview                            │ │ │
│  │ │ Network: Sepolia                               │ │ │
│  │ │ Estimated Gas: 0.001 ETH                       │ │ │
│  │ │ Recipient: 0x1234...5678                       │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │           [Cancel]          [Issue Certificate]     │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `IssueCertificateForm` - Main form component
- `RecipientFormSection` - Recipient info fields
- `CertificateDetailsSection` - Certificate details
- `ImageUpload` - File upload with preview
- `TransactionPreview` - Gas estimate & transaction details
- `FormValidation` - Real-time validation feedback
- `LoadingStates` - Loading indicators during process

**Form Flow:**
1. Fill form → Validate
2. Upload image to IPFS → Get hash
3. Create metadata → Upload to IPFS
4. Show transaction preview
5. User confirms → Transaction sent
6. Wait for confirmation → Save to database
7. Show success → Redirect to certificate

---

### 5. Batch Issue Page (`/institution/batch-issue`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Batch Issue Certificates                            │ │
│  │                                                     │ │
│  │ Upload CSV / Manual Entry:                         │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ [Upload CSV] or [Manual Entry]                │ │ │
│  │ │ CSV Format: Name,Email,Wallet,Type,Date     │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ Certificate Template:                              │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ Type *         [Course Completion]            │ │ │
│  │ │ Description * [Text Area]                    │ │ │
│  │ │ Image         [Upload]                        │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ Recipients List:                                    │ │
│  │ ┌───────────────────────────────────────────────┐ │ │
│  │ │ # Name      Email        Wallet      [Remove] │ │ │
│  │ │ 1 John Doe  john@...    0x1234...   [X]     │ │ │
│  │ │ 2 Jane ...  jane@...    0x5678...   [X]     │ │ │
│  │ │ ...                                          │ │ │
│  │ │ [+ Add Recipient]                            │ │ │
│  │ └───────────────────────────────────────────────┘ │ │
│  │                                                     │ │
│  │ Preview: 25 certificates ready to issue            │ │
│  │ Estimated Gas: 0.025 ETH                            │ │
│  │                                                     │ │
│  │           [Cancel]    [Issue Batch (25)]          │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `BatchIssueForm` - Batch form wrapper
- `CSVUpload` - CSV file uploader
- `RecipientTable` - Editable table of recipients
- `BatchPreview` - Summary of batch
- `ProgressIndicator` - Progress during batch processing

---

### 6. Public Verification Page (`/verify/[tokenId]`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Certificate Verification                            │ │
│  │                                                      │ │
│  │ Certificate ID: #1234                               │ │
│  │                                                      │ │
│  │ ┌──────────────────────────────────────────────┐   │ │
│  │ │ Status: ✅ VALID                              │   │ │
│  │ │                                               │   │ │
│  │ │ Certificate Details:                          │   │ │
│  │ │ ┌──────────────────────────────────────────┐ │   │ │
│  │ │ │ Recipient: John Doe                      │ │   │ │
│  │ │ │ Email: john@example.com                 │ │   │ │
│  │ │ │ Type: Course Completion                  │ │   │ │
│  │ │ │ Issued: Jan 15, 2025                    │ │   │ │
│  │ │ │ Issuer: Tech Academy                     │ │   │ │
│  │ │ │ Description: ...                        │ │   │ │
│  │ │ └──────────────────────────────────────────┘ │   │ │
│  │ │                                               │   │ │
│  │ │ Blockchain Verification:                      │   │ │
│  │ │ ┌──────────────────────────────────────────┐ │   │ │
│  │ │ │ ✅ Verified on Ethereum Sepolia         │ │   │ │
│  │ │ │ Transaction: 0x1234...5678              │ │   │ │
│  │ │ │ Block: #12345                           │ │   │ │
│  │ │ │ IPFS Hash: ipfs://Qm1234...            │ │   │ │
│  │ │ │ [View on Etherscan] [View Metadata]     │ │   │ │
│  │ │ └──────────────────────────────────────────┘ │   │ │
│  │ │                                               │   │ │
│  │ │ Certificate Image:                            │   │ │
│  │ │ ┌──────────────────────────────────────────┐ │   │ │
│  │ │ │        [Certificate Image Preview]       │ │   │ │
│  │ │ └──────────────────────────────────────────┘ │   │ │
│  │ └──────────────────────────────────────────────┘   │ │
│  │                                                      │ │
│  │ [Share] [Download PDF] [Print]                      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `VerificationStatus` - Valid/Invalid/Revoked badge
- `CertificateDetails` - All certificate info
- `BlockchainProof` - On-chain verification proof
- `CertificateImage` - Image display
- `ShareOptions` - Share buttons
- `ActionButtons` - Download, Print, Share

**States:**
- ✅ Valid Certificate
- ❌ Invalid Certificate (revoked/not found)
- ⏳ Loading verification

---

### 7. Certificate Detail Page (`/certificate/[tokenId]`)

```
┌──────────────────────────────────────────────────────────┐
│                    Header                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Certificate #1234                                   │ │
│  │                                                      │ │
│  │ ┌──────────────────────────────────────────────────┐ │ │
│  │ │                                                  │ │ │
│  │ │       [Large Certificate Image/Design]         │ │ │
│  │ │                                                  │ │ │
│  │ └──────────────────────────────────────────────────┘ │ │
│  │                                                      │ │
│  │ Recipient: John Doe                                  │ │
│  │ Issued by: Tech Academy                             │ │
│  │ Date: January 15, 2025                              │ │
│  │ Type: Course Completion                              │ │
│  │                                                      │ │
│  │ Description:                                         │ │
│  │ This certificate is awarded to John Doe for...      │ │
│  │                                                      │ │
│  │ ┌──────────────────────────────────────────────────┐ │ │
│  │ │ Blockchain Verification                          │ │ │
│  │ │ ✅ Verified on Sepolia                         │ │ │
│  │ │ Transaction: [View on Etherscan]                │ │ │
│  │ │ IPFS: [View Metadata]                           │ │ │
│  │ └──────────────────────────────────────────────────┘ │ │
│  │                                                      │ │
│  │ [Share] [Download PDF] [Print] [Verify Public]      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│                    Footer                                │
└──────────────────────────────────────────────────────────┘
```

**Components:**
- `CertificateDisplay` - Main certificate view
- `CertificateMetadata` - All metadata display
- `VerificationBadge` - Verification status
- `ShareModal` - Share options modal
- `DownloadActions` - Download/Print buttons

---

## 🧩 Component Library

### Layout Components

#### Header Component
```typescript
interface HeaderProps {
  user?: User;
  walletAddress?: `0x${string}`;
  onConnect?: () => void;
}
```

**Structure:**
- Logo (links to home)
- Navigation: Home | Verify | Dashboard (if logged in)
- Wallet connection button / User menu
- Responsive mobile hamburger menu

#### Footer Component
```typescript
interface FooterProps {}
```

**Structure:**
- Links: About | Docs | Privacy | Terms
- Social links
- Copyright notice
- Contract address display

---

### Certificate Components

#### CertificateCard
```typescript
interface CertificateCardProps {
  tokenId: number;
  recipientName: string;
  certificateType: string;
  issuedAt: Date;
  isRevoked: boolean;
  issuer: string;
  onView?: () => void;
}
```

**Display:**
- Certificate preview image
- Recipient name
- Certificate type
- Issue date
- Status badge (Valid/Revoked)
- View button

#### CertificateForm
```typescript
interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => Promise<void>;
  isLoading?: boolean;
}
```

**Fields:**
- Recipient name (required)
- Recipient email (required, validated)
- Wallet address (optional, with generate button)
- Certificate type (dropdown)
- Description (textarea)
- Issue date (date picker)
- Certificate image (file upload)

---

### Verification Components

#### VerificationStatus
```typescript
interface VerificationStatusProps {
  isValid: boolean;
  isRevoked?: boolean;
  tokenId: number;
  certificate?: Certificate;
}
```

**States:**
- ✅ Valid (green badge)
- ❌ Invalid (red badge)
- ⚠️ Revoked (orange badge)
- ⏳ Loading (spinner)

#### BlockchainProof
```typescript
interface BlockchainProofProps {
  transactionHash: string;
  blockNumber: number;
  ipfsHash: string;
  network: string;
}
```

**Display:**
- Network name
- Transaction hash (with Etherscan link)
- Block number
- IPFS hash (with IPFS gateway link)
- Timestamp

---

### Form Components

#### ImageUpload
```typescript
interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>;
  preview?: string;
  maxSize?: number; // bytes
  acceptedTypes?: string[];
}
```

**Features:**
- Drag & drop
- File picker button
- Image preview
- Progress indicator
- Error handling

#### WalletInput
```typescript
interface WalletInputProps {
  value: string;
  onChange: (value: `0x${string}`) => void;
  onGenerate?: () => Promise<`0x${string}`>;
  error?: string;
}
```

**Features:**
- Ethereum address validation
- Generate wallet button (Web3Auth)
- Copy to clipboard
- QR code display (optional)

---

## 🎨 Design System

### Colors (TailwindCSS)

```typescript
const colors = {
  primary: {
    DEFAULT: '#3B82F6', // Blue
    dark: '#2563EB',
    light: '#60A5FA',
  },
  success: {
    DEFAULT: '#10B981', // Green
    dark: '#059669',
  },
  danger: {
    DEFAULT: '#EF4444', // Red
    dark: '#DC2626',
  },
  warning: {
    DEFAULT: '#F59E0B', // Orange
  },
  blockchain: {
    DEFAULT: '#627EEA', // Ethereum purple
    polygon: '#8247E5',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    // ... standard gray scale
  },
};
```

### Typography

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'], // For addresses
  },
  sizes: {
    'display': 'text-4xl font-bold',
    'h1': 'text-3xl font-bold',
    'h2': 'text-2xl font-semibold',
    'h3': 'text-xl font-semibold',
    'body': 'text-base',
    'small': 'text-sm',
    'tiny': 'text-xs',
  },
};
```

### Spacing & Layout

- Container max-width: `1280px`
- Padding: `16px` mobile, `24px` tablet, `32px` desktop
- Card border-radius: `8px`
- Button border-radius: `6px`
- Gap between elements: `16px` / `24px` / `32px`

---

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
};
```

**Mobile (< 768px):**
- Single column layout
- Hamburger menu
- Stacked form fields
- Full-width buttons

**Tablet (768px - 1024px):**
- 2-column grid where appropriate
- Side navigation (collapsible)
- Optimized form layouts

**Desktop (> 1024px):**
- Full multi-column layouts
- Sidebar navigation
- Hover effects
- Optimized spacing

---

## 🔄 User Flows

### Flow 1: Institution Issues Certificate

```
1. Login → Institution Dashboard
2. Click "Issue Certificate"
3. Fill form:
   - Recipient info
   - Certificate details
   - Upload image
4. Form validates
5. Preview transaction
6. Confirm transaction
7. Wait for blockchain confirmation
8. Certificate saved to database
9. Email sent (optional)
10. Redirect to certificate detail page
```

### Flow 2: Public Verification

```
1. Landing page or /verify/[tokenId]
2. Enter certificate ID (or from URL)
3. Click "Verify"
4. Show loading state
5. Fetch from database (fast)
6. Verify on blockchain (if needed)
7. Display results:
   - Valid: Show full certificate
   - Invalid: Show error message
8. Option to share/download
```

### Flow 3: User Claims Certificate (Web3Auth)

```
1. User receives email with certificate link
2. Click link → Certificate detail page
3. Click "Connect Wallet" or "Login"
4. Choose Web3Auth (email/Google)
5. Web3Auth generates wallet
6. Backend links email to wallet
7. Certificate now linked to user's wallet
8. User can view in their dashboard
```

---

## 🎯 Implementation Priority

### Phase 1: MVP (Core)
1. ✅ Landing page
2. ✅ Header & Footer
3. ✅ Wallet connection (RainbowKit)
4. ✅ Issue certificate form
5. ✅ Public verification page
6. ✅ Certificate detail page

### Phase 2: Enhanced
1. Institution dashboard
2. Batch issue
3. Web3Auth integration
4. Certificate gallery/list
5. Search & filters

### Phase 3: Polish
1. Animations & transitions
2. Loading skeletons
3. Error boundaries
4. Toast notifications
5. PDF generation
6. Analytics dashboard

---

## 🔧 Technical Implementation Notes

### State Management
- **Server State**: React Query (TanStack Query)
- **Client State**: React Context + useState
- **Form State**: react-hook-form
- **Web3 State**: wagmi hooks

### Component Organization
```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
├── certificate/
│   ├── CertificateCard.tsx
│   ├── CertificateForm.tsx
│   ├── CertificateDisplay.tsx
│   └── CertificateList.tsx
├── verification/
│   ├── VerificationStatus.tsx
│   ├── BlockchainProof.tsx
│   └── QuickVerify.tsx
├── auth/
│   ├── AuthModal.tsx
│   ├── WalletConnect.tsx
│   └── SocialLogin.tsx
└── ui/ (shadcn/ui components)
    ├── button.tsx
    ├── input.tsx
    ├── card.tsx
    └── ...
```

### Form Validation
- Use Zod schemas (already in backend)
- Real-time validation with react-hook-form
- Clear error messages
- Success feedback

### Loading States
- Skeleton loaders for lists
- Spinners for actions
- Progress bars for uploads/transactions
- Optimistic updates where possible

### Error Handling
- Error boundaries for components
- Toast notifications for errors
- User-friendly error messages
- Retry mechanisms

---

## ✅ Accessibility Requirements

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast (WCAG AA)
- Alt text for images
- Form label associations

---

## 🚀 Next Steps

1. Set up shadcn/ui components
2. Create layout components (Header, Footer)
3. Build landing page
4. Implement wallet connection
5. Create certificate forms
6. Build verification page
7. Add authentication flows
8. Implement institution dashboard

---

This wireframe serves as the blueprint for frontend development following all project rules and best practices.

