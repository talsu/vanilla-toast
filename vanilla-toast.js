(function () {
  "use strict";

  var VanillaToast = (function () {
    function VanillaToast() {
      this.element = null;
    }

    VanillaToast.prototype.initElement = function (selector) {
      var container = document.createElement('div');
      var toastBox = document.createElement('div');
      var text = document.createElement('div');
      var closeButton = document.createElement('span');

      container.style.textAlign = 'center';
      container.style.bottom = '0px';
      container.style.left = '0px';
      container.style.right = '0px';
      container.style.position = 'fixed';

      toastBox.style.display = 'none';
      toastBox.style.cursor = 'pointer';
      toastBox.style.background = '#000000c2';
      toastBox.style.color = 'white';
      toastBox.style.padding = '15px';
      toastBox.style.borderRadius = '15px';
      toastBox.style.marginLeft = '15px';
      toastBox.style.marginRight = '15px';
      toastBox.style.marginBottom = '30px';

      text.style.display = 'inline';

      closeButton.innerHTML = '&#10006;';
      closeButton.style.display = 'none';
      closeButton.style.marginLeft = '15px';

      toastBox.appendChild(text);
      toastBox.appendChild(closeButton);
      container.appendChild(toastBox);

      if (selector) {
        document.getElementById(seletor).appendChild(containter);
      } else {
        document.body.appendChild(container);
      }

      this.element = {
        container : container,
        toastBox : toastBox,
        text : text,
        closeButton : closeButton
      };
    };

    VanillaToast.prototype.show = function (text, callback) {
      var duration = 400;
      var step = .01;
      var interval = duration*step;
      var s = this.element.toastBox.style;
      s.opacity = 0;
      s.display = 'inline-block';
      (function fade() {
        if ((s.opacity=step+Number(s.opacity))>=1) {
          if (callback) callback();
        } else {
          setTimeout(fade, interval);
        }
      })();

      this.element.text.innerHTML = text;

    };

    VanillaToast.prototype.hide = function (callback) {
      var duration = 400;
      var step = .01;
      var interval = duration*step;
      var s = this.element.toastBox.style;
      s.opacity = 1;
      (function fade() {
        if ((s.opacity-=step)<0) {
          s.display = 'none';
          if (callback) callback();
        } else {
          setTimeout(fade, interval);
        }
      })();
    };

    VanillaToast.prototype.showCloseButton = function() {
      // this.element.toastBox.style.paddingRight = '25px';
      this.element.closeButton.style.display = 'inline';
    };

    VanillaToast.prototype.hideCloseButton = function() {
      // this.element.toastBox.style.paddingRight = '15px';
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
