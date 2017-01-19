/* TOOLS.js */

// tools.js
// ========
module.exports = function() {
    //this.sum = function(a,b) { return a+b };
    //this.multiply = function(a,b) { return a*b };
    
    this.tvChannel = function(channel){
    	return fetch('http://apis.is/tv/')
      .then((response) => response.json())
      .then((responseJson) => {
      	console.log("Array of result: ", responseJson.tv);
        return responseJson.tv;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }