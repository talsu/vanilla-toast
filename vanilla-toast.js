(function () {
  "use strict";

  var VanillaToast = (function () {
    function VanillaToast() {
      this.queue = new TaskQueue();
      this.element = null;
    }

    var constants = {
      default: {
        background: 'rgba(0, 0, 0, 0.76)',
        color: 'white',
        fadeDuration: 400,
        fadeInterval: 16,
        duration: 2000,
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: '1rem'
      },
      success: {
        background: 'rgb(92, 184, 92, 0.76)',
        color: 'white',
      },
      info: {
        background: 'rgb(91, 192, 222, 0.76)',
        color: 'white',
      },
      warning: {
        background: 'rgb(236, 151, 31, 0.76)',
        color: 'white',
      },
      error: {
        background: 'rgb(201, 48, 44, 0.76)',
        color: 'white',
        duration: 3000,
        closeButton: true
      }
    };

    VanillaToast.prototype.initElement = function (selector) {
      // create elements.
      var container = document.createElement('div');
      var toastBox = document.createElement('div');
      var text = document.createElement('div');
      var closeButton = document.createElement('span');

      container.setAttribute("id", "vanilla-toast-container");
      container.style.textAlign = 'center';
      container.style.bottom = '0px';
      container.style.left = '0px';
      container.style.right = '0px';
      container.style.position = 'fixed';

      toastBox.setAttribute("id", "vanilla-toast-box");
      toastBox.style.display = 'none';
      toastBox.style.cursor = 'pointer';
      toastBox.style.padding = '15px';
      toastBox.style.borderRadius = '15px';
      toastBox.style.marginLeft = '15px';
      toastBox.style.marginRight = '15px';
      toastBox.style.marginBottom = '30px';

      text.setAttribute("id", "vanilla-toast-text");
      text.style.display = 'inline';

      closeButton.setAttribute("id", "vanilla-toast-close-button");
      closeButton.innerHTML = '&#10006;';
      closeButton.style.display = 'none';
      closeButton.style.marginLeft = '15px';
      closeButton.style.fontSize = '15px';

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

      this._setStyle(constants.default);
    };

    VanillaToast.prototype._setStyle = function (option) {
      this.element.toastBox.style.background = option.background || constants.default.background;
      this.element.toastBox.style.color = option.color || constants.default.color;
      this.element.toastBox.style.fontFamily = option.fontFamily || constants.default.fontFamily;
      this.element.text.style.fontSize = option.fontSize || constants.default.fontSize;
    };

    // show toast
    VanillaToast.prototype.show = function (text, option, callback) {
      var self = this;
      if (!self.element) self.initElement();
      if (!option) option = {};

      // enqueue
      self.queue.enqueue(function(next) {
        // time setting
        var fadeDuration = option.fadeDuration || constants.default.fadeDuration;
        var fadeInterval = option.fadeInterval || constants.default.fadeInterval;
        var fadeStep = Math.min(fadeInterval / fadeDuration, 1);
        var duration = option.duration || constants.default.duration;

        // close button setting
        self.element.closeButton.style.display =
          option.closeButton ? 'inline' : 'none';

        // set text
        self.element.text.innerHTML = text;

        // set visible
        var s = self.element.toastBox.style;
        s.opacity = 0;
        s.display = 'inline-block';

        // set styles
        self._setStyle(option);

        // timeoutId
        var timeoutId = null;

        // duration timeout callback.
        var timeoutCallback = function() {
          // release click clickHandler
          self.element.toastBox.removeEventListener('click', clickHandler);
          self.hide(option, function() {
            if (callback) callback();
            next();
          });
        };

        // click for close handler
        var clickHandler = function() {
          if (!timeoutId) return;
          clearTimeout(timeoutId);
          timeoutCallback();
        };

        // start fade in.
        self._fade(s, fadeStep, fadeInterval, function() {
          // show while duration time and hide.
          self.element.toastBox.addEventListener('click', clickHandler);
          timeoutId = setTimeout(timeoutCallback, duration);
        });
      });

      return self;
    };

    // hide toast
    VanillaToast.prototype.hide = function (option, callback) {
      var self = this;
      if (!option) option = {};

      // time setting
      var fadeDuration = option.fadeDuration || constants.default.fadeDuration;
      var fadeInterval = option.fadeInterval || constants.default.fadeInterval;
      var fadeStep = Math.min(fadeInterval / fadeDuration, 1);

      // set visible
      var s = self.element.toastBox.style;
      s.opacity = 1;

      // start fade out and call callback function.
      self._fade(s, -fadeStep, fadeInterval, function () {
        s.display = 'none';
        if (callback) callback();
      });

      return self;
    };

    // run fade animation
    VanillaToast.prototype._fade = function (style, step, interval, callback) {
      (function fade() {
        style.opacity = Number(style.opacity) + step;
        if (step < 0 && style.opacity < 0) {
          if (callback) callback();
        } else if (step > 0 && style.opacity >= 1) {
          if (callback) callback();
        } else {
          setTimeout(fade, interval);
        }
      })();
    };

    // create preset methods
    for (var item in constants) {
      (function(preset){
        VanillaToast.prototype[preset] = function (text, option, callback) {
          if (!option) option = {};

          // copy preset options
          for (var propertyName in constants[preset]) {
            if (option[propertyName] === undefined)
              option[propertyName] = constants[preset][propertyName];
          }

          return this.show(text, option, callback);
        };
      })(item);
    }

    return VanillaToast;
  })();

  // TaskQueue from https://github.com/talsu/async-task-queue
  var TaskQueue = (function () {
    function TaskQueue() {
      this.queue = [];
      this.isExecuting = false;
    }

    // enqueue job. run immediately.
    TaskQueue.prototype.enqueue = function (job) {
      // enqueue.
      this.queue.push(job);
      // call execute.
      dequeueAndExecute(this);
    };

    // Dequeue and execute job.
    function dequeueAndExecute (self) {
      if (self.isExecuting) return;

      // Dequeue Job.
      var job = self.queue.shift();
      if (!job) return;

      //Execute Job.
      self.isExecuting = true;

      // Pass next job execute callback.
      job(function() {
        self.isExecuting = false;
        dequeueAndExecute(self);
      });
    }

    return TaskQueue;
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
