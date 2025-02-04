import {
  Control_default,
  MapProperty_default
} from "./chunk-CCENDKLH.js";
import {
  CLASS_CONTROL,
  CLASS_UNSELECTABLE,
  CLASS_UNSUPPORTED
} from "./chunk-4UFEOFXY.js";
import {
  replaceNode
} from "./chunk-TALNCFXE.js";
import {
  listen,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import {
  EventType_default
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/control/FullScreen.js
var events = ["fullscreenchange", "webkitfullscreenchange"];
var FullScreenEventType = {
  /**
   * Triggered after the map entered fullscreen.
   * @event FullScreenEventType#enterfullscreen
   * @api
   */
  ENTERFULLSCREEN: "enterfullscreen",
  /**
   * Triggered after the map leave fullscreen.
   * @event FullScreenEventType#leavefullscreen
   * @api
   */
  LEAVEFULLSCREEN: "leavefullscreen"
};
var FullScreen = class extends Control_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      element: document.createElement("div"),
      target: options.target
    });
    this.on;
    this.once;
    this.un;
    this.keys_ = options.keys !== void 0 ? options.keys : false;
    this.source_ = options.source;
    this.isInFullscreen_ = false;
    this.boundHandleMapTargetChange_ = this.handleMapTargetChange_.bind(this);
    this.cssClassName_ = options.className !== void 0 ? options.className : "ol-full-screen";
    this.documentListeners_ = [];
    this.activeClassName_ = options.activeClassName !== void 0 ? options.activeClassName.split(" ") : [this.cssClassName_ + "-true"];
    this.inactiveClassName_ = options.inactiveClassName !== void 0 ? options.inactiveClassName.split(" ") : [this.cssClassName_ + "-false"];
    const label = options.label !== void 0 ? options.label : "⤢";
    this.labelNode_ = typeof label === "string" ? document.createTextNode(label) : label;
    const labelActive = options.labelActive !== void 0 ? options.labelActive : "×";
    this.labelActiveNode_ = typeof labelActive === "string" ? document.createTextNode(labelActive) : labelActive;
    const tipLabel = options.tipLabel ? options.tipLabel : "Toggle full-screen";
    this.button_ = document.createElement("button");
    this.button_.title = tipLabel;
    this.button_.setAttribute("type", "button");
    this.button_.appendChild(this.labelNode_);
    this.button_.addEventListener(EventType_default.CLICK, this.handleClick_.bind(this), false);
    this.setClassName_(this.button_, this.isInFullscreen_);
    this.element.className = `${this.cssClassName_} ${CLASS_UNSELECTABLE} ${CLASS_CONTROL}`;
    this.element.appendChild(this.button_);
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(event) {
    event.preventDefault();
    this.handleFullScreen_();
  }
  /**
   * @private
   */
  handleFullScreen_() {
    const map = this.getMap();
    if (!map) {
      return;
    }
    const doc = map.getOwnerDocument();
    if (!isFullScreenSupported(doc)) {
      return;
    }
    if (isFullScreen(doc)) {
      exitFullScreen(doc);
    } else {
      let element;
      if (this.source_) {
        element = typeof this.source_ === "string" ? doc.getElementById(this.source_) : this.source_;
      } else {
        element = map.getTargetElement();
      }
      if (this.keys_) {
        requestFullScreenWithKeys(element);
      } else {
        requestFullScreen(element);
      }
    }
  }
  /**
   * @private
   */
  handleFullScreenChange_() {
    const map = this.getMap();
    if (!map) {
      return;
    }
    const wasInFullscreen = this.isInFullscreen_;
    this.isInFullscreen_ = isFullScreen(map.getOwnerDocument());
    if (wasInFullscreen !== this.isInFullscreen_) {
      this.setClassName_(this.button_, this.isInFullscreen_);
      if (this.isInFullscreen_) {
        replaceNode(this.labelActiveNode_, this.labelNode_);
        this.dispatchEvent(FullScreenEventType.ENTERFULLSCREEN);
      } else {
        replaceNode(this.labelNode_, this.labelActiveNode_);
        this.dispatchEvent(FullScreenEventType.LEAVEFULLSCREEN);
      }
      map.updateSize();
    }
  }
  /**
   * @param {HTMLElement} element Target element
   * @param {boolean} fullscreen True if fullscreen class name should be active
   * @private
   */
  setClassName_(element, fullscreen) {
    if (fullscreen) {
      element.classList.remove(...this.inactiveClassName_);
      element.classList.add(...this.activeClassName_);
    } else {
      element.classList.remove(...this.activeClassName_);
      element.classList.add(...this.inactiveClassName_);
    }
  }
  /**
   * Remove the control from its current map and attach it to the new map.
   * Pass `null` to just remove the control from the current map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   * @override
   */
  setMap(map) {
    const oldMap = this.getMap();
    if (oldMap) {
      oldMap.removeChangeListener(MapProperty_default.TARGET, this.boundHandleMapTargetChange_);
    }
    super.setMap(map);
    this.handleMapTargetChange_();
    if (map) {
      map.addChangeListener(MapProperty_default.TARGET, this.boundHandleMapTargetChange_);
    }
  }
  /**
   * @private
   */
  handleMapTargetChange_() {
    const listeners = this.documentListeners_;
    for (let i = 0, ii = listeners.length; i < ii; ++i) {
      unlistenByKey(listeners[i]);
    }
    listeners.length = 0;
    const map = this.getMap();
    if (map) {
      const doc = map.getOwnerDocument();
      if (isFullScreenSupported(doc)) {
        this.element.classList.remove(CLASS_UNSUPPORTED);
      } else {
        this.element.classList.add(CLASS_UNSUPPORTED);
      }
      for (let i = 0, ii = events.length; i < ii; ++i) {
        listeners.push(listen(doc, events[i], this.handleFullScreenChange_, this));
      }
      this.handleFullScreenChange_();
    }
  }
};
function isFullScreenSupported(doc) {
  const body = doc.body;
  return !!(body["webkitRequestFullscreen"] || body.requestFullscreen && doc.fullscreenEnabled);
}
function isFullScreen(doc) {
  return !!(doc["webkitIsFullScreen"] || doc.fullscreenElement);
}
function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element["webkitRequestFullscreen"]) {
    element["webkitRequestFullscreen"]();
  }
}
function requestFullScreenWithKeys(element) {
  if (element["webkitRequestFullscreen"]) {
    element["webkitRequestFullscreen"]();
  } else {
    requestFullScreen(element);
  }
}
function exitFullScreen(doc) {
  if (doc.exitFullscreen) {
    doc.exitFullscreen();
  } else if (doc["webkitExitFullscreen"]) {
    doc["webkitExitFullscreen"]();
  }
}
var FullScreen_default = FullScreen;

export {
  FullScreen_default
};
//# sourceMappingURL=chunk-CVLQ672G.js.map
