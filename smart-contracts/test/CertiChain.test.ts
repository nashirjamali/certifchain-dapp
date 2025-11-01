import { expect } from "chai";
import { ethers } from "hardhat";
import { CertiChain } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("CertiChain", function () {
  let certiChain: CertiChain;
  let owner: HardhatEthersSigner;
  let issuer: HardhatEthersSigner;
  let recipient: HardhatEthersSigner;
  let other: HardhatEthersSigner;

  const ISSUER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("ISSUER_ROLE"));

  beforeEach(async function () {
    [owner, issuer, recipient, other] = await ethers.getSigners();

    const CertiChainFactory = await ethers.getContractFactory("CertiChain");
    certiChain = await CertiChainFactory.deploy(owner.address) as unknown as CertiChain;
    await certiChain.waitForDeployment();

    await certiChain.grantRole(ISSUER_ROLE, issuer.address);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await certiChain.hasRole(await certiChain.DEFAULT_ADMIN_ROLE(), owner.address)).to.be.true;
    });

    it("Should grant issuer role to owner", async function () {
      expect(await certiChain.hasRole(ISSUER_ROLE, owner.address)).to.be.true;
    });

    it("Should have correct name and symbol", async function () {
      expect(await certiChain.name()).to.equal("CertiChain");
      expect(await certiChain.symbol()).to.equal("CERT");
    });
  });

  describe("Issue Certificate", function () {
    it("Should issue a certificate", async function () {
      const tokenURI = "ipfs://QmTest123";
      const certificateType = "Course Completion";

      await expect(certiChain.connect(issuer).issueCertificate(
        recipient.address,
        certificateType,
        tokenURI
      )).to.emit(certiChain, "CertificateIssued");

      const tokenId = 1;
      expect(await certiChain.ownerOf(tokenId)).to.equal(recipient.address);
      expect(await certiChain.getCertificate(tokenId)).to.not.be.null;
    });

    it("Should revert if issuer is not authorized", async function () {
      await expect(
        certiChain.connect(other).issueCertificate(
          recipient.address,
          "Test",
          "ipfs://test"
        )
      ).to.be.reverted;
    });

    it("Should revert if recipient is zero address", async function () {
      await expect(
        certiChain.connect(issuer).issueCertificate(
          ethers.ZeroAddress,
          "Test",
          "ipfs://test"
        )
      ).to.be.reverted;
    });
  });

  describe("Batch Issue Certificates", function () {
    it("Should batch issue certificates", async function () {
      const recipients = [recipient.address, other.address];
      const types = ["Type 1", "Type 2"];
      const tokenURIs = ["ipfs://1", "ipfs://2"];

      await expect(
        certiChain.connect(issuer).batchIssueCertificates(recipients, types, tokenURIs)
      ).to.emit(certiChain, "BatchCertificatesIssued");

      expect(await certiChain.ownerOf(1)).to.equal(recipient.address);
      expect(await certiChain.ownerOf(2)).to.equal(other.address);
    });

    it("Should revert if batch size exceeds limit", async function () {
      const recipients = Array(101).fill(recipient.address);
      const types = Array(101).fill("Type");
      const tokenURIs = Array(101).fill("ipfs://test");

      await expect(
        certiChain.connect(issuer).batchIssueCertificates(recipients, types, tokenURIs)
      ).to.be.reverted;
    });
  });

  describe("Verify Certificate", function () {
    it("Should verify valid certificate", async function () {
      await certiChain.connect(issuer).issueCertificate(
        recipient.address,
        "Test",
        "ipfs://test"
      );

      expect(await certiChain.verifyCertificate(1)).to.be.true;
    });

    it("Should return false for non-existent certificate", async function () {
      expect(await certiChain.verifyCertificate(999)).to.be.false;
    });
  });

  describe("Revoke Certificate", function () {
    it("Should revoke certificate", async function () {
      await certiChain.connect(issuer).issueCertificate(
        recipient.address,
        "Test",
        "ipfs://test"
      );

      await expect(certiChain.connect(issuer).revokeCertificate(1))
        .to.emit(certiChain, "CertificateRevoked");

      expect(await certiChain.verifyCertificate(1)).to.be.false;
    });

    it("Should revert if certificate not found", async function () {
      await expect(
        certiChain.connect(issuer).revokeCertificate(999)
      ).to.be.reverted;
    });
  });

  describe("Soulbound", function () {
    it("Should prevent transfers", async function () {
      await certiChain.connect(issuer).issueCertificate(
        recipient.address,
        "Test",
        "ipfs://test"
      );

      await expect(
        certiChain.connect(recipient)["safeTransferFrom(address,address,uint256)"](
          recipient.address,
          other.address,
          1
        )
      ).to.be.reverted;
    });

    it("Should prevent approvals", async function () {
      await certiChain.connect(issuer).issueCertificate(
        recipient.address,
        "Test",
        "ipfs://test"
      );

      await expect(
        certiChain.connect(recipient).approve(other.address, 1)
      ).to.be.reverted;
    });
  });
});

