import {
  ImageCanvas_default,
  VectorRenderTile_default,
  VectorTile_default
} from "./chunk-3GO465IU.js";
import {
  ImageTile_default,
  TileRange_default,
  Tile_default
} from "./chunk-AJCWPRKA.js";
import {
  MapBrowserEventHandler_default,
  Map_default,
  Overlay_default
} from "./chunk-RNKQR4MV.js";
import {
  TileQueue_default
} from "./chunk-SITR5SFQ.js";
import "./chunk-PWOXHWUC.js";
import "./chunk-CCENDKLH.js";
import {
  Immediate_default,
  Vector_default as Vector_default2,
  getSquaredTolerance
} from "./chunk-DUBCJMTK.js";
import "./chunk-WEXFOBJA.js";
import "./chunk-HM3IY3H4.js";
import {
  LineString_default,
  Vector_default
} from "./chunk-EDRYIJN6.js";
import "./chunk-5K73XM64.js";
import {
  Feature_default
} from "./chunk-TYRNN5GE.js";
import {
  Kinetic_default,
  MapBrowserEvent_default,
  MapEvent_default
} from "./chunk-JX6G7I4E.js";
import "./chunk-S7Q7BWLM.js";
import {
  EventType_default
} from "./chunk-GKPGQ42P.js";
import {
  Text_default
} from "./chunk-GQU4XHOU.js";
import {
  Fill_default,
  Stroke_default,
  Style_default
} from "./chunk-N4P2OMPA.js";
import "./chunk-LSEJCB2Y.js";
import "./chunk-655M5QKT.js";
import {
  Image_default
} from "./chunk-5CXUNJWW.js";
import {
  Collection_default
} from "./chunk-BDEWHVOF.js";
import "./chunk-RE7YPHWR.js";
import "./chunk-ZO3Y5Y6G.js";
import "./chunk-4UFEOFXY.js";
import "./chunk-TALNCFXE.js";
import "./chunk-4Z5KK6QB.js";
import "./chunk-AX5WOFAA.js";
import {
  View_default
} from "./chunk-GVA6PU2J.js";
import {
  circular
} from "./chunk-II5KOT2H.js";
import {
  Point_default,
  multiply
} from "./chunk-JDURIDCO.js";
import {
  applyTransform,
  approximatelyEquals,
  containsCoordinate,
  containsExtent,
  degreesToStringHDMS,
  equals,
  equivalent,
  get,
  getCenter,
  getIntersection,
  getTransform,
  getTransformFromProjections,
  getUserProjection,
  getWidth,
  identityTransform,
  intersects,
  isEmpty,
  wrapX
} from "./chunk-KD5NYAAV.js";
import {
  clamp,
  squaredSegmentDistance,
  toRadians
} from "./chunk-UVCLGJLE.js";
import {
  Object_default,
  Observable_default
} from "./chunk-BPFTGO52.js";
import {
  Disposable_default,
  Event_default,
  VERSION,
  getUid
} from "./chunk-4VZCFOSN.js";
import "./chunk-VNWMKJWE.js";
import "./chunk-IJQ6LSTY.js";
import "./chunk-ZD2NNC7F.js";
import "./chunk-4MWRP73S.js";

