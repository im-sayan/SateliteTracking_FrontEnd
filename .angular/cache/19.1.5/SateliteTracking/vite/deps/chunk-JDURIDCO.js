import {
  containsXY,
  createEmpty,
  createOrUpdateEmpty,
  createOrUpdateFromCoordinate,
  createOrUpdateFromFlatCoordinates,
  get,
  getCenter,
  getHeight,
  getTransform,
  returnOrUpdate
} from "./chunk-KD5NYAAV.js";
import {
  squaredDistance
} from "./chunk-UVCLGJLE.js";
import {
  Object_default
} from "./chunk-BPFTGO52.js";
import {
  abstract
} from "./chunk-4VZCFOSN.js";
import {
  assert
} from "./chunk-IJQ6LSTY.js";
import {
  memoizeOne
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/transform.js
var tmp_ = new Array(6);
function create() {
  return [1, 0, 0, 1, 0, 0];
}
function multiply(transform1, transform2) {
  const a1 = transform1[0];
  const b1 = transform1[1];
  const c1 = transform1[2];
  const d1 = transform1[3];
  const e1 = transform1[4];
  const f1 = transform1[5];
  const a2 = transform2[0];
  const b2 = transform2[1];
  const c2 = transform2[2];
  const d2 = transform2[3];
  const e2 = transform2[4];
  const f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
function apply(transform, coordinate) {
  const x = coordinate[0];
  const y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}
function makeInverse(target, source) {
  const det = determinant(source);
  assert(det !== 0, "Transformation matrix cannot be inverted");
  const a = source[0];
  const b = source[1];
  const c = source[2];
  const d = source[3];
  const e = source[4];
  const f = source[5];
  target[0] = d / det;
  target[1] = -b / det;
  target[2] = -c / det;
  target[3] = a / det;
  target[4] = (c * f - d * e) / det;
  target[5] = -(a * f - b * e) / det;
  return target;
}
function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}
var matrixPrecision = [1e6, 1e6, 1e6, 1e6, 2, 2];
function toString(mat) {
  const transformString = "matrix(" + mat.map((value, i) => Math.round(value * matrixPrecision[i]) / matrixPrecision[i]).join(", ") + ")";
  return transformString;
}

// node_modules/ol/geom/flat/transform.js
function transform2D(flatCoordinates, offset, end, stride, transform, dest, destinationStride) {
  dest = dest ? dest : [];
  destinationStride = destinationStride ? destinationStride : 2;
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const x = flatCoordinates[j];
    const y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
    for (let k = 2; k < destinationStride; k++) {
      dest[i++] = flatCoordinates[j + k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function rotate(flatCoordinates, offset, end, stride, angle, anchor, dest) {
  dest = dest ? dest : [];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const anchorX = anchor[0];
  const anchorY = anchor[1];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const deltaX = flatCoordinates[j] - anchorX;
    const deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, dest) {
  dest = dest ? dest : [];
  const anchorX = anchor[0];
  const anchorY = anchor[1];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    const deltaX = flatCoordinates[j] - anchorX;
    const deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}
function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, dest) {
  dest = dest ? dest : [];
  let i = 0;
  for (let j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;
    for (let k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
}

// node_modules/ol/geom/Geometry.js
var tmpTransform = create();
var tmpPoint = [NaN, NaN];
var Geometry = class extends Object_default {
  constructor() {
    super();
    this.extent_ = createEmpty();
    this.extentRevision_ = -1;
    this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    this.simplifiedGeometryRevision = 0;
    this.simplifyTransformedInternal = memoizeOne((revision, squaredTolerance, transform) => {
      if (!transform) {
        return this.getSimplifiedGeometry(squaredTolerance);
      }
      const clone = this.clone();
      clone.applyTransform(transform);
      return clone.getSimplifiedGeometry(squaredTolerance);
    });
  }
  /**
   * Get a transformed and simplified version of the geometry.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../proj.js").TransformFunction} [transform] Optional transform function.
   * @return {Geometry} Simplified geometry.
   */
  simplifyTransformed(squaredTolerance, transform) {
    return this.simplifyTransformedInternal(this.getRevision(), squaredTolerance, transform);
  }
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */
  clone() {
    return abstract();
  }
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    return abstract();
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    return this.closestPointXY(x, y, tmpPoint, Number.MIN_VALUE) === 0;
  }
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate} [closestPoint] Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */
  getClosestPoint(point, closestPoint) {
    closestPoint = closestPoint ? closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  }
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */
  intersectsCoordinate(coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    return abstract();
  }
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent} [extent] Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */
  getExtent(extent) {
    if (this.extentRevision_ != this.getRevision()) {
      const extent2 = this.computeExtent(this.extent_);
      if (isNaN(extent2[0]) || isNaN(extent2[1])) {
        createOrUpdateEmpty(extent2);
      }
      this.extentRevision_ = this.getRevision();
    }
    return returnOrUpdate(this.extent_, extent);
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(angle, anchor) {
    abstract();
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
   */
  scale(sx, sy, anchor) {
    abstract();
  }
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the [Douglas Peucker](https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm)
   * algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */
  simplify(tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */
  getSimplifiedGeometry(squaredTolerance) {
    return abstract();
  }
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {Type} Geometry type.
   */
  getType() {
    return abstract();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   */
  applyTransform(transformFn) {
    abstract();
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */
  intersectsExtent(extent) {
    return abstract();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(deltaX, deltaY) {
    abstract();
  }
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {this} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */
  transform(source, destination) {
    const sourceProj = get(source);
    const transformFn = sourceProj.getUnits() == "tile-pixels" ? function(inCoordinates, outCoordinates, stride) {
      const pixelExtent = sourceProj.getExtent();
      const projectedExtent = sourceProj.getWorldExtent();
      const scale2 = getHeight(projectedExtent) / getHeight(pixelExtent);
      compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale2, -scale2, 0, 0, 0);
      const transformed = transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
      const projTransform = getTransform(sourceProj, destination);
      if (projTransform) {
        return projTransform(transformed, transformed, stride);
      }
      return transformed;
    } : getTransform(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  }
};
var Geometry_default = Geometry;

// node_modules/ol/geom/SimpleGeometry.js
var SimpleGeometry = class extends Geometry_default {
  constructor() {
    super();
    this.layout = "XY";
    this.stride = 2;
    this.flatCoordinates;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(extent) {
    return createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  }
  /**
   * @abstract
   * @return {Array<*> | null} Coordinates.
   */
  getCoordinates() {
    return abstract();
  }
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */
  getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @return {Array<number>} Flat coordinates.
   */
  getFlatCoordinates() {
    return this.flatCoordinates;
  }
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */
  getLastCoordinate() {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  }
  /**
   * Return the {@link import("./Geometry.js").GeometryLayout layout} of the geometry.
   * @return {import("./Geometry.js").GeometryLayout} Layout.
   * @api
   */
  getLayout() {
    return this.layout;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @override
   */
  getSimplifiedGeometry(squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }
    const simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    const simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      return simplifiedGeometry;
    }
    this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
    return this;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    return this;
  }
  /**
   * @return {number} Stride.
   */
  getStride() {
    return this.stride;
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */
  setFlatCoordinates(layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  }
  /**
   * @abstract
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  setCoordinates(coordinates, layout) {
    abstract();
  }
  /**
   * @param {import("./Geometry.js").GeometryLayout|undefined} layout Layout.
   * @param {Array<*>} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */
  setLayout(layout, coordinates, nesting) {
    let stride;
    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (let i = 0; i < nesting; ++i) {
        if (coordinates.length === 0) {
          this.layout = "XY";
          this.stride = 2;
          return;
        }
        coordinates = /** @type {Array<unknown>} */
        coordinates[0];
      }
      stride = coordinates.length;
      layout = getLayoutForStride(stride);
    }
    this.layout = layout;
    this.stride = stride;
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
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.layout.startsWith("XYZ") ? 3 : 2, this.stride);
      this.changed();
    }
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
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
      this.changed();
    }
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   * @override
   */
  scale(sx, sy, anchor) {
    if (sy === void 0) {
      sy = sx;
    }
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
      this.changed();
    }
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
    const flatCoordinates = this.getFlatCoordinates();
    if (flatCoordinates) {
      const stride = this.getStride();
      translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
      this.changed();
    }
  }
};
function getLayoutForStride(stride) {
  let layout;
  if (stride == 2) {
    layout = "XY";
  } else if (stride == 3) {
    layout = "XYZ";
  } else if (stride == 4) {
    layout = "XYZM";
  }
  return (
    /** @type {import("./Geometry.js").GeometryLayout} */
    layout
  );
}
function getStrideForLayout(layout) {
  let stride;
  if (layout == "XY") {
    stride = 2;
  } else if (layout == "XYZ" || layout == "XYM") {
    stride = 3;
  } else if (layout == "XYZM") {
    stride = 4;
  }
  return (
    /** @type {number} */
    stride
  );
}
function transformGeom2D(simpleGeometry, transform, dest) {
  const flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  }
  const stride = simpleGeometry.getStride();
  return transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, dest);
}
var SimpleGeometry_default = SimpleGeometry;

// node_modules/ol/geom/flat/deflate.js
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (let i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }
  return offset;
}
function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
  for (let i = 0, ii = coordinates.length; i < ii; ++i) {
    const coordinate = coordinates[i];
    for (let j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }
  return offset;
}
function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, ends) {
  ends = ends ? ends : [];
  let i = 0;
  for (let j = 0, jj = coordinatess.length; j < jj; ++j) {
    const end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
}
function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, endss) {
  endss = endss ? endss : [];
  let i = 0;
  for (let j = 0, jj = coordinatesss.length; j < jj; ++j) {
    const ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    if (ends.length === 0) {
      ends[0] = offset;
    }
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }
  endss.length = i;
  return endss;
}

// node_modules/ol/geom/Point.js
var Point = class _Point extends SimpleGeometry_default {
  /**
   * @param {import("../coordinate.js").Coordinate} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates, layout) {
    super();
    this.setCoordinates(coordinates, layout);
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @api
   * @override
   */
  clone() {
    const point = new _Point(this.flatCoordinates.slice(), this.layout);
    point.applyProperties(this);
    return point;
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
    const squaredDistance2 = squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
    if (squaredDistance2 < minSquaredDistance) {
      const stride = this.stride;
      for (let i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }
      closestPoint.length = stride;
      return squaredDistance2;
    }
    return minSquaredDistance;
  }
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @api
   * @override
   */
  getCoordinates() {
    return this.flatCoordinates.slice();
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   * @override
   */
  computeExtent(extent) {
    return createOrUpdateFromCoordinate(this.flatCoordinates, extent);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   * @override
   */
  getType() {
    return "Point";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   * @override
   */
  intersectsExtent(extent) {
    return containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  }
  /**
   * @param {!Array<*>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   * @override
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinate(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  }
};
var Point_default = Point;

export {
  create,
  multiply,
  setFromArray,
  apply,
  compose,
  makeInverse,
  toString,
  transform2D,
  rotate,
  Geometry_default,
  getStrideForLayout,
  transformGeom2D,
  SimpleGeometry_default,
  deflateCoordinate,
  deflateCoordinates,
  deflateCoordinatesArray,
  deflateMultiCoordinatesArray,
  Point_default
};
//# sourceMappingURL=chunk-JDURIDCO.js.map
