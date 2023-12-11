// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint balance);

    function ownerOf(uint tokenId) external view returns (address owner);

    function safeTransferFrom(address from, address to, uint tokenId) external;

    function safeTransferFrom(
        address from,
        address to,
        uint tokenId,
        bytes calldata data
    ) external;

    function transferFrom(address from, address to, uint tokenId) external;

    function approve(address to, uint tokenId) external;

    function getApproved(uint tokenId) external view returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(
        address owner,
        address operator
    ) external view returns (bool);
}

interface IERC721Receiver {
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) external returns (bytes4);
}

contract ERC721 is IERC721 {
    bytes32 internal constant ERC721NAMESPACE = keccak256('ERC721');

    function getERC721Storage() internal pure returns(ERC721DATA storage s) {
        bytes32 position = ERC721NAMESPACE;
        assembly {
            s.slot := position
        }
    }
    struct ERC721DATA {
    // Mapping from token ID to owner address
    mapping(uint => address)  _ownerOf;

    // Mapping owner address to token count
    mapping(address => uint)  _balanceOf;

    // Mapping from token ID to approved address
    mapping(uint => address)  _approvals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool))  isApprovedForAll;
    }
    event Transfer(address indexed from, address indexed to, uint indexed id);
    event Approval(address indexed owner, address indexed spender, uint indexed id);
    event ApprovalForAll( address indexed owner, address indexed operator, bool approved );

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }

    function ownerOf(uint id) external view returns (address owner) {
        ERC721DATA storage s = getERC721Storage();
        owner = s._ownerOf[id];
        require(owner != address(0), "token doesn't exist");
    }

    function balanceOf(address owner) external view returns (uint) {
         ERC721DATA storage s = getERC721Storage();
        require(owner != address(0), "owner = zero address");
        return s._balanceOf[owner];
    }

    function setApprovalForAll(address operator, bool approved) external {
        ERC721DATA storage s = getERC721Storage();
        s.isApprovedForAll[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function approve(address spender, uint id) external {
        ERC721DATA storage s = getERC721Storage();
        address owner = s._ownerOf[id];
        require(
            msg.sender == owner || s.isApprovedForAll[owner][msg.sender],
            "not authorized"
        );

        s._approvals[id] = spender;

        emit Approval(owner, spender, id);
    }

    function getApproved(uint id) external view returns (address) {
        ERC721DATA storage s = getERC721Storage();
        require(s._ownerOf[id] != address(0), "token doesn't exist");
        return s._approvals[id];
    }

    function _isApprovedOrOwner(address owner,address spender,uint id) internal view returns (bool) {
        ERC721DATA storage s = getERC721Storage();
        return (spender == owner ||
            s.isApprovedForAll[owner][spender] ||
            spender == s._approvals[id]);
    }

    function transferFrom(address from, address to, uint id) public {
        ERC721DATA storage s = getERC721Storage();
        require(from == s._ownerOf[id], "from != owner");
        require(to != address(0), "transfer to zero address");

        require(_isApprovedOrOwner(from, msg.sender, id), "not authorized");

        s._balanceOf[from]--;
        s._balanceOf[to]++;
        s._ownerOf[id] = to;

        delete s._approvals[id];

        emit Transfer(from, to, id);
    }

    function safeTransferFrom(address from, address to, uint id) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, id, "") ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint id,
        bytes calldata data
    ) external {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                IERC721Receiver(to).onERC721Received(msg.sender, from, id, data) ==
                IERC721Receiver.onERC721Received.selector,
            "unsafe recipient"
        );
    }

    function _mint(address to, uint id) internal {
        ERC721DATA storage s = getERC721Storage();
        require(to != address(0), "mint to zero address");
        require(s._ownerOf[id] == address(0), "already minted");

        s._balanceOf[to]++;
        s._ownerOf[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint id) internal {
        ERC721DATA storage s = getERC721Storage();
        address owner =s._ownerOf[id];
        require(owner != address(0), "not minted");

        s._balanceOf[owner] -= 1;

        delete s._ownerOf[id];
        delete s._approvals[id];

        emit Transfer(owner, address(0), id);
    }
    function isApprovedForAll(address owner, address operator) external view returns (bool) {
    ERC721DATA storage s = getERC721Storage();
    return s.isApprovedForAll[owner][operator];
}
}

contract MyNFT is ERC721 {
     
    function mint(address to, uint id) external {
        _mint(to, id);
    }

    function burn(uint id) external {
         ERC721DATA storage s = getERC721Storage();
        require(msg.sender ==s._ownerOf[id], "not owner");
        _burn(id);
    }
}

