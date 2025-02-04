import {
  Vector_default as Vector_default2
} from "./chunk-DUBCJMTK.js";
import "./chunk-WEXFOBJA.js";
import "./chunk-HM3IY3H4.js";
import {
  Circle_default,
  GeometryCollection_default,
  LineString_default,
  MultiLineString_default,
  MultiPoint_default,
  MultiPolygon_default,
  RBush_default,
  VectorEventType_default,
  Vector_default
} from "./chunk-EDRYIJN6.js";
import "./chunk-5K73XM64.js";
import {
  Feature_default
} from "./chunk-TYRNN5GE.js";
import {
  DoubleClickZoom_default,
  DragBox_default,
  DragPan_default,
  DragRotate_default,
  DragZoom_default,
  Interaction_default,
  KeyboardPan_default,
  KeyboardZoom_default,
  MapBrowserEvent_default,
  MouseWheelZoom_default,
  PinchRotate_default,
  PinchZoom_default,
  Pointer_default,
  Property_default,
  defaults
} from "./chunk-JX6G7I4E.js";
import "./chunk-S7Q7BWLM.js";
import "./chunk-GKPGQ42P.js";
import "./chunk-GQU4XHOU.js";
import {
  createEditingStyle
} from "./chunk-N4P2OMPA.js";
import "./chunk-LSEJCB2Y.js";
import "./chunk-655M5QKT.js";
import "./chunk-5CXUNJWW.js";
import {
  CollectionEventType_default,
  Collection_default
} from "./chunk-BDEWHVOF.js";
import "./chunk-RE7YPHWR.js";
import {
  MapEventType_default
} from "./chunk-ZO3Y5Y6G.js";
import "./chunk-4UFEOFXY.js";
import "./chunk-TALNCFXE.js";
import {
  MapBrowserEventType_default,
  altKeyOnly,
  always,
  mouseOnly,
  never,
  noModifierKeys,
  primaryAction,
  shiftKeyOnly,
  singleClick
} from "./chunk-4Z5KK6QB.js";
import "./chunk-AX5WOFAA.js";
import "./chunk-GVA6PU2J.js";
import {
  Polygon_default,
  fromCircle,
  fromExtent
} from "./chunk-II5KOT2H.js";
import {
  Point_default,
  getStrideForLayout
} from "./chunk-JDURIDCO.js";
import {
  boundingExtent,
  buffer,
  closestOnCircle,
  closestOnSegment,
  createEmpty,
  createOrUpdateFromCoordinate,
  distance,
  equals2,
  fromUserCoordinate,
  fromUserExtent,
  get,
  getArea,
  getUserProjection,
  squaredDistance as squaredDistance2,
  squaredDistanceToSegment,
  toUserCoordinate,
  toUserExtent
} from "./chunk-KD5NYAAV.js";
import {
  clamp,
  squaredDistance,
  toFixed
} from "./chunk-UVCLGJLE.js";
import "./chunk-BPFTGO52.js";
import {
  Event_default,
  getUid,
  listen,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import {
  clear
} from "./chunk-VNWMKJWE.js";
import "./chunk-IJQ6LSTY.js";
import {
  EventType_default,
  FALSE,
  TRUE,
  equals,
  extend
} from "./chunk-ZD2NNC7F.js";
import "./chunk-4MWRP73S.js";

// node_modules/ol/interaction/DblClickDragZoom.js
var DblClickDragZoom = class extends Interaction_default {
  /**
   * @param {Options} [opt_options] Options.
   */
  constructor(opt_options) {
    const options = opt_options ? opt_options : {};
    super(
      /** @type {import("./Interaction.js").InteractionOptions} */
      options
    );
    if (options.stopDown) {
      this.stopDown = options.stopDown;
    }
    this.scaleDeltaByPixel_ = options.delta ? options.delta : 0.01;
    this.duration_ = options.duration !== void 0 ? options.duration : 250;
    this.handlingDownUpSequence_ = false;
    this.handlingDoubleDownSequence_ = false;
    this.doubleTapTimeoutId_ = void 0;
    this.trackedPointers_ = {};
    this.targetPointers = [];
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent  map browser event} and may call into
   * other functions, if event sequences like e.g. 'drag' or 'down-up' etc. are
   * detected.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   * @override
   */
  handleEvent(mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent) {
      return true;
    }
    let stopEvent = false;
    this.updateTrackedPointers_(mapBrowserEvent);
    if (this.handlingDownUpSequence_) {
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDRAG) {
        this.handleDragEvent(mapBrowserEvent);
        mapBrowserEvent.originalEvent.preventDefault();
      } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
        const handledUp = this.handleUpEvent(mapBrowserEvent);
        this.handlingDownUpSequence_ = handledUp;
      }
    } else {
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
        if (this.handlingDoubleDownSequence_) {
          this.handlingDoubleDownSequence_ = false;
          const handled = this.handleDownEvent(mapBrowserEvent);
          this.handlingDownUpSequence_ = handled;
          stopEvent = this.stopDown(handled);
        } else {
          stopEvent = this.stopDown(false);
          this.waitForDblTap_();
        }
      }
    }
    return !stopEvent;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   */
  handleDragEvent(mapBrowserEvent) {
    let scaleDelta = 1;
    const touch0 = this.targetPointers[0];
    const touch1 = this.down_.originalEvent;
    const distance2 = touch0.clientY - touch1.clientY;
    if (this.lastDistance_ !== void 0) {
      scaleDelta = 1 - (this.lastDistance_ - distance2) * this.scaleDeltaByPixel_;
    }
    this.lastDistance_ = distance2;
    if (scaleDelta != 1) {
      this.lastScaleDelta_ = scaleDelta;
    }
    const map = mapBrowserEvent.map;
    const view = map.getView();
    map.render();
    view.adjustResolutionInternal(scaleDelta);
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleDownEvent(mapBrowserEvent) {
    if (this.targetPointers.length == 1) {
      const map = mapBrowserEvent.map;
      this.anchor_ = null;
      this.lastDistance_ = void 0;
      this.lastScaleDelta_ = 1;
      this.down_ = mapBrowserEvent;
      if (!this.handlingDownUpSequence_) {
        map.getView().beginInteraction();
      }
      return true;
    }
    return false;
  }
  /**
   * Handle pointer up events zooming out.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   */
  handleUpEvent(mapBrowserEvent) {
    if (this.targetPointers.length == 0) {
      const map = mapBrowserEvent.map;
      const view = map.getView();
      const direction = this.lastScaleDelta_ > 1 ? 1 : -1;
      view.endInteraction(this.duration_, direction);
      this.handlingDownUpSequence_ = false;
      this.handlingDoubleDownSequence_ = false;
      return false;
    }
    return true;
  }
  /**
   * This function is used to determine if "down" events should be propagated
   * to other interactions or should be stopped.
   * @param {boolean} handled Was the event handled by the interaction?
   * @return {boolean} Should the `down` event be stopped?
   */
  stopDown(handled) {
    return handled;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @private
   */
  updateTrackedPointers_(mapBrowserEvent) {
    if (isPointerDraggingEvent(mapBrowserEvent)) {
      const event = mapBrowserEvent.originalEvent;
      const id = event.pointerId.toString();
      if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERUP) {
        delete this.trackedPointers_[id];
      } else if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERDOWN) {
        this.trackedPointers_[id] = event;
      } else if (id in this.trackedPointers_) {
        this.trackedPointers_[id] = event;
      }
      this.targetPointers = Object.values(this.trackedPointers_);
    }
  }
  /**
   * Wait the second double finger tap.
   * @private
   */
  waitForDblTap_() {
    if (this.doubleTapTimeoutId_ !== void 0) {
      clearTimeout(this.doubleTapTimeoutId_);
      this.doubleTapTimeoutId_ = void 0;
    } else {
      this.handlingDoubleDownSequence_ = true;
      this.doubleTapTimeoutId_ = setTimeout(this.endInteraction_.bind(this), 250);
    }
  }
  /**
   * @private
   */
  endInteraction_() {
    this.handlingDoubleDownSequence_ = false;
    this.doubleTapTimeoutId_ = void 0;
  }
};
function isPointerDraggingEvent(mapBrowserEvent) {
  const type = mapBrowserEvent.type;
  return type === MapBrowserEventType_default.POINTERDOWN || type === MapBrowserEventType_default.POINTERDRAG || type === MapBrowserEventType_default.POINTERUP;
}
var DblClickDragZoom_default = DblClickDragZoom;

// node_modules/ol/interaction/DragAndDrop.js
var DragAndDropEventType = {
  /**
   * Triggered when features are added
   * @event DragAndDropEvent#addfeatures
   * @api
   */
  ADD_FEATURES: "addfeatures"
};
var DragAndDropEvent = class extends Event_default {
  /**
   * @param {DragAndDropEventType} type Type.
   * @param {File} file File.
   * @param {Array<import("../Feature.js").default>} [features] Features.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   */
  constructor(type, file, features, projection) {
    super(type);
    this.features = features;
    this.file = file;
    this.projection = projection;
  }
};
var DragAndDrop = class extends Interaction_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      handleEvent: TRUE
    });
    this.on;
    this.once;
    this.un;
    this.readAsBuffer_ = false;
    this.formats_ = [];
    const formatConstructors = options.formatConstructors ? options.formatConstructors : [];
    for (let i = 0, ii = formatConstructors.length; i < ii; ++i) {
      let format = formatConstructors[i];
      if (typeof format === "function") {
        format = new format();
      }
      this.formats_.push(format);
      this.readAsBuffer_ = this.readAsBuffer_ || format.getType() === "arraybuffer";
    }
    this.projection_ = options.projection ? get(options.projection) : null;
    this.dropListenKeys_ = null;
    this.source_ = options.source || null;
    this.target = options.target ? options.target : null;
  }
  /**
   * @param {File} file File.
   * @param {Event} event Load event.
   * @private
   */
  handleResult_(file, event) {
    const result = event.target.result;
    const map = this.getMap();
    let projection = this.projection_;
    if (!projection) {
      projection = getUserProjection();
      if (!projection) {
        const view = map.getView();
        projection = view.getProjection();
      }
    }
    let text;
    const formats = this.formats_;
    for (let i = 0, ii = formats.length; i < ii; ++i) {
      const format = formats[i];
      let input = result;
      if (this.readAsBuffer_ && format.getType() !== "arraybuffer") {
        if (text === void 0) {
          text = new TextDecoder().decode(result);
        }
        input = text;
      }
      const features = this.tryReadFeatures_(format, input, {
        featureProjection: projection
      });
      if (features && features.length > 0) {
        if (this.source_) {
          this.source_.clear();
          this.source_.addFeatures(features);
        }
        this.dispatchEvent(new DragAndDropEvent(DragAndDropEventType.ADD_FEATURES, file, features, projection));
        break;
      }
    }
  }
  /**
   * @private
   */
  registerListeners_() {
    const map = this.getMap();
    if (map) {
      const dropArea = this.target ? this.target : map.getViewport();
      this.dropListenKeys_ = [listen(dropArea, EventType_default.DROP, this.handleDrop, this), listen(dropArea, EventType_default.DRAGENTER, this.handleStop, this), listen(dropArea, EventType_default.DRAGOVER, this.handleStop, this), listen(dropArea, EventType_default.DROP, this.handleStop, this)];
    }
  }
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   * @override
   */
  setActive(active) {
    if (!this.getActive() && active) {
      this.registerListeners_();
    }
    if (this.getActive() && !active) {
      this.unregisterListeners_();
    }
    super.setActive(active);
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    this.unregisterListeners_();
    super.setMap(map);
    if (this.getActive()) {
      this.registerListeners_();
    }
  }
  /**
   * @param {import("../format/Feature.js").default} format Format.
   * @param {string} text Text.
   * @param {import("../format/Feature.js").ReadOptions} options Read options.
   * @private
   * @return {Array<import("../Feature.js").default>} Features.
   */
  tryReadFeatures_(format, text, options) {
    try {
      return (
        /** @type {Array<import("../Feature.js").default>} */
        format.readFeatures(text, options)
      );
    } catch {
      return null;
    }
  }
  /**
   * @private
   */
  unregisterListeners_() {
    if (this.dropListenKeys_) {
      this.dropListenKeys_.forEach(unlistenByKey);
      this.dropListenKeys_ = null;
    }
  }
  /**
   * @param {DragEvent} event Event.
   */
  handleDrop(event) {
    const files = event.dataTransfer.files;
    for (let i = 0, ii = files.length; i < ii; ++i) {
      const file = files.item(i);
      const reader = new FileReader();
      reader.addEventListener(EventType_default.LOAD, this.handleResult_.bind(this, file));
      if (this.readAsBuffer_) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  }
  /**
   * @param {DragEvent} event Event.
   */
  handleStop(event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }
};
var DragAndDrop_default = DragAndDrop;

// node_modules/ol/interaction/DragRotateAndZoom.js
var DragRotateAndZoom = class extends Pointer_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    super(
      /** @type {import("./Pointer.js").Options} */
      options
    );
    this.condition_ = options.condition ? options.condition : shiftKeyOnly;
    this.lastAngle_ = void 0;
    this.lastMagnitude_ = void 0;
    this.lastScaleDelta_ = 0;
    this.duration_ = options.duration !== void 0 ? options.duration : 400;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return;
    }
    const map = mapBrowserEvent.map;
    const size = map.getSize();
    const offset = mapBrowserEvent.pixel;
    const deltaX = offset[0] - size[0] / 2;
    const deltaY = size[1] / 2 - offset[1];
    const theta = Math.atan2(deltaY, deltaX);
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const view = map.getView();
    if (this.lastAngle_ !== void 0) {
      const angleDelta = this.lastAngle_ - theta;
      view.adjustRotationInternal(angleDelta);
    }
    this.lastAngle_ = theta;
    if (this.lastMagnitude_ !== void 0) {
      view.adjustResolutionInternal(this.lastMagnitude_ / magnitude);
    }
    if (this.lastMagnitude_ !== void 0) {
      this.lastScaleDelta_ = this.lastMagnitude_ / magnitude;
    }
    this.lastMagnitude_ = magnitude;
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return true;
    }
    const map = mapBrowserEvent.map;
    const view = map.getView();
    const direction = this.lastScaleDelta_ > 1 ? 1 : -1;
    view.endInteraction(this.duration_, direction);
    this.lastScaleDelta_ = 0;
    return false;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(mapBrowserEvent) {
    if (!mouseOnly(mapBrowserEvent)) {
      return false;
    }
    if (this.condition_(mapBrowserEvent)) {
      mapBrowserEvent.map.getView().beginInteraction();
      this.lastAngle_ = void 0;
      this.lastMagnitude_ = void 0;
      return true;
    }
    return false;
  }
};
var DragRotateAndZoom_default = DragRotateAndZoom;

