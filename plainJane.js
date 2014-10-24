(function (document, window, index) {

  "use strict";

  var plainJane = function (el, options) {

    /* exported addEvent, removeEvent, getChildren, addClass, removeClass */
    // fn arg can be an object or a function, thanks to handleEvent
    // read more at: http://www.thecssninja.com/javascript/handleevent
    var addEvent = function (el, evt, fn, bubble) {
      if ("addEventListener" in el) {
        // BBOS6 doesn't support handleEvent, catch and polyfill
        try {
          el.addEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.addEventListener(evt, function (e) {
              // Bind fn as this and set first arg as event object
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("attachEvent" in el) {
        // check if the callback is an object and contains handleEvent
        if (typeof fn === "object" && fn.handleEvent) {
          el.attachEvent("on" + evt, function () {
            // Bind fn as this
            fn.handleEvent.call(fn);
          });
        } else {
          el.attachEvent("on" + evt, fn);
        }
      }
    },
  
    removeEvent = function (el, evt, fn, bubble) {
      if ("removeEventListener" in el) {
        try {
          el.removeEventListener(evt, fn, bubble);
        } catch (e) {
          if (typeof fn === "object" && fn.handleEvent) {
            el.removeEventListener(evt, function (e) {
              fn.handleEvent.call(fn, e);
            }, bubble);
          } else {
            throw e;
          }
        }
      } else if ("detachEvent" in el) {
        if (typeof fn === "object" && fn.handleEvent) {
          el.detachEvent("on" + evt, function () {
            fn.handleEvent.call(fn);
          });
        } else {
          el.detachEvent("on" + evt, fn);
        }
      }
    },
  
    getChildren = function (e) {
      if (e.children.length < 1) {
        throw new Error("Error: No slides.");
      }
      // Store all children in array
      var children = [];
      // Loop through children and store in array if child != TextNode
      for (var i = 0; i < e.children.length; i++) {
        if (e.children[i].nodeType === 1) {
          children.push(e.children[i]);
        }
      }
      return children;
    },
  
    addClass = function (el, cls) {
      if (el.className.indexOf(cls) !== 0) {
        el.className += " " + cls;
        el.className = el.className.replace(/(^\s*)|(\s*$)/g,"");
      }
    },
  
    removeClass = function (el, cls) {
      var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
      el.className = el.className.replace(reg, " ").replace(/(^\s*)|(\s*$)/g,"");
    };

    var pJane,
      opts,
      slides,
      slideCount,
      prevButton,
      nextButton,
      dotsList,
      dotsListItem,
      slideTimer = null;

    var plainJane = function (el, options) {
        var i;

        // Default options
        this.options = {
          speed: 5000,
          runOnTimer: true,
          janeClass: 'plain-jane',
          activeClass: 'active-jane',
          prevClass: 'jane-prev',
          nextClass: 'jane-next',
          toggleMethod: 'buttons',
          pauseOnHover: true,
          displayToggle: true,
          onInit: function(){},
          onTransition: function(){},
          onDestroy: function(){}
        };

        // User defined options
        for (i in options) {
          this.options[i] = options[i];
        }

        // Wrapper
        this.wrapperEl = el.replace("#", "");

        // Try selecting ID first
        if (document.getElementById(this.wrapperEl)) {
          this.wrapper = document.getElementById(this.wrapperEl);

        // If element with an ID doesn't exist, use querySelector
        } else if (document.querySelector(this.wrapperEl)) {
          this.wrapper = document.querySelector(this.wrapperEl);

        // If element doesn't exists, stop here.
        } else {
          throw new Error("Error: Where is Jane?");
        }

        // Inner wrapper
        this.wrapper.inner = getChildren(this.wrapper);

        // For minification
        opts = this.options;
        pJane = this.wrapper;
        slides = this.wrapper.inner;
        slideCount = slides.length;

        // Init
        this._init(this);
      };

    plainJane.prototype = {

      // Public methods
      destroy: function () {

        removeClass(pJane, opts.janeClass);
        removeClass(pJane, opts.janeClass + "-" + this.index);

        for (var i = 0; i < slideCount; i++) {
          slides[i].style.display = 'block';
          removeClass(slides[i], opts.activeClass);
          slides[i].removeAttribute("data-index");
        }

        if (opts.pauseOnHover) {
          removeEvent(pJane, 'mouseover', this, false);
          removeEvent(pJane, 'mouseout', this, false);
        }

        if (opts.createButtons) {
          pJane.removeChild(prevButton);
          pJane.removeChild(nextButton);
        }

        clearInterval(slideTimer);
        slideTimer = null;

        // Destroy callback
        opts.onDestroy();
      },

      handleEvent: function (e) {
        var evt = e || window.event;
        var src = evt.target || evt.srcElement;

        switch (evt.type) {
        case "click":
          if (src.className == opts.nextClass) {
            this._nextSlide();
          } else if (src.className == opts.prevClass) {
            this._prevSlide();
          }
          break;
        case "mouseover":
          this._pauseTimer();
          break;
        case "mouseout":
          this._resumeTimer();
          break;
        }
      },

      // Private methods
      _init: function () {
        this.index = index++;

        addClass(pJane, opts.janeClass);
        addClass(pJane, opts.janeClass + "-" + this.index);

        for (var i = 0; i < slideCount; i++) {
          if (i > 0) {
            if (opts.displayToggle) {
              slides[i].style.display = 'none';
            }
          } else {
            addClass(slides[i], opts.activeClass);
          }
          slides[i].setAttribute("data-index", i);
        }

        if (opts.toggleMethod && slideCount > 1) {
          this._toggleMethod();
        }

        if (opts.pauseOnHover) {
          addEvent(pJane, "mouseover", this, false);
          addEvent(pJane, "mouseout", this, false);
        }

        var that = this;
        if (slideTimer == null && opts.runOnTimer) {
          slideTimer = setInterval(function(){ that._nextSlide() }, opts.speed);
        }

        // Init callback
        opts.onInit();
      },

      _toggleMethod: function () {
        switch (opts.toggleMethod) {
          case "dots":
            dotsList = document.createElement("ul");
            addClass(dotsList, opts.dotsClass);
            for (var x = 1; x <= slideCount; x++) {
              dotsListItem = document.createElement("li");
              addClass(dotsListItem, opts.dotClass);
              if (x == 1) {
                addClass(dotsListItem, opts.activeDotClass);
              }
              dotsListItem.innerHTML = x;
              addEvent(dotsListItem, "click", this, false);
              dotsList.appendChild(dotsListItem);
            }
            pJane.appendChild(dotsList);
            break;
          default: // since default is 'buttons', make buttons
            // previous button
            prevButton = document.createElement("button");
            prevButton.innerHTML = '&laquo;';
            prevButton.setAttribute("type","button");
            addClass(prevButton, opts.prevClass);
            addEvent(prevButton, "click", this, false);
            // next button
            nextButton = document.createElement("button");
            nextButton.innerHTML = '&raquo;';
            nextButton.setAttribute("type","button");
            addClass(nextButton, opts.nextClass);
            addEvent(nextButton, "click", this, false);
            pJane.appendChild(prevButton);
            pJane.appendChild(nextButton);
            break;
        }
      },

      _pauseTimer: function (e) {
        clearInterval(slideTimer);
        slideTimer = null;
      },

      _resumeTimer: function (e) {
        var that = this;
        if (slideTimer == null && opts.runOnTimer) {
          slideTimer = setInterval(function(){ that._nextSlide() }, opts.speed);
        }
      },

      _prevSlide: function (e) {
        var janePrev = parseInt(document.querySelector("."+opts.activeClass).getAttribute("data-index"));
        var janeNext = janePrev - 1;
        if (janeNext < 0) { janeNext = slideCount - 1; }
        this._moveSlide(janePrev, janeNext);
      },

      _nextSlide: function (e) {
        var janePrev = parseInt(document.querySelector("."+opts.activeClass).getAttribute("data-index"));
        var janeNext = janePrev + 1;
        if (janeNext >= slideCount) { janeNext = 0; }
        this._moveSlide(janePrev, janeNext);
      },

      _moveSlide: function (janePrev, janeNext) {
        if (opts.displayToggle) {
          slides[janePrev].style.display = 'none';
          slides[janeNext].style.display = 'block';
        }
      	removeClass(slides[janePrev], opts.activeClass);
      	addClass(slides[janeNext], opts.activeClass);

        // Transition callback
        opts.onTransition();
      }

    };

    return new plainJane(el, options);

  };

  window.plainJane = plainJane;

}(document, window, 0));