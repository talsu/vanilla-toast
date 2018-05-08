// is Node.js
if (typeof module !== 'undefined' && module.exports) {
  var vanillaToast = require('../vanilla-toast');
  var assert = require('chai').assert;
} else {
  var assert = chai.assert;
}

describe('vanilla-toast test', function(){
  it('should be run with default duration.', function(done){
    this.timeout(10000);
    vanillaToast.show(
      'default duration.',
      null,
      function() {
        done();
      });
  });
  it('should be run with custom duration.', function(done){
    this.timeout(5000);
    vanillaToast.show(
      'custom duration - {duration:3000, fadeDuration:400}',
      {duration:3000, fadeDuration:400},
      function() {
        done();
      });
  });
});
