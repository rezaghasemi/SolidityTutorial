window.onload = async function () {
    var metamask = false;
      if (window.ethereum) {
          window.web3 = new Web3(ethereum);
          metamask = true;
          try {
              await ethereum.enable();
              accounts= await web3.eth.getAccounts();
              option={from: accounts[0] };
          } catch (error) {
              // User denied account access...
          }
      }
      // Legacy  browsers...
      else if (window.web3) {
          window.web3 = new Web3(web3.currentProvider);
          metamask = true;
          // Acccounts always exposed
          try {
              web3.eth.defaultAccount = web3.eth.accounts[0];
              option = {from: web3.eth.accounts[0]}
          } catch (error) {
  
          }
          web3.eth.sendTransaction({/* ... */});
      }
      // Non-dapp browsers...
      else {
          web3 = new Web3(new Web3.providers.HttpProvider(inforaUrl));
          var account = web3.eth.accounts.create();
          option = {from: account.address};
      }

// #############################

    contractAddress = "0xdc488cc0a4e5cf557a77ebc0e5c84fa7d719d543";
    contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"_vote","type":"uint256"}],"name":"voting","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getPenaltyValue","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getResults","outputs":[{"internalType":"uint256[2]","name":"","type":"uint256[2]"}],"stateMutability":"view","type":"function"}];
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    var penaltyValue;


    myContract.methods.getPenaltyValue().call(option,function(error,result){
        if(!error){
            penaltyValue = result;
            document.getElementById("penalty").innerHTML += penaltyValue;
        };
      });


      document.getElementById("showVoteCountButton").onclick = function(){
        myContract.methods.getResults().call(option,function(err,result){
            if (!err){
                document.getElementById("showVoteCount").innerHTML = "NoOO = " + result[0]+", Yes = " + result[1];
                
            }})
        };


        document.getElementById("voteNo").onclick = function(){

            myContract.methods.voting(0).send(option,function(err,result){
                if (!err){
                    alert("you voted No!")
                };
            });
            
        };
      
        document.getElementById("voteYes").onclick = function(penalty = penaltyValue){
            myContract.methods.voting(1).send({from: option, value : penalty}},function(err,result){
                if(!err){
                    alert("Great! You voted yes.");
                };


            });


        }

// ###############################
    }



 

      
      

  
  
