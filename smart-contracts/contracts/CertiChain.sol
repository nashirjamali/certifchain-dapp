// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error CertiChain__InvalidInput();
error CertiChain__CertificateNotFound();
error CertiChain__CertificateAlreadyRevoked();
error CertiChain__TransferNotAllowed();
error CertiChain__BatchSizeExceeded();

contract CertiChain is ERC721, ERC721URIStorage, AccessControl, ReentrancyGuard {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");

    struct Certificate {
        uint256 tokenId;
        address recipient;
        address issuer;
        string certificateType;
        uint256 issuedAt;
        bool isRevoked;
    }

    uint256 private _nextTokenId;
    uint256 public constant MAX_BATCH_SIZE = 100;

    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) private _recipientCertificates;
    mapping(address => uint256[]) private _issuerCertificates;

    event CertificateIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        address indexed issuer,
        string certificateType,
        string tokenURI,
        uint256 issuedAt
    );

    event CertificateRevoked(
        uint256 indexed tokenId,
        address indexed revokedBy,
        uint256 revokedAt
    );

    event BatchCertificatesIssued(
        address indexed issuer,
        uint256[] tokenIds,
        uint256 count
    );

    constructor(address defaultAdmin) ERC721("CertiChain", "CERT") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(ISSUER_ROLE, defaultAdmin);
        _nextTokenId = 1;
    }

    function issueCertificate(
        address recipient,
        string calldata certificateType,
        string calldata uri
    ) external onlyRole(ISSUER_ROLE) nonReentrant returns (uint256) {
        if (recipient == address(0)) {
            revert CertiChain__InvalidInput();
        }

        uint256 tokenId = _nextTokenId;
        _nextTokenId++;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);

        certificates[tokenId] = Certificate({
            tokenId: tokenId,
            recipient: recipient,
            issuer: msg.sender,
            certificateType: certificateType,
            issuedAt: block.timestamp,
            isRevoked: false
        });

        _recipientCertificates[recipient].push(tokenId);
        _issuerCertificates[msg.sender].push(tokenId);

        emit CertificateIssued(
            tokenId,
            recipient,
            msg.sender,
            certificateType,
            uri,
            block.timestamp
        );

        return tokenId;
    }

    function batchIssueCertificates(
        address[] calldata recipients,
        string[] calldata certificateTypes,
        string[] calldata uris
    ) external onlyRole(ISSUER_ROLE) nonReentrant returns (uint256[] memory) {
        if (
            recipients.length != certificateTypes.length ||
            recipients.length != uris.length
        ) {
            revert CertiChain__InvalidInput();
        }

        if (recipients.length > MAX_BATCH_SIZE || recipients.length == 0) {
            revert CertiChain__BatchSizeExceeded();
        }

        uint256[] memory tokenIds = new uint256[](recipients.length);

        for (uint256 i = 0; i < recipients.length; ) {
            if (recipients[i] == address(0)) {
                revert CertiChain__InvalidInput();
            }

            uint256 tokenId = _nextTokenId;
            _nextTokenId++;

            _safeMint(recipients[i], tokenId);
            _setTokenURI(tokenId, uris[i]);

            certificates[tokenId] = Certificate({
                tokenId: tokenId,
                recipient: recipients[i],
                issuer: msg.sender,
                certificateType: certificateTypes[i],
                issuedAt: block.timestamp,
                isRevoked: false
            });

            _recipientCertificates[recipients[i]].push(tokenId);
            _issuerCertificates[msg.sender].push(tokenId);

            emit CertificateIssued(
                tokenId,
                recipients[i],
                msg.sender,
                certificateTypes[i],
                uris[i],
                block.timestamp
            );

            tokenIds[i] = tokenId;

            unchecked {
                i++;
            }
        }

        emit BatchCertificatesIssued(msg.sender, tokenIds, recipients.length);

        return tokenIds;
    }

    function revokeCertificate(
        uint256 tokenId
    ) external nonReentrant {
        Certificate storage cert = certificates[tokenId];

        if (cert.tokenId == 0) {
            revert CertiChain__CertificateNotFound();
        }

        if (cert.isRevoked) {
            revert CertiChain__CertificateAlreadyRevoked();
        }

        bool canRevoke = hasRole(DEFAULT_ADMIN_ROLE, msg.sender) ||
            hasRole(ISSUER_ROLE, msg.sender) && cert.issuer == msg.sender;

        if (!canRevoke) {
            revert CertiChain__InvalidInput();
        }

        cert.isRevoked = true;

        emit CertificateRevoked(tokenId, msg.sender, block.timestamp);
    }

    function verifyCertificate(
        uint256 tokenId
    ) public view returns (bool) {
        Certificate memory cert = certificates[tokenId];

        if (cert.tokenId == 0) {
            return false;
        }

        if (cert.isRevoked) {
            return false;
        }

        if (ownerOf(tokenId) != cert.recipient) {
            return false;
        }

        return true;
    }

    function getCertificate(
        uint256 tokenId
    ) public view returns (Certificate memory) {
        if (certificates[tokenId].tokenId == 0) {
            revert CertiChain__CertificateNotFound();
        }
        return certificates[tokenId];
    }

    function getRecipientCertificates(
        address recipient
    ) external view returns (uint256[] memory) {
        return _recipientCertificates[recipient];
    }

    function getIssuerCertificates(
        address issuer
    ) external view returns (uint256[] memory) {
        return _issuerCertificates[issuer];
    }

    function getTokenURI(
        uint256 tokenId
    ) external view returns (string memory) {
        return tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert CertiChain__TransferNotAllowed();
        }
        return super._update(to, tokenId, auth);
    }

    function approve(
        address /* to */,
        uint256 /* tokenId */
    ) public pure override(ERC721, IERC721) {
        revert CertiChain__TransferNotAllowed();
    }

    function setApprovalForAll(
        address /* operator */,
        bool /* approved */
    ) public pure override(ERC721, IERC721) {
        revert CertiChain__TransferNotAllowed();
    }
}

