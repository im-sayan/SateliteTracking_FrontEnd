import {
  ImageTile_default,
  TileRange_default,
  Tile_default
} from "./chunk-AJCWPRKA.js";
import {
  TileState_default
} from "./chunk-PWOXHWUC.js";
import {
  Layer_default
} from "./chunk-WEXFOBJA.js";
import {
  Layer_default as Layer_default2
} from "./chunk-GKPGQ42P.js";
import {
  toSize
} from "./chunk-5CXUNJWW.js";
import {
  createCanvasContext2D,
  releaseCanvas
} from "./chunk-TALNCFXE.js";
import {
  apply,
  compose
} from "./chunk-JDURIDCO.js";
import {
  boundingExtent,
  containsCoordinate,
  createEmpty,
  createTransformFromCoordinateTransform,
  equals,
  extend,
  extendCoordinate,
  forEachCorner,
  fromUserExtent,
  getArea,
  getBottomLeft,
  getBottomRight,
  getCenter,
  getHeight,
  getIntersection,
  getPointResolution,
  getRotatedViewport,
  getTopLeft,
  getTopRight,
  getTransform,
  getWidth,
  intersects,
  transform,
  wrapAndSliceX
} from "./chunk-KD5NYAAV.js";
import {
  clamp,
  modulo,
  solveLinearSystem
} from "./chunk-UVCLGJLE.js";
import {
  Disposable_default,
  getUid,
  listen,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import {
  assert
} from "./chunk-IJQ6LSTY.js";
import {
  EventType_default,
  ascending
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/DataTile.js
function asImageLike(data) {
  return data instanceof Image || data instanceof HTMLCanvasElement || data instanceof HTMLVideoElement || data instanceof ImageBitmap ? data : null;
}
function asArrayLike(data) {
  return data instanceof Uint8Array || data instanceof Uint8ClampedArray || data instanceof Float32Array || data instanceof DataView ? data : null;
}
var disposedError = new Error("disposed");
var sharedContext = null;
function toArray(image) {
  if (!sharedContext) {
    sharedContext = createCanvasContext2D(image.width, image.height, void 0, {
      willReadFrequently: true
    });
  }
  const canvas = sharedContext.canvas;
  const width = image.width;
  if (canvas.width !== width) {
    canvas.width = width;
  }
  const height = image.height;
  if (canvas.height !== height) {
    canvas.height = height;
  }
  sharedContext.clearRect(0, 0, width, height);
  sharedContext.drawImage(image, 0, 0);
  return sharedContext.getImageData(0, 0, width, height).data;
}
var defaultSize = [256, 256];
var DataTile = class extends Tile_default {
  /**
   * @param {Options} options Tile options.
   */
  constructor(options) {
    const state = TileState_default.IDLE;
    super(options.tileCoord, state, {
      transition: options.transition,
      interpolate: options.interpolate
    });
    this.loader_ = options.loader;
    this.data_ = null;
    this.error_ = null;
    this.size_ = options.size || null;
    this.controller_ = options.controller || null;
  }
  /**
   * Get the tile size.
   * @return {import('./size.js').Size} Tile size.
   */
  getSize() {
    if (this.size_) {
      return this.size_;
    }
    const imageData = asImageLike(this.data_);
    if (imageData) {
      return [imageData.width, imageData.height];
    }
    return defaultSize;
  }
  /**
   * Get the data for the tile.
   * @return {Data} Tile data.
   * @api
   */
  getData() {
    return this.data_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @api
   */
  getError() {
    return this.error_;
  }
  /**
   * Load the tile data.
   * @api
   * @override
   */
  load() {
    if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) {
      return;
    }
    this.state = TileState_default.LOADING;
    this.changed();
    const self = this;
    this.loader_().then(function(data) {
      self.data_ = data;
      self.state = TileState_default.LOADED;
      self.changed();
    }).catch(function(error) {
      self.error_ = error;
      self.state = TileState_default.ERROR;
      self.changed();
    });
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    if (this.controller_) {
      this.controller_.abort(disposedError);
      this.controller_ = null;
    }
    super.disposeInternal();
  }
};
var DataTile_default = DataTile;

// node_modules/ol/reproj.js
var brokenDiagonalRendering_;
var canvasPool = [];
function drawTestTriangle(ctx, u1, v1, u2, v2) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(u1, v1);
  ctx.lineTo(u2, v2);
  ctx.closePath();
  ctx.save();
  ctx.clip();
  ctx.fillRect(0, 0, Math.max(u1, u2) + 1, Math.max(v1, v2));
  ctx.restore();
}
function verifyBrokenDiagonalRendering(data, offset) {
  return Math.abs(data[offset * 4] - 210) > 2 || Math.abs(data[offset * 4 + 3] - 0.75 * 255) > 2;
}
function isBrokenDiagonalRendering() {
  if (brokenDiagonalRendering_ === void 0) {
    const ctx = createCanvasContext2D(6, 6, canvasPool);
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = "rgba(210, 0, 0, 0.75)";
    drawTestTriangle(ctx, 4, 5, 4, 0);
    drawTestTriangle(ctx, 4, 5, 0, 5);
    const data = ctx.getImageData(0, 0, 3, 3).data;
    brokenDiagonalRendering_ = verifyBrokenDiagonalRendering(data, 0) || verifyBrokenDiagonalRendering(data, 4) || verifyBrokenDiagonalRendering(data, 8);
    releaseCanvas(ctx);
    canvasPool.push(ctx.canvas);
  }
  return brokenDiagonalRendering_;
}
function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  const sourceCenter = transform(targetCenter, targetProj, sourceProj);
  let sourceResolution = getPointResolution(targetProj, targetResolution, targetCenter);
  const targetMetersPerUnit = targetProj.getMetersPerUnit();
  if (targetMetersPerUnit !== void 0) {
    sourceResolution *= targetMetersPerUnit;
  }
  const sourceMetersPerUnit = sourceProj.getMetersPerUnit();
  if (sourceMetersPerUnit !== void 0) {
    sourceResolution /= sourceMetersPerUnit;
  }
  const sourceExtent = sourceProj.getExtent();
  if (!sourceExtent || containsCoordinate(sourceExtent, sourceCenter)) {
    const compensationFactor = getPointResolution(sourceProj, sourceResolution, sourceCenter) / sourceResolution;
    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }
  return sourceResolution;
}
function calculateSourceExtentResolution(sourceProj, targetProj, targetExtent, targetResolution) {
  const targetCenter = getCenter(targetExtent);
  let sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
  if (!isFinite(sourceResolution) || sourceResolution <= 0) {
    forEachCorner(targetExtent, function(corner) {
      sourceResolution = calculateSourceResolution(sourceProj, targetProj, corner, targetResolution);
      return isFinite(sourceResolution) && sourceResolution > 0;
    });
  }
  return sourceResolution;
}
function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, renderEdges, interpolate, drawSingle, clipExtent) {
  const context = createCanvasContext2D(Math.round(pixelRatio * width), Math.round(pixelRatio * height), canvasPool);
  if (!interpolate) {
    context.imageSmoothingEnabled = false;
  }
  if (sources.length === 0) {
    return context.canvas;
  }
  context.scale(pixelRatio, pixelRatio);
  function pixelRound(value) {
    return Math.round(value * pixelRatio) / pixelRatio;
  }
  context.globalCompositeOperation = "lighter";
  const sourceDataExtent = createEmpty();
  sources.forEach(function(src, i, arr) {
    extend(sourceDataExtent, src.extent);
  });
  let stitchContext;
  const stitchScale = pixelRatio / sourceResolution;
  const inverseScale = (interpolate ? 1 : 1 + Math.pow(2, -24)) / stitchScale;
  if (!drawSingle || sources.length !== 1 || gutter !== 0) {
    stitchContext = createCanvasContext2D(Math.round(getWidth(sourceDataExtent) * stitchScale), Math.round(getHeight(sourceDataExtent) * stitchScale), canvasPool);
    if (!interpolate) {
      stitchContext.imageSmoothingEnabled = false;
    }
    if (sourceExtent && clipExtent) {
      const xPos = (sourceExtent[0] - sourceDataExtent[0]) * stitchScale;
      const yPos = -(sourceExtent[3] - sourceDataExtent[3]) * stitchScale;
      const width2 = getWidth(sourceExtent) * stitchScale;
      const height2 = getHeight(sourceExtent) * stitchScale;
      stitchContext.rect(xPos, yPos, width2, height2);
      stitchContext.clip();
    }
    sources.forEach(function(src, i, arr) {
      if (src.image.width > 0 && src.image.height > 0) {
        if (src.clipExtent) {
          stitchContext.save();
          const xPos2 = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale;
          const yPos2 = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale;
          const width2 = getWidth(src.clipExtent) * stitchScale;
          const height2 = getHeight(src.clipExtent) * stitchScale;
          stitchContext.rect(interpolate ? xPos2 : Math.round(xPos2), interpolate ? yPos2 : Math.round(yPos2), interpolate ? width2 : Math.round(xPos2 + width2) - Math.round(xPos2), interpolate ? height2 : Math.round(yPos2 + height2) - Math.round(yPos2));
          stitchContext.clip();
        }
        const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale;
        const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale;
        const srcWidth = getWidth(src.extent) * stitchScale;
        const srcHeight = getHeight(src.extent) * stitchScale;
        stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos), interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos));
        if (src.clipExtent) {
          stitchContext.restore();
        }
      }
    });
  }
  const targetTopLeft = getTopLeft(targetExtent);
  triangulation.getTriangles().forEach(function(triangle, i, arr) {
    const source = triangle.source;
    const target = triangle.target;
    let x0 = source[0][0], y0 = source[0][1];
    let x1 = source[1][0], y1 = source[1][1];
    let x2 = source[2][0], y2 = source[2][1];
    const u0 = pixelRound((target[0][0] - targetTopLeft[0]) / targetResolution);
    const v0 = pixelRound(-(target[0][1] - targetTopLeft[1]) / targetResolution);
    const u1 = pixelRound((target[1][0] - targetTopLeft[0]) / targetResolution);
    const v1 = pixelRound(-(target[1][1] - targetTopLeft[1]) / targetResolution);
    const u2 = pixelRound((target[2][0] - targetTopLeft[0]) / targetResolution);
    const v2 = pixelRound(-(target[2][1] - targetTopLeft[1]) / targetResolution);
    const sourceNumericalShiftX = x0;
    const sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    const augmentedMatrix = [[x1, y1, 0, 0, u1 - u0], [x2, y2, 0, 0, u2 - u0], [0, 0, x1, y1, v1 - v0], [0, 0, x2, y2, v2 - v0]];
    const affineCoefs = solveLinearSystem(augmentedMatrix);
    if (!affineCoefs) {
      return;
    }
    context.save();
    context.beginPath();
    if (isBrokenDiagonalRendering() || !interpolate) {
      context.moveTo(u1, v1);
      const steps = 4;
      const ud = u0 - u1;
      const vd = v0 - v1;
      for (let step = 0; step < steps; step++) {
        context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound(step * vd / (steps - 1)));
        if (step != steps - 1) {
          context.lineTo(u1 + pixelRound((step + 1) * ud / steps), v1 + pixelRound((step + 1) * vd / (steps - 1)));
        }
      }
      context.lineTo(u2, v2);
    } else {
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
    }
    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    let image;
    if (stitchContext) {
      image = stitchContext.canvas;
      context.scale(inverseScale, -inverseScale);
    } else {
      const source2 = sources[0];
      const extent = source2.extent;
      image = source2.image;
      context.scale(getWidth(extent) / image.width, -getHeight(extent) / image.height);
    }
    context.drawImage(image, 0, 0);
    context.restore();
  });
  if (stitchContext) {
    releaseCanvas(stitchContext);
    canvasPool.push(stitchContext.canvas);
  }
  if (renderEdges) {
    context.save();
    context.globalCompositeOperation = "source-over";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function(triangle, i, arr) {
      const target = triangle.target;
      const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }
  return context.canvas;
}

