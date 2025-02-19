import {
  FullScreen_default
} from "./chunk-CVLQ672G.js";
import {
  Attribution_default,
  EventType_default as EventType_default2,
  Map_default,
  Overlay_default,
  Rotate_default,
  Zoom_default,
  defaults
} from "./chunk-RNKQR4MV.js";
import "./chunk-SITR5SFQ.js";
import "./chunk-PWOXHWUC.js";
import {
  Control_default,
  MapProperty_default
} from "./chunk-CCENDKLH.js";
import "./chunk-JX6G7I4E.js";
import "./chunk-S7Q7BWLM.js";
import "./chunk-GKPGQ42P.js";
import "./chunk-GQU4XHOU.js";
import "./chunk-N4P2OMPA.js";
import "./chunk-LSEJCB2Y.js";
import "./chunk-655M5QKT.js";
import "./chunk-5CXUNJWW.js";
import {
  Collection_default
} from "./chunk-BDEWHVOF.js";
import "./chunk-RE7YPHWR.js";
import {
  MapEventType_default
} from "./chunk-ZO3Y5Y6G.js";
import {
  CLASS_COLLAPSED,
  CLASS_CONTROL,
  CLASS_UNSELECTABLE
} from "./chunk-4UFEOFXY.js";
import {
  replaceNode
} from "./chunk-TALNCFXE.js";
import "./chunk-4Z5KK6QB.js";
import "./chunk-AX5WOFAA.js";
import {
  ViewProperty_default,
  View_default,
  easeOut
} from "./chunk-GVA6PU2J.js";
import {
  fromExtent
} from "./chunk-II5KOT2H.js";
import "./chunk-JDURIDCO.js";
import {
  METERS_PER_UNIT,
  containsExtent,
  equals,
  fromUserExtent,
  get,
  getBottomRight,
  getPointResolution,
  getTopLeft,
  getTransformFromProjections,
  getUserProjection,
  identityTransform,
  scaleFromCenter,
  wrapX2 as wrapX
} from "./chunk-KD5NYAAV.js";
import {
  clamp
} from "./chunk-UVCLGJLE.js";
import {
  ObjectEventType_default
} from "./chunk-BPFTGO52.js";
import {
  listen,
  listenOnce,
  stopPropagation,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import "./chunk-VNWMKJWE.js";
import "./chunk-IJQ6LSTY.js";
import {
  EventType_default
} from "./chunk-ZD2NNC7F.js";
import "./chunk-4MWRP73S.js";

// node_modules/ol/control/MousePosition.js
var PROJECTION = "projection";
var COORDINATE_FORMAT = "coordinateFormat";
var MousePosition = class extends Control_default {
  /**
   * @param {Options} [options] Mouse position options.
   */
  constructor(options) {
    options = options ? options : {};
    const element = document.createElement("div");
    element.className = options.className !== void 0 ? options.className : "ol-mouse-position";
    super({
      element,
      render: options.render,
      target: options.target
    });
    this.on;
    this.once;
    this.un;
    this.addChangeListener(PROJECTION, this.handleProjectionChanged_);
    if (options.coordinateFormat) {
      this.setCoordinateFormat(options.coordinateFormat);
    }
    if (options.projection) {
      this.setProjection(options.projection);
    }
    this.renderOnMouseOut_ = options.placeholder !== void 0;
    this.placeholder_ = this.renderOnMouseOut_ ? options.placeholder : "&#160;";
    this.renderedHTML_ = element.innerHTML;
    this.mapProjection_ = null;
    this.transform_ = null;
    this.wrapX_ = options.wrapX === false ? false : true;
  }
  /**
   * @private
   */
  handleProjectionChanged_() {
    this.transform_ = null;
  }
  /**
   * Return the coordinate format type used to render the current position or
   * undefined.
   * @return {import("../coordinate.js").CoordinateFormat|undefined} The format to render the current
   *     position in.
   * @observable
   * @api
   */
  getCoordinateFormat() {
    return (
      /** @type {import("../coordinate.js").CoordinateFormat|undefined} */
      this.get(COORDINATE_FORMAT)
    );
  }
  /**
   * Return the projection that is used to report the mouse position.
   * @return {import("../proj/Projection.js").default|undefined} The projection to report mouse
   *     position in.
   * @observable
   * @api
   */
  getProjection() {
    return (
      /** @type {import("../proj/Projection.js").default|undefined} */
      this.get(PROJECTION)
    );
  }
  /**
   * @param {MouseEvent} event Browser event.
   * @protected
   */
  handleMouseMove(event) {
    const map = this.getMap();
    this.updateHTML_(map.getEventPixel(event));
  }
  /**
   * @param {Event} event Browser event.
   * @protected
   */
  handleMouseOut(event) {
    this.updateHTML_(null);
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
    super.setMap(map);
    if (map) {
      const viewport = map.getViewport();
      this.listenerKeys.push(listen(viewport, EventType_default2.POINTERMOVE, this.handleMouseMove, this));
      if (this.renderOnMouseOut_) {
        this.listenerKeys.push(listen(viewport, EventType_default2.POINTEROUT, this.handleMouseOut, this));
      }
      this.updateHTML_(null);
    }
  }
  /**
   * Set the coordinate format type used to render the current position.
   * @param {import("../coordinate.js").CoordinateFormat} format The format to render the current
   *     position in.
   * @observable
   * @api
   */
  setCoordinateFormat(format) {
    this.set(COORDINATE_FORMAT, format);
  }
  /**
   * Set the projection that is used to report the mouse position.
   * @param {import("../proj.js").ProjectionLike} projection The projection to report mouse
   *     position in.
   * @observable
   * @api
   */
  setProjection(projection) {
    this.set(PROJECTION, get(projection));
  }
  /**
   * @param {?import("../pixel.js").Pixel} pixel Pixel.
   * @private
   */
  updateHTML_(pixel) {
    let html = this.placeholder_;
    if (pixel && this.mapProjection_) {
      if (!this.transform_) {
        const projection = this.getProjection();
        if (projection) {
          this.transform_ = getTransformFromProjections(this.mapProjection_, projection);
        } else {
          this.transform_ = identityTransform;
        }
      }
      const map = this.getMap();
      const coordinate = map.getCoordinateFromPixelInternal(pixel);
      if (coordinate) {
        const userProjection = getUserProjection();
        if (userProjection) {
          this.transform_ = getTransformFromProjections(this.mapProjection_, userProjection);
        }
        this.transform_(coordinate, coordinate);
        if (this.wrapX_) {
          const projection = userProjection || this.getProjection() || this.mapProjection_;
          wrapX(coordinate, projection);
        }
        const coordinateFormat = this.getCoordinateFormat();
        if (coordinateFormat) {
          html = coordinateFormat(coordinate);
        } else {
          html = coordinate.toString();
        }
      }
    }
    if (!this.renderedHTML_ || html !== this.renderedHTML_) {
      this.element.innerHTML = html;
      this.renderedHTML_ = html;
    }
  }
  /**
   * Update the projection. Rendering of the coordinates is done in
   * `handleMouseMove` and `handleMouseUp`.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(mapEvent) {
    const frameState = mapEvent.frameState;
    if (!frameState) {
      this.mapProjection_ = null;
    } else {
      if (this.mapProjection_ != frameState.viewState.projection) {
        this.mapProjection_ = frameState.viewState.projection;
        this.transform_ = null;
      }
    }
  }
};
var MousePosition_default = MousePosition;

// node_modules/ol/control/OverviewMap.js
var MAX_RATIO = 0.75;
var MIN_RATIO = 0.1;
var OverviewMap = class extends Control_default {
  /**
   * @param {Options} [options] OverviewMap options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      element: document.createElement("div"),
      render: options.render,
      target: options.target
    });
    this.boundHandleRotationChanged_ = this.handleRotationChanged_.bind(this);
    this.collapsed_ = options.collapsed !== void 0 ? options.collapsed : true;
    this.collapsible_ = options.collapsible !== void 0 ? options.collapsible : true;
    if (!this.collapsible_) {
      this.collapsed_ = false;
    }
    this.rotateWithView_ = options.rotateWithView !== void 0 ? options.rotateWithView : false;
    this.viewExtent_ = void 0;
    const className = options.className !== void 0 ? options.className : "ol-overviewmap";
    const tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Overview map";
    const collapseLabel = options.collapseLabel !== void 0 ? options.collapseLabel : "‹";
    if (typeof collapseLabel === "string") {
      this.collapseLabel_ = document.createElement("span");
      this.collapseLabel_.textContent = collapseLabel;
    } else {
      this.collapseLabel_ = collapseLabel;
    }
    const label = options.label !== void 0 ? options.label : "›";
    if (typeof label === "string") {
      this.label_ = document.createElement("span");
      this.label_.textContent = label;
    } else {
      this.label_ = label;
    }
    const activeLabel = this.collapsible_ && !this.collapsed_ ? this.collapseLabel_ : this.label_;
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.title = tipLabel;
    button.appendChild(activeLabel);
    button.addEventListener(EventType_default.CLICK, this.handleClick_.bind(this), false);
    this.ovmapDiv_ = document.createElement("div");
    this.ovmapDiv_.className = "ol-overviewmap-map";
    this.view_ = options.view;
    const ovmap = new Map_default({
      view: options.view,
      controls: new Collection_default(),
      interactions: new Collection_default()
    });
    this.ovmap_ = ovmap;
    if (options.layers) {
      options.layers.forEach(function(layer) {
        ovmap.addLayer(layer);
      });
    }
    const box = document.createElement("div");
    box.className = "ol-overviewmap-box";
    box.style.boxSizing = "border-box";
    this.boxOverlay_ = new Overlay_default({
      position: [0, 0],
      positioning: "center-center",
      element: box
    });
    this.ovmap_.addOverlay(this.boxOverlay_);
    const cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL + (this.collapsed_ && this.collapsible_ ? " " + CLASS_COLLAPSED : "") + (this.collapsible_ ? "" : " ol-uncollapsible");
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(this.ovmapDiv_);
    element.appendChild(button);
    const overlay = this.boxOverlay_;
    const overlayBox = this.boxOverlay_.getElement();
    const computeDesiredMousePosition = (mousePosition) => {
      return {
        clientX: mousePosition.clientX,
        clientY: mousePosition.clientY
      };
    };
    const move = function(event) {
      const position = (
        /** @type {?} */
        computeDesiredMousePosition(event)
      );
      const coordinates = ovmap.getEventCoordinate(
        /** @type {MouseEvent} */
        position
      );
      overlay.setPosition(coordinates);
    };
    const endMoving = (event) => {
      const coordinates = ovmap.getEventCoordinateInternal(event);
      const map = this.getMap();
      map.getView().setCenterInternal(coordinates);
      const ownerDocument = map.getOwnerDocument();
      ownerDocument.removeEventListener("pointermove", move);
      ownerDocument.removeEventListener("pointerup", endMoving);
    };
    this.ovmapDiv_.addEventListener("pointerdown", (event) => {
      const ownerDocument = this.getMap().getOwnerDocument();
      if (event.target === overlayBox) {
        ownerDocument.addEventListener("pointermove", move);
      }
      ownerDocument.addEventListener("pointerup", endMoving);
    });
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
    if (map === oldMap) {
      return;
    }
    if (oldMap) {
      const oldView = oldMap.getView();
      if (oldView) {
        this.unbindView_(oldView);
      }
      this.ovmap_.setTarget(null);
    }
    super.setMap(map);
    if (map) {
      this.ovmap_.setTarget(this.ovmapDiv_);
      this.listenerKeys.push(listen(map, ObjectEventType_default.PROPERTYCHANGE, this.handleMapPropertyChange_, this));
      const view = map.getView();
      if (view) {
        this.bindView_(view);
      }
      if (!this.ovmap_.isRendered()) {
        this.updateBoxAfterOvmapIsRendered_();
      }
    }
  }
  /**
   * Handle map property changes.  This only deals with changes to the map's view.
   * @param {import("../Object.js").ObjectEvent} event The propertychange event.
   * @private
   */
  handleMapPropertyChange_(event) {
    if (event.key === MapProperty_default.VIEW) {
      const oldView = (
        /** @type {import("../View.js").default} */
        event.oldValue
      );
      if (oldView) {
        this.unbindView_(oldView);
      }
      const newView = this.getMap().getView();
      this.bindView_(newView);
    } else if (!this.ovmap_.isRendered() && (event.key === MapProperty_default.TARGET || event.key === MapProperty_default.SIZE)) {
      this.ovmap_.updateSize();
    }
  }
  /**
   * Register listeners for view property changes.
   * @param {import("../View.js").default} view The view.
   * @private
   */
  bindView_(view) {
    if (!this.view_) {
      const newView = new View_default({
        projection: view.getProjection()
      });
      this.ovmap_.setView(newView);
    }
    view.addChangeListener(ViewProperty_default.ROTATION, this.boundHandleRotationChanged_);
    this.handleRotationChanged_();
    if (view.isDef()) {
      this.ovmap_.updateSize();
      this.resetExtent_();
    }
  }
  /**
   * Unregister listeners for view property changes.
   * @param {import("../View.js").default} view The view.
   * @private
   */
  unbindView_(view) {
    view.removeChangeListener(ViewProperty_default.ROTATION, this.boundHandleRotationChanged_);
  }
  /**
   * Handle rotation changes to the main map.
   * @private
   */
  handleRotationChanged_() {
    if (this.rotateWithView_) {
      this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
    }
  }
  /**
   * Reset the overview map extent if the box size (width or
   * height) is less than the size of the overview map size times minRatio
   * or is greater than the size of the overview size times maxRatio.
   *
   * If the map extent was not reset, the box size can fits in the defined
   * ratio sizes. This method then checks if is contained inside the overview
   * map current extent. If not, recenter the overview map to the current
   * main map center location.
   * @private
   */
  validateExtent_() {
    const map = this.getMap();
    const ovmap = this.ovmap_;
    if (!map.isRendered() || !ovmap.isRendered()) {
      return;
    }
    const mapSize = (
      /** @type {import("../size.js").Size} */
      map.getSize()
    );
    const view = map.getView();
    const extent = view.calculateExtentInternal(mapSize);
    if (this.viewExtent_ && equals(extent, this.viewExtent_)) {
      return;
    }
    this.viewExtent_ = extent;
    const ovmapSize = (
      /** @type {import("../size.js").Size} */
      ovmap.getSize()
    );
    const ovview = ovmap.getView();
    const ovextent = ovview.calculateExtentInternal(ovmapSize);
    const topLeftPixel = ovmap.getPixelFromCoordinateInternal(getTopLeft(extent));
    const bottomRightPixel = ovmap.getPixelFromCoordinateInternal(getBottomRight(extent));
    const boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
    const boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);
    const ovmapWidth = ovmapSize[0];
    const ovmapHeight = ovmapSize[1];
    if (boxWidth < ovmapWidth * MIN_RATIO || boxHeight < ovmapHeight * MIN_RATIO || boxWidth > ovmapWidth * MAX_RATIO || boxHeight > ovmapHeight * MAX_RATIO) {
      this.resetExtent_();
    } else if (!containsExtent(ovextent, extent)) {
      this.recenter_();
    }
  }
  /**
   * Reset the overview map extent to half calculated min and max ratio times
   * the extent of the main map.
   * @private
   */
  resetExtent_() {
    if (MAX_RATIO === 0 || MIN_RATIO === 0) {
      return;
    }
    const map = this.getMap();
    const ovmap = this.ovmap_;
    const mapSize = (
      /** @type {import("../size.js").Size} */
      map.getSize()
    );
    const view = map.getView();
    const extent = view.calculateExtentInternal(mapSize);
    const ovview = ovmap.getView();
    const steps = Math.log(MAX_RATIO / MIN_RATIO) / Math.LN2;
    const ratio = 1 / (Math.pow(2, steps / 2) * MIN_RATIO);
    scaleFromCenter(extent, ratio);
    ovview.fitInternal(fromExtent(extent));
  }
  /**
   * Set the center of the overview map to the map center without changing its
   * resolution.
   * @private
   */
  recenter_() {
    const map = this.getMap();
    const ovmap = this.ovmap_;
    const view = map.getView();
    const ovview = ovmap.getView();
    ovview.setCenterInternal(view.getCenterInternal());
  }
  /**
   * Update the box using the main map extent
   * @private
   */
  updateBox_() {
    const map = this.getMap();
    const ovmap = this.ovmap_;
    if (!map.isRendered() || !ovmap.isRendered()) {
      return;
    }
    const mapSize = (
      /** @type {import("../size.js").Size} */
      map.getSize()
    );
    const view = map.getView();
    const ovview = ovmap.getView();
    const rotation = this.rotateWithView_ ? 0 : -view.getRotation();
    const overlay = this.boxOverlay_;
    const box = this.boxOverlay_.getElement();
    const center = view.getCenter();
    const resolution = view.getResolution();
    const ovresolution = ovview.getResolution();
    const width = mapSize[0] * resolution / ovresolution;
    const height = mapSize[1] * resolution / ovresolution;
    overlay.setPosition(center);
    if (box) {
      box.style.width = width + "px";
      box.style.height = height + "px";
      const transform = "rotate(" + rotation + "rad)";
      box.style.transform = transform;
    }
  }
  /**
   * @private
   */
  updateBoxAfterOvmapIsRendered_() {
    if (this.ovmapPostrenderKey_) {
      return;
    }
    this.ovmapPostrenderKey_ = listenOnce(this.ovmap_, MapEventType_default.POSTRENDER, (event) => {
      delete this.ovmapPostrenderKey_;
      this.updateBox_();
    });
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(event) {
    event.preventDefault();
    this.handleToggle_();
  }
  /**
   * @private
   */
  handleToggle_() {
    this.element.classList.toggle(CLASS_COLLAPSED);
    if (this.collapsed_) {
      replaceNode(this.collapseLabel_, this.label_);
    } else {
      replaceNode(this.label_, this.collapseLabel_);
    }
    this.collapsed_ = !this.collapsed_;
    const ovmap = this.ovmap_;
    if (!this.collapsed_) {
      if (ovmap.isRendered()) {
        this.viewExtent_ = void 0;
        ovmap.render();
        return;
      }
      ovmap.updateSize();
      this.resetExtent_();
      this.updateBoxAfterOvmapIsRendered_();
    }
  }
  /**
   * Return `true` if the overview map is collapsible, `false` otherwise.
   * @return {boolean} True if the widget is collapsible.
   * @api
   */
  getCollapsible() {
    return this.collapsible_;
  }
  /**
   * Set whether the overview map should be collapsible.
   * @param {boolean} collapsible True if the widget is collapsible.
   * @api
   */
  setCollapsible(collapsible) {
    if (this.collapsible_ === collapsible) {
      return;
    }
    this.collapsible_ = collapsible;
    this.element.classList.toggle("ol-uncollapsible");
    if (!collapsible && this.collapsed_) {
      this.handleToggle_();
    }
  }
  /**
   * Collapse or expand the overview map according to the passed parameter. Will
   * not do anything if the overview map isn't collapsible or if the current
   * collapsed state is already the one requested.
   * @param {boolean} collapsed True if the widget is collapsed.
   * @api
   */
  setCollapsed(collapsed) {
    if (!this.collapsible_ || this.collapsed_ === collapsed) {
      return;
    }
    this.handleToggle_();
  }
  /**
   * Determine if the overview map is collapsed.
   * @return {boolean} The overview map is collapsed.
   * @api
   */
  getCollapsed() {
    return this.collapsed_;
  }
  /**
   * Return `true` if the overview map view can rotate, `false` otherwise.
   * @return {boolean} True if the control view can rotate.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Set whether the overview map view should rotate with the main map view.
   * @param {boolean} rotateWithView True if the control view should rotate.
   * @api
   */
  setRotateWithView(rotateWithView) {
    if (this.rotateWithView_ === rotateWithView) {
      return;
    }
    this.rotateWithView_ = rotateWithView;
    if (this.getMap().getView().getRotation() !== 0) {
      if (this.rotateWithView_) {
        this.handleRotationChanged_();
      } else {
        this.ovmap_.getView().setRotation(0);
      }
      this.viewExtent_ = void 0;
      this.validateExtent_();
      this.updateBox_();
    }
  }
  /**
   * Return the overview map.
   * @return {import("../Map.js").default} Overview map.
   * @api
   */
  getOverviewMap() {
    return this.ovmap_;
  }
  /**
   * Update the overview map element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(mapEvent) {
    this.validateExtent_();
    this.updateBox_();
  }
};
var OverviewMap_default = OverviewMap;

// node_modules/ol/control/ScaleLine.js
var UNITS_PROP = "units";
var LEADING_DIGITS = [1, 2, 5];
var DEFAULT_DPI = 25.4 / 0.28;
var ScaleLine = class extends Control_default {
  /**
   * @param {Options} [options] Scale line options.
   */
  constructor(options) {
    options = options ? options : {};
    const element = document.createElement("div");
    element.style.pointerEvents = "none";
    super({
      element,
      render: options.render,
      target: options.target
    });
    this.on;
    this.once;
    this.un;
    const className = options.className !== void 0 ? options.className : options.bar ? "ol-scale-bar" : "ol-scale-line";
    this.innerElement_ = document.createElement("div");
    this.innerElement_.className = className + "-inner";
    this.element.className = className + " " + CLASS_UNSELECTABLE;
    this.element.appendChild(this.innerElement_);
    this.viewState_ = null;
    this.minWidth_ = options.minWidth !== void 0 ? options.minWidth : 64;
    this.maxWidth_ = options.maxWidth;
    this.renderedVisible_ = false;
    this.renderedWidth_ = void 0;
    this.renderedHTML_ = "";
    this.addChangeListener(UNITS_PROP, this.handleUnitsChanged_);
    this.setUnits(options.units || "metric");
    this.scaleBar_ = options.bar || false;
    this.scaleBarSteps_ = options.steps || 4;
    this.scaleBarText_ = options.text || false;
    this.dpi_ = options.dpi || void 0;
  }
  /**
   * Return the units to use in the scale line.
   * @return {Units} The units
   * to use in the scale line.
   * @observable
   * @api
   */
  getUnits() {
    return this.get(UNITS_PROP);
  }
  /**
   * @private
   */
  handleUnitsChanged_() {
    this.updateElement_();
  }
  /**
   * Set the units to use in the scale line.
   * @param {Units} units The units to use in the scale line.
   * @observable
   * @api
   */
  setUnits(units) {
    this.set(UNITS_PROP, units);
  }
  /**
   * Specify the dpi of output device such as printer.
   * @param {number|undefined} dpi The dpi of output device.
   * @api
   */
  setDpi(dpi) {
    this.dpi_ = dpi;
  }
  /**
   * @private
   */
  updateElement_() {
    const viewState = this.viewState_;
    if (!viewState) {
      if (this.renderedVisible_) {
        this.element.style.display = "none";
        this.renderedVisible_ = false;
      }
      return;
    }
    const center = viewState.center;
    const projection = viewState.projection;
    const units = this.getUnits();
    const pointResolutionUnits = units == "degrees" ? "degrees" : "m";
    let pointResolution = getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
    const minWidth = this.minWidth_ * (this.dpi_ || DEFAULT_DPI) / DEFAULT_DPI;
    const maxWidth = this.maxWidth_ !== void 0 ? this.maxWidth_ * (this.dpi_ || DEFAULT_DPI) / DEFAULT_DPI : void 0;
    let nominalCount = minWidth * pointResolution;
    let suffix = "";
    if (units == "degrees") {
      const metersPerDegree = METERS_PER_UNIT.degrees;
      nominalCount *= metersPerDegree;
      if (nominalCount < metersPerDegree / 60) {
        suffix = "″";
        pointResolution *= 3600;
      } else if (nominalCount < metersPerDegree) {
        suffix = "′";
        pointResolution *= 60;
      } else {
        suffix = "°";
      }
    } else if (units == "imperial") {
      if (nominalCount < 0.9144) {
        suffix = "in";
        pointResolution /= 0.0254;
      } else if (nominalCount < 1609.344) {
        suffix = "ft";
        pointResolution /= 0.3048;
      } else {
        suffix = "mi";
        pointResolution /= 1609.344;
      }
    } else if (units == "nautical") {
      pointResolution /= 1852;
      suffix = "NM";
    } else if (units == "metric") {
      if (nominalCount < 1e-6) {
        suffix = "nm";
        pointResolution *= 1e9;
      } else if (nominalCount < 1e-3) {
        suffix = "μm";
        pointResolution *= 1e6;
      } else if (nominalCount < 1) {
        suffix = "mm";
        pointResolution *= 1e3;
      } else if (nominalCount < 1e3) {
        suffix = "m";
      } else {
        suffix = "km";
        pointResolution /= 1e3;
      }
    } else if (units == "us") {
      if (nominalCount < 0.9144) {
        suffix = "in";
        pointResolution *= 39.37;
      } else if (nominalCount < 1609.344) {
        suffix = "ft";
        pointResolution /= 0.30480061;
      } else {
        suffix = "mi";
        pointResolution /= 1609.3472;
      }
    } else {
      throw new Error("Invalid units");
    }
    let i = 3 * Math.floor(Math.log(minWidth * pointResolution) / Math.log(10));
    let count, width, decimalCount;
    let previousCount = 0;
    let previousWidth, previousDecimalCount;
    while (true) {
      decimalCount = Math.floor(i / 3);
      const decimal = Math.pow(10, decimalCount);
      count = LEADING_DIGITS[(i % 3 + 3) % 3] * decimal;
      width = Math.round(count / pointResolution);
      if (isNaN(width)) {
        this.element.style.display = "none";
        this.renderedVisible_ = false;
        return;
      }
      if (maxWidth !== void 0 && width >= maxWidth) {
        count = previousCount;
        width = previousWidth;
        decimalCount = previousDecimalCount;
        break;
      } else if (width >= minWidth) {
        break;
      }
      previousCount = count;
      previousWidth = width;
      previousDecimalCount = decimalCount;
      ++i;
    }
    const html = this.scaleBar_ ? this.createScaleBar(width, count, suffix) : count.toFixed(decimalCount < 0 ? -decimalCount : 0) + " " + suffix;
    if (this.renderedHTML_ != html) {
      this.innerElement_.innerHTML = html;
      this.renderedHTML_ = html;
    }
    if (this.renderedWidth_ != width) {
      this.innerElement_.style.width = width + "px";
      this.renderedWidth_ = width;
    }
    if (!this.renderedVisible_) {
      this.element.style.display = "";
      this.renderedVisible_ = true;
    }
  }
  /**
   * @private
   * @param {number} width The current width of the scalebar.
   * @param {number} scale The current scale.
   * @param {string} suffix The suffix to append to the scale text.
   * @return {string} The stringified HTML of the scalebar.
   */
  createScaleBar(width, scale, suffix) {
    const resolutionScale = this.getScaleForResolution();
    const mapScale = resolutionScale < 1 ? Math.round(1 / resolutionScale).toLocaleString() + " : 1" : "1 : " + Math.round(resolutionScale).toLocaleString();
    const steps = this.scaleBarSteps_;
    const stepWidth = width / steps;
    const scaleSteps = [this.createMarker("absolute")];
    for (let i = 0; i < steps; ++i) {
      const cls = i % 2 === 0 ? "ol-scale-singlebar-odd" : "ol-scale-singlebar-even";
      scaleSteps.push(`<div><div class="ol-scale-singlebar ${cls}" style="width: ${stepWidth}px;"></div>` + this.createMarker("relative") + // render text every second step, except when only 2 steps
      (i % 2 === 0 || steps === 2 ? this.createStepText(i, width, false, scale, suffix) : "") + "</div>");
    }
    scaleSteps.push(this.createStepText(steps, width, true, scale, suffix));
    const scaleBarText = this.scaleBarText_ ? `<div class="ol-scale-text" style="width: ${width}px;">` + mapScale + "</div>" : "";
    return scaleBarText + scaleSteps.join("");
  }
  /**
   * Creates a marker at given position
   * @param {'absolute'|'relative'} position The position, absolute or relative
   * @return {string} The stringified div containing the marker
   */
  createMarker(position) {
    const top = position === "absolute" ? 3 : -10;
    return `<div class="ol-scale-step-marker" style="position: ${position}; top: ${top}px;"></div>`;
  }
  /**
   * Creates the label for a marker marker at given position
   * @param {number} i The iterator
   * @param {number} width The width the scalebar will currently use
   * @param {boolean} isLast Flag indicating if we add the last step text
   * @param {number} scale The current scale for the whole scalebar
   * @param {string} suffix The suffix for the scale
   * @return {string} The stringified div containing the step text
   */
  createStepText(i, width, isLast, scale, suffix) {
    const length = i === 0 ? 0 : Math.round(scale / this.scaleBarSteps_ * i * 100) / 100;
    const lengthString = length + (i === 0 ? "" : " " + suffix);
    const margin = i === 0 ? -3 : width / this.scaleBarSteps_ * -1;
    const minWidth = i === 0 ? 0 : width / this.scaleBarSteps_ * 2;
    return `<div class="ol-scale-step-text" style="margin-left: ${margin}px;text-align: ${i === 0 ? "left" : "center"};min-width: ${minWidth}px;left: ${isLast ? width + "px" : "unset"};">` + lengthString + "</div>";
  }
  /**
   * Returns the appropriate scale for the given resolution and units.
   * @return {number} The appropriate scale.
   */
  getScaleForResolution() {
    const resolution = getPointResolution(this.viewState_.projection, this.viewState_.resolution, this.viewState_.center, "m");
    const dpi = this.dpi_ || DEFAULT_DPI;
    const inchesPerMeter = 1e3 / 25.4;
    return resolution * inchesPerMeter * dpi;
  }
  /**
   * Update the scale line element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(mapEvent) {
    const frameState = mapEvent.frameState;
    if (!frameState) {
      this.viewState_ = null;
    } else {
      this.viewState_ = frameState.viewState;
    }
    this.updateElement_();
  }
};
var ScaleLine_default = ScaleLine;

// node_modules/ol/control/ZoomSlider.js
var Direction = {
  VERTICAL: 0,
  HORIZONTAL: 1
};
var ZoomSlider = class extends Control_default {
  /**
   * @param {Options} [options] Zoom slider options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      target: options.target,
      element: document.createElement("div"),
      render: options.render
    });
    this.dragListenerKeys_ = [];
    this.currentResolution_ = void 0;
    this.direction_ = Direction.VERTICAL;
    this.dragging_;
    this.heightLimit_ = 0;
    this.widthLimit_ = 0;
    this.startX_;
    this.startY_;
    this.thumbSize_ = null;
    this.sliderInitialized_ = false;
    this.duration_ = options.duration !== void 0 ? options.duration : 200;
    const className = options.className !== void 0 ? options.className : "ol-zoomslider";
    const thumbElement = document.createElement("button");
    thumbElement.setAttribute("type", "button");
    thumbElement.className = className + "-thumb " + CLASS_UNSELECTABLE;
    const containerElement = this.element;
    containerElement.className = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
    containerElement.appendChild(thumbElement);
    containerElement.addEventListener(EventType_default2.POINTERDOWN, this.handleDraggerStart_.bind(this), false);
    containerElement.addEventListener(EventType_default2.POINTERMOVE, this.handleDraggerDrag_.bind(this), false);
    containerElement.addEventListener(EventType_default2.POINTERUP, this.handleDraggerEnd_.bind(this), false);
    containerElement.addEventListener(EventType_default.CLICK, this.handleContainerClick_.bind(this), false);
    thumbElement.addEventListener(EventType_default.CLICK, stopPropagation, false);
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
    super.setMap(map);
    if (map) {
      map.render();
    }
  }
  /**
   * Initializes the slider element. This will determine and set this controls
   * direction_ and also constrain the dragging of the thumb to always be within
   * the bounds of the container.
   *
   * @return {boolean} Initialization successful
   * @private
   */
  initSlider_() {
    const container = this.element;
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    if (containerWidth === 0 && containerHeight === 0) {
      return this.sliderInitialized_ = false;
    }
    const containerStyle = getComputedStyle(container);
    containerWidth -= parseFloat(containerStyle["paddingRight"]) + parseFloat(containerStyle["paddingLeft"]);
    containerHeight -= parseFloat(containerStyle["paddingTop"]) + parseFloat(containerStyle["paddingBottom"]);
    const thumb = (
      /** @type {HTMLElement} */
      container.firstElementChild
    );
    const thumbStyle = getComputedStyle(thumb);
    const thumbWidth = thumb.offsetWidth + parseFloat(thumbStyle["marginRight"]) + parseFloat(thumbStyle["marginLeft"]);
    const thumbHeight = thumb.offsetHeight + parseFloat(thumbStyle["marginTop"]) + parseFloat(thumbStyle["marginBottom"]);
    this.thumbSize_ = [thumbWidth, thumbHeight];
    if (containerWidth > containerHeight) {
      this.direction_ = Direction.HORIZONTAL;
      this.widthLimit_ = containerWidth - thumbWidth;
    } else {
      this.direction_ = Direction.VERTICAL;
      this.heightLimit_ = containerHeight - thumbHeight;
    }
    return this.sliderInitialized_ = true;
  }
  /**
   * @param {PointerEvent} event The browser event to handle.
   * @private
   */
  handleContainerClick_(event) {
    const view = this.getMap().getView();
    const relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
    const resolution = this.getResolutionForPosition_(relativePosition);
    const zoom = view.getConstrainedZoom(view.getZoomForResolution(resolution));
    view.animateInternal({
      zoom,
      duration: this.duration_,
      easing: easeOut
    });
  }
  /**
   * Handle dragger start events.
   * @param {PointerEvent} event The drag event.
   * @private
   */
  handleDraggerStart_(event) {
    if (!this.dragging_ && event.target === this.element.firstElementChild) {
      const element = (
        /** @type {HTMLElement} */
        this.element.firstElementChild
      );
      this.getMap().getView().beginInteraction();
      this.startX_ = event.clientX - parseFloat(element.style.left);
      this.startY_ = event.clientY - parseFloat(element.style.top);
      this.dragging_ = true;
      if (this.dragListenerKeys_.length === 0) {
        const drag = this.handleDraggerDrag_;
        const end = this.handleDraggerEnd_;
        const doc = this.getMap().getOwnerDocument();
        this.dragListenerKeys_.push(listen(doc, EventType_default2.POINTERMOVE, drag, this), listen(doc, EventType_default2.POINTERUP, end, this));
      }
    }
  }
  /**
   * Handle dragger drag events.
   *
   * @param {PointerEvent} event The drag event.
   * @private
   */
  handleDraggerDrag_(event) {
    if (this.dragging_) {
      const deltaX = event.clientX - this.startX_;
      const deltaY = event.clientY - this.startY_;
      const relativePosition = this.getRelativePosition_(deltaX, deltaY);
      this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
      this.getMap().getView().setResolution(this.currentResolution_);
    }
  }
  /**
   * Handle dragger end events.
   * @param {PointerEvent} event The drag event.
   * @private
   */
  handleDraggerEnd_(event) {
    if (this.dragging_) {
      const view = this.getMap().getView();
      view.endInteraction();
      this.dragging_ = false;
      this.startX_ = void 0;
      this.startY_ = void 0;
      this.dragListenerKeys_.forEach(unlistenByKey);
      this.dragListenerKeys_.length = 0;
    }
  }
  /**
   * Positions the thumb inside its container according to the given resolution.
   *
   * @param {number} res The res.
   * @private
   */
  setThumbPosition_(res) {
    const position = this.getPositionForResolution_(res);
    const thumb = (
      /** @type {HTMLElement} */
      this.element.firstElementChild
    );
    if (this.direction_ == Direction.HORIZONTAL) {
      thumb.style.left = this.widthLimit_ * position + "px";
    } else {
      thumb.style.top = this.heightLimit_ * position + "px";
    }
  }
  /**
   * Calculates the relative position of the thumb given x and y offsets.  The
   * relative position scales from 0 to 1.  The x and y offsets are assumed to be
   * in pixel units within the dragger limits.
   *
   * @param {number} x Pixel position relative to the left of the slider.
   * @param {number} y Pixel position relative to the top of the slider.
   * @return {number} The relative position of the thumb.
   * @private
   */
  getRelativePosition_(x, y) {
    let amount;
    if (this.direction_ === Direction.HORIZONTAL) {
      amount = x / this.widthLimit_;
    } else {
      amount = y / this.heightLimit_;
    }
    return clamp(amount, 0, 1);
  }
  /**
   * Calculates the corresponding resolution of the thumb given its relative
   * position (where 0 is the minimum and 1 is the maximum).
   *
   * @param {number} position The relative position of the thumb.
   * @return {number} The corresponding resolution.
   * @private
   */
  getResolutionForPosition_(position) {
    const fn = this.getMap().getView().getResolutionForValueFunction();
    return fn(1 - position);
  }
  /**
   * Determines the relative position of the slider for the given resolution.  A
   * relative position of 0 corresponds to the minimum view resolution.  A
   * relative position of 1 corresponds to the maximum view resolution.
   *
   * @param {number} res The resolution.
   * @return {number} The relative position value (between 0 and 1).
   * @private
   */
  getPositionForResolution_(res) {
    const fn = this.getMap().getView().getValueForResolutionFunction();
    return clamp(1 - fn(res), 0, 1);
  }
  /**
   * Update the zoomslider element.
   * @param {import("../MapEvent.js").default} mapEvent Map event.
   * @override
   */
  render(mapEvent) {
    if (!mapEvent.frameState) {
      return;
    }
    if (!this.sliderInitialized_ && !this.initSlider_()) {
      return;
    }
    const res = mapEvent.frameState.viewState.resolution;
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
  }
};
var ZoomSlider_default = ZoomSlider;

