// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract votingMidtermPostpone {
    
    address payable owner;
    mapping (address => bool) votedStudents;
    uint256[2] voteCount;
    uint startTime;
    


    constructor () {
        owner = payable(msg.sender);
        voteCount = [0,0];
        startTime = block.timestamp;
    }

    modifier timeRestriction(){
        require(block.timestamp <= startTime + 1 days);
        _;
    }

    function voting(uint _vote) payable public  timeRestriction { 
 
        if (!votedStudents[msg.sender]){
            votedStudents[msg.sender] = true;
            if (_vote == 0){
                voteCount[0]++;
            }else{
                voteCount[1]++;
            }
        }
    }

    function getResults() public view returns (uint256[2] memory) {
        return (voteCount);
    }


}