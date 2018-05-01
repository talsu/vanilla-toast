(function () {
  "use strict";

  var VanillaToast = (function () {
    function VanillaToast() {
      this.element = null;
    }

    VanillaToast.prototype.initElement = function () {
      var container = document.createElement('div');
      var toastBox = document.createElement('div');
      var text = document.createElement('div');
      var closeButton = document.createElement('span');

      container.style.textAlign = 'center';
      container.style.bottom = '0px';
      container.style.position = 'fixed';

      toastBox.style.display = 'inline-block';
      toastBox.style.background = '#000000c2';
      toastBox.style.color = 'white';
      toastBox.style.padding = '15px';
      toastBox.style.borderRadius = '15px';
      toastBox.style.marginLeft = '15px';
      toastBox.style.marginRight = '15px';
      toastBox.style.marginBottom = '30px';

      closeButton.innerHTML = '&#10006;';
      closeButton.style.display = 'none';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '25px';

      toastBox.append(text);
      toastBox.append(closeButton);
      container.append(toastBox);
      document.body.append(container);

      this.element = {
        container : container,
        toastBox : toastBox,
        text : text,
        closeButton : closeButton
      };
    };

    VanillaToast.prototype.show = function (text) {
      this.element.text.innerHTML = text;
    };

    VanillaToast.prototype.showCloseButton = function() {
      this.element.toastBox.style.paddingRight = '25px';
      this.element.closeButton.style.display = 'block';
    };

    VanillaToast.prototype.hideCloseButton = function() {
      this.element.toastBox.style.paddingRight = '15px';
      this.element.closeButton.style.display = 'none';
    };

    VanillaToast.prototype.some = function (p) {
      console.log(p);
      return p;
    };

    return VanillaToast;
  })();

  // export
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = new VanillaToast();
    }
    exports.vanillaToast = new VanillaToast();
  } else {
    this.vanillaToast = new VanillaToast();
  }
}.call(this));