// node_modules/ol/control/ZoomToExtent.js
var ZoomToExtent = class extends Control_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      element: document.createElement("div"),
      target: options.target
    });
    this.extent = options.extent ? options.extent : null;
    const className = options.className !== void 0 ? options.className : "ol-zoom-extent";
    const label = options.label !== void 0 ? options.label : "E";
    const tipLabel = options.tipLabel !== void 0 ? options.tipLabel : "Fit to extent";
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.title = tipLabel;
    button.appendChild(typeof label === "string" ? document.createTextNode(label) : label);
    button.addEventListener(EventType_default.CLICK, this.handleClick_.bind(this), false);
    const cssClasses = className + " " + CLASS_UNSELECTABLE + " " + CLASS_CONTROL;
    const element = this.element;
    element.className = cssClasses;
    element.appendChild(button);
  }
  /**
   * @param {MouseEvent} event The event to handle
   * @private
   */
  handleClick_(event) {
    event.preventDefault();
    this.handleZoomToExtent();
  }
  /**
   * @protected
   */
  handleZoomToExtent() {
    const map = this.getMap();
    const view = map.getView();
    const extent = !this.extent ? view.getProjection().getExtent() : fromUserExtent(this.extent, view.getProjection());
    view.fitInternal(fromExtent(extent));
  }
};
var ZoomToExtent_default = ZoomToExtent;
export {
  Attribution_default as Attribution,
  Control_default as Control,
  FullScreen_default as FullScreen,
  MousePosition_default as MousePosition,
  OverviewMap_default as OverviewMap,
  Rotate_default as Rotate,
  ScaleLine_default as ScaleLine,
  Zoom_default as Zoom,
  ZoomSlider_default as ZoomSlider,
  ZoomToExtent_default as ZoomToExtent,
  defaults
};
//# sourceMappingURL=ol_control.js.map
