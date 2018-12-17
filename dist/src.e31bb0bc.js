// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/fireworks-canvas/fireworks.min.js":[function(require,module,exports) {
var define;
!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?module.exports=i():"function"==typeof define&&define.amd?define("Fireworks",i):t.Fireworks=i()}(this,function(){"use strict";function t(t,i){return Math.random()*(i-t)+t}var i=2*Math.PI,s=function(){function s(s){var e=s.isRocket,n=void 0!==e&&e,o=s.hue,h=void 0===o?t(1,360):o,r=s.brightness,a=void 0===r?t(50,60):r,c=s.position;if(this.isRocket=n,this.position=c,this.positions=[this.position,this.position,this.position],this.isRocket)this.velocity={x:t(-3,3),y:t(-7,-3)},this.shrink=.999,this.resistance=1;else{var p=t(0,i),l=15*Math.cos(t(0,i));this.velocity={x:Math.cos(p)*l,y:Math.sin(p)*l},this.shrink=t(0,.05)+.93,this.resistance=.92}this.gravity=.01,this.size=3,this.alpha=1,this.fade=0,this.hue=h,this.brightness=a}return s.prototype.clone=function(){return new s({position:{x:this.position.x,y:this.position.y},hue:this.hue,brightness:this.brightness})},s.prototype.shouldRemove=function(t,i){return this.alpha<=.1||this.size<=1||(this.position.x>t||this.position.x<0||(this.position.y>i||this.position.y<0))},s.prototype.shouldExplode=function(i,s,e){return!!this.isRocket&&(this.position.y<=i||!(this.position.y>=s)&&t(0,1)<=e)},s.prototype.update=function(){this.positions.pop(),this.positions.unshift({x:this.position.x,y:this.position.y}),this.velocity.x*=this.resistance,this.velocity.y*=this.resistance,this.velocity.y+=this.gravity,this.position.x+=this.velocity.x,this.position.y+=this.velocity.y,this.size*=this.shrink,this.alpha-=this.fade},s.prototype.draw=function(t){var i=this.positions[this.positions.length-1];t.beginPath(),t.moveTo(i.x,i.y),t.lineTo(this.position.x,this.position.y),t.lineWidth=this.size,t.strokeStyle="hsla("+this.hue+", 100%, "+this.brightness+"%, "+this.alpha+")",t.stroke()},s}(),e=function(){function i(t){var i=t.maxRockets,s=t.numParticles,e=t.cw,n=t.ch;this._set=new Set,this.rockets=0,this.maxRockets=i,this.numParticles=s,this.cw=e,this.ch=n}return i.prototype.size=function(){return this._set.size},i.prototype.entries=function(){return this._set},i.prototype.clear=function(){this._set.clear()},i.prototype.delete=function(t){this._set.delete(t)},i.prototype.add=function(t){this._set.add(t)},i.prototype.explode=function(t){this.rockets--;for(var i=0;i<this.numParticles;i+=1)this.add(t.clone());this.delete(t)},i.prototype.spawnRocket=function(){this.rockets++,this.add(new s({isRocket:!0,position:{x:t(0,this.cw),y:this.ch}}))},i.prototype.spawnRockets=function(){this.rockets<this.maxRockets&&this.spawnRocket()},i}();return function(){function t(t,i){var s=void 0===i?{}:i,n=s.rocketSpawnInterval,o=void 0===n?150:n,h=s.maxRockets,r=void 0===h?3:h,a=s.numParticles,c=void 0===a?100:a,p=s.explosionMinHeight,l=void 0===p?.2:p,u=s.explosionMaxHeight,d=void 0===u?.9:u,v=s.explosionChance,f=void 0===v?.08:v;this.rocketSpawnInterval=o,this.maxRockets=r,this.cw=t.clientWidth,this.ch=t.clientHeight,this.max_h=this.ch*(1-d),this.min_h=this.ch*(1-l),this.chance=f,this.canvas=document.createElement("canvas"),this.canvas.width=this.cw,this.canvas.height=this.ch,this.ctx=this.canvas.getContext("2d"),t.appendChild(this.canvas),this.things=new e({maxRockets:this.maxRockets,numParticles:c,cw:this.cw,ch:this.ch})}return t.prototype.destroy=function(){this.canvas.parentElement.removeChild(this.canvas),window.clearInterval(this.interval),window.cancelAnimationFrame(this.rafInterval)},t.prototype.start=function(){var t=this;return this.maxRockets>0&&(this.interval=window.setInterval(function(){return t.things.spawnRockets()},this.rocketSpawnInterval),this.rafInterval=window.requestAnimationFrame(function(){return t.update()})),function(){return t.stop()}},t.prototype.stop=function(){window.clearInterval(this.interval),this.interval=null},t.prototype.kill=function(){this.things.clear(),this.stop(),window.cancelAnimationFrame(this.rafInterval),this.rafInterval=null,this._clear(!0)},t.prototype.fire=function(){var t=this;this.things.spawnRocket(),this.rafInterval||(this.rafInterval=window.requestAnimationFrame(function(){return t.update()}))},t.prototype._clear=function(t){void 0===t&&(t=!1),this.ctx.globalCompositeOperation="destination-out",this.ctx.fillStyle="rgba(0, 0, 0 "+(t?"":", 0.5")+")",this.ctx.fillRect(0,0,this.cw,this.ch),this.ctx.globalCompositeOperation="lighter"},t.prototype.update=function(){var t,i,s=this;this._clear();try{for(var e=function(t){var i="function"==typeof Symbol&&t[Symbol.iterator],s=0;return i?i.call(t):{next:function(){return t&&s>=t.length&&(t=void 0),{value:t&&t[s++],done:!t}}}}(this.things.entries()),n=e.next();!n.done;n=e.next()){var o=n.value;o.draw(this.ctx),o.update(),o.shouldRemove(this.cw,this.ch)?this.things.delete(o):o.shouldExplode(this.max_h,this.min_h,this.chance)&&this.things.explode(o)}}catch(i){t={error:i}}finally{try{n&&!n.done&&(i=e.return)&&i.call(e)}finally{if(t)throw t.error}}this.interval||this.things.size()>0?this.rafInterval=window.requestAnimationFrame(function(){return s.update()}):(this._clear(!0),this.rafInterval=null)},t}()});

},{}],"main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./main.css");

var _fireworksCanvas = _interopRequireDefault(require("fireworks-canvas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default() {
  var container = document.getElementById('container');
  var options = {
    maxRockets: 30,
    // max # of rockets to spawn
    rocketSpawnInterval: 150,
    // millisends to check if new rockets should spawn
    numParticles: 1000,
    // number of particles to spawn when rocket explodes (+0-10)
    explosionMinHeight: 0.2,
    // percentage min height at which rockets can explode
    explosionMaxHeight: 0.9,
    // percentage max height before a particle is exploded
    explosionChance: 0.08 // chance in each tick the rocket will explode

  };
  var fireworks = new _fireworksCanvas.default(container, options);
  fireworks.start();
};

exports.default = _default;
},{"./main.css":"main.css","fireworks-canvas":"../node_modules/fireworks-canvas/fireworks.min.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _main = _interopRequireDefault(require("./main"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _main.default)();
},{"./main":"main.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49568" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map