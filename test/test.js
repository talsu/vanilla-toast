// is Node.js
if (typeof module !== 'undefined' && module.exports) {
  var vanillaToast = require('../vanilla-toast');
  var assert = require('chai').assert;
} else {
  var assert = chai.assert;
}

describe('vanilla-toast test', function(){
  it('should be success', function(done){
    assert.equal(vanillaToast.some('asdf'), 'asdf');
    done();
  });

  it('should be run ui', function(done){
    vanillaToast.initElement();
    vanillaToast.show('asdf\nasdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdf');
    //vanillaToast.showCloseButton();
    done();
  });
});