// node_modules/ol/reproj/Triangulation.js
var MAX_SUBDIVISION = 10;
var MAX_TRIANGLE_WIDTH = 0.25;
var Triangulation = class {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent to triangulate.
   * @param {import("../extent.js").Extent} maxSourceExtent Maximal source extent that can be used.
   * @param {number} errorThreshold Acceptable error (in source units).
   * @param {?number} destinationResolution The (optional) resolution of the destination.
   * @param {import("../transform.js").Transform} [sourceMatrix] Source transform matrix.
   */
  constructor(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold, destinationResolution, sourceMatrix) {
    this.sourceProj_ = sourceProj;
    this.targetProj_ = targetProj;
    let transformInvCache = {};
    const transformInv = sourceMatrix ? createTransformFromCoordinateTransform((input) => apply(sourceMatrix, transform(input, this.targetProj_, this.sourceProj_))) : getTransform(this.targetProj_, this.sourceProj_);
    this.transformInv_ = function(c) {
      const key = c[0] + "/" + c[1];
      if (!transformInvCache[key]) {
        transformInvCache[key] = transformInv(c);
      }
      return transformInvCache[key];
    };
    this.maxSourceExtent_ = maxSourceExtent;
    this.errorThresholdSquared_ = errorThreshold * errorThreshold;
    this.triangles_ = [];
    this.wrapsXInSource_ = false;
    this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && getWidth(maxSourceExtent) >= getWidth(this.sourceProj_.getExtent());
    this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? getWidth(this.sourceProj_.getExtent()) : null;
    this.targetWorldWidth_ = this.targetProj_.getExtent() ? getWidth(this.targetProj_.getExtent()) : null;
    const destinationTopLeft = getTopLeft(targetExtent);
    const destinationTopRight = getTopRight(targetExtent);
    const destinationBottomRight = getBottomRight(targetExtent);
    const destinationBottomLeft = getBottomLeft(targetExtent);
    const sourceTopLeft = this.transformInv_(destinationTopLeft);
    const sourceTopRight = this.transformInv_(destinationTopRight);
    const sourceBottomRight = this.transformInv_(destinationBottomRight);
    const sourceBottomLeft = this.transformInv_(destinationBottomLeft);
    const maxSubdivision = MAX_SUBDIVISION + (destinationResolution ? Math.max(0, Math.ceil(Math.log2(getArea(targetExtent) / (destinationResolution * destinationResolution * 256 * 256)))) : 0);
    this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, maxSubdivision);
    if (this.wrapsXInSource_) {
      let leftBound = Infinity;
      this.triangles_.forEach(function(triangle, i, arr) {
        leftBound = Math.min(leftBound, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
      });
      this.triangles_.forEach((triangle) => {
        if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound > this.sourceWorldWidth_ / 2) {
          const newTriangle = [[triangle.source[0][0], triangle.source[0][1]], [triangle.source[1][0], triangle.source[1][1]], [triangle.source[2][0], triangle.source[2][1]]];
          if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[0][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[1][0] -= this.sourceWorldWidth_;
          }
          if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) {
            newTriangle[2][0] -= this.sourceWorldWidth_;
          }
          const minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          const maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
          if (maxX - minX < this.sourceWorldWidth_ / 2) {
            triangle.source = newTriangle;
          }
        }
      });
    }
    transformInvCache = {};
  }
  /**
   * Adds triangle to the triangulation.
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @private
   */
  addTriangle_(a, b, c, aSrc, bSrc, cSrc) {
    this.triangles_.push({
      source: [aSrc, bSrc, cSrc],
      target: [a, b, c]
    });
  }
  /**
   * Adds quad (points in clock-wise order) to the triangulation
   * (and reprojects the vertices) if valid.
   * Performs quad subdivision if needed to increase precision.
   *
   * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
   * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
   * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
   * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
   * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
   * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
   * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
   * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
   * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
   * @private
   */
  addQuad_(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
    const sourceQuadExtent = boundingExtent([aSrc, bSrc, cSrc, dSrc]);
    const sourceCoverageX = this.sourceWorldWidth_ ? getWidth(sourceQuadExtent) / this.sourceWorldWidth_ : null;
    const sourceWorldWidth = (
      /** @type {number} */
      this.sourceWorldWidth_
    );
    const wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
    let needsSubdivision = false;
    if (maxSubdivision > 0) {
      if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
        const targetQuadExtent = boundingExtent([a, b, c, d]);
        const targetCoverageX = getWidth(targetQuadExtent) / this.targetWorldWidth_;
        needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
      if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
        needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
      }
    }
    if (!needsSubdivision && this.maxSourceExtent_) {
      if (isFinite(sourceQuadExtent[0]) && isFinite(sourceQuadExtent[1]) && isFinite(sourceQuadExtent[2]) && isFinite(sourceQuadExtent[3])) {
        if (!intersects(sourceQuadExtent, this.maxSourceExtent_)) {
          return;
        }
      }
    }
    let isNotFinite = 0;
    if (!needsSubdivision) {
      if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
        if (maxSubdivision > 0) {
          needsSubdivision = true;
        } else {
          isNotFinite = (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) ? 8 : 0) + (!isFinite(bSrc[0]) || !isFinite(bSrc[1]) ? 4 : 0) + (!isFinite(cSrc[0]) || !isFinite(cSrc[1]) ? 2 : 0) + (!isFinite(dSrc[0]) || !isFinite(dSrc[1]) ? 1 : 0);
          if (isNotFinite != 1 && isNotFinite != 2 && isNotFinite != 4 && isNotFinite != 8) {
            return;
          }
        }
      }
    }
    if (maxSubdivision > 0) {
      if (!needsSubdivision) {
        const center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
        const centerSrc = this.transformInv_(center);
        let dx;
        if (wrapsX) {
          const centerSrcEstimX = (modulo(aSrc[0], sourceWorldWidth) + modulo(cSrc[0], sourceWorldWidth)) / 2;
          dx = centerSrcEstimX - modulo(centerSrc[0], sourceWorldWidth);
        } else {
          dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
        }
        const dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
        const centerSrcErrorSquared = dx * dx + dy * dy;
        needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
      }
      if (needsSubdivision) {
        if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
          const bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
          const bcSrc = this.transformInv_(bc);
          const da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
          const daSrc = this.transformInv_(da);
          this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
          this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
        } else {
          const ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
          const abSrc = this.transformInv_(ab);
          const cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
          const cdSrc = this.transformInv_(cd);
          this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
          this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
        }
        return;
      }
    }
    if (wrapsX) {
      if (!this.canWrapXInSource_) {
        return;
      }
      this.wrapsXInSource_ = true;
    }
    if ((isNotFinite & 11) == 0) {
      this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
    }
    if ((isNotFinite & 14) == 0) {
      this.addTriangle_(a, c, b, aSrc, cSrc, bSrc);
    }
    if (isNotFinite) {
      if ((isNotFinite & 13) == 0) {
        this.addTriangle_(b, d, a, bSrc, dSrc, aSrc);
      }
      if ((isNotFinite & 7) == 0) {
        this.addTriangle_(b, d, c, bSrc, dSrc, cSrc);
      }
    }
  }
  /**
   * Calculates extent of the `source` coordinates from all the triangles.
   *
   * @return {import("../extent.js").Extent} Calculated extent.
   */
  calculateSourceExtent() {
    const extent = createEmpty();
    this.triangles_.forEach(function(triangle, i, arr) {
      const src = triangle.source;
      extendCoordinate(extent, src[0]);
      extendCoordinate(extent, src[1]);
      extendCoordinate(extent, src[2]);
    });
    return extent;
  }
  /**
   * @return {Array<Triangle>} Array of the calculated triangles.
   */
  getTriangles() {
    return this.triangles_;
  }
};
var Triangulation_default = Triangulation;