// node_modules/ol/Geolocation.js
var Property = {
  ACCURACY: "accuracy",
  ACCURACY_GEOMETRY: "accuracyGeometry",
  ALTITUDE: "altitude",
  ALTITUDE_ACCURACY: "altitudeAccuracy",
  HEADING: "heading",
  POSITION: "position",
  PROJECTION: "projection",
  SPEED: "speed",
  TRACKING: "tracking",
  TRACKING_OPTIONS: "trackingOptions"
};
var GeolocationErrorType = {
  /**
   * Triggered when a `GeolocationPositionError` occurs.
   * @event module:ol/Geolocation.GeolocationError#error
   * @api
   */
  ERROR: "error"
};
var GeolocationError = class extends Event_default {
  /**
   * @param {GeolocationPositionError} error error object.
   */
  constructor(error) {
    super(GeolocationErrorType.ERROR);
    this.code = error.code;
    this.message = error.message;
  }
};
var Geolocation = class extends Object_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    super();
    this.on;
    this.once;
    this.un;
    options = options || {};
    this.position_ = null;
    this.transform_ = identityTransform;
    this.watchId_ = void 0;
    this.addChangeListener(Property.PROJECTION, this.handleProjectionChanged_);
    this.addChangeListener(Property.TRACKING, this.handleTrackingChanged_);
    if (options.projection !== void 0) {
      this.setProjection(options.projection);
    }
    if (options.trackingOptions !== void 0) {
      this.setTrackingOptions(options.trackingOptions);
    }
    this.setTracking(options.tracking !== void 0 ? options.tracking : false);
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.setTracking(false);
    super.disposeInternal();
  }
  /**
   * @private
   */
  handleProjectionChanged_() {
    const projection = this.getProjection();
    if (projection) {
      this.transform_ = getTransformFromProjections(get("EPSG:4326"), projection);
      if (this.position_) {
        this.set(Property.POSITION, this.transform_(this.position_));
      }
    }
  }
  /**
   * @private
   */
  handleTrackingChanged_() {
    if ("geolocation" in navigator) {
      const tracking = this.getTracking();
      if (tracking && this.watchId_ === void 0) {
        this.watchId_ = navigator.geolocation.watchPosition(this.positionChange_.bind(this), this.positionError_.bind(this), this.getTrackingOptions());
      } else if (!tracking && this.watchId_ !== void 0) {
        navigator.geolocation.clearWatch(this.watchId_);
        this.watchId_ = void 0;
      }
    }
  }
  /**
   * @private
   * @param {GeolocationPosition} position position event.
   */
  positionChange_(position) {
    const coords = position.coords;
    this.set(Property.ACCURACY, coords.accuracy);
    this.set(Property.ALTITUDE, coords.altitude === null ? void 0 : coords.altitude);
    this.set(Property.ALTITUDE_ACCURACY, coords.altitudeAccuracy === null ? void 0 : coords.altitudeAccuracy);
    this.set(Property.HEADING, coords.heading === null ? void 0 : toRadians(coords.heading));
    if (!this.position_) {
      this.position_ = [coords.longitude, coords.latitude];
    } else {
      this.position_[0] = coords.longitude;
      this.position_[1] = coords.latitude;
    }
    const projectedPosition = this.transform_(this.position_);
    this.set(Property.POSITION, projectedPosition.slice());
    this.set(Property.SPEED, coords.speed === null ? void 0 : coords.speed);
    const geometry = circular(this.position_, coords.accuracy);
    geometry.applyTransform(this.transform_);
    this.set(Property.ACCURACY_GEOMETRY, geometry);
    this.changed();
  }
  /**
   * @private
   * @param {GeolocationPositionError} error error object.
   */
  positionError_(error) {
    this.dispatchEvent(new GeolocationError(error));
  }
  /**
   * Get the accuracy of the position in meters.
   * @return {number|undefined} The accuracy of the position measurement in
   *     meters.
   * @observable
   * @api
   */
  getAccuracy() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ACCURACY)
    );
  }
  /**
   * Get a geometry of the position accuracy.
   * @return {?import("./geom/Polygon.js").default} A geometry of the position accuracy.
   * @observable
   * @api
   */
  getAccuracyGeometry() {
    return (
      /** @type {?import("./geom/Polygon.js").default} */
      this.get(Property.ACCURACY_GEOMETRY) || null
    );
  }
  /**
   * Get the altitude associated with the position.
   * @return {number|undefined} The altitude of the position in meters above mean
   *     sea level.
   * @observable
   * @api
   */
  getAltitude() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ALTITUDE)
    );
  }
  /**
   * Get the altitude accuracy of the position.
   * @return {number|undefined} The accuracy of the altitude measurement in
   *     meters.
   * @observable
   * @api
   */
  getAltitudeAccuracy() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ALTITUDE_ACCURACY)
    );
  }
  /**
   * Get the heading as radians clockwise from North.
   * Note: depending on the browser, the heading is only defined if the `enableHighAccuracy`
   * is set to `true` in the tracking options.
   * @return {number|undefined} The heading of the device in radians from north.
   * @observable
   * @api
   */
  getHeading() {
    return (
      /** @type {number|undefined} */
      this.get(Property.HEADING)
    );
  }
  /**
   * Get the position of the device.
   * @return {import("./coordinate.js").Coordinate|undefined} The current position of the device reported
   *     in the current projection.
   * @observable
   * @api
   */
  getPosition() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(Property.POSITION)
    );
  }
  /**
   * Get the projection associated with the position.
   * @return {import("./proj/Projection.js").default|undefined} The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  getProjection() {
    return (
      /** @type {import("./proj/Projection.js").default|undefined} */
      this.get(Property.PROJECTION)
    );
  }
  /**
   * Get the speed in meters per second.
   * @return {number|undefined} The instantaneous speed of the device in meters
   *     per second.
   * @observable
   * @api
   */
  getSpeed() {
    return (
      /** @type {number|undefined} */
      this.get(Property.SPEED)
    );
  }
  /**
   * Determine if the device location is being tracked.
   * @return {boolean} The device location is being tracked.
   * @observable
   * @api
   */
  getTracking() {
    return (
      /** @type {boolean} */
      this.get(Property.TRACKING)
    );
  }
  /**
   * Get the tracking options.
   * See https://www.w3.org/TR/geolocation-API/#position-options.
   * @return {PositionOptions|undefined} PositionOptions as defined by
   *     the [HTML5 Geolocation spec
   *     ](https://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  getTrackingOptions() {
    return (
      /** @type {PositionOptions|undefined} */
      this.get(Property.TRACKING_OPTIONS)
    );
  }
  /**
   * Set the projection to use for transforming the coordinates.
   * @param {import("./proj.js").ProjectionLike} projection The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  setProjection(projection) {
    this.set(Property.PROJECTION, get(projection));
  }
  /**
   * Enable or disable tracking.
   * @param {boolean} tracking Enable tracking.
   * @observable
   * @api
   */
  setTracking(tracking) {
    this.set(Property.TRACKING, tracking);
  }
  /**
   * Set the tracking options.
   * See http://www.w3.org/TR/geolocation-API/#position-options.
   * @param {PositionOptions} options PositionOptions as defined by the
   *     [HTML5 Geolocation spec
   *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  setTrackingOptions(options) {
    this.set(Property.TRACKING_OPTIONS, options);
  }
};
var Geolocation_default = Geolocation;

// node_modules/ol/geom/flat/geodesic.js
function line(interpolate, transform, squaredTolerance) {
  const flatCoordinates = [];
  let geoA = interpolate(0);
  let geoB = interpolate(1);
  let a = transform(geoA);
  let b = transform(geoB);
  const geoStack = [geoB, geoA];
  const stack = [b, a];
  const fractionStack = [1, 0];
  const fractions = {};
  let maxIterations = 1e5;
  let geoM, m, fracA, fracB, fracM, key;
  while (--maxIterations > 0 && fractionStack.length > 0) {
    fracA = fractionStack.pop();
    geoA = geoStack.pop();
    a = stack.pop();
    key = fracA.toString();
    if (!(key in fractions)) {
      flatCoordinates.push(a[0], a[1]);
      fractions[key] = true;
    }
    fracB = fractionStack.pop();
    geoB = geoStack.pop();
    b = stack.pop();
    fracM = (fracA + fracB) / 2;
    geoM = interpolate(fracM);
    m = transform(geoM);
    if (squaredSegmentDistance(m[0], m[1], a[0], a[1], b[0], b[1]) < squaredTolerance) {
      flatCoordinates.push(b[0], b[1]);
      key = fracB.toString();
      fractions[key] = true;
    } else {
      fractionStack.push(fracB, fracM, fracM, fracA);
      stack.push(b, m, m, a);
      geoStack.push(geoB, geoM, geoM, geoA);
    }
  }
  return flatCoordinates;
}
function meridian(lon, lat1, lat2, projection, squaredTolerance) {
  const epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon, lat1 + (lat2 - lat1) * frac];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}
function parallel(lat, lon1, lon2, projection, squaredTolerance) {
  const epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon1 + (lon2 - lon1) * frac, lat];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}

// node_modules/ol/render.js
function getVectorContext(event) {
  if (!(event.context instanceof CanvasRenderingContext2D)) {
    throw new Error("Only works for render events from Canvas 2D layers");
  }
  const a = event.inversePixelTransform[0];
  const b = event.inversePixelTransform[1];
  const canvasPixelRatio = Math.sqrt(a * a + b * b);
  const frameState = event.frameState;
  const transform = multiply(event.inversePixelTransform.slice(), frameState.coordinateToPixelTransform);
  const squaredTolerance = getSquaredTolerance(frameState.viewState.resolution, canvasPixelRatio);
  let userTransform;
  const userProjection = getUserProjection();
  if (userProjection) {
    userTransform = getTransformFromProjections(userProjection, frameState.viewState.projection);
  }
  return new Immediate_default(event.context, canvasPixelRatio, frameState.extent, transform, frameState.viewState.rotation, squaredTolerance, userTransform);
}

// node_modules/ol/layer/Graticule.js
var DEFAULT_STROKE_STYLE = new Stroke_default({
  color: "rgba(0,0,0,0.2)"
});
var INTERVALS = [90, 45, 30, 20, 10, 5, 2, 1, 30 / 60, 20 / 60, 10 / 60, 5 / 60, 2 / 60, 1 / 60, 30 / 3600, 20 / 3600, 10 / 3600, 5 / 3600, 2 / 3600, 1 / 3600];
var Graticule = class extends Vector_default2 {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign({
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      renderBuffer: 0
    }, options);
    delete baseOptions.maxLines;
    delete baseOptions.strokeStyle;
    delete baseOptions.targetSize;
    delete baseOptions.showLabels;
    delete baseOptions.lonLabelFormatter;
    delete baseOptions.latLabelFormatter;
    delete baseOptions.lonLabelPosition;
    delete baseOptions.latLabelPosition;
    delete baseOptions.lonLabelStyle;
    delete baseOptions.latLabelStyle;
    delete baseOptions.intervals;
    super(baseOptions);
    this.projection_ = null;
    this.maxLat_ = Infinity;
    this.maxLon_ = Infinity;
    this.minLat_ = -Infinity;
    this.minLon_ = -Infinity;
    this.maxX_ = Infinity;
    this.maxY_ = Infinity;
    this.minX_ = -Infinity;
    this.minY_ = -Infinity;
    this.targetSize_ = options.targetSize !== void 0 ? options.targetSize : 100;
    this.maxLines_ = options.maxLines !== void 0 ? options.maxLines : 100;
    this.meridians_ = [];
    this.parallels_ = [];
    this.strokeStyle_ = options.strokeStyle !== void 0 ? options.strokeStyle : DEFAULT_STROKE_STYLE;
    this.fromLonLatTransform_ = void 0;
    this.toLonLatTransform_ = void 0;
    this.projectionCenterLonLat_ = null;
    this.bottomLeft_ = null;
    this.bottomRight_ = null;
    this.topLeft_ = null;
    this.topRight_ = null;
    this.meridiansLabels_ = null;
    this.parallelsLabels_ = null;
    if (options.showLabels) {
      this.lonLabelFormatter_ = options.lonLabelFormatter == void 0 ? degreesToStringHDMS.bind(this, "EW") : options.lonLabelFormatter;
      this.latLabelFormatter_ = options.latLabelFormatter == void 0 ? degreesToStringHDMS.bind(this, "NS") : options.latLabelFormatter;
      this.lonLabelPosition_ = options.lonLabelPosition == void 0 ? 0 : options.lonLabelPosition;
      this.latLabelPosition_ = options.latLabelPosition == void 0 ? 1 : options.latLabelPosition;
      this.lonLabelStyleBase_ = new Style_default({
        text: options.lonLabelStyle !== void 0 ? options.lonLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textBaseline: "bottom",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      this.lonLabelStyle_ = (feature) => {
        const label = feature.get("graticule_label");
        this.lonLabelStyleBase_.getText().setText(label);
        return this.lonLabelStyleBase_;
      };
      this.latLabelStyleBase_ = new Style_default({
        text: options.latLabelStyle !== void 0 ? options.latLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textAlign: "right",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      this.latLabelStyle_ = (feature) => {
        const label = feature.get("graticule_label");
        this.latLabelStyleBase_.getText().setText(label);
        return this.latLabelStyleBase_;
      };
      this.meridiansLabels_ = [];
      this.parallelsLabels_ = [];
      this.addEventListener(EventType_default.POSTRENDER, this.drawLabels_.bind(this));
    }
    this.intervals_ = options.intervals !== void 0 ? options.intervals : INTERVALS;
    this.setSource(new Vector_default({
      loader: this.loaderFunction.bind(this),
      strategy: this.strategyFunction.bind(this),
      features: new Collection_default(),
      overlaps: false,
      useSpatialIndex: false,
      wrapX: options.wrapX
    }));
    this.featurePool_ = [];
    this.lineStyle_ = new Style_default({
      stroke: this.strokeStyle_
    });
    this.loadedExtent_ = null;
    this.renderedExtent_ = null;
    this.renderedResolution_ = null;
    this.setRenderOrder(null);
  }
  /**
   * Strategy function for loading features based on the view's extent and
   * resolution.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @return {Array<import("../extent.js").Extent>} Extents.
   */
  strategyFunction(extent, resolution) {
    let realWorldExtent = extent.slice();
    if (this.projection_ && this.getSource().getWrapX()) {
      wrapX(realWorldExtent, this.projection_);
    }
    if (this.loadedExtent_) {
      if (approximatelyEquals(this.loadedExtent_, realWorldExtent, resolution)) {
        realWorldExtent = this.loadedExtent_.slice();
      } else {
        this.getSource().removeLoadedExtent(this.loadedExtent_);
      }
    }
    return [realWorldExtent];
  }
  /**
   * Update geometries in the source based on current view
   * @param {import("../extent").Extent} extent Extent
   * @param {number} resolution Resolution
   * @param {import("../proj/Projection.js").default} projection Projection
   */
  loaderFunction(extent, resolution, projection) {
    this.loadedExtent_ = extent;
    const source = this.getSource();
    const layerExtent = this.getExtent() || [-Infinity, -Infinity, Infinity, Infinity];
    const renderExtent = getIntersection(layerExtent, extent);
    if (this.renderedExtent_ && equals(this.renderedExtent_, renderExtent) && this.renderedResolution_ === resolution) {
      return;
    }
    this.renderedExtent_ = renderExtent;
    this.renderedResolution_ = resolution;
    if (isEmpty(renderExtent)) {
      return;
    }
    const center = getCenter(renderExtent);
    const squaredTolerance = resolution * resolution / 4;
    const updateProjectionInfo = !this.projection_ || !equivalent(this.projection_, projection);
    if (updateProjectionInfo) {
      this.updateProjectionInfo_(projection);
    }
    this.createGraticule_(renderExtent, center, resolution, squaredTolerance);
    let featureCount = this.meridians_.length + this.parallels_.length;
    if (this.meridiansLabels_) {
      featureCount += this.meridians_.length;
    }
    if (this.parallelsLabels_) {
      featureCount += this.parallels_.length;
    }
    let feature;
    while (featureCount > this.featurePool_.length) {
      feature = new Feature_default();
      this.featurePool_.push(feature);
    }
    const featuresColl = source.getFeaturesCollection();
    featuresColl.clear();
    let poolIndex = 0;
    let i, l;
    for (i = 0, l = this.meridians_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.meridians_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
    for (i = 0, l = this.parallels_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.parallels_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
  }
  /**
   * @param {number} lon Longitude.
   * @param {number} minLat Minimal latitude.
   * @param {number} maxLat Maximal latitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {number} Index.
   * @private
   */
  addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, index) {
    const lineString = this.getMeridian_(lon, minLat, maxLat, squaredTolerance, index);
    if (intersects(lineString.getExtent(), extent)) {
      if (this.meridiansLabels_) {
        const text = this.lonLabelFormatter_(lon);
        if (index in this.meridiansLabels_) {
          this.meridiansLabels_[index].text = text;
        } else {
          this.meridiansLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.meridians_[index++] = lineString;
    }
    return index;
  }
  /**
   * @param {number} lat Latitude.
   * @param {number} minLon Minimal longitude.
   * @param {number} maxLon Maximal longitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {number} Index.
   * @private
   */
  addParallel_(lat, minLon, maxLon, squaredTolerance, extent, index) {
    const lineString = this.getParallel_(lat, minLon, maxLon, squaredTolerance, index);
    if (intersects(lineString.getExtent(), extent)) {
      if (this.parallelsLabels_) {
        const text = this.latLabelFormatter_(lat);
        if (index in this.parallelsLabels_) {
          this.parallelsLabels_[index].text = text;
        } else {
          this.parallelsLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.parallels_[index++] = lineString;
    }
    return index;
  }
  /**
   * @param {import("../render/Event.js").default} event Render event.
   * @private
   */
  drawLabels_(event) {
    const rotation = event.frameState.viewState.rotation;
    const resolution = event.frameState.viewState.resolution;
    const size = event.frameState.size;
    const extent = event.frameState.extent;
    const rotationCenter = getCenter(extent);
    let rotationExtent = extent;
    if (rotation) {
      const unrotatedWidth = size[0] * resolution;
      const unrotatedHeight = size[1] * resolution;
      rotationExtent = [rotationCenter[0] - unrotatedWidth / 2, rotationCenter[1] - unrotatedHeight / 2, rotationCenter[0] + unrotatedWidth / 2, rotationCenter[1] + unrotatedHeight / 2];
    }
    let startWorld = 0;
    let endWorld = 0;
    let labelsAtStart = this.latLabelPosition_ < 0.5;
    const projectionExtent = this.projection_.getExtent();
    const worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      startWorld = Math.floor((extent[0] - projectionExtent[0]) / worldWidth);
      endWorld = Math.ceil((extent[2] - projectionExtent[2]) / worldWidth);
      const inverted = Math.abs(rotation) > Math.PI / 2;
      labelsAtStart = labelsAtStart !== inverted;
    }
    const vectorContext = getVectorContext(event);
    for (let world = startWorld; world <= endWorld; ++world) {
      let poolIndex = this.meridians_.length + this.parallels_.length;
      let feature, index, l, textPoint;
      if (this.meridiansLabels_) {
        for (index = 0, l = this.meridiansLabels_.length; index < l; ++index) {
          const lineString = this.meridians_[index];
          if (!rotation && world === 0) {
            textPoint = this.getMeridianPoint_(lineString, extent, index);
          } else {
            const clone = lineString.clone();
            clone.translate(world * worldWidth, 0);
            clone.rotate(-rotation, rotationCenter);
            textPoint = this.getMeridianPoint_(clone, rotationExtent, index);
            textPoint.rotate(rotation, rotationCenter);
          }
          feature = this.featurePool_[poolIndex++];
          feature.setGeometry(textPoint);
          feature.set("graticule_label", this.meridiansLabels_[index].text);
          vectorContext.drawFeature(feature, this.lonLabelStyle_(feature));
        }
      }
      if (this.parallelsLabels_) {
        if (world === startWorld && labelsAtStart || world === endWorld && !labelsAtStart) {
          for (index = 0, l = this.parallels_.length; index < l; ++index) {
            const lineString = this.parallels_[index];
            if (!rotation && world === 0) {
              textPoint = this.getParallelPoint_(lineString, extent, index);
            } else {
              const clone = lineString.clone();
              clone.translate(world * worldWidth, 0);
              clone.rotate(-rotation, rotationCenter);
              textPoint = this.getParallelPoint_(clone, rotationExtent, index);
              textPoint.rotate(rotation, rotationCenter);
            }
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(textPoint);
            feature.set("graticule_label", this.parallelsLabels_[index].text);
            vectorContext.drawFeature(feature, this.latLabelStyle_(feature));
          }
        }
      }
    }
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} squaredTolerance Squared tolerance.
   * @private
   */
  createGraticule_(extent, center, resolution, squaredTolerance) {
    const interval = this.getInterval_(resolution);
    if (interval == -1) {
      this.meridians_.length = 0;
      this.parallels_.length = 0;
      if (this.meridiansLabels_) {
        this.meridiansLabels_.length = 0;
      }
      if (this.parallelsLabels_) {
        this.parallelsLabels_.length = 0;
      }
      return;
    }
    let wrapX2 = false;
    const projectionExtent = this.projection_.getExtent();
    const worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      if (getWidth(extent) >= worldWidth) {
        extent[0] = projectionExtent[0];
        extent[2] = projectionExtent[2];
      } else {
        wrapX2 = true;
      }
    }
    const validCenterP = [clamp(center[0], this.minX_, this.maxX_), clamp(center[1], this.minY_, this.maxY_)];
    const centerLonLat = this.toLonLatTransform_(validCenterP);
    if (isNaN(centerLonLat[1])) {
      centerLonLat[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    let centerLon = clamp(centerLonLat[0], this.minLon_, this.maxLon_);
    let centerLat = clamp(centerLonLat[1], this.minLat_, this.maxLat_);
    const maxLines = this.maxLines_;
    let cnt, idx, lat, lon;
    let validExtentP = extent;
    if (!wrapX2) {
      validExtentP = [clamp(extent[0], this.minX_, this.maxX_), clamp(extent[1], this.minY_, this.maxY_), clamp(extent[2], this.minX_, this.maxX_), clamp(extent[3], this.minY_, this.maxY_)];
    }
    const validExtent = applyTransform(validExtentP, this.toLonLatTransform_, void 0, 8);
    let maxLat = validExtent[3];
    let maxLon = validExtent[2];
    let minLat = validExtent[1];
    let minLon = validExtent[0];
    if (!wrapX2) {
      if (containsCoordinate(validExtentP, this.bottomLeft_)) {
        minLon = this.minLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.bottomRight_)) {
        maxLon = this.maxLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.topLeft_)) {
        minLon = this.minLon_;
        maxLat = this.maxLat_;
      }
      if (containsCoordinate(validExtentP, this.topRight_)) {
        maxLon = this.maxLon_;
        maxLat = this.maxLat_;
      }
      maxLat = clamp(maxLat, centerLat, this.maxLat_);
      maxLon = clamp(maxLon, centerLon, this.maxLon_);
      minLat = clamp(minLat, this.minLat_, centerLat);
      minLon = clamp(minLon, this.minLon_, centerLon);
    }
    centerLon = Math.floor(centerLon / interval) * interval;
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);
    cnt = 0;
    if (wrapX2) {
      while ((lon -= interval) >= minLon && cnt++ < maxLines) {
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    } else {
      while (lon != this.minLon_ && cnt++ < maxLines) {
        lon = Math.max(lon - interval, this.minLon_);
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    }
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    cnt = 0;
    if (wrapX2) {
      while ((lon += interval) <= maxLon && cnt++ < maxLines) {
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    } else {
      while (lon != this.maxLon_ && cnt++ < maxLines) {
        lon = Math.min(lon + interval, this.maxLon_);
        idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, idx);
      }
    }
    this.meridians_.length = idx;
    if (this.meridiansLabels_) {
      this.meridiansLabels_.length = idx;
    }
    centerLat = Math.floor(centerLat / interval) * interval;
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, 0);
    cnt = 0;
    while (lat != this.minLat_ && cnt++ < maxLines) {
      lat = Math.max(lat - interval, this.minLat_);
      idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
    }
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    cnt = 0;
    while (lat != this.maxLat_ && cnt++ < maxLines) {
      lat = Math.min(lat + interval, this.maxLat_);
      idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, idx);
    }
    this.parallels_.length = idx;
    if (this.parallelsLabels_) {
      this.parallelsLabels_.length = idx;
    }
  }
  /**
   * @param {number} resolution Resolution.
   * @return {number} The interval in degrees.
   * @private
   */
  getInterval_(resolution) {
    const centerLon = this.projectionCenterLonLat_[0];
    const centerLat = this.projectionCenterLonLat_[1];
    let interval = -1;
    const target = Math.pow(this.targetSize_ * resolution, 2);
    const p1 = [];
    const p2 = [];
    for (let i = 0, ii = this.intervals_.length; i < ii; ++i) {
      const delta = clamp(this.intervals_[i] / 2, 0, 90);
      const clampedLat = clamp(centerLat, -90 + delta, 90 - delta);
      p1[0] = centerLon - delta;
      p1[1] = clampedLat - delta;
      p2[0] = centerLon + delta;
      p2[1] = clampedLat + delta;
      this.fromLonLatTransform_(p1, p1);
      this.fromLonLatTransform_(p2, p2);
      const dist = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
      if (dist <= target) {
        break;
      }
      interval = this.intervals_[i];
    }
    return interval;
  }
  /**
   * @param {number} lon Longitude.
   * @param {number} minLat Minimal latitude.
   * @param {number} maxLat Maximal latitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} The meridian line string.
   * @param {number} index Index.
   * @private
   */
  getMeridian_(lon, minLat, maxLat, squaredTolerance, index) {
    const flatCoordinates = meridian(lon, minLat, maxLat, this.projection_, squaredTolerance);
    let lineString = this.meridians_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, "XY");
      this.meridians_[index] = lineString;
    } else {
      lineString.setFlatCoordinates("XY", flatCoordinates);
      lineString.changed();
    }
    return lineString;
  }
  /**
   * @param {LineString} lineString Meridian
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {Point} Meridian point.
   * @private
   */
  getMeridianPoint_(lineString, extent, index) {
    const flatCoordinates = lineString.getFlatCoordinates();
    let bottom = 1;
    let top = flatCoordinates.length - 1;
    if (flatCoordinates[bottom] > flatCoordinates[top]) {
      bottom = top;
      top = 1;
    }
    const clampedBottom = Math.max(extent[1], flatCoordinates[bottom]);
    const clampedTop = Math.min(extent[3], flatCoordinates[top]);
    const lat = clamp(extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_, clampedBottom, clampedTop);
    const coordinate0 = flatCoordinates[bottom - 1] + (flatCoordinates[top - 1] - flatCoordinates[bottom - 1]) * (lat - flatCoordinates[bottom]) / (flatCoordinates[top] - flatCoordinates[bottom]);
    const coordinate = [coordinate0, lat];
    const point = this.meridiansLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  }
  /**
   * Get the list of meridians.  Meridians are lines of equal longitude.
   * @return {Array<LineString>} The meridians.
   * @api
   */
  getMeridians() {
    return this.meridians_;
  }
  /**
   * @param {number} lat Latitude.
   * @param {number} minLon Minimal longitude.
   * @param {number} maxLon Maximal longitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} The parallel line string.
   * @param {number} index Index.
   * @private
   */
  getParallel_(lat, minLon, maxLon, squaredTolerance, index) {
    const flatCoordinates = parallel(lat, minLon, maxLon, this.projection_, squaredTolerance);
    let lineString = this.parallels_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, "XY");
    } else {
      lineString.setFlatCoordinates("XY", flatCoordinates);
      lineString.changed();
    }
    return lineString;
  }
  /**
   * @param {LineString} lineString Parallels.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {Point} Parallel point.
   * @private
   */
  getParallelPoint_(lineString, extent, index) {
    const flatCoordinates = lineString.getFlatCoordinates();
    let left = 0;
    let right = flatCoordinates.length - 2;
    if (flatCoordinates[left] > flatCoordinates[right]) {
      left = right;
      right = 0;
    }
    const clampedLeft = Math.max(extent[0], flatCoordinates[left]);
    const clampedRight = Math.min(extent[2], flatCoordinates[right]);
    const lon = clamp(extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_, clampedLeft, clampedRight);
    const coordinate1 = flatCoordinates[left + 1] + (flatCoordinates[right + 1] - flatCoordinates[left + 1]) * (lon - flatCoordinates[left]) / (flatCoordinates[right] - flatCoordinates[left]);
    const coordinate = [lon, coordinate1];
    const point = this.parallelsLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  }
  /**
   * Get the list of parallels.  Parallels are lines of equal latitude.
   * @return {Array<LineString>} The parallels.
   * @api
   */
  getParallels() {
    return this.parallels_;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @private
   */
  updateProjectionInfo_(projection) {
    const epsg4326Projection = get("EPSG:4326");
    const worldExtent = projection.getWorldExtent();
    this.maxLat_ = worldExtent[3];
    this.maxLon_ = worldExtent[2];
    this.minLat_ = worldExtent[1];
    this.minLon_ = worldExtent[0];
    const toLonLatTransform = getTransform(projection, epsg4326Projection);
    if (this.minLon_ < this.maxLon_) {
      this.toLonLatTransform_ = toLonLatTransform;
    } else {
      const split = this.minLon_ + this.maxLon_ / 2;
      this.maxLon_ += 360;
      this.toLonLatTransform_ = function(coordinates, output, dimension) {
        dimension = dimension || 2;
        const lonLatCoordinates = toLonLatTransform(coordinates, output, dimension);
        for (let i = 0, l = lonLatCoordinates.length; i < l; i += dimension) {
          if (lonLatCoordinates[i] < split) {
            lonLatCoordinates[i] += 360;
          }
        }
        return lonLatCoordinates;
      };
    }
    this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);
    const worldExtentP = applyTransform([this.minLon_, this.minLat_, this.maxLon_, this.maxLat_], this.fromLonLatTransform_, void 0, 8);
    this.minX_ = worldExtentP[0];
    this.maxX_ = worldExtentP[2];
    this.minY_ = worldExtentP[1];
    this.maxY_ = worldExtentP[3];
    this.bottomLeft_ = this.fromLonLatTransform_([this.minLon_, this.minLat_]);
    this.bottomRight_ = this.fromLonLatTransform_([this.maxLon_, this.minLat_]);
    this.topLeft_ = this.fromLonLatTransform_([this.minLon_, this.maxLat_]);
    this.topRight_ = this.fromLonLatTransform_([this.maxLon_, this.maxLat_]);
    this.projectionCenterLonLat_ = this.toLonLatTransform_(getCenter(projection.getExtent()));
    if (isNaN(this.projectionCenterLonLat_[1])) {
      this.projectionCenterLonLat_[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    this.projection_ = projection;
  }
};
var Graticule_default = Graticule;
export {
  Collection_default as Collection,
  Disposable_default as Disposable,
  Feature_default as Feature,
  Geolocation_default as Geolocation,
  Graticule_default as Graticule,
  Image_default as Image,
  ImageCanvas_default as ImageCanvas,
  ImageTile_default as ImageTile,
  Image_default as ImageWrapper,
  Kinetic_default as Kinetic,
  Map_default as Map,
  MapBrowserEvent_default as MapBrowserEvent,
  MapBrowserEventHandler_default as MapBrowserEventHandler,
  MapEvent_default as MapEvent,
  Object_default as Object,
  Observable_default as Observable,
  Overlay_default as Overlay,
  Tile_default as Tile,
  TileQueue_default as TileQueue,
  TileRange_default as TileRange,
  VERSION,
  VectorRenderTile_default as VectorRenderTile,
  VectorTile_default as VectorTile,
  View_default as View,
  getUid
};
//# sourceMappingURL=ol.js.map
