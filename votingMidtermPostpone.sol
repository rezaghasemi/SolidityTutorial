// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract voting {
    
    address payable owner;
    mapping (address => bool) votedStudents;
    uint256[2] voteCount;
    uint startTime;
    


    constructor {
        owner = msg.sender;
        voteCount = [0,0];
        startTime = now;
    }

    modifier timeRestriction(){
        require(now <= startTime + 1 days);
        _;
    }

    function voting(string memory _vote) public payable timeRestriction {
        if (!votedStudents[msg.sender]){
            votedStudents[msg.sender] = true;
            if (_vote == "no"){
                voteCount[0]++;
            }else{
                voteCount[1]++;
                owner.transfer(0.05 ether);
            };
        }
    }





}