// node_modules/ol/reproj/common.js
var ERROR_THRESHOLD = 0.5;

// node_modules/ol/reproj/Tile.js
var ReprojTile = class extends Tile_default {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection.
   * @param {import("../tilegrid/TileGrid.js").default} sourceTileGrid Source tile grid.
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../tilegrid/TileGrid.js").default} targetTileGrid Target tile grid.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Coordinate of the tile.
   * @param {import("../tilecoord.js").TileCoord} wrappedTileCoord Coordinate of the tile wrapped in X.
   * @param {number} pixelRatio Pixel ratio.
   * @param {number} gutter Gutter of the source tiles.
   * @param {FunctionType} getTileFunction
   *     Function returning source tiles (z, x, y, pixelRatio).
   * @param {number} [errorThreshold] Acceptable reprojection error (in px).
   * @param {boolean} [renderEdges] Render reprojection edges.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, errorThreshold, renderEdges, options) {
    super(tileCoord, TileState_default.IDLE, options);
    this.renderEdges_ = renderEdges !== void 0 ? renderEdges : false;
    this.pixelRatio_ = pixelRatio;
    this.gutter_ = gutter;
    this.canvas_ = null;
    this.sourceTileGrid_ = sourceTileGrid;
    this.targetTileGrid_ = targetTileGrid;
    this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
    this.sourceTiles_ = [];
    this.sourcesListenerKeys_ = null;
    this.sourceZ_ = 0;
    this.clipExtent_ = sourceProj.canWrapX() ? sourceProj.getExtent() : void 0;
    const targetExtent = targetTileGrid.getTileCoordExtent(this.wrappedTileCoord_);
    const maxTargetExtent = this.targetTileGrid_.getExtent();
    let maxSourceExtent = this.sourceTileGrid_.getExtent();
    const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
    if (getArea(limitedTargetExtent) === 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    const sourceProjExtent = sourceProj.getExtent();
    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
      }
    }
    const targetResolution = targetTileGrid.getResolution(this.wrappedTileCoord_[0]);
    const sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    const errorThresholdInPixels = errorThreshold !== void 0 ? errorThreshold : ERROR_THRESHOLD;
    this.triangulation_ = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
    if (this.triangulation_.getTriangles().length === 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
    let sourceExtent = this.triangulation_.calculateSourceExtent();
    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = clamp(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = clamp(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = getIntersection(sourceExtent, maxSourceExtent);
      }
    }
    if (!getArea(sourceExtent)) {
      this.state = TileState_default.EMPTY;
    } else {
      let worldWidth = 0;
      let worldsAway = 0;
      if (sourceProj.canWrapX()) {
        worldWidth = getWidth(sourceProjExtent);
        worldsAway = Math.floor((sourceExtent[0] - sourceProjExtent[0]) / worldWidth);
      }
      const sourceExtents = wrapAndSliceX(sourceExtent.slice(), sourceProj, true);
      sourceExtents.forEach((extent) => {
        const sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(extent, this.sourceZ_);
        for (let srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
          for (let srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
            const tile = getTileFunction(this.sourceZ_, srcX, srcY, pixelRatio);
            if (tile) {
              const offset = worldsAway * worldWidth;
              this.sourceTiles_.push({
                tile,
                offset
              });
            }
          }
        }
        ++worldsAway;
      });
      if (this.sourceTiles_.length === 0) {
        this.state = TileState_default.EMPTY;
      }
    }
  }
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @private
   */
  reproject_() {
    const sources = [];
    this.sourceTiles_.forEach((source) => {
      const tile = source.tile;
      if (tile && tile.getState() == TileState_default.LOADED) {
        const extent = this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord);
        extent[0] += source.offset;
        extent[2] += source.offset;
        const clipExtent = this.clipExtent_?.slice();
        if (clipExtent) {
          clipExtent[0] += source.offset;
          clipExtent[2] += source.offset;
        }
        sources.push({
          extent,
          clipExtent,
          image: tile.getImage()
        });
      }
    });
    this.sourceTiles_.length = 0;
    if (sources.length === 0) {
      this.state = TileState_default.ERROR;
    } else {
      const z = this.wrappedTileCoord_[0];
      const size = this.targetTileGrid_.getTileSize(z);
      const width = typeof size === "number" ? size : size[0];
      const height = typeof size === "number" ? size : size[1];
      const targetResolution = this.targetTileGrid_.getResolution(z);
      const sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
      const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      this.canvas_ = render(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_, this.interpolate);
      this.state = TileState_default.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == TileState_default.IDLE) {
      this.state = TileState_default.LOADING;
      this.changed();
      let leftToLoad = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(({
        tile
      }) => {
        const state = tile.getState();
        if (state == TileState_default.IDLE || state == TileState_default.LOADING) {
          leftToLoad++;
          const sourceListenKey = listen(tile, EventType_default.CHANGE, (e) => {
            const state2 = tile.getState();
            if (state2 == TileState_default.LOADED || state2 == TileState_default.ERROR || state2 == TileState_default.EMPTY) {
              unlistenByKey(sourceListenKey);
              leftToLoad--;
              if (leftToLoad === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          });
          this.sourcesListenerKeys_.push(sourceListenKey);
        }
      });
      if (leftToLoad === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      } else {
        this.sourceTiles_.forEach(function({
          tile
        }, i, arr) {
          const state = tile.getState();
          if (state == TileState_default.IDLE) {
            tile.load();
          }
        });
      }
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(unlistenByKey);
    this.sourcesListenerKeys_ = null;
  }
  /**
   * Remove from the cache due to expiry
   * @override
   */
  release() {
    if (this.canvas_) {
      releaseCanvas(this.canvas_.getContext("2d"));
      canvasPool.push(this.canvas_);
      this.canvas_ = null;
    }
    super.release();
  }
};
var Tile_default2 = ReprojTile;

// node_modules/ol/structs/LRUCache.js
var LRUCache = class {
  /**
   * @param {number} [highWaterMark] High water mark.
   */
  constructor(highWaterMark) {
    this.highWaterMark = highWaterMark !== void 0 ? highWaterMark : 2048;
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
  }
  deleteOldest() {
    const entry = this.pop();
    if (entry instanceof Disposable_default) {
      entry.dispose();
    }
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.highWaterMark > 0 && this.getCount() > this.highWaterMark;
  }
  /**
   * Expire the cache. When the cache entry is a {@link module:ol/Disposable~Disposable},
   * the entry will be disposed.
   * @param {!Object<string, boolean>} [keep] Keys to keep. To be implemented by subclasses.
   */
  expireCache(keep) {
    while (this.canExpireCache()) {
      this.deleteOldest();
    }
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    while (this.oldest_) {
      this.deleteOldest();
    }
  }
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */
  containsKey(key) {
    return this.entries_.hasOwnProperty(key);
  }
  /**
   * @param {function(T, string, LRUCache<T>): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   */
  forEach(f) {
    let entry = this.oldest_;
    while (entry) {
      f(entry.value_, entry.key_, this);
      entry = entry.newer;
    }
  }
  /**
   * @param {string} key Key.
   * @param {*} [options] Options (reserved for subclasses).
   * @return {T} Value.
   */
  get(key, options) {
    const entry = this.entries_[key];
    assert(entry !== void 0, "Tried to get a value for a key that does not exist in the cache");
    if (entry === this.newest_) {
      return entry.value_;
    }
    if (entry === this.oldest_) {
      this.oldest_ = /** @type {Entry} */
      this.oldest_.newer;
      this.oldest_.older = null;
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }
    entry.newer = null;
    entry.older = this.newest_;
    this.newest_.newer = entry;
    this.newest_ = entry;
    return entry.value_;
  }
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */
  remove(key) {
    const entry = this.entries_[key];
    assert(entry !== void 0, "Tried to get a value for a key that does not exist in the cache");
    if (entry === this.newest_) {
      this.newest_ = /** @type {Entry} */
      entry.older;
      if (this.newest_) {
        this.newest_.newer = null;
      }
    } else if (entry === this.oldest_) {
      this.oldest_ = /** @type {Entry} */
      entry.newer;
      if (this.oldest_) {
        this.oldest_.older = null;
      }
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }
    delete this.entries_[key];
    --this.count_;
    return entry.value_;
  }
  /**
   * @return {number} Count.
   */
  getCount() {
    return this.count_;
  }
  /**
   * @return {Array<string>} Keys.
   */
  getKeys() {
    const keys = new Array(this.count_);
    let i = 0;
    let entry;
    for (entry = this.newest_; entry; entry = entry.older) {
      keys[i++] = entry.key_;
    }
    return keys;
  }
  /**
   * @return {Array<T>} Values.
   */
  getValues() {
    const values = new Array(this.count_);
    let i = 0;
    let entry;
    for (entry = this.newest_; entry; entry = entry.older) {
      values[i++] = entry.value_;
    }
    return values;
  }
  /**
   * @return {T} Last value.
   */
  peekLast() {
    return this.oldest_.value_;
  }
  /**
   * @return {string} Last key.
   */
  peekLastKey() {
    return this.oldest_.key_;
  }
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */
  peekFirstKey() {
    return this.newest_.key_;
  }
  /**
   * Return an entry without updating least recently used time.
   * @param {string} key Key.
   * @return {T|undefined} Value.
   */
  peek(key) {
    return this.entries_[key]?.value_;
  }
  /**
   * @return {T} value Value.
   */
  pop() {
    const entry = this.oldest_;
    delete this.entries_[entry.key_];
    if (entry.newer) {
      entry.newer.older = null;
    }
    this.oldest_ = /** @type {Entry} */
    entry.newer;
    if (!this.oldest_) {
      this.newest_ = null;
    }
    --this.count_;
    return entry.value_;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  replace(key, value) {
    this.get(key);
    this.entries_[key].value_ = value;
  }
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */
  set(key, value) {
    assert(!(key in this.entries_), "Tried to set a value for a key that is used already");
    const entry = {
      key_: key,
      newer: null,
      older: this.newest_,
      value_: value
    };
    if (!this.newest_) {
      this.oldest_ = entry;
    } else {
      this.newest_.newer = entry;
    }
    this.newest_ = entry;
    this.entries_[key] = entry;
    ++this.count_;
  }
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */
  setSize(size) {
    this.highWaterMark = size;
  }
};
var LRUCache_default = LRUCache;

// node_modules/ol/tilecoord.js
function createOrUpdate(z, x, y, tileCoord) {
  if (tileCoord !== void 0) {
    tileCoord[0] = z;
    tileCoord[1] = x;
    tileCoord[2] = y;
    return tileCoord;
  }
  return [z, x, y];
}
function getKeyZXY(z, x, y) {
  return z + "/" + x + "/" + y;
}
function hash(tileCoord) {
  return hashZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
function hashZXY(z, x, y) {
  return (x << z) + y;
}
function withinExtentAndZ(tileCoord, tileGrid) {
  const z = tileCoord[0];
  const x = tileCoord[1];
  const y = tileCoord[2];
  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }
  const tileRange = tileGrid.getFullTileRange(z);
  if (!tileRange) {
    return true;
  }
  return tileRange.containsXY(x, y);
}

// node_modules/ol/renderer/canvas/TileLayer.js
function getCacheKey(sourceKey, z, x, y) {
  return `${sourceKey},${getKeyZXY(z, x, y)}`;
}
function addTileToLookup(tilesByZ, tile, z) {
  if (!(z in tilesByZ)) {
    tilesByZ[z] = /* @__PURE__ */ new Set([tile]);
    return true;
  }
  const set = tilesByZ[z];
  const existing = set.has(tile);
  if (!existing) {
    set.add(tile);
  }
  return !existing;
}
function removeTileFromLookup(tilesByZ, tile, z) {
  const set = tilesByZ[z];
  if (set) {
    return set.delete(tile);
  }
  return false;
}
function getRenderExtent(frameState, extent) {
  const layerState = frameState.layerStatesArray[frameState.layerIndex];
  if (layerState.extent) {
    extent = getIntersection(extent, fromUserExtent(layerState.extent, frameState.viewState.projection));
  }
  const source = (
    /** @type {import("../../source/Tile.js").default} */
    layerState.layer.getRenderSource()
  );
  if (!source.getWrapX()) {
    const gridExtent = source.getTileGridForProjection(frameState.viewState.projection).getExtent();
    if (gridExtent) {
      extent = getIntersection(extent, gridExtent);
    }
  }
  return extent;
}
var CanvasTileLayerRenderer = class extends Layer_default {
  /**
   * @param {LayerType} tileLayer Tile layer.
   * @param {Options} [options] Options.
   */
  constructor(tileLayer, options) {
    super(tileLayer);
    options = options || {};
    this.extentChanged = true;
    this.renderComplete = false;
    this.renderedExtent_ = null;
    this.renderedPixelRatio;
    this.renderedProjection = null;
    this.renderedRevision_;
    this.renderedTiles = [];
    this.renderedSourceKey_;
    this.renderedSourceRevision_;
    this.tempExtent = createEmpty();
    this.tempTileRange_ = new TileRange_default(0, 0, 0, 0);
    this.tempTileCoord_ = createOrUpdate(0, 0, 0);
    const cacheSize = options.cacheSize !== void 0 ? options.cacheSize : 512;
    this.tileCache_ = new LRUCache_default(cacheSize);
    this.maxStaleKeys = cacheSize * 0.5;
  }
  /**
   * @return {LRUCache} Tile cache.
   */
  getTileCache() {
    return this.tileCache_;
  }
  /**
   * Get a tile from the cache or create one if needed.
   *
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getOrCreateTile(z, x, y, frameState) {
    const tileCache = this.tileCache_;
    const tileLayer = this.getLayer();
    const tileSource = tileLayer.getSource();
    const cacheKey = getCacheKey(tileSource.getKey(), z, x, y);
    let tile;
    if (tileCache.containsKey(cacheKey)) {
      tile = tileCache.get(cacheKey);
    } else {
      tile = tileSource.getTile(z, x, y, frameState.pixelRatio, frameState.viewState.projection);
      if (!tile) {
        return null;
      }
      tileCache.set(cacheKey, tile);
    }
    return tile;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {import("../../Tile.js").default|null} Tile (or null if outside source extent).
   * @protected
   */
  getTile(z, x, y, frameState) {
    const tile = this.getOrCreateTile(z, x, y, frameState);
    if (!tile) {
      return null;
    }
    return tile;
  }
  /**
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray} Data at the pixel location.
   * @override
   */
  getData(pixel) {
    const frameState = this.frameState;
    if (!frameState) {
      return null;
    }
    const layer = this.getLayer();
    const coordinate = apply(frameState.pixelToCoordinateTransform, pixel.slice());
    const layerExtent = layer.getExtent();
    if (layerExtent) {
      if (!containsCoordinate(layerExtent, coordinate)) {
        return null;
      }
    }
    const viewState = frameState.viewState;
    const source = layer.getRenderSource();
    const tileGrid = source.getTileGridForProjection(viewState.projection);
    const tilePixelRatio = source.getTilePixelRatio(frameState.pixelRatio);
    for (let z = tileGrid.getZForResolution(viewState.resolution); z >= tileGrid.getMinZoom(); --z) {
      const tileCoord = tileGrid.getTileCoordForCoordAndZ(coordinate, z);
      const tile = this.getTile(z, tileCoord[1], tileCoord[2], frameState);
      if (!tile || tile.getState() !== TileState_default.LOADED) {
        continue;
      }
      const tileOrigin = tileGrid.getOrigin(z);
      const tileSize = toSize(tileGrid.getTileSize(z));
      const tileResolution = tileGrid.getResolution(z);
      let image;
      if (tile instanceof ImageTile_default || tile instanceof Tile_default2) {
        image = tile.getImage();
      } else if (tile instanceof DataTile_default) {
        image = asImageLike(tile.getData());
        if (!image) {
          continue;
        }
      } else {
        continue;
      }
      const col = Math.floor(tilePixelRatio * ((coordinate[0] - tileOrigin[0]) / tileResolution - tileCoord[1] * tileSize[0]));
      const row = Math.floor(tilePixelRatio * ((tileOrigin[1] - coordinate[1]) / tileResolution - tileCoord[2] * tileSize[1]));
      const gutter = Math.round(tilePixelRatio * source.getGutterForProjection(viewState.projection));
      return this.getImageData(image, col + gutter, row + gutter);
    }
    return null;
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(frameState) {
    if (!this.renderedProjection) {
      this.renderedProjection = frameState.viewState.projection;
    } else if (frameState.viewState.projection !== this.renderedProjection) {
      this.tileCache_.clear();
      this.renderedProjection = frameState.viewState.projection;
    }
    const source = this.getLayer().getSource();
    if (!source) {
      return false;
    }
    const sourceRevision = source.getRevision();
    if (!this.renderedRevision_) {
      this.renderedRevision_ = sourceRevision;
    } else if (this.renderedRevision_ !== sourceRevision) {
      this.renderedRevision_ = sourceRevision;
      if (this.renderedSourceKey_ === source.getKey()) {
        this.tileCache_.clear();
      }
    }
    return true;
  }
  /**
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("../../extent.js").Extent} extent The extent to be rendered.
   * @param {number} initialZ The zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @param {number} preload Number of additional levels to load.
   */
  enqueueTiles(frameState, extent, initialZ, tilesByZ, preload) {
    const viewState = frameState.viewState;
    const tileLayer = this.getLayer();
    const tileSource = tileLayer.getRenderSource();
    const tileGrid = tileSource.getTileGridForProjection(viewState.projection);
    const tileSourceKey = getUid(tileSource);
    if (!(tileSourceKey in frameState.wantedTiles)) {
      frameState.wantedTiles[tileSourceKey] = {};
    }
    const wantedTiles = frameState.wantedTiles[tileSourceKey];
    const map = tileLayer.getMapInternal();
    const minZ = Math.max(initialZ - preload, tileGrid.getMinZoom(), tileGrid.getZForResolution(Math.min(tileLayer.getMaxResolution(), map ? map.getView().getResolutionForZoom(Math.max(tileLayer.getMinZoom(), 0)) : tileGrid.getResolution(0)), tileSource.zDirection));
    const rotation = viewState.rotation;
    const viewport = rotation ? getRotatedViewport(viewState.center, viewState.resolution, rotation, frameState.size) : void 0;
    for (let z = initialZ; z >= minZ; --z) {
      const tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z, this.tempTileRange_);
      const tileResolution = tileGrid.getResolution(z);
      for (let x = tileRange.minX; x <= tileRange.maxX; ++x) {
        for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
          if (rotation && !tileGrid.tileCoordIntersectsViewport([z, x, y], viewport)) {
            continue;
          }
          const tile = this.getTile(z, x, y, frameState);
          if (!tile) {
            continue;
          }
          const added = addTileToLookup(tilesByZ, tile, z);
          if (!added) {
            continue;
          }
          const tileQueueKey = tile.getKey();
          wantedTiles[tileQueueKey] = true;
          if (tile.getState() === TileState_default.IDLE) {
            if (!frameState.tileQueue.isKeyQueued(tileQueueKey)) {
              const tileCoord = createOrUpdate(z, x, y, this.tempTileCoord_);
              frameState.tileQueue.enqueue([tile, tileSourceKey, tileGrid.getTileCoordCenter(tileCoord), tileResolution]);
            }
          }
        }
      }
    }
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findStaleTile_(tileCoord, tilesByZ) {
    const tileCache = this.tileCache_;
    const z = tileCoord[0];
    const x = tileCoord[1];
    const y = tileCoord[2];
    const staleKeys = this.getStaleKeys();
    for (let i = 0; i < staleKeys.length; ++i) {
      const cacheKey = getCacheKey(staleKeys[i], z, x, y);
      if (tileCache.containsKey(cacheKey)) {
        const tile = tileCache.peek(cacheKey);
        if (tile.getState() === TileState_default.LOADED) {
          tile.endTransition(getUid(this));
          addTileToLookup(tilesByZ, tile, z);
          return true;
        }
      }
    }
    return false;
  }
  /**
   * Look for tiles covering the provided tile coordinate at an alternate
   * zoom level.  Loaded tiles will be added to the provided tile texture lookup.
   * @param {import("../../tilegrid/TileGrid.js").default} tileGrid The tile grid.
   * @param {import("../../tilecoord.js").TileCoord} tileCoord The target tile coordinate.
   * @param {number} altZ The alternate zoom level.
   * @param {TileLookup} tilesByZ Lookup of tiles by zoom level.
   * @return {boolean} The tile coordinate is covered by loaded tiles at the alternate zoom level.
   * @private
   */
  findAltTiles_(tileGrid, tileCoord, altZ, tilesByZ) {
    const tileRange = tileGrid.getTileRangeForTileCoordAndZ(tileCoord, altZ, this.tempTileRange_);
    if (!tileRange) {
      return false;
    }
    let covered = true;
    const tileCache = this.tileCache_;
    const source = this.getLayer().getRenderSource();
    const sourceKey = source.getKey();
    for (let x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (let y = tileRange.minY; y <= tileRange.maxY; ++y) {
        const cacheKey = getCacheKey(sourceKey, altZ, x, y);
        let loaded = false;
        if (tileCache.containsKey(cacheKey)) {
          const tile = tileCache.peek(cacheKey);
          if (tile.getState() === TileState_default.LOADED) {
            addTileToLookup(tilesByZ, tile, altZ);
            loaded = true;
          }
        }
        if (!loaded) {
          covered = false;
        }
      }
    }
    return covered;
  }
  /**
   * Render the layer.
   *
   * The frame rendering logic has three parts:
   *
   *  1. Enqueue tiles
   *  2. Find alt tiles for those that are not yet loaded
   *  3. Render loaded tiles
   *
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(frameState, target) {
    let allTilesIdle = true;
    this.renderComplete = true;
    const layerState = frameState.layerStatesArray[frameState.layerIndex];
    const viewState = frameState.viewState;
    const projection = viewState.projection;
    const viewResolution = viewState.resolution;
    const viewCenter = viewState.center;
    const pixelRatio = frameState.pixelRatio;
    const tileLayer = this.getLayer();
    const tileSource = tileLayer.getSource();
    const tileGrid = tileSource.getTileGridForProjection(projection);
    const z = tileGrid.getZForResolution(viewResolution, tileSource.zDirection);
    const tileResolution = tileGrid.getResolution(z);
    const sourceKey = tileSource.getKey();
    if (!this.renderedSourceKey_) {
      this.renderedSourceKey_ = sourceKey;
    } else if (this.renderedSourceKey_ !== sourceKey) {
      this.prependStaleKey(this.renderedSourceKey_);
      this.renderedSourceKey_ = sourceKey;
    }
    let frameExtent = frameState.extent;
    const tilePixelRatio = tileSource.getTilePixelRatio(pixelRatio);
    this.prepareContainer(frameState, target);
    const width = this.context.canvas.width;
    const height = this.context.canvas.height;
    const layerExtent = layerState.extent && fromUserExtent(layerState.extent, projection);
    if (layerExtent) {
      frameExtent = getIntersection(frameExtent, fromUserExtent(layerState.extent, projection));
    }
    const dx = tileResolution * width / 2 / tilePixelRatio;
    const dy = tileResolution * height / 2 / tilePixelRatio;
    const canvasExtent = [viewCenter[0] - dx, viewCenter[1] - dy, viewCenter[0] + dx, viewCenter[1] + dy];
    const tilesByZ = {};
    this.renderedTiles.length = 0;
    const preload = tileLayer.getPreload();
    if (frameState.nextExtent) {
      const targetZ = tileGrid.getZForResolution(viewState.nextResolution, tileSource.zDirection);
      const nextExtent = getRenderExtent(frameState, frameState.nextExtent);
      this.enqueueTiles(frameState, nextExtent, targetZ, tilesByZ, preload);
    }
    const renderExtent = getRenderExtent(frameState, frameExtent);
    this.enqueueTiles(frameState, renderExtent, z, tilesByZ, 0);
    if (preload > 0) {
      setTimeout(() => {
        this.enqueueTiles(frameState, renderExtent, z - 1, tilesByZ, preload - 1);
      }, 0);
    }
    if (!(z in tilesByZ)) {
      return this.container;
    }
    const uid = getUid(this);
    const time = frameState.time;
    for (const tile of tilesByZ[z]) {
      const tileState = tile.getState();
      if (tileState === TileState_default.EMPTY) {
        continue;
      }
      const tileCoord = tile.tileCoord;
      if (tileState === TileState_default.LOADED) {
        const alpha = tile.getAlpha(uid, time);
        if (alpha === 1) {
          tile.endTransition(uid);
          continue;
        }
      }
      if (tileState !== TileState_default.IDLE) {
        allTilesIdle = false;
      }
      if (tileState !== TileState_default.ERROR) {
        this.renderComplete = false;
      }
      const hasStaleTile = this.findStaleTile_(tileCoord, tilesByZ);
      if (hasStaleTile) {
        removeTileFromLookup(tilesByZ, tile, z);
        frameState.animate = true;
        continue;
      }
      const coveredByChildren = this.findAltTiles_(tileGrid, tileCoord, z + 1, tilesByZ);
      if (coveredByChildren) {
        continue;
      }
      const minZoom = tileGrid.getMinZoom();
      for (let parentZ = z - 1; parentZ >= minZoom; --parentZ) {
        const coveredByParent = this.findAltTiles_(tileGrid, tileCoord, parentZ, tilesByZ);
        if (coveredByParent) {
          break;
        }
      }
    }
    const canvasScale = tileResolution / viewResolution * pixelRatio / tilePixelRatio;
    const context = this.getRenderContext(frameState);
    compose(this.tempTransform, width / 2, height / 2, canvasScale, canvasScale, 0, -width / 2, -height / 2);
    if (layerState.extent) {
      this.clipUnrotated(context, frameState, layerExtent);
    }
    if (!tileSource.getInterpolate()) {
      context.imageSmoothingEnabled = false;
    }
    this.preRender(context, frameState);
    const zs = Object.keys(tilesByZ).map(Number);
    zs.sort(ascending);
    let currentClip;
    const clips = [];
    const clipZs = [];
    for (let i = zs.length - 1; i >= 0; --i) {
      const currentZ = zs[i];
      const currentTilePixelSize = tileSource.getTilePixelSize(currentZ, pixelRatio, projection);
      const currentResolution = tileGrid.getResolution(currentZ);
      const currentScale = currentResolution / tileResolution;
      const dx2 = currentTilePixelSize[0] * currentScale * canvasScale;
      const dy2 = currentTilePixelSize[1] * currentScale * canvasScale;
      const originTileCoord = tileGrid.getTileCoordForCoordAndZ(getTopLeft(canvasExtent), currentZ);
      const originTileExtent = tileGrid.getTileCoordExtent(originTileCoord);
      const origin = apply(this.tempTransform, [tilePixelRatio * (originTileExtent[0] - canvasExtent[0]) / tileResolution, tilePixelRatio * (canvasExtent[3] - originTileExtent[3]) / tileResolution]);
      const tileGutter = tilePixelRatio * tileSource.getGutterForProjection(projection);
      for (const tile of tilesByZ[currentZ]) {
        if (tile.getState() !== TileState_default.LOADED) {
          continue;
        }
        const tileCoord = tile.tileCoord;
        const xIndex = originTileCoord[1] - tileCoord[1];
        const nextX = Math.round(origin[0] - (xIndex - 1) * dx2);
        const yIndex = originTileCoord[2] - tileCoord[2];
        const nextY = Math.round(origin[1] - (yIndex - 1) * dy2);
        const x = Math.round(origin[0] - xIndex * dx2);
        const y = Math.round(origin[1] - yIndex * dy2);
        const w = nextX - x;
        const h = nextY - y;
        const transition = zs.length === 1;
        let contextSaved = false;
        currentClip = [x, y, x + w, y, x + w, y + h, x, y + h];
        for (let i2 = 0, ii = clips.length; i2 < ii; ++i2) {
          if (!transition && currentZ < clipZs[i2]) {
            const clip = clips[i2];
            if (intersects([x, y, x + w, y + h], [clip[0], clip[3], clip[4], clip[7]])) {
              if (!contextSaved) {
                context.save();
                contextSaved = true;
              }
              context.beginPath();
              context.moveTo(currentClip[0], currentClip[1]);
              context.lineTo(currentClip[2], currentClip[3]);
              context.lineTo(currentClip[4], currentClip[5]);
              context.lineTo(currentClip[6], currentClip[7]);
              context.moveTo(clip[6], clip[7]);
              context.lineTo(clip[4], clip[5]);
              context.lineTo(clip[2], clip[3]);
              context.lineTo(clip[0], clip[1]);
              context.clip();
            }
          }
        }
        clips.push(currentClip);
        clipZs.push(currentZ);
        this.drawTile(tile, frameState, x, y, w, h, tileGutter, transition);
        if (contextSaved) {
          context.restore();
        }
        this.renderedTiles.unshift(tile);
        this.updateUsedTiles(frameState.usedTiles, tileSource, tile);
      }
    }
    this.renderedResolution = tileResolution;
    this.extentChanged = !this.renderedExtent_ || !equals(this.renderedExtent_, canvasExtent);
    this.renderedExtent_ = canvasExtent;
    this.renderedPixelRatio = pixelRatio;
    this.postRender(this.context, frameState);
    if (layerState.extent) {
      context.restore();
    }
    context.imageSmoothingEnabled = true;
    if (this.renderComplete) {
      const postRenderFunction = (map, frameState2) => {
        const tileSourceKey = getUid(tileSource);
        const wantedTiles = frameState2.wantedTiles[tileSourceKey];
        const tilesCount = wantedTiles ? Object.keys(wantedTiles).length : 0;
        this.updateCacheSize(tilesCount);
        this.tileCache_.expireCache();
      };
      frameState.postRenderFunctions.push(postRenderFunction);
    }
    if (!this.renderComplete && !allTilesIdle) {
      frameState.animate = true;
    }
    return this.container;
  }
  /**
   * Increases the cache size if needed
   * @param {number} tileCount Minimum number of tiles needed.
   */
  updateCacheSize(tileCount) {
    this.tileCache_.highWaterMark = Math.max(this.tileCache_.highWaterMark, tileCount * 2);
  }
  /**
   * @param {import("../../Tile.js").default} tile Tile.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} x Left of the tile.
   * @param {number} y Top of the tile.
   * @param {number} w Width of the tile.
   * @param {number} h Height of the tile.
   * @param {number} gutter Tile gutter.
   * @param {boolean} transition Apply an alpha transition.
   * @protected
   */
  drawTile(tile, frameState, x, y, w, h, gutter, transition) {
    let image;
    if (tile instanceof DataTile_default) {
      image = asImageLike(tile.getData());
      if (!image) {
        throw new Error("Rendering array data is not yet supported");
      }
    } else {
      image = this.getTileImage(
        /** @type {import("../../ImageTile.js").default} */
        tile
      );
    }
    if (!image) {
      return;
    }
    const context = this.getRenderContext(frameState);
    const uid = getUid(this);
    const layerState = frameState.layerStatesArray[frameState.layerIndex];
    const alpha = layerState.opacity * (transition ? tile.getAlpha(uid, frameState.time) : 1);
    const alphaChanged = alpha !== context.globalAlpha;
    if (alphaChanged) {
      context.save();
      context.globalAlpha = alpha;
    }
    context.drawImage(image, gutter, gutter, image.width - 2 * gutter, image.height - 2 * gutter, x, y, w, h);
    if (alphaChanged) {
      context.restore();
    }
    if (alpha !== layerState.opacity) {
      frameState.animate = true;
    } else if (transition) {
      tile.endTransition(uid);
    }
  }
  /**
   * @return {HTMLCanvasElement} Image
   */
  getImage() {
    const context = this.context;
    return context ? context.canvas : null;
  }
  /**
   * Get the image from a tile.
   * @param {import("../../ImageTile.js").default} tile Tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @protected
   */
  getTileImage(tile) {
    return tile.getImage();
  }
  /**
   * @param {!Object<string, !Object<string, boolean>>} usedTiles Used tiles.
   * @param {import("../../source/Tile.js").default} tileSource Tile source.
   * @param {import('../../Tile.js').default} tile Tile.
   * @protected
   */
  updateUsedTiles(usedTiles, tileSource, tile) {
    const tileSourceKey = getUid(tileSource);
    if (!(tileSourceKey in usedTiles)) {
      usedTiles[tileSourceKey] = {};
    }
    usedTiles[tileSourceKey][tile.getKey()] = true;
  }
};
var TileLayer_default = CanvasTileLayerRenderer;

// node_modules/ol/layer/TileProperty.js
var TileProperty_default = {
  PRELOAD: "preload",
  USE_INTERIM_TILES_ON_ERROR: "useInterimTilesOnError"
};

// node_modules/ol/layer/BaseTile.js
var BaseTileLayer = class extends Layer_default2 {
  /**
   * @param {Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign({}, options);
    const cacheSize = options.cacheSize;
    delete options.cacheSize;
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    super(baseOptions);
    this.on;
    this.once;
    this.un;
    this.cacheSize_ = cacheSize;
    this.setPreload(options.preload !== void 0 ? options.preload : 0);
    this.setUseInterimTilesOnError(options.useInterimTilesOnError !== void 0 ? options.useInterimTilesOnError : true);
  }
  /**
   * @return {number|undefined} The suggested cache size
   * @protected
   */
  getCacheSize() {
    return this.cacheSize_;
  }
  /**
   * Return the level as number to which we will preload tiles up to.
   * @return {number} The level to preload tiles up to.
   * @observable
   * @api
   */
  getPreload() {
    return (
      /** @type {number} */
      this.get(TileProperty_default.PRELOAD)
    );
  }
  /**
   * Set the level as number to which we will preload tiles up to.
   * @param {number} preload The level to preload tiles up to.
   * @observable
   * @api
   */
  setPreload(preload) {
    this.set(TileProperty_default.PRELOAD, preload);
  }
  /**
   * Deprecated.  Whether we use interim tiles on error.
   * @return {boolean} Use interim tiles on error.
   * @observable
   * @api
   */
  getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(TileProperty_default.USE_INTERIM_TILES_ON_ERROR)
    );
  }
  /**
   * Deprecated.  Set whether we use interim tiles on error.
   * @param {boolean} useInterimTilesOnError Use interim tiles on error.
   * @observable
   * @api
   */
  setUseInterimTilesOnError(useInterimTilesOnError) {
    this.set(TileProperty_default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  }
  /**
   * Get data for a pixel location.  The return type depends on the source data.  For image tiles,
   * a four element RGBA array will be returned.  For data tiles, the array length will match the
   * number of bands in the dataset.  For requests outside the layer extent, `null` will be returned.
   * Data for a image tiles can only be retrieved if the source's `crossOrigin` property is set.
   *
   * ```js
   * // display layer data on every pointer move
   * map.on('pointermove', (event) => {
   *   console.log(layer.getData(event.pixel));
   * });
   * ```
   * @param {import("../pixel").Pixel} pixel Pixel.
   * @return {Uint8ClampedArray|Uint8Array|Float32Array|DataView|null} Pixel data.
   * @api
   * @override
   */
  getData(pixel) {
    return super.getData(pixel);
  }
};
var BaseTile_default = BaseTileLayer;

// node_modules/ol/layer/Tile.js
var TileLayer = class extends BaseTile_default {
  /**
   * @param {import("./BaseTile.js").Options<TileSourceType>} [options] Tile layer options.
   */
  constructor(options) {
    super(options);
  }
  /**
   * @override
   */
  createRenderer() {
    return new TileLayer_default(this, {
      cacheSize: this.getCacheSize()
    });
  }
};
var Tile_default3 = TileLayer;

export {
  asImageLike,
  asArrayLike,
  toArray,
  DataTile_default,
  calculateSourceResolution,
  calculateSourceExtentResolution,
  render,
  Triangulation_default,
  ERROR_THRESHOLD,
  Tile_default2 as Tile_default,
  LRUCache_default,
  createOrUpdate,
  hash,
  hashZXY,
  withinExtentAndZ,
  Tile_default3 as Tile_default2
};
//# sourceMappingURL=chunk-GD4FI7PJ.js.map
