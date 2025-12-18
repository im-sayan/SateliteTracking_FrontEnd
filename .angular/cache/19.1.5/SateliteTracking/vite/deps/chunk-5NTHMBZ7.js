import {
  lineStringLength
} from "./chunk-5K73XM64.js";
import {
  CollectionEventType_default,
  Collection_default
} from "./chunk-BDEWHVOF.js";
import {
  RBush
} from "./chunk-RE7YPHWR.js";
import {
  Polygon_default,
  arrayMaxSquaredDelta,
  assignClosestArrayPoint,
  assignClosestMultiArrayPoint,
  assignClosestPoint,
  douglasPeucker,
  douglasPeuckerArray,
  forEach,
  getInteriorPointOfArray,
  getInteriorPointsOfMultiArray,
  inflateCoordinates,
  inflateCoordinatesArray,
  inflateEnds,
  inflateMultiCoordinatesArray,
  intersectsLineString,
  intersectsLineStringArray,
  intersectsLinearRingMultiArray,
  linearRingss,
  linearRingssAreOriented,
  linearRingssContainsXY,
  maxSquaredDelta,
  multiArrayMaxSquaredDelta,
  orientLinearRingsArray,
  quantizeArray,
  quantizeMultiArray
} from "./chunk-X7ORXD46.js";
import {
  Geometry_default,
  Point_default,
  SimpleGeometry_default,
  compose,
  create,
  deflateCoordinate,
  deflateCoordinates,
  deflateCoordinatesArray,
  deflateMultiCoordinatesArray,
  rotate,
  transform2D
} from "./chunk-KHAK5BH3.js";
import {
  closestSquaredDistanceXY,
  containsExtent,
  containsXY,
  createEmpty,
  createOrUpdate,
  createOrUpdateEmpty,
  createOrUpdateFromCoordinate,
  createOrUpdateFromFlatCoordinates,
  equals,
  extend as extend2,
  forEachCorner,
  get,
  getCenter,
  getHeight,
  intersects,
  wrapAndSliceX
} from "./chunk-XXVJEHZE.js";
import {
  lerp,
  squaredDistance
} from "./chunk-UVCLGJLE.js";
import {
  assert
} from "./chunk-IJQ6LSTY.js";
import {
  ObjectEventType_default,
  Object_default
} from "./chunk-BPFTGO52.js";
import {
  Event_default,
  getUid,
  listen,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import {
  isEmpty
} from "./chunk-VNWMKJWE.js";
import {
  EventType_default,
  TRUE,
  VOID,
  binarySearch,
  extend,
  memoizeOne
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/featureloader.js
var withCredentials = false;
function loadFeaturesXhr(url, format, extent, resolution, projection, success, failure) {
  const xhr2 = new XMLHttpRequest();
  xhr2.open("GET", typeof url === "function" ? url(extent, resolution, projection) : url, true);
  if (format.getType() == "arraybuffer") {
    xhr2.responseType = "arraybuffer";
  }
  xhr2.withCredentials = withCredentials;
  xhr2.onload = function(event) {
    if (!xhr2.status || xhr2.status >= 200 && xhr2.status < 300) {
      const type = format.getType();
      try {
        let source;
        if (type == "text" || type == "json") {
          source = xhr2.responseText;
        } else if (type == "xml") {
          source = xhr2.responseXML || xhr2.responseText;
        } else if (type == "arraybuffer") {
          source = /** @type {ArrayBuffer} */
          xhr2.response;
        }
        if (source) {
          success(
            /** @type {Array<FeatureType>} */
            format.readFeatures(source, {
              extent,
              featureProjection: projection
            }),
            format.readProjection(source)
          );
        } else {
          failure();
        }
      } catch {
        failure();
      }
    } else {
      failure();
    }
  };
  xhr2.onerror = failure;
  xhr2.send();
}
function xhr(url, format) {
  return function(extent, resolution, projection, success, failure) {
    loadFeaturesXhr(
      url,
      format,
      extent,
      resolution,
      projection,
      /**
       * @param {Array<FeatureType>} features The loaded features.
       * @param {import("./proj/Projection.js").default} dataProjection Data
       * projection.
       */
      (features, dataProjection) => {
        this.addFeatures(features);
        if (success !== void 0) {
          success(features);
        }
      },
      /* FIXME handle error */
      failure ? failure : VOID
    );
  };
}

// node_modules/ol/loadingstrategy.js
function all(extent, resolution) {
  return [[-Infinity, -Infinity, Infinity, Infinity]];
}

// node_modules/ol/geom/flat/center.js
function linearRingss2(flatCoordinates, offset, endss, stride) {
  const flatCenters = [];
  let extent = createEmpty();
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    extent = createOrUpdateFromFlatCoordinates(flatCoordinates, offset, ends[0], stride);
    flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
    offset = ends[ends.length - 1];
  }
  return flatCenters;
}

// node_modules/ol/geom/flat/interpolate.js
function interpolatePoint(flatCoordinates, offset, end, stride, fraction, dest, dimension) {
  let o, t;
  const n = (end - offset) / stride;
  if (n === 1) {
    o = offset;
  } else if (n === 2) {
    o = offset;
    t = fraction;
  } else if (n !== 0) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    let length = 0;
    const cumulativeLengths = [0];
    for (let i = offset + stride; i < end; i += stride) {
      const x2 = flatCoordinates[i];
      const y2 = flatCoordinates[i + 1];
      length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      cumulativeLengths.push(length);
      x1 = x2;
      y1 = y2;
    }
    const target = fraction * length;
    const index = binarySearch(cumulativeLengths, target);
    if (index < 0) {
      t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
      o = offset + (-index - 2) * stride;
    } else {
      o = offset + index * stride;
    }
  }
  dimension = dimension > 1 ? dimension : 2;
  dest = dest ? dest : new Array(dimension);
  for (let i = 0; i < dimension; ++i) {
    dest[i] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i] : lerp(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
  }
  return dest;
}
function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
  if (end == offset) {
    return null;
  }
  let coordinate;
  if (m < flatCoordinates[offset + stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(offset, offset + stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (flatCoordinates[end - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(end - stride, end);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (m == flatCoordinates[offset + stride - 1]) {
    return flatCoordinates.slice(offset, offset + stride);
  }
  let lo = offset / stride;
  let hi = end / stride;
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (m < flatCoordinates[(mid + 1) * stride - 1]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  const m0 = flatCoordinates[lo * stride - 1];
  if (m == m0) {
    return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
  }
  const m1 = flatCoordinates[(lo + 1) * stride - 1];
  const t = (m - m0) / (m1 - m0);
  coordinate = [];
  for (let i = 0; i < stride - 1; ++i) {
    coordinate.push(lerp(flatCoordinates[(lo - 1) * stride + i], flatCoordinates[lo * stride + i], t));
  }
  coordinate.push(m);
  return coordinate;
}
function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
  if (interpolate) {
    return lineStringCoordinateAtM(flatCoordinates, offset, ends[ends.length - 1], stride, m, extrapolate);
  }
  let coordinate;
  if (m < flatCoordinates[stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(0, stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (flatCoordinates[flatCoordinates.length - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    if (offset == end) {
      continue;
    }
    if (m < flatCoordinates[offset + stride - 1]) {
      return null;
    }
    if (m <= flatCoordinates[end - 1]) {
      return lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, false);
    }
    offset = end;
  }
  return null;
}

// node_modules/ol/geom/Circle.js
var Circle = class _Circle extends SimpleGeometry_default {
  /**
   * @param {!import("../coordinate.js").Coordinate} center Center.
   *     For internal use, flat coordinates in combination with `layout` and no
   *     `radius` are also accepted.
   * @param {number} [radius] Radius in units of the projection.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(center, radius, layout) {
    super();
    if (layout !== void 0 && radius === void 0) {
      this.setFlatCoordinates(layout, center);
    } else {
      radius = radius ? radius : 0;
      this.setCenterAndRadius(center, radius, layout);
    }
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Circle} Clone.
   * @api
   * @override
   */
  clone() {
    const circle = new _Circle(this.flatCoordinates.slice(), void 0, this.layout);
    circle.applyProperties(this);
    return circle;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    const flatCoordinates = this.flatCoordinates;
    const dx = x - flatCoordinates[0];
    const dy = y - flatCoordinates[1];
    const squaredDistance2 = dx * dx + dy * dy;
    if (squaredDistance2 < minSquaredDistance) {
      if (squaredDistance2 === 0) {
        for (let i = 0; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      } else {
        const delta = this.getRadius() / Math.sqrt(squaredDistance2);
        closestPoint[0] = flatCoordinates[0] + delta * dx;
        closestPoint[1] = flatCoordinates[1] + delta * dy;
        for (let i = 2; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      }
      closestPoint.length = this.stride;
      return squaredDistance2;
    }
    return minSquaredDistance;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(x, y) {
    const flatCoordinates = this.flatCoordinates;
    const dx = x - flatCoordinates[0];
    const dy = y - flatCoordinates[1];
    return dx * dx + dy * dy <= this.getRadiusSquared_();
  }
  /**
   * Return the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @return {import("../coordinate.js").Coordinate} Center.
   * @api
   */
  getCenter() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(extent) {
    const flatCoordinates = this.flatCoordinates;
    const radius = flatCoordinates[this.stride] - flatCoordinates[0];
    return createOrUpdate(flatCoordinates[0] - radius, flatCoordinates[1] - radius, flatCoordinates[0] + radius, flatCoordinates[1] + radius, extent);
  }
  /**
   * Return the radius of the circle.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return Math.sqrt(this.getRadiusSquared_());
  }
  /**
   * @private
   * @return {number} Radius squared.
   */
  getRadiusSquared_() {
    const dx = this.flatCoordinates[this.stride] - this.flatCoordinates[0];
    const dy = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return dx * dx + dy * dy;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Circle";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    const circleExtent = this.getExtent();
    if (intersects(extent, circleExtent)) {
      const center = this.getCenter();
      if (extent[0] <= center[0] && extent[2] >= center[0]) {
        return true;
      }
      if (extent[1] <= center[1] && extent[3] >= center[1]) {
        return true;
      }
      return forEachCorner(extent, this.intersectsCoordinate.bind(this));
    }
    return false;
  }
  /**
   * Set the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @api
   */
  setCenter(center) {
    const stride = this.stride;
    const radius = this.flatCoordinates[stride] - this.flatCoordinates[0];
    const flatCoordinates = center.slice();
    flatCoordinates[stride] = flatCoordinates[0] + radius;
    for (let i = 1; i < stride; ++i) {
      flatCoordinates[stride + i] = center[i];
    }
    this.setFlatCoordinates(this.layout, flatCoordinates);
    this.changed();
  }
  /**
   * Set the center (as {@link module:ol/coordinate~Coordinate coordinate}) and the radius (as
   * number) of the circle.
   * @param {!import("../coordinate.js").Coordinate} center Center.
   * @param {number} radius Radius.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCenterAndRadius(center, radius, layout) {
    this.setLayout(layout, center, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const flatCoordinates = this.flatCoordinates;
    let offset = deflateCoordinate(flatCoordinates, 0, center, this.stride);
    flatCoordinates[offset++] = flatCoordinates[0] + radius;
    for (let i = 1, ii = this.stride; i < ii; ++i) {
      flatCoordinates[offset++] = flatCoordinates[i];
    }
    flatCoordinates.length = offset;
    this.changed();
  }
  /**
   * @override
   */
  getCoordinates() {
    return null;
  }
  /**
   * @override
   */
  setCoordinates(coordinates, layout) {
  }
  /**
   * Set the radius of the circle. The radius is in the units of the projection.
   * @param {number} radius Radius.
   * @api
   */
  setRadius(radius) {
    this.flatCoordinates[this.stride] = this.flatCoordinates[0] + radius;
    this.changed();
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(angle, anchor) {
    const center = this.getCenter();
    const stride = this.getStride();
    this.setCenter(rotate(center, 0, center.length, stride, angle, anchor, center));
    this.changed();
  }
};
Circle.prototype.transform;
var Circle_default = Circle;

// node_modules/ol/geom/GeometryCollection.js
var GeometryCollection = class _GeometryCollection extends Geometry_default {
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  constructor(geometries) {
    super();
    this.geometries_ = geometries;
    this.changeEventsKeys_ = [];
    this.listenGeometriesChange_();
  }
  /**
   * @private
   */
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(unlistenByKey);
    this.changeEventsKeys_.length = 0;
  }
  /**
   * @private
   */
  listenGeometriesChange_() {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      this.changeEventsKeys_.push(listen(geometries[i], EventType_default.CHANGE, this.changed, this));
    }
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   * @override
   */
  clone() {
    const geometryCollection = new _GeometryCollection(cloneGeometries(this.geometries_));
    geometryCollection.applyProperties(this);
    return geometryCollection;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      minSquaredDistance = geometries[i].closestPointXY(x, y, closestPoint, minSquaredDistance);
    }
    return minSquaredDistance;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(x, y) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].containsXY(x, y)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(extent) {
    createOrUpdateEmpty(extent);
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      extend2(extent, geometries[i].getExtent());
    }
    return extent;
  }
  /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */
  getGeometries() {
    return cloneGeometries(this.geometries_);
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArray() {
    return this.geometries_;
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArrayRecursive() {
    let geometriesArray = [];
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].getType() === this.getType()) {
        geometriesArray = geometriesArray.concat(
          /** @type {GeometryCollection} */
          geometries[i].getGeometriesArrayRecursive()
        );
      } else {
        geometriesArray.push(geometries[i]);
      }
    }
    return geometriesArray;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   * @override
   */
  getSimplifiedGeometry(squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }
    const simplifiedGeometries = [];
    const geometries = this.geometries_;
    let simplified = false;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      const geometry = geometries[i];
      const simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
      simplifiedGeometries.push(simplifiedGeometry);
      if (simplifiedGeometry !== geometry) {
        simplified = true;
      }
    }
    if (simplified) {
      const simplifiedGeometryCollection = new _GeometryCollection(simplifiedGeometries);
      return simplifiedGeometryCollection;
    }
    this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
    return this;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "GeometryCollection";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].intersectsExtent(extent)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.geometries_.length === 0;
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   * @override
   */
  rotate(angle, anchor) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].rotate(angle, anchor);
    }
    this.changed();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(sx, sy, anchor) {
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].scale(sx, sy, anchor);
    }
    this.changed();
  }
  /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */
  setGeometries(geometries) {
    this.setGeometriesArray(cloneGeometries(geometries));
  }
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  setGeometriesArray(geometries) {
    this.unlistenGeometriesChange_();
    this.geometries_ = geometries;
    this.listenGeometriesChange_();
    this.changed();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   * @override
   */
  applyTransform(transformFn) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].applyTransform(transformFn);
    }
    this.changed();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   * @override
   */
  translate(deltaX, deltaY) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].translate(deltaX, deltaY);
    }
    this.changed();
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    this.unlistenGeometriesChange_();
    super.disposeInternal();
  }
};
function cloneGeometries(geometries) {
  return geometries.map((geometry) => geometry.clone());
}
var GeometryCollection_default = GeometryCollection;

