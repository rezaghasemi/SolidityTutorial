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

    //   contractAddress = "";
    //   contractABI = "";
    //   myContract = new web3.eth.Contract(contractABI, contractAddress);

 document.getElementById("showVoteCountButton").onclick = function(){
    myContrac.methods.getResults().call(option,function(err,result){
        if (!err){
            document.getElementById("showVoteCount").innerHTML = "No,Yes = " + result

        }


    })



 }

      
      

  
  
}