// node_modules/ol/interaction/Draw.js
var DrawEventType = {
  /**
   * Triggered upon feature draw start
   * @event DrawEvent#drawstart
   * @api
   */
  DRAWSTART: "drawstart",
  /**
   * Triggered upon feature draw end
   * @event DrawEvent#drawend
   * @api
   */
  DRAWEND: "drawend",
  /**
   * Triggered upon feature draw abortion
   * @event DrawEvent#drawabort
   * @api
   */
  DRAWABORT: "drawabort"
};
var DrawEvent = class extends Event_default {
  /**
   * @param {DrawEventType} type Type.
   * @param {Feature} feature The feature drawn.
   */
  constructor(type, feature) {
    super(type);
    this.feature = feature;
  }
};
function getTraceTargets(coordinate, features) {
  const targets = [];
  for (let i = 0; i < features.length; ++i) {
    const feature = features[i];
    const geometry = feature.getGeometry();
    appendGeometryTraceTargets(coordinate, geometry, targets);
  }
  return targets;
}
function getSquaredDistance(a, b) {
  return squaredDistance(a[0], a[1], b[0], b[1]);
}
function getCoordinate(coordinates, index) {
  const count = coordinates.length;
  if (index < 0) {
    return coordinates[index + count];
  }
  if (index >= count) {
    return coordinates[index - count];
  }
  return coordinates[index];
}
function getCumulativeSquaredDistance(coordinates, startIndex, endIndex) {
  let lowIndex, highIndex;
  if (startIndex < endIndex) {
    lowIndex = startIndex;
    highIndex = endIndex;
  } else {
    lowIndex = endIndex;
    highIndex = startIndex;
  }
  const lowWholeIndex = Math.ceil(lowIndex);
  const highWholeIndex = Math.floor(highIndex);
  if (lowWholeIndex > highWholeIndex) {
    const start = interpolateCoordinate(coordinates, lowIndex);
    const end = interpolateCoordinate(coordinates, highIndex);
    return getSquaredDistance(start, end);
  }
  let sd = 0;
  if (lowIndex < lowWholeIndex) {
    const start = interpolateCoordinate(coordinates, lowIndex);
    const end = getCoordinate(coordinates, lowWholeIndex);
    sd += getSquaredDistance(start, end);
  }
  if (highWholeIndex < highIndex) {
    const start = getCoordinate(coordinates, highWholeIndex);
    const end = interpolateCoordinate(coordinates, highIndex);
    sd += getSquaredDistance(start, end);
  }
  for (let i = lowWholeIndex; i < highWholeIndex - 1; ++i) {
    const start = getCoordinate(coordinates, i);
    const end = getCoordinate(coordinates, i + 1);
    sd += getSquaredDistance(start, end);
  }
  return sd;
}
function appendGeometryTraceTargets(coordinate, geometry, targets) {
  if (geometry instanceof LineString_default) {
    appendTraceTarget(coordinate, geometry.getCoordinates(), false, targets);
    return;
  }
  if (geometry instanceof MultiLineString_default) {
    const coordinates = geometry.getCoordinates();
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
      appendTraceTarget(coordinate, coordinates[i], false, targets);
    }
    return;
  }
  if (geometry instanceof Polygon_default) {
    const coordinates = geometry.getCoordinates();
    for (let i = 0, ii = coordinates.length; i < ii; ++i) {
      appendTraceTarget(coordinate, coordinates[i], true, targets);
    }
    return;
  }
  if (geometry instanceof MultiPolygon_default) {
    const polys = geometry.getCoordinates();
    for (let i = 0, ii = polys.length; i < ii; ++i) {
      const coordinates = polys[i];
      for (let j = 0, jj = coordinates.length; j < jj; ++j) {
        appendTraceTarget(coordinate, coordinates[j], true, targets);
      }
    }
    return;
  }
  if (geometry instanceof GeometryCollection_default) {
    const geometries = geometry.getGeometries();
    for (let i = 0; i < geometries.length; ++i) {
      appendGeometryTraceTargets(coordinate, geometries[i], targets);
    }
    return;
  }
}
var sharedUpdateInfo = {
  index: -1,
  endIndex: NaN
};
function getTraceTargetUpdate(coordinate, traceState, map, snapTolerance) {
  const x = coordinate[0];
  const y = coordinate[1];
  let closestTargetDistance = Infinity;
  let newTargetIndex = -1;
  let newEndIndex = NaN;
  for (let targetIndex = 0; targetIndex < traceState.targets.length; ++targetIndex) {
    const target = traceState.targets[targetIndex];
    const coordinates = target.coordinates;
    let minSegmentDistance = Infinity;
    let endIndex;
    for (let coordinateIndex = 0; coordinateIndex < coordinates.length - 1; ++coordinateIndex) {
      const start = coordinates[coordinateIndex];
      const end = coordinates[coordinateIndex + 1];
      const rel = getPointSegmentRelationship(x, y, start, end);
      if (rel.squaredDistance < minSegmentDistance) {
        minSegmentDistance = rel.squaredDistance;
        endIndex = coordinateIndex + rel.along;
      }
    }
    if (minSegmentDistance < closestTargetDistance) {
      closestTargetDistance = minSegmentDistance;
      if (target.ring && traceState.targetIndex === targetIndex) {
        if (target.endIndex > target.startIndex) {
          if (endIndex < target.startIndex) {
            endIndex += coordinates.length;
          }
        } else if (target.endIndex < target.startIndex) {
          if (endIndex > target.startIndex) {
            endIndex -= coordinates.length;
          }
        }
      }
      newEndIndex = endIndex;
      newTargetIndex = targetIndex;
    }
  }
  const newTarget = traceState.targets[newTargetIndex];
  let considerBothDirections = newTarget.ring;
  if (traceState.targetIndex === newTargetIndex && considerBothDirections) {
    const newCoordinate = interpolateCoordinate(newTarget.coordinates, newEndIndex);
    const pixel = map.getPixelFromCoordinate(newCoordinate);
    if (distance(pixel, traceState.startPx) > snapTolerance) {
      considerBothDirections = false;
    }
  }
  if (considerBothDirections) {
    const coordinates = newTarget.coordinates;
    const count = coordinates.length;
    const startIndex = newTarget.startIndex;
    const endIndex = newEndIndex;
    if (startIndex < endIndex) {
      const forwardDistance = getCumulativeSquaredDistance(coordinates, startIndex, endIndex);
      const reverseDistance = getCumulativeSquaredDistance(coordinates, startIndex, endIndex - count);
      if (reverseDistance < forwardDistance) {
        newEndIndex -= count;
      }
    } else {
      const reverseDistance = getCumulativeSquaredDistance(coordinates, startIndex, endIndex);
      const forwardDistance = getCumulativeSquaredDistance(coordinates, startIndex, endIndex + count);
      if (forwardDistance < reverseDistance) {
        newEndIndex += count;
      }
    }
  }
  sharedUpdateInfo.index = newTargetIndex;
  sharedUpdateInfo.endIndex = newEndIndex;
  return sharedUpdateInfo;
}
function appendTraceTarget(coordinate, coordinates, ring, targets) {
  const x = coordinate[0];
  const y = coordinate[1];
  for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
    const start = coordinates[i];
    const end = coordinates[i + 1];
    const rel = getPointSegmentRelationship(x, y, start, end);
    if (rel.squaredDistance === 0) {
      const index = i + rel.along;
      targets.push({
        coordinates,
        ring,
        startIndex: index,
        endIndex: index
      });
      return;
    }
  }
}
var sharedRel = {
  along: 0,
  squaredDistance: 0
};
function getPointSegmentRelationship(x, y, start, end) {
  const x1 = start[0];
  const y1 = start[1];
  const x2 = end[0];
  const y2 = end[1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  let along = 0;
  let px = x1;
  let py = y1;
  if (dx !== 0 || dy !== 0) {
    along = clamp(((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy), 0, 1);
    px += dx * along;
    py += dy * along;
  }
  sharedRel.along = along;
  sharedRel.squaredDistance = toFixed(squaredDistance(x, y, px, py), 10);
  return sharedRel;
}
function interpolateCoordinate(coordinates, index) {
  const count = coordinates.length;
  let startIndex = Math.floor(index);
  const along = index - startIndex;
  if (startIndex >= count) {
    startIndex -= count;
  } else if (startIndex < 0) {
    startIndex += count;
  }
  let endIndex = startIndex + 1;
  if (endIndex >= count) {
    endIndex -= count;
  }
  const start = coordinates[startIndex];
  const x0 = start[0];
  const y0 = start[1];
  const end = coordinates[endIndex];
  const dx = end[0] - x0;
  const dy = end[1] - y0;
  return [x0 + dx * along, y0 + dy * along];
}
var Draw = class extends Pointer_default {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    const pointerOptions = (
      /** @type {import("./Pointer.js").Options} */
      options
    );
    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }
    super(pointerOptions);
    this.on;
    this.once;
    this.un;
    this.shouldHandle_ = false;
    this.downPx_ = null;
    this.downTimeout_;
    this.lastDragTime_;
    this.pointerType_;
    this.freehand_ = false;
    this.source_ = options.source ? options.source : null;
    this.features_ = options.features ? options.features : null;
    this.snapTolerance_ = options.snapTolerance ? options.snapTolerance : 12;
    this.type_ = /** @type {import("../geom/Geometry.js").Type} */
    options.type;
    this.mode_ = getMode(this.type_);
    this.stopClick_ = !!options.stopClick;
    this.minPoints_ = options.minPoints ? options.minPoints : this.mode_ === "Polygon" ? 3 : 2;
    this.maxPoints_ = this.mode_ === "Circle" ? 2 : options.maxPoints ? options.maxPoints : Infinity;
    this.finishCondition_ = options.finishCondition ? options.finishCondition : TRUE;
    this.geometryLayout_ = options.geometryLayout ? options.geometryLayout : "XY";
    let geometryFunction = options.geometryFunction;
    if (!geometryFunction) {
      const mode = this.mode_;
      if (mode === "Circle") {
        geometryFunction = (coordinates, geometry, projection) => {
          const circle = geometry ? (
            /** @type {Circle} */
            geometry
          ) : new Circle_default([NaN, NaN]);
          const center = fromUserCoordinate(coordinates[0], projection);
          const squaredLength = squaredDistance2(center, fromUserCoordinate(coordinates[coordinates.length - 1], projection));
          circle.setCenterAndRadius(center, Math.sqrt(squaredLength), this.geometryLayout_);
          const userProjection = getUserProjection();
          if (userProjection) {
            circle.transform(projection, userProjection);
          }
          return circle;
        };
      } else {
        let Constructor;
        if (mode === "Point") {
          Constructor = Point_default;
        } else if (mode === "LineString") {
          Constructor = LineString_default;
        } else if (mode === "Polygon") {
          Constructor = Polygon_default;
        }
        geometryFunction = (coordinates, geometry, projection) => {
          if (geometry) {
            if (mode === "Polygon") {
              if (coordinates[0].length) {
                geometry.setCoordinates([coordinates[0].concat([coordinates[0][0]])], this.geometryLayout_);
              } else {
                geometry.setCoordinates([], this.geometryLayout_);
              }
            } else {
              geometry.setCoordinates(coordinates, this.geometryLayout_);
            }
          } else {
            geometry = new Constructor(coordinates, this.geometryLayout_);
          }
          return geometry;
        };
      }
    }
    this.geometryFunction_ = geometryFunction;
    this.dragVertexDelay_ = options.dragVertexDelay !== void 0 ? options.dragVertexDelay : 500;
    this.finishCoordinate_ = null;
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.sketchCoords_ = null;
    this.sketchLine_ = null;
    this.sketchLineCoords_ = null;
    this.squaredClickTolerance_ = options.clickTolerance ? options.clickTolerance * options.clickTolerance : 36;
    this.overlay_ = new Vector_default2({
      source: new Vector_default({
        useSpatialIndex: false,
        wrapX: options.wrapX ? options.wrapX : false
      }),
      style: options.style ? options.style : getDefaultStyleFunction(),
      updateWhileInteracting: true
    });
    this.geometryName_ = options.geometryName;
    this.condition_ = options.condition ? options.condition : noModifierKeys;
    this.freehandCondition_;
    if (options.freehand) {
      this.freehandCondition_ = always;
    } else {
      this.freehandCondition_ = options.freehandCondition ? options.freehandCondition : shiftKeyOnly;
    }
    this.traceCondition_;
    this.setTrace(options.trace || false);
    this.traceState_ = {
      active: false
    };
    this.traceSource_ = options.traceSource || options.source || null;
    this.addChangeListener(Property_default.ACTIVE, this.updateState_);
  }
  /**
   * Toggle tracing mode or set a tracing condition.
   *
   * @param {boolean|import("../events/condition.js").Condition} trace A boolean to toggle tracing mode or an event
   *     condition that will be checked when a feature is clicked to determine if tracing should be active.
   */
  setTrace(trace) {
    let condition;
    if (!trace) {
      condition = never;
    } else if (trace === true) {
      condition = always;
    } else {
      condition = trace;
    }
    this.traceCondition_ = condition;
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    super.setMap(map);
    this.updateState_();
  }
  /**
   * Get the overlay layer that this interaction renders sketch features to.
   * @return {VectorLayer} Overlay layer.
   * @api
   */
  getOverlay() {
    return this.overlay_;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may actually draw or finish the drawing.
   * @param {import("../MapBrowserEvent.js").default} event Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   * @override
   */
  handleEvent(event) {
    if (event.originalEvent.type === EventType_default.CONTEXTMENU) {
      event.originalEvent.preventDefault();
    }
    this.freehand_ = this.mode_ !== "Point" && this.freehandCondition_(event);
    let move = event.type === MapBrowserEventType_default.POINTERMOVE;
    let pass = true;
    if (!this.freehand_ && this.lastDragTime_ && event.type === MapBrowserEventType_default.POINTERDRAG) {
      const now = Date.now();
      if (now - this.lastDragTime_ >= this.dragVertexDelay_) {
        this.downPx_ = event.pixel;
        this.shouldHandle_ = !this.freehand_;
        move = true;
      } else {
        this.lastDragTime_ = void 0;
      }
      if (this.shouldHandle_ && this.downTimeout_ !== void 0) {
        clearTimeout(this.downTimeout_);
        this.downTimeout_ = void 0;
      }
    }
    if (this.freehand_ && event.type === MapBrowserEventType_default.POINTERDRAG && this.sketchFeature_ !== null) {
      this.addToDrawing_(event.coordinate);
      pass = false;
    } else if (this.freehand_ && event.type === MapBrowserEventType_default.POINTERDOWN) {
      pass = false;
    } else if (move && this.getPointerCount() < 2) {
      pass = event.type === MapBrowserEventType_default.POINTERMOVE;
      if (pass && this.freehand_) {
        this.handlePointerMove_(event);
        if (this.shouldHandle_) {
          event.originalEvent.preventDefault();
        }
      } else if (event.originalEvent.pointerType === "mouse" || event.type === MapBrowserEventType_default.POINTERDRAG && this.downTimeout_ === void 0) {
        this.handlePointerMove_(event);
      }
    } else if (event.type === MapBrowserEventType_default.DBLCLICK) {
      pass = false;
    }
    return super.handleEvent(event) && pass;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(event) {
    this.shouldHandle_ = !this.freehand_;
    if (this.freehand_) {
      this.downPx_ = event.pixel;
      if (!this.finishCoordinate_) {
        this.startDrawing_(event.coordinate);
      }
      return true;
    }
    if (!this.condition_(event)) {
      this.lastDragTime_ = void 0;
      return false;
    }
    this.lastDragTime_ = Date.now();
    this.downTimeout_ = setTimeout(() => {
      this.handlePointerMove_(new MapBrowserEvent_default(MapBrowserEventType_default.POINTERMOVE, event.map, event.originalEvent, false, event.frameState));
    }, this.dragVertexDelay_);
    this.downPx_ = event.pixel;
    return true;
  }
  /**
   * @private
   */
  deactivateTrace_() {
    this.traceState_ = {
      active: false
    };
  }
  /**
   * Activate or deactivate trace state based on a browser event.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @private
   */
  toggleTraceState_(event) {
    if (!this.traceSource_ || !this.traceCondition_(event)) {
      return;
    }
    if (this.traceState_.active) {
      this.deactivateTrace_();
      return;
    }
    const map = this.getMap();
    const lowerLeft = map.getCoordinateFromPixel([event.pixel[0] - this.snapTolerance_, event.pixel[1] + this.snapTolerance_]);
    const upperRight = map.getCoordinateFromPixel([event.pixel[0] + this.snapTolerance_, event.pixel[1] - this.snapTolerance_]);
    const extent = boundingExtent([lowerLeft, upperRight]);
    const features = this.traceSource_.getFeaturesInExtent(extent);
    if (features.length === 0) {
      return;
    }
    const targets = getTraceTargets(event.coordinate, features);
    if (targets.length) {
      this.traceState_ = {
        active: true,
        startPx: event.pixel.slice(),
        targets,
        targetIndex: -1
      };
    }
  }
  /**
   * @param {TraceTarget} target The trace target.
   * @param {number} endIndex The new end index of the trace.
   * @private
   */
  addOrRemoveTracedCoordinates_(target, endIndex) {
    const previouslyForward = target.startIndex <= target.endIndex;
    const currentlyForward = target.startIndex <= endIndex;
    if (previouslyForward === currentlyForward) {
      if (previouslyForward && endIndex > target.endIndex || !previouslyForward && endIndex < target.endIndex) {
        this.addTracedCoordinates_(target, target.endIndex, endIndex);
      } else if (previouslyForward && endIndex < target.endIndex || !previouslyForward && endIndex > target.endIndex) {
        this.removeTracedCoordinates_(endIndex, target.endIndex);
      }
    } else {
      this.removeTracedCoordinates_(target.startIndex, target.endIndex);
      this.addTracedCoordinates_(target, target.startIndex, endIndex);
    }
  }
  /**
   * @param {number} fromIndex The start index.
   * @param {number} toIndex The end index.
   * @private
   */
  removeTracedCoordinates_(fromIndex, toIndex) {
    if (fromIndex === toIndex) {
      return;
    }
    let remove = 0;
    if (fromIndex < toIndex) {
      const start = Math.ceil(fromIndex);
      let end = Math.floor(toIndex);
      if (end === toIndex) {
        end -= 1;
      }
      remove = end - start + 1;
    } else {
      const start = Math.floor(fromIndex);
      let end = Math.ceil(toIndex);
      if (end === toIndex) {
        end += 1;
      }
      remove = start - end + 1;
    }
    if (remove > 0) {
      this.removeLastPoints_(remove);
    }
  }
  /**
   * @param {TraceTarget} target The trace target.
   * @param {number} fromIndex The start index.
   * @param {number} toIndex The end index.
   * @private
   */
  addTracedCoordinates_(target, fromIndex, toIndex) {
    if (fromIndex === toIndex) {
      return;
    }
    const coordinates = [];
    if (fromIndex < toIndex) {
      const start = Math.ceil(fromIndex);
      let end = Math.floor(toIndex);
      if (end === toIndex) {
        end -= 1;
      }
      for (let i = start; i <= end; ++i) {
        coordinates.push(getCoordinate(target.coordinates, i));
      }
    } else {
      const start = Math.floor(fromIndex);
      let end = Math.ceil(toIndex);
      if (end === toIndex) {
        end += 1;
      }
      for (let i = start; i >= end; --i) {
        coordinates.push(getCoordinate(target.coordinates, i));
      }
    }
    if (coordinates.length) {
      this.appendCoordinates(coordinates);
    }
  }
  /**
   * Update the trace.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @private
   */
  updateTrace_(event) {
    const traceState = this.traceState_;
    if (!traceState.active) {
      return;
    }
    if (traceState.targetIndex === -1) {
      if (distance(traceState.startPx, event.pixel) < this.snapTolerance_) {
        return;
      }
    }
    const updatedTraceTarget = getTraceTargetUpdate(event.coordinate, traceState, this.getMap(), this.snapTolerance_);
    if (traceState.targetIndex !== updatedTraceTarget.index) {
      if (traceState.targetIndex !== -1) {
        const oldTarget = traceState.targets[traceState.targetIndex];
        this.removeTracedCoordinates_(oldTarget.startIndex, oldTarget.endIndex);
      }
      const newTarget = traceState.targets[updatedTraceTarget.index];
      this.addTracedCoordinates_(newTarget, newTarget.startIndex, updatedTraceTarget.endIndex);
    } else {
      const target2 = traceState.targets[traceState.targetIndex];
      this.addOrRemoveTracedCoordinates_(target2, updatedTraceTarget.endIndex);
    }
    traceState.targetIndex = updatedTraceTarget.index;
    const target = traceState.targets[traceState.targetIndex];
    target.endIndex = updatedTraceTarget.endIndex;
    const coordinate = interpolateCoordinate(target.coordinates, target.endIndex);
    const pixel = this.getMap().getPixelFromCoordinate(coordinate);
    event.coordinate = coordinate;
    event.pixel = [Math.round(pixel[0]), Math.round(pixel[1])];
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(event) {
    let pass = true;
    if (this.getPointerCount() === 0) {
      if (this.downTimeout_) {
        clearTimeout(this.downTimeout_);
        this.downTimeout_ = void 0;
      }
      this.handlePointerMove_(event);
      const tracing = this.traceState_.active;
      this.toggleTraceState_(event);
      if (this.shouldHandle_) {
        const startingToDraw = !this.finishCoordinate_;
        if (startingToDraw) {
          this.startDrawing_(event.coordinate);
        }
        if (!startingToDraw && this.freehand_) {
          this.finishDrawing();
        } else if (!this.freehand_ && (!startingToDraw || this.mode_ === "Point")) {
          if (this.atFinish_(event.pixel, tracing)) {
            if (this.finishCondition_(event)) {
              this.finishDrawing();
            }
          } else {
            this.addToDrawing_(event.coordinate);
          }
        }
        pass = false;
      } else if (this.freehand_) {
        this.abortDrawing();
      }
    }
    if (!pass && this.stopClick_) {
      event.preventDefault();
    }
    return pass;
  }
  /**
   * Handle move events.
   * @param {import("../MapBrowserEvent.js").default} event A move event.
   * @private
   */
  handlePointerMove_(event) {
    this.pointerType_ = event.originalEvent.pointerType;
    if (this.downPx_ && (!this.freehand_ && this.shouldHandle_ || this.freehand_ && !this.shouldHandle_)) {
      const downPx = this.downPx_;
      const clickPx = event.pixel;
      const dx = downPx[0] - clickPx[0];
      const dy = downPx[1] - clickPx[1];
      const squaredDistance3 = dx * dx + dy * dy;
      this.shouldHandle_ = this.freehand_ ? squaredDistance3 > this.squaredClickTolerance_ : squaredDistance3 <= this.squaredClickTolerance_;
      if (!this.shouldHandle_) {
        return;
      }
    }
    if (!this.finishCoordinate_) {
      this.createOrUpdateSketchPoint_(event.coordinate.slice());
      return;
    }
    this.updateTrace_(event);
    this.modifyDrawing_(event.coordinate);
  }
  /**
   * Determine if an event is within the snapping tolerance of the start coord.
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @param {boolean} [tracing] Drawing in trace mode (only stop if at the starting point).
   * @return {boolean} The event is within the snapping tolerance of the start.
   * @private
   */
  atFinish_(pixel, tracing) {
    let at = false;
    if (this.sketchFeature_) {
      let potentiallyDone = false;
      let potentiallyFinishCoordinates = [this.finishCoordinate_];
      const mode = this.mode_;
      if (mode === "Point") {
        at = true;
      } else if (mode === "Circle") {
        at = this.sketchCoords_.length === 2;
      } else if (mode === "LineString") {
        potentiallyDone = !tracing && this.sketchCoords_.length > this.minPoints_;
      } else if (mode === "Polygon") {
        const sketchCoords = (
          /** @type {PolyCoordType} */
          this.sketchCoords_
        );
        potentiallyDone = sketchCoords[0].length > this.minPoints_;
        potentiallyFinishCoordinates = [sketchCoords[0][0], sketchCoords[0][sketchCoords[0].length - 2]];
        if (tracing) {
          potentiallyFinishCoordinates = [sketchCoords[0][0]];
        } else {
          potentiallyFinishCoordinates = [sketchCoords[0][0], sketchCoords[0][sketchCoords[0].length - 2]];
        }
      }
      if (potentiallyDone) {
        const map = this.getMap();
        for (let i = 0, ii = potentiallyFinishCoordinates.length; i < ii; i++) {
          const finishCoordinate = potentiallyFinishCoordinates[i];
          const finishPixel = map.getPixelFromCoordinate(finishCoordinate);
          const dx = pixel[0] - finishPixel[0];
          const dy = pixel[1] - finishPixel[1];
          const snapTolerance = this.freehand_ ? 1 : this.snapTolerance_;
          at = Math.sqrt(dx * dx + dy * dy) <= snapTolerance;
          if (at) {
            this.finishCoordinate_ = finishCoordinate;
            break;
          }
        }
      }
    }
    return at;
  }
  /**
   * @param {import("../coordinate").Coordinate} coordinates Coordinate.
   * @private
   */
  createOrUpdateSketchPoint_(coordinates) {
    if (!this.sketchPoint_) {
      this.sketchPoint_ = new Feature_default(new Point_default(coordinates));
      this.updateSketchFeatures_();
    } else {
      const sketchPointGeom = this.sketchPoint_.getGeometry();
      sketchPointGeom.setCoordinates(coordinates);
    }
  }
  /**
   * @param {import("../geom/Polygon.js").default} geometry Polygon geometry.
   * @private
   */
  createOrUpdateCustomSketchLine_(geometry) {
    if (!this.sketchLine_) {
      this.sketchLine_ = new Feature_default();
    }
    const ring = geometry.getLinearRing(0);
    let sketchLineGeom = this.sketchLine_.getGeometry();
    if (!sketchLineGeom) {
      sketchLineGeom = new LineString_default(ring.getFlatCoordinates(), ring.getLayout());
      this.sketchLine_.setGeometry(sketchLineGeom);
    } else {
      sketchLineGeom.setFlatCoordinates(ring.getLayout(), ring.getFlatCoordinates());
      sketchLineGeom.changed();
    }
  }
  /**
   * Start the drawing.
   * @param {import("../coordinate.js").Coordinate} start Start coordinate.
   * @private
   */
  startDrawing_(start) {
    const projection = this.getMap().getView().getProjection();
    const stride = getStrideForLayout(this.geometryLayout_);
    while (start.length < stride) {
      start.push(0);
    }
    this.finishCoordinate_ = start;
    if (this.mode_ === "Point") {
      this.sketchCoords_ = start.slice();
    } else if (this.mode_ === "Polygon") {
      this.sketchCoords_ = [[start.slice(), start.slice()]];
      this.sketchLineCoords_ = this.sketchCoords_[0];
    } else {
      this.sketchCoords_ = [start.slice(), start.slice()];
    }
    if (this.sketchLineCoords_) {
      this.sketchLine_ = new Feature_default(new LineString_default(this.sketchLineCoords_));
    }
    const geometry = this.geometryFunction_(this.sketchCoords_, void 0, projection);
    this.sketchFeature_ = new Feature_default();
    if (this.geometryName_) {
      this.sketchFeature_.setGeometryName(this.geometryName_);
    }
    this.sketchFeature_.setGeometry(geometry);
    this.updateSketchFeatures_();
    this.dispatchEvent(new DrawEvent(DrawEventType.DRAWSTART, this.sketchFeature_));
  }
  /**
   * Modify the drawing.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @private
   */
  modifyDrawing_(coordinate) {
    const map = this.getMap();
    const geometry = this.sketchFeature_.getGeometry();
    const projection = map.getView().getProjection();
    const stride = getStrideForLayout(this.geometryLayout_);
    let coordinates, last;
    while (coordinate.length < stride) {
      coordinate.push(0);
    }
    if (this.mode_ === "Point") {
      last = this.sketchCoords_;
    } else if (this.mode_ === "Polygon") {
      coordinates = /** @type {PolyCoordType} */
      this.sketchCoords_[0];
      last = coordinates[coordinates.length - 1];
      if (this.atFinish_(map.getPixelFromCoordinate(coordinate))) {
        coordinate = this.finishCoordinate_.slice();
      }
    } else {
      coordinates = this.sketchCoords_;
      last = coordinates[coordinates.length - 1];
    }
    last[0] = coordinate[0];
    last[1] = coordinate[1];
    this.geometryFunction_(
      /** @type {!LineCoordType} */
      this.sketchCoords_,
      geometry,
      projection
    );
    if (this.sketchPoint_) {
      const sketchPointGeom = this.sketchPoint_.getGeometry();
      sketchPointGeom.setCoordinates(coordinate);
    }
    if (geometry.getType() === "Polygon" && this.mode_ !== "Polygon") {
      this.createOrUpdateCustomSketchLine_(
        /** @type {Polygon} */
        geometry
      );
    } else if (this.sketchLineCoords_) {
      const sketchLineGeom = this.sketchLine_.getGeometry();
      sketchLineGeom.setCoordinates(this.sketchLineCoords_);
    }
    this.updateSketchFeatures_();
  }
  /**
   * Add a new coordinate to the drawing.
   * @param {!PointCoordType} coordinate Coordinate
   * @return {Feature<import("../geom/SimpleGeometry.js").default>} The sketch feature.
   * @private
   */
  addToDrawing_(coordinate) {
    const geometry = this.sketchFeature_.getGeometry();
    const projection = this.getMap().getView().getProjection();
    let done;
    let coordinates;
    const mode = this.mode_;
    if (mode === "LineString" || mode === "Circle") {
      this.finishCoordinate_ = coordinate.slice();
      coordinates = /** @type {LineCoordType} */
      this.sketchCoords_;
      if (coordinates.length >= this.maxPoints_) {
        if (this.freehand_) {
          coordinates.pop();
        } else {
          done = true;
        }
      }
      coordinates.push(coordinate.slice());
      this.geometryFunction_(coordinates, geometry, projection);
    } else if (mode === "Polygon") {
      coordinates = /** @type {PolyCoordType} */
      this.sketchCoords_[0];
      if (coordinates.length >= this.maxPoints_) {
        if (this.freehand_) {
          coordinates.pop();
        } else {
          done = true;
        }
      }
      coordinates.push(coordinate.slice());
      if (done) {
        this.finishCoordinate_ = coordinates[0];
      }
      this.geometryFunction_(this.sketchCoords_, geometry, projection);
    }
    this.createOrUpdateSketchPoint_(coordinate.slice());
    this.updateSketchFeatures_();
    if (done) {
      return this.finishDrawing();
    }
    return this.sketchFeature_;
  }
  /**
   * @param {number} n The number of points to remove.
   */
  removeLastPoints_(n) {
    if (!this.sketchFeature_) {
      return;
    }
    const geometry = this.sketchFeature_.getGeometry();
    const projection = this.getMap().getView().getProjection();
    const mode = this.mode_;
    for (let i = 0; i < n; ++i) {
      let coordinates;
      if (mode === "LineString" || mode === "Circle") {
        coordinates = /** @type {LineCoordType} */
        this.sketchCoords_;
        coordinates.splice(-2, 1);
        if (coordinates.length >= 2) {
          this.finishCoordinate_ = coordinates[coordinates.length - 2].slice();
          const finishCoordinate = this.finishCoordinate_.slice();
          coordinates[coordinates.length - 1] = finishCoordinate;
          this.createOrUpdateSketchPoint_(finishCoordinate);
        }
        this.geometryFunction_(coordinates, geometry, projection);
        if (geometry.getType() === "Polygon" && this.sketchLine_) {
          this.createOrUpdateCustomSketchLine_(
            /** @type {Polygon} */
            geometry
          );
        }
      } else if (mode === "Polygon") {
        coordinates = /** @type {PolyCoordType} */
        this.sketchCoords_[0];
        coordinates.splice(-2, 1);
        const sketchLineGeom = this.sketchLine_.getGeometry();
        if (coordinates.length >= 2) {
          const finishCoordinate = coordinates[coordinates.length - 2].slice();
          coordinates[coordinates.length - 1] = finishCoordinate;
          this.createOrUpdateSketchPoint_(finishCoordinate);
        }
        sketchLineGeom.setCoordinates(coordinates);
        this.geometryFunction_(this.sketchCoords_, geometry, projection);
      }
      if (coordinates.length === 1) {
        this.abortDrawing();
        break;
      }
    }
    this.updateSketchFeatures_();
  }
  /**
   * Remove last point of the feature currently being drawn. Does not do anything when
   * drawing POINT or MULTI_POINT geometries.
   * @api
   */
  removeLastPoint() {
    this.removeLastPoints_(1);
  }
  /**
   * Stop drawing and add the sketch feature to the target layer.
   * The {@link module:ol/interaction/Draw~DrawEventType.DRAWEND} event is
   * dispatched before inserting the feature.
   * @return {Feature<import("../geom/SimpleGeometry.js").default>|null} The drawn feature.
   * @api
   */
  finishDrawing() {
    const sketchFeature = this.abortDrawing_();
    if (!sketchFeature) {
      return null;
    }
    let coordinates = this.sketchCoords_;
    const geometry = sketchFeature.getGeometry();
    const projection = this.getMap().getView().getProjection();
    if (this.mode_ === "LineString") {
      coordinates.pop();
      this.geometryFunction_(coordinates, geometry, projection);
    } else if (this.mode_ === "Polygon") {
      coordinates[0].pop();
      this.geometryFunction_(coordinates, geometry, projection);
      coordinates = geometry.getCoordinates();
    }
    if (this.type_ === "MultiPoint") {
      sketchFeature.setGeometry(new MultiPoint_default([
        /** @type {PointCoordType} */
        coordinates
      ]));
    } else if (this.type_ === "MultiLineString") {
      sketchFeature.setGeometry(new MultiLineString_default([
        /** @type {LineCoordType} */
        coordinates
      ]));
    } else if (this.type_ === "MultiPolygon") {
      sketchFeature.setGeometry(new MultiPolygon_default([
        /** @type {PolyCoordType} */
        coordinates
      ]));
    }
    this.dispatchEvent(new DrawEvent(DrawEventType.DRAWEND, sketchFeature));
    if (this.features_) {
      this.features_.push(sketchFeature);
    }
    if (this.source_) {
      this.source_.addFeature(sketchFeature);
    }
    return sketchFeature;
  }
  /**
   * Stop drawing without adding the sketch feature to the target layer.
   * @return {Feature<import("../geom/SimpleGeometry.js").default>|null} The sketch feature (or null if none).
   * @private
   */
  abortDrawing_() {
    this.finishCoordinate_ = null;
    const sketchFeature = this.sketchFeature_;
    this.sketchFeature_ = null;
    this.sketchPoint_ = null;
    this.sketchLine_ = null;
    this.overlay_.getSource().clear(true);
    this.deactivateTrace_();
    return sketchFeature;
  }
  /**
   * Stop drawing without adding the sketch feature to the target layer.
   * @api
   */
  abortDrawing() {
    const sketchFeature = this.abortDrawing_();
    if (sketchFeature) {
      this.dispatchEvent(new DrawEvent(DrawEventType.DRAWABORT, sketchFeature));
    }
  }
  /**
   * Append coordinates to the end of the geometry that is currently being drawn.
   * This can be used when drawing LineStrings or Polygons. Coordinates will
   * either be appended to the current LineString or the outer ring of the current
   * Polygon. If no geometry is being drawn, a new one will be created.
   * @param {!LineCoordType} coordinates Linear coordinates to be appended to
   * the coordinate array.
   * @api
   */
  appendCoordinates(coordinates) {
    const mode = this.mode_;
    const newDrawing = !this.sketchFeature_;
    if (newDrawing) {
      this.startDrawing_(coordinates[0]);
    }
    let sketchCoords;
    if (mode === "LineString" || mode === "Circle") {
      sketchCoords = /** @type {LineCoordType} */
      this.sketchCoords_;
    } else if (mode === "Polygon") {
      sketchCoords = this.sketchCoords_ && this.sketchCoords_.length ? (
        /** @type {PolyCoordType} */
        this.sketchCoords_[0]
      ) : [];
    } else {
      return;
    }
    if (newDrawing) {
      sketchCoords.shift();
    }
    sketchCoords.pop();
    for (let i = 0; i < coordinates.length; i++) {
      this.addToDrawing_(coordinates[i]);
    }
    const ending = coordinates[coordinates.length - 1];
    this.sketchFeature_ = this.addToDrawing_(ending);
    this.modifyDrawing_(ending);
  }
  /**
   * Initiate draw mode by starting from an existing geometry which will
   * receive new additional points. This only works on features with
   * `LineString` geometries, where the interaction will extend lines by adding
   * points to the end of the coordinates array.
   * This will change the original feature, instead of drawing a copy.
   *
   * The function will dispatch a `drawstart` event.
   *
   * @param {!Feature<LineString>} feature Feature to be extended.
   * @api
   */
  extend(feature) {
    const geometry = feature.getGeometry();
    const lineString = geometry;
    this.sketchFeature_ = feature;
    this.sketchCoords_ = lineString.getCoordinates();
    const last = this.sketchCoords_[this.sketchCoords_.length - 1];
    this.finishCoordinate_ = last.slice();
    this.sketchCoords_.push(last.slice());
    this.sketchPoint_ = new Feature_default(new Point_default(last));
    this.updateSketchFeatures_();
    this.dispatchEvent(new DrawEvent(DrawEventType.DRAWSTART, this.sketchFeature_));
  }
  /**
   * Redraw the sketch features.
   * @private
   */
  updateSketchFeatures_() {
    const sketchFeatures = [];
    if (this.sketchFeature_) {
      sketchFeatures.push(this.sketchFeature_);
    }
    if (this.sketchLine_) {
      sketchFeatures.push(this.sketchLine_);
    }
    if (this.sketchPoint_) {
      sketchFeatures.push(this.sketchPoint_);
    }
    const overlaySource = this.overlay_.getSource();
    overlaySource.clear(true);
    overlaySource.addFeatures(sketchFeatures);
  }
  /**
   * @private
   */
  updateState_() {
    const map = this.getMap();
    const active = this.getActive();
    if (!map || !active) {
      this.abortDrawing();
    }
    this.overlay_.setMap(active ? map : null);
  }
};
function getDefaultStyleFunction() {
  const styles = createEditingStyle();
  return function(feature, resolution) {
    return styles[feature.getGeometry().getType()];
  };
}
function getMode(type) {
  switch (type) {
    case "Point":
    case "MultiPoint":
      return "Point";
    case "LineString":
    case "MultiLineString":
      return "LineString";
    case "Polygon":
    case "MultiPolygon":
      return "Polygon";
    case "Circle":
      return "Circle";
    default:
      throw new Error("Invalid type: " + type);
  }
}
var Draw_default = Draw;

// node_modules/ol/interaction/Extent.js
var ExtentEventType = {
  /**
   * Triggered after the extent is changed
   * @event ExtentEvent#extentchanged
   * @api
   */
  EXTENTCHANGED: "extentchanged"
};
var ExtentEvent = class extends Event_default {
  /**
   * @param {import("../extent.js").Extent} extent the new extent
   */
  constructor(extent) {
    super(ExtentEventType.EXTENTCHANGED);
    this.extent = extent;
  }
};
var Extent = class extends Pointer_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options || {};
    super(
      /** @type {import("./Pointer.js").Options} */
      options
    );
    this.on;
    this.once;
    this.un;
    this.condition_ = options.condition ? options.condition : always;
    this.extent_ = null;
    this.pointerHandler_ = null;
    this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
    this.snappedToVertex_ = false;
    this.extentFeature_ = null;
    this.vertexFeature_ = null;
    if (!options) {
      options = {};
    }
    this.extentOverlay_ = new Vector_default2({
      source: new Vector_default({
        useSpatialIndex: false,
        wrapX: !!options.wrapX
      }),
      style: options.boxStyle ? options.boxStyle : getDefaultExtentStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    this.vertexOverlay_ = new Vector_default2({
      source: new Vector_default({
        useSpatialIndex: false,
        wrapX: !!options.wrapX
      }),
      style: options.pointerStyle ? options.pointerStyle : getDefaultPointerStyleFunction(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    if (options.extent) {
      this.setExtent(options.extent);
    }
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel cursor location
   * @param {import("../Map.js").default} map map
   * @return {import("../coordinate.js").Coordinate|null} snapped vertex on extent
   * @private
   */
  snapToVertex_(pixel, map) {
    const pixelCoordinate = map.getCoordinateFromPixelInternal(pixel);
    const sortByDistance = function(a, b) {
      return squaredDistanceToSegment(pixelCoordinate, a) - squaredDistanceToSegment(pixelCoordinate, b);
    };
    const extent = this.getExtentInternal();
    if (extent) {
      const segments = getSegments(extent);
      segments.sort(sortByDistance);
      const closestSegment = segments[0];
      let vertex = closestOnSegment(pixelCoordinate, closestSegment);
      const vertexPixel = map.getPixelFromCoordinateInternal(vertex);
      if (distance(pixel, vertexPixel) <= this.pixelTolerance_) {
        const pixel1 = map.getPixelFromCoordinateInternal(closestSegment[0]);
        const pixel2 = map.getPixelFromCoordinateInternal(closestSegment[1]);
        const squaredDist1 = squaredDistance2(vertexPixel, pixel1);
        const squaredDist2 = squaredDistance2(vertexPixel, pixel2);
        const dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
        this.snappedToVertex_ = dist <= this.pixelTolerance_;
        if (this.snappedToVertex_) {
          vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
        }
        return vertex;
      }
    }
    return null;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent pointer move event
   * @private
   */
  handlePointerMove_(mapBrowserEvent) {
    const pixel = mapBrowserEvent.pixel;
    const map = mapBrowserEvent.map;
    let vertex = this.snapToVertex_(pixel, map);
    if (!vertex) {
      vertex = map.getCoordinateFromPixelInternal(pixel);
    }
    this.createOrUpdatePointerFeature_(vertex);
  }
  /**
   * @param {import("../extent.js").Extent} extent extent
   * @return {Feature} extent as featrue
   * @private
   */
  createOrUpdateExtentFeature_(extent) {
    let extentFeature = this.extentFeature_;
    if (!extentFeature) {
      if (!extent) {
        extentFeature = new Feature_default({});
      } else {
        extentFeature = new Feature_default(fromExtent(extent));
      }
      this.extentFeature_ = extentFeature;
      this.extentOverlay_.getSource().addFeature(extentFeature);
    } else {
      if (!extent) {
        extentFeature.setGeometry(void 0);
      } else {
        extentFeature.setGeometry(fromExtent(extent));
      }
    }
    return extentFeature;
  }
  /**
   * @param {import("../coordinate.js").Coordinate} vertex location of feature
   * @return {Feature} vertex as feature
   * @private
   */
  createOrUpdatePointerFeature_(vertex) {
    let vertexFeature = this.vertexFeature_;
    if (!vertexFeature) {
      vertexFeature = new Feature_default(new Point_default(vertex));
      this.vertexFeature_ = vertexFeature;
      this.vertexOverlay_.getSource().addFeature(vertexFeature);
    } else {
      const geometry = vertexFeature.getGeometry();
      geometry.setCoordinates(vertex);
    }
    return vertexFeature;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent || !this.condition_(mapBrowserEvent)) {
      return true;
    }
    if (mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE && !this.handlingDownUpSequence) {
      this.handlePointerMove_(mapBrowserEvent);
    }
    super.handleEvent(mapBrowserEvent);
    return false;
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(mapBrowserEvent) {
    const pixel = mapBrowserEvent.pixel;
    const map = mapBrowserEvent.map;
    const extent = this.getExtentInternal();
    let vertex = this.snapToVertex_(pixel, map);
    const getOpposingPoint = function(point) {
      let x_ = null;
      let y_ = null;
      if (point[0] == extent[0]) {
        x_ = extent[2];
      } else if (point[0] == extent[2]) {
        x_ = extent[0];
      }
      if (point[1] == extent[1]) {
        y_ = extent[3];
      } else if (point[1] == extent[3]) {
        y_ = extent[1];
      }
      if (x_ !== null && y_ !== null) {
        return [x_, y_];
      }
      return null;
    };
    if (vertex && extent) {
      const x = vertex[0] == extent[0] || vertex[0] == extent[2] ? vertex[0] : null;
      const y = vertex[1] == extent[1] || vertex[1] == extent[3] ? vertex[1] : null;
      if (x !== null && y !== null) {
        this.pointerHandler_ = getPointHandler(getOpposingPoint(vertex));
      } else if (x !== null) {
        this.pointerHandler_ = getEdgeHandler(getOpposingPoint([x, extent[1]]), getOpposingPoint([x, extent[3]]));
      } else if (y !== null) {
        this.pointerHandler_ = getEdgeHandler(getOpposingPoint([extent[0], y]), getOpposingPoint([extent[2], y]));
      }
    } else {
      vertex = map.getCoordinateFromPixelInternal(pixel);
      this.setExtent([vertex[0], vertex[1], vertex[0], vertex[1]]);
      this.pointerHandler_ = getPointHandler(vertex);
    }
    return true;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @override
   */
  handleDragEvent(mapBrowserEvent) {
    if (this.pointerHandler_) {
      const pixelCoordinate = mapBrowserEvent.coordinate;
      this.setExtent(this.pointerHandler_(pixelCoordinate));
      this.createOrUpdatePointerFeature_(pixelCoordinate);
    }
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(mapBrowserEvent) {
    this.pointerHandler_ = null;
    const extent = this.getExtentInternal();
    if (!extent || getArea(extent) === 0) {
      this.setExtent(null);
    }
    return false;
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    this.extentOverlay_.setMap(map);
    this.vertexOverlay_.setMap(map);
    super.setMap(map);
  }
  /**
   * Returns the current drawn extent in the view projection (or user projection if set)
   *
   * @return {import("../extent.js").Extent} Drawn extent in the view projection.
   * @api
   */
  getExtent() {
    return toUserExtent(this.getExtentInternal(), this.getMap().getView().getProjection());
  }
  /**
   * Returns the current drawn extent in the view projection
   *
   * @return {import("../extent.js").Extent} Drawn extent in the view projection.
   * @api
   */
  getExtentInternal() {
    return this.extent_;
  }
  /**
   * Manually sets the drawn extent, using the view projection.
   *
   * @param {import("../extent.js").Extent} extent Extent
   * @api
   */
  setExtent(extent) {
    this.extent_ = extent ? extent : null;
    this.createOrUpdateExtentFeature_(extent);
    this.dispatchEvent(new ExtentEvent(this.extent_));
  }
};
function getDefaultExtentStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style["Polygon"];
  };
}
function getDefaultPointerStyleFunction() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style["Point"];
  };
}
function getPointHandler(fixedPoint) {
  return function(point) {
    return boundingExtent([fixedPoint, point]);
  };
}
function getEdgeHandler(fixedP1, fixedP2) {
  if (fixedP1[0] == fixedP2[0]) {
    return function(point) {
      return boundingExtent([fixedP1, [point[0], fixedP2[1]]]);
    };
  }
  if (fixedP1[1] == fixedP2[1]) {
    return function(point) {
      return boundingExtent([fixedP1, [fixedP2[0], point[1]]]);
    };
  }
  return null;
}
function getSegments(extent) {
  return [[[extent[0], extent[1]], [extent[0], extent[3]]], [[extent[0], extent[3]], [extent[2], extent[3]]], [[extent[2], extent[3]], [extent[2], extent[1]]], [[extent[2], extent[1]], [extent[0], extent[1]]]];
}
var Extent_default = Extent;

// node_modules/ol/interaction/Link.js
function to5(number) {
  return toFixed(number, 5);
}
function readNumber(string) {
  return parseFloat(string);
}
function writeNumber(number) {
  return to5(number).toString();
}
function differentNumber(a, b) {
  if (isNaN(a)) {
    return false;
  }
  return a !== readNumber(writeNumber(b));
}
function differentArray(a, b) {
  return differentNumber(a[0], b[0]) || differentNumber(a[1], b[1]);
}
var Link = class extends Interaction_default {
  /**
   * @param {Options} [options] Link options.
   */
  constructor(options) {
    super();
    options = Object.assign({
      animate: true,
      params: ["x", "y", "z", "r", "l"],
      replace: false,
      prefix: ""
    }, options || {});
    let animationOptions;
    if (options.animate === true) {
      animationOptions = {
        duration: 250
      };
    } else if (!options.animate) {
      animationOptions = null;
    } else {
      animationOptions = options.animate;
    }
    this.animationOptions_ = animationOptions;
    this.params_ = options.params.reduce((acc, value) => {
      acc[value] = true;
      return acc;
    }, {});
    this.replace_ = options.replace;
    this.prefix_ = options.prefix;
    this.listenerKeys_ = [];
    this.initial_ = true;
    this.updateState_ = this.updateState_.bind(this);
    this.trackedCallbacks_ = {};
    this.trackedValues_ = {};
  }
  /**
   * @private
   * @param {string} name A parameter name.
   * @return {string} A name with the prefix applied.
   */
  getParamName_(name) {
    if (!this.prefix_) {
      return name;
    }
    return this.prefix_ + name;
  }
  /**
   * @private
   * @param {URLSearchParams} params The search params.
   * @param {string} name The unprefixed parameter name.
   * @return {string|null} The parameter value.
   */
  get_(params, name) {
    return params.get(this.getParamName_(name));
  }
  /**
   * @private
   * @param {URLSearchParams} params The search params.
   * @param {string} name The unprefixed parameter name.
   * @param {string} value The param value.
   */
  set_(params, name, value) {
    if (!(name in this.params_)) {
      return;
    }
    params.set(this.getParamName_(name), value);
  }
  /**
   * @private
   * @param {URLSearchParams} params The search params.
   * @param {string} name The unprefixed parameter name.
   */
  delete_(params, name) {
    if (!(name in this.params_)) {
      return;
    }
    params.delete(this.getParamName_(name));
  }
  /**
   * @param {import("../Map.js").default|null} map Map.
   * @override
   */
  setMap(map) {
    const oldMap = this.getMap();
    super.setMap(map);
    if (map === oldMap) {
      return;
    }
    if (oldMap) {
      this.unregisterListeners_(oldMap);
    }
    if (map) {
      this.initial_ = true;
      this.updateState_();
      this.registerListeners_(map);
    }
  }
  /**
   * @param {import("../Map.js").default} map Map.
   * @private
   */
  registerListeners_(map) {
    this.listenerKeys_.push(listen(map, MapEventType_default.MOVEEND, this.updateUrl_, this), listen(map.getLayerGroup(), EventType_default.CHANGE, this.updateUrl_, this), listen(map, "change:layergroup", this.handleChangeLayerGroup_, this));
    if (!this.replace_) {
      addEventListener("popstate", this.updateState_);
    }
  }
  /**
   * @param {import("../Map.js").default} map Map.
   * @private
   */
  unregisterListeners_(map) {
    for (let i = 0, ii = this.listenerKeys_.length; i < ii; ++i) {
      unlistenByKey(this.listenerKeys_[i]);
    }
    this.listenerKeys_.length = 0;
    if (!this.replace_) {
      removeEventListener("popstate", this.updateState_);
    }
    const url = new URL(window.location.href);
    const params = url.searchParams;
    this.delete_(params, "x");
    this.delete_(params, "y");
    this.delete_(params, "z");
    this.delete_(params, "r");
    this.delete_(params, "l");
    window.history.replaceState(null, "", url);
  }
  /**
   * @private
   */
  handleChangeLayerGroup_() {
    const map = this.getMap();
    if (!map) {
      return;
    }
    this.unregisterListeners_(map);
    this.registerListeners_(map);
    this.initial_ = true;
    this.updateUrl_();
  }
  /**
   * @private
   */
  updateState_() {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    for (const key in this.trackedCallbacks_) {
      const value = params.get(key);
      if (key in this.trackedCallbacks_ && value !== this.trackedValues_[key]) {
        this.trackedValues_[key] = value;
        this.trackedCallbacks_[key](value);
      }
    }
    const map = this.getMap();
    if (!map) {
      return;
    }
    const view = map.getView();
    if (!view) {
      return;
    }
    let updateView = false;
    const viewProperties = {};
    const zoom = readNumber(this.get_(params, "z"));
    if ("z" in this.params_ && differentNumber(zoom, view.getZoom())) {
      updateView = true;
      viewProperties.zoom = zoom;
    }
    const rotation = readNumber(this.get_(params, "r"));
    if ("r" in this.params_ && differentNumber(rotation, view.getRotation())) {
      updateView = true;
      viewProperties.rotation = rotation;
    }
    const center = [readNumber(this.get_(params, "x")), readNumber(this.get_(params, "y"))];
    if (("x" in this.params_ || "y" in this.params_) && differentArray(center, view.getCenter())) {
      updateView = true;
      viewProperties.center = center;
    }
    if (updateView) {
      if (!this.initial_ && this.animationOptions_) {
        view.animate(Object.assign(viewProperties, this.animationOptions_));
      } else {
        if (viewProperties.center) {
          view.setCenter(viewProperties.center);
        }
        if ("zoom" in viewProperties) {
          view.setZoom(viewProperties.zoom);
        }
        if ("rotation" in viewProperties) {
          view.setRotation(viewProperties.rotation);
        }
      }
    }
    const layers = map.getAllLayers();
    const layersParam = this.get_(params, "l");
    if ("l" in this.params_ && layersParam && layersParam.length === layers.length) {
      for (let i = 0, ii = layers.length; i < ii; ++i) {
        const value = parseInt(layersParam[i]);
        if (!isNaN(value)) {
          const visible = Boolean(value);
          const layer = layers[i];
          if (layer.getVisible() !== visible) {
            layer.setVisible(visible);
          }
        }
      }
    }
  }
  /**
   * Register a listener for a URL search parameter.  The callback will be called with a new value
   * when the corresponding search parameter changes due to history events (e.g. browser navigation).
   *
   * @param {string} key The URL search parameter.
   * @param {Callback} callback The function to call when the search parameter changes.
   * @return {string|null} The initial value of the search parameter (or null if absent from the URL).
   * @api
   */
  track(key, callback) {
    this.trackedCallbacks_[key] = callback;
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const value = params.get(key);
    this.trackedValues_[key] = value;
    return value;
  }
  /**
   * Update the URL with a new search parameter value.  If the value is null, it will be
   * deleted from the search parameters.
   *
   * @param {string} key The URL search parameter.
   * @param {string|null} value The updated value (or null to remove it from the URL).
   * @api
   */
  update(key, value) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key in this.trackedValues_) {
      this.trackedValues_[key] = value;
    }
    this.updateHistory_(url);
  }
  /**
   * @private
   */
  updateUrl_() {
    const map = this.getMap();
    if (!map) {
      return;
    }
    const view = map.getView();
    if (!view) {
      return;
    }
    const center = view.getCenter();
    const zoom = view.getZoom();
    const rotation = view.getRotation();
    const layers = map.getAllLayers();
    const visibilities = new Array(layers.length);
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      visibilities[i] = layers[i].getVisible() ? "1" : "0";
    }
    const url = new URL(window.location.href);
    const params = url.searchParams;
    this.set_(params, "x", writeNumber(center[0]));
    this.set_(params, "y", writeNumber(center[1]));
    this.set_(params, "z", writeNumber(zoom));
    this.set_(params, "r", writeNumber(rotation));
    this.set_(params, "l", visibilities.join(""));
    this.updateHistory_(url);
    this.initial_ = false;
  }
  /**
   * @private
   * @param {URL} url The URL.
   */
  updateHistory_(url) {
    if (url.href !== window.location.href) {
      if (this.initial_ || this.replace_) {
        window.history.replaceState(history.state, "", url);
      } else {
        window.history.pushState(null, "", url);
      }
    }
  }
};
var Link_default = Link;

// node_modules/ol/interaction/Modify.js
var CIRCLE_CENTER_INDEX = 0;
var CIRCLE_CIRCUMFERENCE_INDEX = 1;
var tempExtent = [0, 0, 0, 0];
var tempSegment = [];
var ModifyEventType = {
  /**
   * Triggered upon feature modification start
   * @event ModifyEvent#modifystart
   * @api
   */
  MODIFYSTART: "modifystart",
  /**
   * Triggered upon feature modification end
   * @event ModifyEvent#modifyend
   * @api
   */
  MODIFYEND: "modifyend"
};
var ModifyEvent = class extends Event_default {
  /**
   * @param {ModifyEventType} type Type.
   * @param {Collection<Feature>} features
   * The features modified.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent
   * Associated {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   */
  constructor(type, features, mapBrowserEvent) {
    super(type);
    this.features = features;
    this.mapBrowserEvent = mapBrowserEvent;
  }
};
var Modify = class extends Pointer_default {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    super(
      /** @type {import("./Pointer.js").Options} */
      options
    );
    this.on;
    this.once;
    this.un;
    this.boundHandleFeatureChange_ = this.handleFeatureChange_.bind(this);
    this.condition_ = options.condition ? options.condition : primaryAction;
    this.defaultDeleteCondition_ = function(mapBrowserEvent) {
      return altKeyOnly(mapBrowserEvent) && singleClick(mapBrowserEvent);
    };
    this.deleteCondition_ = options.deleteCondition ? options.deleteCondition : this.defaultDeleteCondition_;
    this.insertVertexCondition_ = options.insertVertexCondition ? options.insertVertexCondition : always;
    this.vertexFeature_ = null;
    this.vertexSegments_ = null;
    this.lastPixel_ = [0, 0];
    this.ignoreNextSingleClick_ = false;
    this.featuresBeingModified_ = null;
    this.rBush_ = new RBush_default();
    this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
    this.snappedToVertex_ = false;
    this.changingFeature_ = false;
    this.dragSegments_ = [];
    this.overlay_ = new Vector_default2({
      source: new Vector_default({
        useSpatialIndex: false,
        wrapX: !!options.wrapX
      }),
      style: options.style ? options.style : getDefaultStyleFunction2(),
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });
    this.SEGMENT_WRITERS_ = {
      "Point": this.writePointGeometry_.bind(this),
      "LineString": this.writeLineStringGeometry_.bind(this),
      "LinearRing": this.writeLineStringGeometry_.bind(this),
      "Polygon": this.writePolygonGeometry_.bind(this),
      "MultiPoint": this.writeMultiPointGeometry_.bind(this),
      "MultiLineString": this.writeMultiLineStringGeometry_.bind(this),
      "MultiPolygon": this.writeMultiPolygonGeometry_.bind(this),
      "Circle": this.writeCircleGeometry_.bind(this),
      "GeometryCollection": this.writeGeometryCollectionGeometry_.bind(this)
    };
    this.source_ = null;
    this.hitDetection_ = null;
    let features;
    if (options.features) {
      features = options.features;
    } else if (options.source) {
      this.source_ = options.source;
      features = new Collection_default(this.source_.getFeatures());
      this.source_.addEventListener(VectorEventType_default.ADDFEATURE, this.handleSourceAdd_.bind(this));
      this.source_.addEventListener(VectorEventType_default.REMOVEFEATURE, this.handleSourceRemove_.bind(this));
    }
    if (!features) {
      throw new Error("The modify interaction requires features, a source or a layer");
    }
    if (options.hitDetection) {
      this.hitDetection_ = options.hitDetection;
    }
    this.features_ = features;
    this.features_.forEach(this.addFeature_.bind(this));
    this.features_.addEventListener(CollectionEventType_default.ADD, this.handleFeatureAdd_.bind(this));
    this.features_.addEventListener(CollectionEventType_default.REMOVE, this.handleFeatureRemove_.bind(this));
    this.lastPointerEvent_ = null;
    this.delta_ = [0, 0];
    this.snapToPointer_ = options.snapToPointer === void 0 ? !this.hitDetection_ : options.snapToPointer;
  }
  /**
   * @param {Feature} feature Feature.
   * @private
   */
  addFeature_(feature) {
    const geometry = feature.getGeometry();
    if (geometry) {
      const writer = this.SEGMENT_WRITERS_[geometry.getType()];
      if (writer) {
        writer(feature, geometry);
      }
    }
    const map = this.getMap();
    if (map && map.isRendered() && this.getActive()) {
      this.handlePointerAtPixel_(map.getCoordinateFromPixel(this.lastPixel_));
    }
    feature.addEventListener(EventType_default.CHANGE, this.boundHandleFeatureChange_);
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} evt Map browser event.
   * @param {Array<SegmentData>} segments The segments subject to modification.
   * @private
   */
  willModifyFeatures_(evt, segments) {
    if (!this.featuresBeingModified_) {
      this.featuresBeingModified_ = new Collection_default();
      const features = this.featuresBeingModified_.getArray();
      for (let i = 0, ii = segments.length; i < ii; ++i) {
        const feature = segments[i].feature;
        if (feature && !features.includes(feature)) {
          this.featuresBeingModified_.push(feature);
        }
      }
      if (this.featuresBeingModified_.getLength() === 0) {
        this.featuresBeingModified_ = null;
      } else {
        this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYSTART, this.featuresBeingModified_, evt));
      }
    }
  }
  /**
   * @param {Feature} feature Feature.
   * @private
   */
  removeFeature_(feature) {
    this.removeFeatureSegmentData_(feature);
    if (this.vertexFeature_ && this.features_.getLength() === 0) {
      this.overlay_.getSource().removeFeature(this.vertexFeature_);
      this.vertexFeature_ = null;
    }
    feature.removeEventListener(EventType_default.CHANGE, this.boundHandleFeatureChange_);
  }
  /**
   * @param {Feature} feature Feature.
   * @private
   */
  removeFeatureSegmentData_(feature) {
    const rBush = this.rBush_;
    const nodesToRemove = [];
    rBush.forEach(
      /**
       * @param {SegmentData} node RTree node.
       */
      function(node) {
        if (feature === node.feature) {
          nodesToRemove.push(node);
        }
      }
    );
    for (let i = nodesToRemove.length - 1; i >= 0; --i) {
      const nodeToRemove = nodesToRemove[i];
      for (let j = this.dragSegments_.length - 1; j >= 0; --j) {
        if (this.dragSegments_[j][0] === nodeToRemove) {
          this.dragSegments_.splice(j, 1);
        }
      }
      rBush.remove(nodeToRemove);
    }
  }
  /**
   * Activate or deactivate the interaction.
   * @param {boolean} active Active.
   * @observable
   * @api
   * @override
   */
  setActive(active) {
    if (this.vertexFeature_ && !active) {
      this.overlay_.getSource().removeFeature(this.vertexFeature_);
      this.vertexFeature_ = null;
    }
    super.setActive(active);
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    this.overlay_.setMap(map);
    super.setMap(map);
  }
  /**
   * Get the overlay layer that this interaction renders the modification point or vertex to.
   * @return {VectorLayer} Overlay layer.
   * @api
   */
  getOverlay() {
    return this.overlay_;
  }
  /**
   * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceAdd_(event) {
    if (event.feature) {
      this.features_.push(event.feature);
    }
  }
  /**
   * @param {import("../source/Vector.js").VectorSourceEvent} event Event.
   * @private
   */
  handleSourceRemove_(event) {
    if (event.feature) {
      this.features_.remove(event.feature);
    }
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
   * @private
   */
  handleFeatureAdd_(evt) {
    this.addFeature_(evt.element);
  }
  /**
   * @param {import("../events/Event.js").default} evt Event.
   * @private
   */
  handleFeatureChange_(evt) {
    if (!this.changingFeature_) {
      const feature = (
        /** @type {Feature} */
        evt.target
      );
      this.removeFeature_(feature);
      this.addFeature_(feature);
    }
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
   * @private
   */
  handleFeatureRemove_(evt) {
    this.removeFeature_(evt.element);
  }
  /**
   * @param {Feature} feature Feature
   * @param {Point} geometry Geometry.
   * @private
   */
  writePointGeometry_(feature, geometry) {
    const coordinates = geometry.getCoordinates();
    const segmentData = {
      feature,
      geometry,
      segment: [coordinates, coordinates]
    };
    this.rBush_.insert(geometry.getExtent(), segmentData);
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
   * @private
   */
  writeMultiPointGeometry_(feature, geometry) {
    const points = geometry.getCoordinates();
    for (let i = 0, ii = points.length; i < ii; ++i) {
      const coordinates = points[i];
      const segmentData = {
        feature,
        geometry,
        depth: [i],
        index: i,
        segment: [coordinates, coordinates]
      };
      this.rBush_.insert(geometry.getExtent(), segmentData);
    }
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/LineString.js").default} geometry Geometry.
   * @private
   */
  writeLineStringGeometry_(feature, geometry) {
    const coordinates = geometry.getCoordinates();
    for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      const segment = coordinates.slice(i, i + 2);
      const segmentData = {
        feature,
        geometry,
        index: i,
        segment
      };
      this.rBush_.insert(boundingExtent(segment), segmentData);
    }
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
   * @private
   */
  writeMultiLineStringGeometry_(feature, geometry) {
    const lines = geometry.getCoordinates();
    for (let j = 0, jj = lines.length; j < jj; ++j) {
      const coordinates = lines[j];
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        const segment = coordinates.slice(i, i + 2);
        const segmentData = {
          feature,
          geometry,
          depth: [j],
          index: i,
          segment
        };
        this.rBush_.insert(boundingExtent(segment), segmentData);
      }
    }
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/Polygon.js").default} geometry Geometry.
   * @private
   */
  writePolygonGeometry_(feature, geometry) {
    const rings = geometry.getCoordinates();
    for (let j = 0, jj = rings.length; j < jj; ++j) {
      const coordinates = rings[j];
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        const segment = coordinates.slice(i, i + 2);
        const segmentData = {
          feature,
          geometry,
          depth: [j],
          index: i,
          segment
        };
        this.rBush_.insert(boundingExtent(segment), segmentData);
      }
    }
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
   * @private
   */
  writeMultiPolygonGeometry_(feature, geometry) {
    const polygons = geometry.getCoordinates();
    for (let k = 0, kk = polygons.length; k < kk; ++k) {
      const rings = polygons[k];
      for (let j = 0, jj = rings.length; j < jj; ++j) {
        const coordinates = rings[j];
        for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          const segment = coordinates.slice(i, i + 2);
          const segmentData = {
            feature,
            geometry,
            depth: [j, k],
            index: i,
            segment
          };
          this.rBush_.insert(boundingExtent(segment), segmentData);
        }
      }
    }
  }
  /**
   * We convert a circle into two segments.  The segment at index
   * {@link CIRCLE_CENTER_INDEX} is the
   * circle's center (a point).  The segment at index
   * {@link CIRCLE_CIRCUMFERENCE_INDEX} is
   * the circumference, and is not a line segment.
   *
   * @param {Feature} feature Feature.
   * @param {import("../geom/Circle.js").default} geometry Geometry.
   * @private
   */
  writeCircleGeometry_(feature, geometry) {
    const coordinates = geometry.getCenter();
    const centerSegmentData = {
      feature,
      geometry,
      index: CIRCLE_CENTER_INDEX,
      segment: [coordinates, coordinates]
    };
    const circumferenceSegmentData = {
      feature,
      geometry,
      index: CIRCLE_CIRCUMFERENCE_INDEX,
      segment: [coordinates, coordinates]
    };
    const featureSegments = [centerSegmentData, circumferenceSegmentData];
    centerSegmentData.featureSegments = featureSegments;
    circumferenceSegmentData.featureSegments = featureSegments;
    this.rBush_.insert(createOrUpdateFromCoordinate(coordinates), centerSegmentData);
    let circleGeometry = (
      /** @type {import("../geom/Geometry.js").default} */
      geometry
    );
    const userProjection = getUserProjection();
    if (userProjection && this.getMap()) {
      const projection = this.getMap().getView().getProjection();
      circleGeometry = circleGeometry.clone().transform(userProjection, projection);
      circleGeometry = fromCircle(
        /** @type {import("../geom/Circle.js").default} */
        circleGeometry
      ).transform(projection, userProjection);
    }
    this.rBush_.insert(circleGeometry.getExtent(), circumferenceSegmentData);
  }
  /**
   * @param {Feature} feature Feature
   * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
   * @private
   */
  writeGeometryCollectionGeometry_(feature, geometry) {
    const geometries = geometry.getGeometriesArray();
    for (let i = 0; i < geometries.length; ++i) {
      const geometry2 = geometries[i];
      const writer = this.SEGMENT_WRITERS_[geometry2.getType()];
      writer(feature, geometry2);
    }
  }
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {Array<Feature>} features The features being modified.
   * @param {Array<import("../geom/SimpleGeometry.js").default>} geometries The geometries being modified.
   * @param {boolean} existing The vertex represents an existing vertex.
   * @return {Feature} Vertex feature.
   * @private
   */
  createOrUpdateVertexFeature_(coordinates, features, geometries, existing) {
    let vertexFeature = this.vertexFeature_;
    if (!vertexFeature) {
      vertexFeature = new Feature_default(new Point_default(coordinates));
      this.vertexFeature_ = vertexFeature;
      this.overlay_.getSource().addFeature(vertexFeature);
    } else {
      const geometry = vertexFeature.getGeometry();
      geometry.setCoordinates(coordinates);
    }
    vertexFeature.set("features", features);
    vertexFeature.set("geometries", geometries);
    vertexFeature.set("existing", existing);
    return vertexFeature;
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may modify the geometry.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(mapBrowserEvent) {
    if (!mapBrowserEvent.originalEvent) {
      return true;
    }
    this.lastPointerEvent_ = mapBrowserEvent;
    let handled;
    if (!mapBrowserEvent.map.getView().getInteracting() && mapBrowserEvent.type == MapBrowserEventType_default.POINTERMOVE && !this.handlingDownUpSequence) {
      this.handlePointerMove_(mapBrowserEvent);
    }
    if (this.vertexFeature_ && this.deleteCondition_(mapBrowserEvent)) {
      if (mapBrowserEvent.type != MapBrowserEventType_default.SINGLECLICK || !this.ignoreNextSingleClick_) {
        handled = this.removePoint();
      } else {
        handled = true;
      }
    }
    if (mapBrowserEvent.type == MapBrowserEventType_default.SINGLECLICK) {
      this.ignoreNextSingleClick_ = false;
    }
    return super.handleEvent(mapBrowserEvent) && !handled;
  }
  findInsertVerticesAndUpdateDragSegments_(pixelCoordinate) {
    this.handlePointerAtPixel_(pixelCoordinate);
    this.dragSegments_.length = 0;
    this.featuresBeingModified_ = null;
    const vertexFeature = this.vertexFeature_;
    if (!vertexFeature) {
      return;
    }
    const projection = this.getMap().getView().getProjection();
    const insertVertices = [];
    const vertex = vertexFeature.getGeometry().getCoordinates();
    const vertexExtent = boundingExtent([vertex]);
    const segmentDataMatches = this.rBush_.getInExtent(vertexExtent);
    const componentSegments = {};
    segmentDataMatches.sort(compareIndexes);
    for (let i = 0, ii = segmentDataMatches.length; i < ii; ++i) {
      const segmentDataMatch = segmentDataMatches[i];
      const segment = segmentDataMatch.segment;
      let uid = getUid(segmentDataMatch.geometry);
      const depth = segmentDataMatch.depth;
      if (depth) {
        uid += "-" + depth.join("-");
      }
      if (!componentSegments[uid]) {
        componentSegments[uid] = new Array(2);
      }
      if (segmentDataMatch.geometry.getType() === "Circle" && segmentDataMatch.index === CIRCLE_CIRCUMFERENCE_INDEX) {
        const closestVertex = closestOnSegmentData(pixelCoordinate, segmentDataMatch, projection);
        if (equals2(closestVertex, vertex) && !componentSegments[uid][0]) {
          this.dragSegments_.push([segmentDataMatch, 0]);
          componentSegments[uid][0] = segmentDataMatch;
        }
        continue;
      }
      if (equals2(segment[0], vertex) && !componentSegments[uid][0]) {
        this.dragSegments_.push([segmentDataMatch, 0]);
        componentSegments[uid][0] = segmentDataMatch;
        continue;
      }
      if (equals2(segment[1], vertex) && !componentSegments[uid][1]) {
        if (componentSegments[uid][0] && componentSegments[uid][0].index === 0) {
          let coordinates = segmentDataMatch.geometry.getCoordinates();
          switch (segmentDataMatch.geometry.getType()) {
            // prevent dragging closed linestrings by the connecting node
            case "LineString":
            case "MultiLineString":
              continue;
            // if dragging the first vertex of a polygon, ensure the other segment
            // belongs to the closing vertex of the linear ring
            case "MultiPolygon":
              coordinates = coordinates[depth[1]];
            /* falls through */
            case "Polygon":
              if (segmentDataMatch.index !== coordinates[depth[0]].length - 2) {
                continue;
              }
              break;
            default:
          }
        }
        this.dragSegments_.push([segmentDataMatch, 1]);
        componentSegments[uid][1] = segmentDataMatch;
        continue;
      }
      if (getUid(segment) in this.vertexSegments_ && !componentSegments[uid][0] && !componentSegments[uid][1]) {
        insertVertices.push(segmentDataMatch);
      }
    }
    return insertVertices;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} evt Event.
   * @override
   */
  handleDragEvent(evt) {
    this.ignoreNextSingleClick_ = false;
    this.willModifyFeatures_(evt, this.dragSegments_.map(([segment]) => segment));
    const vertex = [evt.coordinate[0] + this.delta_[0], evt.coordinate[1] + this.delta_[1]];
    const features = [];
    const geometries = [];
    for (let i = 0, ii = this.dragSegments_.length; i < ii; ++i) {
      const dragSegment = this.dragSegments_[i];
      const segmentData = dragSegment[0];
      const feature = segmentData.feature;
      if (!features.includes(feature)) {
        features.push(feature);
      }
      const geometry = segmentData.geometry;
      if (!geometries.includes(geometry)) {
        geometries.push(geometry);
      }
      const depth = segmentData.depth;
      let coordinates;
      const segment = segmentData.segment;
      const index = dragSegment[1];
      while (vertex.length < geometry.getStride()) {
        vertex.push(segment[index][vertex.length]);
      }
      switch (geometry.getType()) {
        case "Point":
          coordinates = vertex;
          segment[0] = vertex;
          segment[1] = vertex;
          break;
        case "MultiPoint":
          coordinates = geometry.getCoordinates();
          coordinates[segmentData.index] = vertex;
          segment[0] = vertex;
          segment[1] = vertex;
          break;
        case "LineString":
          coordinates = geometry.getCoordinates();
          coordinates[segmentData.index + index] = vertex;
          segment[index] = vertex;
          break;
        case "MultiLineString":
          coordinates = geometry.getCoordinates();
          coordinates[depth[0]][segmentData.index + index] = vertex;
          segment[index] = vertex;
          break;
        case "Polygon":
          coordinates = geometry.getCoordinates();
          coordinates[depth[0]][segmentData.index + index] = vertex;
          segment[index] = vertex;
          break;
        case "MultiPolygon":
          coordinates = geometry.getCoordinates();
          coordinates[depth[1]][depth[0]][segmentData.index + index] = vertex;
          segment[index] = vertex;
          break;
        case "Circle":
          const circle = (
            /** @type {import("../geom/Circle.js").default} */
            geometry
          );
          segment[0] = vertex;
          segment[1] = vertex;
          if (segmentData.index === CIRCLE_CENTER_INDEX) {
            this.changingFeature_ = true;
            circle.setCenter(vertex);
            this.changingFeature_ = false;
          } else {
            this.changingFeature_ = true;
            const projection = evt.map.getView().getProjection();
            let radius = distance(fromUserCoordinate(circle.getCenter(), projection), fromUserCoordinate(vertex, projection));
            const userProjection = getUserProjection();
            if (userProjection) {
              const circleGeometry = circle.clone().transform(userProjection, projection);
              circleGeometry.setRadius(radius);
              radius = circleGeometry.transform(projection, userProjection).getRadius();
            }
            circle.setRadius(radius);
            this.changingFeature_ = false;
          }
          break;
        default:
      }
      if (coordinates) {
        this.setGeometryCoordinates_(geometry, coordinates);
      }
    }
    this.createOrUpdateVertexFeature_(vertex, features, geometries, true);
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} evt Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(evt) {
    if (!this.condition_(evt)) {
      return false;
    }
    const pixelCoordinate = evt.coordinate;
    const insertVertices = this.findInsertVerticesAndUpdateDragSegments_(pixelCoordinate);
    if (insertVertices?.length && this.insertVertexCondition_(evt)) {
      this.willModifyFeatures_(evt, insertVertices);
      if (this.vertexFeature_) {
        const vertex = this.vertexFeature_.getGeometry().getCoordinates();
        for (let j = insertVertices.length - 1; j >= 0; --j) {
          this.insertVertex_(insertVertices[j], vertex);
        }
        this.ignoreNextSingleClick_ = true;
      }
    }
    return !!this.vertexFeature_;
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} evt Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(evt) {
    for (let i = this.dragSegments_.length - 1; i >= 0; --i) {
      const segmentData = this.dragSegments_[i][0];
      const geometry = segmentData.geometry;
      if (geometry.getType() === "Circle") {
        const circle = (
          /** @type {import("../geom/Circle.js").default} */
          geometry
        );
        const coordinates = circle.getCenter();
        const centerSegmentData = segmentData.featureSegments[0];
        const circumferenceSegmentData = segmentData.featureSegments[1];
        centerSegmentData.segment[0] = coordinates;
        centerSegmentData.segment[1] = coordinates;
        circumferenceSegmentData.segment[0] = coordinates;
        circumferenceSegmentData.segment[1] = coordinates;
        this.rBush_.update(createOrUpdateFromCoordinate(coordinates), centerSegmentData);
        let circleGeometry = circle;
        const userProjection = getUserProjection();
        if (userProjection) {
          const projection = evt.map.getView().getProjection();
          circleGeometry = circleGeometry.clone().transform(userProjection, projection);
          circleGeometry = fromCircle(circleGeometry).transform(projection, userProjection);
        }
        this.rBush_.update(circleGeometry.getExtent(), circumferenceSegmentData);
      } else {
        this.rBush_.update(boundingExtent(segmentData.segment), segmentData);
      }
    }
    if (this.featuresBeingModified_) {
      this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
      this.featuresBeingModified_ = null;
    }
    return false;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} evt Event.
   * @private
   */
  handlePointerMove_(evt) {
    this.lastPixel_ = evt.pixel;
    this.handlePointerAtPixel_(evt.coordinate);
  }
  /**
   * @param {import("../coordinate.js").Coordinate} pixelCoordinate The pixel Coordinate.
   * @private
   */
  handlePointerAtPixel_(pixelCoordinate) {
    const map = this.getMap();
    const pixel = map.getPixelFromCoordinate(pixelCoordinate);
    const projection = map.getView().getProjection();
    const sortByDistance = function(a, b) {
      return projectedDistanceToSegmentDataSquared(pixelCoordinate, a, projection) - projectedDistanceToSegmentDataSquared(pixelCoordinate, b, projection);
    };
    let nodes;
    let hitPointGeometry;
    if (this.hitDetection_) {
      const layerFilter = typeof this.hitDetection_ === "object" ? (layer) => layer === this.hitDetection_ : void 0;
      map.forEachFeatureAtPixel(pixel, (feature, layer, geometry) => {
        if (geometry && geometry.getType() === "Point") {
          geometry = new Point_default(toUserCoordinate(geometry.getCoordinates(), projection));
        }
        const geom = geometry || feature.getGeometry();
        if (geom && geom.getType() === "Point" && feature instanceof Feature_default && this.features_.getArray().includes(feature)) {
          hitPointGeometry = /** @type {Point} */
          geom;
          const coordinate = (
            /** @type {Point} */
            feature.getGeometry().getFlatCoordinates().slice(0, 2)
          );
          nodes = [{
            feature,
            geometry: hitPointGeometry,
            segment: [coordinate, coordinate]
          }];
        }
        return true;
      }, {
        layerFilter
      });
    }
    if (!nodes) {
      const viewExtent = fromUserExtent(createOrUpdateFromCoordinate(pixelCoordinate, tempExtent), projection);
      const buffer2 = map.getView().getResolution() * this.pixelTolerance_;
      const box = toUserExtent(buffer(viewExtent, buffer2, tempExtent), projection);
      nodes = this.rBush_.getInExtent(box);
    }
    if (nodes && nodes.length > 0) {
      const node = nodes.sort(sortByDistance)[0];
      const closestSegment = node.segment;
      let vertex = closestOnSegmentData(pixelCoordinate, node, projection);
      const vertexPixel = map.getPixelFromCoordinate(vertex);
      let dist = distance(pixel, vertexPixel);
      if (hitPointGeometry || dist <= this.pixelTolerance_) {
        const vertexSegments = {};
        vertexSegments[getUid(closestSegment)] = true;
        if (!this.snapToPointer_) {
          this.delta_[0] = vertex[0] - pixelCoordinate[0];
          this.delta_[1] = vertex[1] - pixelCoordinate[1];
        }
        if (node.geometry.getType() === "Circle" && node.index === CIRCLE_CIRCUMFERENCE_INDEX) {
          this.snappedToVertex_ = true;
          this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry], this.snappedToVertex_);
        } else {
          const pixel1 = map.getPixelFromCoordinate(closestSegment[0]);
          const pixel2 = map.getPixelFromCoordinate(closestSegment[1]);
          const squaredDist1 = squaredDistance2(vertexPixel, pixel1);
          const squaredDist2 = squaredDistance2(vertexPixel, pixel2);
          dist = Math.sqrt(Math.min(squaredDist1, squaredDist2));
          this.snappedToVertex_ = dist <= this.pixelTolerance_;
          if (!this.snappedToVertex_ && !this.insertVertexCondition_(this.lastPointerEvent_)) {
            if (this.vertexFeature_) {
              this.overlay_.getSource().removeFeature(this.vertexFeature_);
              this.vertexFeature_ = null;
            }
            return;
          }
          if (this.snappedToVertex_) {
            vertex = squaredDist1 > squaredDist2 ? closestSegment[1] : closestSegment[0];
          }
          this.createOrUpdateVertexFeature_(vertex, [node.feature], [node.geometry], this.snappedToVertex_);
          const geometries = {};
          geometries[getUid(node.geometry)] = true;
          for (let i = 1, ii = nodes.length; i < ii; ++i) {
            const segment = nodes[i].segment;
            if (equals2(closestSegment[0], segment[0]) && equals2(closestSegment[1], segment[1]) || equals2(closestSegment[0], segment[1]) && equals2(closestSegment[1], segment[0])) {
              const geometryUid = getUid(nodes[i].geometry);
              if (!(geometryUid in geometries)) {
                geometries[geometryUid] = true;
                vertexSegments[getUid(segment)] = true;
              }
            } else {
              break;
            }
          }
        }
        this.vertexSegments_ = vertexSegments;
        return;
      }
    }
    if (this.vertexFeature_) {
      this.overlay_.getSource().removeFeature(this.vertexFeature_);
      this.vertexFeature_ = null;
    }
  }
  /**
   * @param {SegmentData} segmentData Segment data.
   * @param {import("../coordinate.js").Coordinate} vertex Vertex.
   * @return {boolean} A vertex was inserted.
   * @private
   */
  insertVertex_(segmentData, vertex) {
    const segment = segmentData.segment;
    const feature = segmentData.feature;
    const geometry = segmentData.geometry;
    const depth = segmentData.depth;
    const index = segmentData.index;
    let coordinates;
    while (vertex.length < geometry.getStride()) {
      vertex.push(0);
    }
    switch (geometry.getType()) {
      case "MultiLineString":
        coordinates = geometry.getCoordinates();
        coordinates[depth[0]].splice(index + 1, 0, vertex);
        break;
      case "Polygon":
        coordinates = geometry.getCoordinates();
        coordinates[depth[0]].splice(index + 1, 0, vertex);
        break;
      case "MultiPolygon":
        coordinates = geometry.getCoordinates();
        coordinates[depth[1]][depth[0]].splice(index + 1, 0, vertex);
        break;
      case "LineString":
        coordinates = geometry.getCoordinates();
        coordinates.splice(index + 1, 0, vertex);
        break;
      default:
        return false;
    }
    this.setGeometryCoordinates_(geometry, coordinates);
    const rTree = this.rBush_;
    rTree.remove(segmentData);
    this.updateSegmentIndices_(geometry, index, depth, 1);
    const newSegmentData = {
      segment: [segment[0], vertex],
      feature,
      geometry,
      depth,
      index
    };
    rTree.insert(boundingExtent(newSegmentData.segment), newSegmentData);
    this.dragSegments_.push([newSegmentData, 1]);
    const newSegmentData2 = {
      segment: [vertex, segment[1]],
      feature,
      geometry,
      depth,
      index: index + 1
    };
    rTree.insert(boundingExtent(newSegmentData2.segment), newSegmentData2);
    this.dragSegments_.push([newSegmentData2, 0]);
    return true;
  }
  updatePointer_(coordinate) {
    if (coordinate) {
      this.findInsertVerticesAndUpdateDragSegments_(coordinate);
    }
    return this.vertexFeature_?.getGeometry().getCoordinates();
  }
  /**
   * Get the current pointer position.
   * @return {import("../coordinate.js").Coordinate | null} The current pointer coordinate.
   */
  getPoint() {
    const coordinate = this.vertexFeature_?.getGeometry().getCoordinates();
    if (!coordinate) {
      return null;
    }
    return toUserCoordinate(coordinate, this.getMap().getView().getProjection());
  }
  /**
   * Check if a point can be removed from the current linestring or polygon at the current
   * pointer position.
   * @return {boolean} A point can be deleted at the current pointer position.
   * @api
   */
  canRemovePoint() {
    if (!this.vertexFeature_) {
      return false;
    }
    if (this.vertexFeature_.get("geometries").every((geometry) => geometry.getType() === "Circle" || geometry.getType().endsWith("Point"))) {
      return false;
    }
    const coordinate = this.vertexFeature_.getGeometry().getCoordinates();
    const segments = this.rBush_.getInExtent(boundingExtent([coordinate]));
    return segments.some(({
      segment
    }) => equals2(segment[0], coordinate) || equals2(segment[1], coordinate));
  }
  /**
   * Removes the vertex currently being pointed from the current linestring or polygon.
   * @param {import('../coordinate.js').Coordinate} [coordinate] If provided, the pointer
   * will be set to the provided coordinate. If not, the current pointer coordinate will be used.
   * @return {boolean} True when a vertex was removed.
   * @api
   */
  removePoint(coordinate) {
    if (coordinate) {
      coordinate = fromUserCoordinate(coordinate, this.getMap().getView().getProjection());
      this.updatePointer_(coordinate);
    }
    if (!this.lastPointerEvent_ || this.lastPointerEvent_ && this.lastPointerEvent_.type != MapBrowserEventType_default.POINTERDRAG) {
      const evt = this.lastPointerEvent_;
      this.willModifyFeatures_(evt, this.dragSegments_.map(([segment]) => segment));
      const removed = this.removeVertex_();
      if (this.featuresBeingModified_) {
        this.dispatchEvent(new ModifyEvent(ModifyEventType.MODIFYEND, this.featuresBeingModified_, evt));
      }
      this.featuresBeingModified_ = null;
      return removed;
    }
    return false;
  }
  /**
   * Removes a vertex from all matching features.
   * @return {boolean} True when a vertex was removed.
   * @private
   */
  removeVertex_() {
    const dragSegments = this.dragSegments_;
    const segmentsByFeature = {};
    let deleted = false;
    let component, coordinates, dragSegment, geometry, i, index, left;
    let newIndex, right, segmentData, uid;
    for (i = dragSegments.length - 1; i >= 0; --i) {
      dragSegment = dragSegments[i];
      segmentData = dragSegment[0];
      uid = getUid(segmentData.feature);
      if (segmentData.depth) {
        uid += "-" + segmentData.depth.join("-");
      }
      if (!(uid in segmentsByFeature)) {
        segmentsByFeature[uid] = {};
      }
      if (dragSegment[1] === 0) {
        segmentsByFeature[uid].right = segmentData;
        segmentsByFeature[uid].index = segmentData.index;
      } else if (dragSegment[1] == 1) {
        segmentsByFeature[uid].left = segmentData;
        segmentsByFeature[uid].index = segmentData.index + 1;
      }
    }
    for (uid in segmentsByFeature) {
      right = segmentsByFeature[uid].right;
      left = segmentsByFeature[uid].left;
      index = segmentsByFeature[uid].index;
      newIndex = index - 1;
      if (left !== void 0) {
        segmentData = left;
      } else {
        segmentData = right;
      }
      if (newIndex < 0) {
        newIndex = 0;
      }
      geometry = segmentData.geometry;
      coordinates = geometry.getCoordinates();
      component = coordinates;
      deleted = false;
      switch (geometry.getType()) {
        case "MultiLineString":
          if (coordinates[segmentData.depth[0]].length > 2) {
            coordinates[segmentData.depth[0]].splice(index, 1);
            deleted = true;
          }
          break;
        case "LineString":
          if (coordinates.length > 2) {
            coordinates.splice(index, 1);
            deleted = true;
          }
          break;
        case "MultiPolygon":
          component = component[segmentData.depth[1]];
        /* falls through */
        case "Polygon":
          component = component[segmentData.depth[0]];
          if (component.length > 4) {
            if (index == component.length - 1) {
              index = 0;
            }
            component.splice(index, 1);
            deleted = true;
            if (index === 0) {
              component.pop();
              component.push(component[0]);
              newIndex = component.length - 1;
            }
          }
          break;
        default:
      }
      if (deleted) {
        this.setGeometryCoordinates_(geometry, coordinates);
        const segments = [];
        if (left !== void 0) {
          this.rBush_.remove(left);
          segments.push(left.segment[0]);
        }
        if (right !== void 0) {
          this.rBush_.remove(right);
          segments.push(right.segment[1]);
        }
        if (left !== void 0 && right !== void 0) {
          const newSegmentData = {
            depth: segmentData.depth,
            feature: segmentData.feature,
            geometry: segmentData.geometry,
            index: newIndex,
            segment: segments
          };
          this.rBush_.insert(boundingExtent(newSegmentData.segment), newSegmentData);
        }
        this.updateSegmentIndices_(geometry, index, segmentData.depth, -1);
        if (this.vertexFeature_) {
          this.overlay_.getSource().removeFeature(this.vertexFeature_);
          this.vertexFeature_ = null;
        }
        dragSegments.length = 0;
      }
    }
    return deleted;
  }
  /**
   * Check if a point can be inserted to the current linestring or polygon at the current
   * pointer position.
   * @return {boolean} A point can be inserted at the current pointer position.
   * @api
   */
  canInsertPoint() {
    if (!this.vertexFeature_) {
      return false;
    }
    if (this.vertexFeature_.get("geometries").every((geometry) => geometry.getType() === "Circle" || geometry.getType().endsWith("Point"))) {
      return false;
    }
    const coordinate = this.vertexFeature_.getGeometry().getCoordinates();
    const segments = this.rBush_.getInExtent(boundingExtent([coordinate]));
    return segments.some(({
      segment
    }) => !(equals2(segment[0], coordinate) || equals2(segment[1], coordinate)));
  }
  /**
   * Inserts the vertex currently being pointed to the current linestring or polygon.
   * @param {import('../coordinate.js').Coordinate} [coordinate] If provided, the pointer
   * will be set to the provided coordinate. If not, the current pointer coordinate will be used.
   * @return {boolean} A vertex was inserted.
   * @api
   */
  insertPoint(coordinate) {
    const pixelCoordinate = coordinate ? fromUserCoordinate(coordinate, this.getMap().getView().getProjection()) : this.vertexFeature_?.getGeometry().getCoordinates();
    if (!pixelCoordinate) {
      return false;
    }
    const insertVertices = this.findInsertVerticesAndUpdateDragSegments_(pixelCoordinate);
    return insertVertices.reduce((prev, segmentData) => prev || this.insertVertex_(segmentData, pixelCoordinate), false);
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {Array} coordinates Coordinates.
   * @private
   */
  setGeometryCoordinates_(geometry, coordinates) {
    this.changingFeature_ = true;
    geometry.setCoordinates(coordinates);
    this.changingFeature_ = false;
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {number} index Index.
   * @param {Array<number>|undefined} depth Depth.
   * @param {number} delta Delta (1 or -1).
   * @private
   */
  updateSegmentIndices_(geometry, index, depth, delta) {
    this.rBush_.forEachInExtent(geometry.getExtent(), function(segmentDataMatch) {
      if (segmentDataMatch.geometry === geometry && (depth === void 0 || segmentDataMatch.depth === void 0 || equals(segmentDataMatch.depth, depth)) && segmentDataMatch.index > index) {
        segmentDataMatch.index += delta;
      }
    });
  }
};
function compareIndexes(a, b) {
  return a.index - b.index;
}
function projectedDistanceToSegmentDataSquared(pointCoordinates, segmentData, projection) {
  const geometry = segmentData.geometry;
  if (geometry.getType() === "Circle") {
    let circleGeometry = (
      /** @type {import("../geom/Circle.js").default} */
      geometry
    );
    if (segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
      const userProjection = getUserProjection();
      if (userProjection) {
        circleGeometry = circleGeometry.clone().transform(userProjection, projection);
      }
      const distanceToCenterSquared = squaredDistance2(circleGeometry.getCenter(), fromUserCoordinate(pointCoordinates, projection));
      const distanceToCircumference = Math.sqrt(distanceToCenterSquared) - circleGeometry.getRadius();
      return distanceToCircumference * distanceToCircumference;
    }
  }
  const coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return squaredDistanceToSegment(coordinate, tempSegment);
}
function closestOnSegmentData(pointCoordinates, segmentData, projection) {
  const geometry = segmentData.geometry;
  if (geometry.getType() === "Circle" && segmentData.index === CIRCLE_CIRCUMFERENCE_INDEX) {
    let circleGeometry = (
      /** @type {import("../geom/Circle.js").default} */
      geometry
    );
    const userProjection = getUserProjection();
    if (userProjection) {
      circleGeometry = circleGeometry.clone().transform(userProjection, projection);
    }
    return toUserCoordinate(circleGeometry.getClosestPoint(fromUserCoordinate(pointCoordinates, projection)), projection);
  }
  const coordinate = fromUserCoordinate(pointCoordinates, projection);
  tempSegment[0] = fromUserCoordinate(segmentData.segment[0], projection);
  tempSegment[1] = fromUserCoordinate(segmentData.segment[1], projection);
  return toUserCoordinate(closestOnSegment(coordinate, tempSegment), projection);
}
function getDefaultStyleFunction2() {
  const style = createEditingStyle();
  return function(feature, resolution) {
    return style["Point"];
  };
}
var Modify_default = Modify;

// node_modules/ol/interaction/Select.js
var SelectEventType = {
  /**
   * Triggered when feature(s) has been (de)selected.
   * @event SelectEvent#select
   * @api
   */
  SELECT: "select"
};
var SelectEvent = class extends Event_default {
  /**
   * @param {SelectEventType} type The event type.
   * @param {Array<import("../Feature.js").default>} selected Selected features.
   * @param {Array<import("../Feature.js").default>} deselected Deselected features.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Associated
   *     {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
   */
  constructor(type, selected, deselected, mapBrowserEvent) {
    super(type);
    this.selected = selected;
    this.deselected = deselected;
    this.mapBrowserEvent = mapBrowserEvent;
  }
};
var originalFeatureStyles = {};
var Select = class _Select extends Interaction_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    super();
    this.on;
    this.once;
    this.un;
    options = options ? options : {};
    this.boundAddFeature_ = this.addFeature_.bind(this);
    this.boundRemoveFeature_ = this.removeFeature_.bind(this);
    this.condition_ = options.condition ? options.condition : singleClick;
    this.addCondition_ = options.addCondition ? options.addCondition : never;
    this.removeCondition_ = options.removeCondition ? options.removeCondition : never;
    this.toggleCondition_ = options.toggleCondition ? options.toggleCondition : shiftKeyOnly;
    this.multi_ = options.multi ? options.multi : false;
    this.filter_ = options.filter ? options.filter : TRUE;
    this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
    this.style_ = options.style !== void 0 ? options.style : getDefaultStyleFunction3();
    this.features_ = options.features || new Collection_default();
    let layerFilter;
    if (options.layers) {
      if (typeof options.layers === "function") {
        layerFilter = options.layers;
      } else {
        const layers = options.layers;
        layerFilter = function(layer) {
          return layers.includes(layer);
        };
      }
    } else {
      layerFilter = TRUE;
    }
    this.layerFilter_ = layerFilter;
    this.featureLayerAssociation_ = {};
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../layer/Layer.js").default} layer Layer.
   * @private
   */
  addFeatureLayerAssociation_(feature, layer) {
    this.featureLayerAssociation_[getUid(feature)] = layer;
  }
  /**
   * Get the selected features.
   * @return {Collection<Feature>} Features collection.
   * @api
   */
  getFeatures() {
    return this.features_;
  }
  /**
   * Returns the Hit-detection tolerance.
   * @return {number} Hit tolerance in pixels.
   * @api
   */
  getHitTolerance() {
    return this.hitTolerance_;
  }
  /**
   * Returns the associated {@link module:ol/layer/Vector~VectorLayer vector layer} of
   * a selected feature.
   * @param {import("../Feature.js").default} feature Feature
   * @return {import('../layer/Vector.js').default} Layer.
   * @api
   */
  getLayer(feature) {
    return (
      /** @type {import('../layer/Vector.js').default} */
      this.featureLayerAssociation_[getUid(feature)]
    );
  }
  /**
   * Hit-detection tolerance. Pixels inside the radius around the given position
   * will be checked for features.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @api
   */
  setHitTolerance(hitTolerance) {
    this.hitTolerance_ = hitTolerance;
  }
  /**
   * Remove the interaction from its current map, if any,  and attach it to a new
   * map, if any. Pass `null` to just remove the interaction from the current map.
   * @param {import("../Map.js").default|null} map Map.
   * @api
   * @override
   */
  setMap(map) {
    const currentMap = this.getMap();
    if (currentMap && this.style_) {
      this.features_.forEach(this.restorePreviousStyle_.bind(this));
    }
    super.setMap(map);
    if (map) {
      this.features_.addEventListener(CollectionEventType_default.ADD, this.boundAddFeature_);
      this.features_.addEventListener(CollectionEventType_default.REMOVE, this.boundRemoveFeature_);
      if (this.style_) {
        this.features_.forEach(this.applySelectedStyle_.bind(this));
      }
    } else {
      this.features_.removeEventListener(CollectionEventType_default.ADD, this.boundAddFeature_);
      this.features_.removeEventListener(CollectionEventType_default.REMOVE, this.boundRemoveFeature_);
    }
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
   * @private
   */
  addFeature_(evt) {
    const feature = evt.element;
    if (this.style_) {
      this.applySelectedStyle_(feature);
    }
    if (!this.getLayer(feature)) {
      const layer = (
        /** @type {VectorLayer} */
        this.getMap().getAllLayers().find(function(layer2) {
          if (layer2 instanceof Vector_default2 && layer2.getSource() && layer2.getSource().hasFeature(feature)) {
            return layer2;
          }
        })
      );
      if (layer) {
        this.addFeatureLayerAssociation_(feature, layer);
      }
    }
  }
  /**
   * @param {import("../Collection.js").CollectionEvent<Feature>} evt Event.
   * @private
   */
  removeFeature_(evt) {
    if (this.style_) {
      this.restorePreviousStyle_(evt.element);
    }
  }
  /**
   * @return {import("../style/Style.js").StyleLike|null} Select style.
   */
  getStyle() {
    return this.style_;
  }
  /**
   * @param {Feature} feature Feature
   * @private
   */
  applySelectedStyle_(feature) {
    const key = getUid(feature);
    if (!(key in originalFeatureStyles)) {
      originalFeatureStyles[key] = feature.getStyle();
    }
    feature.setStyle(this.style_);
  }
  /**
   * @param {Feature} feature Feature
   * @private
   */
  restorePreviousStyle_(feature) {
    const interactions = this.getMap().getInteractions().getArray();
    for (let i = interactions.length - 1; i >= 0; --i) {
      const interaction = interactions[i];
      if (interaction !== this && interaction instanceof _Select && interaction.getStyle() && interaction.getFeatures().getArray().lastIndexOf(feature) !== -1) {
        feature.setStyle(interaction.getStyle());
        return;
      }
    }
    const key = getUid(feature);
    feature.setStyle(originalFeatureStyles[key]);
    delete originalFeatureStyles[key];
  }
  /**
   * @param {Feature} feature Feature.
   * @private
   */
  removeFeatureLayerAssociation_(feature) {
    delete this.featureLayerAssociation_[getUid(feature)];
  }
  /**
   * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event} and may change the
   * selected state of features.
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @override
   */
  handleEvent(mapBrowserEvent) {
    if (!this.condition_(mapBrowserEvent)) {
      return true;
    }
    const add = this.addCondition_(mapBrowserEvent);
    const remove = this.removeCondition_(mapBrowserEvent);
    const toggle = this.toggleCondition_(mapBrowserEvent);
    const set = !add && !remove && !toggle;
    const map = mapBrowserEvent.map;
    const features = this.getFeatures();
    const deselected = [];
    const selected = [];
    if (set) {
      clear(this.featureLayerAssociation_);
      map.forEachFeatureAtPixel(
        mapBrowserEvent.pixel,
        /**
         * @param {import("../Feature.js").FeatureLike} feature Feature.
         * @param {import("../layer/Layer.js").default} layer Layer.
         * @return {boolean|undefined} Continue to iterate over the features.
         */
        (feature, layer) => {
          if (!(feature instanceof Feature_default) || !this.filter_(feature, layer)) {
            return;
          }
          this.addFeatureLayerAssociation_(feature, layer);
          selected.push(feature);
          return !this.multi_;
        },
        {
          layerFilter: this.layerFilter_,
          hitTolerance: this.hitTolerance_
        }
      );
      for (let i = features.getLength() - 1; i >= 0; --i) {
        const feature = features.item(i);
        const index = selected.indexOf(feature);
        if (index > -1) {
          selected.splice(index, 1);
        } else {
          features.remove(feature);
          deselected.push(feature);
        }
      }
      if (selected.length !== 0) {
        features.extend(selected);
      }
    } else {
      map.forEachFeatureAtPixel(
        mapBrowserEvent.pixel,
        /**
         * @param {import("../Feature.js").FeatureLike} feature Feature.
         * @param {import("../layer/Layer.js").default} layer Layer.
         * @return {boolean|undefined} Continue to iterate over the features.
         */
        (feature, layer) => {
          if (!(feature instanceof Feature_default) || !this.filter_(feature, layer)) {
            return;
          }
          if ((add || toggle) && !features.getArray().includes(feature)) {
            this.addFeatureLayerAssociation_(feature, layer);
            selected.push(feature);
          } else if ((remove || toggle) && features.getArray().includes(feature)) {
            deselected.push(feature);
            this.removeFeatureLayerAssociation_(feature);
          }
          return !this.multi_;
        },
        {
          layerFilter: this.layerFilter_,
          hitTolerance: this.hitTolerance_
        }
      );
      for (let j = deselected.length - 1; j >= 0; --j) {
        features.remove(deselected[j]);
      }
      features.extend(selected);
    }
    if (selected.length > 0 || deselected.length > 0) {
      this.dispatchEvent(new SelectEvent(SelectEventType.SELECT, selected, deselected, mapBrowserEvent));
    }
    return true;
  }
};
function getDefaultStyleFunction3() {
  const styles = createEditingStyle();
  extend(styles["Polygon"], styles["LineString"]);
  extend(styles["GeometryCollection"], styles["LineString"]);
  return function(feature) {
    if (!feature.getGeometry()) {
      return null;
    }
    return styles[feature.getGeometry().getType()];
  };
}
var Select_default = Select;

// node_modules/ol/events/SnapEvent.js
var SnapEventType = {
  /**
   * Triggered upon snapping to vertex or edge
   * @event SnapEvent#snap
   * @api
   */
  SNAP: "snap"
};
var SnapEvent = class extends Event_default {
  /**
   * @param {SnapEventType} type Type.
   * @param {Object} options Options.
   * @param {import("../coordinate.js").Coordinate} options.vertex The snapped vertex.
   * @param {import("../coordinate.js").Coordinate} options.vertexPixel The pixel of the snapped vertex.
   * @param {import("../Feature.js").default} options.feature The feature being snapped.
   * @param {Array<import("../coordinate.js").Coordinate>|null} options.segment Segment, or `null` if snapped to a vertex.
   */
  constructor(type, options) {
    super(type);
    this.vertex = options.vertex;
    this.vertexPixel = options.vertexPixel;
    this.feature = options.feature;
    this.segment = options.segment;
  }
};

// node_modules/ol/interaction/Snap.js
function getFeatureFromEvent(evt) {
  if (
    /** @type {import("../source/Vector.js").VectorSourceEvent} */
    evt.feature
  ) {
    return (
      /** @type {import("../source/Vector.js").VectorSourceEvent} */
      evt.feature
    );
  }
  if (
    /** @type {import("../Collection.js").CollectionEvent<import("../Feature.js").default>} */
    evt.element
  ) {
    return (
      /** @type {import("../Collection.js").CollectionEvent<import("../Feature.js").default>} */
      evt.element
    );
  }
  return null;
}
var tempSegment2 = [];
var Snap = class extends Pointer_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const pointerOptions = (
      /** @type {import("./Pointer.js").Options} */
      options
    );
    if (!pointerOptions.handleDownEvent) {
      pointerOptions.handleDownEvent = TRUE;
    }
    if (!pointerOptions.stopDown) {
      pointerOptions.stopDown = FALSE;
    }
    super(pointerOptions);
    this.on;
    this.once;
    this.un;
    this.source_ = options.source ? options.source : null;
    this.vertex_ = options.vertex !== void 0 ? options.vertex : true;
    this.edge_ = options.edge !== void 0 ? options.edge : true;
    this.features_ = options.features ? options.features : null;
    this.featuresListenerKeys_ = [];
    this.featureChangeListenerKeys_ = {};
    this.indexedFeaturesExtents_ = {};
    this.pendingFeatures_ = {};
    this.pixelTolerance_ = options.pixelTolerance !== void 0 ? options.pixelTolerance : 10;
    this.rBush_ = new RBush_default();
    this.GEOMETRY_SEGMENTERS_ = {
      "Point": this.segmentPointGeometry_.bind(this),
      "LineString": this.segmentLineStringGeometry_.bind(this),
      "LinearRing": this.segmentLineStringGeometry_.bind(this),
      "Polygon": this.segmentPolygonGeometry_.bind(this),
      "MultiPoint": this.segmentMultiPointGeometry_.bind(this),
      "MultiLineString": this.segmentMultiLineStringGeometry_.bind(this),
      "MultiPolygon": this.segmentMultiPolygonGeometry_.bind(this),
      "GeometryCollection": this.segmentGeometryCollectionGeometry_.bind(this),
      "Circle": this.segmentCircleGeometry_.bind(this)
    };
  }
  /**
   * Add a feature to the collection of features that we may snap to.
   * @param {import("../Feature.js").default} feature Feature.
   * @param {boolean} [register] Whether to listen to the feature change or not
   *     Defaults to `true`.
   * @api
   */
  addFeature(feature, register) {
    register = register !== void 0 ? register : true;
    const feature_uid = getUid(feature);
    const geometry = feature.getGeometry();
    if (geometry) {
      const segmenter = this.GEOMETRY_SEGMENTERS_[geometry.getType()];
      if (segmenter) {
        this.indexedFeaturesExtents_[feature_uid] = geometry.getExtent(createEmpty());
        const segments = (
          /** @type {Array<Array<import('../coordinate.js').Coordinate>>} */
          []
        );
        segmenter(segments, geometry);
        if (segments.length === 1) {
          this.rBush_.insert(boundingExtent(segments[0]), {
            feature,
            segment: segments[0]
          });
        } else if (segments.length > 1) {
          const extents = segments.map((s) => boundingExtent(s));
          const segmentsData = segments.map((segment) => ({
            feature,
            segment
          }));
          this.rBush_.load(extents, segmentsData);
        }
      }
    }
    if (register) {
      this.featureChangeListenerKeys_[feature_uid] = listen(feature, EventType_default.CHANGE, this.handleFeatureChange_, this);
    }
  }
  /**
   * @return {import("../Collection.js").default<import("../Feature.js").default>|Array<import("../Feature.js").default>} Features.
   * @private
   */
  getFeatures_() {
    let features;
    if (this.features_) {
      features = this.features_;
    } else if (this.source_) {
      features = this.source_.getFeatures();
    }
    return features;
  }
  /**
   * @param {import("../MapBrowserEvent.js").default} evt Map browser event.
   * @return {boolean} `false` to stop event propagation.
   * @api
   * @override
   */
  handleEvent(evt) {
    const result = this.snapTo(evt.pixel, evt.coordinate, evt.map);
    if (result) {
      evt.coordinate = result.vertex.slice(0, 2);
      evt.pixel = result.vertexPixel;
      this.dispatchEvent(new SnapEvent(SnapEventType.SNAP, {
        vertex: evt.coordinate,
        vertexPixel: evt.pixel,
        feature: result.feature,
        segment: result.segment
      }));
    }
    return super.handleEvent(evt);
  }
  /**
   * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent<import("../Feature.js").default>} evt Event.
   * @private
   */
  handleFeatureAdd_(evt) {
    const feature = getFeatureFromEvent(evt);
    if (feature) {
      this.addFeature(feature);
    }
  }
  /**
   * @param {import("../source/Vector.js").VectorSourceEvent|import("../Collection.js").CollectionEvent<import("../Feature.js").default>} evt Event.
   * @private
   */
  handleFeatureRemove_(evt) {
    const feature = getFeatureFromEvent(evt);
    if (feature) {
      this.removeFeature(feature);
    }
  }
  /**
   * @param {import("../events/Event.js").default} evt Event.
   * @private
   */
  handleFeatureChange_(evt) {
    const feature = (
      /** @type {import("../Feature.js").default} */
      evt.target
    );
    if (this.handlingDownUpSequence) {
      const uid = getUid(feature);
      if (!(uid in this.pendingFeatures_)) {
        this.pendingFeatures_[uid] = feature;
      }
    } else {
      this.updateFeature_(feature);
    }
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} evt Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(evt) {
    const featuresToUpdate = Object.values(this.pendingFeatures_);
    if (featuresToUpdate.length) {
      featuresToUpdate.forEach(this.updateFeature_.bind(this));
      this.pendingFeatures_ = {};
    }
    return false;
  }
  /**
   * Remove a feature from the collection of features that we may snap to.
   * @param {import("../Feature.js").default} feature Feature
   * @param {boolean} [unlisten] Whether to unlisten to the feature change
   *     or not. Defaults to `true`.
   * @api
   */
  removeFeature(feature, unlisten) {
    const unregister = unlisten !== void 0 ? unlisten : true;
    const feature_uid = getUid(feature);
    const extent = this.indexedFeaturesExtents_[feature_uid];
    if (extent) {
      const rBush = this.rBush_;
      const nodesToRemove = [];
      rBush.forEachInExtent(extent, function(node) {
        if (feature === node.feature) {
          nodesToRemove.push(node);
        }
      });
      for (let i = nodesToRemove.length - 1; i >= 0; --i) {
        rBush.remove(nodesToRemove[i]);
      }
    }
    if (unregister) {
      unlistenByKey(this.featureChangeListenerKeys_[feature_uid]);
      delete this.featureChangeListenerKeys_[feature_uid];
    }
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    const currentMap = this.getMap();
    const keys = this.featuresListenerKeys_;
    const features = (
      /** @type {Array<import("../Feature.js").default>} */
      this.getFeatures_()
    );
    if (currentMap) {
      keys.forEach(unlistenByKey);
      keys.length = 0;
      this.rBush_.clear();
      Object.values(this.featureChangeListenerKeys_).forEach(unlistenByKey);
      this.featureChangeListenerKeys_ = {};
    }
    super.setMap(map);
    if (map) {
      if (this.features_) {
        keys.push(listen(this.features_, CollectionEventType_default.ADD, this.handleFeatureAdd_, this), listen(this.features_, CollectionEventType_default.REMOVE, this.handleFeatureRemove_, this));
      } else if (this.source_) {
        keys.push(listen(this.source_, VectorEventType_default.ADDFEATURE, this.handleFeatureAdd_, this), listen(this.source_, VectorEventType_default.REMOVEFEATURE, this.handleFeatureRemove_, this));
      }
      features.forEach((feature) => this.addFeature(feature));
    }
  }
  /**
   * @param {import("../pixel.js").Pixel} pixel Pixel
   * @param {import("../coordinate.js").Coordinate} pixelCoordinate Coordinate
   * @param {import("../Map.js").default} map Map.
   * @return {Result|null} Snap result
   */
  snapTo(pixel, pixelCoordinate, map) {
    const projection = map.getView().getProjection();
    const projectedCoordinate = fromUserCoordinate(pixelCoordinate, projection);
    const box = toUserExtent(buffer(boundingExtent([projectedCoordinate]), map.getView().getResolution() * this.pixelTolerance_), projection);
    const segments = this.rBush_.getInExtent(box);
    const segmentsLength = segments.length;
    if (segmentsLength === 0) {
      return null;
    }
    let closestVertex;
    let minSquaredDistance = Infinity;
    let closestFeature;
    let closestSegment = null;
    const squaredPixelTolerance = this.pixelTolerance_ * this.pixelTolerance_;
    const getResult = () => {
      if (closestVertex) {
        const vertexPixel = map.getPixelFromCoordinate(closestVertex);
        const squaredPixelDistance = squaredDistance2(pixel, vertexPixel);
        if (squaredPixelDistance <= squaredPixelTolerance) {
          return {
            vertex: closestVertex,
            vertexPixel: [Math.round(vertexPixel[0]), Math.round(vertexPixel[1])],
            feature: closestFeature,
            segment: closestSegment
          };
        }
      }
      return null;
    };
    if (this.vertex_) {
      for (let i = 0; i < segmentsLength; ++i) {
        const segmentData = segments[i];
        if (segmentData.feature.getGeometry().getType() !== "Circle") {
          segmentData.segment.forEach((vertex) => {
            const tempVertexCoord = fromUserCoordinate(vertex, projection);
            const delta = squaredDistance2(projectedCoordinate, tempVertexCoord);
            if (delta < minSquaredDistance) {
              closestVertex = vertex;
              minSquaredDistance = delta;
              closestFeature = segmentData.feature;
            }
          });
        }
      }
      const result = getResult();
      if (result) {
        return result;
      }
    }
    if (this.edge_) {
      for (let i = 0; i < segmentsLength; ++i) {
        let vertex = null;
        const segmentData = segments[i];
        if (segmentData.feature.getGeometry().getType() === "Circle") {
          let circleGeometry = segmentData.feature.getGeometry();
          const userProjection = getUserProjection();
          if (userProjection) {
            circleGeometry = circleGeometry.clone().transform(userProjection, projection);
          }
          vertex = closestOnCircle(
            projectedCoordinate,
            /** @type {import("../geom/Circle.js").default} */
            circleGeometry
          );
        } else {
          const [segmentStart, segmentEnd] = segmentData.segment;
          if (segmentEnd) {
            tempSegment2[0] = fromUserCoordinate(segmentStart, projection);
            tempSegment2[1] = fromUserCoordinate(segmentEnd, projection);
            vertex = closestOnSegment(projectedCoordinate, tempSegment2);
          }
        }
        if (vertex) {
          const delta = squaredDistance2(projectedCoordinate, vertex);
          if (delta < minSquaredDistance) {
            closestVertex = toUserCoordinate(vertex, projection);
            closestSegment = segmentData.feature.getGeometry().getType() === "Circle" ? null : segmentData.segment;
            minSquaredDistance = delta;
            closestFeature = segmentData.feature;
          }
        }
      }
      const result = getResult();
      if (result) {
        return result;
      }
    }
    return null;
  }
  /**
   * @param {import("../Feature.js").default} feature Feature
   * @private
   */
  updateFeature_(feature) {
    this.removeFeature(feature, false);
    this.addFeature(feature, false);
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/Circle.js").default} geometry Geometry.
   * @private
   */
  segmentCircleGeometry_(segments, geometry) {
    const projection = this.getMap().getView().getProjection();
    let circleGeometry = geometry;
    const userProjection = getUserProjection();
    if (userProjection) {
      circleGeometry = circleGeometry.clone().transform(userProjection, projection);
    }
    const polygon = fromCircle(circleGeometry);
    if (userProjection) {
      polygon.transform(projection, userProjection);
    }
    const coordinates = polygon.getCoordinates()[0];
    for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      segments.push(coordinates.slice(i, i + 2));
    }
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/GeometryCollection.js").default} geometry Geometry.
   * @private
   */
  segmentGeometryCollectionGeometry_(segments, geometry) {
    const geometries = geometry.getGeometriesArray();
    for (let i = 0; i < geometries.length; ++i) {
      const segmenter = this.GEOMETRY_SEGMENTERS_[geometries[i].getType()];
      if (segmenter) {
        segmenter(segments, geometries[i]);
      }
    }
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/LineString.js").default} geometry Geometry.
   * @private
   */
  segmentLineStringGeometry_(segments, geometry) {
    const coordinates = geometry.getCoordinates();
    for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      segments.push(coordinates.slice(i, i + 2));
    }
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/MultiLineString.js").default} geometry Geometry.
   * @private
   */
  segmentMultiLineStringGeometry_(segments, geometry) {
    const lines = geometry.getCoordinates();
    for (let j = 0, jj = lines.length; j < jj; ++j) {
      const coordinates = lines[j];
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        segments.push(coordinates.slice(i, i + 2));
      }
    }
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/MultiPoint.js").default} geometry Geometry.
   * @private
   */
  segmentMultiPointGeometry_(segments, geometry) {
    geometry.getCoordinates().forEach((point) => {
      segments.push([point]);
    });
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/MultiPolygon.js").default} geometry Geometry.
   * @private
   */
  segmentMultiPolygonGeometry_(segments, geometry) {
    const polygons = geometry.getCoordinates();
    for (let k = 0, kk = polygons.length; k < kk; ++k) {
      const rings = polygons[k];
      for (let j = 0, jj = rings.length; j < jj; ++j) {
        const coordinates = rings[j];
        for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
          segments.push(coordinates.slice(i, i + 2));
        }
      }
    }
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/Point.js").default} geometry Geometry.
   * @private
   */
  segmentPointGeometry_(segments, geometry) {
    segments.push([geometry.getCoordinates()]);
  }
  /**
   * @param {Array<Array<import('../coordinate.js').Coordinate>>} segments Segments
   * @param {import("../geom/Polygon.js").default} geometry Geometry.
   * @private
   */
  segmentPolygonGeometry_(segments, geometry) {
    const rings = geometry.getCoordinates();
    for (let j = 0, jj = rings.length; j < jj; ++j) {
      const coordinates = rings[j];
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        segments.push(coordinates.slice(i, i + 2));
      }
    }
  }
};
var Snap_default = Snap;

// node_modules/ol/interaction/Translate.js
var TranslateEventType = {
  /**
   * Triggered upon feature translation start.
   * @event TranslateEvent#translatestart
   * @api
   */
  TRANSLATESTART: "translatestart",
  /**
   * Triggered upon feature translation.
   * @event TranslateEvent#translating
   * @api
   */
  TRANSLATING: "translating",
  /**
   * Triggered upon feature translation end.
   * @event TranslateEvent#translateend
   * @api
   */
  TRANSLATEEND: "translateend"
};
var TranslateEvent = class extends Event_default {
  /**
   * @param {TranslateEventType} type Type.
   * @param {Collection<Feature>} features The features translated.
   * @param {import("../coordinate.js").Coordinate} coordinate The event coordinate.
   * @param {import("../coordinate.js").Coordinate} startCoordinate The original coordinates before.translation started
   * @param {import("../MapBrowserEvent.js").default} mapBrowserEvent Map browser event.
   */
  constructor(type, features, coordinate, startCoordinate, mapBrowserEvent) {
    super(type);
    this.features = features;
    this.coordinate = coordinate;
    this.startCoordinate = startCoordinate;
    this.mapBrowserEvent = mapBrowserEvent;
  }
};
var Translate = class extends Pointer_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    super(
      /** @type {import("./Pointer.js").Options} */
      options
    );
    this.on;
    this.once;
    this.un;
    this.lastCoordinate_ = null;
    this.startCoordinate_ = null;
    this.features_ = options.features !== void 0 ? options.features : null;
    let layerFilter;
    if (options.layers && !this.features_) {
      if (typeof options.layers === "function") {
        layerFilter = options.layers;
      } else {
        const layers = options.layers;
        layerFilter = function(layer) {
          return layers.includes(layer);
        };
      }
    } else {
      layerFilter = TRUE;
    }
    this.layerFilter_ = layerFilter;
    this.filter_ = options.filter && !this.features_ ? options.filter : TRUE;
    this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;
    this.condition_ = options.condition ? options.condition : always;
    this.lastFeature_ = null;
    this.addChangeListener(Property_default.ACTIVE, this.handleActiveChanged_);
  }
  /**
   * Handle pointer down events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleDownEvent(event) {
    if (!event.originalEvent || !this.condition_(event)) {
      return false;
    }
    this.lastFeature_ = this.featuresAtPixel_(event.pixel, event.map);
    if (!this.lastCoordinate_ && this.lastFeature_) {
      this.startCoordinate_ = event.coordinate;
      this.lastCoordinate_ = event.coordinate;
      this.handleMoveEvent(event);
      const features = this.features_ || new Collection_default([this.lastFeature_]);
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATESTART, features, event.coordinate, this.startCoordinate_, event));
      return true;
    }
    return false;
  }
  /**
   * Handle pointer up events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @return {boolean} If the event was consumed.
   * @override
   */
  handleUpEvent(event) {
    if (this.lastCoordinate_) {
      this.lastCoordinate_ = null;
      this.handleMoveEvent(event);
      const features = this.features_ || new Collection_default([this.lastFeature_]);
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATEEND, features, event.coordinate, this.startCoordinate_, event));
      this.startCoordinate_ = null;
      return true;
    }
    return false;
  }
  /**
   * Handle pointer drag events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @override
   */
  handleDragEvent(event) {
    if (this.lastCoordinate_) {
      const newCoordinate = event.coordinate;
      const projection = event.map.getView().getProjection();
      const newViewCoordinate = fromUserCoordinate(newCoordinate, projection);
      const lastViewCoordinate = fromUserCoordinate(this.lastCoordinate_, projection);
      const deltaX = newViewCoordinate[0] - lastViewCoordinate[0];
      const deltaY = newViewCoordinate[1] - lastViewCoordinate[1];
      const features = this.features_ || new Collection_default([this.lastFeature_]);
      const userProjection = getUserProjection();
      features.forEach(function(feature) {
        const geom = feature.getGeometry();
        if (userProjection) {
          geom.transform(userProjection, projection);
          geom.translate(deltaX, deltaY);
          geom.transform(projection, userProjection);
        } else {
          geom.translate(deltaX, deltaY);
        }
        feature.setGeometry(geom);
      });
      this.lastCoordinate_ = newCoordinate;
      this.dispatchEvent(new TranslateEvent(TranslateEventType.TRANSLATING, features, newCoordinate, this.startCoordinate_, event));
    }
  }
  /**
   * Handle pointer move events.
   * @param {import("../MapBrowserEvent.js").default} event Event.
   * @override
   */
  handleMoveEvent(event) {
    const elem = event.map.getViewport();
    if (this.featuresAtPixel_(event.pixel, event.map)) {
      elem.classList.remove(this.lastCoordinate_ ? "ol-grab" : "ol-grabbing");
      elem.classList.add(this.lastCoordinate_ ? "ol-grabbing" : "ol-grab");
    } else {
      elem.classList.remove("ol-grab", "ol-grabbing");
    }
  }
  /**
   * Tests to see if the given coordinates intersects any of our selected
   * features.
   * @param {import("../pixel.js").Pixel} pixel Pixel coordinate to test for intersection.
   * @param {import("../Map.js").default} map Map to test the intersection on.
   * @return {Feature} Returns the feature found at the specified pixel
   * coordinates.
   * @private
   */
  featuresAtPixel_(pixel, map) {
    return map.forEachFeatureAtPixel(pixel, (feature, layer) => {
      if (!(feature instanceof Feature_default) || !this.filter_(feature, layer)) {
        return void 0;
      }
      if (this.features_ && !this.features_.getArray().includes(feature)) {
        return void 0;
      }
      return feature;
    }, {
      layerFilter: this.layerFilter_,
      hitTolerance: this.hitTolerance_
    });
  }
  /**
   * Returns the Hit-detection tolerance.
   * @return {number} Hit tolerance in pixels.
   * @api
   */
  getHitTolerance() {
    return this.hitTolerance_;
  }
  /**
   * Hit-detection tolerance. Pixels inside the radius around the given position
   * will be checked for features.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @api
   */
  setHitTolerance(hitTolerance) {
    this.hitTolerance_ = hitTolerance;
  }
  /**
   * Remove the interaction from its current map and attach it to the new map.
   * Subclasses may set up event handlers to get notified about changes to
   * the map here.
   * @param {import("../Map.js").default} map Map.
   * @override
   */
  setMap(map) {
    const oldMap = this.getMap();
    super.setMap(map);
    this.updateState_(oldMap);
  }
  /**
   * @private
   */
  handleActiveChanged_() {
    this.updateState_(null);
  }
  /**
   * @param {import("../Map.js").default} oldMap Old map.
   * @private
   */
  updateState_(oldMap) {
    let map = this.getMap();
    const active = this.getActive();
    if (!map || !active) {
      map = map || oldMap;
      if (map) {
        const elem = map.getViewport();
        elem.classList.remove("ol-grab", "ol-grabbing");
      }
    }
  }
};
var Translate_default = Translate;
export {
  DblClickDragZoom_default as DblClickDragZoom,
  DoubleClickZoom_default as DoubleClickZoom,
  DragAndDrop_default as DragAndDrop,
  DragBox_default as DragBox,
  DragPan_default as DragPan,
  DragRotate_default as DragRotate,
  DragRotateAndZoom_default as DragRotateAndZoom,
  DragZoom_default as DragZoom,
  Draw_default as Draw,
  Extent_default as Extent,
  Interaction_default as Interaction,
  KeyboardPan_default as KeyboardPan,
  KeyboardZoom_default as KeyboardZoom,
  Link_default as Link,
  Modify_default as Modify,
  MouseWheelZoom_default as MouseWheelZoom,
  PinchRotate_default as PinchRotate,
  PinchZoom_default as PinchZoom,
  Pointer_default as Pointer,
  Select_default as Select,
  Snap_default as Snap,
  Translate_default as Translate,
  defaults
};
//# sourceMappingURL=ol_interaction.js.map
