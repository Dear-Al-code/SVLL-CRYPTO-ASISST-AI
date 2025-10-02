// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title SovereignAI
 * @dev NFT collection donde cada token = acceso a agente IA personal 24/7
 * Desplegado en Base para fees bajos
 */
contract SovereignAI is ERC721, Ownable {
    using Strings for uint256;

    // Config
    uint256 public constant MAX_SUPPLY = 100;
    uint256 public constant MINT_PRICE = 0.008 ether;

    uint256 private _currentTokenId = 0;
    string private _baseTokenURI;

    mapping(uint256 => bool) public agentActivated;
    mapping(address => uint256[]) public userTokens;

    event AgentActivated(uint256 indexed tokenId, address indexed owner);
    event AgentDeactivated(uint256 indexed tokenId);

    constructor(
        string memory baseURI
    ) ERC721("Sovereign AI", "SOVAI") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Mint público - cualquiera puede mintear
     */
    function mint() external payable {
        require(_currentTokenId < MAX_SUPPLY, "Sold out");
        require(msg.value >= MINT_PRICE, "Insufficient payment");

        _currentTokenId++;
        uint256 newTokenId = _currentTokenId;

        _safeMint(msg.sender, newTokenId);
        userTokens[msg.sender].push(newTokenId);
        agentActivated[newTokenId] = true;

        emit AgentActivated(newTokenId, msg.sender);
    }

    /**
     * @dev Batch mint para owner (airdrops, promo, etc)
     */
    function mintBatch(address to, uint256 amount) external onlyOwner {
        require(_currentTokenId + amount <= MAX_SUPPLY, "Exceeds max supply");

        for (uint256 i = 0; i < amount; i++) {
            _currentTokenId++;
            uint256 newTokenId = _currentTokenId;

            _safeMint(to, newTokenId);
            userTokens[to].push(newTokenId);
            agentActivated[newTokenId] = true;

            emit AgentActivated(newTokenId, to);
        }
    }

    /**
     * @dev Override transfer para actualizar userTokens
     */
    function _update(address to, uint256 tokenId, address auth) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);

        if (from != address(0) && from != to) {
            // Remover del array anterior
            _removeTokenFromUser(from, tokenId);
        }

        if (to != address(0) && from != to) {
            // Agregar al nuevo owner
            userTokens[to].push(tokenId);
        }

        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Helper para remover token del array de usuario
     */
    function _removeTokenFromUser(address user, uint256 tokenId) private {
        uint256[] storage tokens = userTokens[user];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1];
                tokens.pop();
                break;
            }
        }
    }

    /**
     * @dev Obtener todos los tokens de un usuario
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        return userTokens[owner];
    }

    /**
     * @dev Toggle agent activation (para debugging/emergencias)
     */
    function toggleAgent(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        agentActivated[tokenId] = !agentActivated[tokenId];

        if (agentActivated[tokenId]) {
            emit AgentActivated(tokenId, msg.sender);
        } else {
            emit AgentDeactivated(tokenId);
        }
    }

    /**
     * @dev Base URI para metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Update base URI (por si migras IPFS o metadata)
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /**
     * @dev Token URI completo
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : "";
    }

    /**
     * @dev Withdraw funds (para ti, el creador)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Total minted
     */
    function totalSupply() external view returns (uint256) {
        return _currentTokenId;
    }
}
