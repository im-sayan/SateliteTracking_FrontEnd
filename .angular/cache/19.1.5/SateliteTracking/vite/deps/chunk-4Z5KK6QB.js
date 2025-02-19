import {
  MAC,
  WEBKIT
} from "./chunk-AX5WOFAA.js";
import {
  assert
} from "./chunk-IJQ6LSTY.js";
import {
  EventType_default,
  FALSE,
  TRUE
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/MapBrowserEventType.js
var MapBrowserEventType_default = {
  /**
   * A true single click with no dragging and no double click. Note that this
   * event is delayed by 250 ms to ensure that it is not a double click.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#singleclick
   * @api
   */
  SINGLECLICK: "singleclick",
  /**
   * A click with no dragging. A double click will fire two of this.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#click
   * @api
   */
  CLICK: EventType_default.CLICK,
  /**
   * A true double click, with no dragging.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#dblclick
   * @api
   */
  DBLCLICK: EventType_default.DBLCLICK,
  /**
   * Triggered when a pointer is dragged.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointerdrag
   * @api
   */
  POINTERDRAG: "pointerdrag",
  /**
   * Triggered when a pointer is moved. Note that on touch devices this is
   * triggered when the map is panned, so is not the same as mousemove.
   * @event module:ol/MapBrowserEvent~MapBrowserEvent#pointermove
   * @api
   */
  POINTERMOVE: "pointermove",
  POINTERDOWN: "pointerdown",
  POINTERUP: "pointerup",
  POINTEROVER: "pointerover",
  POINTEROUT: "pointerout",
  POINTERENTER: "pointerenter",
  POINTERLEAVE: "pointerleave",
  POINTERCANCEL: "pointercancel"
};

// node_modules/ol/events/condition.js
function all(var_args) {
  const conditions = arguments;
  return function(event) {
    let pass = true;
    for (let i = 0, ii = conditions.length; i < ii; ++i) {
      pass = pass && conditions[i](event);
      if (!pass) {
        break;
      }
    }
    return pass;
  };
}
var altKeyOnly = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var altShiftKeysOnly = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var focus = function(event) {
  const targetElement = event.map.getTargetElement();
  const rootNode = targetElement.getRootNode();
  const activeElement = event.map.getOwnerDocument().activeElement;
  return rootNode instanceof ShadowRoot ? rootNode.host.contains(activeElement) : targetElement.contains(activeElement);
};
var focusWithTabindex = function(event) {
  const targetElement = event.map.getTargetElement();
  const rootNode = targetElement.getRootNode();
  const tabIndexCandidate = rootNode instanceof ShadowRoot ? rootNode.host : targetElement;
  return tabIndexCandidate.hasAttribute("tabindex") ? focus(event) : true;
};
var always = TRUE;
var click = function(mapBrowserEvent) {
  return mapBrowserEvent.type == MapBrowserEventType_default.CLICK;
};
var mouseActionButton = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {MouseEvent} */
    mapBrowserEvent.originalEvent
  );
  return originalEvent.button == 0 && !(WEBKIT && MAC && originalEvent.ctrlKey);
};
var never = FALSE;
var pointerMove = function(mapBrowserEvent) {
  return mapBrowserEvent.type == "pointermove";
};
var singleClick = function(mapBrowserEvent) {
  return mapBrowserEvent.type == MapBrowserEventType_default.SINGLECLICK;
};
var doubleClick = function(mapBrowserEvent) {
  return mapBrowserEvent.type == MapBrowserEventType_default.DBLCLICK;
};
var noModifierKeys = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var platformModifierKeyOnly = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return !originalEvent.altKey && (MAC ? originalEvent.metaKey : originalEvent.ctrlKey) && !originalEvent.shiftKey;
};
var platformModifierKey = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return MAC ? originalEvent.metaKey : originalEvent.ctrlKey;
};
var shiftKeyOnly = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  return !originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey) && originalEvent.shiftKey;
};
var targetNotEditable = function(mapBrowserEvent) {
  const originalEvent = (
    /** @type {KeyboardEvent|MouseEvent|TouchEvent} */
    mapBrowserEvent.originalEvent
  );
  const tagName = (
    /** @type {Element} */
    originalEvent.target.tagName
  );
  return tagName !== "INPUT" && tagName !== "SELECT" && tagName !== "TEXTAREA" && // `isContentEditable` is only available on `HTMLElement`, but it may also be a
  // different type like `SVGElement`.
  // @ts-ignore
  !originalEvent.target.isContentEditable;
};
var mouseOnly = function(mapBrowserEvent) {
  const pointerEvent = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvent !== void 0, "mapBrowserEvent must originate from a pointer event");
  return pointerEvent.pointerType == "mouse";
};
var touchOnly = function(mapBrowserEvent) {
  const pointerEvt = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvt !== void 0, "mapBrowserEvent must originate from a pointer event");
  return pointerEvt.pointerType === "touch";
};
var penOnly = function(mapBrowserEvent) {
  const pointerEvt = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvt !== void 0, "mapBrowserEvent must originate from a pointer event");
  return pointerEvt.pointerType === "pen";
};
var primaryAction = function(mapBrowserEvent) {
  const pointerEvent = (
    /** @type {import("../MapBrowserEvent").default} */
    mapBrowserEvent.originalEvent
  );
  assert(pointerEvent !== void 0, "mapBrowserEvent must originate from a pointer event");
  return pointerEvent.isPrimary && pointerEvent.button === 0;
};

export {
  MapBrowserEventType_default,
  all,
  altKeyOnly,
  altShiftKeysOnly,
  focus,
  focusWithTabindex,
  always,
  click,
  mouseActionButton,
  never,
  pointerMove,
  singleClick,
  doubleClick,
  noModifierKeys,
  platformModifierKeyOnly,
  platformModifierKey,
  shiftKeyOnly,
  targetNotEditable,
  mouseOnly,
  touchOnly,
  penOnly,
  primaryAction
};
//# sourceMappingURL=chunk-4Z5KK6QB.js.map