// node_modules/ol/geom/LineString.js
var LineString = class _LineString extends SimpleGeometry_default {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates, layout) {
    super();
    this.flatMidpoint_ = null;
    this.flatMidpointRevision_ = -1;
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    if (layout !== void 0 && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
    } else {
      this.setCoordinates(
        /** @type {Array<import("../coordinate.js").Coordinate>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */
  appendCoordinate(coordinate) {
    extend(this.flatCoordinates, coordinate);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   * @override
   */
  clone() {
    const lineString = new _LineString(this.flatCoordinates.slice(), this.layout);
    lineString.applyProperties(this);
    return lineString;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(maxSquaredDelta(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
  }
  /**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */
  forEachSegment(callback) {
    return forEach(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, callback);
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(m, extrapolate) {
    if (this.layout != "XYM" && this.layout != "XYZM") {
      return null;
    }
    extrapolate = extrapolate !== void 0 ? extrapolate : false;
    return lineStringCoordinateAtM(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, m, extrapolate);
  }
  /**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  /**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */
  getCoordinateAt(fraction, dest) {
    return interpolatePoint(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, fraction, dest, this.stride);
  }
  /**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */
  getLength() {
    return lineStringLength(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    if (this.flatMidpointRevision_ != this.getRevision()) {
      this.flatMidpoint_ = this.getCoordinateAt(0.5, this.flatMidpoint_ ?? void 0);
      this.flatMidpointRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.flatMidpoint_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new _LineString(simplifiedFlatCoordinates, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "LineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    return intersectsLineString(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent, this.getExtent());
  }
  /**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  }
};
var LineString_default = LineString;

// node_modules/ol/geom/MultiLineString.js
var MultiLineString = class _MultiLineString extends SimpleGeometry_default {
  /**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Flat coordinate ends for internal use.
   */
  constructor(coordinates, layout, ends) {
    super();
    this.ends_ = [];
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    if (Array.isArray(coordinates[0])) {
      this.setCoordinates(
        /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
        coordinates,
        layout
      );
    } else if (layout !== void 0 && ends) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
      this.ends_ = ends;
    } else {
      const lineStrings = (
        /** @type {Array<LineString>} */
        coordinates
      );
      const flatCoordinates = [];
      const ends2 = [];
      for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
        const lineString = lineStrings[i];
        extend(flatCoordinates, lineString.getFlatCoordinates());
        ends2.push(flatCoordinates.length);
      }
      const layout2 = lineStrings.length === 0 ? this.getLayout() : lineStrings[0].getLayout();
      this.setFlatCoordinates(layout2, flatCoordinates);
      this.ends_ = ends2;
    }
  }
  /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */
  appendLineString(lineString) {
    extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   * @override
   */
  clone() {
    const multiLineString = new _MultiLineString(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
    multiLineString.applyProperties(this);
    return multiLineString;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(arrayMaxSquaredDelta(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestArrayPoint(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, false, x, y, closestPoint, minSquaredDistance);
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(m, extrapolate, interpolate) {
    if (this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0) {
      return null;
    }
    extrapolate = extrapolate !== void 0 ? extrapolate : false;
    interpolate = interpolate !== void 0 ? interpolate : false;
    return lineStringsCoordinateAtM(this.flatCoordinates, 0, this.ends_, this.stride, m, extrapolate, interpolate);
  }
  /**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return inflateCoordinatesArray(this.flatCoordinates, 0, this.ends_, this.stride);
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */
  getLineString(index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }
    return new LineString_default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  }
  /**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */
  getLineStrings() {
    const flatCoordinates = this.flatCoordinates;
    const ends = this.ends_;
    const layout = this.layout;
    const lineStrings = [];
    let offset = 0;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const lineString = new LineString_default(flatCoordinates.slice(offset, end), layout);
      lineStrings.push(lineString);
      offset = end;
    }
    return lineStrings;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    const midpoints = [];
    const flatCoordinates = this.flatCoordinates;
    let offset = 0;
    const ends = this.ends_;
    const stride = this.stride;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const midpoint = interpolatePoint(flatCoordinates, offset, end, stride, 0.5);
      extend(midpoints, midpoint);
      offset = end;
    }
    return midpoints;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    const simplifiedEnds = [];
    simplifiedFlatCoordinates.length = douglasPeuckerArray(this.flatCoordinates, 0, this.ends_, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new _MultiLineString(simplifiedFlatCoordinates, "XY", simplifiedEnds);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiLineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    return intersectsLineStringArray(this.flatCoordinates, 0, this.ends_, this.stride, extent);
  }
  /**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 2);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const ends = deflateCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  }
};
var MultiLineString_default = MultiLineString;

// node_modules/ol/geom/MultiPoint.js
var MultiPoint = class _MultiPoint extends SimpleGeometry_default {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates, layout) {
    super();
    if (layout && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
    } else {
      this.setCoordinates(
        /** @type {Array<import("../coordinate.js").Coordinate>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */
  appendPoint(point) {
    extend(this.flatCoordinates, point.getFlatCoordinates());
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   * @override
   */
  clone() {
    const multiPoint = new _MultiPoint(this.flatCoordinates.slice(), this.layout);
    multiPoint.applyProperties(this);
    return multiPoint;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    const flatCoordinates = this.flatCoordinates;
    const stride = this.stride;
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const squaredDistance2 = squaredDistance(x, y, flatCoordinates[i], flatCoordinates[i + 1]);
      if (squaredDistance2 < minSquaredDistance) {
        minSquaredDistance = squaredDistance2;
        for (let j = 0; j < stride; ++j) {
          closestPoint[j] = flatCoordinates[i + j];
        }
        closestPoint.length = stride;
      }
    }
    return minSquaredDistance;
  }
  /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return inflateCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  }
  /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */
  getPoint(index) {
    const n = this.flatCoordinates.length / this.stride;
    if (index < 0 || n <= index) {
      return null;
    }
    return new Point_default(this.flatCoordinates.slice(index * this.stride, (index + 1) * this.stride), this.layout);
  }
  /**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */
  getPoints() {
    const flatCoordinates = this.flatCoordinates;
    const layout = this.layout;
    const stride = this.stride;
    const points = [];
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const point = new Point_default(flatCoordinates.slice(i, i + stride), layout);
      points.push(point);
    }
    return points;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiPoint";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    const flatCoordinates = this.flatCoordinates;
    const stride = this.stride;
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const x = flatCoordinates[i];
      const y = flatCoordinates[i + 1];
      if (containsXY(extent, x, y)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  }
};
var MultiPoint_default = MultiPoint;

// node_modules/ol/geom/MultiPolygon.js
var MultiPolygon = class _MultiPolygon extends SimpleGeometry_default {
  /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */
  constructor(coordinates, layout, endss) {
    super();
    this.endss_ = [];
    this.flatInteriorPointsRevision_ = -1;
    this.flatInteriorPoints_ = null;
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    this.orientedRevision_ = -1;
    this.orientedFlatCoordinates_ = null;
    if (!endss && !Array.isArray(coordinates[0])) {
      const polygons = (
        /** @type {Array<Polygon>} */
        coordinates
      );
      const flatCoordinates = [];
      const thisEndss = [];
      for (let i = 0, ii = polygons.length; i < ii; ++i) {
        const polygon = polygons[i];
        const offset = flatCoordinates.length;
        const ends = polygon.getEnds();
        for (let j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] += offset;
        }
        extend(flatCoordinates, polygon.getFlatCoordinates());
        thisEndss.push(ends);
      }
      layout = polygons.length === 0 ? this.getLayout() : polygons[0].getLayout();
      coordinates = flatCoordinates;
      endss = thisEndss;
    }
    if (layout !== void 0 && endss) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
      this.endss_ = endss;
    } else {
      this.setCoordinates(
        /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */
  appendPolygon(polygon) {
    let ends;
    if (!this.flatCoordinates) {
      this.flatCoordinates = polygon.getFlatCoordinates().slice();
      ends = polygon.getEnds().slice();
      this.endss_.push();
    } else {
      const offset = this.flatCoordinates.length;
      extend(this.flatCoordinates, polygon.getFlatCoordinates());
      ends = polygon.getEnds().slice();
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] += offset;
      }
    }
    this.endss_.push(ends);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   * @override
   */
  clone() {
    const len = this.endss_.length;
    const newEndss = new Array(len);
    for (let i = 0; i < len; ++i) {
      newEndss[i] = this.endss_[i].slice();
    }
    const multiPolygon = new _MultiPolygon(this.flatCoordinates.slice(), this.layout, newEndss);
    multiPolygon.applyProperties(this);
    return multiPolygon;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   * @override
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(multiArrayMaxSquaredDelta(this.flatCoordinates, 0, this.endss_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestMultiArrayPoint(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   * @override
   */
  containsXY(x, y) {
    return linearRingssContainsXY(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, x, y);
  }
  /**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return linearRingss(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride);
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   * @override
   */
  getCoordinates(right) {
    let flatCoordinates;
    if (right !== void 0) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      orientLinearRingsArray(flatCoordinates, 0, this.endss_, this.stride, right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }
    return inflateMultiCoordinatesArray(flatCoordinates, 0, this.endss_, this.stride);
  }
  /**
   * @return {Array<Array<number>>} Endss.
   */
  getEndss() {
    return this.endss_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const flatCenters = linearRingss2(this.flatCoordinates, 0, this.endss_, this.stride);
      this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, flatCenters);
      this.flatInteriorPointsRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.flatInteriorPoints_
    );
  }
  /**
   * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoints() {
    return new MultiPoint_default(this.getFlatInteriorPoints().slice(), "XYM");
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const flatCoordinates = this.flatCoordinates;
      if (linearRingssAreOriented(flatCoordinates, 0, this.endss_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = orientLinearRingsArray(this.orientedFlatCoordinates_, 0, this.endss_, this.stride);
      }
      this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   * @override
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    const simplifiedEndss = [];
    simplifiedFlatCoordinates.length = quantizeMultiArray(this.flatCoordinates, 0, this.endss_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEndss);
    return new _MultiPolygon(simplifiedFlatCoordinates, "XY", simplifiedEndss);
  }
  /**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */
  getPolygon(index) {
    if (index < 0 || this.endss_.length <= index) {
      return null;
    }
    let offset;
    if (index === 0) {
      offset = 0;
    } else {
      const prevEnds = this.endss_[index - 1];
      offset = prevEnds[prevEnds.length - 1];
    }
    const ends = this.endss_[index].slice();
    const end = ends[ends.length - 1];
    if (offset !== 0) {
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] -= offset;
      }
    }
    return new Polygon_default(this.flatCoordinates.slice(offset, end), this.layout, ends);
  }
  /**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */
  getPolygons() {
    const layout = this.layout;
    const flatCoordinates = this.flatCoordinates;
    const endss = this.endss_;
    const polygons = [];
    let offset = 0;
    for (let i = 0, ii = endss.length; i < ii; ++i) {
      const ends = endss[i].slice();
      const end = ends[ends.length - 1];
      if (offset !== 0) {
        for (let j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] -= offset;
        }
      }
      const polygon = new Polygon_default(flatCoordinates.slice(offset, end), layout, ends);
      polygons.push(polygon);
      offset = end;
    }
    return polygons;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "MultiPolygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    return intersectsLinearRingMultiArray(this.getOrientedFlatCoordinates(), 0, this.endss_, this.stride, extent);
  }
  /**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 3);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const endss = deflateMultiCoordinatesArray(this.flatCoordinates, 0, coordinates, this.stride, this.endss_);
    if (endss.length === 0) {
      this.flatCoordinates.length = 0;
    } else {
      const lastEnds = endss[endss.length - 1];
      this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
    }
    this.changed();
  }
};
var MultiPolygon_default = MultiPolygon;

// node_modules/ol/render/Feature.js
var tmpTransform = create();
var RenderFeature = class _RenderFeature {
  /**
   * @param {Type} type Geometry type.
   * @param {Array<number>} flatCoordinates Flat coordinates. These always need
   *     to be right-handed for polygons.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Object<string, *>} properties Properties.
   * @param {number|string|undefined} id Feature id.
   */
  constructor(type, flatCoordinates, ends, stride, properties, id) {
    this.styleFunction;
    this.extent_;
    this.id_ = id;
    this.type_ = type;
    this.flatCoordinates_ = flatCoordinates;
    this.flatInteriorPoints_ = null;
    this.flatMidpoints_ = null;
    this.ends_ = ends || null;
    this.properties_ = properties;
    this.squaredTolerance_;
    this.stride_ = stride;
    this.simplifiedGeometry_;
  }
  /**
   * Get a feature property by its key.
   * @param {string} key Key
   * @return {*} Value for the requested key.
   * @api
   */
  get(key) {
    return this.properties_[key];
  }
  /**
   * Get the extent of this feature's geometry.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    if (!this.extent_) {
      this.extent_ = this.type_ === "Point" ? createOrUpdateFromCoordinate(this.flatCoordinates_) : createOrUpdateFromFlatCoordinates(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2);
    }
    return this.extent_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoint() {
    if (!this.flatInteriorPoints_) {
      const flatCenter = getCenter(this.getExtent());
      this.flatInteriorPoints_ = getInteriorPointOfArray(this.flatCoordinates_, 0, this.ends_, 2, flatCenter, 0);
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (!this.flatInteriorPoints_) {
      const ends = inflateEnds(this.flatCoordinates_, this.ends_);
      const flatCenters = linearRingss2(this.flatCoordinates_, 0, ends, 2);
      this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(this.flatCoordinates_, 0, ends, 2, flatCenters);
    }
    return this.flatInteriorPoints_;
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = interpolatePoint(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, 0.5);
    }
    return this.flatMidpoints_;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    if (!this.flatMidpoints_) {
      this.flatMidpoints_ = [];
      const flatCoordinates = this.flatCoordinates_;
      let offset = 0;
      const ends = (
        /** @type {Array<number>} */
        this.ends_
      );
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        const end = ends[i];
        const midpoint = interpolatePoint(flatCoordinates, offset, end, 2, 0.5);
        extend(this.flatMidpoints_, midpoint);
        offset = end;
      }
    }
    return this.flatMidpoints_;
  }
  /**
   * Get the feature identifier.  This is a stable identifier for the feature and
   * is set when reading data from a remote source.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id_;
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getOrientedFlatCoordinates() {
    return this.flatCoordinates_;
  }
  /**
   * For API compatibility with {@link module:ol/Feature~Feature}, this method is useful when
   * determining the geometry type in style function (see {@link #getType}).
   * @return {RenderFeature} Feature.
   * @api
   */
  getGeometry() {
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {RenderFeature} Simplified geometry.
   */
  getSimplifiedGeometry(squaredTolerance) {
    return this;
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {RenderFeature} Simplified geometry.
   */
  simplifyTransformed(squaredTolerance, transform) {
    return this;
  }
  /**
   * Get the feature properties.
   * @return {Object<string, *>} Feature properties.
   * @api
   */
  getProperties() {
    return this.properties_;
  }
  /**
   * Get an object of all property names and values.  This has the same behavior as getProperties,
   * but is here to conform with the {@link module:ol/Feature~Feature} interface.
   * @return {Object<string, *>?} Object.
   */
  getPropertiesInternal() {
    return this.properties_;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride_;
  }
  /**
   * @return {import('../style/Style.js').StyleFunction|undefined} Style
   */
  getStyleFunction() {
    return this.styleFunction;
  }
  /**
   * Get the type of this feature's geometry.
   * @return {Type} Geometry type.
   * @api
   */
  getType() {
    return this.type_;
  }
  /**
   * Transform geometry coordinates from tile pixel space to projected.
   *
   * @param {import("../proj.js").ProjectionLike} projection The data projection
   */
  transform(projection) {
    projection = get(projection);
    const pixelExtent = projection.getExtent();
    const projectedExtent = projection.getWorldExtent();
    if (pixelExtent && projectedExtent) {
      const scale = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
      transform2D(this.flatCoordinates_, 0, this.flatCoordinates_.length, 2, tmpTransform, this.flatCoordinates_);
    }
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   */
  applyTransform(transformFn) {
    transformFn(this.flatCoordinates_, this.flatCoordinates_, this.stride_);
  }
  /**
   * @return {RenderFeature} A cloned render feature.
   */
  clone() {
    return new _RenderFeature(this.type_, this.flatCoordinates_.slice(), this.ends_?.slice(), this.stride_, Object.assign({}, this.properties_), this.id_);
  }
  /**
   * @return {Array<number>|null} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Add transform and resolution based geometry simplification to this instance.
   * @return {RenderFeature} This render feature.
   */
  enableSimplifyTransformed() {
    this.simplifyTransformed = memoizeOne((squaredTolerance, transform) => {
      if (squaredTolerance === this.squaredTolerance_) {
        return this.simplifiedGeometry_;
      }
      this.simplifiedGeometry_ = this.clone();
      if (transform) {
        this.simplifiedGeometry_.applyTransform(transform);
      }
      const simplifiedFlatCoordinates = this.simplifiedGeometry_.getFlatCoordinates();
      let simplifiedEnds;
      switch (this.type_) {
        case "LineString":
          simplifiedFlatCoordinates.length = douglasPeucker(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.flatCoordinates_.length, this.simplifiedGeometry_.stride_, squaredTolerance, simplifiedFlatCoordinates, 0);
          simplifiedEnds = [simplifiedFlatCoordinates.length];
          break;
        case "MultiLineString":
          simplifiedEnds = [];
          simplifiedFlatCoordinates.length = douglasPeuckerArray(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.ends_, this.simplifiedGeometry_.stride_, squaredTolerance, simplifiedFlatCoordinates, 0, simplifiedEnds);
          break;
        case "Polygon":
          simplifiedEnds = [];
          simplifiedFlatCoordinates.length = quantizeArray(simplifiedFlatCoordinates, 0, this.simplifiedGeometry_.ends_, this.simplifiedGeometry_.stride_, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
          break;
        default:
      }
      if (simplifiedEnds) {
        this.simplifiedGeometry_ = new _RenderFeature(this.type_, simplifiedFlatCoordinates, simplifiedEnds, 2, this.properties_, this.id_);
      }
      this.squaredTolerance_ = squaredTolerance;
      return this.simplifiedGeometry_;
    });
    return this;
  }
};
RenderFeature.prototype.getFlatCoordinates = RenderFeature.prototype.getOrientedFlatCoordinates;
var Feature_default2 = RenderFeature;

// node_modules/ol/structs/RBush.js
var RBush2 = class {
  /**
   * @param {number} [maxEntries] Max entries.
   */
  constructor(maxEntries) {
    this.rbush_ = new RBush(maxEntries);
    this.items_ = {};
  }
  /**
   * Insert a value into the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  insert(extent, value) {
    const item = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3],
      value
    };
    this.rbush_.insert(item);
    this.items_[getUid(value)] = item;
  }
  /**
   * Bulk-insert values into the RBush.
   * @param {Array<import("../extent.js").Extent>} extents Extents.
   * @param {Array<T>} values Values.
   */
  load(extents, values) {
    const items = new Array(values.length);
    for (let i = 0, l = values.length; i < l; i++) {
      const extent = extents[i];
      const value = values[i];
      const item = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3],
        value
      };
      items[i] = item;
      this.items_[getUid(value)] = item;
    }
    this.rbush_.load(items);
  }
  /**
   * Remove a value from the RBush.
   * @param {T} value Value.
   * @return {boolean} Removed.
   */
  remove(value) {
    const uid = getUid(value);
    const item = this.items_[uid];
    delete this.items_[uid];
    return this.rbush_.remove(item) !== null;
  }
  /**
   * Update the extent of a value in the RBush.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {T} value Value.
   */
  update(extent, value) {
    const item = this.items_[getUid(value)];
    const bbox = [item.minX, item.minY, item.maxX, item.maxY];
    if (!equals(bbox, extent)) {
      this.remove(value);
      this.insert(extent, value);
    }
  }
  /**
   * Return all values in the RBush.
   * @return {Array<T>} All.
   */
  getAll() {
    const items = this.rbush_.all();
    return items.map(function(item) {
      return item.value;
    });
  }
  /**
   * Return all values in the given extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {Array<T>} All in extent.
   */
  getInExtent(extent) {
    const bbox = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    const items = this.rbush_.search(bbox);
    return items.map(function(item) {
      return item.value;
    });
  }
  /**
   * Calls a callback function with each value in the tree.
   * If the callback returns a truthy value, this value is returned without
   * checking the rest of the tree.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   */
  forEach(callback) {
    return this.forEach_(this.getAll(), callback);
  }
  /**
   * Calls a callback function with each value in the provided extent.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   */
  forEachInExtent(extent, callback) {
    return this.forEach_(this.getInExtent(extent), callback);
  }
  /**
   * @param {Array<T>} values Values.
   * @param {function(T): R} callback Callback.
   * @return {R|undefined} Callback return value.
   * @template R
   * @private
   */
  forEach_(values, callback) {
    let result;
    for (let i = 0, l = values.length; i < l; i++) {
      result = callback(values[i]);
      if (result) {
        return result;
      }
    }
    return result;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return isEmpty(this.items_);
  }
  /**
   * Remove all values from the RBush.
   */
  clear() {
    this.rbush_.clear();
    this.items_ = {};
  }
  /**
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} Extent.
   */
  getExtent(extent) {
    const data = this.rbush_.toJSON();
    return createOrUpdate(data.minX, data.minY, data.maxX, data.maxY, extent);
  }
  /**
   * @param {RBush<T>} rbush R-Tree.
   */
  concat(rbush) {
    this.rbush_.load(rbush.rbush_.all());
    for (const i in rbush.items_) {
      this.items_[i] = rbush.items_[i];
    }
  }
};
var RBush_default = RBush2;

// node_modules/ol/source/Source.js
var Source = class extends Object_default {
  /**
   * @param {Options} options Source options.
   */
  constructor(options) {
    super();
    this.projection = get(options.projection);
    this.attributions_ = adaptAttributions(options.attributions);
    this.attributionsCollapsible_ = options.attributionsCollapsible ?? true;
    this.loading = false;
    this.state_ = options.state !== void 0 ? options.state : "ready";
    this.wrapX_ = options.wrapX !== void 0 ? options.wrapX : false;
    this.interpolate_ = !!options.interpolate;
    this.viewResolver = null;
    this.viewRejector = null;
    const self = this;
    this.viewPromise_ = new Promise(function(resolve, reject) {
      self.viewResolver = resolve;
      self.viewRejector = reject;
    });
  }
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   * @api
   */
  getAttributions() {
    return this.attributions_;
  }
  /**
   * @return {boolean} Attributions are collapsible.
   * @api
   */
  getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  }
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default|null} Projection.
   * @api
   */
  getProjection() {
    return this.projection;
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   */
  getResolutions(projection) {
    return null;
  }
  /**
   * @return {Promise<import("../View.js").ViewOptions>} A promise for view-related properties.
   */
  getView() {
    return this.viewPromise_;
  }
  /**
   * Get the state of the source, see {@link import("./Source.js").State} for possible states.
   * @return {import("./Source.js").State} State.
   * @api
   */
  getState() {
    return this.state_;
  }
  /**
   * @return {boolean|undefined} Wrap X.
   */
  getWrapX() {
    return this.wrapX_;
  }
  /**
   * @return {boolean} Use linear interpolation when resampling.
   */
  getInterpolate() {
    return this.interpolate_;
  }
  /**
   * Refreshes the source. The source will be cleared, and data from the server will be reloaded.
   * @api
   */
  refresh() {
    this.changed();
  }
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, {@link module:ol/source/Source~Attribution},
   *     or `undefined`.
   * @api
   */
  setAttributions(attributions) {
    this.attributions_ = adaptAttributions(attributions);
    this.changed();
  }
  /**
   * Set the state of the source.
   * @param {import("./Source.js").State} state State.
   */
  setState(state) {
    this.state_ = state;
    this.changed();
  }
};
function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }
  if (typeof attributionLike === "function") {
    return attributionLike;
  }
  if (!Array.isArray(attributionLike)) {
    attributionLike = [attributionLike];
  }
  return (frameState) => attributionLike;
}
var Source_default = Source;

// node_modules/ol/source/VectorEventType.js
var VectorEventType_default = {
  /**
   * Triggered when a feature is added to the source.
   * @event module:ol/source/Vector.VectorSourceEvent#addfeature
   * @api
   */
  ADDFEATURE: "addfeature",
  /**
   * Triggered when a feature is updated.
   * @event module:ol/source/Vector.VectorSourceEvent#changefeature
   * @api
   */
  CHANGEFEATURE: "changefeature",
  /**
   * Triggered when the clear method is called on the source.
   * @event module:ol/source/Vector.VectorSourceEvent#clear
   * @api
   */
  CLEAR: "clear",
  /**
   * Triggered when a feature is removed from the source.
   * See {@link module:ol/source/Vector~VectorSource#clear source.clear()} for exceptions.
   * @event module:ol/source/Vector.VectorSourceEvent#removefeature
   * @api
   */
  REMOVEFEATURE: "removefeature",
  /**
   * Triggered when features starts loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadstart
   * @api
   */
  FEATURESLOADSTART: "featuresloadstart",
  /**
   * Triggered when features finishes loading.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloadend
   * @api
   */
  FEATURESLOADEND: "featuresloadend",
  /**
   * Triggered if feature loading results in an error.
   * @event module:ol/source/Vector.VectorSourceEvent#featuresloaderror
   * @api
   */
  FEATURESLOADERROR: "featuresloaderror"
};

// node_modules/ol/source/Vector.js
var VectorSourceEvent = class extends Event_default {
  /**
   * @param {string} type Type.
   * @param {FeatureType} [feature] Feature.
   * @param {Array<FeatureType>} [features] Features.
   */
  constructor(type, feature, features) {
    super(type);
    this.feature = feature;
    this.features = features;
  }
};
var VectorSource = class extends Source_default {
  /**
   * @param {Options<FeatureType>} [options] Vector source options.
   */
  constructor(options) {
    options = options || {};
    super({
      attributions: options.attributions,
      interpolate: true,
      projection: void 0,
      state: "ready",
      wrapX: options.wrapX !== void 0 ? options.wrapX : true
    });
    this.on;
    this.once;
    this.un;
    this.loader_ = VOID;
    this.format_ = options.format || null;
    this.overlaps_ = options.overlaps === void 0 ? true : options.overlaps;
    this.url_ = options.url;
    if (options.loader !== void 0) {
      this.loader_ = options.loader;
    } else if (this.url_ !== void 0) {
      assert(this.format_, "`format` must be set when `url` is set");
      this.loader_ = xhr(this.url_, this.format_);
    }
    this.strategy_ = options.strategy !== void 0 ? options.strategy : all;
    const useSpatialIndex = options.useSpatialIndex !== void 0 ? options.useSpatialIndex : true;
    this.featuresRtree_ = useSpatialIndex ? new RBush_default() : null;
    this.loadedExtentsRtree_ = new RBush_default();
    this.loadingExtentsCount_ = 0;
    this.nullGeometryFeatures_ = {};
    this.idIndex_ = {};
    this.uidIndex_ = {};
    this.featureChangeKeys_ = {};
    this.featuresCollection_ = null;
    let collection;
    let features;
    if (Array.isArray(options.features)) {
      features = options.features;
    } else if (options.features) {
      collection = options.features;
      features = collection.getArray();
    }
    if (!useSpatialIndex && collection === void 0) {
      collection = new Collection_default(features);
    }
    if (features !== void 0) {
      this.addFeaturesInternal(features);
    }
    if (collection !== void 0) {
      this.bindFeaturesCollection_(collection);
    }
  }
  /**
   * Add a single feature to the source.  If you want to add a batch of features
   * at once, call {@link module:ol/source/Vector~VectorSource#addFeatures #addFeatures()}
   * instead. A feature will not be added to the source if feature with
   * the same id is already there. The reason for this behavior is to avoid
   * feature duplication when using bbox or tile loading strategies.
   * Note: this also applies if a {@link module:ol/Collection~Collection} is used for features,
   * meaning that if a feature with a duplicate id is added in the collection, it will
   * be removed from it right away.
   * @param {FeatureType} feature Feature to add.
   * @api
   */
  addFeature(feature) {
    this.addFeatureInternal(feature);
    this.changed();
  }
  /**
   * Add a feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @protected
   */
  addFeatureInternal(feature) {
    const featureKey = getUid(feature);
    if (!this.addToIndex_(featureKey, feature)) {
      if (this.featuresCollection_) {
        this.featuresCollection_.remove(feature);
      }
      return;
    }
    this.setupChangeEvents_(featureKey, feature);
    const geometry = feature.getGeometry();
    if (geometry) {
      const extent = geometry.getExtent();
      if (this.featuresRtree_) {
        this.featuresRtree_.insert(extent, feature);
      }
    } else {
      this.nullGeometryFeatures_[featureKey] = feature;
    }
    this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, feature));
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @private
   */
  setupChangeEvents_(featureKey, feature) {
    if (feature instanceof Feature_default2) {
      return;
    }
    this.featureChangeKeys_[featureKey] = [listen(feature, EventType_default.CHANGE, this.handleFeatureChange_, this), listen(feature, ObjectEventType_default.PROPERTYCHANGE, this.handleFeatureChange_, this)];
  }
  /**
   * @param {string} featureKey Unique identifier for the feature.
   * @param {FeatureType} feature The feature.
   * @return {boolean} The feature is "valid", in the sense that it is also a
   *     candidate for insertion into the Rtree.
   * @private
   */
  addToIndex_(featureKey, feature) {
    let valid = true;
    if (feature.getId() !== void 0) {
      const id = String(feature.getId());
      if (!(id in this.idIndex_)) {
        this.idIndex_[id] = feature;
      } else if (feature instanceof Feature_default2) {
        const indexedFeature = this.idIndex_[id];
        if (!(indexedFeature instanceof Feature_default2)) {
          valid = false;
        } else if (!Array.isArray(indexedFeature)) {
          this.idIndex_[id] = [indexedFeature, feature];
        } else {
          indexedFeature.push(feature);
        }
      } else {
        valid = false;
      }
    }
    if (valid) {
      assert(!(featureKey in this.uidIndex_), "The passed `feature` was already added to the source");
      this.uidIndex_[featureKey] = feature;
    }
    return valid;
  }
  /**
   * Add a batch of features to the source.
   * @param {Array<FeatureType>} features Features to add.
   * @api
   */
  addFeatures(features) {
    this.addFeaturesInternal(features);
    this.changed();
  }
  /**
   * Add features without firing a `change` event.
   * @param {Array<FeatureType>} features Features.
   * @protected
   */
  addFeaturesInternal(features) {
    const extents = [];
    const newFeatures = [];
    const geometryFeatures = [];
    for (let i = 0, length = features.length; i < length; i++) {
      const feature = features[i];
      const featureKey = getUid(feature);
      if (this.addToIndex_(featureKey, feature)) {
        newFeatures.push(feature);
      }
    }
    for (let i = 0, length = newFeatures.length; i < length; i++) {
      const feature = newFeatures[i];
      const featureKey = getUid(feature);
      this.setupChangeEvents_(featureKey, feature);
      const geometry = feature.getGeometry();
      if (geometry) {
        const extent = geometry.getExtent();
        extents.push(extent);
        geometryFeatures.push(feature);
      } else {
        this.nullGeometryFeatures_[featureKey] = feature;
      }
    }
    if (this.featuresRtree_) {
      this.featuresRtree_.load(extents, geometryFeatures);
    }
    if (this.hasListener(VectorEventType_default.ADDFEATURE)) {
      for (let i = 0, length = newFeatures.length; i < length; i++) {
        this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.ADDFEATURE, newFeatures[i]));
      }
    }
  }
  /**
   * @param {!Collection<FeatureType>} collection Collection.
   * @private
   */
  bindFeaturesCollection_(collection) {
    let modifyingCollection = false;
    this.addEventListener(
      VectorEventType_default.ADDFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          collection.push(evt.feature);
          modifyingCollection = false;
        }
      }
    );
    this.addEventListener(
      VectorEventType_default.REMOVEFEATURE,
      /**
       * @param {VectorSourceEvent<FeatureType>} evt The vector source event
       */
      function(evt) {
        if (!modifyingCollection) {
          modifyingCollection = true;
          collection.remove(evt.feature);
          modifyingCollection = false;
        }
      }
    );
    collection.addEventListener(
      CollectionEventType_default.ADD,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (evt) => {
        if (!modifyingCollection) {
          modifyingCollection = true;
          this.addFeature(evt.element);
          modifyingCollection = false;
        }
      }
    );
    collection.addEventListener(
      CollectionEventType_default.REMOVE,
      /**
       * @param {import("../Collection.js").CollectionEvent<FeatureType>} evt The collection event
       */
      (evt) => {
        if (!modifyingCollection) {
          modifyingCollection = true;
          this.removeFeature(evt.element);
          modifyingCollection = false;
        }
      }
    );
    this.featuresCollection_ = collection;
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/Vector.VectorSourceEvent#event:removefeature} events.
   * @api
   */
  clear(fast) {
    if (fast) {
      for (const featureId in this.featureChangeKeys_) {
        const keys = this.featureChangeKeys_[featureId];
        keys.forEach(unlistenByKey);
      }
      if (!this.featuresCollection_) {
        this.featureChangeKeys_ = {};
        this.idIndex_ = {};
        this.uidIndex_ = {};
      }
    } else {
      if (this.featuresRtree_) {
        this.featuresRtree_.forEach((feature) => {
          this.removeFeatureInternal(feature);
        });
        for (const id in this.nullGeometryFeatures_) {
          this.removeFeatureInternal(this.nullGeometryFeatures_[id]);
        }
      }
    }
    if (this.featuresCollection_) {
      this.featuresCollection_.clear();
    }
    if (this.featuresRtree_) {
      this.featuresRtree_.clear();
    }
    this.nullGeometryFeatures_ = {};
    const clearEvent = new VectorSourceEvent(VectorEventType_default.CLEAR);
    this.dispatchEvent(clearEvent);
    this.changed();
  }
  /**
   * Iterate through all features on the source, calling the provided callback
   * with each one.  If the callback returns any "truthy" value, iteration will
   * stop and the function will return the same value.
   * Note: this function only iterate through the feature that have a defined geometry.
   *
   * @param {function(FeatureType): T} callback Called with each feature
   *     on the source.  Return a truthy value to stop iteration.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeature(callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEach(callback);
    }
    if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  }
  /**
   * Iterate through all features whose geometries contain the provided
   * coordinate, calling the callback with each feature.  If the callback returns
   * a "truthy" value, iteration will stop and the function will return the same
   * value.
   *
   * For {@link module:ol/render/Feature~RenderFeature} features, the callback will be
   * called for all features.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose goemetry contains the provided coordinate.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   */
  forEachFeatureAtCoordinateDirect(coordinate, callback) {
    const extent = [coordinate[0], coordinate[1], coordinate[0], coordinate[1]];
    return this.forEachFeatureInExtent(extent, function(feature) {
      const geometry = feature.getGeometry();
      if (geometry instanceof Feature_default2 || geometry.intersectsCoordinate(coordinate)) {
        return callback(feature);
      }
      return void 0;
    });
  }
  /**
   * Iterate through all features whose bounding box intersects the provided
   * extent (note that the feature's geometry may not intersect the extent),
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you are interested in features whose geometry intersects an extent, call
   * the {@link module:ol/source/Vector~VectorSource#forEachFeatureIntersectingExtent #forEachFeatureIntersectingExtent()} method instead.
   *
   * When `useSpatialIndex` is set to false, this method will loop through all
   * features, equivalent to {@link module:ol/source/Vector~VectorSource#forEachFeature #forEachFeature()}.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose bounding box intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureInExtent(extent, callback) {
    if (this.featuresRtree_) {
      return this.featuresRtree_.forEachInExtent(extent, callback);
    }
    if (this.featuresCollection_) {
      this.featuresCollection_.forEach(callback);
    }
  }
  /**
   * Iterate through all features whose geometry intersects the provided extent,
   * calling the callback with each feature.  If the callback returns a "truthy"
   * value, iteration will stop and the function will return the same value.
   *
   * If you only want to test for bounding box intersection, call the
   * {@link module:ol/source/Vector~VectorSource#forEachFeatureInExtent #forEachFeatureInExtent()} method instead.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {function(FeatureType): T} callback Called with each feature
   *     whose geometry intersects the provided extent.
   * @return {T|undefined} The return value from the last call to the callback.
   * @template T
   * @api
   */
  forEachFeatureIntersectingExtent(extent, callback) {
    return this.forEachFeatureInExtent(
      extent,
      /**
       * @param {FeatureType} feature Feature.
       * @return {T|undefined} The return value from the last call to the callback.
       */
      function(feature) {
        const geometry = feature.getGeometry();
        if (geometry instanceof Feature_default2 || geometry.intersectsExtent(extent)) {
          const result = callback(feature);
          if (result) {
            return result;
          }
        }
      }
    );
  }
  /**
   * Get the features collection associated with this source. Will be `null`
   * unless the source was configured with `useSpatialIndex` set to `false`, or
   * with a {@link module:ol/Collection~Collection} as `features`.
   * @return {Collection<FeatureType>|null} The collection of features.
   * @api
   */
  getFeaturesCollection() {
    return this.featuresCollection_;
  }
  /**
   * Get a snapshot of the features currently on the source in random order. The returned array
   * is a copy, the features are references to the features in the source.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeatures() {
    let features;
    if (this.featuresCollection_) {
      features = this.featuresCollection_.getArray().slice(0);
    } else if (this.featuresRtree_) {
      features = this.featuresRtree_.getAll();
      if (!isEmpty(this.nullGeometryFeatures_)) {
        extend(features, Object.values(this.nullGeometryFeatures_));
      }
    }
    return features;
  }
  /**
   * Get all features whose geometry intersects the provided coordinate.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesAtCoordinate(coordinate) {
    const features = [];
    this.forEachFeatureAtCoordinateDirect(coordinate, function(feature) {
      features.push(feature);
    });
    return features;
  }
  /**
   * Get all features whose bounding box intersects the provided extent.  Note that this returns an array of
   * all features intersecting the given extent in random order (so it may include
   * features whose geometries do not intersect the extent).
   *
   * When `useSpatialIndex` is set to false, this method will return all
   * features.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../proj/Projection.js").default} [projection] Include features
   * where `extent` exceeds the x-axis bounds of `projection` and wraps around the world.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeaturesInExtent(extent, projection) {
    if (this.featuresRtree_) {
      const multiWorld = projection && projection.canWrapX() && this.getWrapX();
      if (!multiWorld) {
        return this.featuresRtree_.getInExtent(extent);
      }
      const extents = wrapAndSliceX(extent, projection);
      return [].concat(...extents.map((anExtent) => this.featuresRtree_.getInExtent(anExtent)));
    }
    if (this.featuresCollection_) {
      return this.featuresCollection_.getArray().slice(0);
    }
    return [];
  }
  /**
   * Get the closest feature to the provided coordinate.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false` and the features in this source are of type
   * {@link module:ol/Feature~Feature}.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(FeatureType):boolean} [filter] Feature filter function.
   *     The filter function will receive one argument, the {@link module:ol/Feature~Feature feature}
   *     and it should return a boolean value. By default, no filtering is made.
   * @return {FeatureType} Closest feature.
   * @api
   */
  getClosestFeatureToCoordinate(coordinate, filter) {
    const x = coordinate[0];
    const y = coordinate[1];
    let closestFeature = null;
    const closestPoint = [NaN, NaN];
    let minSquaredDistance = Infinity;
    const extent = [-Infinity, -Infinity, Infinity, Infinity];
    filter = filter ? filter : TRUE;
    this.featuresRtree_.forEachInExtent(
      extent,
      /**
       * @param {FeatureType} feature Feature.
       */
      function(feature) {
        if (filter(feature)) {
          const geometry = feature.getGeometry();
          const previousMinSquaredDistance = minSquaredDistance;
          minSquaredDistance = geometry instanceof Feature_default2 ? 0 : geometry.closestPointXY(x, y, closestPoint, minSquaredDistance);
          if (minSquaredDistance < previousMinSquaredDistance) {
            closestFeature = feature;
            const minDistance = Math.sqrt(minSquaredDistance);
            extent[0] = x - minDistance;
            extent[1] = y - minDistance;
            extent[2] = x + minDistance;
            extent[3] = y + minDistance;
          }
        }
      }
    );
    return closestFeature;
  }
  /**
   * Get the extent of the features currently in the source.
   *
   * This method is not available when the source is configured with
   * `useSpatialIndex` set to `false`.
   * @param {import("../extent.js").Extent} [extent] Destination extent. If provided, no new extent
   *     will be created. Instead, that extent's coordinates will be overwritten.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent(extent) {
    return this.featuresRtree_.getExtent(extent);
  }
  /**
   * Get a feature by its identifier (the value returned by feature.getId()). When `RenderFeature`s
   * are used, `getFeatureById()` can return an array of `RenderFeature`s. This allows for handling
   * of `GeometryCollection` geometries, where format readers create one `RenderFeature` per
   * `GeometryCollection` member.
   * Note that the index treats string and numeric identifiers as the same.  So
   * `source.getFeatureById(2)` will return a feature with id `'2'` or `2`.
   *
   * @param {string|number} id Feature identifier.
   * @return {FeatureClassOrArrayOfRenderFeatures<FeatureType>|null} The feature (or `null` if not found).
   * @api
   */
  getFeatureById(id) {
    const feature = this.idIndex_[id.toString()];
    return feature !== void 0 ? (
      /** @type {FeatureClassOrArrayOfRenderFeatures<FeatureType>} */
      feature
    ) : null;
  }
  /**
   * Get a feature by its internal unique identifier (using `getUid`).
   *
   * @param {string} uid Feature identifier.
   * @return {FeatureType|null} The feature (or `null` if not found).
   */
  getFeatureByUid(uid) {
    const feature = this.uidIndex_[uid];
    return feature !== void 0 ? feature : null;
  }
  /**
   * Get the format associated with this source.
   *
   * @return {import("../format/Feature.js").default<FeatureType>|null}} The feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * @return {boolean} The source can have overlapping geometries.
   */
  getOverlaps() {
    return this.overlaps_;
  }
  /**
   * Get the url associated with this source.
   *
   * @return {string|import("../featureloader.js").FeatureUrlFunction|undefined} The url.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * @param {Event} event Event.
   * @private
   */
  handleFeatureChange_(event) {
    const feature = (
      /** @type {FeatureType} */
      event.target
    );
    const featureKey = getUid(feature);
    const geometry = feature.getGeometry();
    if (!geometry) {
      if (!(featureKey in this.nullGeometryFeatures_)) {
        if (this.featuresRtree_) {
          this.featuresRtree_.remove(feature);
        }
        this.nullGeometryFeatures_[featureKey] = feature;
      }
    } else {
      const extent = geometry.getExtent();
      if (featureKey in this.nullGeometryFeatures_) {
        delete this.nullGeometryFeatures_[featureKey];
        if (this.featuresRtree_) {
          this.featuresRtree_.insert(extent, feature);
        }
      } else {
        if (this.featuresRtree_) {
          this.featuresRtree_.update(extent, feature);
        }
      }
    }
    const id = feature.getId();
    if (id !== void 0) {
      const sid = id.toString();
      if (this.idIndex_[sid] !== feature) {
        this.removeFromIdIndex_(feature);
        this.idIndex_[sid] = feature;
      }
    } else {
      this.removeFromIdIndex_(feature);
      this.uidIndex_[featureKey] = feature;
    }
    this.changed();
    this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.CHANGEFEATURE, feature));
  }
  /**
   * Returns true if the feature is contained within the source.
   * @param {FeatureType} feature Feature.
   * @return {boolean} Has feature.
   * @api
   */
  hasFeature(feature) {
    const id = feature.getId();
    if (id !== void 0) {
      return id in this.idIndex_;
    }
    return getUid(feature) in this.uidIndex_;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    if (this.featuresRtree_) {
      return this.featuresRtree_.isEmpty() && isEmpty(this.nullGeometryFeatures_);
    }
    if (this.featuresCollection_) {
      return this.featuresCollection_.getLength() === 0;
    }
    return true;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */
  loadFeatures(extent, resolution, projection) {
    const loadedExtentsRtree = this.loadedExtentsRtree_;
    const extentsToLoad = this.strategy_(extent, resolution, projection);
    for (let i = 0, ii = extentsToLoad.length; i < ii; ++i) {
      const extentToLoad = extentsToLoad[i];
      const alreadyLoaded = loadedExtentsRtree.forEachInExtent(
        extentToLoad,
        /**
         * @param {{extent: import("../extent.js").Extent}} object Object.
         * @return {boolean} Contains.
         */
        function(object) {
          return containsExtent(object.extent, extentToLoad);
        }
      );
      if (!alreadyLoaded) {
        ++this.loadingExtentsCount_;
        this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADSTART));
        this.loader_.call(
          this,
          extentToLoad,
          resolution,
          projection,
          /**
           * @param {Array<FeatureType>} features Loaded features
           */
          (features) => {
            --this.loadingExtentsCount_;
            this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADEND, void 0, features));
          },
          () => {
            --this.loadingExtentsCount_;
            this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.FEATURESLOADERROR));
          }
        );
        loadedExtentsRtree.insert(extentToLoad, {
          extent: extentToLoad.slice()
        });
      }
    }
    this.loading = this.loader_.length < 4 ? false : this.loadingExtentsCount_ > 0;
  }
  /**
   * @override
   */
  refresh() {
    this.clear(true);
    this.loadedExtentsRtree_.clear();
    super.refresh();
  }
  /**
   * Remove an extent from the list of loaded extents.
   * @param {import("../extent.js").Extent} extent Extent.
   * @api
   */
  removeLoadedExtent(extent) {
    const loadedExtentsRtree = this.loadedExtentsRtree_;
    const obj = loadedExtentsRtree.forEachInExtent(extent, function(object) {
      if (equals(object.extent, extent)) {
        return object;
      }
    });
    if (obj) {
      loadedExtentsRtree.remove(obj);
    }
  }
  /**
   * Batch remove features from the source.  If you want to remove all features
   * at once, use the {@link module:ol/source/Vector~VectorSource#clear #clear()} method
   * instead.
   * @param {Array<FeatureType>} features Features to remove.
   * @api
   */
  removeFeatures(features) {
    let removed = false;
    for (let i = 0, ii = features.length; i < ii; ++i) {
      removed = this.removeFeatureInternal(features[i]) || removed;
    }
    if (removed) {
      this.changed();
    }
  }
  /**
   * Remove a single feature from the source. If you want to batch remove
   * features, use the {@link module:ol/source/Vector~VectorSource#removeFeatures #removeFeatures()} method
   * instead.
   * @param {FeatureType} feature Feature to remove.
   * @api
   */
  removeFeature(feature) {
    if (!feature) {
      return;
    }
    const removed = this.removeFeatureInternal(feature);
    if (removed) {
      this.changed();
    }
  }
  /**
   * Remove feature without firing a `change` event.
   * @param {FeatureType} feature Feature.
   * @return {boolean} True if the feature was removed, false if it was not found.
   * @protected
   */
  removeFeatureInternal(feature) {
    const featureKey = getUid(feature);
    if (!(featureKey in this.uidIndex_)) {
      return false;
    }
    if (featureKey in this.nullGeometryFeatures_) {
      delete this.nullGeometryFeatures_[featureKey];
    } else {
      if (this.featuresRtree_) {
        this.featuresRtree_.remove(feature);
      }
    }
    const featureChangeKeys = this.featureChangeKeys_[featureKey];
    featureChangeKeys?.forEach(unlistenByKey);
    delete this.featureChangeKeys_[featureKey];
    const id = feature.getId();
    if (id !== void 0) {
      const idString = id.toString();
      const indexedFeature = this.idIndex_[idString];
      if (indexedFeature === feature) {
        delete this.idIndex_[idString];
      } else if (Array.isArray(indexedFeature)) {
        indexedFeature.splice(indexedFeature.indexOf(feature), 1);
        if (indexedFeature.length === 1) {
          this.idIndex_[idString] = indexedFeature[0];
        }
      }
    }
    delete this.uidIndex_[featureKey];
    if (this.hasListener(VectorEventType_default.REMOVEFEATURE)) {
      this.dispatchEvent(new VectorSourceEvent(VectorEventType_default.REMOVEFEATURE, feature));
    }
    return true;
  }
  /**
   * Remove a feature from the id index.  Called internally when the feature id
   * may have changed.
   * @param {FeatureType} feature The feature.
   * @private
   */
  removeFromIdIndex_(feature) {
    for (const id in this.idIndex_) {
      if (this.idIndex_[id] === feature) {
        delete this.idIndex_[id];
        break;
      }
    }
  }
  /**
   * Set the new loader of the source. The next render cycle will use the
   * new loader.
   * @param {import("../featureloader.js").FeatureLoader} loader The loader to set.
   * @api
   */
  setLoader(loader) {
    this.loader_ = loader;
  }
  /**
   * Points the source to a new url. The next render cycle will use the new url.
   * @param {string|import("../featureloader.js").FeatureUrlFunction} url Url.
   * @api
   */
  setUrl(url) {
    assert(this.format_, "`format` must be set when `url` is set");
    this.url_ = url;
    this.setLoader(xhr(url, this.format_));
  }
  /**
   * @param {boolean} overlaps The source can have overlapping geometries.
   */
  setOverlaps(overlaps) {
    this.overlaps_ = overlaps;
    this.changed();
  }
};
var Vector_default = VectorSource;

export {
  LineString_default,
  loadFeaturesXhr,
  Circle_default,
  GeometryCollection_default,
  MultiLineString_default,
  MultiPoint_default,
  MultiPolygon_default,
  RBush_default,
  Source_default,
  VectorEventType_default,
  VectorSourceEvent,
  Vector_default
};
//# sourceMappingURL=chunk-5NTHMBZ7.js.map
