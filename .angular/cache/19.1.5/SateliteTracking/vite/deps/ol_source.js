import {
  ExtraSamplesValues,
  arrayFields,
  fieldTagNames,
  fieldTypeNames,
  fieldTypes,
  geoKeyNames,
  globals_exports,
  photometricInterpretations
} from "./chunk-YDSK76KG.js";
import "./chunk-JSOACJM5.js";
import {
  DataTile_default,
  ERROR_THRESHOLD,
  LRUCache_default,
  Tile_default as Tile_default2,
  Tile_default2 as Tile_default3,
  Triangulation_default,
  asArrayLike,
  asImageLike,
  calculateSourceExtentResolution,
  calculateSourceResolution,
  createOrUpdate as createOrUpdate3,
  hash,
  hashZXY,
  render,
  toArray,
  withinExtentAndZ
} from "./chunk-GD4FI7PJ.js";
import {
  ImageCanvas_default,
  VectorRenderTile_default,
  VectorTile_default
} from "./chunk-3GO465IU.js";
import {
  ImageTile_default,
  TileRange_default,
  Tile_default,
  createOrUpdate as createOrUpdate2
} from "./chunk-AJCWPRKA.js";
import {
  TileQueue_default
} from "./chunk-SITR5SFQ.js";
import {
  TileState_default
} from "./chunk-PWOXHWUC.js";
import {
  Layer_default
} from "./chunk-WEXFOBJA.js";
import {
  Source_default,
  Vector_default,
  loadFeaturesXhr
} from "./chunk-EDRYIJN6.js";
import "./chunk-5K73XM64.js";
import {
  Feature_default
} from "./chunk-TYRNN5GE.js";
import {
  Layer_default as Layer_default2
} from "./chunk-GKPGQ42P.js";
import {
  ImageState_default,
  Image_default,
  decode,
  scale as scale2,
  toSize
} from "./chunk-5CXUNJWW.js";
import "./chunk-BDEWHVOF.js";
import "./chunk-RE7YPHWR.js";
import {
  createCanvasContext2D
} from "./chunk-TALNCFXE.js";
import {
  WORKER_OFFSCREEN_CANVAS
} from "./chunk-AX5WOFAA.js";
import {
  DEFAULT_MAX_ZOOM,
  DEFAULT_TILE_SIZE,
  ViewHint_default
} from "./chunk-GVA6PU2J.js";
import {
  intersectsLinearRing
} from "./chunk-II5KOT2H.js";
import {
  Point_default,
  apply,
  compose,
  create,
  makeInverse,
  multiply
} from "./chunk-JDURIDCO.js";
import {
  METERS_PER_UNIT,
  Projection_default,
  add,
  applyTransform,
  buffer,
  compareVersions,
  containsCoordinate,
  containsExtent,
  createEmpty,
  createOrUpdate,
  createOrUpdateFromCoordinate,
  createTransformFromCoordinateTransform,
  equals,
  equivalent,
  error,
  extend,
  fromCode,
  fromUserExtent,
  get,
  getArea,
  getBottomLeft,
  getCenter,
  getCorner,
  getForViewAndSize,
  getHeight,
  getIntersection,
  getTopLeft,
  getTopRight,
  getTransformFromProjections,
  getWidth,
  intersects,
  isEmpty as isEmpty2,
  scale,
  scaleFromCenter,
  toLonLat,
  toUserCoordinate,
  toUserExtent,
  transform,
  wrapAndSliceX
} from "./chunk-KD5NYAAV.js";
import {
  ceil,
  clamp,
  floor,
  modulo,
  round
} from "./chunk-UVCLGJLE.js";
import "./chunk-BPFTGO52.js";
import {
  Disposable_default,
  Event_default,
  abstract,
  getUid,
  listen,
  listenOnce,
  unlistenByKey
} from "./chunk-4VZCFOSN.js";
import {
  isEmpty
} from "./chunk-VNWMKJWE.js";
import {
  assert
} from "./chunk-IJQ6LSTY.js";
import {
  EventType_default,
  isSorted,
  linearFindNearest,
  toPromise
} from "./chunk-ZD2NNC7F.js";
import {
  __async,
  __commonJS,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-4MWRP73S.js";

// node_modules/xml-utils/get-attribute.js
var require_get_attribute = __commonJS({
  "node_modules/xml-utils/get-attribute.js"(exports, module) {
    function getAttribute2(tag, attributeName, options) {
      const debug = options && options.debug || false;
      if (debug) console.log("[xml-utils] getting " + attributeName + " in " + tag);
      const xml = typeof tag === "object" ? tag.outer : tag;
      const opening = xml.slice(0, xml.indexOf(">") + 1);
      const quotechars = ['"', "'"];
      for (let i = 0; i < quotechars.length; i++) {
        const char = quotechars[i];
        const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
        if (debug) console.log("[xml-utils] pattern:", pattern);
        const re = new RegExp(pattern);
        const match = re.exec(opening);
        if (debug) console.log("[xml-utils] match:", match);
        if (match) return match[1];
      }
    }
    module.exports = getAttribute2;
    module.exports.default = getAttribute2;
  }
});

// node_modules/xml-utils/index-of-match.js
var require_index_of_match = __commonJS({
  "node_modules/xml-utils/index-of-match.js"(exports, module) {
    function indexOfMatch(xml, pattern, startIndex) {
      const re = new RegExp(pattern);
      const match = re.exec(xml.slice(startIndex));
      if (match) return startIndex + match.index;
      else return -1;
    }
    module.exports = indexOfMatch;
    module.exports.default = indexOfMatch;
  }
});

// node_modules/xml-utils/index-of-match-end.js
var require_index_of_match_end = __commonJS({
  "node_modules/xml-utils/index-of-match-end.js"(exports, module) {
    function indexOfMatchEnd(xml, pattern, startIndex) {
      const re = new RegExp(pattern);
      const match = re.exec(xml.slice(startIndex));
      if (match) return startIndex + match.index + match[0].length - 1;
      else return -1;
    }
    module.exports = indexOfMatchEnd;
    module.exports.default = indexOfMatchEnd;
  }
});

// node_modules/xml-utils/count-substring.js
var require_count_substring = __commonJS({
  "node_modules/xml-utils/count-substring.js"(exports, module) {
    function countSubstring(string, substring) {
      const pattern = new RegExp(substring, "g");
      const match = string.match(pattern);
      return match ? match.length : 0;
    }
    module.exports = countSubstring;
    module.exports.default = countSubstring;
  }
});

// node_modules/xml-utils/find-tag-by-name.js
var require_find_tag_by_name = __commonJS({
  "node_modules/xml-utils/find-tag-by-name.js"(exports, module) {
    var indexOfMatch = require_index_of_match();
    var indexOfMatchEnd = require_index_of_match_end();
    var countSubstring = require_count_substring();
    function findTagByName(xml, tagName, options) {
      const debug = options && options.debug || false;
      const nested = !(options && typeof options.nested === false);
      const startIndex = options && options.startIndex || 0;
      if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);
      const start = indexOfMatch(xml, `<${tagName}[ 
>/]`, startIndex);
      if (debug) console.log("[xml-utils] start:", start);
      if (start === -1) return void 0;
      const afterStart = xml.slice(start + tagName.length);
      let relativeEnd = indexOfMatchEnd(afterStart, "^[^<]*[ /]>", 0);
      const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
      if (debug) console.log("[xml-utils] selfClosing:", selfClosing);
      if (selfClosing === false) {
        if (nested) {
          let startIndex2 = 0;
          let openings = 1;
          let closings = 0;
          while ((relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", startIndex2)) !== -1) {
            const clip = afterStart.substring(startIndex2, relativeEnd + 1);
            openings += countSubstring(clip, "<" + tagName + "[ \n	>]");
            closings += countSubstring(clip, "</" + tagName + ">");
            if (closings >= openings) break;
            startIndex2 = relativeEnd;
          }
        } else {
          relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", 0);
        }
      }
      const end = start + tagName.length + relativeEnd + 1;
      if (debug) console.log("[xml-utils] end:", end);
      if (end === -1) return void 0;
      const outer = xml.slice(start, end);
      let inner;
      if (selfClosing) {
        inner = null;
      } else {
        inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
      }
      return {
        inner,
        outer,
        start,
        end
      };
    }
    module.exports = findTagByName;
    module.exports.default = findTagByName;
  }
});

// node_modules/xml-utils/find-tags-by-name.js
var require_find_tags_by_name = __commonJS({
  "node_modules/xml-utils/find-tags-by-name.js"(exports, module) {
    var findTagByName = require_find_tag_by_name();
    function findTagsByName2(xml, tagName, options) {
      const tags = [];
      const debug = options && options.debug || false;
      const nested = options && typeof options.nested === "boolean" ? options.nested : true;
      let startIndex = options && options.startIndex || 0;
      let tag;
      while (tag = findTagByName(xml, tagName, {
        debug,
        startIndex
      })) {
        if (nested) {
          startIndex = tag.start + 1 + tagName.length;
        } else {
          startIndex = tag.end;
        }
        tags.push(tag);
      }
      if (debug) console.log("findTagsByName found", tags.length, "tags");
      return tags;
    }
    module.exports = findTagsByName2;
    module.exports.default = findTagsByName2;
  }
});

// browser-external:http
var require_http = __commonJS({
  "browser-external:http"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "http" has been externalized for browser compatibility. Cannot access "http.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:https
var require_https = __commonJS({
  "browser-external:https"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "https" has been externalized for browser compatibility. Cannot access "https.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:url
var require_url = __commonJS({
  "browser-external:url"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "url" has been externalized for browser compatibility. Cannot access "url.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:fs
var require_fs = __commonJS({
  "browser-external:fs"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/ol/tilegrid/TileGrid.js
var tmpTileCoord = [0, 0, 0];
var DECIMALS = 5;
var TileGrid = class {
  /**
   * @param {Options} options Tile grid options.
   */
  constructor(options) {
    this.minZoom = options.minZoom !== void 0 ? options.minZoom : 0;
    this.resolutions_ = options.resolutions;
    assert(isSorted(
      this.resolutions_,
      /**
       * @param {number} a First resolution
       * @param {number} b Second resolution
       * @return {number} Comparison result
       */
      (a, b) => b - a,
      true
    ), "`resolutions` must be sorted in descending order");
    let zoomFactor;
    if (!options.origins) {
      for (let i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
        if (!zoomFactor) {
          zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
        } else {
          if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
            zoomFactor = void 0;
            break;
          }
        }
      }
    }
    this.zoomFactor_ = zoomFactor;
    this.maxZoom = this.resolutions_.length - 1;
    this.origin_ = options.origin !== void 0 ? options.origin : null;
    this.origins_ = null;
    if (options.origins !== void 0) {
      this.origins_ = options.origins;
      assert(this.origins_.length == this.resolutions_.length, "Number of `origins` and `resolutions` must be equal");
    }
    const extent = options.extent;
    if (extent !== void 0 && !this.origin_ && !this.origins_) {
      this.origin_ = getTopLeft(extent);
    }
    assert(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, "Either `origin` or `origins` must be configured, never both");
    this.tileSizes_ = null;
    if (options.tileSizes !== void 0) {
      this.tileSizes_ = options.tileSizes;
      assert(this.tileSizes_.length == this.resolutions_.length, "Number of `tileSizes` and `resolutions` must be equal");
    }
    this.tileSize_ = options.tileSize !== void 0 ? options.tileSize : !this.tileSizes_ ? DEFAULT_TILE_SIZE : null;
    assert(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, "Either `tileSize` or `tileSizes` must be configured, never both");
    this.extent_ = extent !== void 0 ? extent : null;
    this.fullTileRanges_ = null;
    this.tmpSize_ = [0, 0];
    this.tmpExtent_ = [0, 0, 0, 0];
    if (options.sizes !== void 0) {
      this.fullTileRanges_ = options.sizes.map((size, z) => {
        const tileRange = new TileRange_default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
        if (extent) {
          const restrictedTileRange = this.getTileRangeForExtentAndZ(extent, z);
          tileRange.minX = Math.max(restrictedTileRange.minX, tileRange.minX);
          tileRange.maxX = Math.min(restrictedTileRange.maxX, tileRange.maxX);
          tileRange.minY = Math.max(restrictedTileRange.minY, tileRange.minY);
          tileRange.maxY = Math.min(restrictedTileRange.maxY, tileRange.maxY);
        }
        return tileRange;
      });
    } else if (extent) {
      this.calculateTileRanges_(extent);
    }
  }
  /**
   * Call a function with each tile coordinate for a given extent and zoom level.
   *
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} zoom Integer zoom level.
   * @param {function(import("../tilecoord.js").TileCoord): void} callback Function called with each tile coordinate.
   * @api
   */
  forEachTileCoord(extent, zoom, callback) {
    const tileRange = this.getTileRangeForExtentAndZ(extent, zoom);
    for (let i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
      for (let j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
        callback([zoom, i, j]);
      }
    }
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {function(number, import("../TileRange.js").default): boolean} callback Callback.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {boolean} Callback succeeded.
   */
  forEachTileCoordParentTileRange(tileCoord, callback, tempTileRange, tempExtent) {
    let tileRange, x, y;
    let tileCoordExtent = null;
    let z = tileCoord[0] - 1;
    if (this.zoomFactor_ === 2) {
      x = tileCoord[1];
      y = tileCoord[2];
    } else {
      tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent);
    }
    while (z >= this.minZoom) {
      if (x !== void 0 && y !== void 0) {
        x = Math.floor(x / 2);
        y = Math.floor(y / 2);
        tileRange = createOrUpdate2(x, x, y, y, tempTileRange);
      } else {
        tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
      }
      if (callback(z, tileRange)) {
        return true;
      }
      --z;
    }
    return false;
  }
  /**
   * Get the extent for this tile grid, if it was configured.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getExtent() {
    return this.extent_;
  }
  /**
   * Get the maximum zoom level for the grid.
   * @return {number} Max zoom.
   * @api
   */
  getMaxZoom() {
    return this.maxZoom;
  }
  /**
   * Get the minimum zoom level for the grid.
   * @return {number} Min zoom.
   * @api
   */
  getMinZoom() {
    return this.minZoom;
  }
  /**
   * Get the origin for the grid at the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {import("../coordinate.js").Coordinate} Origin.
   * @api
   */
  getOrigin(z) {
    if (this.origin_) {
      return this.origin_;
    }
    return this.origins_[z];
  }
  /**
   * Get the resolution for the given zoom level.
   * @param {number} z Integer zoom level.
   * @return {number} Resolution.
   * @api
   */
  getResolution(z) {
    return this.resolutions_[z];
  }
  /**
   * Get the list of resolutions for the tile grid.
   * @return {Array<number>} Resolutions.
   * @api
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary import("../extent.js").Extent object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileCoordChildTileRange(tileCoord, tempTileRange, tempExtent) {
    if (tileCoord[0] < this.maxZoom) {
      if (this.zoomFactor_ === 2) {
        const minX = tileCoord[1] * 2;
        const minY = tileCoord[2] * 2;
        return createOrUpdate2(minX, minX + 1, minY, minY + 1, tempTileRange);
      }
      const tileCoordExtent = this.getTileCoordExtent(tileCoord, tempExtent || this.tmpExtent_);
      return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, tempTileRange);
    }
    return null;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary import("../TileRange.js").default object.
   * @return {import("../TileRange.js").default|null} Tile range.
   */
  getTileRangeForTileCoordAndZ(tileCoord, z, tempTileRange) {
    if (z > this.maxZoom || z < this.minZoom) {
      return null;
    }
    const tileCoordZ = tileCoord[0];
    const tileCoordX = tileCoord[1];
    const tileCoordY = tileCoord[2];
    if (z === tileCoordZ) {
      return createOrUpdate2(tileCoordX, tileCoordY, tileCoordX, tileCoordY, tempTileRange);
    }
    if (this.zoomFactor_) {
      const factor = Math.pow(this.zoomFactor_, z - tileCoordZ);
      const minX = Math.floor(tileCoordX * factor);
      const minY = Math.floor(tileCoordY * factor);
      if (z < tileCoordZ) {
        return createOrUpdate2(minX, minX, minY, minY, tempTileRange);
      }
      const maxX = Math.floor(factor * (tileCoordX + 1)) - 1;
      const maxY = Math.floor(factor * (tileCoordY + 1)) - 1;
      return createOrUpdate2(minX, maxX, minY, maxY, tempTileRange);
    }
    const tileCoordExtent = this.getTileCoordExtent(tileCoord, this.tmpExtent_);
    return this.getTileRangeForExtentAndZ(tileCoordExtent, z, tempTileRange);
  }
  /**
   * Get a tile range for the given extent and integer zoom level.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} z Integer zoom level.
   * @param {import("../TileRange.js").default} [tempTileRange] Temporary tile range object.
   * @return {import("../TileRange.js").default} Tile range.
   */
  getTileRangeForExtentAndZ(extent, z, tempTileRange) {
    this.getTileCoordForXYAndZ_(extent[0], extent[3], z, false, tmpTileCoord);
    const minX = tmpTileCoord[1];
    const minY = tmpTileCoord[2];
    this.getTileCoordForXYAndZ_(extent[2], extent[1], z, true, tmpTileCoord);
    const maxX = tmpTileCoord[1];
    const maxY = tmpTileCoord[2];
    return createOrUpdate2(minX, maxX, minY, maxY, tempTileRange);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {import("../coordinate.js").Coordinate} Tile center.
   */
  getTileCoordCenter(tileCoord) {
    const origin = this.getOrigin(tileCoord[0]);
    const resolution = this.getResolution(tileCoord[0]);
    const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
    return [origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution, origin[1] - (tileCoord[2] + 0.5) * tileSize[1] * resolution];
  }
  /**
   * Get the extent of a tile coordinate.
   *
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} [tempExtent] Temporary extent object.
   * @return {import("../extent.js").Extent} Extent.
   * @api
   */
  getTileCoordExtent(tileCoord, tempExtent) {
    const origin = this.getOrigin(tileCoord[0]);
    const resolution = this.getResolution(tileCoord[0]);
    const tileSize = toSize(this.getTileSize(tileCoord[0]), this.tmpSize_);
    const minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
    const minY = origin[1] - (tileCoord[2] + 1) * tileSize[1] * resolution;
    const maxX = minX + tileSize[0] * resolution;
    const maxY = minY + tileSize[1] * resolution;
    return createOrUpdate(minX, minY, maxX, maxY, tempExtent);
  }
  /**
   * Get the tile coordinate for the given map coordinate and resolution.  This
   * method considers that coordinates that intersect tile boundaries should be
   * assigned the higher tile coordinate.
   *
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndResolution(coordinate, resolution, opt_tileCoord) {
    return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
  }
  /**
   * Note that this method should not be called for resolutions that correspond
   * to an integer zoom level.  Instead call the `getTileCoordForXYAndZ_` method.
   * @param {number} x X.
   * @param {number} y Y.
   * @param {number} resolution Resolution (for a non-integer zoom level).
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndResolution_(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
    const z = this.getZForResolution(resolution);
    const scale4 = resolution / this.getResolution(z);
    const origin = this.getOrigin(z);
    const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
    let tileCoordX = scale4 * (x - origin[0]) / resolution / tileSize[0];
    let tileCoordY = scale4 * (origin[1] - y) / resolution / tileSize[1];
    if (reverseIntersectionPolicy) {
      tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
      tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = floor(tileCoordX, DECIMALS);
      tileCoordY = floor(tileCoordY, DECIMALS);
    }
    return createOrUpdate3(z, tileCoordX, tileCoordY, opt_tileCoord);
  }
  /**
   * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
   * they should have separate implementations.  This method is for integer zoom
   * levels.  The other method should only be called for resolutions corresponding
   * to non-integer zoom levels.
   * @param {number} x Map x coordinate.
   * @param {number} y Map y coordinate.
   * @param {number} z Integer zoom level.
   * @param {boolean} reverseIntersectionPolicy Instead of letting edge
   *     intersections go to the higher tile coordinate, let edge intersections
   *     go to the lower tile coordinate.
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Temporary import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @private
   */
  getTileCoordForXYAndZ_(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
    const origin = this.getOrigin(z);
    const resolution = this.getResolution(z);
    const tileSize = toSize(this.getTileSize(z), this.tmpSize_);
    let tileCoordX = (x - origin[0]) / resolution / tileSize[0];
    let tileCoordY = (origin[1] - y) / resolution / tileSize[1];
    if (reverseIntersectionPolicy) {
      tileCoordX = ceil(tileCoordX, DECIMALS) - 1;
      tileCoordY = ceil(tileCoordY, DECIMALS) - 1;
    } else {
      tileCoordX = floor(tileCoordX, DECIMALS);
      tileCoordY = floor(tileCoordY, DECIMALS);
    }
    return createOrUpdate3(z, tileCoordX, tileCoordY, opt_tileCoord);
  }
  /**
   * Get a tile coordinate given a map coordinate and zoom level.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} z Integer zoom level, e.g. the result of a `getZForResolution()` method call
   * @param {import("../tilecoord.js").TileCoord} [opt_tileCoord] Destination import("../tilecoord.js").TileCoord object.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
   * @api
   */
  getTileCoordForCoordAndZ(coordinate, z, opt_tileCoord) {
    return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {number} Tile resolution.
   */
  getTileCoordResolution(tileCoord) {
    return this.resolutions_[tileCoord[0]];
  }
  /**
   * Get the tile size for a zoom level. The type of the return value matches the
   * `tileSize` or `tileSizes` that the tile grid was configured with. To always
   * get an {@link import("../size.js").Size}, run the result through {@link module:ol/size.toSize}.
   * @param {number} z Z.
   * @return {number|import("../size.js").Size} Tile size.
   * @api
   */
  getTileSize(z) {
    if (this.tileSize_) {
      return this.tileSize_;
    }
    return this.tileSizes_[z];
  }
  /**
   * @param {number} z Zoom level.
   * @return {import("../TileRange.js").default|null} Extent tile range for the specified zoom level.
   */
  getFullTileRange(z) {
    if (!this.fullTileRanges_) {
      return this.extent_ ? this.getTileRangeForExtentAndZ(this.extent_, z) : null;
    }
    return this.fullTileRanges_[z];
  }
  /**
   * @param {number} resolution Resolution.
   * @param {number|import("../array.js").NearestDirectionFunction} [opt_direction]
   *     If 0, the nearest resolution will be used.
   *     If 1, the nearest higher resolution (lower Z) will be used. If -1, the
   *     nearest lower resolution (higher Z) will be used. Default is 0.
   *     Use a {@link module:ol/array~NearestDirectionFunction} for more precise control.
   *
   * For example to change tile Z at the midpoint of zoom levels
   * ```js
   * function(value, high, low) {
   *   return value - low * Math.sqrt(high / low);
   * }
   * ```
   * @return {number} Z.
   * @api
   */
  getZForResolution(resolution, opt_direction) {
    const z = linearFindNearest(this.resolutions_, resolution, opt_direction || 0);
    return clamp(z, this.minZoom, this.maxZoom);
  }
  /**
   * The tile with the provided tile coordinate intersects the given viewport.
   * @param {import('../tilecoord.js').TileCoord} tileCoord Tile coordinate.
   * @param {Array<number>} viewport Viewport as returned from {@link module:ol/extent.getRotatedViewport}.
   * @return {boolean} The tile with the provided tile coordinate intersects the given viewport.
   */
  tileCoordIntersectsViewport(tileCoord, viewport) {
    return intersectsLinearRing(viewport, 0, viewport.length, 2, this.getTileCoordExtent(tileCoord));
  }
  /**
   * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
   * @private
   */
  calculateTileRanges_(extent) {
    const length = this.resolutions_.length;
    const fullTileRanges = new Array(length);
    for (let z = this.minZoom; z < length; ++z) {
      fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
    }
    this.fullTileRanges_ = fullTileRanges;
  }
};
var TileGrid_default = TileGrid;

// node_modules/ol/tilegrid.js
function getForProjection(projection) {
  let tileGrid = projection.getDefaultTileGrid();
  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }
  return tileGrid;
}
function wrapX(tileGrid, tileCoord, projection) {
  const z = tileCoord[0];
  const center = tileGrid.getTileCoordCenter(tileCoord);
  const projectionExtent = extentFromProjection(projection);
  if (!containsCoordinate(projectionExtent, center)) {
    const worldWidth = getWidth(projectionExtent);
    const worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  }
  return tileCoord;
}
function createForExtent(extent, maxZoom2, tileSize, corner) {
  corner = corner !== void 0 ? corner : "top-left";
  const resolutions = resolutionsFromExtent(extent, maxZoom2, tileSize);
  return new TileGrid_default({
    extent,
    origin: getCorner(extent, corner),
    resolutions,
    tileSize
  });
}
function createXYZ(options) {
  const xyzOptions = options || {};
  const extent = xyzOptions.extent || get("EPSG:3857").getExtent();
  const gridOptions = {
    extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize, xyzOptions.maxResolution)
  };
  return new TileGrid_default(gridOptions);
}
function resolutionsFromExtent(extent, maxZoom2, tileSize, maxResolution) {
  maxZoom2 = maxZoom2 !== void 0 ? maxZoom2 : DEFAULT_MAX_ZOOM;
  tileSize = toSize(tileSize !== void 0 ? tileSize : DEFAULT_TILE_SIZE);
  const height = getHeight(extent);
  const width = getWidth(extent);
  maxResolution = maxResolution > 0 ? maxResolution : Math.max(width / tileSize[0], height / tileSize[1]);
  const length = maxZoom2 + 1;
  const resolutions = new Array(length);
  for (let z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }
  return resolutions;
}
function createForProjection(projection, maxZoom2, tileSize, corner) {
  const extent = extentFromProjection(projection);
  return createForExtent(extent, maxZoom2, tileSize, corner);
}
function extentFromProjection(projection) {
  projection = get(projection);
  let extent = projection.getExtent();
  if (!extent) {
    const half = 180 * METERS_PER_UNIT.degrees / projection.getMetersPerUnit();
    extent = createOrUpdate(-half, -half, half, half);
  }
  return extent;
}

// node_modules/ol/uri.js
function appendParams(uri, params) {
  const keyParams = [];
  Object.keys(params).forEach(function(k) {
    if (params[k] !== null && params[k] !== void 0) {
      keyParams.push(k + "=" + encodeURIComponent(params[k]));
    }
  });
  const qs = keyParams.join("&");
  uri = uri.replace(/[?&]$/, "");
  uri += uri.includes("?") ? "&" : "?";
  return uri + qs;
}
var zRegEx = /\{z\}/g;
var xRegEx = /\{x\}/g;
var yRegEx = /\{y\}/g;
var dashYRegEx = /\{-y\}/g;
function renderXYZTemplate(template, z, x, y, maxY) {
  return template.replace(zRegEx, z.toString()).replace(xRegEx, x.toString()).replace(yRegEx, y.toString()).replace(dashYRegEx, function() {
    if (maxY === void 0) {
      throw new Error("If the URL template has a {-y} placeholder, the grid extent must be known");
    }
    return (maxY - y).toString();
  });
}
function pickUrl(urls, z, x, y) {
  const hash2 = hashZXY(z, x, y);
  const index = modulo(hash2, urls.length);
  return urls[index];
}
function expandUrl(url) {
  const urls = [];
  let match = /\{([a-z])-([a-z])\}/.exec(url);
  if (match) {
    const startCharCode = match[1].charCodeAt(0);
    const stopCharCode = match[2].charCodeAt(0);
    let charCode;
    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }
    return urls;
  }
  match = /\{(\d+)-(\d+)\}/.exec(url);
  if (match) {
    const stop = parseInt(match[2], 10);
    for (let i = parseInt(match[1], 10); i <= stop; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }
    return urls;
  }
  urls.push(url);
  return urls;
}

// node_modules/ol/tileurlfunction.js
function createFromTemplate(template, tileGrid) {
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      }
      let maxY;
      const z = tileCoord[0];
      if (tileGrid) {
        const range = tileGrid.getFullTileRange(z);
        if (range) {
          maxY = range.getHeight() - 1;
        }
      }
      return renderXYZTemplate(template, z, tileCoord[1], tileCoord[2], maxY);
    }
  );
}
function createFromTemplates(templates, tileGrid) {
  const len = templates.length;
  const tileUrlFunctions = new Array(len);
  for (let i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }
  return createFromTileUrlFunctions(tileUrlFunctions);
}
function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function(tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return void 0;
      }
      const h = hash(tileCoord);
      const index = modulo(h, tileUrlFunctions.length);
      return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
    }
  );
}
function nullTileUrlFunction(tileCoord, pixelRatio, projection) {
  return void 0;
}

// node_modules/ol/source/Tile.js
var TileSource = class extends Source_default {
  /**
   * @param {Options} options SourceTile source options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX,
      interpolate: options.interpolate
    });
    this.on;
    this.once;
    this.un;
    this.tilePixelRatio_ = options.tilePixelRatio !== void 0 ? options.tilePixelRatio : 1;
    this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : null;
    const tileSize = [256, 256];
    if (this.tileGrid) {
      toSize(this.tileGrid.getTileSize(this.tileGrid.getMinZoom()), tileSize);
    }
    this.tmpSize = [0, 0];
    this.key_ = options.key || getUid(this);
    this.tileOptions = {
      transition: options.transition,
      interpolate: options.interpolate
    };
    this.zDirection = options.zDirection ? options.zDirection : 0;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */
  getGutterForProjection(projection) {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   */
  getKey() {
    return this.key_;
  }
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */
  setKey(key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions(projection) {
    const tileGrid = projection ? this.getTileGridForProjection(projection) : this.tileGrid;
    if (!tileGrid) {
      return null;
    }
    return tileGrid.getResolutions();
  }
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {TileType|null} Tile.
   */
  getTile(z, x, y, pixelRatio, projection) {
    return abstract();
  }
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default|null} Tile grid.
   * @api
   */
  getTileGrid() {
    return this.tileGrid;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */
  getTileGridForProjection(projection) {
    if (!this.tileGrid) {
      return getForProjection(projection);
    }
    return this.tileGrid;
  }
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */
  getTilePixelRatio(pixelRatio) {
    return this.tilePixelRatio_;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */
  getTilePixelSize(z, pixelRatio, projection) {
    const tileGrid = this.getTileGridForProjection(projection);
    const tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
    if (tilePixelRatio == 1) {
      return tileSize;
    }
    return scale2(tileSize, tilePixelRatio, this.tmpSize);
  }
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */
  getTileCoordForTileUrlFunction(tileCoord, projection) {
    const gridProjection = projection !== void 0 ? projection : this.getProjection();
    const tileGrid = projection !== void 0 ? this.getTileGridForProjection(gridProjection) : this.tileGrid || this.getTileGridForProjection(gridProjection);
    if (this.getWrapX() && gridProjection.isGlobal()) {
      tileCoord = wrapX(tileGrid, tileCoord, gridProjection);
    }
    return withinExtentAndZ(tileCoord, tileGrid) ? tileCoord : null;
  }
  /**
   * Remove all cached reprojected tiles from the source. The next render cycle will create new tiles.
   * @api
   */
  clear() {
  }
  /**
   * @override
   */
  refresh() {
    this.clear();
    super.refresh();
  }
};
var TileSourceEvent = class extends Event_default {
  /**
   * @param {string} type Type.
   * @param {import("../Tile.js").default} tile The tile.
   */
  constructor(type, tile) {
    super(type);
    this.tile = tile;
  }
};
var Tile_default4 = TileSource;

// node_modules/ol/source/TileEventType.js
var TileEventType_default = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: "tileloadstart",
  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: "tileloadend",
  /**
   * Triggered if tile loading results in an error. Note that this is not the
   * right place to re-fetch tiles. See {@link module:ol/ImageTile~ImageTile#load}
   * for details.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: "tileloaderror"
};

// node_modules/ol/source/UrlTile.js
var UrlTile = class _UrlTile extends Tile_default4 {
  /**
   * @param {Options} options Image tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tilePixelRatio: options.tilePixelRatio,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: options.interpolate,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    });
    this.generateTileUrlFunction_ = this.tileUrlFunction === _UrlTile.prototype.tileUrlFunction;
    this.tileLoadFunction = options.tileLoadFunction;
    if (options.tileUrlFunction) {
      this.tileUrlFunction = options.tileUrlFunction;
    }
    this.urls = null;
    if (options.urls) {
      this.setUrls(options.urls);
    } else if (options.url) {
      this.setUrl(options.url);
    }
    this.tileLoadingKeys_ = {};
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */
  getTileLoadFunction() {
    return this.tileLoadFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */
  getTileUrlFunction() {
    return Object.getPrototypeOf(this).tileUrlFunction === this.tileUrlFunction ? this.tileUrlFunction.bind(this) : this.tileUrlFunction;
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */
  getUrls() {
    return this.urls;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleTileChange(event) {
    const tile = (
      /** @type {import("../Tile.js").default} */
      event.target
    );
    const uid = getUid(tile);
    const tileState = tile.getState();
    let type;
    if (tileState == TileState_default.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = TileEventType_default.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
    }
    if (type != void 0) {
      this.dispatchEvent(new TileSourceEvent(type, tile));
    }
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */
  setTileLoadFunction(tileLoadFunction) {
    this.tileLoadFunction = tileLoadFunction;
    this.changed();
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string} [key] Optional new tile key for the source.
   * @api
   */
  setTileUrlFunction(tileUrlFunction, key) {
    this.tileUrlFunction = tileUrlFunction;
    if (typeof key !== "undefined") {
      this.setKey(key);
    } else {
      this.changed();
    }
  }
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */
  setUrl(url) {
    const urls = expandUrl(url);
    this.urls = urls;
    this.setUrls(urls);
  }
  /**
   * Deprecated.  Use an ImageTile source instead.
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */
  setUrls(urls) {
    this.urls = urls;
    const key = urls.join("\n");
    if (this.generateTileUrlFunction_) {
      this.setTileUrlFunction(createFromTemplates(urls, this.tileGrid), key);
    } else {
      this.setKey(key);
    }
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {string|undefined} Tile URL.
   */
  tileUrlFunction(tileCoord, pixelRatio, projection) {
    return void 0;
  }
};
var UrlTile_default = UrlTile;

// node_modules/ol/source/TileImage.js
var TileImage = class extends UrlTile_default {
  /**
   * @param {!Options} options Image tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: options.interpolate !== void 0 ? options.interpolate : true,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    });
    this.crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    this.tileClass = options.tileClass !== void 0 ? options.tileClass : ImageTile_default;
    this.tileGridForProjection = {};
    this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
    this.renderReprojectionEdges_ = false;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(projection) {
    if (this.getProjection() && projection && !equivalent(this.getProjection(), projection)) {
      return 0;
    }
    return this.getGutter();
  }
  /**
   * @return {number} Gutter.
   */
  getGutter() {
    return 0;
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */
  getKey() {
    let key = super.getKey();
    if (!this.getInterpolate()) {
      key += ":disable-interpolation";
    }
    return key;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(projection) {
    const thisProj = this.getProjection();
    if (this.tileGrid && (!thisProj || equivalent(thisProj, projection))) {
      return this.tileGrid;
    }
    const projKey = getUid(projection);
    if (!(projKey in this.tileGridForProjection)) {
      this.tileGridForProjection[projKey] = getForProjection(projection);
    }
    return this.tileGridForProjection[projKey];
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!ImageTile} Tile.
   * @private
   */
  createTile_(z, x, y, pixelRatio, projection, key) {
    const tileCoord = [z, x, y];
    const urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    const tileUrl2 = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : void 0;
    const tile = new this.tileClass(tileCoord, tileUrl2 !== void 0 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl2 !== void 0 ? tileUrl2 : "", this.crossOrigin, this.tileLoadFunction, this.tileOptions);
    tile.key = key;
    tile.addEventListener(EventType_default.CHANGE, this.handleTileChange.bind(this));
    return tile;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!(ImageTile|ReprojTile)} Tile.
   * @override
   */
  getTile(z, x, y, pixelRatio, projection) {
    const sourceProjection = this.getProjection();
    if (!sourceProjection || !projection || equivalent(sourceProjection, projection)) {
      return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
    }
    const tileCoord = [z, x, y];
    const key = this.getKey();
    const sourceTileGrid = this.getTileGridForProjection(sourceProjection);
    const targetTileGrid = this.getTileGridForProjection(projection);
    const wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    const tile = new Tile_default2(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), (z2, x2, y2, pixelRatio2) => this.getTileInternal(z2, x2, y2, pixelRatio2, sourceProjection), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_, this.tileOptions);
    tile.key = key;
    return tile;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!ImageTile} Tile.
   * @protected
   */
  getTileInternal(z, x, y, pixelRatio, projection) {
    const key = this.getKey();
    return this.createTile_(z, x, y, pixelRatio, projection, key);
  }
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */
  setRenderReprojectionEdges(render3) {
    if (this.renderReprojectionEdges_ == render3) {
      return;
    }
    this.renderReprojectionEdges_ = render3;
    this.changed();
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(projection, tilegrid) {
    const proj = get(projection);
    if (proj) {
      const projKey = getUid(proj);
      if (!(projKey in this.tileGridForProjection)) {
        this.tileGridForProjection[projKey] = tilegrid;
      }
    }
  }
};
function defaultTileLoadFunction(imageTile, src) {
  imageTile.getImage().src = src;
}
var TileImage_default = TileImage;

// node_modules/ol/source/BingMaps.js
function quadKey(tileCoord) {
  const z = tileCoord[0];
  const digits = new Array(z);
  let mask = 1 << z - 1;
  let i, charCode;
  for (i = 0; i < z; ++i) {
    charCode = 48;
    if (tileCoord[1] & mask) {
      charCode += 1;
    }
    if (tileCoord[2] & mask) {
      charCode += 2;
    }
    digits[i] = String.fromCharCode(charCode);
    mask >>= 1;
  }
  return digits.join("");
}
var TOS_ATTRIBUTION = '<a class="ol-attribution-bing-tos" href="https://www.microsoft.com/maps/product/terms.html" target="_blank">Terms of Use</a>';
var BingMaps = class extends TileImage_default {
  /**
   * @param {Options} options Bing Maps options.
   */
  constructor(options) {
    const hidpi = options.hidpi !== void 0 ? options.hidpi : false;
    super({
      cacheSize: options.cacheSize,
      crossOrigin: "anonymous",
      interpolate: options.interpolate,
      projection: get("EPSG:3857"),
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: hidpi ? 2 : 1,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.hidpi_ = hidpi;
    this.culture_ = options.culture !== void 0 ? options.culture : "en-us";
    this.maxZoom_ = options.maxZoom !== void 0 ? options.maxZoom : -1;
    this.apiKey_ = options.key;
    this.imagerySet_ = options.imagerySet;
    this.placeholderTiles_ = options.placeholderTiles;
    const url = "https://dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.imagerySet_ + "?uriScheme=https&include=ImageryProviders&key=" + this.apiKey_ + "&c=" + this.culture_;
    fetch(url).then((response) => response.json()).then((json) => this.handleImageryMetadataResponse(json));
  }
  /**
   * Get the api key used for this source.
   *
   * @return {string} The api key.
   * @api
   */
  getApiKey() {
    return this.apiKey_;
  }
  /**
   * Get the imagery set associated with this source.
   *
   * @return {string} The imagery set.
   * @api
   */
  getImagerySet() {
    return this.imagerySet_;
  }
  /**
   * @param {BingMapsImageryMetadataResponse} response Response.
   */
  handleImageryMetadataResponse(response) {
    if (response.statusCode != 200 || response.statusDescription != "OK" || response.authenticationResultCode != "ValidCredentials" || response.resourceSets.length != 1 || response.resourceSets[0].resources.length != 1) {
      this.setState("error");
      return;
    }
    const resource = response.resourceSets[0].resources[0];
    const maxZoom2 = this.maxZoom_ == -1 ? resource.zoomMax : this.maxZoom_;
    const sourceProjection = this.getProjection();
    const extent = extentFromProjection(sourceProjection);
    const scale4 = this.hidpi_ ? 2 : 1;
    const tileSize = resource.imageWidth == resource.imageHeight ? resource.imageWidth / scale4 : [resource.imageWidth / scale4, resource.imageHeight / scale4];
    const tileGrid = createXYZ({
      extent,
      minZoom: resource.zoomMin,
      maxZoom: maxZoom2,
      tileSize
    });
    this.tileGrid = tileGrid;
    const culture = this.culture_;
    const hidpi = this.hidpi_;
    const placeholderTiles = this.placeholderTiles_;
    this.tileUrlFunction = createFromTileUrlFunctions(resource.imageUrlSubdomains.map(function(subdomain) {
      const quadKeyTileCoord = [0, 0, 0];
      const imageUrl = resource.imageUrl.replace("{subdomain}", subdomain).replace("{culture}", culture);
      return (
        /**
         * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
         * @param {number} pixelRatio Pixel ratio.
         * @param {import("../proj/Projection.js").default} projection Projection.
         * @return {string|undefined} Tile URL.
         */
        function(tileCoord, pixelRatio, projection) {
          if (!tileCoord) {
            return void 0;
          }
          createOrUpdate3(tileCoord[0], tileCoord[1], tileCoord[2], quadKeyTileCoord);
          const url = new URL(imageUrl.replace("{quadkey}", quadKey(quadKeyTileCoord)));
          const params = url.searchParams;
          if (hidpi) {
            params.set("dpi", "d1");
            params.set("device", "mobile");
          }
          if (placeholderTiles === true) {
            params.delete("n");
          } else if (placeholderTiles === false) {
            params.set("n", "z");
          }
          return url.toString();
        }
      );
    }));
    if (resource.imageryProviders) {
      const transform2 = getTransformFromProjections(get("EPSG:4326"), this.getProjection());
      this.setAttributions((frameState) => {
        const attributions = [];
        const viewState = frameState.viewState;
        const tileGrid2 = this.getTileGrid();
        const z = tileGrid2.getZForResolution(viewState.resolution, this.zDirection);
        const tileCoord = tileGrid2.getTileCoordForCoordAndZ(viewState.center, z);
        const zoom = tileCoord[0];
        resource.imageryProviders.map(function(imageryProvider) {
          let intersecting = false;
          const coverageAreas = imageryProvider.coverageAreas;
          for (let i = 0, ii = coverageAreas.length; i < ii; ++i) {
            const coverageArea = coverageAreas[i];
            if (zoom >= coverageArea.zoomMin && zoom <= coverageArea.zoomMax) {
              const bbox = coverageArea.bbox;
              const epsg4326Extent = [bbox[1], bbox[0], bbox[3], bbox[2]];
              const extent2 = applyTransform(epsg4326Extent, transform2);
              if (intersects(extent2, frameState.extent)) {
                intersecting = true;
                break;
              }
            }
          }
          if (intersecting) {
            attributions.push(imageryProvider.attribution);
          }
        });
        attributions.push(TOS_ATTRIBUTION);
        return attributions;
      });
    }
    this.setState("ready");
  }
};
var BingMaps_default = BingMaps;

// node_modules/ol/source/XYZ.js
var XYZ = class extends TileImage_default {
  /**
   * @param {Options} [options] XYZ options.
   */
  constructor(options) {
    options = options || {};
    const projection = options.projection !== void 0 ? options.projection : "EPSG:3857";
    const tileGrid = options.tileGrid !== void 0 ? options.tileGrid : createXYZ({
      extent: extentFromProjection(projection),
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize
    });
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      attributionsCollapsible: options.attributionsCollapsible,
      zDirection: options.zDirection
    });
    this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
};
var XYZ_default = XYZ;

// node_modules/ol/source/CartoDB.js
var CartoDB = class extends XYZ_default {
  /**
   * @param {Options} options CartoDB options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 18,
      minZoom: options.minZoom,
      projection: options.projection,
      transition: options.transition,
      wrapX: options.wrapX,
      zDirection: options.zDirection
    });
    this.account_ = options.account;
    this.mapId_ = options.map || "";
    this.config_ = options.config || {};
    this.templateCache_ = {};
    this.initializeMap_();
  }
  /**
   * Returns the current config.
   * @return {!Object} The current configuration.
   * @api
   */
  getConfig() {
    return this.config_;
  }
  /**
   * Updates the carto db config.
   * @param {Object} config a key-value lookup. Values will replace current values
   *     in the config.
   * @api
   */
  updateConfig(config) {
    Object.assign(this.config_, config);
    this.initializeMap_();
  }
  /**
   * Sets the CartoDB config
   * @param {Object} config In the case of anonymous maps, a CartoDB configuration
   *     object.
   * If using named maps, a key-value lookup with the template parameters.
   * @api
   */
  setConfig(config) {
    this.config_ = config || {};
    this.initializeMap_();
  }
  /**
   * Issue a request to initialize the CartoDB map.
   * @private
   */
  initializeMap_() {
    const paramHash = JSON.stringify(this.config_);
    if (this.templateCache_[paramHash]) {
      this.applyTemplate_(this.templateCache_[paramHash]);
      return;
    }
    let mapUrl = "https://" + this.account_ + ".carto.com/api/v1/map";
    if (this.mapId_) {
      mapUrl += "/named/" + this.mapId_;
    }
    const client = new XMLHttpRequest();
    client.addEventListener("load", this.handleInitResponse_.bind(this, paramHash));
    client.addEventListener("error", this.handleInitError_.bind(this));
    client.open("POST", mapUrl);
    client.setRequestHeader("Content-type", "application/json");
    client.send(JSON.stringify(this.config_));
  }
  /**
   * Handle map initialization response.
   * @param {string} paramHash a hash representing the parameter set that was used
   *     for the request
   * @param {Event} event Event.
   * @private
   */
  handleInitResponse_(paramHash, event) {
    const client = (
      /** @type {XMLHttpRequest} */
      event.target
    );
    if (!client.status || client.status >= 200 && client.status < 300) {
      let response;
      try {
        response = /** @type {CartoDBLayerInfo} */
        JSON.parse(client.responseText);
      } catch {
        this.setState("error");
        return;
      }
      this.applyTemplate_(response);
      this.templateCache_[paramHash] = response;
      this.setState("ready");
    } else {
      this.setState("error");
    }
  }
  /**
   * @private
   * @param {Event} event Event.
   */
  handleInitError_(event) {
    this.setState("error");
  }
  /**
   * Apply the new tile urls returned by carto db
   * @param {CartoDBLayerInfo} data Result of carto db call.
   * @private
   */
  applyTemplate_(data) {
    const tilesUrl = "https://" + data.cdn_url.https + "/" + this.account_ + "/api/v1/map/" + data.layergroupid + "/{z}/{x}/{y}.png";
    this.setUrl(tilesUrl);
  }
};
var CartoDB_default = CartoDB;

// node_modules/ol/source/Cluster.js
var Cluster = class extends Vector_default {
  /**
   * @param {Options<FeatureType>} [options] Cluster options.
   */
  constructor(options) {
    options = options || {};
    super({
      attributions: options.attributions,
      wrapX: options.wrapX
    });
    this.resolution = void 0;
    this.distance = options.distance !== void 0 ? options.distance : 20;
    this.minDistance = options.minDistance || 0;
    this.interpolationRatio = 0;
    this.features = [];
    this.geometryFunction = options.geometryFunction || function(feature) {
      const geometry = (
        /** @type {Point} */
        feature.getGeometry()
      );
      assert(!geometry || geometry.getType() === "Point", "The default `geometryFunction` can only handle `Point` or null geometries");
      return geometry;
    };
    this.createCustomCluster_ = options.createCluster;
    this.source = null;
    this.boundRefresh_ = this.refresh.bind(this);
    this.updateDistance(this.distance, this.minDistance);
    this.setSource(options.source || null);
  }
  /**
   * Remove all features from the source.
   * @param {boolean} [fast] Skip dispatching of {@link module:ol/source/VectorEventType~VectorEventType#removefeature} events.
   * @api
   * @override
   */
  clear(fast) {
    this.features.length = 0;
    super.clear(fast);
  }
  /**
   * Get the distance in pixels between clusters.
   * @return {number} Distance.
   * @api
   */
  getDistance() {
    return this.distance;
  }
  /**
   * Get a reference to the wrapped source.
   * @return {VectorSource<FeatureType>|null} Source.
   * @api
   */
  getSource() {
    return this.source;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @override
   */
  loadFeatures(extent, resolution, projection) {
    this.source?.loadFeatures(extent, resolution, projection);
    if (resolution !== this.resolution) {
      this.resolution = resolution;
      this.refresh();
    }
  }
  /**
   * Set the distance within which features will be clusterd together.
   * @param {number} distance The distance in pixels.
   * @api
   */
  setDistance(distance) {
    this.updateDistance(distance, this.minDistance);
  }
  /**
   * Set the minimum distance between clusters. Will be capped at the
   * configured distance.
   * @param {number} minDistance The minimum distance in pixels.
   * @api
   */
  setMinDistance(minDistance) {
    this.updateDistance(this.distance, minDistance);
  }
  /**
   * The configured minimum distance between clusters.
   * @return {number} The minimum distance in pixels.
   * @api
   */
  getMinDistance() {
    return this.minDistance;
  }
  /**
   * Replace the wrapped source.
   * @param {VectorSource<FeatureType>|null} source The new source for this instance.
   * @api
   */
  setSource(source) {
    if (this.source) {
      this.source.removeEventListener(EventType_default.CHANGE, this.boundRefresh_);
    }
    this.source = source;
    if (source) {
      source.addEventListener(EventType_default.CHANGE, this.boundRefresh_);
    }
    this.refresh();
  }
  /**
   * Handle the source changing.
   * @override
   */
  refresh() {
    this.clear();
    this.cluster();
    this.addFeatures(this.features);
  }
  /**
   * Update the distances and refresh the source if necessary.
   * @param {number} distance The new distance.
   * @param {number} minDistance The new minimum distance.
   */
  updateDistance(distance, minDistance) {
    const ratio = distance === 0 ? 0 : Math.min(minDistance, distance) / distance;
    const changed = distance !== this.distance || this.interpolationRatio !== ratio;
    this.distance = distance;
    this.minDistance = minDistance;
    this.interpolationRatio = ratio;
    if (changed) {
      this.refresh();
    }
  }
  /**
   * @protected
   */
  cluster() {
    if (this.resolution === void 0 || !this.source) {
      return;
    }
    const extent = createEmpty();
    const mapDistance = this.distance * this.resolution;
    const features = this.source.getFeatures();
    const clustered = {};
    for (let i = 0, ii = features.length; i < ii; i++) {
      const feature = features[i];
      if (!(getUid(feature) in clustered)) {
        const geometry = this.geometryFunction(feature);
        if (geometry) {
          const coordinates = geometry.getCoordinates();
          createOrUpdateFromCoordinate(coordinates, extent);
          buffer(extent, mapDistance, extent);
          const neighbors = this.source.getFeaturesInExtent(extent).filter(function(neighbor) {
            const uid = getUid(neighbor);
            if (uid in clustered) {
              return false;
            }
            clustered[uid] = true;
            return true;
          });
          this.features.push(this.createCluster(neighbors, extent));
        }
      }
    }
  }
  /**
   * @param {Array<FeatureType>} features Features
   * @param {import("../extent.js").Extent} extent The searched extent for these features.
   * @return {Feature} The cluster feature.
   * @protected
   */
  createCluster(features, extent) {
    const centroid = [0, 0];
    for (let i = features.length - 1; i >= 0; --i) {
      const geometry2 = this.geometryFunction(features[i]);
      if (geometry2) {
        add(centroid, geometry2.getCoordinates());
      } else {
        features.splice(i, 1);
      }
    }
    scale(centroid, 1 / features.length);
    const searchCenter = getCenter(extent);
    const ratio = this.interpolationRatio;
    const geometry = new Point_default([centroid[0] * (1 - ratio) + searchCenter[0] * ratio, centroid[1] * (1 - ratio) + searchCenter[1] * ratio]);
    if (this.createCustomCluster_) {
      return this.createCustomCluster_(geometry, features);
    }
    return new Feature_default({
      geometry,
      features
    });
  }
};
var Cluster_default = Cluster;

// node_modules/ol/vec/mat4.js
function create2() {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}
function orthographic(left, right, bottom, top, near, far, out) {
  out = out ?? create2();
  const lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}
function scale3(m, x, y, z, out) {
  out = out ?? create2();
  out[0] = m[0] * x;
  out[1] = m[1] * x;
  out[2] = m[2] * x;
  out[3] = m[3] * x;
  out[4] = m[4] * y;
  out[5] = m[5] * y;
  out[6] = m[6] * y;
  out[7] = m[7] * y;
  out[8] = m[8] * z;
  out[9] = m[9] * z;
  out[10] = m[10] * z;
  out[11] = m[11] * z;
  out[12] = m[12];
  out[13] = m[13];
  out[14] = m[14];
  out[15] = m[15];
  return out;
}
function translate(m, x, y, z, out) {
  out = out ?? create2();
  let a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
  if (m === out) {
    out[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
    out[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
    out[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
    out[15] = m[3] * x + m[7] * y + m[11] * z + m[15];
  } else {
    a00 = m[0];
    a01 = m[1];
    a02 = m[2];
    a03 = m[3];
    a10 = m[4];
    a11 = m[5];
    a12 = m[6];
    a13 = m[7];
    a20 = m[8];
    a21 = m[9];
    a22 = m[10];
    a23 = m[11];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a03;
    out[4] = a10;
    out[5] = a11;
    out[6] = a12;
    out[7] = a13;
    out[8] = a20;
    out[9] = a21;
    out[10] = a22;
    out[11] = a23;
    out[12] = a00 * x + a10 * y + a20 * z + m[12];
    out[13] = a01 * x + a11 * y + a21 * z + m[13];
    out[14] = a02 * x + a12 * y + a22 * z + m[14];
    out[15] = a03 * x + a13 * y + a23 * z + m[15];
  }
  return out;
}
function translation(x, y, z, out) {
  out = out ?? create2();
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = x;
  out[13] = y;
  out[14] = z;
  out[15] = 1;
  return out;
}

// node_modules/ol/webgl/Canvas.js
var VERTEX_SHADER = `
  attribute vec4 a_position;
  attribute vec4 a_texcoord;

  uniform mat4 u_matrix;
  uniform mat4 u_textureMatrix;

  varying vec2 v_texcoord;

  void main() {
    gl_Position = u_matrix * a_position;
    vec2 texcoord = (u_textureMatrix * a_texcoord).xy;
    v_texcoord = texcoord;
  }
`;
var FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (
      v_texcoord.x < 0.0 ||
      v_texcoord.y < 0.0 ||
      v_texcoord.x > 1.0 ||
      v_texcoord.y > 1.0
    ) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
var Canvas = class {
  /**
   * @param {WebGLRenderingContext} gl Context to render in.
   */
  constructor(gl) {
    this.gl_ = gl;
    this.program_ = createProgram(gl, FRAGMENT_SHADER, VERTEX_SHADER);
    this.positionLocation = gl.getAttribLocation(this.program_, "a_position");
    this.texcoordLocation = gl.getAttribLocation(this.program_, "a_texcoord");
    this.matrixLocation = gl.getUniformLocation(this.program_, "u_matrix");
    this.textureMatrixLocation = gl.getUniformLocation(this.program_, "u_textureMatrix");
    this.textureLocation = gl.getUniformLocation(this.program_, "u_texture");
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    this.positions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
    this.texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    this.texcoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texcoords), gl.STATIC_DRAW);
  }
  /**
   * 2dContext drawImage call implemented in webgl.
   * Unlike images, textures do not have a width and height associated
   * with them so we'll pass in the width and height of the texture.
   *
   * @param {WebGLTexture} tex Image to draw.
   * @param {number} texWidth Image width.
   * @param {number} texHeight Image height.
   * @param {number} srcX Top-left x-point to read src image.
   * @param {number} srcY Top-left y-point to read src image.
   * @param {number} [srcWidth] Width of source to read.
   * @param {number} [srcHeight] Height of source to read.
   * @param {number} [dstX] Top-left x-point of destination.
   * @param {number} [dstY] Top-left y-point of destination.
   * @param {number} [dstWidth] Width of written image in destination.
   * @param {number} [dstHeight] Height of written image in destination.
   * @param {number} [width] Width of canvas.
   * @param {number} [height] Height of canvas.
   */
  drawImage(tex, texWidth, texHeight, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight, width, height) {
    const gl = this.gl_;
    if (dstX === void 0) {
      dstX = srcX;
    }
    if (dstY === void 0) {
      dstY = srcY;
    }
    if (srcWidth === void 0) {
      srcWidth = texWidth;
    }
    if (srcHeight === void 0) {
      srcHeight = texHeight;
    }
    if (dstWidth === void 0) {
      dstWidth = srcWidth;
    }
    if (dstHeight === void 0) {
      dstHeight = srcHeight;
    }
    if (width === void 0) {
      width = gl.canvas.width;
    }
    if (height === void 0) {
      height = gl.canvas.height;
    }
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.useProgram(this.program_);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texcoordBuffer);
    gl.enableVertexAttribArray(this.texcoordLocation);
    gl.vertexAttribPointer(this.texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    let matrix = orthographic(0, width, 0, height, -1, 1);
    matrix = translate(matrix, dstX, dstY, 0);
    matrix = scale3(matrix, dstWidth, dstHeight, 1);
    gl.uniformMatrix4fv(this.matrixLocation, false, matrix);
    let texMatrix = translation(srcX / texWidth, srcY / texHeight, 0);
    texMatrix = scale3(texMatrix, srcWidth / texWidth, srcHeight / texHeight, 1);
    gl.uniformMatrix4fv(this.textureMatrixLocation, false, texMatrix);
    gl.uniform1i(this.textureLocation, 0);
    gl.drawArrays(gl.TRIANGLES, 0, this.positions.length / 2);
  }
};
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (shader === null) {
    throw new Error("Shader compilation failed");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    if (log === null) {
      throw new Error("Shader info log creation failed");
    }
    throw new Error(log);
  }
  return shader;
}
function createProgram(gl, fragmentSource, vertexSource) {
  const program = gl.createProgram();
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (program === null) {
    throw new Error("Program creation failed");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    if (log === null) {
      throw new Error("Program info log creation failed");
    }
    throw new Error();
  }
  return program;
}

// node_modules/ol/reproj/glreproj.js
var EDGE_VERTEX_SHADER = `
  attribute vec4 a_position;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
  }
`;
var EDGE_FRAGMENT_SHADER = `
  precision mediump float;

  uniform vec4 u_val;
  void main() {
     gl_FragColor = u_val;
  }
`;
var TRIANGLE_VERTEX_SHADER = `
  attribute vec4 a_position;
  attribute vec2 a_texcoord;

  varying vec2 v_texcoord;

  uniform mat4 u_matrix;

  void main() {
     gl_Position = u_matrix * a_position;
     v_texcoord = a_texcoord;
  }
`;
var TRIANGLE_FRAGMENT_SHADER = `
  precision mediump float;

  varying vec2 v_texcoord;

  uniform sampler2D u_texture;

  void main() {
    if (v_texcoord.x < 0.0 || v_texcoord.x > 1.0 || v_texcoord.y < 0.0 || v_texcoord.y > 1.0) {
      discard;
    }
    gl_FragColor = texture2D(u_texture, v_texcoord);
  }
`;
function createCanvasContextWebGL(width, height, canvasPool, settings) {
  let canvas;
  if (canvasPool && canvasPool.length) {
    canvas = /** @type {HTMLCanvasElement} */
    canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(width || 300, height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (width) {
    canvas.width = width;
  }
  if (height) {
    canvas.height = height;
  }
  return (
    /** @type {WebGLRenderingContext} */
    canvas.getContext("webgl", settings)
  );
}
function releaseGLCanvas(gl) {
  const canvas = gl.canvas;
  canvas.width = 1;
  canvas.height = 1;
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}
var canvasGLPool = [];
function render2(gl, width_, height_, pixelRatio, sourceResolution, targetResolution, targetExtent, triangulation, sources, gutter, dataType, renderEdges, interpolate, drawSingle) {
  const width = Math.round(pixelRatio * width_);
  const height = Math.round(pixelRatio * height_);
  gl.canvas.width = width;
  gl.canvas.height = height;
  let resultFrameBuffer;
  let resultTexture;
  {
    resultTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, resultTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (interpolate) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, dataType, null);
    resultFrameBuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, resultFrameBuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, resultTexture, 0);
  }
  if (resultFrameBuffer === null) {
    throw new Error("Could not create framebuffer");
  }
  if (resultTexture === null) {
    throw new Error("Could not create texture");
  }
  if (sources.length === 0) {
    return {
      width,
      height,
      framebuffer: resultFrameBuffer,
      texture: resultTexture
    };
  }
  const sourceDataExtent = createEmpty();
  sources.forEach(function(src, i, arr) {
    extend(sourceDataExtent, src.extent);
  });
  let stitchTexture;
  let stitchWidth;
  let stitchHeight;
  const stitchScale = 1 / sourceResolution;
  if (!drawSingle || sources.length !== 1 || gutter !== 0) {
    stitchTexture = gl.createTexture();
    if (resultTexture === null) {
      throw new Error("Could not create texture");
    }
    stitchWidth = Math.round(getWidth(sourceDataExtent) * stitchScale);
    stitchHeight = Math.round(getHeight(sourceDataExtent) * stitchScale);
    const maxTexSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const largeSide = Math.max(stitchWidth, stitchHeight);
    const scaleFactor = largeSide > maxTexSize ? maxTexSize / largeSide : 1;
    const stitchWidthFixed = Math.round(stitchWidth * scaleFactor);
    const stitchHeightFixed = Math.round(stitchHeight * scaleFactor);
    gl.bindTexture(gl.TEXTURE_2D, stitchTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (interpolate) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, stitchWidthFixed, stitchHeightFixed, 0, gl.RGBA, dataType, null);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, stitchTexture, 0);
    const webGLCanvas = new Canvas(gl);
    sources.forEach(function(src, i, arr) {
      const xPos = (src.extent[0] - sourceDataExtent[0]) * stitchScale * scaleFactor;
      const yPos = -(src.extent[3] - sourceDataExtent[3]) * stitchScale * scaleFactor;
      const srcWidth = getWidth(src.extent) * stitchScale * scaleFactor;
      const srcHeight = getHeight(src.extent) * stitchScale * scaleFactor;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.viewport(0, 0, stitchWidthFixed, stitchHeightFixed);
      if (src.clipExtent) {
        const xPos2 = (src.clipExtent[0] - sourceDataExtent[0]) * stitchScale * scaleFactor;
        const yPos2 = -(src.clipExtent[3] - sourceDataExtent[3]) * stitchScale * scaleFactor;
        const width2 = getWidth(src.clipExtent) * stitchScale * scaleFactor;
        const height2 = getHeight(src.clipExtent) * stitchScale * scaleFactor;
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(interpolate ? xPos2 : Math.round(xPos2), interpolate ? yPos2 : Math.round(yPos2), interpolate ? width2 : Math.round(xPos2 + width2) - Math.round(xPos2), interpolate ? height2 : Math.round(yPos2 + height2) - Math.round(yPos2));
      }
      webGLCanvas.drawImage(src.texture, src.width, src.height, gutter, gutter, src.width - 2 * gutter, src.height - 2 * gutter, interpolate ? xPos : Math.round(xPos), interpolate ? yPos : Math.round(yPos), interpolate ? srcWidth : Math.round(xPos + srcWidth) - Math.round(xPos), interpolate ? srcHeight : Math.round(yPos + srcHeight) - Math.round(yPos), stitchWidthFixed, stitchHeightFixed);
      gl.disable(gl.SCISSOR_TEST);
    });
    gl.deleteFramebuffer(fb);
  } else {
    stitchTexture = sources[0].texture;
    stitchWidth = sources[0].width;
    stitchHeight = sources[0].width;
  }
  const targetTopLeft = getTopLeft(targetExtent);
  const sourceTopLeft = getTopLeft(sourceDataExtent);
  const getUVs = (target) => {
    const u0 = (target[0][0] - targetTopLeft[0]) / targetResolution * pixelRatio;
    const v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution * pixelRatio;
    const u1 = (target[1][0] - targetTopLeft[0]) / targetResolution * pixelRatio;
    const v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution * pixelRatio;
    const u2 = (target[2][0] - targetTopLeft[0]) / targetResolution * pixelRatio;
    const v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution * pixelRatio;
    return {
      u1,
      v1,
      u0,
      v0,
      u2,
      v2
    };
  };
  gl.bindFramebuffer(gl.FRAMEBUFFER, resultFrameBuffer);
  gl.viewport(0, 0, width, height);
  {
    const vertices = [];
    const texcoords = [];
    const triProgram = createProgram(gl, TRIANGLE_FRAGMENT_SHADER, TRIANGLE_VERTEX_SHADER);
    gl.useProgram(triProgram);
    const textureLocation = gl.getUniformLocation(triProgram, "u_texture");
    gl.bindTexture(gl.TEXTURE_2D, stitchTexture);
    gl.uniform1i(textureLocation, 0);
    triangulation.getTriangles().forEach(function(triangle, i, arr) {
      const source = triangle.source;
      const target = triangle.target;
      const {
        u1,
        v1,
        u0,
        v0,
        u2,
        v2
      } = getUVs(target);
      const su0 = (source[0][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
      const sv0 = -(source[0][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
      const su1 = (source[1][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
      const sv1 = -(source[1][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
      const su2 = (source[2][0] - sourceTopLeft[0]) / sourceResolution / stitchWidth;
      const sv2 = -(source[2][1] - sourceTopLeft[1]) / sourceResolution / stitchHeight;
      vertices.push(u1, v1, u0, v0, u2, v2);
      texcoords.push(su1, sv1, su0, sv0, su2, sv2);
    });
    const matrix = orthographic(0, width, height, 0, -1, 1);
    const matrixLocation = gl.getUniformLocation(triProgram, "u_matrix");
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    const positionLocation = gl.getAttribLocation(triProgram, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    const texcoordLocation = gl.getAttribLocation(triProgram, "a_texcoord");
    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
  }
  if (renderEdges) {
    const edgeProgram = createProgram(gl, EDGE_FRAGMENT_SHADER, EDGE_VERTEX_SHADER);
    gl.useProgram(edgeProgram);
    const matrix = orthographic(0, width, height, 0, -1, 1);
    const matrixLocation = gl.getUniformLocation(edgeProgram, "u_matrix");
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    const burnval = Array.isArray(renderEdges) ? renderEdges : [0, 0, 0, 255];
    const burnvalLocation = gl.getUniformLocation(edgeProgram, "u_val");
    const isFloat = true;
    if (isFloat) {
      gl.uniform4fv(burnvalLocation, burnval);
    } else {
      gl.uniform4iv(burnvalLocation, burnval);
    }
    const positionLocation = gl.getAttribLocation(edgeProgram, "a_position");
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    const lines = triangulation.getTriangles().reduce(function(lines2, triangle) {
      const target = triangle.target;
      const {
        u1,
        v1,
        u0,
        v0,
        u2,
        v2
      } = getUVs(target);
      return lines2.concat([u1, v1, u0, v0, u0, v0, u2, v2, u2, v2, u1, v1]);
    }, []);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lines), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINES, 0, lines.length / 2);
  }
  return {
    width,
    height,
    framebuffer: resultFrameBuffer,
    texture: resultTexture
  };
}

// node_modules/ol/reproj/DataTile.js
var ReprojDataTile = class extends DataTile_default {
  /**
   * @param {Options} options Tile options.
   */
  constructor(options) {
    super({
      tileCoord: options.tileCoord,
      loader: () => Promise.resolve(new Uint8ClampedArray(4)),
      interpolate: options.interpolate,
      transition: options.transition
    });
    this.renderEdges_ = options.renderEdges !== void 0 ? options.renderEdges : false;
    this.pixelRatio_ = options.pixelRatio;
    this.gutter_ = options.gutter;
    this.reprojData_ = null;
    this.reprojError_ = null;
    this.reprojSize_ = void 0;
    this.sourceTileGrid_ = options.sourceTileGrid;
    this.targetTileGrid_ = options.targetTileGrid;
    this.wrappedTileCoord_ = options.wrappedTileCoord || options.tileCoord;
    this.sourceTiles_ = [];
    this.sourcesListenerKeys_ = null;
    this.sourceZ_ = 0;
    const sourceProj = options.sourceProj;
    const sourceProjExtent = sourceProj.getExtent();
    const sourceTileGridExtent = options.sourceTileGrid.getExtent();
    this.clipExtent_ = sourceProj.canWrapX() ? sourceTileGridExtent ? getIntersection(sourceProjExtent, sourceTileGridExtent) : sourceProjExtent : sourceTileGridExtent;
    const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
    const maxTargetExtent = this.targetTileGrid_.getExtent();
    let maxSourceExtent = this.sourceTileGrid_.getExtent();
    const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
    if (getArea(limitedTargetExtent) === 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = getIntersection(maxSourceExtent, sourceProjExtent);
      }
    }
    const targetResolution = this.targetTileGrid_.getResolution(this.wrappedTileCoord_[0]);
    const targetProj = options.targetProj;
    const sourceResolution = calculateSourceExtentResolution(sourceProj, targetProj, limitedTargetExtent, targetResolution);
    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    const errorThresholdInPixels = options.errorThreshold !== void 0 ? options.errorThreshold : ERROR_THRESHOLD;
    this.triangulation_ = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution, options.transformMatrix);
    if (this.triangulation_.getTriangles().length === 0) {
      this.state = TileState_default.EMPTY;
      return;
    }
    this.sourceZ_ = this.sourceTileGrid_.getZForResolution(sourceResolution);
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
        const sourceRange = this.sourceTileGrid_.getTileRangeForExtentAndZ(extent, this.sourceZ_);
        const getTile = options.getTileFunction;
        for (let srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
          for (let srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
            const tile = getTile(this.sourceZ_, srcX, srcY, this.pixelRatio_);
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
   * Get the tile size.
   * @return {import('../size.js').Size} Tile size.
   * @override
   */
  getSize() {
    return this.reprojSize_;
  }
  /**
   * Get the data for the tile.
   * @return {import("../DataTile.js").Data} Tile data.
   * @override
   */
  getData() {
    return this.reprojData_;
  }
  /**
   * Get any loading error.
   * @return {Error} Loading error.
   * @override
   */
  getError() {
    return this.reprojError_;
  }
  /**
   * @private
   */
  reproject_() {
    const dataSources = [];
    let imageLike = false;
    this.sourceTiles_.forEach((source) => {
      const tile = source.tile;
      if (!tile || tile.getState() !== TileState_default.LOADED) {
        return;
      }
      const size2 = tile.getSize();
      const gutter = this.gutter_;
      let tileData;
      const arrayData = asArrayLike(tile.getData());
      if (arrayData) {
        tileData = arrayData;
      } else {
        imageLike = true;
        tileData = toArray(asImageLike(tile.getData()));
      }
      const pixelSize = [size2[0] + 2 * gutter, size2[1] + 2 * gutter];
      const isFloat = tileData instanceof Float32Array;
      const pixelCount = pixelSize[0] * pixelSize[1];
      const DataType = isFloat ? Float32Array : Uint8ClampedArray;
      const tileDataR = new DataType(tileData.buffer);
      const bytesPerElement = DataType.BYTES_PER_ELEMENT;
      const bytesPerPixel = bytesPerElement * tileDataR.length / pixelCount;
      const bytesPerRow = tileDataR.byteLength / pixelSize[1];
      const bandCount2 = Math.floor(bytesPerRow / bytesPerElement / pixelSize[0]);
      const extent = this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord);
      extent[0] += source.offset;
      extent[2] += source.offset;
      const clipExtent = this.clipExtent_?.slice();
      if (clipExtent) {
        clipExtent[0] += source.offset;
        clipExtent[2] += source.offset;
      }
      dataSources.push({
        extent,
        clipExtent,
        data: tileDataR,
        dataType: DataType,
        bytesPerPixel,
        pixelSize,
        bandCount: bandCount2
      });
    });
    this.sourceTiles_.length = 0;
    if (dataSources.length === 0) {
      this.state = TileState_default.ERROR;
      this.changed();
      return;
    }
    const z = this.wrappedTileCoord_[0];
    const size = this.targetTileGrid_.getTileSize(z);
    const targetWidth = typeof size === "number" ? size : size[0];
    const targetHeight = typeof size === "number" ? size : size[1];
    const outWidth = targetWidth * this.pixelRatio_;
    const outHeight = targetHeight * this.pixelRatio_;
    const targetResolution = this.targetTileGrid_.getResolution(z);
    const sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
    const targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
    const bandCount = dataSources[0].bandCount;
    const dataR = new dataSources[0].dataType(bandCount * outWidth * outHeight);
    const gl = createCanvasContextWebGL(outWidth, outHeight, canvasGLPool, {
      premultipliedAlpha: false,
      antialias: false
    });
    let willInterpolate;
    const format = gl.RGBA;
    let textureType;
    if (dataSources[0].dataType == Float32Array) {
      textureType = gl.FLOAT;
      gl.getExtension("WEBGL_color_buffer_float");
      gl.getExtension("OES_texture_float");
      gl.getExtension("EXT_float_blend");
      const extension = gl.getExtension("OES_texture_float_linear");
      const canInterpolate = extension !== null;
      willInterpolate = canInterpolate && this.interpolate;
    } else {
      textureType = gl.UNSIGNED_BYTE;
      willInterpolate = this.interpolate;
    }
    const BANDS_PR_REPROJ = 4;
    const reprojs = Math.ceil(bandCount / BANDS_PR_REPROJ);
    for (let reproj = reprojs - 1; reproj >= 0; --reproj) {
      const sources = [];
      for (let i = 0, len = dataSources.length; i < len; ++i) {
        const dataSource = dataSources[i];
        const pixelSize = dataSource.pixelSize;
        const width2 = pixelSize[0];
        const height2 = pixelSize[1];
        const data2 = new dataSource.dataType(BANDS_PR_REPROJ * width2 * height2);
        const dataS = dataSource.data;
        let offset2 = reproj * BANDS_PR_REPROJ;
        for (let j = 0, len2 = data2.length; j < len2; j += BANDS_PR_REPROJ) {
          data2[j] = dataS[offset2];
          data2[j + 1] = dataS[offset2 + 1];
          data2[j + 2] = dataS[offset2 + 2];
          data2[j + 3] = dataS[offset2 + 3];
          offset2 += bandCount;
        }
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        if (willInterpolate) {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        } else {
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        }
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width2, height2, 0, format, textureType, data2);
        sources.push({
          extent: dataSource.extent,
          clipExtent: dataSource.clipExtent,
          texture,
          width: width2,
          height: height2
        });
      }
      const {
        framebuffer,
        width,
        height
      } = render2(gl, targetWidth, targetHeight, this.pixelRatio_, sourceResolution, targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, textureType, this.renderEdges_, willInterpolate);
      const rows = width;
      const cols = height * BANDS_PR_REPROJ;
      const data = new dataSources[0].dataType(rows * cols);
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.readPixels(0, 0, width, height, gl.RGBA, textureType, data);
      let offset = reproj * BANDS_PR_REPROJ;
      for (let i = 0, len = data.length; i < len; i += BANDS_PR_REPROJ) {
        const flipY = (rows - 1 - (i / cols | 0)) * cols + i % cols;
        dataR[offset] = data[flipY];
        dataR[offset + 1] = data[flipY + 1];
        dataR[offset + 2] = data[flipY + 2];
        dataR[offset + 3] = data[flipY + 3];
        offset += bandCount;
      }
    }
    releaseGLCanvas(gl);
    canvasGLPool.push(gl.canvas);
    if (imageLike) {
      const context = createCanvasContext2D(targetWidth, targetHeight);
      const imageData = new ImageData(dataR, targetWidth);
      context.putImageData(imageData, 0, 0);
      this.reprojData_ = context.canvas;
    } else {
      this.reprojData_ = dataR;
    }
    this.reprojSize_ = [Math.round(outWidth), Math.round(outHeight)];
    this.state = TileState_default.LOADED;
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state !== TileState_default.IDLE && this.state !== TileState_default.ERROR) {
      return;
    }
    this.state = TileState_default.LOADING;
    this.changed();
    let leftToLoad = 0;
    this.sourcesListenerKeys_ = [];
    this.sourceTiles_.forEach(({
      tile
    }) => {
      const state = tile.getState();
      if (state !== TileState_default.IDLE && state !== TileState_default.LOADING) {
        return;
      }
      leftToLoad++;
      const sourceListenKey = listen(tile, EventType_default.CHANGE, () => {
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
    });
    if (leftToLoad === 0) {
      setTimeout(this.reproject_.bind(this), 0);
    } else {
      this.sourceTiles_.forEach(function({
        tile
      }) {
        const state = tile.getState();
        if (state == TileState_default.IDLE) {
          tile.load();
        }
      });
    }
  }
  /**
   * @private
   */
  unlistenSources_() {
    this.sourcesListenerKeys_.forEach(unlistenByKey);
    this.sourcesListenerKeys_ = null;
  }
};
var DataTile_default2 = ReprojDataTile;

// node_modules/ol/source/DataTile.js
var DataTileSource = class extends Tile_default4 {
  /**
   * @param {Options} options DataTile source options.
   */
  constructor(options) {
    const projection = options.projection === void 0 ? "EPSG:3857" : options.projection;
    let tileGrid = options.tileGrid;
    if (tileGrid === void 0 && projection) {
      tileGrid = createXYZ({
        extent: extentFromProjection(projection),
        maxResolution: options.maxResolution,
        maxZoom: options.maxZoom,
        minZoom: options.minZoom,
        tileSize: options.tileSize
      });
    }
    super({
      cacheSize: 0.1,
      // don't cache on the source
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection,
      tileGrid,
      state: options.state,
      wrapX: options.wrapX,
      transition: options.transition,
      interpolate: options.interpolate,
      key: options.key,
      zDirection: options.zDirection
    });
    this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
    this.tileSize_ = options.tileSize ? toSize(options.tileSize) : null;
    this.tileSizes_ = null;
    this.tileLoadingKeys_ = {};
    this.loader_ = options.loader;
    this.handleTileChange_ = this.handleTileChange_.bind(this);
    this.bandCount = options.bandCount === void 0 ? 4 : options.bandCount;
    this.tileGridForProjection_ = {};
    this.crossOrigin_ = options.crossOrigin || "anonymous";
    this.transformMatrix = null;
  }
  /**
   * Set the source tile sizes.  The length of the array is expected to match the number of
   * levels in the tile grid.
   * @protected
   * @param {Array<import('../size.js').Size>} tileSizes An array of tile sizes.
   */
  setTileSizes(tileSizes) {
    this.tileSizes_ = tileSizes;
  }
  /**
   * Get the source tile size at the given zoom level.  This may be different than the rendered tile
   * size.
   * @protected
   * @param {number} z Tile zoom level.
   * @return {import('../size.js').Size} The source tile size.
   */
  getTileSize(z) {
    if (this.tileSizes_) {
      return this.tileSizes_[z];
    }
    if (this.tileSize_) {
      return this.tileSize_;
    }
    const tileGrid = this.getTileGrid();
    return tileGrid ? toSize(tileGrid.getTileSize(z)) : [256, 256];
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   * @override
   */
  getGutterForProjection(projection) {
    const thisProj = this.getProjection();
    if ((!thisProj || equivalent(thisProj, projection)) && !this.transformMatrix) {
      return this.gutter_;
    }
    return 0;
  }
  /**
   * @param {Loader} loader The data loader.
   * @protected
   */
  setLoader(loader) {
    this.loader_ = loader;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} targetProj The output projection.
   * @param {import("../proj/Projection.js").default} sourceProj The input projection.
   * @return {!TileType} Tile.
   */
  getReprojTile_(z, x, y, targetProj, sourceProj) {
    const sourceTileGrid = this.tileGrid || this.getTileGridForProjection(sourceProj || targetProj);
    const reprojTilePixelRatio = Math.max.apply(null, sourceTileGrid.getResolutions().map((r, z2) => {
      const tileSize = toSize(sourceTileGrid.getTileSize(z2));
      const textureSize = this.getTileSize(z2);
      return Math.max(textureSize[0] / tileSize[0], textureSize[1] / tileSize[1]);
    }));
    const targetTileGrid = this.getTileGridForProjection(targetProj);
    const tileCoord = [z, x, y];
    const wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, targetProj);
    const options = Object.assign(
      {
        sourceProj: sourceProj || targetProj,
        sourceTileGrid,
        targetProj,
        targetTileGrid,
        tileCoord,
        wrappedTileCoord,
        pixelRatio: reprojTilePixelRatio,
        gutter: this.gutter_,
        getTileFunction: (z2, x2, y2, pixelRatio) => this.getTile(z2, x2, y2, pixelRatio),
        transformMatrix: this.transformMatrix
      },
      /** @type {import("../reproj/DataTile.js").Options} */
      this.tileOptions
    );
    const tile = (
      /** @type {TileType} */
      /** @type {*} */
      new DataTile_default2(options)
    );
    tile.key = this.getKey();
    return tile;
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} [projection] Projection.
   * @return {TileType|null} Tile (or null if outside source extent).
   * @override
   */
  getTile(z, x, y, pixelRatio, projection) {
    const sourceProjection = this.getProjection();
    if (projection && (sourceProjection && !equivalent(sourceProjection, projection) || this.transformMatrix)) {
      return this.getReprojTile_(z, x, y, projection, sourceProjection);
    }
    const size = this.getTileSize(z);
    const sourceLoader = this.loader_;
    const controller = new AbortController();
    const loaderOptions = {
      signal: controller.signal,
      crossOrigin: this.crossOrigin_
    };
    const tileCoord = this.getTileCoordForTileUrlFunction([z, x, y]);
    if (!tileCoord) {
      return null;
    }
    const requestZ = tileCoord[0];
    const requestX = tileCoord[1];
    const requestY = tileCoord[2];
    const range = this.getTileGrid()?.getFullTileRange(requestZ);
    if (range) {
      loaderOptions.maxY = range.getHeight() - 1;
    }
    function loader() {
      return toPromise(function() {
        return sourceLoader(requestZ, requestX, requestY, loaderOptions);
      });
    }
    const options = Object.assign({
      tileCoord: [z, x, y],
      loader,
      size,
      controller
    }, this.tileOptions);
    const tile = (
      /** @type {TileType} */
      /** @type {*} */
      new DataTile_default(options)
    );
    tile.key = this.getKey();
    tile.addEventListener(EventType_default.CHANGE, this.handleTileChange_);
    return tile;
  }
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   */
  handleTileChange_(event) {
    const tile = (
      /** @type {import("../Tile.js").default} */
      event.target
    );
    const uid = getUid(tile);
    const tileState = tile.getState();
    let type;
    if (tileState == TileState_default.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = TileEventType_default.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == TileState_default.ERROR ? TileEventType_default.TILELOADERROR : tileState == TileState_default.LOADED ? TileEventType_default.TILELOADEND : void 0;
    }
    if (type) {
      this.dispatchEvent(new TileSourceEvent(type, tile));
    }
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(projection) {
    const thisProj = this.getProjection();
    if (this.tileGrid && (!thisProj || equivalent(thisProj, projection)) && !this.transformMatrix) {
      return this.tileGrid;
    }
    const projKey = getUid(projection);
    if (!(projKey in this.tileGridForProjection_)) {
      this.tileGridForProjection_[projKey] = getForProjection(projection);
    }
    return this.tileGridForProjection_[projKey];
  }
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */
  setTileGridForProjection(projection, tilegrid) {
    const proj = get(projection);
    if (proj) {
      const projKey = getUid(proj);
      if (!(projKey in this.tileGridForProjection_)) {
        this.tileGridForProjection_[projKey] = tilegrid;
      }
    }
  }
};
var DataTile_default3 = DataTileSource;

// node_modules/@petamoriken/float16/src/_util/messages.mjs
var THIS_IS_NOT_AN_OBJECT = "This is not an object";
var THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT = "This is not a Float16Array object";
var THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY = "This constructor is not a subclass of Float16Array";
var THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT = "The constructor property value is not an object";
var SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT = "Species constructor didn't return TypedArray object";
var DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH = "Derived constructor created TypedArray object which was too small length";
var ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER = "Attempting to access detached ArrayBuffer";
var CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT = "Cannot convert undefined or null to object";
var CANNOT_MIX_BIGINT_AND_OTHER_TYPES = "Cannot mix BigInt and other types, use explicit conversions";
var ITERATOR_PROPERTY_IS_NOT_CALLABLE = "@@iterator property is not callable";
var REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE = "Reduce of empty array with no initial value";
var THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED = "The comparison function must be either a function or undefined";
var OFFSET_IS_OUT_OF_BOUNDS = "Offset is out of bounds";

// node_modules/@petamoriken/float16/src/_util/primordials.mjs
function uncurryThis(target) {
  return (thisArg, ...args) => {
    return ReflectApply(target, thisArg, args);
  };
}
function uncurryThisGetter(target, key) {
  return uncurryThis(ReflectGetOwnPropertyDescriptor(target, key).get);
}
var {
  apply: ReflectApply,
  construct: ReflectConstruct,
  defineProperty: ReflectDefineProperty,
  get: ReflectGet,
  getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
  getPrototypeOf: ReflectGetPrototypeOf,
  has: ReflectHas,
  ownKeys: ReflectOwnKeys,
  set: ReflectSet,
  setPrototypeOf: ReflectSetPrototypeOf
} = Reflect;
var NativeProxy = Proxy;
var {
  EPSILON,
  MAX_SAFE_INTEGER,
  isFinite: NumberIsFinite,
  isNaN: NumberIsNaN
} = Number;
var {
  iterator: SymbolIterator,
  species: SymbolSpecies,
  toStringTag: SymbolToStringTag,
  for: SymbolFor
} = Symbol;
var NativeObject = Object;
var {
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  freeze: ObjectFreeze,
  is: ObjectIs
} = NativeObject;
var ObjectPrototype = NativeObject.prototype;
var ObjectPrototype__lookupGetter__ = (
  /** @type {any} */
  ObjectPrototype.__lookupGetter__ ? uncurryThis(
    /** @type {any} */
    ObjectPrototype.__lookupGetter__
  ) : (object, key) => {
    if (object == null) {
      throw NativeTypeError(CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT);
    }
    let target = NativeObject(object);
    do {
      const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
      if (descriptor !== void 0) {
        if (ObjectHasOwn(descriptor, "get")) {
          return descriptor.get;
        }
        return;
      }
    } while ((target = ReflectGetPrototypeOf(target)) !== null);
  }
);
var ObjectHasOwn = (
  /** @type {any} */
  NativeObject.hasOwn || uncurryThis(ObjectPrototype.hasOwnProperty)
);
var NativeArray = Array;
var ArrayIsArray = NativeArray.isArray;
var ArrayPrototype = NativeArray.prototype;
var ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
var ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
var ArrayPrototypeToLocaleString = uncurryThis(ArrayPrototype.toLocaleString);
var NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
var ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
var {
  abs: MathAbs,
  trunc: MathTrunc
} = Math;
var NativeArrayBuffer = ArrayBuffer;
var ArrayBufferIsView = NativeArrayBuffer.isView;
var ArrayBufferPrototype = NativeArrayBuffer.prototype;
var ArrayBufferPrototypeSlice = uncurryThis(ArrayBufferPrototype.slice);
var ArrayBufferPrototypeGetByteLength = uncurryThisGetter(ArrayBufferPrototype, "byteLength");
var NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
var SharedArrayBufferPrototypeGetByteLength = NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
var TypedArray = ReflectGetPrototypeOf(Uint8Array);
var TypedArrayFrom = TypedArray.from;
var TypedArrayPrototype = TypedArray.prototype;
var NativeTypedArrayPrototypeSymbolIterator = TypedArrayPrototype[SymbolIterator];
var TypedArrayPrototypeKeys = uncurryThis(TypedArrayPrototype.keys);
var TypedArrayPrototypeValues = uncurryThis(TypedArrayPrototype.values);
var TypedArrayPrototypeEntries = uncurryThis(TypedArrayPrototype.entries);
var TypedArrayPrototypeSet = uncurryThis(TypedArrayPrototype.set);
var TypedArrayPrototypeReverse = uncurryThis(TypedArrayPrototype.reverse);
var TypedArrayPrototypeFill = uncurryThis(TypedArrayPrototype.fill);
var TypedArrayPrototypeCopyWithin = uncurryThis(TypedArrayPrototype.copyWithin);
var TypedArrayPrototypeSort = uncurryThis(TypedArrayPrototype.sort);
var TypedArrayPrototypeSlice = uncurryThis(TypedArrayPrototype.slice);
var TypedArrayPrototypeSubarray = uncurryThis(TypedArrayPrototype.subarray);
var TypedArrayPrototypeGetBuffer = uncurryThisGetter(TypedArrayPrototype, "buffer");
var TypedArrayPrototypeGetByteOffset = uncurryThisGetter(TypedArrayPrototype, "byteOffset");
var TypedArrayPrototypeGetLength = uncurryThisGetter(TypedArrayPrototype, "length");
var TypedArrayPrototypeGetSymbolToStringTag = uncurryThisGetter(TypedArrayPrototype, SymbolToStringTag);
var NativeUint8Array = Uint8Array;
var NativeUint16Array = Uint16Array;
var Uint16ArrayFrom = (...args) => {
  return ReflectApply(TypedArrayFrom, NativeUint16Array, args);
};
var NativeUint32Array = Uint32Array;
var NativeFloat32Array = Float32Array;
var ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
var ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
var GeneratorPrototypeNext = uncurryThis(function* () {
}().next);
var IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
var DataViewPrototype = DataView.prototype;
var DataViewPrototypeGetUint16 = uncurryThis(DataViewPrototype.getUint16);
var DataViewPrototypeSetUint16 = uncurryThis(DataViewPrototype.setUint16);
var NativeTypeError = TypeError;
var NativeRangeError = RangeError;
var NativeWeakSet = WeakSet;
var WeakSetPrototype = NativeWeakSet.prototype;
var WeakSetPrototypeAdd = uncurryThis(WeakSetPrototype.add);
var WeakSetPrototypeHas = uncurryThis(WeakSetPrototype.has);
var NativeWeakMap = WeakMap;
var WeakMapPrototype = NativeWeakMap.prototype;
var WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
var WeakMapPrototypeHas = uncurryThis(WeakMapPrototype.has);
var WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);

// node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs
var arrayIterators = new NativeWeakMap();
var SafeIteratorPrototype = ObjectCreate(null, {
  next: {
    value: function next() {
      const arrayIterator = WeakMapPrototypeGet(arrayIterators, this);
      return ArrayIteratorPrototypeNext(arrayIterator);
    }
  },
  [SymbolIterator]: {
    value: function values() {
      return this;
    }
  }
});
function safeIfNeeded(array) {
  if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) {
    return array;
  }
  const safe = ObjectCreate(SafeIteratorPrototype);
  WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
  return safe;
}
var generators = new NativeWeakMap();
var DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, {
  next: {
    value: function next2() {
      const generator = WeakMapPrototypeGet(generators, this);
      return GeneratorPrototypeNext(generator);
    },
    writable: true,
    configurable: true
  }
});
for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
  if (key === "next") {
    continue;
  }
  ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
}
function wrap(generator) {
  const dummy = ObjectCreate(DummyArrayIteratorPrototype);
  WeakMapPrototypeSet(generators, dummy, generator);
  return dummy;
}

// node_modules/@petamoriken/float16/src/_util/is.mjs
function isObject(value) {
  return value !== null && typeof value === "object" || typeof value === "function";
}
function isObjectLike(value) {
  return value !== null && typeof value === "object";
}
function isNativeTypedArray(value) {
  return TypedArrayPrototypeGetSymbolToStringTag(value) !== void 0;
}
function isNativeBigIntTypedArray(value) {
  const typedArrayName = TypedArrayPrototypeGetSymbolToStringTag(value);
  return typedArrayName === "BigInt64Array" || typedArrayName === "BigUint64Array";
}
function isArrayBuffer(value) {
  try {
    if (ArrayIsArray(value)) {
      return false;
    }
    ArrayBufferPrototypeGetByteLength(
      /** @type {any} */
      value
    );
    return true;
  } catch (e) {
    return false;
  }
}
function isSharedArrayBuffer(value) {
  if (NativeSharedArrayBuffer === null) {
    return false;
  }
  try {
    SharedArrayBufferPrototypeGetByteLength(
      /** @type {any} */
      value
    );
    return true;
  } catch (e) {
    return false;
  }
}
function isAnyArrayBuffer(value) {
  return isArrayBuffer(value) || isSharedArrayBuffer(value);
}
function isOrdinaryArray(value) {
  if (!ArrayIsArray(value)) {
    return false;
  }
  return value[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext;
}
function isOrdinaryNativeTypedArray(value) {
  if (!isNativeTypedArray(value)) {
    return false;
  }
  return value[SymbolIterator] === NativeTypedArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext;
}
function isCanonicalIntegerIndexString(value) {
  if (typeof value !== "string") {
    return false;
  }
  const number = +value;
  if (value !== number + "") {
    return false;
  }
  if (!NumberIsFinite(number)) {
    return false;
  }
  return number === MathTrunc(number);
}

// node_modules/@petamoriken/float16/src/_util/brand.mjs
var brand = SymbolFor("__Float16Array__");
function hasFloat16ArrayBrand(target) {
  if (!isObjectLike(target)) {
    return false;
  }
  const prototype = ReflectGetPrototypeOf(target);
  if (!isObjectLike(prototype)) {
    return false;
  }
  const constructor = prototype.constructor;
  if (constructor === void 0) {
    return false;
  }
  if (!isObject(constructor)) {
    throw NativeTypeError(THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT);
  }
  return ReflectHas(constructor, brand);
}

// node_modules/@petamoriken/float16/src/_util/converter.mjs
var INVERSE_OF_EPSILON = 1 / EPSILON;
function roundTiesToEven(num) {
  return num + INVERSE_OF_EPSILON - INVERSE_OF_EPSILON;
}
var FLOAT16_MIN_VALUE = 6103515625e-14;
var FLOAT16_MAX_VALUE = 65504;
var FLOAT16_EPSILON = 9765625e-10;
var FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE = FLOAT16_EPSILON * FLOAT16_MIN_VALUE;
var FLOAT16_EPSILON_DEVIDED_BY_EPSILON = FLOAT16_EPSILON * INVERSE_OF_EPSILON;
function roundToFloat16(num) {
  const number = +num;
  if (!NumberIsFinite(number) || number === 0) {
    return number;
  }
  const sign = number > 0 ? 1 : -1;
  const absolute = MathAbs(number);
  if (absolute < FLOAT16_MIN_VALUE) {
    return sign * roundTiesToEven(absolute / FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE) * FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE;
  }
  const temp = (1 + FLOAT16_EPSILON_DEVIDED_BY_EPSILON) * absolute;
  const result = temp - (temp - absolute);
  if (result > FLOAT16_MAX_VALUE || NumberIsNaN(result)) {
    return sign * Infinity;
  }
  return sign * result;
}
var buffer2 = new NativeArrayBuffer(4);
var floatView = new NativeFloat32Array(buffer2);
var uint32View = new NativeUint32Array(buffer2);
var baseTable = new NativeUint16Array(512);
var shiftTable = new NativeUint8Array(512);
for (let i = 0; i < 256; ++i) {
  const e = i - 127;
  if (e < -24) {
    baseTable[i] = 0;
    baseTable[i | 256] = 32768;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else if (e < -14) {
    baseTable[i] = 1024 >> -e - 14;
    baseTable[i | 256] = 1024 >> -e - 14 | 32768;
    shiftTable[i] = -e - 1;
    shiftTable[i | 256] = -e - 1;
  } else if (e <= 15) {
    baseTable[i] = e + 15 << 10;
    baseTable[i | 256] = e + 15 << 10 | 32768;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  } else if (e < 128) {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  }
}
function roundToFloat16Bits(num) {
  floatView[0] = roundToFloat16(num);
  const f = uint32View[0];
  const e = f >> 23 & 511;
  return baseTable[e] + ((f & 8388607) >> shiftTable[e]);
}
var mantissaTable = new NativeUint32Array(2048);
for (let i = 1; i < 1024; ++i) {
  let m = i << 13;
  let e = 0;
  while ((m & 8388608) === 0) {
    m <<= 1;
    e -= 8388608;
  }
  m &= ~8388608;
  e += 947912704;
  mantissaTable[i] = m | e;
}
for (let i = 1024; i < 2048; ++i) {
  mantissaTable[i] = 939524096 + (i - 1024 << 13);
}
var exponentTable = new NativeUint32Array(64);
for (let i = 1; i < 31; ++i) {
  exponentTable[i] = i << 23;
}
exponentTable[31] = 1199570944;
exponentTable[32] = 2147483648;
for (let i = 33; i < 63; ++i) {
  exponentTable[i] = 2147483648 + (i - 32 << 23);
}
exponentTable[63] = 3347054592;
var offsetTable = new NativeUint16Array(64);
for (let i = 1; i < 64; ++i) {
  if (i !== 32) {
    offsetTable[i] = 1024;
  }
}
function convertToNumber(float16bits) {
  const i = float16bits >> 10;
  uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
  return floatView[0];
}

// node_modules/@petamoriken/float16/src/_util/spec.mjs
function ToIntegerOrInfinity(target) {
  const number = +target;
  if (NumberIsNaN(number) || number === 0) {
    return 0;
  }
  return MathTrunc(number);
}
function ToLength(target) {
  const length = ToIntegerOrInfinity(target);
  if (length < 0) {
    return 0;
  }
  return length < MAX_SAFE_INTEGER ? length : MAX_SAFE_INTEGER;
}
function SpeciesConstructor(target, defaultConstructor) {
  if (!isObject(target)) {
    throw NativeTypeError(THIS_IS_NOT_AN_OBJECT);
  }
  const constructor = target.constructor;
  if (constructor === void 0) {
    return defaultConstructor;
  }
  if (!isObject(constructor)) {
    throw NativeTypeError(THE_CONSTRUCTOR_PROPERTY_VALUE_IS_NOT_AN_OBJECT);
  }
  const species = constructor[SymbolSpecies];
  if (species == null) {
    return defaultConstructor;
  }
  return species;
}
function IsDetachedBuffer(buffer3) {
  if (isSharedArrayBuffer(buffer3)) {
    return false;
  }
  try {
    ArrayBufferPrototypeSlice(buffer3, 0, 0);
    return false;
  } catch (e) {
  }
  return true;
}
function defaultCompare(x, y) {
  const isXNaN = NumberIsNaN(x);
  const isYNaN = NumberIsNaN(y);
  if (isXNaN && isYNaN) {
    return 0;
  }
  if (isXNaN) {
    return 1;
  }
  if (isYNaN) {
    return -1;
  }
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  if (x === 0 && y === 0) {
    const isXPlusZero = ObjectIs(x, 0);
    const isYPlusZero = ObjectIs(y, 0);
    if (!isXPlusZero && isYPlusZero) {
      return -1;
    }
    if (isXPlusZero && !isYPlusZero) {
      return 1;
    }
  }
  return 0;
}

// node_modules/@petamoriken/float16/src/Float16Array.mjs
var BYTES_PER_ELEMENT = 2;
var float16bitsArrays = new NativeWeakMap();
function isFloat16Array(target) {
  return WeakMapPrototypeHas(float16bitsArrays, target) || !ArrayBufferIsView(target) && hasFloat16ArrayBrand(target);
}
function assertFloat16Array(target) {
  if (!isFloat16Array(target)) {
    throw NativeTypeError(THIS_IS_NOT_A_FLOAT16ARRAY_OBJECT);
  }
}
function assertSpeciesTypedArray(target, count) {
  const isTargetFloat16Array = isFloat16Array(target);
  const isTargetTypedArray = isNativeTypedArray(target);
  if (!isTargetFloat16Array && !isTargetTypedArray) {
    throw NativeTypeError(SPECIES_CONSTRUCTOR_DIDNT_RETURN_TYPEDARRAY_OBJECT);
  }
  if (typeof count === "number") {
    let length;
    if (isTargetFloat16Array) {
      const float16bitsArray = getFloat16BitsArray(target);
      length = TypedArrayPrototypeGetLength(float16bitsArray);
    } else {
      length = TypedArrayPrototypeGetLength(target);
    }
    if (length < count) {
      throw NativeTypeError(DERIVED_CONSTRUCTOR_CREATED_TYPEDARRAY_OBJECT_WHICH_WAS_TOO_SMALL_LENGTH);
    }
  }
  if (isNativeBigIntTypedArray(target)) {
    throw NativeTypeError(CANNOT_MIX_BIGINT_AND_OTHER_TYPES);
  }
}
function getFloat16BitsArray(float16) {
  const float16bitsArray = WeakMapPrototypeGet(float16bitsArrays, float16);
  if (float16bitsArray !== void 0) {
    const buffer4 = TypedArrayPrototypeGetBuffer(float16bitsArray);
    if (IsDetachedBuffer(buffer4)) {
      throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
    }
    return float16bitsArray;
  }
  const buffer3 = (
    /** @type {any} */
    float16.buffer
  );
  if (IsDetachedBuffer(buffer3)) {
    throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
  }
  const cloned = ReflectConstruct(Float16Array, [
    buffer3,
    /** @type {any} */
    float16.byteOffset,
    /** @type {any} */
    float16.length
  ], float16.constructor);
  return WeakMapPrototypeGet(float16bitsArrays, cloned);
}
function copyToArray(float16bitsArray) {
  const length = TypedArrayPrototypeGetLength(float16bitsArray);
  const array = [];
  for (let i = 0; i < length; ++i) {
    array[i] = convertToNumber(float16bitsArray[i]);
  }
  return array;
}
var TypedArrayPrototypeGetters = new NativeWeakSet();
for (const key of ReflectOwnKeys(TypedArrayPrototype)) {
  if (key === SymbolToStringTag) {
    continue;
  }
  const descriptor = ReflectGetOwnPropertyDescriptor(TypedArrayPrototype, key);
  if (ObjectHasOwn(descriptor, "get") && typeof descriptor.get === "function") {
    WeakSetPrototypeAdd(TypedArrayPrototypeGetters, descriptor.get);
  }
}
var handler = ObjectFreeze(
  /** @type {ProxyHandler<Float16BitsArray>} */
  {
    get(target, key, receiver) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        return convertToNumber(ReflectGet(target, key));
      }
      if (WeakSetPrototypeHas(TypedArrayPrototypeGetters, ObjectPrototype__lookupGetter__(target, key))) {
        return ReflectGet(target, key);
      }
      return ReflectGet(target, key, receiver);
    },
    set(target, key, value, receiver) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        return ReflectSet(target, key, roundToFloat16Bits(value));
      }
      return ReflectSet(target, key, value, receiver);
    },
    getOwnPropertyDescriptor(target, key) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key)) {
        const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
        descriptor.value = convertToNumber(descriptor.value);
        return descriptor;
      }
      return ReflectGetOwnPropertyDescriptor(target, key);
    },
    defineProperty(target, key, descriptor) {
      if (isCanonicalIntegerIndexString(key) && ObjectHasOwn(target, key) && ObjectHasOwn(descriptor, "value")) {
        descriptor.value = roundToFloat16Bits(descriptor.value);
        return ReflectDefineProperty(target, key, descriptor);
      }
      return ReflectDefineProperty(target, key, descriptor);
    }
  }
);
var Float16Array = class _Float16Array {
  /** @see https://tc39.es/ecma262/#sec-typedarray */
  constructor(input, _byteOffset, _length) {
    let float16bitsArray;
    if (isFloat16Array(input)) {
      float16bitsArray = ReflectConstruct(NativeUint16Array, [getFloat16BitsArray(input)], new.target);
    } else if (isObject(input) && !isAnyArrayBuffer(input)) {
      let list;
      let length;
      if (isNativeTypedArray(input)) {
        list = input;
        length = TypedArrayPrototypeGetLength(input);
        const buffer3 = TypedArrayPrototypeGetBuffer(input);
        if (IsDetachedBuffer(buffer3)) {
          throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
        }
        if (isNativeBigIntTypedArray(input)) {
          throw NativeTypeError(CANNOT_MIX_BIGINT_AND_OTHER_TYPES);
        }
        const data = new NativeArrayBuffer(length * BYTES_PER_ELEMENT);
        float16bitsArray = ReflectConstruct(NativeUint16Array, [data], new.target);
      } else {
        const iterator = input[SymbolIterator];
        if (iterator != null && typeof iterator !== "function") {
          throw NativeTypeError(ITERATOR_PROPERTY_IS_NOT_CALLABLE);
        }
        if (iterator != null) {
          if (isOrdinaryArray(input)) {
            list = input;
            length = input.length;
          } else {
            list = [.../** @type {Iterable<unknown>} */
            input];
            length = list.length;
          }
        } else {
          list = /** @type {ArrayLike<unknown>} */
          input;
          length = ToLength(list.length);
        }
        float16bitsArray = ReflectConstruct(NativeUint16Array, [length], new.target);
      }
      for (let i = 0; i < length; ++i) {
        float16bitsArray[i] = roundToFloat16Bits(list[i]);
      }
    } else {
      float16bitsArray = ReflectConstruct(NativeUint16Array, arguments, new.target);
    }
    const proxy = (
      /** @type {any} */
      new NativeProxy(float16bitsArray, handler)
    );
    WeakMapPrototypeSet(float16bitsArrays, proxy, float16bitsArray);
    return proxy;
  }
  /**
   * limitation: `Object.getOwnPropertyNames(Float16Array)` or `Reflect.ownKeys(Float16Array)` include this key
   * @see https://tc39.es/ecma262/#sec-%typedarray%.from
   */
  static from(src, ...opts) {
    const Constructor = this;
    if (!ReflectHas(Constructor, brand)) {
      throw NativeTypeError(THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY);
    }
    if (Constructor === _Float16Array) {
      if (isFloat16Array(src) && opts.length === 0) {
        const float16bitsArray = getFloat16BitsArray(src);
        const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
        return new _Float16Array(TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16)));
      }
      if (opts.length === 0) {
        return new _Float16Array(TypedArrayPrototypeGetBuffer(Uint16ArrayFrom(src, roundToFloat16Bits)));
      }
      const mapFunc = opts[0];
      const thisArg = opts[1];
      return new _Float16Array(TypedArrayPrototypeGetBuffer(Uint16ArrayFrom(src, function(val, ...args) {
        return roundToFloat16Bits(ReflectApply(mapFunc, this, [val, ...safeIfNeeded(args)]));
      }, thisArg)));
    }
    let list;
    let length;
    const iterator = src[SymbolIterator];
    if (iterator != null && typeof iterator !== "function") {
      throw NativeTypeError(ITERATOR_PROPERTY_IS_NOT_CALLABLE);
    }
    if (iterator != null) {
      if (isOrdinaryArray(src)) {
        list = src;
        length = src.length;
      } else if (isOrdinaryNativeTypedArray(src)) {
        list = src;
        length = TypedArrayPrototypeGetLength(src);
      } else {
        list = [...src];
        length = list.length;
      }
    } else {
      if (src == null) {
        throw NativeTypeError(CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT);
      }
      list = NativeObject(src);
      length = ToLength(list.length);
    }
    const array = new Constructor(length);
    if (opts.length === 0) {
      for (let i = 0; i < length; ++i) {
        array[i] = /** @type {number} */
        list[i];
      }
    } else {
      const mapFunc = opts[0];
      const thisArg = opts[1];
      for (let i = 0; i < length; ++i) {
        array[i] = ReflectApply(mapFunc, thisArg, [list[i], i]);
      }
    }
    return array;
  }
  /**
   * limitation: `Object.getOwnPropertyNames(Float16Array)` or `Reflect.ownKeys(Float16Array)` include this key
   * @see https://tc39.es/ecma262/#sec-%typedarray%.of
   */
  static of(...items) {
    const Constructor = this;
    if (!ReflectHas(Constructor, brand)) {
      throw NativeTypeError(THIS_CONSTRUCTOR_IS_NOT_A_SUBCLASS_OF_FLOAT16ARRAY);
    }
    const length = items.length;
    if (Constructor === _Float16Array) {
      const proxy = new _Float16Array(length);
      const float16bitsArray = getFloat16BitsArray(proxy);
      for (let i = 0; i < length; ++i) {
        float16bitsArray[i] = roundToFloat16Bits(items[i]);
      }
      return proxy;
    }
    const array = new Constructor(length);
    for (let i = 0; i < length; ++i) {
      array[i] = items[i];
    }
    return array;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys */
  keys() {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    return TypedArrayPrototypeKeys(float16bitsArray);
  }
  /**
   * limitation: returns a object whose prototype is not `%ArrayIteratorPrototype%`
   * @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
   */
  values() {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    return wrap(function* () {
      for (const val of TypedArrayPrototypeValues(float16bitsArray)) {
        yield convertToNumber(val);
      }
    }());
  }
  /**
   * limitation: returns a object whose prototype is not `%ArrayIteratorPrototype%`
   * @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
   */
  entries() {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    return wrap(function* () {
      for (const [i, val] of TypedArrayPrototypeEntries(float16bitsArray)) {
        yield (
          /** @type {[number, number]} */
          [i, convertToNumber(val)]
        );
      }
    }());
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.at */
  at(index) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const relativeIndex = ToIntegerOrInfinity(index);
    const k = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    if (k < 0 || k >= length) {
      return;
    }
    return convertToNumber(float16bitsArray[k]);
  }
  /** @see https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with */
  with(index, value) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const relativeIndex = ToIntegerOrInfinity(index);
    const k = relativeIndex >= 0 ? relativeIndex : length + relativeIndex;
    const number = +value;
    if (k < 0 || k >= length) {
      throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
    }
    const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
    const cloned = new _Float16Array(TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16)));
    const array = getFloat16BitsArray(cloned);
    array[k] = roundToFloat16Bits(number);
    return cloned;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.map */
  map(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
    if (Constructor === _Float16Array) {
      const proxy = new _Float16Array(length);
      const array2 = getFloat16BitsArray(proxy);
      for (let i = 0; i < length; ++i) {
        const val = convertToNumber(float16bitsArray[i]);
        array2[i] = roundToFloat16Bits(ReflectApply(callback, thisArg, [val, i, this]));
      }
      return proxy;
    }
    const array = new Constructor(length);
    assertSpeciesTypedArray(array, length);
    for (let i = 0; i < length; ++i) {
      const val = convertToNumber(float16bitsArray[i]);
      array[i] = ReflectApply(callback, thisArg, [val, i, this]);
    }
    return (
      /** @type {any} */
      array
    );
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter */
  filter(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    const kept = [];
    for (let i = 0; i < length; ++i) {
      const val = convertToNumber(float16bitsArray[i]);
      if (ReflectApply(callback, thisArg, [val, i, this])) {
        ArrayPrototypePush(kept, val);
      }
    }
    const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
    const array = new Constructor(kept);
    assertSpeciesTypedArray(array);
    return (
      /** @type {any} */
      array
    );
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce */
  reduce(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    if (length === 0 && opts.length === 0) {
      throw NativeTypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
    }
    let accumulator, start;
    if (opts.length === 0) {
      accumulator = convertToNumber(float16bitsArray[0]);
      start = 1;
    } else {
      accumulator = opts[0];
      start = 0;
    }
    for (let i = start; i < length; ++i) {
      accumulator = callback(accumulator, convertToNumber(float16bitsArray[i]), i, this);
    }
    return accumulator;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright */
  reduceRight(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    if (length === 0 && opts.length === 0) {
      throw NativeTypeError(REDUCE_OF_EMPTY_ARRAY_WITH_NO_INITIAL_VALUE);
    }
    let accumulator, start;
    if (opts.length === 0) {
      accumulator = convertToNumber(float16bitsArray[length - 1]);
      start = length - 2;
    } else {
      accumulator = opts[0];
      start = length - 1;
    }
    for (let i = start; i >= 0; --i) {
      accumulator = callback(accumulator, convertToNumber(float16bitsArray[i]), i, this);
    }
    return accumulator;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach */
  forEach(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = 0; i < length; ++i) {
      ReflectApply(callback, thisArg, [convertToNumber(float16bitsArray[i]), i, this]);
    }
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.find */
  find(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = 0; i < length; ++i) {
      const value = convertToNumber(float16bitsArray[i]);
      if (ReflectApply(callback, thisArg, [value, i, this])) {
        return value;
      }
    }
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex */
  findIndex(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = 0; i < length; ++i) {
      const value = convertToNumber(float16bitsArray[i]);
      if (ReflectApply(callback, thisArg, [value, i, this])) {
        return i;
      }
    }
    return -1;
  }
  /** @see https://tc39.es/proposal-array-find-from-last/index.html#sec-%typedarray%.prototype.findlast */
  findLast(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = length - 1; i >= 0; --i) {
      const value = convertToNumber(float16bitsArray[i]);
      if (ReflectApply(callback, thisArg, [value, i, this])) {
        return value;
      }
    }
  }
  /** @see https://tc39.es/proposal-array-find-from-last/index.html#sec-%typedarray%.prototype.findlastindex */
  findLastIndex(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = length - 1; i >= 0; --i) {
      const value = convertToNumber(float16bitsArray[i]);
      if (ReflectApply(callback, thisArg, [value, i, this])) {
        return i;
      }
    }
    return -1;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.every */
  every(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = 0; i < length; ++i) {
      if (!ReflectApply(callback, thisArg, [convertToNumber(float16bitsArray[i]), i, this])) {
        return false;
      }
    }
    return true;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.some */
  some(callback, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const thisArg = opts[0];
    for (let i = 0; i < length; ++i) {
      if (ReflectApply(callback, thisArg, [convertToNumber(float16bitsArray[i]), i, this])) {
        return true;
      }
    }
    return false;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.set */
  set(input, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const targetOffset = ToIntegerOrInfinity(opts[0]);
    if (targetOffset < 0) {
      throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
    }
    if (input == null) {
      throw NativeTypeError(CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT);
    }
    if (isNativeBigIntTypedArray(input)) {
      throw NativeTypeError(CANNOT_MIX_BIGINT_AND_OTHER_TYPES);
    }
    if (isFloat16Array(input)) {
      return TypedArrayPrototypeSet(getFloat16BitsArray(this), getFloat16BitsArray(input), targetOffset);
    }
    if (isNativeTypedArray(input)) {
      const buffer3 = TypedArrayPrototypeGetBuffer(input);
      if (IsDetachedBuffer(buffer3)) {
        throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
      }
    }
    const targetLength = TypedArrayPrototypeGetLength(float16bitsArray);
    const src = NativeObject(input);
    const srcLength = ToLength(src.length);
    if (targetOffset === Infinity || srcLength + targetOffset > targetLength) {
      throw NativeRangeError(OFFSET_IS_OUT_OF_BOUNDS);
    }
    for (let i = 0; i < srcLength; ++i) {
      float16bitsArray[i + targetOffset] = roundToFloat16Bits(src[i]);
    }
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse */
  reverse() {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    TypedArrayPrototypeReverse(float16bitsArray);
    return this;
  }
  /** @see https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed */
  toReversed() {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
    const cloned = new _Float16Array(TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16)));
    const clonedFloat16bitsArray = getFloat16BitsArray(cloned);
    TypedArrayPrototypeReverse(clonedFloat16bitsArray);
    return cloned;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill */
  fill(value, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    TypedArrayPrototypeFill(float16bitsArray, roundToFloat16Bits(value), ...safeIfNeeded(opts));
    return this;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin */
  copyWithin(target, start, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    TypedArrayPrototypeCopyWithin(float16bitsArray, target, start, ...safeIfNeeded(opts));
    return this;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort */
  sort(compareFn) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const sortCompare = compareFn !== void 0 ? compareFn : defaultCompare;
    TypedArrayPrototypeSort(float16bitsArray, (x, y) => {
      return sortCompare(convertToNumber(x), convertToNumber(y));
    });
    return this;
  }
  /** @see https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted */
  toSorted(compareFn) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    if (compareFn !== void 0 && typeof compareFn !== "function") {
      throw new NativeTypeError(THE_COMPARISON_FUNCTION_MUST_BE_EITHER_A_FUNCTION_OR_UNDEFINED);
    }
    const sortCompare = compareFn !== void 0 ? compareFn : defaultCompare;
    const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
    const cloned = new _Float16Array(TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16)));
    const clonedFloat16bitsArray = getFloat16BitsArray(cloned);
    TypedArrayPrototypeSort(clonedFloat16bitsArray, (x, y) => {
      return sortCompare(convertToNumber(x), convertToNumber(y));
    });
    return cloned;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice */
  slice(start, end) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
    if (Constructor === _Float16Array) {
      const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
      return new _Float16Array(TypedArrayPrototypeGetBuffer(TypedArrayPrototypeSlice(uint16, start, end)));
    }
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    const relativeStart = ToIntegerOrInfinity(start);
    const relativeEnd = end === void 0 ? length : ToIntegerOrInfinity(end);
    let k;
    if (relativeStart === -Infinity) {
      k = 0;
    } else if (relativeStart < 0) {
      k = length + relativeStart > 0 ? length + relativeStart : 0;
    } else {
      k = length < relativeStart ? length : relativeStart;
    }
    let final;
    if (relativeEnd === -Infinity) {
      final = 0;
    } else if (relativeEnd < 0) {
      final = length + relativeEnd > 0 ? length + relativeEnd : 0;
    } else {
      final = length < relativeEnd ? length : relativeEnd;
    }
    const count = final - k > 0 ? final - k : 0;
    const array = new Constructor(count);
    assertSpeciesTypedArray(array, count);
    if (count === 0) {
      return array;
    }
    const buffer3 = TypedArrayPrototypeGetBuffer(float16bitsArray);
    if (IsDetachedBuffer(buffer3)) {
      throw NativeTypeError(ATTEMPTING_TO_ACCESS_DETACHED_ARRAYBUFFER);
    }
    let n = 0;
    while (k < final) {
      array[n] = convertToNumber(float16bitsArray[k]);
      ++k;
      ++n;
    }
    return (
      /** @type {any} */
      array
    );
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray */
  subarray(begin, end) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const Constructor = SpeciesConstructor(float16bitsArray, _Float16Array);
    const uint16 = new NativeUint16Array(TypedArrayPrototypeGetBuffer(float16bitsArray), TypedArrayPrototypeGetByteOffset(float16bitsArray), TypedArrayPrototypeGetLength(float16bitsArray));
    const uint16Subarray = TypedArrayPrototypeSubarray(uint16, begin, end);
    const array = new Constructor(TypedArrayPrototypeGetBuffer(uint16Subarray), TypedArrayPrototypeGetByteOffset(uint16Subarray), TypedArrayPrototypeGetLength(uint16Subarray));
    assertSpeciesTypedArray(array);
    return (
      /** @type {any} */
      array
    );
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof */
  indexOf(element, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    let from = ToIntegerOrInfinity(opts[0]);
    if (from === Infinity) {
      return -1;
    }
    if (from < 0) {
      from += length;
      if (from < 0) {
        from = 0;
      }
    }
    for (let i = from; i < length; ++i) {
      if (ObjectHasOwn(float16bitsArray, i) && convertToNumber(float16bitsArray[i]) === element) {
        return i;
      }
    }
    return -1;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof */
  lastIndexOf(element, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    let from = opts.length >= 1 ? ToIntegerOrInfinity(opts[0]) : length - 1;
    if (from === -Infinity) {
      return -1;
    }
    if (from >= 0) {
      from = from < length - 1 ? from : length - 1;
    } else {
      from += length;
    }
    for (let i = from; i >= 0; --i) {
      if (ObjectHasOwn(float16bitsArray, i) && convertToNumber(float16bitsArray[i]) === element) {
        return i;
      }
    }
    return -1;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes */
  includes(element, ...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const length = TypedArrayPrototypeGetLength(float16bitsArray);
    let from = ToIntegerOrInfinity(opts[0]);
    if (from === Infinity) {
      return false;
    }
    if (from < 0) {
      from += length;
      if (from < 0) {
        from = 0;
      }
    }
    const isNaN2 = NumberIsNaN(element);
    for (let i = from; i < length; ++i) {
      const value = convertToNumber(float16bitsArray[i]);
      if (isNaN2 && NumberIsNaN(value)) {
        return true;
      }
      if (value === element) {
        return true;
      }
    }
    return false;
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.join */
  join(separator) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const array = copyToArray(float16bitsArray);
    return ArrayPrototypeJoin(array, separator);
  }
  /** @see https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring */
  toLocaleString(...opts) {
    assertFloat16Array(this);
    const float16bitsArray = getFloat16BitsArray(this);
    const array = copyToArray(float16bitsArray);
    return ArrayPrototypeToLocaleString(array, ...safeIfNeeded(opts));
  }
  /** @see https://tc39.es/ecma262/#sec-get-%typedarray%.prototype-@@tostringtag */
  get [SymbolToStringTag]() {
    if (isFloat16Array(this)) {
      return (
        /** @type {any} */
        "Float16Array"
      );
    }
  }
};
ObjectDefineProperty(Float16Array, "BYTES_PER_ELEMENT", {
  value: BYTES_PER_ELEMENT
});
ObjectDefineProperty(Float16Array, brand, {});
ReflectSetPrototypeOf(Float16Array, TypedArray);
var Float16ArrayPrototype = Float16Array.prototype;
ObjectDefineProperty(Float16ArrayPrototype, "BYTES_PER_ELEMENT", {
  value: BYTES_PER_ELEMENT
});
ObjectDefineProperty(Float16ArrayPrototype, SymbolIterator, {
  value: Float16ArrayPrototype.values,
  writable: true,
  configurable: true
});
ReflectSetPrototypeOf(Float16ArrayPrototype, TypedArrayPrototype);

// node_modules/@petamoriken/float16/src/DataView.mjs
function getFloat16(dataView, byteOffset, ...opts) {
  return convertToNumber(DataViewPrototypeGetUint16(dataView, byteOffset, ...safeIfNeeded(opts)));
}

// node_modules/geotiff/dist-module/geotiffimage.js
var import_get_attribute = __toESM(require_get_attribute(), 1);
var import_find_tags_by_name = __toESM(require_find_tags_by_name(), 1);

// node_modules/geotiff/dist-module/rgb.js
function fromWhiteIsZero(raster, max) {
  const {
    width,
    height
  } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = 256 - raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromBlackIsZero(raster, max) {
  const {
    width,
    height
  } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromPalette(raster, colorMap) {
  const {
    width,
    height
  } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  const greenOffset = colorMap.length / 3;
  const blueOffset = colorMap.length / 3 * 2;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    const mapIndex = raster[i];
    rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
    rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
    rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
  }
  return rgbRaster;
}
function fromCMYK(cmykRaster) {
  const {
    width,
    height
  } = cmykRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
    const c = cmykRaster[i];
    const m = cmykRaster[i + 1];
    const y = cmykRaster[i + 2];
    const k = cmykRaster[i + 3];
    rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
    rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
    rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
  }
  return rgbRaster;
}
function fromYCbCr(yCbCrRaster) {
  const {
    width,
    height
  } = yCbCrRaster;
  const rgbRaster = new Uint8ClampedArray(width * height * 3);
  for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
    const y = yCbCrRaster[i];
    const cb = yCbCrRaster[i + 1];
    const cr = yCbCrRaster[i + 2];
    rgbRaster[j] = y + 1.402 * (cr - 128);
    rgbRaster[j + 1] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128);
    rgbRaster[j + 2] = y + 1.772 * (cb - 128);
  }
  return rgbRaster;
}
var Xn = 0.95047;
var Yn = 1;
var Zn = 1.08883;
function fromCIELab(cieLabRaster) {
  const {
    width,
    height
  } = cieLabRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
    const L = cieLabRaster[i + 0];
    const a_ = cieLabRaster[i + 1] << 24 >> 24;
    const b_ = cieLabRaster[i + 2] << 24 >> 24;
    let y = (L + 16) / 116;
    let x = a_ / 500 + y;
    let z = y - b_ / 200;
    let r;
    let g;
    let b;
    x = Xn * (x * x * x > 8856e-6 ? x * x * x : (x - 16 / 116) / 7.787);
    y = Yn * (y * y * y > 8856e-6 ? y * y * y : (y - 16 / 116) / 7.787);
    z = Zn * (z * z * z > 8856e-6 ? z * z * z : (z - 16 / 116) / 7.787);
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;
    rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
    rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
    rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
  }
  return rgbRaster;
}

// node_modules/geotiff/dist-module/compression/index.js
var registry = /* @__PURE__ */ new Map();
function addDecoder(cases, importFn) {
  if (!Array.isArray(cases)) {
    cases = [cases];
  }
  cases.forEach((c) => registry.set(c, importFn));
}
function getDecoder(fileDirectory) {
  return __async(this, null, function* () {
    const importFn = registry.get(fileDirectory.Compression);
    if (!importFn) {
      throw new Error(`Unknown compression method identifier: ${fileDirectory.Compression}`);
    }
    const Decoder = yield importFn();
    return new Decoder(fileDirectory);
  });
}
addDecoder([void 0, 1], () => import("./raw-NOL3NLI7.js").then((m) => m.default));
addDecoder(5, () => import("./lzw-IVD2PNRU.js").then((m) => m.default));
addDecoder(6, () => {
  throw new Error("old style JPEG compression is not supported.");
});
addDecoder(7, () => import("./jpeg-NQY2T355.js").then((m) => m.default));
addDecoder([8, 32946], () => import("./deflate-KIZZFJ7J.js").then((m) => m.default));
addDecoder(32773, () => import("./packbits-OS7ZVUCF.js").then((m) => m.default));
addDecoder(34887, () => import("./lerc-HWSETFGR.js").then((m) => __async(void 0, null, function* () {
  yield m.zstd.init();
  return m;
})).then((m) => m.default));
addDecoder(50001, () => import("./webimage-QLJZYOY4.js").then((m) => m.default));

// node_modules/geotiff/dist-module/resample.js
function copyNewSize(array, width, height, samplesPerPixel = 1) {
  return new (Object.getPrototypeOf(array)).constructor(width * height * samplesPerPixel);
}
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const cy = Math.min(Math.round(relY * y), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const cx = Math.min(Math.round(relX * x), inWidth - 1);
        const value = array[cy * inWidth + cx];
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const rawY = relY * y;
      const yl = Math.floor(rawY);
      const yh = Math.min(Math.ceil(rawY), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const rawX = relX * x;
        const tx = rawX % 1;
        const xl = Math.floor(rawX);
        const xh = Math.min(Math.ceil(rawX), inWidth - 1);
        const ll = array[yl * inWidth + xl];
        const hl = array[yl * inWidth + xh];
        const lh = array[yh * inWidth + xl];
        const hh = array[yh * inWidth + xh];
        const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
    case "bilinear":
    case "linear":
      return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const cy = Math.min(Math.round(relY * y), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const cx = Math.min(Math.round(relX * x), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const value = valueArray[cy * inWidth * samples + cx * samples + i];
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const rawY = relY * y;
    const yl = Math.floor(rawY);
    const yh = Math.min(Math.ceil(rawY), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const rawX = relX * x;
      const tx = rawX % 1;
      const xl = Math.floor(rawX);
      const xh = Math.min(Math.ceil(rawX), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const ll = valueArray[yl * inWidth * samples + xl * samples + i];
        const hl = valueArray[yl * inWidth * samples + xh * samples + i];
        const lh = valueArray[yh * inWidth * samples + xl * samples + i];
        const hh = valueArray[yh * inWidth * samples + xh * samples + i];
        const value = lerp(lerp(ll, hl, tx), lerp(lh, hh, tx), rawY % 1);
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
    case "bilinear":
    case "linear":
      return resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}

// node_modules/geotiff/dist-module/geotiffimage.js
function sum(array, start, end) {
  let s = 0;
  for (let i = start; i < end; ++i) {
    s += array[i];
  }
  return s;
}
function arrayForType(format, bitsPerSample, size) {
  switch (format) {
    case 1:
      if (bitsPerSample <= 8) {
        return new Uint8Array(size);
      } else if (bitsPerSample <= 16) {
        return new Uint16Array(size);
      } else if (bitsPerSample <= 32) {
        return new Uint32Array(size);
      }
      break;
    case 2:
      if (bitsPerSample === 8) {
        return new Int8Array(size);
      } else if (bitsPerSample === 16) {
        return new Int16Array(size);
      } else if (bitsPerSample === 32) {
        return new Int32Array(size);
      }
      break;
    case 3:
      switch (bitsPerSample) {
        case 16:
        case 32:
          return new Float32Array(size);
        case 64:
          return new Float64Array(size);
        default:
          break;
      }
      break;
    default:
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function needsNormalization(format, bitsPerSample) {
  if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) {
    return false;
  } else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) {
    return false;
  }
  return true;
}
function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
  const view = new DataView(inBuffer);
  const outSize = planarConfiguration === 2 ? tileHeight * tileWidth : tileHeight * tileWidth * samplesPerPixel;
  const samplesToTransfer = planarConfiguration === 2 ? 1 : samplesPerPixel;
  const outArray = arrayForType(format, bitsPerSample, outSize);
  const bitMask = parseInt("1".repeat(bitsPerSample), 2);
  if (format === 1) {
    let pixelBitSkip;
    if (planarConfiguration === 1) {
      pixelBitSkip = samplesPerPixel * bitsPerSample;
    } else {
      pixelBitSkip = bitsPerSample;
    }
    let bitsPerLine = tileWidth * pixelBitSkip;
    if ((bitsPerLine & 7) !== 0) {
      bitsPerLine = bitsPerLine + 7 & ~7;
    }
    for (let y = 0; y < tileHeight; ++y) {
      const lineBitOffset = y * bitsPerLine;
      for (let x = 0; x < tileWidth; ++x) {
        const pixelBitOffset = lineBitOffset + x * samplesToTransfer * bitsPerSample;
        for (let i = 0; i < samplesToTransfer; ++i) {
          const bitOffset = pixelBitOffset + i * bitsPerSample;
          const outIndex = (y * tileWidth + x) * samplesToTransfer + i;
          const byteOffset = Math.floor(bitOffset / 8);
          const innerBitOffset = bitOffset % 8;
          if (innerBitOffset + bitsPerSample <= 8) {
            outArray[outIndex] = view.getUint8(byteOffset) >> 8 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 16) {
            outArray[outIndex] = view.getUint16(byteOffset) >> 16 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 24) {
            const raw = view.getUint16(byteOffset) << 8 | view.getUint8(byteOffset + 2);
            outArray[outIndex] = raw >> 24 - bitsPerSample - innerBitOffset & bitMask;
          } else {
            outArray[outIndex] = view.getUint32(byteOffset) >> 32 - bitsPerSample - innerBitOffset & bitMask;
          }
        }
      }
    }
  } else if (format === 3) {
  }
  return outArray.buffer;
}
var GeoTIFFImage = class {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(fileDirectory, geoKeys, dataView, littleEndian, cache, source) {
    this.fileDirectory = fileDirectory;
    this.geoKeys = geoKeys;
    this.dataView = dataView;
    this.littleEndian = littleEndian;
    this.tiles = cache ? {} : null;
    this.isTiled = !fileDirectory.StripOffsets;
    const planarConfiguration = fileDirectory.PlanarConfiguration;
    this.planarConfiguration = typeof planarConfiguration === "undefined" ? 1 : planarConfiguration;
    if (this.planarConfiguration !== 1 && this.planarConfiguration !== 2) {
      throw new Error("Invalid planar configuration.");
    }
    this.source = source;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {Object} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.geoKeys;
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.ImageLength;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel !== "undefined" ? this.fileDirectory.SamplesPerPixel : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled) {
      return this.fileDirectory.TileLength;
    }
    if (typeof this.fileDirectory.RowsPerStrip !== "undefined") {
      return Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
    }
    return this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  getBlockHeight(y) {
    if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) {
      return this.getTileHeight();
    } else {
      return this.getHeight() - y * this.getTileHeight();
    }
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let bytes = 0;
    for (let i = 0; i < this.fileDirectory.BitsPerSample.length; ++i) {
      bytes += this.getSampleByteSize(i);
    }
    return bytes;
  }
  getSampleByteSize(i) {
    if (i >= this.fileDirectory.BitsPerSample.length) {
      throw new RangeError(`Sample index ${i} is out of range.`);
    }
    return Math.ceil(this.fileDirectory.BitsPerSample[i] / 8);
  }
  getReaderForSample(sampleIndex) {
    const format = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
    const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];
    switch (format) {
      case 1:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getUint8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getUint16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getUint32;
        }
        break;
      case 2:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getInt8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getInt16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getInt32;
        }
        break;
      case 3:
        switch (bitsPerSample) {
          case 16:
            return function(offset, littleEndian) {
              return getFloat16(this, offset, littleEndian);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
          default:
            break;
        }
        break;
      default:
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(sampleIndex = 0) {
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
  }
  getBitsPerSample(sampleIndex = 0) {
    return this.fileDirectory.BitsPerSample[sampleIndex];
  }
  getArrayForSample(sampleIndex, size) {
    const format = this.getSampleFormat(sampleIndex);
    const bitsPerSample = this.getBitsPerSample(sampleIndex);
    return arrayForType(format, bitsPerSample, size);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {import("./geotiff").Pool|import("./geotiff").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<ArrayBuffer>}
   */
  getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
    return __async(this, null, function* () {
      const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
      const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
      let index;
      const {
        tiles
      } = this;
      if (this.planarConfiguration === 1) {
        index = y * numTilesPerRow + x;
      } else if (this.planarConfiguration === 2) {
        index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
      }
      let offset;
      let byteCount;
      if (this.isTiled) {
        offset = this.fileDirectory.TileOffsets[index];
        byteCount = this.fileDirectory.TileByteCounts[index];
      } else {
        offset = this.fileDirectory.StripOffsets[index];
        byteCount = this.fileDirectory.StripByteCounts[index];
      }
      const slice = (yield this.source.fetch([{
        offset,
        length: byteCount
      }], signal))[0];
      let request;
      if (tiles === null || !tiles[index]) {
        request = (() => __async(this, null, function* () {
          let data = yield poolOrDecoder.decode(this.fileDirectory, slice);
          const sampleFormat = this.getSampleFormat();
          const bitsPerSample = this.getBitsPerSample();
          if (needsNormalization(sampleFormat, bitsPerSample)) {
            data = normalizeArray(data, sampleFormat, this.planarConfiguration, this.getSamplesPerPixel(), bitsPerSample, this.getTileWidth(), this.getBlockHeight(y));
          }
          return data;
        }))();
        if (tiles !== null) {
          tiles[index] = request;
        }
      } else {
        request = tiles[index];
      }
      return {
        x,
        y,
        sample,
        data: yield request
      };
    });
  }
  /**
   * Internal read function.
   * @private
   * @param {Array} imageWindow The image window in pixel coordinates
   * @param {Array} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {Boolean} interleave Whether or not to write in an interleaved manner
   * @param {import("./geotiff").Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} width the width of window to be read into
   * @param {number} height the height of window to be read into
   * @param {number} resampleMethod the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal) {
    return __async(this, null, function* () {
      const tileWidth = this.getTileWidth();
      const tileHeight = this.getTileHeight();
      const imageWidth = this.getWidth();
      const imageHeight = this.getHeight();
      const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
      const maxXTile = Math.min(Math.ceil(imageWindow[2] / tileWidth), Math.ceil(imageWidth / tileWidth));
      const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
      const maxYTile = Math.min(Math.ceil(imageWindow[3] / tileHeight), Math.ceil(imageHeight / tileHeight));
      const windowWidth = imageWindow[2] - imageWindow[0];
      let bytesPerPixel = this.getBytesPerPixel();
      const srcSampleOffsets = [];
      const sampleReaders = [];
      for (let i = 0; i < samples.length; ++i) {
        if (this.planarConfiguration === 1) {
          srcSampleOffsets.push(sum(this.fileDirectory.BitsPerSample, 0, samples[i]) / 8);
        } else {
          srcSampleOffsets.push(0);
        }
        sampleReaders.push(this.getReaderForSample(samples[i]));
      }
      const promises = [];
      const {
        littleEndian
      } = this;
      for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
        for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
          let getPromise;
          if (this.planarConfiguration === 1) {
            getPromise = this.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
          }
          for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
            const si = sampleIndex;
            const sample = samples[sampleIndex];
            if (this.planarConfiguration === 2) {
              bytesPerPixel = this.getSampleByteSize(sample);
              getPromise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
            }
            const promise = getPromise.then((tile) => {
              const buffer3 = tile.data;
              const dataView = new DataView(buffer3);
              const blockHeight = this.getBlockHeight(tile.y);
              const firstLine = tile.y * tileHeight;
              const firstCol = tile.x * tileWidth;
              const lastLine = firstLine + blockHeight;
              const lastCol = (tile.x + 1) * tileWidth;
              const reader = sampleReaders[si];
              const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
              const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);
              for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
                for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                  const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
                  const value = reader.call(dataView, pixelOffset + srcSampleOffsets[si], littleEndian);
                  let windowCoordinate;
                  if (interleave) {
                    windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
                    valueArrays[windowCoordinate] = value;
                  } else {
                    windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
                    valueArrays[si][windowCoordinate] = value;
                  }
                }
              }
            });
            promises.push(promise);
          }
        }
      }
      yield Promise.all(promises);
      if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
        let resampled;
        if (interleave) {
          resampled = resampleInterleaved(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, samples.length, resampleMethod);
        } else {
          resampled = resample(valueArrays, imageWindow[2] - imageWindow[0], imageWindow[3] - imageWindow[1], width, height, resampleMethod);
        }
        resampled.width = width;
        resampled.height = height;
        return resampled;
      }
      valueArrays.width = width || imageWindow[2] - imageWindow[0];
      valueArrays.height = height || imageWindow[3] - imageWindow[1];
      return valueArrays;
    });
  }
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  readRasters() {
    return __async(this, arguments, function* ({
      window: wnd,
      samples = [],
      interleave,
      pool = null,
      width,
      height,
      resampleMethod,
      fillValue,
      signal
    } = {}) {
      const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()];
      if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
        throw new Error("Invalid subsets");
      }
      const imageWindowWidth = imageWindow[2] - imageWindow[0];
      const imageWindowHeight = imageWindow[3] - imageWindow[1];
      const numPixels = imageWindowWidth * imageWindowHeight;
      const samplesPerPixel = this.getSamplesPerPixel();
      if (!samples || !samples.length) {
        for (let i = 0; i < samplesPerPixel; ++i) {
          samples.push(i);
        }
      } else {
        for (let i = 0; i < samples.length; ++i) {
          if (samples[i] >= samplesPerPixel) {
            return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
          }
        }
      }
      let valueArrays;
      if (interleave) {
        const format = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1;
        const bitsPerSample = Math.max.apply(null, this.fileDirectory.BitsPerSample);
        valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);
        if (fillValue) {
          valueArrays.fill(fillValue);
        }
      } else {
        valueArrays = [];
        for (let i = 0; i < samples.length; ++i) {
          const valueArray = this.getArrayForSample(samples[i], numPixels);
          if (Array.isArray(fillValue) && i < fillValue.length) {
            valueArray.fill(fillValue[i]);
          } else if (fillValue && !Array.isArray(fillValue)) {
            valueArray.fill(fillValue);
          }
          valueArrays.push(valueArray);
        }
      }
      const poolOrDecoder = pool || (yield getDecoder(this.fileDirectory));
      const result = yield this._readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal);
      return result;
    });
  }
  /**
   * Reads raster data from the image as RGB. The result is always an
   * interleaved typed array.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {Object} [options] optional parameters
   * @param {Array<number>} [options.window] the subset to read data from in pixels.
   * @param {boolean} [options.interleave=true] whether the data shall be read
   *                                             in one single array or separate
   *                                             arrays.
   * @param {import("./geotiff").Pool} [options.pool=null] The optional decoder pool to use.
   * @param {number} [options.width] The desired width of the output. When the width is no the
   *                                 same as the images, resampling will be performed.
   * @param {number} [options.height] The desired height of the output. When the width is no the
   *                                  same as the images, resampling will be performed.
   * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
   * @param {boolean} [options.enableAlpha=false] Enable reading alpha channel if present.
   * @param {AbortSignal} [options.signal] An AbortSignal that may be signalled if the request is
   *                                       to be aborted
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  readRGB() {
    return __async(this, arguments, function* ({
      window: window2,
      interleave = true,
      pool = null,
      width,
      height,
      resampleMethod,
      enableAlpha = false,
      signal
    } = {}) {
      const imageWindow = window2 || [0, 0, this.getWidth(), this.getHeight()];
      if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
        throw new Error("Invalid subsets");
      }
      const pi = this.fileDirectory.PhotometricInterpretation;
      if (pi === photometricInterpretations.RGB) {
        let s = [0, 1, 2];
        if (!(this.fileDirectory.ExtraSamples === ExtraSamplesValues.Unspecified) && enableAlpha) {
          s = [];
          for (let i = 0; i < this.fileDirectory.BitsPerSample.length; i += 1) {
            s.push(i);
          }
        }
        return this.readRasters({
          window: window2,
          interleave,
          samples: s,
          pool,
          width,
          height,
          resampleMethod,
          signal
        });
      }
      let samples;
      switch (pi) {
        case photometricInterpretations.WhiteIsZero:
        case photometricInterpretations.BlackIsZero:
        case photometricInterpretations.Palette:
          samples = [0];
          break;
        case photometricInterpretations.CMYK:
          samples = [0, 1, 2, 3];
          break;
        case photometricInterpretations.YCbCr:
        case photometricInterpretations.CIELab:
          samples = [0, 1, 2];
          break;
        default:
          throw new Error("Invalid or unsupported photometric interpretation.");
      }
      const subOptions = {
        window: imageWindow,
        interleave: true,
        samples,
        pool,
        width,
        height,
        resampleMethod,
        signal
      };
      const {
        fileDirectory
      } = this;
      const raster = yield this.readRasters(subOptions);
      const max = 2 ** this.fileDirectory.BitsPerSample[0];
      let data;
      switch (pi) {
        case photometricInterpretations.WhiteIsZero:
          data = fromWhiteIsZero(raster, max);
          break;
        case photometricInterpretations.BlackIsZero:
          data = fromBlackIsZero(raster, max);
          break;
        case photometricInterpretations.Palette:
          data = fromPalette(raster, fileDirectory.ColorMap);
          break;
        case photometricInterpretations.CMYK:
          data = fromCMYK(raster);
          break;
        case photometricInterpretations.YCbCr:
          data = fromYCbCr(raster);
          break;
        case photometricInterpretations.CIELab:
          data = fromCIELab(raster);
          break;
        default:
          throw new Error("Unsupported photometric interpretation.");
      }
      if (!interleave) {
        const red = new Uint8Array(data.length / 3);
        const green = new Uint8Array(data.length / 3);
        const blue = new Uint8Array(data.length / 3);
        for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
          red[j] = data[i];
          green[j] = data[i + 1];
          blue[j] = data[i + 2];
        }
        data = [red, green, blue];
      }
      data.width = raster.width;
      data.height = raster.height;
      return data;
    });
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint) {
      return [];
    }
    const tiePoints = [];
    for (let i = 0; i < this.fileDirectory.ModelTiepoint.length; i += 6) {
      tiePoints.push({
        i: this.fileDirectory.ModelTiepoint[i],
        j: this.fileDirectory.ModelTiepoint[i + 1],
        k: this.fileDirectory.ModelTiepoint[i + 2],
        x: this.fileDirectory.ModelTiepoint[i + 3],
        y: this.fileDirectory.ModelTiepoint[i + 4],
        z: this.fileDirectory.ModelTiepoint[i + 5]
      });
    }
    return tiePoints;
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number} [sample=null] The sample index.
   * @returns {Object}
   */
  getGDALMetadata(sample = null) {
    const metadata = {};
    if (!this.fileDirectory.GDAL_METADATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_METADATA;
    let items = (0, import_find_tags_by_name.default)(string, "Item");
    if (sample === null) {
      items = items.filter((item) => (0, import_get_attribute.default)(item, "sample") === void 0);
    } else {
      items = items.filter((item) => Number((0, import_get_attribute.default)(item, "sample")) === sample);
    }
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      metadata[(0, import_get_attribute.default)(item, "name")] = item.inner;
    }
    return metadata;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_NODATA;
    return Number(string.substring(0, string.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const tiePoints = this.fileDirectory.ModelTiepoint;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (tiePoints && tiePoints.length === 6) {
      return [tiePoints[3], tiePoints[4], tiePoints[5]];
    }
    if (modelTransformation) {
      return [modelTransformation[3], modelTransformation[7], modelTransformation[11]];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(referenceImage = null) {
    const modelPixelScale = this.fileDirectory.ModelPixelScale;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (modelPixelScale) {
      return [modelPixelScale[0], -modelPixelScale[1], modelPixelScale[2]];
    }
    if (modelTransformation) {
      if (modelTransformation[1] === 0 && modelTransformation[4] === 0) {
        return [modelTransformation[0], -modelTransformation[5], modelTransformation[10]];
      }
      return [Math.sqrt(modelTransformation[0] * modelTransformation[0] + modelTransformation[4] * modelTransformation[4]), -Math.sqrt(modelTransformation[1] * modelTransformation[1] + modelTransformation[5] * modelTransformation[5]), modelTransformation[10]];
    }
    if (referenceImage) {
      const [refResX, refResY, refResZ] = referenceImage.getResolution();
      return [refResX * referenceImage.getWidth() / this.getWidth(), refResY * referenceImage.getHeight() / this.getHeight(), refResZ * referenceImage.getWidth() / this.getWidth()];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(tilegrid = false) {
    const height = this.getHeight();
    const width = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !tilegrid) {
      const [a, b, c, d, e, f, g, h] = this.fileDirectory.ModelTransformation;
      const corners = [[0, 0], [0, height], [width, 0], [width, height]];
      const projected = corners.map(([I, J]) => [d + a * I + b * J, h + e * I + f * J]);
      const xs = projected.map((pt) => pt[0]);
      const ys = projected.map((pt) => pt[1]);
      return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    } else {
      const origin = this.getOrigin();
      const resolution = this.getResolution();
      const x1 = origin[0];
      const y1 = origin[1];
      const x2 = x1 + resolution[0] * width;
      const y2 = y1 + resolution[1] * height;
      return [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
    }
  }
};
var geotiffimage_default = GeoTIFFImage;

// node_modules/geotiff/dist-module/dataview64.js
var DataView64 = class {
  constructor(arrayBuffer) {
    this._dataView = new DataView(arrayBuffer);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(offset, littleEndian) {
    const left = this.getUint32(offset, littleEndian);
    const right = this.getUint32(offset + 4, littleEndian);
    let combined;
    if (littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(offset, littleEndian) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  getUint8(offset, littleEndian) {
    return this._dataView.getUint8(offset, littleEndian);
  }
  getInt8(offset, littleEndian) {
    return this._dataView.getInt8(offset, littleEndian);
  }
  getUint16(offset, littleEndian) {
    return this._dataView.getUint16(offset, littleEndian);
  }
  getInt16(offset, littleEndian) {
    return this._dataView.getInt16(offset, littleEndian);
  }
  getUint32(offset, littleEndian) {
    return this._dataView.getUint32(offset, littleEndian);
  }
  getInt32(offset, littleEndian) {
    return this._dataView.getInt32(offset, littleEndian);
  }
  getFloat16(offset, littleEndian) {
    return getFloat16(this._dataView, offset, littleEndian);
  }
  getFloat32(offset, littleEndian) {
    return this._dataView.getFloat32(offset, littleEndian);
  }
  getFloat64(offset, littleEndian) {
    return this._dataView.getFloat64(offset, littleEndian);
  }
};

// node_modules/geotiff/dist-module/dataslice.js
var DataSlice = class {
  constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
    this._dataView = new DataView(arrayBuffer);
    this._sliceOffset = sliceOffset;
    this._littleEndian = littleEndian;
    this._bigTiff = bigTiff;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  covers(offset, length) {
    return this.sliceOffset <= offset && this.sliceTop >= offset + length;
  }
  readUint8(offset) {
    return this._dataView.getUint8(offset - this._sliceOffset, this._littleEndian);
  }
  readInt8(offset) {
    return this._dataView.getInt8(offset - this._sliceOffset, this._littleEndian);
  }
  readUint16(offset) {
    return this._dataView.getUint16(offset - this._sliceOffset, this._littleEndian);
  }
  readInt16(offset) {
    return this._dataView.getInt16(offset - this._sliceOffset, this._littleEndian);
  }
  readUint32(offset) {
    return this._dataView.getUint32(offset - this._sliceOffset, this._littleEndian);
  }
  readInt32(offset) {
    return this._dataView.getInt32(offset - this._sliceOffset, this._littleEndian);
  }
  readFloat32(offset) {
    return this._dataView.getFloat32(offset - this._sliceOffset, this._littleEndian);
  }
  readFloat64(offset) {
    return this._dataView.getFloat64(offset - this._sliceOffset, this._littleEndian);
  }
  readUint64(offset) {
    const left = this.readUint32(offset);
    const right = this.readUint32(offset + 4);
    let combined;
    if (this._littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(`${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`);
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(offset) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte = this._dataView.getUint8(offset + (this._littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte !== 0) {
            byte = ~(byte - 1) & 255;
            carrying = false;
          }
        } else {
          byte = ~byte & 255;
        }
      }
      value += byte * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  readOffset(offset) {
    if (this._bigTiff) {
      return this.readUint64(offset);
    }
    return this.readUint32(offset);
  }
};

// node_modules/geotiff/dist-module/pool.js
var defaultPoolSize = typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 2 : 2;
var Pool = class {
  /**
   * @constructor
   * @param {Number} [size] The size of the pool. Defaults to the number of CPUs
   *                      available. When this parameter is `null` or 0, then the
   *                      decoding will be done in the main thread.
   * @param {function(): Worker} [createWorker] A function that creates the decoder worker.
   * Defaults to a worker with all decoders that ship with geotiff.js. The `createWorker()`
   * function is expected to return a `Worker` compatible with Web Workers. For code that
   * runs in Node, [web-worker](https://www.npmjs.com/package/web-worker) is a good choice.
   *
   * A worker that uses a custom lzw decoder would look like this `my-custom-worker.js` file:
   * ```js
   * import { addDecoder, getDecoder } from 'geotiff';
   * addDecoder(5, () => import ('./my-custom-lzw').then((m) => m.default));
   * self.addEventListener('message', async (e) => {
   *   const { id, fileDirectory, buffer } = e.data;
   *   const decoder = await getDecoder(fileDirectory);
   *   const decoded = await decoder.decode(fileDirectory, buffer);
   *   self.postMessage({ decoded, id }, [decoded]);
   * });
   * ```
   * The way the above code is built into a worker by the `createWorker()` function
   * depends on the used bundler. For most bundlers, something like this will work:
   * ```js
   * function createWorker() {
   *   return new Worker(new URL('./my-custom-worker.js', import.meta.url));
   * }
   * ```
   */
  constructor(size = defaultPoolSize, createWorker2) {
    this.workers = null;
    this._awaitingDecoder = null;
    this.size = size;
    this.messageId = 0;
    if (size) {
      this._awaitingDecoder = createWorker2 ? Promise.resolve(createWorker2) : new Promise((resolve) => {
        import("./decoder-E6OPDEGA.js").then((module) => {
          resolve(module.create);
        });
      });
      this._awaitingDecoder.then((create3) => {
        this._awaitingDecoder = null;
        this.workers = [];
        for (let i = 0; i < size; i++) {
          this.workers.push({
            worker: create3(),
            idle: true
          });
        }
      });
    }
  }
  /**
   * Decode the given block of bytes with the set compression method.
   * @param {ArrayBuffer} buffer the array buffer of bytes to decode.
   * @returns {Promise<ArrayBuffer>} the decoded result as a `Promise`
   */
  decode(fileDirectory, buffer3) {
    return __async(this, null, function* () {
      if (this._awaitingDecoder) {
        yield this._awaitingDecoder;
      }
      return this.size === 0 ? getDecoder(fileDirectory).then((decoder) => decoder.decode(fileDirectory, buffer3)) : new Promise((resolve) => {
        const worker = this.workers.find((candidate) => candidate.idle) || this.workers[Math.floor(Math.random() * this.size)];
        worker.idle = false;
        const id = this.messageId++;
        const onMessage = (e) => {
          if (e.data.id === id) {
            worker.idle = true;
            resolve(e.data.decoded);
            worker.worker.removeEventListener("message", onMessage);
          }
        };
        worker.worker.addEventListener("message", onMessage);
        worker.worker.postMessage({
          fileDirectory,
          buffer: buffer3,
          id
        }, [buffer3]);
      });
    });
  }
  destroy() {
    if (this.workers) {
      this.workers.forEach((worker) => {
        worker.worker.terminate();
      });
      this.workers = null;
    }
  }
};
var pool_default = Pool;

// node_modules/geotiff/dist-module/source/httputils.js
var CRLFCRLF = "\r\n\r\n";
function itemsToObject(items) {
  if (typeof Object.fromEntries !== "undefined") {
    return Object.fromEntries(items);
  }
  const obj = {};
  for (const [key, value] of items) {
    obj[key.toLowerCase()] = value;
  }
  return obj;
}
function parseHeaders(text) {
  const items = text.split("\r\n").map((line) => {
    const kv = line.split(":").map((str) => str.trim());
    kv[0] = kv[0].toLowerCase();
    return kv;
  });
  return itemsToObject(items);
}
function parseContentType(rawContentType) {
  const [type, ...rawParams] = rawContentType.split(";").map((s) => s.trim());
  const paramsItems = rawParams.map((param) => param.split("="));
  return {
    type,
    params: itemsToObject(paramsItems)
  };
}
function parseContentRange(rawContentRange) {
  let start;
  let end;
  let total;
  if (rawContentRange) {
    [, start, end, total] = rawContentRange.match(/bytes (\d+)-(\d+)\/(\d+)/);
    start = parseInt(start, 10);
    end = parseInt(end, 10);
    total = parseInt(total, 10);
  }
  return {
    start,
    end,
    total
  };
}
function parseByteRanges(responseArrayBuffer, boundary) {
  let offset = null;
  const decoder = new TextDecoder("ascii");
  const out = [];
  const startBoundary = `--${boundary}`;
  const endBoundary = `${startBoundary}--`;
  for (let i = 0; i < 10; ++i) {
    const text = decoder.decode(new Uint8Array(responseArrayBuffer, i, startBoundary.length));
    if (text === startBoundary) {
      offset = i;
    }
  }
  if (offset === null) {
    throw new Error("Could not find initial boundary");
  }
  while (offset < responseArrayBuffer.byteLength) {
    const text = decoder.decode(new Uint8Array(responseArrayBuffer, offset, Math.min(startBoundary.length + 1024, responseArrayBuffer.byteLength - offset)));
    if (text.length === 0 || text.startsWith(endBoundary)) {
      break;
    }
    if (!text.startsWith(startBoundary)) {
      throw new Error("Part does not start with boundary");
    }
    const innerText = text.substr(startBoundary.length + 2);
    if (innerText.length === 0) {
      break;
    }
    const endOfHeaders = innerText.indexOf(CRLFCRLF);
    const headers = parseHeaders(innerText.substr(0, endOfHeaders));
    const {
      start,
      end,
      total
    } = parseContentRange(headers["content-range"]);
    const startOfData = offset + startBoundary.length + endOfHeaders + CRLFCRLF.length;
    const length = parseInt(end, 10) + 1 - parseInt(start, 10);
    out.push({
      headers,
      data: responseArrayBuffer.slice(startOfData, startOfData + length),
      offset: start,
      length,
      fileSize: total
    });
    offset = startOfData + length + 4;
  }
  return out;
}

// node_modules/geotiff/dist-module/source/basesource.js
var BaseSource = class {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  fetch(slices, signal = void 0) {
    return __async(this, null, function* () {
      return Promise.all(slices.map((slice) => this.fetchSlice(slice, signal)));
    });
  }
  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  fetchSlice(slice) {
    return __async(this, null, function* () {
      throw new Error(`fetching of slice ${slice} not possible, not implemented`);
    });
  }
  /**
   * Returns the filesize if already determined and null otherwise
   */
  get fileSize() {
    return null;
  }
  close() {
    return __async(this, null, function* () {
    });
  }
};

// node_modules/quick-lru/index.js
var QuickLRU = class extends Map {
  constructor(options = {}) {
    super();
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof options.maxAge === "number" && options.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    this.maxSize = options.maxSize;
    this.maxAge = options.maxAge || Number.POSITIVE_INFINITY;
    this.onEviction = options.onEviction;
    this.cache = /* @__PURE__ */ new Map();
    this.oldCache = /* @__PURE__ */ new Map();
    this._size = 0;
  }
  // TODO: Use private class methods when targeting Node.js 16.
  _emitEvictions(cache) {
    if (typeof this.onEviction !== "function") {
      return;
    }
    for (const [key, item] of cache) {
      this.onEviction(key, item.value);
    }
  }
  _deleteIfExpired(key, item) {
    if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
      if (typeof this.onEviction === "function") {
        this.onEviction(key, item.value);
      }
      return this.delete(key);
    }
    return false;
  }
  _getOrDeleteIfExpired(key, item) {
    const deleted = this._deleteIfExpired(key, item);
    if (deleted === false) {
      return item.value;
    }
  }
  _getItemValue(key, item) {
    return item.expiry ? this._getOrDeleteIfExpired(key, item) : item.value;
  }
  _peek(key, cache) {
    const item = cache.get(key);
    return this._getItemValue(key, item);
  }
  _set(key, value) {
    this.cache.set(key, value);
    this._size++;
    if (this._size >= this.maxSize) {
      this._size = 0;
      this._emitEvictions(this.oldCache);
      this.oldCache = this.cache;
      this.cache = /* @__PURE__ */ new Map();
    }
  }
  _moveToRecent(key, item) {
    this.oldCache.delete(key);
    this._set(key, item);
  }
  *_entriesAscending() {
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield item;
        }
      }
    }
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield item;
      }
    }
  }
  get(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      return this._getItemValue(key, item);
    }
    if (this.oldCache.has(key)) {
      const item = this.oldCache.get(key);
      if (this._deleteIfExpired(key, item) === false) {
        this._moveToRecent(key, item);
        return item.value;
      }
    }
  }
  set(key, value, {
    maxAge = this.maxAge
  } = {}) {
    const expiry = typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY ? Date.now() + maxAge : void 0;
    if (this.cache.has(key)) {
      this.cache.set(key, {
        value,
        expiry
      });
    } else {
      this._set(key, {
        value,
        expiry
      });
    }
    return this;
  }
  has(key) {
    if (this.cache.has(key)) {
      return !this._deleteIfExpired(key, this.cache.get(key));
    }
    if (this.oldCache.has(key)) {
      return !this._deleteIfExpired(key, this.oldCache.get(key));
    }
    return false;
  }
  peek(key) {
    if (this.cache.has(key)) {
      return this._peek(key, this.cache);
    }
    if (this.oldCache.has(key)) {
      return this._peek(key, this.oldCache);
    }
  }
  delete(key) {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this._size--;
    }
    return this.oldCache.delete(key) || deleted;
  }
  clear() {
    this.cache.clear();
    this.oldCache.clear();
    this._size = 0;
  }
  resize(newSize) {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    const items = [...this._entriesAscending()];
    const removeCount = items.length - newSize;
    if (removeCount < 0) {
      this.cache = new Map(items);
      this.oldCache = /* @__PURE__ */ new Map();
      this._size = items.length;
    } else {
      if (removeCount > 0) {
        this._emitEvictions(items.slice(0, removeCount));
      }
      this.oldCache = new Map(items.slice(removeCount));
      this.cache = /* @__PURE__ */ new Map();
      this._size = 0;
    }
    this.maxSize = newSize;
  }
  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }
  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }
  *[Symbol.iterator]() {
    for (const item of this.cache) {
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    for (const item of this.oldCache) {
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesDescending() {
    let items = [...this.cache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      const deleted = this._deleteIfExpired(key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    items = [...this.oldCache];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      if (!this.cache.has(key)) {
        const deleted = this._deleteIfExpired(key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [key, value] of this._entriesAscending()) {
      yield [key, value.value];
    }
  }
  get size() {
    if (!this._size) {
      return this.oldCache.size;
    }
    let oldCacheSize = 0;
    for (const key of this.oldCache.keys()) {
      if (!this.cache.has(key)) {
        oldCacheSize++;
      }
    }
    return Math.min(this._size + oldCacheSize, this.maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(callbackFunction, thisArgument = this) {
    for (const [key, value] of this.entriesAscending()) {
      callbackFunction.call(thisArgument, value, key, this);
    }
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
};

// node_modules/geotiff/dist-module/utils.js
function assign(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = source[key];
    }
  }
}
function invert(oldObj) {
  const newObj = {};
  for (const key in oldObj) {
    if (oldObj.hasOwnProperty(key)) {
      const value = oldObj[key];
      newObj[value] = key;
    }
  }
  return newObj;
}
function times(numTimes, func) {
  const results = [];
  for (let i = 0; i < numTimes; i++) {
    results.push(func(i));
  }
  return results;
}
function wait(milliseconds) {
  return __async(this, null, function* () {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  });
}
function zip(a, b) {
  const A = Array.isArray(a) ? a : Array.from(a);
  const B = Array.isArray(b) ? b : Array.from(b);
  return A.map((k, i) => [k, B[i]]);
}
var AbortError = class _AbortError extends Error {
  constructor(params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _AbortError);
    }
    this.name = "AbortError";
  }
};
var CustomAggregateError = class extends Error {
  constructor(errors, message) {
    super(message);
    this.errors = errors;
    this.message = message;
    this.name = "AggregateError";
  }
};
var AggregateError = CustomAggregateError;

// node_modules/geotiff/dist-module/source/blockedsource.js
var Block = class {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {ArrayBuffer} [data]
   */
  constructor(offset, length, data = null) {
    this.offset = offset;
    this.length = length;
    this.data = data;
  }
  /**
   * @returns {number} the top byte border
   */
  get top() {
    return this.offset + this.length;
  }
};
var BlockGroup = class {
  /**
   *
   * @param {number} offset
   * @param {number} length
   * @param {number[]} blockIds
   */
  constructor(offset, length, blockIds) {
    this.offset = offset;
    this.length = length;
    this.blockIds = blockIds;
  }
};
var BlockedSource = class extends BaseSource {
  /**
   *
   * @param {BaseSource} source The underlying source that shall be blocked and cached
   * @param {object} options
   * @param {number} [options.blockSize]
   * @param {number} [options.cacheSize]
   */
  constructor(source, {
    blockSize = 65536,
    cacheSize = 100
  } = {}) {
    super();
    this.source = source;
    this.blockSize = blockSize;
    this.blockCache = new QuickLRU({
      maxSize: cacheSize,
      onEviction: (blockId, block) => {
        this.evictedBlocks.set(blockId, block);
      }
    });
    this.evictedBlocks = /* @__PURE__ */ new Map();
    this.blockRequests = /* @__PURE__ */ new Map();
    this.blockIdsToFetch = /* @__PURE__ */ new Set();
    this.abortedBlockIds = /* @__PURE__ */ new Set();
  }
  get fileSize() {
    return this.source.fileSize;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   */
  fetch(slices, signal) {
    return __async(this, null, function* () {
      const blockRequests = [];
      const missingBlockIds = [];
      const allBlockIds = [];
      this.evictedBlocks.clear();
      for (const {
        offset,
        length
      } of slices) {
        let top = offset + length;
        const {
          fileSize
        } = this;
        if (fileSize !== null) {
          top = Math.min(top, fileSize);
        }
        const firstBlockOffset = Math.floor(offset / this.blockSize) * this.blockSize;
        for (let current = firstBlockOffset; current < top; current += this.blockSize) {
          const blockId = Math.floor(current / this.blockSize);
          if (!this.blockCache.has(blockId) && !this.blockRequests.has(blockId)) {
            this.blockIdsToFetch.add(blockId);
            missingBlockIds.push(blockId);
          }
          if (this.blockRequests.has(blockId)) {
            blockRequests.push(this.blockRequests.get(blockId));
          }
          allBlockIds.push(blockId);
        }
      }
      yield wait();
      this.fetchBlocks(signal);
      const missingRequests = [];
      for (const blockId of missingBlockIds) {
        if (this.blockRequests.has(blockId)) {
          missingRequests.push(this.blockRequests.get(blockId));
        }
      }
      yield Promise.allSettled(blockRequests);
      yield Promise.allSettled(missingRequests);
      const abortedBlockRequests = [];
      const abortedBlockIds = allBlockIds.filter((id) => this.abortedBlockIds.has(id) || !this.blockCache.has(id));
      abortedBlockIds.forEach((id) => this.blockIdsToFetch.add(id));
      if (abortedBlockIds.length > 0 && signal && !signal.aborted) {
        this.fetchBlocks(null);
        for (const blockId of abortedBlockIds) {
          const block = this.blockRequests.get(blockId);
          if (!block) {
            throw new Error(`Block ${blockId} is not in the block requests`);
          }
          abortedBlockRequests.push(block);
        }
        yield Promise.allSettled(abortedBlockRequests);
      }
      if (signal && signal.aborted) {
        throw new AbortError("Request was aborted");
      }
      const blocks = allBlockIds.map((id) => this.blockCache.get(id) || this.evictedBlocks.get(id));
      const failedBlocks = blocks.filter((i) => !i);
      if (failedBlocks.length) {
        throw new AggregateError(failedBlocks, "Request failed");
      }
      const requiredBlocks = new Map(zip(allBlockIds, blocks));
      return this.readSliceData(slices, requiredBlocks);
    });
  }
  /**
   *
   * @param {AbortSignal} signal
   */
  fetchBlocks(signal) {
    if (this.blockIdsToFetch.size > 0) {
      const groups = this.groupBlocks(this.blockIdsToFetch);
      const groupRequests = this.source.fetch(groups, signal);
      for (let groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
        const group = groups[groupIndex];
        for (const blockId of group.blockIds) {
          this.blockRequests.set(blockId, (() => __async(this, null, function* () {
            try {
              const response = (yield groupRequests)[groupIndex];
              const blockOffset = blockId * this.blockSize;
              const o = blockOffset - response.offset;
              const t = Math.min(o + this.blockSize, response.data.byteLength);
              const data = response.data.slice(o, t);
              const block = new Block(blockOffset, data.byteLength, data, blockId);
              this.blockCache.set(blockId, block);
              this.abortedBlockIds.delete(blockId);
            } catch (err) {
              if (err.name === "AbortError") {
                err.signal = signal;
                this.blockCache.delete(blockId);
                this.abortedBlockIds.add(blockId);
              } else {
                throw err;
              }
            } finally {
              this.blockRequests.delete(blockId);
            }
          }))());
        }
      }
      this.blockIdsToFetch.clear();
    }
  }
  /**
   *
   * @param {Set} blockIds
   * @returns {BlockGroup[]}
   */
  groupBlocks(blockIds) {
    const sortedBlockIds = Array.from(blockIds).sort((a, b) => a - b);
    if (sortedBlockIds.length === 0) {
      return [];
    }
    let current = [];
    let lastBlockId = null;
    const groups = [];
    for (const blockId of sortedBlockIds) {
      if (lastBlockId === null || lastBlockId + 1 === blockId) {
        current.push(blockId);
        lastBlockId = blockId;
      } else {
        groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
        current = [blockId];
        lastBlockId = blockId;
      }
    }
    groups.push(new BlockGroup(current[0] * this.blockSize, current.length * this.blockSize, current));
    return groups;
  }
  /**
   *
   * @param {import("./basesource").Slice[]} slices
   * @param {Map} blocks
   */
  readSliceData(slices, blocks) {
    return slices.map((slice) => {
      let top = slice.offset + slice.length;
      if (this.fileSize !== null) {
        top = Math.min(this.fileSize, top);
      }
      const blockIdLow = Math.floor(slice.offset / this.blockSize);
      const blockIdHigh = Math.floor(top / this.blockSize);
      const sliceData = new ArrayBuffer(slice.length);
      const sliceView = new Uint8Array(sliceData);
      for (let blockId = blockIdLow; blockId <= blockIdHigh; ++blockId) {
        const block = blocks.get(blockId);
        const delta = block.offset - slice.offset;
        const topDelta = block.top - top;
        let blockInnerOffset = 0;
        let rangeInnerOffset = 0;
        let usedBlockLength;
        if (delta < 0) {
          blockInnerOffset = -delta;
        } else if (delta > 0) {
          rangeInnerOffset = delta;
        }
        if (topDelta < 0) {
          usedBlockLength = block.length - blockInnerOffset;
        } else {
          usedBlockLength = top - block.offset - blockInnerOffset;
        }
        const blockView = new Uint8Array(block.data, blockInnerOffset, usedBlockLength);
        sliceView.set(blockView, rangeInnerOffset);
      }
      return sliceData;
    });
  }
};

// node_modules/geotiff/dist-module/source/client/base.js
var BaseResponse = class {
  /**
   * Returns whether the response has an ok'ish status code
   */
  get ok() {
    return this.status >= 200 && this.status <= 299;
  }
  /**
   * Returns the status code of the response
   */
  get status() {
    throw new Error("not implemented");
  }
  /**
   * Returns the value of the specified header
   * @param {string} headerName the header name
   * @returns {string} the header value
   */
  getHeader(headerName) {
    throw new Error("not implemented");
  }
  /**
   * @returns {ArrayBuffer} the response data of the request
   */
  getData() {
    return __async(this, null, function* () {
      throw new Error("not implemented");
    });
  }
};
var BaseClient = class {
  constructor(url) {
    this.url = url;
  }
  /**
   * Send a request with the options
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<BaseResponse>}
   */
  request() {
    return __async(this, arguments, function* ({
      headers,
      signal
    } = {}) {
      throw new Error("request is not implemented");
    });
  }
};

// node_modules/geotiff/dist-module/source/client/fetch.js
var FetchResponse = class extends BaseResponse {
  /**
   * BaseResponse facade for fetch API Response
   * @param {Response} response
   */
  constructor(response) {
    super();
    this.response = response;
  }
  get status() {
    return this.response.status;
  }
  getHeader(name) {
    return this.response.headers.get(name);
  }
  getData() {
    return __async(this, null, function* () {
      const data = this.response.arrayBuffer ? yield this.response.arrayBuffer() : (yield this.response.buffer()).buffer;
      return data;
    });
  }
};
var FetchClient = class extends BaseClient {
  constructor(url, credentials) {
    super(url);
    this.credentials = credentials;
  }
  /**
   * @param {{headers: HeadersInit, signal: AbortSignal}} [options={}]
   * @returns {Promise<FetchResponse>}
   */
  request() {
    return __async(this, arguments, function* ({
      headers,
      signal
    } = {}) {
      const response = yield fetch(this.url, {
        headers,
        credentials: this.credentials,
        signal
      });
      return new FetchResponse(response);
    });
  }
};

// node_modules/geotiff/dist-module/source/client/xhr.js
var XHRResponse = class extends BaseResponse {
  /**
   * BaseResponse facade for XMLHttpRequest
   * @param {XMLHttpRequest} xhr
   * @param {ArrayBuffer} data
   */
  constructor(xhr, data) {
    super();
    this.xhr = xhr;
    this.data = data;
  }
  get status() {
    return this.xhr.status;
  }
  getHeader(name) {
    return this.xhr.getResponseHeader(name);
  }
  getData() {
    return __async(this, null, function* () {
      return this.data;
    });
  }
};
var XHRClient = class extends BaseClient {
  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", this.url);
      xhr.responseType = "arraybuffer";
      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
      }
      xhr.onload = () => {
        const data = xhr.response;
        resolve(new XHRResponse(xhr, data));
      };
      xhr.onerror = reject;
      xhr.onabort = () => reject(new AbortError("Request aborted"));
      xhr.send();
      if (signal) {
        if (signal.aborted) {
          xhr.abort();
        }
        signal.addEventListener("abort", () => xhr.abort());
      }
    });
  }
  request() {
    return __async(this, arguments, function* ({
      headers,
      signal
    } = {}) {
      const response = yield this.constructRequest(headers, signal);
      return response;
    });
  }
};

// node_modules/geotiff/dist-module/source/client/http.js
var import_http = __toESM(require_http(), 1);
var import_https = __toESM(require_https(), 1);
var import_url = __toESM(require_url(), 1);
var HttpResponse = class extends BaseResponse {
  /**
   * BaseResponse facade for node HTTP/HTTPS API Response
   * @param {http.ServerResponse} response
   */
  constructor(response, dataPromise) {
    super();
    this.response = response;
    this.dataPromise = dataPromise;
  }
  get status() {
    return this.response.statusCode;
  }
  getHeader(name) {
    return this.response.headers[name];
  }
  getData() {
    return __async(this, null, function* () {
      const data = yield this.dataPromise;
      return data;
    });
  }
};
var HttpClient = class extends BaseClient {
  constructor(url) {
    super(url);
    this.parsedUrl = import_url.default.parse(this.url);
    this.httpApi = this.parsedUrl.protocol === "http:" ? import_http.default : import_https.default;
  }
  constructRequest(headers, signal) {
    return new Promise((resolve, reject) => {
      const request = this.httpApi.get(__spreadProps(__spreadValues({}, this.parsedUrl), {
        headers
      }), (response) => {
        const dataPromise = new Promise((resolveData) => {
          const chunks = [];
          response.on("data", (chunk) => {
            chunks.push(chunk);
          });
          response.on("end", () => {
            const data = Buffer.concat(chunks).buffer;
            resolveData(data);
          });
          response.on("error", reject);
        });
        resolve(new HttpResponse(response, dataPromise));
      });
      request.on("error", reject);
      if (signal) {
        if (signal.aborted) {
          request.destroy(new AbortError("Request aborted"));
        }
        signal.addEventListener("abort", () => request.destroy(new AbortError("Request aborted")));
      }
    });
  }
  request() {
    return __async(this, arguments, function* ({
      headers,
      signal
    } = {}) {
      const response = yield this.constructRequest(headers, signal);
      return response;
    });
  }
};

// node_modules/geotiff/dist-module/source/remote.js
var RemoteSource = class extends BaseSource {
  /**
   *
   * @param {BaseClient} client
   * @param {object} headers
   * @param {numbers} maxRanges
   * @param {boolean} allowFullFile
   */
  constructor(client, headers, maxRanges, allowFullFile) {
    super();
    this.client = client;
    this.headers = headers;
    this.maxRanges = maxRanges;
    this.allowFullFile = allowFullFile;
    this._fileSize = null;
  }
  /**
   *
   * @param {Slice[]} slices
   */
  fetch(slices, signal) {
    return __async(this, null, function* () {
      if (this.maxRanges >= slices.length) {
        return this.fetchSlices(slices, signal);
      } else if (this.maxRanges > 0 && slices.length > 1) {
      }
      return Promise.all(slices.map((slice) => this.fetchSlice(slice, signal)));
    });
  }
  fetchSlices(slices, signal) {
    return __async(this, null, function* () {
      const response = yield this.client.request({
        headers: __spreadProps(__spreadValues({}, this.headers), {
          Range: `bytes=${slices.map(({
            offset,
            length
          }) => `${offset}-${offset + length}`).join(",")}`
        }),
        signal
      });
      if (!response.ok) {
        throw new Error("Error fetching data.");
      } else if (response.status === 206) {
        const {
          type,
          params
        } = parseContentType(response.getHeader("content-type"));
        if (type === "multipart/byteranges") {
          const byteRanges = parseByteRanges(yield response.getData(), params.boundary);
          this._fileSize = byteRanges[0].fileSize || null;
          return byteRanges;
        }
        const data = yield response.getData();
        const {
          start,
          end,
          total
        } = parseContentRange(response.getHeader("content-range"));
        this._fileSize = total || null;
        const first = [{
          data,
          offset: start,
          length: end - start
        }];
        if (slices.length > 1) {
          const others = yield Promise.all(slices.slice(1).map((slice) => this.fetchSlice(slice, signal)));
          return first.concat(others);
        }
        return first;
      } else {
        if (!this.allowFullFile) {
          throw new Error("Server responded with full file");
        }
        const data = yield response.getData();
        this._fileSize = data.byteLength;
        return [{
          data,
          offset: 0,
          length: data.byteLength
        }];
      }
    });
  }
  fetchSlice(slice, signal) {
    return __async(this, null, function* () {
      const {
        offset,
        length
      } = slice;
      const response = yield this.client.request({
        headers: __spreadProps(__spreadValues({}, this.headers), {
          Range: `bytes=${offset}-${offset + length}`
        }),
        signal
      });
      if (!response.ok) {
        throw new Error("Error fetching data.");
      } else if (response.status === 206) {
        const data = yield response.getData();
        const {
          total
        } = parseContentRange(response.getHeader("content-range"));
        this._fileSize = total || null;
        return {
          data,
          offset,
          length
        };
      } else {
        if (!this.allowFullFile) {
          throw new Error("Server responded with full file");
        }
        const data = yield response.getData();
        this._fileSize = data.byteLength;
        return {
          data,
          offset: 0,
          length: data.byteLength
        };
      }
    });
  }
  get fileSize() {
    return this._fileSize;
  }
};
function maybeWrapInBlockedSource(source, {
  blockSize,
  cacheSize
}) {
  if (blockSize === null) {
    return source;
  }
  return new BlockedSource(source, {
    blockSize,
    cacheSize
  });
}
function makeFetchSource(url, _a = {}) {
  var _b = _a, {
    headers = {},
    credentials,
    maxRanges = 0,
    allowFullFile = false
  } = _b, blockOptions = __objRest(_b, [
    "headers",
    "credentials",
    "maxRanges",
    "allowFullFile"
  ]);
  const client = new FetchClient(url, credentials);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeXHRSource(url, _a = {}) {
  var _b = _a, {
    headers = {},
    maxRanges = 0,
    allowFullFile = false
  } = _b, blockOptions = __objRest(_b, [
    "headers",
    "maxRanges",
    "allowFullFile"
  ]);
  const client = new XHRClient(url);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeHttpSource(url, _a = {}) {
  var _b = _a, {
    headers = {},
    maxRanges = 0,
    allowFullFile = false
  } = _b, blockOptions = __objRest(_b, [
    "headers",
    "maxRanges",
    "allowFullFile"
  ]);
  const client = new HttpClient(url);
  const source = new RemoteSource(client, headers, maxRanges, allowFullFile);
  return maybeWrapInBlockedSource(source, blockOptions);
}
function makeRemoteSource(url, _a = {}) {
  var _b = _a, {
    forceXHR = false
  } = _b, clientOptions = __objRest(_b, [
    "forceXHR"
  ]);
  if (typeof fetch === "function" && !forceXHR) {
    return makeFetchSource(url, clientOptions);
  }
  if (typeof XMLHttpRequest !== "undefined") {
    return makeXHRSource(url, clientOptions);
  }
  return makeHttpSource(url, clientOptions);
}

// node_modules/geotiff/dist-module/source/filereader.js
var FileReaderSource = class extends BaseSource {
  constructor(file) {
    super();
    this.file = file;
  }
  fetchSlice(slice, signal) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const blob = this.file.slice(slice.offset, slice.offset + slice.length);
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = reject;
        reader.onabort = reject;
        reader.readAsArrayBuffer(blob);
        if (signal) {
          signal.addEventListener("abort", () => reader.abort());
        }
      });
    });
  }
};
function makeFileReaderSource(file) {
  return new FileReaderSource(file);
}

// node_modules/geotiff/dist-module/source/file.js
var import_fs = __toESM(require_fs(), 1);

// node_modules/geotiff/dist-module/geotiffwriter.js
var tagName2Code = invert(fieldTagNames);
var geoKeyName2Code = invert(geoKeyNames);
var name2code = {};
assign(name2code, tagName2Code);
assign(name2code, geoKeyName2Code);
var typeName2byte = invert(fieldTypeNames);
var _binBE = {
  nextZero: (data, o) => {
    let oincr = o;
    while (data[oincr] !== 0) {
      oincr++;
    }
    return oincr;
  },
  readUshort: (buff, p) => {
    return buff[p] << 8 | buff[p + 1];
  },
  readShort: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 1];
    a[1] = buff[p + 0];
    return _binBE.i16[0];
  },
  readInt: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.i32[0];
  },
  readUint: (buff, p) => {
    const a = _binBE.ui8;
    a[0] = buff[p + 3];
    a[1] = buff[p + 2];
    a[2] = buff[p + 1];
    a[3] = buff[p + 0];
    return _binBE.ui32[0];
  },
  readASCII: (buff, p, l) => {
    return l.map((i) => String.fromCharCode(buff[p + i])).join("");
  },
  readFloat: (buff, p) => {
    const a = _binBE.ui8;
    times(4, (i) => {
      a[i] = buff[p + 3 - i];
    });
    return _binBE.fl32[0];
  },
  readDouble: (buff, p) => {
    const a = _binBE.ui8;
    times(8, (i) => {
      a[i] = buff[p + 7 - i];
    });
    return _binBE.fl64[0];
  },
  writeUshort: (buff, p, n) => {
    buff[p] = n >> 8 & 255;
    buff[p + 1] = n & 255;
  },
  writeUint: (buff, p, n) => {
    buff[p] = n >> 24 & 255;
    buff[p + 1] = n >> 16 & 255;
    buff[p + 2] = n >> 8 & 255;
    buff[p + 3] = n >> 0 & 255;
  },
  writeASCII: (buff, p, s) => {
    times(s.length, (i) => {
      buff[p + i] = s.charCodeAt(i);
    });
  },
  ui8: new Uint8Array(8)
};
_binBE.fl64 = new Float64Array(_binBE.ui8.buffer);
_binBE.writeDouble = (buff, p, n) => {
  _binBE.fl64[0] = n;
  times(8, (i) => {
    buff[p + i] = _binBE.ui8[7 - i];
  });
};

// node_modules/geotiff/dist-module/logging.js
var DummyLogger = class {
  log() {
  }
  debug() {
  }
  info() {
  }
  warn() {
  }
  error() {
  }
  time() {
  }
  timeEnd() {
  }
};
var LOGGER = new DummyLogger();

// node_modules/geotiff/dist-module/geotiff.js
function getFieldTypeLength(fieldType) {
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.SBYTE:
    case fieldTypes.UNDEFINED:
      return 1;
    case fieldTypes.SHORT:
    case fieldTypes.SSHORT:
      return 2;
    case fieldTypes.LONG:
    case fieldTypes.SLONG:
    case fieldTypes.FLOAT:
    case fieldTypes.IFD:
      return 4;
    case fieldTypes.RATIONAL:
    case fieldTypes.SRATIONAL:
    case fieldTypes.DOUBLE:
    case fieldTypes.LONG8:
    case fieldTypes.SLONG8:
    case fieldTypes.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}
function parseGeoKeyDirectory(fileDirectory) {
  const rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;
  if (!rawGeoKeyDirectory) {
    return null;
  }
  const geoKeyDirectory = {};
  for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
    const key = geoKeyNames[rawGeoKeyDirectory[i]];
    const location = rawGeoKeyDirectory[i + 1] ? fieldTagNames[rawGeoKeyDirectory[i + 1]] : null;
    const count = rawGeoKeyDirectory[i + 2];
    const offset = rawGeoKeyDirectory[i + 3];
    let value = null;
    if (!location) {
      value = offset;
    } else {
      value = fileDirectory[location];
      if (typeof value === "undefined" || value === null) {
        throw new Error(`Could not get value of geoKey '${key}'.`);
      } else if (typeof value === "string") {
        value = value.substring(offset, offset + count - 1);
      } else if (value.subarray) {
        value = value.subarray(offset, offset + count);
        if (count === 1) {
          value = value[0];
        }
      }
    }
    geoKeyDirectory[key] = value;
  }
  return geoKeyDirectory;
}
function getValues(dataSlice, fieldType, count, offset) {
  let values2 = null;
  let readMethod = null;
  const fieldTypeLength = getFieldTypeLength(fieldType);
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      values2 = new Uint8Array(count);
      readMethod = dataSlice.readUint8;
      break;
    case fieldTypes.SBYTE:
      values2 = new Int8Array(count);
      readMethod = dataSlice.readInt8;
      break;
    case fieldTypes.SHORT:
      values2 = new Uint16Array(count);
      readMethod = dataSlice.readUint16;
      break;
    case fieldTypes.SSHORT:
      values2 = new Int16Array(count);
      readMethod = dataSlice.readInt16;
      break;
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      values2 = new Uint32Array(count);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SLONG:
      values2 = new Int32Array(count);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      values2 = new Array(count);
      readMethod = dataSlice.readUint64;
      break;
    case fieldTypes.SLONG8:
      values2 = new Array(count);
      readMethod = dataSlice.readInt64;
      break;
    case fieldTypes.RATIONAL:
      values2 = new Uint32Array(count * 2);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SRATIONAL:
      values2 = new Int32Array(count * 2);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.FLOAT:
      values2 = new Float32Array(count);
      readMethod = dataSlice.readFloat32;
      break;
    case fieldTypes.DOUBLE:
      values2 = new Float64Array(count);
      readMethod = dataSlice.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
  if (!(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
    for (let i = 0; i < count; ++i) {
      values2[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
    }
  } else {
    for (let i = 0; i < count; i += 2) {
      values2[i] = readMethod.call(dataSlice, offset + i * fieldTypeLength);
      values2[i + 1] = readMethod.call(dataSlice, offset + (i * fieldTypeLength + 4));
    }
  }
  if (fieldType === fieldTypes.ASCII) {
    return new TextDecoder("utf-8").decode(values2);
  }
  return values2;
}
var ImageFileDirectory = class {
  constructor(fileDirectory, geoKeyDirectory, nextIFDByteOffset) {
    this.fileDirectory = fileDirectory;
    this.geoKeyDirectory = geoKeyDirectory;
    this.nextIFDByteOffset = nextIFDByteOffset;
  }
};
var GeoTIFFImageIndexError = class extends Error {
  constructor(index) {
    super(`No image at index ${index}`);
    this.index = index;
  }
};
var GeoTIFFBase = class {
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  readRasters() {
    return __async(this, arguments, function* (options = {}) {
      const {
        window: imageWindow,
        width,
        height
      } = options;
      let {
        resX,
        resY,
        bbox
      } = options;
      const firstImage = yield this.getImage();
      let usedImage = firstImage;
      const imageCount = yield this.getImageCount();
      const imgBBox = firstImage.getBoundingBox();
      if (imageWindow && bbox) {
        throw new Error('Both "bbox" and "window" passed.');
      }
      if (width || height) {
        if (imageWindow) {
          const [oX, oY] = firstImage.getOrigin();
          const [rX, rY] = firstImage.getResolution();
          bbox = [oX + imageWindow[0] * rX, oY + imageWindow[1] * rY, oX + imageWindow[2] * rX, oY + imageWindow[3] * rY];
        }
        const usedBBox = bbox || imgBBox;
        if (width) {
          if (resX) {
            throw new Error("Both width and resX passed");
          }
          resX = (usedBBox[2] - usedBBox[0]) / width;
        }
        if (height) {
          if (resY) {
            throw new Error("Both width and resY passed");
          }
          resY = (usedBBox[3] - usedBBox[1]) / height;
        }
      }
      if (resX || resY) {
        const allImages = [];
        for (let i = 0; i < imageCount; ++i) {
          const image = yield this.getImage(i);
          const {
            SubfileType: subfileType,
            NewSubfileType: newSubfileType
          } = image.fileDirectory;
          if (i === 0 || subfileType === 2 || newSubfileType & 1) {
            allImages.push(image);
          }
        }
        allImages.sort((a, b) => a.getWidth() - b.getWidth());
        for (let i = 0; i < allImages.length; ++i) {
          const image = allImages[i];
          const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
          const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
          usedImage = image;
          if (resX && resX > imgResX || resY && resY > imgResY) {
            break;
          }
        }
      }
      let wnd = imageWindow;
      if (bbox) {
        const [oX, oY] = firstImage.getOrigin();
        const [imageResX, imageResY] = usedImage.getResolution(firstImage);
        wnd = [Math.round((bbox[0] - oX) / imageResX), Math.round((bbox[1] - oY) / imageResY), Math.round((bbox[2] - oX) / imageResX), Math.round((bbox[3] - oY) / imageResY)];
        wnd = [Math.min(wnd[0], wnd[2]), Math.min(wnd[1], wnd[3]), Math.max(wnd[0], wnd[2]), Math.max(wnd[1], wnd[3])];
      }
      return usedImage.readRasters(__spreadProps(__spreadValues({}, options), {
        window: wnd
      }));
    });
  }
};
var GeoTIFF = class _GeoTIFF extends GeoTIFFBase {
  /**
   * @constructor
   * @param {*} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
    super();
    this.source = source;
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.firstIFDOffset = firstIFDOffset;
    this.cache = options.cache || false;
    this.ifdRequests = [];
    this.ghostValues = null;
  }
  getSlice(offset, size) {
    return __async(this, null, function* () {
      const fallbackSize = this.bigTiff ? 4048 : 1024;
      return new DataSlice((yield this.source.fetch([{
        offset,
        length: typeof size !== "undefined" ? size : fallbackSize
      }]))[0], offset, this.littleEndian, this.bigTiff);
    });
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  parseFileDirectoryAt(offset) {
    return __async(this, null, function* () {
      const entrySize = this.bigTiff ? 20 : 12;
      const offsetSize = this.bigTiff ? 8 : 2;
      let dataSlice = yield this.getSlice(offset);
      const numDirEntries = this.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset);
      const byteSize = numDirEntries * entrySize + (this.bigTiff ? 16 : 6);
      if (!dataSlice.covers(offset, byteSize)) {
        dataSlice = yield this.getSlice(offset, byteSize);
      }
      const fileDirectory = {};
      let i = offset + (this.bigTiff ? 8 : 2);
      for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
        const fieldTag = dataSlice.readUint16(i);
        const fieldType = dataSlice.readUint16(i + 2);
        const typeCount = this.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
        let fieldValues;
        let value;
        const fieldTypeLength = getFieldTypeLength(fieldType);
        const valueOffset = i + (this.bigTiff ? 12 : 8);
        if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
          fieldValues = getValues(dataSlice, fieldType, typeCount, valueOffset);
        } else {
          const actualOffset = dataSlice.readOffset(valueOffset);
          const length = getFieldTypeLength(fieldType) * typeCount;
          if (dataSlice.covers(actualOffset, length)) {
            fieldValues = getValues(dataSlice, fieldType, typeCount, actualOffset);
          } else {
            const fieldDataSlice = yield this.getSlice(actualOffset, length);
            fieldValues = getValues(fieldDataSlice, fieldType, typeCount, actualOffset);
          }
        }
        if (typeCount === 1 && arrayFields.indexOf(fieldTag) === -1 && !(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
          value = fieldValues[0];
        } else {
          value = fieldValues;
        }
        fileDirectory[fieldTagNames[fieldTag]] = value;
      }
      const geoKeyDirectory = parseGeoKeyDirectory(fileDirectory);
      const nextIFDByteOffset = dataSlice.readOffset(offset + offsetSize + entrySize * numDirEntries);
      return new ImageFileDirectory(fileDirectory, geoKeyDirectory, nextIFDByteOffset);
    });
  }
  requestIFD(index) {
    return __async(this, null, function* () {
      if (this.ifdRequests[index]) {
        return this.ifdRequests[index];
      } else if (index === 0) {
        this.ifdRequests[index] = this.parseFileDirectoryAt(this.firstIFDOffset);
        return this.ifdRequests[index];
      } else if (!this.ifdRequests[index - 1]) {
        try {
          this.ifdRequests[index - 1] = this.requestIFD(index - 1);
        } catch (e) {
          if (e instanceof GeoTIFFImageIndexError) {
            throw new GeoTIFFImageIndexError(index);
          }
          throw e;
        }
      }
      this.ifdRequests[index] = (() => __async(this, null, function* () {
        const previousIfd = yield this.ifdRequests[index - 1];
        if (previousIfd.nextIFDByteOffset === 0) {
          throw new GeoTIFFImageIndexError(index);
        }
        return this.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
      }))();
      return this.ifdRequests[index];
    });
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  getImage(index = 0) {
    return __async(this, null, function* () {
      const ifd = yield this.requestIFD(index);
      return new geotiffimage_default(ifd.fileDirectory, ifd.geoKeyDirectory, this.dataView, this.littleEndian, this.cache, this.source);
    });
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  getImageCount() {
    return __async(this, null, function* () {
      let index = 0;
      let hasNext = true;
      while (hasNext) {
        try {
          yield this.requestIFD(index);
          ++index;
        } catch (e) {
          if (e instanceof GeoTIFFImageIndexError) {
            hasNext = false;
          } else {
            throw e;
          }
        }
      }
      return index;
    });
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  getGhostValues() {
    return __async(this, null, function* () {
      const offset = this.bigTiff ? 16 : 8;
      if (this.ghostValues) {
        return this.ghostValues;
      }
      const detectionString = "GDAL_STRUCTURAL_METADATA_SIZE=";
      const heuristicAreaSize = detectionString.length + 100;
      let slice = yield this.getSlice(offset, heuristicAreaSize);
      if (detectionString === getValues(slice, fieldTypes.ASCII, detectionString.length, offset)) {
        const valuesString = getValues(slice, fieldTypes.ASCII, heuristicAreaSize, offset);
        const firstLine = valuesString.split("\n")[0];
        const metadataSize = Number(firstLine.split("=")[1].split(" ")[0]) + firstLine.length;
        if (metadataSize > heuristicAreaSize) {
          slice = yield this.getSlice(offset, metadataSize);
        }
        const fullString = getValues(slice, fieldTypes.ASCII, metadataSize, offset);
        this.ghostValues = {};
        fullString.split("\n").filter((line) => line.length > 0).map((line) => line.split("=")).forEach(([key, value]) => {
          this.ghostValues[key] = value;
        });
      }
      return this.ghostValues;
    });
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {*} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static fromSource(source, options, signal) {
    return __async(this, null, function* () {
      const headerData = (yield source.fetch([{
        offset: 0,
        length: 1024
      }], signal))[0];
      const dataView = new DataView64(headerData);
      const BOM = dataView.getUint16(0, 0);
      let littleEndian;
      if (BOM === 18761) {
        littleEndian = true;
      } else if (BOM === 19789) {
        littleEndian = false;
      } else {
        throw new TypeError("Invalid byte order value.");
      }
      const magicNumber = dataView.getUint16(2, littleEndian);
      let bigTiff;
      if (magicNumber === 42) {
        bigTiff = false;
      } else if (magicNumber === 43) {
        bigTiff = true;
        const offsetByteSize = dataView.getUint16(4, littleEndian);
        if (offsetByteSize !== 8) {
          throw new Error("Unsupported offset byte-size.");
        }
      } else {
        throw new TypeError("Invalid magic number.");
      }
      const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
      return new _GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
    });
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    if (typeof this.source.close === "function") {
      return this.source.close();
    }
    return false;
  }
};
var MultiGeoTIFF = class extends GeoTIFFBase {
  /**
   * Construct a new MultiGeoTIFF from a main and several overview files.
   * @param {GeoTIFF} mainFile The main GeoTIFF file.
   * @param {GeoTIFF[]} overviewFiles An array of overview files.
   */
  constructor(mainFile, overviewFiles) {
    super();
    this.mainFile = mainFile;
    this.overviewFiles = overviewFiles;
    this.imageFiles = [mainFile].concat(overviewFiles);
    this.fileDirectoriesPerFile = null;
    this.fileDirectoriesPerFileParsing = null;
    this.imageCount = null;
  }
  parseFileDirectoriesPerFile() {
    return __async(this, null, function* () {
      const requests = [this.mainFile.parseFileDirectoryAt(this.mainFile.firstIFDOffset)].concat(this.overviewFiles.map((file) => file.parseFileDirectoryAt(file.firstIFDOffset)));
      this.fileDirectoriesPerFile = yield Promise.all(requests);
      return this.fileDirectoriesPerFile;
    });
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  getImage(index = 0) {
    return __async(this, null, function* () {
      yield this.getImageCount();
      yield this.parseFileDirectoriesPerFile();
      let visited = 0;
      let relativeIndex = 0;
      for (let i = 0; i < this.imageFiles.length; i++) {
        const imageFile = this.imageFiles[i];
        for (let ii = 0; ii < this.imageCounts[i]; ii++) {
          if (index === visited) {
            const ifd = yield imageFile.requestIFD(relativeIndex);
            return new geotiffimage_default(ifd.fileDirectory, ifd.geoKeyDirectory, imageFile.dataView, imageFile.littleEndian, imageFile.cache, imageFile.source);
          }
          visited++;
          relativeIndex++;
        }
        relativeIndex = 0;
      }
      throw new RangeError("Invalid image index");
    });
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  getImageCount() {
    return __async(this, null, function* () {
      if (this.imageCount !== null) {
        return this.imageCount;
      }
      const requests = [this.mainFile.getImageCount()].concat(this.overviewFiles.map((file) => file.getImageCount()));
      this.imageCounts = yield Promise.all(requests);
      this.imageCount = this.imageCounts.reduce((count, ifds) => count + ifds, 0);
      return this.imageCount;
    });
  }
};
function fromUrl(_0) {
  return __async(this, arguments, function* (url, options = {}, signal) {
    return GeoTIFF.fromSource(makeRemoteSource(url, options), signal);
  });
}
function fromBlob(blob, signal) {
  return __async(this, null, function* () {
    return GeoTIFF.fromSource(makeFileReaderSource(blob), signal);
  });
}
function fromUrls(_0) {
  return __async(this, arguments, function* (mainUrl, overviewUrls = [], options = {}, signal) {
    const mainFile = yield GeoTIFF.fromSource(makeRemoteSource(mainUrl, options), signal);
    const overviewFiles = yield Promise.all(overviewUrls.map((url) => GeoTIFF.fromSource(makeRemoteSource(url, options))));
    return new MultiGeoTIFF(mainFile, overviewFiles);
  });
}

// node_modules/ol/source/GeoTIFF.js
function isMask(image) {
  const fileDirectory = image.fileDirectory;
  const type = fileDirectory.NewSubfileType || 0;
  return (type & 4) === 4;
}
function readRGB(preference, image) {
  if (!preference) {
    return false;
  }
  if (preference === true) {
    return true;
  }
  if (image.getSamplesPerPixel() !== 3) {
    return false;
  }
  const interpretation = image.fileDirectory.PhotometricInterpretation;
  const interpretations = globals_exports.photometricInterpretations;
  return interpretation === interpretations.CMYK || interpretation === interpretations.YCbCr || interpretation === interpretations.CIELab || interpretation === interpretations.ICCLab;
}
var STATISTICS_MAXIMUM = "STATISTICS_MAXIMUM";
var STATISTICS_MINIMUM = "STATISTICS_MINIMUM";
var defaultTileSize = 256;
var workerPool;
function getWorkerPool() {
  if (!workerPool) {
    workerPool = new pool_default();
  }
  return workerPool;
}
function getBoundingBox(image) {
  try {
    return image.getBoundingBox(true);
  } catch {
    return [0, 0, image.getWidth(), image.getHeight()];
  }
}
function getOrigin(image) {
  try {
    return image.getOrigin().slice(0, 2);
  } catch {
    return [0, image.getHeight()];
  }
}
function getResolutions(image, referenceImage) {
  try {
    return image.getResolution(referenceImage);
  } catch {
    return [referenceImage.getWidth() / image.getWidth(), referenceImage.getHeight() / image.getHeight()];
  }
}
function getProjection(image) {
  const geoKeys = image.geoKeys;
  if (!geoKeys) {
    return null;
  }
  if (geoKeys.ProjectedCSTypeGeoKey && geoKeys.ProjectedCSTypeGeoKey !== 32767) {
    const code = "EPSG:" + geoKeys.ProjectedCSTypeGeoKey;
    let projection = get(code);
    if (!projection) {
      const units = fromCode(geoKeys.ProjLinearUnitsGeoKey);
      if (units) {
        projection = new Projection_default({
          code,
          units
        });
      }
    }
    return projection;
  }
  if (geoKeys.GeographicTypeGeoKey && geoKeys.GeographicTypeGeoKey !== 32767) {
    const code = "EPSG:" + geoKeys.GeographicTypeGeoKey;
    let projection = get(code);
    if (!projection) {
      const units = fromCode(geoKeys.GeogAngularUnitsGeoKey);
      if (units) {
        projection = new Projection_default({
          code,
          units
        });
      }
    }
    return projection;
  }
  return null;
}
function getImagesForTIFF(tiff) {
  return tiff.getImageCount().then(function(count) {
    const requests = new Array(count);
    for (let i = 0; i < count; ++i) {
      requests[i] = tiff.getImage(i);
    }
    return Promise.all(requests);
  });
}
function getImagesForSource(source, options) {
  let request;
  if (source.blob) {
    request = fromBlob(source.blob);
  } else if (source.overviews) {
    request = fromUrls(source.url, source.overviews, options);
  } else {
    request = fromUrl(source.url, options);
  }
  return request.then(getImagesForTIFF);
}
function assertEqual(expected, got, tolerance, message, rejector) {
  if (Array.isArray(expected)) {
    const length = expected.length;
    if (!Array.isArray(got) || length != got.length) {
      const error2 = new Error(message);
      rejector(error2);
      throw error2;
    }
    for (let i = 0; i < length; ++i) {
      assertEqual(expected[i], got[i], tolerance, message, rejector);
    }
    return;
  }
  got = /** @type {number} */
  got;
  if (Math.abs(expected - got) > tolerance * expected) {
    throw new Error(message);
  }
}
function getMinForDataType(array) {
  if (array instanceof Int8Array) {
    return -128;
  }
  if (array instanceof Int16Array) {
    return -32768;
  }
  if (array instanceof Int32Array) {
    return -2147483648;
  }
  if (array instanceof Float32Array) {
    return 12e-39;
  }
  return 0;
}
function getMaxForDataType(array) {
  if (array instanceof Int8Array) {
    return 127;
  }
  if (array instanceof Uint8Array) {
    return 255;
  }
  if (array instanceof Uint8ClampedArray) {
    return 255;
  }
  if (array instanceof Int16Array) {
    return 32767;
  }
  if (array instanceof Uint16Array) {
    return 65535;
  }
  if (array instanceof Int32Array) {
    return 2147483647;
  }
  if (array instanceof Uint32Array) {
    return 4294967295;
  }
  if (array instanceof Float32Array) {
    return 34e37;
  }
  return 255;
}
var GeoTIFFSource = class extends DataTile_default3 {
  /**
   * @param {Options} options Data tile options.
   */
  constructor(options) {
    super({
      state: "loading",
      tileGrid: null,
      projection: options.projection || null,
      transition: options.transition,
      interpolate: options.interpolate !== false,
      wrapX: options.wrapX
    });
    this.sourceInfo_ = options.sources;
    const numSources = this.sourceInfo_.length;
    this.sourceOptions_ = options.sourceOptions;
    this.sourceImagery_ = new Array(numSources);
    this.sourceMasks_ = new Array(numSources);
    this.resolutionFactors_ = new Array(numSources);
    this.samplesPerPixel_;
    this.nodataValues_;
    this.metadata_;
    this.normalize_ = options.normalize !== false;
    this.addAlpha_ = false;
    this.error_ = null;
    this.convertToRGB_ = options.convertToRGB || false;
    this.setKey(this.sourceInfo_.map((source) => source.url).join(","));
    const self = this;
    const requests = new Array(numSources);
    for (let i = 0; i < numSources; ++i) {
      requests[i] = getImagesForSource(this.sourceInfo_[i], this.sourceOptions_);
    }
    Promise.all(requests).then(function(sources) {
      self.configure_(sources);
    }).catch(function(error2) {
      error(error2);
      self.error_ = error2;
      self.setState("error");
    });
  }
  /**
   * @return {Error} A source loading error. When the source state is `error`, use this function
   * to get more information about the error. To debug a faulty configuration, you may want to use
   * a listener like
   * ```js
   * geotiffSource.on('change', () => {
   *   if (geotiffSource.getState() === 'error') {
   *     console.error(geotiffSource.getError());
   *   }
   * });
   * ```
   */
  getError() {
    return this.error_;
  }
  /**
   * Determine the projection of the images in this GeoTIFF.
   * The default implementation looks at the ProjectedCSTypeGeoKey and the GeographicTypeGeoKey
   * of each image in turn.
   * You can override this method in a subclass to support more projections.
   *
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   */
  determineProjection(sources) {
    const firstSource = sources[0];
    for (let i = firstSource.length - 1; i >= 0; --i) {
      const image = firstSource[i];
      const projection = getProjection(image);
      if (projection) {
        this.projection = projection;
        break;
      }
    }
  }
  /**
   * Determine any transform matrix for the images in this GeoTIFF.
   *
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   */
  determineTransformMatrix(sources) {
    const firstSource = sources[0];
    for (let i = firstSource.length - 1; i >= 0; --i) {
      const image = firstSource[i];
      const modelTransformation = image.fileDirectory.ModelTransformation;
      if (modelTransformation) {
        const [a, b, c, d, e, f, g, h] = modelTransformation;
        const matrix = multiply(multiply([1 / Math.sqrt(a * a + e * e), 0, 0, -1 / Math.sqrt(b * b + f * f), d, h], [a, e, b, f, 0, 0]), [1, 0, 0, 1, -d, -h]);
        this.transformMatrix = matrix;
        this.addAlpha_ = true;
        break;
      }
    }
  }
  /**
   * Configure the tile grid based on images within the source GeoTIFFs.  Each GeoTIFF
   * must have the same internal tiled structure.
   * @param {Array<Array<GeoTIFFImage>>} sources Each source is a list of images
   * from a single GeoTIFF.
   * @private
   */
  configure_(sources) {
    let extent;
    let origin;
    let commonRenderTileSizes;
    let commonSourceTileSizes;
    let resolutions;
    const samplesPerPixel = new Array(sources.length);
    const nodataValues = new Array(sources.length);
    const metadata = new Array(sources.length);
    let minZoom = 0;
    const sourceCount = sources.length;
    for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      const images = [];
      const masks = [];
      sources[sourceIndex].forEach((item) => {
        if (isMask(item)) {
          masks.push(item);
        } else {
          images.push(item);
        }
      });
      const imageCount = images.length;
      if (masks.length > 0 && masks.length !== imageCount) {
        throw new Error(`Expected one mask per image found ${masks.length} masks and ${imageCount} images`);
      }
      let sourceExtent;
      let sourceOrigin;
      const sourceTileSizes = new Array(imageCount);
      const renderTileSizes = new Array(imageCount);
      const sourceResolutions = new Array(imageCount);
      nodataValues[sourceIndex] = new Array(imageCount);
      metadata[sourceIndex] = new Array(imageCount);
      for (let imageIndex = 0; imageIndex < imageCount; ++imageIndex) {
        const image = images[imageIndex];
        const nodataValue = image.getGDALNoData();
        metadata[sourceIndex][imageIndex] = image.getGDALMetadata(0);
        nodataValues[sourceIndex][imageIndex] = nodataValue;
        const wantedSamples = this.sourceInfo_[sourceIndex].bands;
        samplesPerPixel[sourceIndex] = wantedSamples ? wantedSamples.length : image.getSamplesPerPixel();
        const level = imageCount - (imageIndex + 1);
        if (!sourceExtent) {
          sourceExtent = getBoundingBox(image);
        }
        if (!sourceOrigin) {
          sourceOrigin = getOrigin(image);
        }
        const imageResolutions = getResolutions(image, images[0]);
        sourceResolutions[level] = imageResolutions[0];
        const sourceTileSize = [image.getTileWidth(), image.getTileHeight()];
        if (sourceTileSize[0] !== sourceTileSize[1] && sourceTileSize[1] < defaultTileSize) {
          sourceTileSize[0] = defaultTileSize;
          sourceTileSize[1] = defaultTileSize;
        }
        sourceTileSizes[level] = sourceTileSize;
        const aspectRatio = imageResolutions[0] / Math.abs(imageResolutions[1]);
        renderTileSizes[level] = [sourceTileSize[0], sourceTileSize[1] / aspectRatio];
      }
      if (!extent) {
        extent = sourceExtent;
      } else {
        getIntersection(extent, sourceExtent, extent);
      }
      if (!origin) {
        origin = sourceOrigin;
      } else {
        const message = `Origin mismatch for source ${sourceIndex}, got [${sourceOrigin}] but expected [${origin}]`;
        assertEqual(origin, sourceOrigin, 0, message, this.viewRejector);
      }
      if (!resolutions) {
        resolutions = sourceResolutions;
        this.resolutionFactors_[sourceIndex] = 1;
      } else {
        if (resolutions.length - minZoom > sourceResolutions.length) {
          minZoom = resolutions.length - sourceResolutions.length;
        }
        const resolutionFactor = resolutions[resolutions.length - 1] / sourceResolutions[sourceResolutions.length - 1];
        this.resolutionFactors_[sourceIndex] = resolutionFactor;
        const scaledSourceResolutions = sourceResolutions.map((resolution) => resolution *= resolutionFactor);
        const message = `Resolution mismatch for source ${sourceIndex}, got [${scaledSourceResolutions}] but expected [${resolutions}]`;
        assertEqual(resolutions.slice(minZoom, resolutions.length), scaledSourceResolutions, 0.02, message, this.viewRejector);
      }
      if (!commonRenderTileSizes) {
        commonRenderTileSizes = renderTileSizes;
      } else {
        assertEqual(commonRenderTileSizes.slice(minZoom, commonRenderTileSizes.length), renderTileSizes, 0.01, `Tile size mismatch for source ${sourceIndex}`, this.viewRejector);
      }
      if (!commonSourceTileSizes) {
        commonSourceTileSizes = sourceTileSizes;
      } else {
        assertEqual(commonSourceTileSizes.slice(minZoom, commonSourceTileSizes.length), sourceTileSizes, 0, `Tile size mismatch for source ${sourceIndex}`, this.viewRejector);
      }
      this.sourceImagery_[sourceIndex] = images.reverse();
      this.sourceMasks_[sourceIndex] = masks.reverse();
    }
    for (let i = 0, ii = this.sourceImagery_.length; i < ii; ++i) {
      const sourceImagery = this.sourceImagery_[i];
      while (sourceImagery.length < resolutions.length) {
        sourceImagery.unshift(void 0);
      }
    }
    if (!this.getProjection()) {
      this.determineProjection(sources);
    }
    this.determineTransformMatrix(sources);
    this.samplesPerPixel_ = samplesPerPixel;
    this.nodataValues_ = nodataValues;
    this.metadata_ = metadata;
    outer: for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      if (this.sourceInfo_[sourceIndex].nodata !== void 0) {
        this.addAlpha_ = true;
        break;
      }
      if (this.sourceMasks_[sourceIndex].length) {
        this.addAlpha_ = true;
        break;
      }
      const values2 = nodataValues[sourceIndex];
      const bands = this.sourceInfo_[sourceIndex].bands;
      if (bands) {
        for (let i = 0; i < bands.length; ++i) {
          if (values2[bands[i] - 1] !== null) {
            this.addAlpha_ = true;
            break outer;
          }
        }
        continue;
      }
      for (let imageIndex = 0; imageIndex < values2.length; ++imageIndex) {
        if (values2[imageIndex] !== null) {
          this.addAlpha_ = true;
          break outer;
        }
      }
    }
    let bandCount = this.addAlpha_ ? 1 : 0;
    for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      bandCount += samplesPerPixel[sourceIndex];
    }
    this.bandCount = bandCount;
    const tileGrid = new TileGrid_default({
      extent,
      minZoom,
      origin,
      resolutions,
      tileSizes: commonRenderTileSizes
    });
    this.tileGrid = tileGrid;
    this.setTileSizes(commonSourceTileSizes);
    this.setLoader(this.loadTile_.bind(this));
    this.setState("ready");
    const zoom = 1;
    if (resolutions.length === 2) {
      resolutions = [resolutions[0], resolutions[1], resolutions[1] / 2];
    } else if (resolutions.length === 1) {
      resolutions = [resolutions[0] * 2, resolutions[0], resolutions[0] / 2];
    }
    let viewExtent = extent;
    if (this.transformMatrix) {
      const matrix = makeInverse(create(), this.transformMatrix.slice());
      const transformFn = createTransformFromCoordinateTransform((input) => apply(matrix, input));
      viewExtent = applyTransform(extent, transformFn);
    }
    this.viewResolver({
      showFullExtent: true,
      projection: this.projection,
      resolutions,
      center: toUserCoordinate(getCenter(viewExtent), this.projection),
      extent: toUserExtent(viewExtent, this.projection),
      zoom
    });
  }
  /**
   * @param {number} z The z tile index.
   * @param {number} x The x tile index.
   * @param {number} y The y tile index.
   * @param {import('./DataTile.js').LoaderOptions} options The loader options.
   * @return {Promise} The composed tile data.
   * @private
   */
  loadTile_(z, x, y, options) {
    const sourceTileSize = this.getTileSize(z);
    const sourceCount = this.sourceImagery_.length;
    const requests = new Array(sourceCount * 2);
    const nodataValues = this.nodataValues_;
    const sourceInfo = this.sourceInfo_;
    const pool = getWorkerPool();
    for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
      const source = sourceInfo[sourceIndex];
      const resolutionFactor = this.resolutionFactors_[sourceIndex];
      const pixelBounds = [Math.round(x * (sourceTileSize[0] * resolutionFactor)), Math.round(y * (sourceTileSize[1] * resolutionFactor)), Math.round((x + 1) * (sourceTileSize[0] * resolutionFactor)), Math.round((y + 1) * (sourceTileSize[1] * resolutionFactor))];
      const image = this.sourceImagery_[sourceIndex][z];
      let samples;
      if (source.bands) {
        samples = source.bands.map(function(bandNumber) {
          return bandNumber - 1;
        });
      }
      let fillValue;
      if ("nodata" in source && source.nodata !== null) {
        fillValue = source.nodata;
      } else {
        if (!samples) {
          fillValue = nodataValues[sourceIndex];
        } else {
          fillValue = samples.map(function(sampleIndex) {
            return nodataValues[sourceIndex][sampleIndex];
          });
        }
      }
      const readOptions = {
        window: pixelBounds,
        width: sourceTileSize[0],
        height: sourceTileSize[1],
        samples,
        fillValue,
        pool,
        interleave: false,
        signal: options.signal
      };
      if (readRGB(this.convertToRGB_, image)) {
        requests[sourceIndex] = image.readRGB(readOptions);
      } else {
        requests[sourceIndex] = image.readRasters(readOptions);
      }
      const maskIndex = sourceCount + sourceIndex;
      const mask = this.sourceMasks_[sourceIndex][z];
      if (!mask) {
        requests[maskIndex] = Promise.resolve(null);
        continue;
      }
      requests[maskIndex] = mask.readRasters({
        window: pixelBounds,
        width: sourceTileSize[0],
        height: sourceTileSize[1],
        samples: [0],
        pool,
        interleave: false
      });
    }
    return Promise.all(requests).then(this.composeTile_.bind(this, sourceTileSize)).catch(function(error2) {
      error(error2);
      throw error2;
    });
  }
  /**
   * @param {import("../size.js").Size} sourceTileSize The source tile size.
   * @param {Array} sourceSamples The source samples.
   * @return {import("../DataTile.js").Data} The composed tile data.
   * @private
   */
  composeTile_(sourceTileSize, sourceSamples) {
    const metadata = this.metadata_;
    const sourceInfo = this.sourceInfo_;
    const sourceCount = this.sourceImagery_.length;
    const bandCount = this.bandCount;
    const samplesPerPixel = this.samplesPerPixel_;
    const nodataValues = this.nodataValues_;
    const normalize = this.normalize_;
    const addAlpha = this.addAlpha_;
    const pixelCount = sourceTileSize[0] * sourceTileSize[1];
    const dataLength = pixelCount * bandCount;
    let data;
    if (normalize) {
      data = new Uint8Array(dataLength);
    } else {
      data = new Float32Array(dataLength);
    }
    let dataIndex = 0;
    for (let pixelIndex = 0; pixelIndex < pixelCount; ++pixelIndex) {
      let transparent = addAlpha;
      for (let sourceIndex = 0; sourceIndex < sourceCount; ++sourceIndex) {
        const source = sourceInfo[sourceIndex];
        let min = source.min;
        let max = source.max;
        let gain, bias;
        if (normalize) {
          const stats = metadata[sourceIndex][0];
          if (min === void 0) {
            if (stats && STATISTICS_MINIMUM in stats) {
              min = parseFloat(stats[STATISTICS_MINIMUM]);
            } else {
              min = getMinForDataType(sourceSamples[sourceIndex][0]);
            }
          }
          if (max === void 0) {
            if (stats && STATISTICS_MAXIMUM in stats) {
              max = parseFloat(stats[STATISTICS_MAXIMUM]);
            } else {
              max = getMaxForDataType(sourceSamples[sourceIndex][0]);
            }
          }
          gain = 255 / (max - min);
          bias = -min * gain;
        }
        for (let sampleIndex = 0; sampleIndex < samplesPerPixel[sourceIndex]; ++sampleIndex) {
          const sourceValue = sourceSamples[sourceIndex][sampleIndex][pixelIndex];
          let value;
          if (normalize) {
            value = clamp(gain * sourceValue + bias, 0, 255);
          } else {
            value = sourceValue;
          }
          if (!addAlpha) {
            data[dataIndex] = value;
          } else {
            let nodata = source.nodata;
            if (nodata === void 0) {
              let bandIndex;
              if (source.bands) {
                bandIndex = source.bands[sampleIndex] - 1;
              } else {
                bandIndex = sampleIndex;
              }
              nodata = nodataValues[sourceIndex][bandIndex];
            }
            const nodataIsNaN = isNaN(nodata);
            if (!nodataIsNaN && sourceValue !== nodata || nodataIsNaN && !isNaN(sourceValue)) {
              transparent = false;
              data[dataIndex] = value;
            }
          }
          dataIndex++;
        }
        if (!transparent) {
          const maskIndex = sourceCount + sourceIndex;
          const mask = sourceSamples[maskIndex];
          if (mask && !mask[0][pixelIndex]) {
            transparent = true;
          }
        }
      }
      if (addAlpha) {
        if (!transparent) {
          data[dataIndex] = 255;
        }
        dataIndex++;
      }
    }
    return data;
  }
};
GeoTIFFSource.prototype.getView;
var GeoTIFF_default = GeoTIFFSource;

// node_modules/ol/source/Google.js
var createSessionUrl = "https://tile.googleapis.com/v1/createSession";
var tileUrl = "https://tile.googleapis.com/v1/2dtiles";
var attributionUrl = "https://tile.googleapis.com/tile/v1/viewport";
var maxZoom = 22;
var Google = class extends TileImage_default {
  /**
   * @param {Options} options Google Maps options.
   */
  constructor(options) {
    const highDpi = !!options.highDpi;
    super({
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      crossOrigin: "anonymous",
      interpolate: options.interpolate,
      projection: "EPSG:3857",
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: highDpi ? 2 : 1,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.apiKey_ = options.key;
    this.error_ = null;
    const sessionTokenRequest = {
      mapType: options.mapType || "roadmap",
      language: options.language || "en-US",
      region: options.region || "US"
    };
    if (options.imageFormat) {
      sessionTokenRequest.imageFormat = options.imageFormat;
    }
    if (options.scale) {
      sessionTokenRequest.scale = options.scale;
    }
    if (highDpi) {
      sessionTokenRequest.highDpi = true;
    }
    if (options.layerTypes) {
      sessionTokenRequest.layerTypes = options.layerTypes;
    }
    if (options.styles) {
      sessionTokenRequest.styles = options.styles;
    }
    if (options.overlay === true) {
      sessionTokenRequest.overlay = true;
    }
    if (options.apiOptions) {
      sessionTokenRequest.apiOptions = options.apiOptions;
    }
    this.sessionTokenRequest_ = sessionTokenRequest;
    this.sessionTokenValue_;
    this.sessionRefreshId_;
    this.previousViewportAttribution_;
    this.previousViewportExtent_;
    this.createSession_();
  }
  /**
   * @return {Error|null} A source loading error. When the source state is `error`, use this function
   * to get more information about the error. To debug a faulty configuration, you may want to use
   * a listener like
   * ```js
   * source.on('change', () => {
   *   if (source.getState() === 'error') {
   *     console.error(source.getError());
   *   }
   * });
   * ```
   */
  getError() {
    return this.error_;
  }
  /**
   * Exposed here so it can be overridden in the tests.
   * @param {string} url The URL.
   * @param {RequestInit} config The config.
   * @return {Promise<Response>} A promise that resolves with the response.
   */
  fetchSessionToken(url, config) {
    return fetch(url, config);
  }
  /**
   * Get or renew a session token for use with tile requests.
   * @private
   */
  createSession_() {
    return __async(this, null, function* () {
      const url = createSessionUrl + "?key=" + this.apiKey_;
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.sessionTokenRequest_)
      };
      const response = yield this.fetchSessionToken(url, config);
      if (!response.ok) {
        try {
          const body = yield response.json();
          this.error_ = new Error(body.error.message);
        } catch {
          this.error_ = new Error("Error fetching session token");
        }
        this.setState("error");
        return;
      }
      const sessionTokenResponse = yield response.json();
      const tilePixelRatio = this.getTilePixelRatio(1);
      const tileSize = [sessionTokenResponse.tileWidth / tilePixelRatio, sessionTokenResponse.tileHeight / tilePixelRatio];
      this.tileGrid = createXYZ({
        extent: extentFromProjection(this.getProjection()),
        maxZoom,
        tileSize
      });
      const session = sessionTokenResponse.session;
      this.sessionTokenValue_ = session;
      const key = this.apiKey_;
      this.tileUrlFunction = function(tileCoord, pixelRatio, projection) {
        const z = tileCoord[0];
        const x = tileCoord[1];
        const y = tileCoord[2];
        const url2 = `${tileUrl}/${z}/${x}/${y}?session=${session}&key=${key}`;
        return url2;
      };
      const expiry = parseInt(sessionTokenResponse.expiry, 10) * 1e3;
      const timeout = Math.max(expiry - Date.now() - 60 * 1e3, 1);
      this.sessionRefreshId_ = setTimeout(() => this.createSession_(), timeout);
      this.setAttributions(this.fetchAttributions_.bind(this));
      this.setState("ready");
    });
  }
  /**
   * @param {import('../Map.js').FrameState} frameState The frame state.
   * @return {Promise<string>} The attributions.
   * @private
   */
  fetchAttributions_(frameState) {
    return __async(this, null, function* () {
      if (frameState.viewHints[ViewHint_default.ANIMATING] || frameState.viewHints[ViewHint_default.INTERACTING] || frameState.animate) {
        return this.previousViewportAttribution_;
      }
      const [west, south] = toLonLat(getBottomLeft(frameState.extent), frameState.viewState.projection);
      const [east, north] = toLonLat(getTopRight(frameState.extent), frameState.viewState.projection);
      const tileGrid = this.getTileGrid();
      const zoom = tileGrid.getZForResolution(frameState.viewState.resolution, this.zDirection);
      const viewportExtent = `zoom=${zoom}&north=${north}&south=${south}&east=${east}&west=${west}`;
      if (this.previousViewportExtent_ == viewportExtent) {
        return this.previousViewportAttribution_;
      }
      this.previousViewportExtent_ = viewportExtent;
      const session = this.sessionTokenValue_;
      const key = this.apiKey_;
      const url = `${attributionUrl}?session=${session}&key=${key}&${viewportExtent}`;
      this.previousViewportAttribution_ = yield fetch(url).then((response) => response.json()).then((json) => json.copyright);
      return this.previousViewportAttribution_;
    });
  }
  /**
   * @override
   */
  disposeInternal() {
    clearTimeout(this.sessionRefreshId_);
    super.disposeInternal();
  }
};
var Google_default = Google;

// node_modules/ol/format/IIIFInfo.js
var Versions = {
  VERSION1: "version1",
  VERSION2: "version2",
  VERSION3: "version3"
};
var IIIF_PROFILE_VALUES = {};
IIIF_PROFILE_VALUES[Versions.VERSION1] = {
  "level0": {
    supports: [],
    formats: [],
    qualities: ["native"]
  },
  "level1": {
    supports: ["regionByPx", "sizeByW", "sizeByH", "sizeByPct"],
    formats: ["jpg"],
    qualities: ["native"]
  },
  "level2": {
    supports: ["regionByPx", "regionByPct", "sizeByW", "sizeByH", "sizeByPct", "sizeByConfinedWh", "sizeByWh"],
    formats: ["jpg", "png"],
    qualities: ["native", "color", "grey", "bitonal"]
  }
};
IIIF_PROFILE_VALUES[Versions.VERSION2] = {
  "level0": {
    supports: [],
    formats: ["jpg"],
    qualities: ["default"]
  },
  "level1": {
    supports: ["regionByPx", "sizeByW", "sizeByH", "sizeByPct"],
    formats: ["jpg"],
    qualities: ["default"]
  },
  "level2": {
    supports: ["regionByPx", "regionByPct", "sizeByW", "sizeByH", "sizeByPct", "sizeByConfinedWh", "sizeByDistortedWh", "sizeByWh"],
    formats: ["jpg", "png"],
    qualities: ["default", "bitonal"]
  }
};
IIIF_PROFILE_VALUES[Versions.VERSION3] = {
  "level0": {
    supports: [],
    formats: ["jpg"],
    qualities: ["default"]
  },
  "level1": {
    supports: ["regionByPx", "regionSquare", "sizeByW", "sizeByH", "sizeByWh"],
    formats: ["jpg"],
    qualities: ["default"]
  },
  "level2": {
    supports: ["regionByPx", "regionSquare", "regionByPct", "sizeByW", "sizeByH", "sizeByPct", "sizeByConfinedWh", "sizeByWh"],
    formats: ["jpg", "png"],
    qualities: ["default"]
  }
};
IIIF_PROFILE_VALUES["none"] = {
  "none": {
    supports: [],
    formats: [],
    qualities: []
  }
};
function generateVersion1Options(iiifInfo) {
  let levelProfile = iiifInfo.getComplianceLevelSupportedFeatures();
  if (levelProfile === void 0) {
    levelProfile = IIIF_PROFILE_VALUES[Versions.VERSION1]["level0"];
  }
  return {
    url: iiifInfo.imageInfo["@id"] === void 0 ? void 0 : iiifInfo.imageInfo["@id"].replace(/\/?(?:info\.json)?$/g, ""),
    supports: levelProfile.supports,
    formats: [...levelProfile.formats, iiifInfo.imageInfo.formats === void 0 ? [] : iiifInfo.imageInfo.formats],
    qualities: [...levelProfile.qualities, iiifInfo.imageInfo.qualities === void 0 ? [] : iiifInfo.imageInfo.qualities],
    resolutions: iiifInfo.imageInfo.scale_factors,
    tileSize: iiifInfo.imageInfo.tile_width !== void 0 ? iiifInfo.imageInfo.tile_height !== void 0 ? [iiifInfo.imageInfo.tile_width, iiifInfo.imageInfo.tile_height] : [iiifInfo.imageInfo.tile_width, iiifInfo.imageInfo.tile_width] : iiifInfo.imageInfo.tile_height != void 0 ? [iiifInfo.imageInfo.tile_height, iiifInfo.imageInfo.tile_height] : void 0
  };
}
function generateVersion2Options(iiifInfo) {
  const levelProfile = iiifInfo.getComplianceLevelSupportedFeatures(), additionalProfile = Array.isArray(iiifInfo.imageInfo.profile) && iiifInfo.imageInfo.profile.length > 1, profileSupports = additionalProfile && iiifInfo.imageInfo.profile[1].supports ? iiifInfo.imageInfo.profile[1].supports : [], profileFormats = additionalProfile && iiifInfo.imageInfo.profile[1].formats ? iiifInfo.imageInfo.profile[1].formats : [], profileQualities = additionalProfile && iiifInfo.imageInfo.profile[1].qualities ? iiifInfo.imageInfo.profile[1].qualities : [];
  return {
    url: iiifInfo.imageInfo["@id"].replace(/\/?(?:info\.json)?$/g, ""),
    sizes: iiifInfo.imageInfo.sizes === void 0 ? void 0 : iiifInfo.imageInfo.sizes.map(function(size) {
      return [size.width, size.height];
    }),
    tileSize: iiifInfo.imageInfo.tiles === void 0 ? void 0 : [iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.width;
    })[0], iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.height === void 0 ? tile.width : tile.height;
    })[0]],
    resolutions: iiifInfo.imageInfo.tiles === void 0 ? void 0 : iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.scaleFactors;
    })[0],
    supports: [...levelProfile.supports, ...profileSupports],
    formats: [...levelProfile.formats, ...profileFormats],
    qualities: [...levelProfile.qualities, ...profileQualities]
  };
}
function generateVersion3Options(iiifInfo) {
  const levelProfile = iiifInfo.getComplianceLevelSupportedFeatures(), formats = iiifInfo.imageInfo.extraFormats === void 0 ? levelProfile.formats : [...levelProfile.formats, ...iiifInfo.imageInfo.extraFormats], preferredFormat = iiifInfo.imageInfo.preferredFormats !== void 0 && Array.isArray(iiifInfo.imageInfo.preferredFormats) && iiifInfo.imageInfo.preferredFormats.length > 0 ? iiifInfo.imageInfo.preferredFormats.filter(function(format) {
    return ["jpg", "png", "gif"].includes(format);
  }).reduce(function(acc, format) {
    return acc === void 0 && formats.includes(format) ? format : acc;
  }, void 0) : void 0;
  return {
    url: iiifInfo.imageInfo["id"],
    sizes: iiifInfo.imageInfo.sizes === void 0 ? void 0 : iiifInfo.imageInfo.sizes.map(function(size) {
      return [size.width, size.height];
    }),
    tileSize: iiifInfo.imageInfo.tiles === void 0 ? void 0 : [iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.width;
    })[0], iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.height;
    })[0]],
    resolutions: iiifInfo.imageInfo.tiles === void 0 ? void 0 : iiifInfo.imageInfo.tiles.map(function(tile) {
      return tile.scaleFactors;
    })[0],
    supports: iiifInfo.imageInfo.extraFeatures === void 0 ? levelProfile.supports : [...levelProfile.supports, ...iiifInfo.imageInfo.extraFeatures],
    formats,
    qualities: iiifInfo.imageInfo.extraQualities === void 0 ? levelProfile.qualities : [...levelProfile.qualities, ...iiifInfo.imageInfo.extraQualities],
    preferredFormat
  };
}
var versionFunctions = {};
versionFunctions[Versions.VERSION1] = generateVersion1Options;
versionFunctions[Versions.VERSION2] = generateVersion2Options;
versionFunctions[Versions.VERSION3] = generateVersion3Options;

// node_modules/ol/source/Zoomify.js
var CustomTile = class extends ImageTile_default {
  /**
   * @param {import("../size.js").Size} tileSize Full tile size.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("../Tile.js").Options} [options] Tile options.
   */
  constructor(tileSize, tileCoord, state, src, crossOrigin, tileLoadFunction, options) {
    super(tileCoord, state, src, crossOrigin, tileLoadFunction, options);
    this.zoomifyImage_ = null;
    this.tileSize_ = tileSize;
  }
  /**
   * Get the image element for this tile.
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @override
   */
  getImage() {
    if (this.zoomifyImage_) {
      return this.zoomifyImage_;
    }
    const image = super.getImage();
    if (this.state == TileState_default.LOADED) {
      const tileSize = this.tileSize_;
      if (image.width == tileSize[0] && image.height == tileSize[1]) {
        this.zoomifyImage_ = image;
        return image;
      }
      const context = createCanvasContext2D(tileSize[0], tileSize[1]);
      context.drawImage(image, 0, 0);
      this.zoomifyImage_ = context.canvas;
      return context.canvas;
    }
    return image;
  }
};
var Zoomify = class extends TileImage_default {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    const size = options.size;
    const tierSizeCalculation = options.tierSizeCalculation !== void 0 ? options.tierSizeCalculation : "default";
    const tilePixelRatio = options.tilePixelRatio || 1;
    const imageWidth = size[0];
    const imageHeight = size[1];
    const tierSizeInTiles = [];
    const tileSize = options.tileSize || DEFAULT_TILE_SIZE;
    let tileSizeForTierSizeCalculation = tileSize * tilePixelRatio;
    switch (tierSizeCalculation) {
      case "default":
        while (imageWidth > tileSizeForTierSizeCalculation || imageHeight > tileSizeForTierSizeCalculation) {
          tierSizeInTiles.push([Math.ceil(imageWidth / tileSizeForTierSizeCalculation), Math.ceil(imageHeight / tileSizeForTierSizeCalculation)]);
          tileSizeForTierSizeCalculation += tileSizeForTierSizeCalculation;
        }
        break;
      case "truncated":
        let width = imageWidth;
        let height = imageHeight;
        while (width > tileSizeForTierSizeCalculation || height > tileSizeForTierSizeCalculation) {
          tierSizeInTiles.push([Math.ceil(width / tileSizeForTierSizeCalculation), Math.ceil(height / tileSizeForTierSizeCalculation)]);
          width >>= 1;
          height >>= 1;
        }
        break;
      default:
        throw new Error("Unknown `tierSizeCalculation` configured");
    }
    tierSizeInTiles.push([1, 1]);
    tierSizeInTiles.reverse();
    const resolutions = [tilePixelRatio];
    const tileCountUpToTier = [0];
    for (let i = 1, ii = tierSizeInTiles.length; i < ii; i++) {
      resolutions.push(tilePixelRatio << i);
      tileCountUpToTier.push(tierSizeInTiles[i - 1][0] * tierSizeInTiles[i - 1][1] + tileCountUpToTier[i - 1]);
    }
    resolutions.reverse();
    const tileGrid = new TileGrid_default({
      tileSize,
      extent: options.extent || [0, -imageHeight, imageWidth, 0],
      resolutions
    });
    let url = options.url;
    if (url && !url.includes("{TileGroup}") && !url.includes("{tileIndex}")) {
      url += "{TileGroup}/{z}-{x}-{y}.jpg";
    }
    const urls = expandUrl(url);
    let tileWidth = tileSize * tilePixelRatio;
    function createFromTemplate2(template) {
      return (
        /**
         * @param {import("../tilecoord.js").TileCoord} tileCoord Tile Coordinate.
         * @param {number} pixelRatio Pixel ratio.
         * @param {import("../proj/Projection.js").default} projection Projection.
         * @return {string|undefined} Tile URL.
         */
        function(tileCoord, pixelRatio, projection) {
          if (!tileCoord) {
            return void 0;
          }
          const tileCoordZ = tileCoord[0];
          const tileCoordX = tileCoord[1];
          const tileCoordY = tileCoord[2];
          const tileIndex = tileCoordX + tileCoordY * tierSizeInTiles[tileCoordZ][0];
          const tileGroup = (tileIndex + tileCountUpToTier[tileCoordZ]) / tileWidth | 0;
          const localContext = {
            "z": tileCoordZ,
            "x": tileCoordX,
            "y": tileCoordY,
            "tileIndex": tileIndex,
            "TileGroup": "TileGroup" + tileGroup
          };
          return template.replace(/\{(\w+?)\}/g, function(m, p) {
            return localContext[p];
          });
        }
      );
    }
    const tileUrlFunction = createFromTileUrlFunctions(urls.map(createFromTemplate2));
    const ZoomifyTileClass = CustomTile.bind(null, toSize(tileSize * tilePixelRatio));
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      tilePixelRatio,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: ZoomifyTileClass,
      tileGrid,
      tileUrlFunction,
      transition: options.transition
    });
    this.zDirection = options.zDirection;
    const tileUrl2 = tileGrid.getTileCoordForCoordAndResolution(getCenter(tileGrid.getExtent()), resolutions[resolutions.length - 1]);
    const testTileUrl = tileUrlFunction(tileUrl2, 1, null);
    const image = new Image();
    image.addEventListener("error", () => {
      tileWidth = tileSize;
      this.changed();
    });
    image.src = testTileUrl;
  }
};
var Zoomify_default = Zoomify;

// node_modules/ol/source/IIIF.js
function formatPercentage(percentage) {
  return percentage.toLocaleString("en", {
    maximumFractionDigits: 10
  });
}
var IIIF = class extends TileImage_default {
  /**
   * @param {Options} [options] Tile source options. Use {@link import("../format/IIIFInfo.js").IIIFInfo}
   * to parse Image API service information responses into constructor options.
   * @api
   */
  constructor(options) {
    const partialOptions = options || {};
    let baseUrl = partialOptions.url || "";
    baseUrl = baseUrl + (baseUrl.lastIndexOf("/") === baseUrl.length - 1 || baseUrl === "" ? "" : "/");
    const version = partialOptions.version || Versions.VERSION2;
    const sizes = partialOptions.sizes || [];
    const size = partialOptions.size;
    assert(size != void 0 && Array.isArray(size) && size.length == 2 && !isNaN(size[0]) && size[0] > 0 && !isNaN(size[1]) && size[1] > 0, "Missing or invalid `size`");
    const width = size[0];
    const height = size[1];
    const tileSize = partialOptions.tileSize;
    const tilePixelRatio = partialOptions.tilePixelRatio || 1;
    const format = partialOptions.format || "jpg";
    const quality = partialOptions.quality || (partialOptions.version == Versions.VERSION1 ? "native" : "default");
    let resolutions = partialOptions.resolutions || [];
    const supports = partialOptions.supports || [];
    const extent = partialOptions.extent || [0, -height, width, 0];
    const supportsListedSizes = sizes != void 0 && Array.isArray(sizes) && sizes.length > 0;
    const supportsListedTiles = tileSize !== void 0 && (typeof tileSize === "number" && Number.isInteger(tileSize) && tileSize > 0 || Array.isArray(tileSize) && tileSize.length > 0);
    const supportsArbitraryTiling = supports != void 0 && Array.isArray(supports) && (supports.includes("regionByPx") || supports.includes("regionByPct")) && (supports.includes("sizeByWh") || supports.includes("sizeByH") || supports.includes("sizeByW") || supports.includes("sizeByPct"));
    let tileWidth, tileHeight, maxZoom2;
    resolutions.sort(function(a, b) {
      return b - a;
    });
    if (supportsListedTiles || supportsArbitraryTiling) {
      if (tileSize != void 0) {
        if (typeof tileSize === "number" && Number.isInteger(tileSize) && tileSize > 0) {
          tileWidth = tileSize;
          tileHeight = tileSize;
        } else if (Array.isArray(tileSize) && tileSize.length > 0) {
          if (tileSize.length == 1 || tileSize[1] == void 0 && Number.isInteger(tileSize[0])) {
            tileWidth = tileSize[0];
            tileHeight = tileSize[0];
          }
          if (tileSize.length == 2) {
            if (Number.isInteger(tileSize[0]) && Number.isInteger(tileSize[1])) {
              tileWidth = tileSize[0];
              tileHeight = tileSize[1];
            } else if (tileSize[0] == void 0 && Number.isInteger(tileSize[1])) {
              tileWidth = tileSize[1];
              tileHeight = tileSize[1];
            }
          }
        }
      }
      if (tileWidth === void 0 || tileHeight === void 0) {
        tileWidth = DEFAULT_TILE_SIZE;
        tileHeight = DEFAULT_TILE_SIZE;
      }
      if (resolutions.length == 0) {
        maxZoom2 = Math.max(Math.ceil(Math.log(width / tileWidth) / Math.LN2), Math.ceil(Math.log(height / tileHeight) / Math.LN2));
        for (let i = maxZoom2; i >= 0; i--) {
          resolutions.push(Math.pow(2, i));
        }
      } else {
        const maxScaleFactor = Math.max(...resolutions);
        maxZoom2 = Math.round(Math.log(maxScaleFactor) / Math.LN2);
      }
    } else {
      tileWidth = width;
      tileHeight = height;
      resolutions = [];
      if (supportsListedSizes) {
        sizes.sort(function(a, b) {
          return a[0] - b[0];
        });
        maxZoom2 = -1;
        const ignoredSizesIndex = [];
        for (let i = 0; i < sizes.length; i++) {
          const resolution = width / sizes[i][0];
          if (resolutions.length > 0 && resolutions[resolutions.length - 1] == resolution) {
            ignoredSizesIndex.push(i);
            continue;
          }
          resolutions.push(resolution);
          maxZoom2++;
        }
        if (ignoredSizesIndex.length > 0) {
          for (let i = 0; i < ignoredSizesIndex.length; i++) {
            sizes.splice(ignoredSizesIndex[i] - i, 1);
          }
        }
      } else {
        resolutions.push(1);
        sizes.push([width, height]);
        maxZoom2 = 0;
      }
    }
    const tileGrid = new TileGrid_default({
      tileSize: [tileWidth, tileHeight],
      extent,
      origin: getTopLeft(extent),
      resolutions
    });
    const tileUrlFunction = function(tileCoord, pixelRatio, projection) {
      let regionParam, sizeParam;
      const zoom = tileCoord[0];
      if (zoom > maxZoom2) {
        return;
      }
      const tileX = tileCoord[1], tileY = tileCoord[2], scale4 = resolutions[zoom];
      if (tileX === void 0 || tileY === void 0 || scale4 === void 0 || tileX < 0 || Math.ceil(width / scale4 / tileWidth) <= tileX || tileY < 0 || Math.ceil(height / scale4 / tileHeight) <= tileY) {
        return;
      }
      if (supportsArbitraryTiling || supportsListedTiles) {
        const regionX = tileX * tileWidth * scale4, regionY = tileY * tileHeight * scale4;
        let regionW = tileWidth * scale4, regionH = tileHeight * scale4, sizeW = tileWidth, sizeH = tileHeight;
        if (regionX + regionW > width) {
          regionW = width - regionX;
        }
        if (regionY + regionH > height) {
          regionH = height - regionY;
        }
        if (regionX + tileWidth * scale4 > width) {
          sizeW = Math.floor((width - regionX + scale4 - 1) / scale4);
        }
        if (regionY + tileHeight * scale4 > height) {
          sizeH = Math.floor((height - regionY + scale4 - 1) / scale4);
        }
        if (regionX == 0 && regionW == width && regionY == 0 && regionH == height) {
          regionParam = "full";
        } else if (!supportsArbitraryTiling || supports.includes("regionByPx")) {
          regionParam = regionX + "," + regionY + "," + regionW + "," + regionH;
        } else if (supports.includes("regionByPct")) {
          const pctX = formatPercentage(regionX / width * 100), pctY = formatPercentage(regionY / height * 100), pctW = formatPercentage(regionW / width * 100), pctH = formatPercentage(regionH / height * 100);
          regionParam = "pct:" + pctX + "," + pctY + "," + pctW + "," + pctH;
        }
        if (version == Versions.VERSION3 && (!supportsArbitraryTiling || supports.includes("sizeByWh"))) {
          sizeParam = sizeW + "," + sizeH;
        } else if (!supportsArbitraryTiling || supports.includes("sizeByW")) {
          sizeParam = sizeW + ",";
        } else if (supports.includes("sizeByH")) {
          sizeParam = "," + sizeH;
        } else if (supports.includes("sizeByWh")) {
          sizeParam = sizeW + "," + sizeH;
        } else if (supports.includes("sizeByPct")) {
          sizeParam = "pct:" + formatPercentage(100 / scale4);
        }
      } else {
        regionParam = "full";
        if (supportsListedSizes) {
          const regionWidth = sizes[zoom][0], regionHeight = sizes[zoom][1];
          if (version == Versions.VERSION3) {
            if (regionWidth == width && regionHeight == height) {
              sizeParam = "max";
            } else {
              sizeParam = regionWidth + "," + regionHeight;
            }
          } else {
            if (regionWidth == width) {
              sizeParam = "full";
            } else {
              sizeParam = regionWidth + ",";
            }
          }
        } else {
          sizeParam = version == Versions.VERSION3 ? "max" : "full";
        }
      }
      return baseUrl + regionParam + "/" + sizeParam + "/0/" + quality + "." + format;
    };
    const IiifTileClass = CustomTile.bind(null, toSize(tileSize || 256).map(function(size2) {
      return size2 * tilePixelRatio;
    }));
    super({
      attributions: partialOptions.attributions,
      attributionsCollapsible: partialOptions.attributionsCollapsible,
      cacheSize: partialOptions.cacheSize,
      crossOrigin: partialOptions.crossOrigin,
      interpolate: partialOptions.interpolate,
      projection: partialOptions.projection,
      reprojectionErrorThreshold: partialOptions.reprojectionErrorThreshold,
      state: partialOptions.state,
      tileClass: IiifTileClass,
      tileGrid,
      tilePixelRatio: partialOptions.tilePixelRatio,
      tileUrlFunction,
      transition: partialOptions.transition
    });
    this.zDirection = partialOptions.zDirection;
  }
};
var IIIF_default = IIIF;

// node_modules/ol/resolution.js
function fromResolutionLike(resolution) {
  if (Array.isArray(resolution)) {
    return Math.min(...resolution);
  }
  return resolution;
}

// node_modules/ol/reproj/Image.js
var ReprojImage = class extends Image_default {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection (of the data).
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent.
   * @param {number} targetResolution Target resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {FunctionType} getImageFunction
   *     Function returning source images (extent, resolution, pixelRatio).
   * @param {boolean} interpolate Use linear interpolation when resampling.
   */
  constructor(sourceProj, targetProj, targetExtent, targetResolution, pixelRatio, getImageFunction, interpolate) {
    let maxSourceExtent = sourceProj.getExtent();
    if (maxSourceExtent && sourceProj.canWrapX()) {
      maxSourceExtent = maxSourceExtent.slice();
      maxSourceExtent[0] = -Infinity;
      maxSourceExtent[2] = Infinity;
    }
    let maxTargetExtent = targetProj.getExtent();
    if (maxTargetExtent && targetProj.canWrapX()) {
      maxTargetExtent = maxTargetExtent.slice();
      maxTargetExtent[0] = -Infinity;
      maxTargetExtent[2] = Infinity;
    }
    const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
    const targetCenter = getCenter(limitedTargetExtent);
    const sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
    const errorThresholdInPixels = ERROR_THRESHOLD;
    const triangulation = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
    const sourceExtent = triangulation.calculateSourceExtent();
    const sourceImage = isEmpty2(sourceExtent) ? null : getImageFunction(sourceExtent, sourceResolution, pixelRatio);
    const state = sourceImage ? ImageState_default.IDLE : ImageState_default.EMPTY;
    const sourcePixelRatio = sourceImage ? sourceImage.getPixelRatio() : 1;
    super(targetExtent, targetResolution, sourcePixelRatio, state);
    this.targetProj_ = targetProj;
    this.maxSourceExtent_ = maxSourceExtent;
    this.triangulation_ = triangulation;
    this.targetResolution_ = targetResolution;
    this.targetExtent_ = targetExtent;
    this.sourceImage_ = sourceImage;
    this.sourcePixelRatio_ = sourcePixelRatio;
    this.interpolate_ = interpolate;
    this.canvas_ = null;
    this.sourceListenerKey_ = null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    if (this.state == ImageState_default.LOADING) {
      this.unlistenSource_();
    }
    super.disposeInternal();
  }
  /**
   * @return {HTMLCanvasElement} Image.
   * @override
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @return {import("../proj/Projection.js").default} Projection.
   */
  getProjection() {
    return this.targetProj_;
  }
  /**
   * @private
   */
  reproject_() {
    const sourceState = this.sourceImage_.getState();
    if (sourceState == ImageState_default.LOADED) {
      const width = getWidth(this.targetExtent_) / this.targetResolution_;
      const height = getHeight(this.targetExtent_) / this.targetResolution_;
      this.canvas_ = render(width, height, this.sourcePixelRatio_, fromResolutionLike(this.sourceImage_.getResolution()), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [{
        extent: this.sourceImage_.getExtent(),
        image: this.sourceImage_.getImage()
      }], 0, void 0, this.interpolate_, true);
    }
    this.state = sourceState;
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == ImageState_default.IDLE) {
      this.state = ImageState_default.LOADING;
      this.changed();
      const sourceState = this.sourceImage_.getState();
      if (sourceState == ImageState_default.LOADED || sourceState == ImageState_default.ERROR) {
        this.reproject_();
      } else {
        this.sourceListenerKey_ = listen(this.sourceImage_, EventType_default.CHANGE, (e) => {
          const sourceState2 = this.sourceImage_.getState();
          if (sourceState2 == ImageState_default.LOADED || sourceState2 == ImageState_default.ERROR) {
            this.unlistenSource_();
            this.reproject_();
          }
        });
        this.sourceImage_.load();
      }
    }
  }
  /**
   * @private
   */
  unlistenSource_() {
    unlistenByKey(
      /** @type {!import("../events.js").EventsKey} */
      this.sourceListenerKey_
    );
    this.sourceListenerKey_ = null;
  }
};
var Image_default2 = ReprojImage;

// node_modules/ol/source/common.js
var DECIMALS2 = 4;

// node_modules/ol/source/Image.js
var ImageSourceEventType = {
  /**
   * Triggered when an image starts loading.
   * @event module:ol/source/Image.ImageSourceEvent#imageloadstart
   * @api
   */
  IMAGELOADSTART: "imageloadstart",
  /**
   * Triggered when an image finishes loading.
   * @event module:ol/source/Image.ImageSourceEvent#imageloadend
   * @api
   */
  IMAGELOADEND: "imageloadend",
  /**
   * Triggered if image loading results in an error.
   * @event module:ol/source/Image.ImageSourceEvent#imageloaderror
   * @api
   */
  IMAGELOADERROR: "imageloaderror"
};
var ImageSourceEvent = class extends Event_default {
  /**
   * @param {string} type Type.
   * @param {import("../Image.js").default} image The image.
   */
  constructor(type, image) {
    super(type);
    this.image = image;
  }
};
var ImageSource = class extends Source_default {
  /**
   * @param {Options} options Single image source options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      projection: options.projection,
      state: options.state,
      interpolate: options.interpolate !== void 0 ? options.interpolate : true
    });
    this.on;
    this.once;
    this.un;
    this.loader = options.loader || null;
    this.resolutions_ = options.resolutions !== void 0 ? options.resolutions : null;
    this.reprojectedImage_ = null;
    this.reprojectedRevision_ = 0;
    this.image = null;
    this.wantedExtent_;
    this.wantedResolution_;
    this.static_ = options.loader ? options.loader.length === 0 : false;
    this.wantedProjection_ = null;
  }
  /**
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {Array<number>|null} resolutions Resolutions.
   */
  setResolutions(resolutions) {
    this.resolutions_ = resolutions;
  }
  /**
   * @protected
   * @param {number} resolution Resolution.
   * @return {number} Resolution.
   */
  findNearestResolution(resolution) {
    const resolutions = this.getResolutions();
    if (resolutions) {
      const idx = linearFindNearest(resolutions, resolution, 0);
      resolution = resolutions[idx];
    }
    return resolution;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   */
  getImage(extent, resolution, pixelRatio, projection) {
    const sourceProjection = this.getProjection();
    if (!sourceProjection || !projection || equivalent(sourceProjection, projection)) {
      if (sourceProjection) {
        projection = sourceProjection;
      }
      return this.getImageInternal(extent, resolution, pixelRatio, projection);
    }
    if (this.reprojectedImage_) {
      if (this.reprojectedRevision_ == this.getRevision() && equivalent(this.reprojectedImage_.getProjection(), projection) && this.reprojectedImage_.getResolution() == resolution && equals(this.reprojectedImage_.getExtent(), extent)) {
        return this.reprojectedImage_;
      }
      this.reprojectedImage_.dispose();
      this.reprojectedImage_ = null;
    }
    this.reprojectedImage_ = new Image_default2(sourceProjection, projection, extent, resolution, pixelRatio, (extent2, resolution2, pixelRatio2) => this.getImageInternal(extent2, resolution2, pixelRatio2, sourceProjection), this.getInterpolate());
    this.reprojectedRevision_ = this.getRevision();
    return this.reprojectedImage_;
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @protected
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (this.loader) {
      const requestExtent = getRequestExtent(extent, resolution, pixelRatio, 1);
      const requestResolution = this.findNearestResolution(resolution);
      if (this.image && (this.static_ || this.wantedProjection_ === projection && (this.wantedExtent_ && containsExtent(this.wantedExtent_, requestExtent) || containsExtent(this.image.getExtent(), requestExtent)) && (this.wantedResolution_ && fromResolutionLike(this.wantedResolution_) === requestResolution || fromResolutionLike(this.image.getResolution()) === requestResolution))) {
        return this.image;
      }
      this.wantedProjection_ = projection;
      this.wantedExtent_ = requestExtent;
      this.wantedResolution_ = requestResolution;
      this.image = new Image_default(requestExtent, requestResolution, pixelRatio, this.loader);
      this.image.addEventListener(EventType_default.CHANGE, this.handleImageChange.bind(this));
    }
    return this.image;
  }
  /**
   * Handle image change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleImageChange(event) {
    const image = (
      /** @type {import("../Image.js").default} */
      event.target
    );
    let type;
    switch (image.getState()) {
      case ImageState_default.LOADING:
        this.loading = true;
        type = ImageSourceEventType.IMAGELOADSTART;
        break;
      case ImageState_default.LOADED:
        this.loading = false;
        type = ImageSourceEventType.IMAGELOADEND;
        break;
      case ImageState_default.ERROR:
        this.loading = false;
        type = ImageSourceEventType.IMAGELOADERROR;
        break;
      default:
        return;
    }
    if (this.hasListener(type)) {
      this.dispatchEvent(new ImageSourceEvent(type, image));
    }
  }
};
function defaultImageLoadFunction(image, src) {
  image.getImage().src = src;
}
function getRequestExtent(extent, resolution, pixelRatio, ratio) {
  const imageResolution = resolution / pixelRatio;
  const center = getCenter(extent);
  const viewWidth = ceil(getWidth(extent) / imageResolution, DECIMALS2);
  const viewHeight = ceil(getHeight(extent) / imageResolution, DECIMALS2);
  const marginWidth = ceil((ratio - 1) * viewWidth / 2, DECIMALS2);
  const requestWidth = viewWidth + 2 * marginWidth;
  const marginHeight = ceil((ratio - 1) * viewHeight / 2, DECIMALS2);
  const requestHeight = viewHeight + 2 * marginHeight;
  return getForViewAndSize(center, imageResolution, 0, [requestWidth, requestHeight]);
}
var Image_default3 = ImageSource;

// node_modules/ol/source/arcgisRest.js
function getRequestUrl(baseUrl, extent, resolution, pixelRatio, projection, params) {
  const srid = projection.getCode().split(/:(?=\d+$)/).pop();
  const imageResolution = resolution / pixelRatio;
  const imageSize = [round(getWidth(extent) / imageResolution, DECIMALS2), round(getHeight(extent) / imageResolution, DECIMALS2)];
  params["SIZE"] = imageSize[0] + "," + imageSize[1];
  params["BBOX"] = extent.join(",");
  params["BBOXSR"] = srid;
  params["IMAGESR"] = srid;
  params["DPI"] = Math.round(params["DPI"] ? params["DPI"] * pixelRatio : 90 * pixelRatio);
  const modifiedUrl = baseUrl.replace(/MapServer\/?$/, "MapServer/export").replace(/ImageServer\/?$/, "ImageServer/exportImage");
  return appendParams(modifiedUrl, params);
}
function createLoader(options) {
  const load = options.load ? options.load : decode;
  const projection = get(options.projection || "EPSG:3857");
  const ratio = options.ratio ?? 1.5;
  const crossOrigin = options.crossOrigin ?? null;
  return function(extent, resolution, pixelRatio) {
    pixelRatio = options.hidpi ? pixelRatio : 1;
    const params = {
      "F": "image",
      "FORMAT": "PNG32",
      "TRANSPARENT": true
    };
    Object.assign(params, options.params);
    extent = getRequestExtent(extent, resolution, pixelRatio, ratio);
    const src = getRequestUrl(options.url, extent, resolution, pixelRatio, projection, params);
    const image = new Image();
    image.crossOrigin = crossOrigin;
    return load(image, src).then((image2) => {
      const resolution2 = getWidth(extent) / image2.width * pixelRatio;
      return {
        image: image2,
        extent,
        resolution: resolution2,
        pixelRatio
      };
    });
  };
}

// node_modules/ol/source/ImageArcGISRest.js
var ImageArcGISRest = class extends Image_default3 {
  /**
   * @param {Options} [options] Image ArcGIS Rest Options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: options.projection,
      resolutions: options.resolutions
    });
    this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.url_ = options.url;
    this.imageLoadFunction_ = options.imageLoadFunction !== void 0 ? options.imageLoadFunction : defaultImageLoadFunction;
    this.params_ = Object.assign({}, options.params);
    this.imageSize_ = [0, 0];
    this.renderedRevision_ = 0;
    this.ratio_ = options.ratio !== void 0 ? options.ratio : 1.5;
    this.loaderProjection_ = null;
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (this.url_ === void 0) {
      return null;
    }
    if (!this.loader || this.loaderProjection_ !== projection) {
      this.loaderProjection_ = projection;
      this.loader = createLoader({
        crossOrigin: this.crossOrigin_,
        params: this.params_,
        projection,
        hidpi: this.hidpi_,
        url: this.url_,
        ratio: this.ratio_,
        load: (image, src) => {
          this.image.setImage(image);
          this.imageLoadFunction_(this.image, src);
          return decode(image);
        }
      });
    }
    return super.getImageInternal(extent, resolution, pixelRatio, projection);
  }
  /**
   * Return the image load function of the source.
   * @return {import("../Image.js").LoadFunction} The image load function.
   * @api
   */
  getImageLoadFunction() {
    return this.imageLoadFunction_;
  }
  /**
   * Return the URL used for this ArcGIS source.
   * @return {string|undefined} URL.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * Set the image load function of the source.
   * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
   * @api
   */
  setImageLoadFunction(imageLoadFunction) {
    this.imageLoadFunction_ = imageLoadFunction;
    this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string|undefined} url URL.
   * @api
   */
  setUrl(url) {
    if (url != this.url_) {
      this.url_ = url;
      this.loader = null;
      this.changed();
    }
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.changed();
  }
  /**
   * @override
   */
  changed() {
    this.image = null;
    super.changed();
  }
};
var ImageArcGISRest_default = ImageArcGISRest;

// node_modules/ol/source/ImageCanvas.js
var ImageCanvasSource = class extends Image_default3 {
  /**
   * @param {Options} [options] ImageCanvas options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: options.projection,
      resolutions: options.resolutions,
      state: options.state
    });
    this.canvasFunction_ = options.canvasFunction;
    this.canvas_ = null;
    this.renderedRevision_ = 0;
    this.ratio_ = options.ratio !== void 0 ? options.ratio : 1.5;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../ImageCanvas.js").default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    resolution = this.findNearestResolution(resolution);
    let canvas = this.canvas_;
    if (canvas && this.renderedRevision_ == this.getRevision() && canvas.getResolution() == resolution && canvas.getPixelRatio() == pixelRatio && containsExtent(canvas.getExtent(), extent)) {
      return canvas;
    }
    extent = extent.slice();
    scaleFromCenter(extent, this.ratio_);
    const width = getWidth(extent) / resolution;
    const height = getHeight(extent) / resolution;
    const size = [width * pixelRatio, height * pixelRatio];
    const canvasElement = this.canvasFunction_.call(this, extent, resolution, pixelRatio, size, projection);
    if (canvasElement) {
      canvas = new ImageCanvas_default(extent, resolution, pixelRatio, canvasElement);
    }
    this.canvas_ = canvas;
    this.renderedRevision_ = this.getRevision();
    return canvas;
  }
};
var ImageCanvas_default2 = ImageCanvasSource;

// node_modules/ol/source/mapguide.js
function getScale(extent, size, metersPerUnit, dpi) {
  const mcsW = getWidth(extent);
  const mcsH = getHeight(extent);
  const devW = size[0];
  const devH = size[1];
  const mpp = 0.0254 / dpi;
  if (devH * mcsW > devW * mcsH) {
    return mcsW * metersPerUnit / (devW * mpp);
  }
  return mcsH * metersPerUnit / (devH * mpp);
}
function getUrl(baseUrl, params, extent, size, useOverlay, metersPerUnit, displayDpi) {
  const scale4 = getScale(extent, size, metersPerUnit, displayDpi);
  const center = getCenter(extent);
  const baseParams = {
    "OPERATION": useOverlay ? "GETDYNAMICMAPOVERLAYIMAGE" : "GETMAPIMAGE",
    "VERSION": "2.0.0",
    "LOCALE": "en",
    "CLIENTAGENT": "ol/source/ImageMapGuide source",
    "CLIP": "1",
    "SETDISPLAYDPI": displayDpi,
    "SETDISPLAYWIDTH": Math.round(size[0]),
    "SETDISPLAYHEIGHT": Math.round(size[1]),
    "SETVIEWSCALE": scale4,
    "SETVIEWCENTERX": center[0],
    "SETVIEWCENTERY": center[1]
  };
  Object.assign(baseParams, params);
  return appendParams(baseUrl, baseParams);
}
function createLoader2(options) {
  const load = options.load || decode;
  const useOverlay = options.useOverlay ?? false;
  const metersPerUnit = options.metersPerUnit || 1;
  const displayDpi = options.displayDpi || 96;
  const ratio = options.ratio ?? 1;
  const crossOrigin = options.crossOrigin ?? null;
  return function(extent, resolution, pixelRatio) {
    const image = new Image();
    image.crossOrigin = crossOrigin;
    extent = getRequestExtent(extent, resolution, pixelRatio, ratio);
    const width = getWidth(extent) / resolution;
    const height = getHeight(extent) / resolution;
    const size = [width * pixelRatio, height * pixelRatio];
    const src = getUrl(options.url, options.params, extent, size, useOverlay, metersPerUnit, displayDpi);
    return load(image, src).then((image2) => ({
      image: image2,
      extent,
      pixelRatio
    }));
  };
}

// node_modules/ol/source/ImageMapGuide.js
var ImageMapGuide = class extends Image_default3 {
  /**
   * @param {Options} options ImageMapGuide options.
   */
  constructor(options) {
    super({
      interpolate: options.interpolate,
      projection: options.projection,
      resolutions: options.resolutions
    });
    this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    this.displayDpi_ = options.displayDpi !== void 0 ? options.displayDpi : 96;
    this.params_ = Object.assign({}, options.params);
    this.url_ = options.url;
    this.imageLoadFunction_ = options.imageLoadFunction !== void 0 ? options.imageLoadFunction : defaultImageLoadFunction;
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.metersPerUnit_ = options.metersPerUnit !== void 0 ? options.metersPerUnit : 1;
    this.ratio_ = options.ratio !== void 0 ? options.ratio : 1;
    this.useOverlay_ = options.useOverlay !== void 0 ? options.useOverlay : false;
    this.renderedRevision_ = 0;
    this.loaderProjection_ = null;
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (this.url_ === void 0) {
      return null;
    }
    if (!this.loader || this.loaderProjection_ !== projection) {
      this.loaderProjection_ = projection;
      this.loader = createLoader2({
        crossOrigin: this.crossOrigin_,
        params: this.params_,
        hidpi: this.hidpi_,
        metersPerUnit: this.metersPerUnit_,
        url: this.url_,
        useOverlay: this.useOverlay_,
        ratio: this.ratio_,
        load: (image, src) => {
          this.image.setImage(image);
          this.imageLoadFunction_(this.image, src);
          return decode(image);
        }
      });
    }
    return super.getImageInternal(extent, resolution, pixelRatio, projection);
  }
  /**
   * Return the image load function of the source.
   * @return {import("../Image.js").LoadFunction} The image load function.
   * @api
   */
  getImageLoadFunction() {
    return this.imageLoadFunction_;
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.changed();
  }
  /**
   * Set the image load function of the MapGuide source.
   * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
   * @api
   */
  setImageLoadFunction(imageLoadFunction) {
    this.imageLoadFunction_ = imageLoadFunction;
    this.changed();
  }
  /**
   * @override
   */
  changed() {
    this.image = null;
    super.changed();
  }
};
var ImageMapGuide_default = ImageMapGuide;

// node_modules/ol/source/static.js
function createLoader3(options) {
  const load = options.load || decode;
  const extent = options.imageExtent;
  const crossOrigin = options.crossOrigin ?? null;
  return () => {
    const image = new Image();
    image.crossOrigin = crossOrigin;
    return load(image, options.url).then((image2) => {
      const resolutionX = getWidth(extent) / image2.width;
      const resolutionY = getHeight(extent) / image2.height;
      const resolution = resolutionX !== resolutionY ? [resolutionX, resolutionY] : resolutionY;
      return {
        image: image2,
        extent,
        resolution,
        pixelRatio: 1
      };
    });
  };
}

// node_modules/ol/source/ImageStatic.js
var Static = class extends Image_default3 {
  /**
   * @param {Options} options ImageStatic options.
   */
  constructor(options) {
    const crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    const imageLoadFunction = options.imageLoadFunction !== void 0 ? options.imageLoadFunction : defaultImageLoadFunction;
    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: get(options.projection)
    });
    this.url_ = options.url;
    this.imageExtent_ = options.imageExtent;
    this.image = null;
    this.image = new Image_default(this.imageExtent_, void 0, 1, createLoader3({
      url: options.url,
      imageExtent: options.imageExtent,
      crossOrigin,
      load: (image, src) => {
        this.image.setImage(image);
        imageLoadFunction(this.image, src);
        return decode(image);
      }
    }));
    this.image.addEventListener(EventType_default.CHANGE, this.handleImageChange.bind(this));
  }
  /**
   * Returns the image extent
   * @return {import("../extent.js").Extent} image extent.
   * @api
   */
  getImageExtent() {
    return this.imageExtent_;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (intersects(extent, this.image.getExtent())) {
      return this.image;
    }
    return null;
  }
  /**
   * Return the URL used for this image source.
   * @return {string} URL.
   * @api
   */
  getUrl() {
    return this.url_;
  }
};
var ImageStatic_default = Static;

// node_modules/ol/source/ImageTile.js
var loadError = new Error("Image failed to load");
function loadImage(template, z, x, y, options) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = options.crossOrigin ?? null;
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () => reject(loadError));
    image.src = renderXYZTemplate(template, z, x, y, options.maxY);
  });
}
function makeLoaderFromTemplates(templates) {
  return function(z, x, y, options) {
    const template = pickUrl(templates, z, x, y);
    return loadImage(template, z, x, y, options);
  };
}
function makeLoaderFromGetter(getter) {
  return function(z, x, y, options) {
    const url = getter(z, x, y, options);
    return loadImage(url, z, x, y, options);
  };
}
function makeLoaderFromUrlLike(url) {
  let loader;
  if (Array.isArray(url)) {
    loader = makeLoaderFromTemplates(url);
  } else if (typeof url === "string") {
    const urls = expandUrl(url);
    loader = makeLoaderFromTemplates(urls);
  } else if (typeof url === "function") {
    loader = makeLoaderFromGetter(url);
  } else {
    throw new Error("The url option must be a single template, an array of templates, or a function for getting a URL");
  }
  return loader;
}
var keyCount = 0;
function keyFromUrlLike(url) {
  if (Array.isArray(url)) {
    return url.join("\n");
  }
  if (typeof url === "string") {
    return url;
  }
  ++keyCount;
  return "url-function-key-" + keyCount;
}
var ImageTileSource = class extends DataTile_default3 {
  /**
   * @param {Options} [options] DataTile source options.
   */
  constructor(options) {
    options = options || {};
    let loader = options.loader;
    let key;
    if (options.url) {
      loader = makeLoaderFromUrlLike(options.url);
      key = keyFromUrlLike(options.url);
    }
    const state = !loader ? "loading" : options.state;
    const wrapX2 = options.wrapX === void 0 ? true : options.wrapX;
    super({
      loader,
      key,
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize,
      gutter: options.gutter,
      maxResolution: options.maxResolution,
      projection: options.projection,
      tileGrid: options.tileGrid,
      state,
      wrapX: wrapX2,
      transition: options.transition,
      interpolate: options.interpolate !== false,
      crossOrigin: options.crossOrigin,
      zDirection: options.zDirection
    });
  }
  /**
   * @param {UrlLike} url The new URL.
   * @api
   */
  setUrl(url) {
    const loader = makeLoaderFromUrlLike(url);
    this.setLoader(loader);
    this.setKey(keyFromUrlLike(url));
    if (this.getState() !== "ready") {
      this.setState("ready");
    }
  }
};
var ImageTile_default2 = ImageTileSource;

// node_modules/ol/source/wms.js
var DEFAULT_VERSION = "1.3.0";
var GETFEATUREINFO_IMAGE_SIZE = [101, 101];
function getRequestUrl2(baseUrl, extent, size, projection, params) {
  params["WIDTH"] = size[0];
  params["HEIGHT"] = size[1];
  const axisOrientation = projection.getAxisOrientation();
  const v13 = compareVersions(params["VERSION"], "1.3") >= 0;
  params[v13 ? "CRS" : "SRS"] = projection.getCode();
  const bbox = v13 && axisOrientation.startsWith("ne") ? [extent[1], extent[0], extent[3], extent[2]] : extent;
  params["BBOX"] = bbox.join(",");
  return appendParams(baseUrl, params);
}
function getImageSrc(extent, resolution, pixelRatio, projection, url, params, serverType) {
  params = Object.assign({
    REQUEST: "GetMap"
  }, params);
  const imageResolution = resolution / pixelRatio;
  const imageSize = [round(getWidth(extent) / imageResolution, DECIMALS2), round(getHeight(extent) / imageResolution, DECIMALS2)];
  if (pixelRatio != 1) {
    switch (serverType) {
      case "geoserver":
        const dpi = 90 * pixelRatio + 0.5 | 0;
        if ("FORMAT_OPTIONS" in params) {
          params["FORMAT_OPTIONS"] += ";dpi:" + dpi;
        } else {
          params["FORMAT_OPTIONS"] = "dpi:" + dpi;
        }
        break;
      case "mapserver":
        params["MAP_RESOLUTION"] = 90 * pixelRatio;
        break;
      case "carmentaserver":
      case "qgis":
        params["DPI"] = 90 * pixelRatio;
        break;
      default:
        throw new Error("Unknown `serverType` configured");
    }
  }
  const src = getRequestUrl2(url, extent, imageSize, projection, params);
  return src;
}
function getRequestParams(params, request) {
  return Object.assign({
    "REQUEST": request,
    "SERVICE": "WMS",
    "VERSION": DEFAULT_VERSION,
    "FORMAT": "image/png",
    "STYLES": "",
    "TRANSPARENT": "TRUE"
  }, params);
}
function createLoader4(options) {
  const hidpi = options.hidpi === void 0 ? true : options.hidpi;
  const projection = get(options.projection || "EPSG:3857");
  const ratio = options.ratio || 1.5;
  const load = options.load || decode;
  const crossOrigin = options.crossOrigin ?? null;
  return (extent, resolution, pixelRatio) => {
    extent = getRequestExtent(extent, resolution, pixelRatio, ratio);
    if (pixelRatio != 1 && (!hidpi || options.serverType === void 0)) {
      pixelRatio = 1;
    }
    const src = getImageSrc(extent, resolution, pixelRatio, projection, options.url, getRequestParams(options.params, "GetMap"), options.serverType);
    const image = new Image();
    image.crossOrigin = crossOrigin;
    return load(image, src).then((image2) => ({
      image: image2,
      extent,
      pixelRatio
    }));
  };
}
function getFeatureInfoUrl(options, coordinate, resolution) {
  if (options.url === void 0) {
    return void 0;
  }
  const projectionObj = get(options.projection || "EPSG:3857");
  const extent = getForViewAndSize(coordinate, resolution, 0, GETFEATUREINFO_IMAGE_SIZE);
  const baseParams = {
    "QUERY_LAYERS": options.params["LAYERS"],
    "INFO_FORMAT": "application/json"
  };
  Object.assign(baseParams, getRequestParams(options.params, "GetFeatureInfo"), options.params);
  const x = floor((coordinate[0] - extent[0]) / resolution, DECIMALS2);
  const y = floor((extent[3] - coordinate[1]) / resolution, DECIMALS2);
  const v13 = compareVersions(baseParams["VERSION"], "1.3") >= 0;
  baseParams[v13 ? "I" : "X"] = x;
  baseParams[v13 ? "J" : "Y"] = y;
  return getRequestUrl2(options.url, extent, GETFEATUREINFO_IMAGE_SIZE, projectionObj, baseParams);
}
function getLegendUrl(options, resolution) {
  if (options.url === void 0) {
    return void 0;
  }
  const baseParams = {
    "SERVICE": "WMS",
    "VERSION": DEFAULT_VERSION,
    "REQUEST": "GetLegendGraphic",
    "FORMAT": "image/png"
  };
  if (resolution !== void 0) {
    const mpu = get(options.projection || "EPSG:3857").getMetersPerUnit() || 1;
    const pixelSize = 28e-5;
    baseParams["SCALE"] = resolution * mpu / pixelSize;
  }
  Object.assign(baseParams, options.params);
  if (options.params !== void 0 && baseParams["LAYER"] === void 0) {
    const layers = baseParams["LAYERS"];
    const isSingleLayer = !Array.isArray(layers) || layers.length !== 1;
    if (!isSingleLayer) {
      return void 0;
    }
    baseParams["LAYER"] = layers;
  }
  return appendParams(options.url, baseParams);
}

// node_modules/ol/source/ImageWMS.js
var ImageWMS = class extends Image_default3 {
  /**
   * @param {Options} [options] ImageWMS options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      attributions: options.attributions,
      interpolate: options.interpolate,
      projection: options.projection,
      resolutions: options.resolutions
    });
    this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    this.url_ = options.url;
    this.imageLoadFunction_ = options.imageLoadFunction !== void 0 ? options.imageLoadFunction : defaultImageLoadFunction;
    this.params_ = Object.assign({}, options.params);
    this.serverType_ = options.serverType;
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.renderedRevision_ = 0;
    this.ratio_ = options.ratio !== void 0 ? options.ratio : 1.5;
    this.loaderProjection_ = null;
  }
  /**
   * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
   * projection. Return `undefined` if the GetFeatureInfo URL cannot be
   * constructed.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
   *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
   *     in the `LAYERS` parameter will be used. `VERSION` should not be
   *     specified here.
   * @return {string|undefined} GetFeatureInfo URL.
   * @api
   */
  getFeatureInfoUrl(coordinate, resolution, projection, params) {
    const projectionObj = get(projection);
    const sourceProjectionObj = this.getProjection();
    if (sourceProjectionObj && sourceProjectionObj !== projectionObj) {
      resolution = calculateSourceResolution(sourceProjectionObj, projectionObj, coordinate, resolution);
      coordinate = transform(coordinate, projectionObj, sourceProjectionObj);
    }
    const options = {
      url: this.url_,
      params: __spreadValues(__spreadValues({}, this.params_), params),
      projection: sourceProjectionObj || projectionObj
    };
    return getFeatureInfoUrl(options, coordinate, resolution);
  }
  /**
   * Return the GetLegendGraphic URL, optionally optimized for the passed
   * resolution and possibly including any passed specific parameters. Returns
   * `undefined` if the GetLegendGraphic URL cannot be constructed.
   *
   * @param {number} [resolution] Resolution. If set to undefined, `SCALE`
   *     will not be calculated and included in URL.
   * @param {Object} [params] GetLegendGraphic params. If `LAYER` is set, the
   *     request is generated for this wms layer, else it will try to use the
   *     configured wms layer. Default `FORMAT` is `image/png`.
   *     `VERSION` should not be specified here.
   * @return {string|undefined} GetLegendGraphic URL.
   * @api
   */
  getLegendUrl(resolution, params) {
    return getLegendUrl({
      url: this.url_,
      params: __spreadValues(__spreadValues({}, this.params_), params)
    }, resolution);
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @override
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (this.url_ === void 0) {
      return null;
    }
    if (!this.loader || this.loaderProjection_ !== projection) {
      this.loaderProjection_ = projection;
      this.loader = createLoader4({
        crossOrigin: this.crossOrigin_,
        params: this.params_,
        projection,
        serverType: this.serverType_,
        hidpi: this.hidpi_,
        url: this.url_,
        ratio: this.ratio_,
        load: (image, src) => {
          this.image.setImage(image);
          this.imageLoadFunction_(this.image, src);
          return decode(image);
        }
      });
    }
    return super.getImageInternal(extent, resolution, pixelRatio, projection);
  }
  /**
   * Return the image load function of the source.
   * @return {import("../Image.js").LoadFunction} The image load function.
   * @api
   */
  getImageLoadFunction() {
    return this.imageLoadFunction_;
  }
  /**
   * Return the URL used for this WMS source.
   * @return {string|undefined} URL.
   * @api
   */
  getUrl() {
    return this.url_;
  }
  /**
   * Set the image load function of the source.
   * @param {import("../Image.js").LoadFunction} imageLoadFunction Image load function.
   * @api
   */
  setImageLoadFunction(imageLoadFunction) {
    this.imageLoadFunction_ = imageLoadFunction;
    this.changed();
  }
  /**
   * Set the URL to use for requests.
   * @param {string|undefined} url URL.
   * @api
   */
  setUrl(url) {
    if (url != this.url_) {
      this.url_ = url;
      this.loader = null;
      this.changed();
    }
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.changed();
  }
  /**
   * @override
   */
  changed() {
    this.image = null;
    super.changed();
  }
};
var ImageWMS_default = ImageWMS;

// node_modules/ol/net.js
function jsonp(url, callback, errback, callbackParam) {
  const script = document.createElement("script");
  const key = "olc_" + getUid(callback);
  function cleanup() {
    delete window[key];
    script.parentNode.removeChild(script);
  }
  script.async = true;
  script.src = url + (url.includes("?") ? "&" : "?") + (callbackParam || "callback") + "=" + key;
  const timer = setTimeout(function() {
    cleanup();
    if (errback) {
      errback();
    }
  }, 1e4);
  window[key] = function(data) {
    clearTimeout(timer);
    cleanup();
    callback(data);
  };
  document.head.appendChild(script);
}
var ResponseError = class extends Error {
  /**
   * @param {XMLHttpRequest} response The XHR object.
   */
  constructor(response) {
    const message = "Unexpected response status: " + response.status;
    super(message);
    this.name = "ResponseError";
    this.response = response;
  }
};
var ClientError = class extends Error {
  /**
   * @param {XMLHttpRequest} client The XHR object.
   */
  constructor(client) {
    super("Failed to issue request");
    this.name = "ClientError";
    this.client = client;
  }
};
function getJSON(url) {
  return new Promise(function(resolve, reject) {
    function onLoad(event) {
      const client2 = event.target;
      if (!client2.status || client2.status >= 200 && client2.status < 300) {
        let data;
        try {
          data = JSON.parse(client2.responseText);
        } catch (err) {
          const message = "Error parsing response text as JSON: " + err.message;
          reject(new Error(message));
          return;
        }
        resolve(data);
        return;
      }
      reject(new ResponseError(client2));
    }
    function onError(event) {
      reject(new ClientError(event.target));
    }
    const client = new XMLHttpRequest();
    client.addEventListener("load", onLoad);
    client.addEventListener("error", onError);
    client.open("GET", url);
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
}
function resolveUrl(base, url) {
  if (url.includes("://")) {
    return url;
  }
  return new URL(url, base).href;
}

// node_modules/ol/source/ogcTileUtil.js
var knownMapMediaTypes = {
  "image/png": true,
  "image/jpeg": true,
  "image/gif": true,
  "image/webp": true
};
var knownVectorMediaTypes = {
  "application/vnd.mapbox-vector-tile": true,
  "application/geo+json": true
};
function appendCollectionsQueryParam(tileUrlTemplate, collections) {
  if (!collections.length) {
    return tileUrlTemplate;
  }
  const url = new URL(tileUrlTemplate, "file:/");
  if (url.pathname.split("/").includes("collections")) {
    error('The "collections" query parameter cannot be added to collection endpoints');
    return tileUrlTemplate;
  }
  const encodedCollections = collections.map((c) => encodeURIComponent(c)).join(",");
  url.searchParams.append("collections", encodedCollections);
  const baseUrl = tileUrlTemplate.split("?")[0];
  const queryParams = decodeURIComponent(url.searchParams.toString());
  return `${baseUrl}?${queryParams}`;
}
function getMapTileUrlTemplate(links, mediaType, collections) {
  let tileUrlTemplate;
  let fallbackUrlTemplate;
  for (let i = 0; i < links.length; ++i) {
    const link = links[i];
    if (link.rel === "item") {
      if (link.type === mediaType) {
        tileUrlTemplate = link.href;
        break;
      }
      if (knownMapMediaTypes[link.type]) {
        fallbackUrlTemplate = link.href;
      } else if (!fallbackUrlTemplate && link.type.startsWith("image/")) {
        fallbackUrlTemplate = link.href;
      }
    }
  }
  if (!tileUrlTemplate) {
    if (fallbackUrlTemplate) {
      tileUrlTemplate = fallbackUrlTemplate;
    } else {
      throw new Error('Could not find "item" link');
    }
  }
  if (collections) {
    tileUrlTemplate = appendCollectionsQueryParam(tileUrlTemplate, collections);
  }
  return tileUrlTemplate;
}
function getVectorTileUrlTemplate(links, mediaType, supportedMediaTypes, collections) {
  let tileUrlTemplate;
  let fallbackUrlTemplate;
  const hrefLookup = {};
  for (let i = 0; i < links.length; ++i) {
    const link = links[i];
    hrefLookup[link.type] = link.href;
    if (link.rel === "item") {
      if (link.type === mediaType) {
        tileUrlTemplate = link.href;
        break;
      }
      if (knownVectorMediaTypes[link.type]) {
        fallbackUrlTemplate = link.href;
      }
    }
  }
  if (!tileUrlTemplate && supportedMediaTypes) {
    for (let i = 0; i < supportedMediaTypes.length; ++i) {
      const supportedMediaType = supportedMediaTypes[i];
      if (hrefLookup[supportedMediaType]) {
        tileUrlTemplate = hrefLookup[supportedMediaType];
        break;
      }
    }
  }
  if (!tileUrlTemplate) {
    if (fallbackUrlTemplate) {
      tileUrlTemplate = fallbackUrlTemplate;
    } else {
      throw new Error('Could not find "item" link');
    }
  }
  if (collections) {
    tileUrlTemplate = appendCollectionsQueryParam(tileUrlTemplate, collections);
  }
  return tileUrlTemplate;
}
function parseTileMatrixSet(sourceInfo, tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits) {
  let projection = sourceInfo.projection;
  if (!projection) {
    if (typeof tileMatrixSet.crs === "string") {
      projection = get(tileMatrixSet.crs);
    } else if ("uri" in tileMatrixSet.crs) {
      projection = get(tileMatrixSet.crs.uri);
    }
    if (!projection) {
      throw new Error(`Unsupported CRS: ${JSON.stringify(tileMatrixSet.crs)}`);
    }
  }
  const orderedAxes = tileMatrixSet.orderedAxes;
  const axisOrientation = orderedAxes ? orderedAxes.slice(0, 2).map((s) => s.replace(/E|X|Lon/i, "e").replace(/N|Y|Lat/i, "n")).join("") : projection.getAxisOrientation();
  const backwards = !axisOrientation.startsWith("en");
  const matrices = tileMatrixSet.tileMatrices;
  const matrixLookup = {};
  for (let i = 0; i < matrices.length; ++i) {
    const matrix = matrices[i];
    matrixLookup[matrix.id] = matrix;
  }
  const limitLookup = {};
  const matrixIds = [];
  if (tileMatrixSetLimits) {
    for (let i = 0; i < tileMatrixSetLimits.length; ++i) {
      const limit = tileMatrixSetLimits[i];
      const id = limit.tileMatrix;
      matrixIds.push(id);
      limitLookup[id] = limit;
    }
  } else {
    for (let i = 0; i < matrices.length; ++i) {
      const id = matrices[i].id;
      matrixIds.push(id);
    }
  }
  const length = matrixIds.length;
  const origins = new Array(length);
  const resolutions = new Array(length);
  const sizes = new Array(length);
  const tileSizes = new Array(length);
  const extent = [-Infinity, -Infinity, Infinity, Infinity];
  for (let i = 0; i < length; ++i) {
    const id = matrixIds[i];
    const matrix = matrixLookup[id];
    const origin = matrix.pointOfOrigin;
    if (backwards) {
      origins[i] = [origin[1], origin[0]];
    } else {
      origins[i] = origin;
    }
    resolutions[i] = matrix.cellSize;
    sizes[i] = [matrix.matrixWidth, matrix.matrixHeight];
    tileSizes[i] = [matrix.tileWidth, matrix.tileHeight];
    const limit = limitLookup[id];
    if (limit) {
      const tileMapWidth = matrix.cellSize * matrix.tileWidth;
      const minX = origins[i][0] + limit.minTileCol * tileMapWidth;
      const maxX = origins[i][0] + (limit.maxTileCol + 1) * tileMapWidth;
      const tileMapHeight = matrix.cellSize * matrix.tileHeight;
      const upsideDown = matrix.cornerOfOrigin === "bottomLeft";
      let minY;
      let maxY;
      if (upsideDown) {
        minY = origins[i][1] + limit.minTileRow * tileMapHeight;
        maxY = origins[i][1] + (limit.maxTileRow + 1) * tileMapHeight;
      } else {
        minY = origins[i][1] - (limit.maxTileRow + 1) * tileMapHeight;
        maxY = origins[i][1] - limit.minTileRow * tileMapHeight;
      }
      getIntersection(extent, [minX, minY, maxX, maxY], extent);
    }
  }
  const tileGrid = new TileGrid_default({
    origins,
    resolutions,
    sizes,
    tileSizes,
    extent: tileMatrixSetLimits ? extent : void 0
  });
  const context = sourceInfo.context;
  const base = sourceInfo.url;
  function tileUrlFunction(tileCoord, pixelRatio, projection2) {
    if (!tileCoord) {
      return void 0;
    }
    const id = matrixIds[tileCoord[0]];
    const matrix = matrixLookup[id];
    const upsideDown = matrix.cornerOfOrigin === "bottomLeft";
    const localContext = {
      tileMatrix: id,
      tileCol: tileCoord[1],
      tileRow: upsideDown ? -tileCoord[2] - 1 : tileCoord[2]
    };
    if (tileMatrixSetLimits) {
      const limit = limitLookup[matrix.id];
      if (localContext.tileCol < limit.minTileCol || localContext.tileCol > limit.maxTileCol || localContext.tileRow < limit.minTileRow || localContext.tileRow > limit.maxTileRow) {
        return void 0;
      }
    }
    Object.assign(localContext, context);
    const url = tileUrlTemplate.replace(/\{(\w+?)\}/g, function(m, p) {
      return localContext[p];
    });
    return resolveUrl(base, url);
  }
  return {
    grid: tileGrid,
    projection,
    urlTemplate: tileUrlTemplate,
    urlFunction: tileUrlFunction
  };
}
function parseTileSetMetadata(sourceInfo, tileSet) {
  const tileMatrixSetLimits = tileSet.tileMatrixSetLimits;
  let tileUrlTemplate;
  if (tileSet.dataType === "map") {
    tileUrlTemplate = getMapTileUrlTemplate(tileSet.links, sourceInfo.mediaType, sourceInfo.collections);
  } else if (tileSet.dataType === "vector") {
    tileUrlTemplate = getVectorTileUrlTemplate(tileSet.links, sourceInfo.mediaType, sourceInfo.supportedMediaTypes, sourceInfo.collections);
  } else {
    throw new Error('Expected tileset data type to be "map" or "vector"');
  }
  if (tileSet.tileMatrixSet) {
    return parseTileMatrixSet(sourceInfo, tileSet.tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits);
  }
  const tileMatrixSetLink = tileSet.links.find((link) => link.rel === "http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme");
  if (!tileMatrixSetLink) {
    throw new Error("Expected http://www.opengis.net/def/rel/ogc/1.0/tiling-scheme link or tileMatrixSet");
  }
  const tileMatrixSetDefinition = tileMatrixSetLink.href;
  const url = resolveUrl(sourceInfo.url, tileMatrixSetDefinition);
  return getJSON(url).then(function(tileMatrixSet) {
    return parseTileMatrixSet(sourceInfo, tileMatrixSet, tileUrlTemplate, tileMatrixSetLimits);
  });
}
function getTileSetInfo(sourceInfo) {
  return getJSON(sourceInfo.url).then(function(tileSet) {
    return parseTileSetMetadata(sourceInfo, tileSet);
  });
}

// node_modules/ol/source/OGCMapTile.js
var OGCMapTile = class extends TileImage_default {
  /**
   * @param {Options} options OGC map tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: options.tileLoadFunction,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition
    });
    const sourceInfo = {
      url: options.url,
      projection: this.getProjection(),
      mediaType: options.mediaType,
      context: options.context || null,
      collections: options.collections
    };
    getTileSetInfo(sourceInfo).then(this.handleTileSetInfo_.bind(this)).catch(this.handleError_.bind(this));
  }
  /**
   * @param {import("./ogcTileUtil.js").TileSetInfo} tileSetInfo Tile set info.
   * @private
   */
  handleTileSetInfo_(tileSetInfo) {
    this.tileGrid = tileSetInfo.grid;
    this.projection = tileSetInfo.projection;
    this.setTileUrlFunction(tileSetInfo.urlFunction, tileSetInfo.urlTemplate);
    this.setState("ready");
  }
  /**
   * @private
   * @param {Error} error The error.
   */
  handleError_(error2) {
    error(error2);
    this.setState("error");
  }
};
var OGCMapTile_default = OGCMapTile;

// node_modules/ol/source/VectorTile.js
var VectorTile = class extends UrlTile_default {
  /**
   * @param {!Options<FeatureType>} options Vector tile options.
   */
  constructor(options) {
    const projection = options.projection || "EPSG:3857";
    const extent = options.extent || extentFromProjection(projection);
    const tileGrid = options.tileGrid || createXYZ({
      extent,
      maxResolution: options.maxResolution,
      maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 22,
      minZoom: options.minZoom,
      tileSize: options.tileSize || 512
    });
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      interpolate: true,
      projection,
      state: options.state,
      tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultLoadFunction,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX === void 0 ? true : options.wrapX,
      transition: options.transition,
      zDirection: options.zDirection === void 0 ? 1 : options.zDirection
    });
    this.format_ = options.format ? options.format : null;
    this.tileKeysBySourceTileUrl_ = {};
    this.sourceTiles_ = {};
    this.overlaps_ = options.overlaps == void 0 ? true : options.overlaps;
    this.tileClass = options.tileClass ? options.tileClass : VectorTile_default;
    this.tileGrids_ = {};
  }
  /**
   * @return {boolean} The source can have overlapping geometries.
   */
  getOverlaps() {
    return this.overlaps_;
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection").default} projection Projection.
   * @param {VectorRenderTile} tile Vector render tile.
   * @return {Array<import("../VectorTile").default>} Tile keys.
   */
  getSourceTiles(pixelRatio, projection, tile) {
    if (tile.getState() === TileState_default.IDLE) {
      tile.setState(TileState_default.LOADING);
      const urlTileCoord = tile.wrappedTileCoord;
      const tileGrid = this.getTileGridForProjection(projection);
      const extent = tileGrid.getTileCoordExtent(urlTileCoord);
      const z = urlTileCoord[0];
      const resolution = tileGrid.getResolution(z);
      buffer(extent, -resolution, extent);
      const sourceTileGrid = this.tileGrid;
      const sourceExtent = sourceTileGrid.getExtent();
      if (sourceExtent) {
        getIntersection(extent, sourceExtent, extent);
      }
      const sourceZ = sourceTileGrid.getZForResolution(resolution, this.zDirection);
      sourceTileGrid.forEachTileCoord(extent, sourceZ, (sourceTileCoord) => {
        const tileUrl2 = this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
        if (!this.sourceTiles_[tileUrl2]) {
          this.sourceTiles_[tileUrl2] = new this.tileClass(sourceTileCoord, tileUrl2 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl2, this.format_, this.tileLoadFunction);
        }
        const sourceTile = this.sourceTiles_[tileUrl2];
        tile.sourceTiles.push(sourceTile);
        if (!this.tileKeysBySourceTileUrl_[tileUrl2]) {
          this.tileKeysBySourceTileUrl_[tileUrl2] = [];
        }
        this.tileKeysBySourceTileUrl_[tileUrl2].push(tile.getKey());
        const sourceTileState = sourceTile.getState();
        if (sourceTileState < TileState_default.LOADED) {
          const listenChange = (event) => {
            this.handleTileChange(event);
            const state = sourceTile.getState();
            if (state === TileState_default.LOADED || state === TileState_default.ERROR) {
              const sourceTileKey = sourceTile.getKey();
              if (sourceTileKey in tile.errorTileKeys) {
                if (sourceTile.getState() === TileState_default.LOADED) {
                  delete tile.errorTileKeys[sourceTileKey];
                }
              } else {
                tile.loadingSourceTiles--;
              }
              if (state === TileState_default.ERROR) {
                tile.errorTileKeys[sourceTileKey] = true;
              } else {
                sourceTile.removeEventListener(EventType_default.CHANGE, listenChange);
              }
              if (tile.loadingSourceTiles === 0) {
                tile.setState(isEmpty(tile.errorTileKeys) ? TileState_default.LOADED : TileState_default.ERROR);
              }
            }
          };
          sourceTile.addEventListener(EventType_default.CHANGE, listenChange);
          tile.loadingSourceTiles++;
        }
        if (sourceTileState === TileState_default.IDLE) {
          sourceTile.extent = sourceTileGrid.getTileCoordExtent(sourceTileCoord);
          sourceTile.projection = projection;
          sourceTile.resolution = sourceTileGrid.getResolution(sourceTileCoord[0]);
          sourceTile.load();
        }
      });
      if (!tile.loadingSourceTiles) {
        tile.setState(tile.sourceTiles.some((sourceTile) => sourceTile.getState() === TileState_default.ERROR) ? TileState_default.ERROR : TileState_default.LOADED);
      }
    }
    return tile.sourceTiles;
  }
  /**
   * @param {VectorRenderTile} tile Vector render tile.
   */
  removeSourceTiles(tile) {
    const tileKey = tile.getKey();
    const sourceTiles = tile.sourceTiles;
    for (let i = 0, ii = sourceTiles.length; i < ii; ++i) {
      const sourceTileUrl = sourceTiles[i].getTileUrl();
      if (!this.tileKeysBySourceTileUrl_[sourceTileUrl]) {
        return;
      }
      const index = this.tileKeysBySourceTileUrl_[sourceTileUrl].indexOf(tileKey);
      if (index === -1) {
        continue;
      }
      this.tileKeysBySourceTileUrl_[sourceTileUrl].splice(index, 1);
      if (this.tileKeysBySourceTileUrl_[sourceTileUrl].length === 0) {
        delete this.tileKeysBySourceTileUrl_[sourceTileUrl];
        delete this.sourceTiles_[sourceTileUrl];
      }
    }
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!VectorRenderTile} Tile.
   * @override
   */
  getTile(z, x, y, pixelRatio, projection) {
    const tileCoord = [z, x, y];
    let urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    const sourceExtent = this.getTileGrid().getExtent();
    const tileGrid = this.getTileGridForProjection(projection);
    if (urlTileCoord && sourceExtent) {
      const tileExtent = tileGrid.getTileCoordExtent(urlTileCoord);
      buffer(tileExtent, -tileGrid.getResolution(z), tileExtent);
      if (!intersects(sourceExtent, tileExtent)) {
        urlTileCoord = null;
      }
    }
    let empty = true;
    if (urlTileCoord !== null) {
      const sourceTileGrid = this.tileGrid;
      const resolution = tileGrid.getResolution(z);
      const sourceZ = sourceTileGrid.getZForResolution(resolution, 1);
      const extent = tileGrid.getTileCoordExtent(urlTileCoord);
      buffer(extent, -resolution, extent);
      sourceTileGrid.forEachTileCoord(extent, sourceZ, (sourceTileCoord) => {
        empty = empty && !this.tileUrlFunction(sourceTileCoord, pixelRatio, projection);
      });
    }
    const newTile = new VectorRenderTile_default(tileCoord, empty ? TileState_default.EMPTY : TileState_default.IDLE, urlTileCoord, this.getSourceTiles.bind(this, pixelRatio, projection), this.removeSourceTiles.bind(this));
    newTile.key = this.getKey();
    return newTile;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   * @override
   */
  getTileGridForProjection(projection) {
    const code = projection.getCode();
    let tileGrid = this.tileGrids_[code];
    if (!tileGrid) {
      const sourceTileGrid = this.tileGrid;
      const resolutions = sourceTileGrid.getResolutions().slice();
      const origins = resolutions.map(function(resolution, z) {
        return sourceTileGrid.getOrigin(z);
      });
      const tileSizes = resolutions.map(function(resolution, z) {
        return sourceTileGrid.getTileSize(z);
      });
      const length = DEFAULT_MAX_ZOOM + 1;
      for (let z = resolutions.length; z < length; ++z) {
        resolutions.push(resolutions[z - 1] / 2);
        origins.push(origins[z - 1]);
        tileSizes.push(tileSizes[z - 1]);
      }
      tileGrid = new TileGrid_default({
        extent: sourceTileGrid.getExtent(),
        origins,
        resolutions,
        tileSizes
      });
      this.tileGrids_[code] = tileGrid;
    }
    return tileGrid;
  }
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   * @override
   */
  getTilePixelRatio(pixelRatio) {
    return pixelRatio;
  }
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   * @override
   */
  getTilePixelSize(z, pixelRatio, projection) {
    const tileGrid = this.getTileGridForProjection(projection);
    const tileSize = toSize(tileGrid.getTileSize(z), this.tmpSize);
    return [Math.round(tileSize[0] * pixelRatio), Math.round(tileSize[1] * pixelRatio)];
  }
  /**
   * @param {boolean} overlaps The source has overlapping geometries.
   */
  setOverlaps(overlaps) {
    this.overlaps_ = overlaps;
    this.changed();
  }
};
var VectorTile_default2 = VectorTile;
function defaultLoadFunction(tile, url) {
  tile.setLoader(
    /**
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} resolution Resolution.
     * @param {import("../proj/Projection.js").default} projection Projection.
     */
    function(extent, resolution, projection) {
      loadFeaturesXhr(url, tile.getFormat(), extent, resolution, projection, tile.onLoad.bind(tile), tile.onError.bind(tile));
    }
  );
}

// node_modules/ol/source/OGCVectorTile.js
var OGCVectorTile = class extends VectorTile_default2 {
  /**
   * @param {Options<FeatureType>} options OGC vector tile options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      format: options.format,
      overlaps: options.overlaps,
      projection: options.projection,
      tileClass: options.tileClass,
      transition: options.transition,
      wrapX: options.wrapX,
      zDirection: options.zDirection,
      state: "loading"
    });
    const sourceInfo = {
      url: options.url,
      projection: this.getProjection(),
      mediaType: options.mediaType,
      supportedMediaTypes: options.format.supportedMediaTypes,
      context: options.context || null,
      collections: options.collections
    };
    getTileSetInfo(sourceInfo).then(this.handleTileSetInfo_.bind(this)).catch(this.handleError_.bind(this));
  }
  /**
   * @param {import("./ogcTileUtil.js").TileSetInfo} tileSetInfo Tile set info.
   * @private
   */
  handleTileSetInfo_(tileSetInfo) {
    this.tileGrid = tileSetInfo.grid;
    this.projection = tileSetInfo.projection;
    this.setTileUrlFunction(tileSetInfo.urlFunction, tileSetInfo.urlTemplate);
    this.setState("ready");
  }
  /**
   * @private
   * @param {Error} error The error.
   */
  handleError_(error2) {
    error(error2);
    this.setState("error");
  }
};
var OGCVectorTile_default = OGCVectorTile;

// node_modules/ol/source/OSM.js
var ATTRIBUTION = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
var OSM = class extends XYZ_default {
  /**
   * @param {Options} [options] Open Street Map options.
   */
  constructor(options) {
    options = options || {};
    let attributions;
    if (options.attributions !== void 0) {
      attributions = options.attributions;
    } else {
      attributions = [ATTRIBUTION];
    }
    const crossOrigin = options.crossOrigin !== void 0 ? options.crossOrigin : "anonymous";
    const url = options.url !== void 0 ? options.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
    super({
      attributions,
      attributionsCollapsible: false,
      cacheSize: options.cacheSize,
      crossOrigin,
      interpolate: options.interpolate,
      maxZoom: options.maxZoom !== void 0 ? options.maxZoom : 19,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url,
      wrapX: options.wrapX,
      zDirection: options.zDirection
    });
  }
};
var OSM_default = OSM;

// node_modules/ol/renderer/canvas/ImageLayer.js
var CanvasImageLayerRenderer = class extends Layer_default {
  /**
   * @param {import("../../layer/Image.js").default} imageLayer Image layer.
   */
  constructor(imageLayer) {
    super(imageLayer);
    this.image = null;
  }
  /**
   * @return {import('../../DataTile.js').ImageLike} Image.
   */
  getImage() {
    return !this.image ? null : this.image.getImage();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   * @override
   */
  prepareFrame(frameState) {
    const layerState = frameState.layerStatesArray[frameState.layerIndex];
    const pixelRatio = frameState.pixelRatio;
    const viewState = frameState.viewState;
    const viewResolution = viewState.resolution;
    const imageSource = this.getLayer().getSource();
    const hints = frameState.viewHints;
    let renderedExtent = frameState.extent;
    if (layerState.extent !== void 0) {
      renderedExtent = getIntersection(renderedExtent, fromUserExtent(layerState.extent, viewState.projection));
    }
    if (!hints[ViewHint_default.ANIMATING] && !hints[ViewHint_default.INTERACTING] && !isEmpty2(renderedExtent)) {
      if (imageSource) {
        const projection = viewState.projection;
        const image = imageSource.getImage(renderedExtent, viewResolution, pixelRatio, projection);
        if (image) {
          if (this.loadImage(image)) {
            this.image = image;
          } else if (image.getState() === ImageState_default.EMPTY) {
            this.image = null;
          }
        }
      } else {
        this.image = null;
      }
    }
    return !!this.image;
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
    const imageExtent = this.image.getExtent();
    const img = this.image.getImage();
    const imageMapWidth = getWidth(imageExtent);
    const col = Math.floor(img.width * ((coordinate[0] - imageExtent[0]) / imageMapWidth));
    if (col < 0 || col >= img.width) {
      return null;
    }
    const imageMapHeight = getHeight(imageExtent);
    const row = Math.floor(img.height * ((imageExtent[3] - coordinate[1]) / imageMapHeight));
    if (row < 0 || row >= img.height) {
      return null;
    }
    return this.getImageData(img, col, row);
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement} target Target that may be used to render content to.
   * @return {HTMLElement} The rendered element.
   * @override
   */
  renderFrame(frameState, target) {
    const image = this.image;
    const imageExtent = image.getExtent();
    const imageResolution = image.getResolution();
    const [imageResolutionX, imageResolutionY] = Array.isArray(imageResolution) ? imageResolution : [imageResolution, imageResolution];
    const imagePixelRatio = image.getPixelRatio();
    const layerState = frameState.layerStatesArray[frameState.layerIndex];
    const pixelRatio = frameState.pixelRatio;
    const viewState = frameState.viewState;
    const viewCenter = viewState.center;
    const viewResolution = viewState.resolution;
    const scaleX = pixelRatio * imageResolutionX / (viewResolution * imagePixelRatio);
    const scaleY = pixelRatio * imageResolutionY / (viewResolution * imagePixelRatio);
    this.prepareContainer(frameState, target);
    const width = this.context.canvas.width;
    const height = this.context.canvas.height;
    const context = this.getRenderContext(frameState);
    let clipped = false;
    let render3 = true;
    if (layerState.extent) {
      const layerExtent = fromUserExtent(layerState.extent, viewState.projection);
      render3 = intersects(layerExtent, frameState.extent);
      clipped = render3 && !containsExtent(layerExtent, frameState.extent);
      if (clipped) {
        this.clipUnrotated(context, frameState, layerExtent);
      }
    }
    const img = image.getImage();
    const transform2 = compose(this.tempTransform, width / 2, height / 2, scaleX, scaleY, 0, imagePixelRatio * (imageExtent[0] - viewCenter[0]) / imageResolutionX, imagePixelRatio * (viewCenter[1] - imageExtent[3]) / imageResolutionY);
    this.renderedResolution = imageResolutionY * pixelRatio / imagePixelRatio;
    const dw = img.width * transform2[0];
    const dh = img.height * transform2[3];
    if (!this.getLayer().getSource().getInterpolate()) {
      context.imageSmoothingEnabled = false;
    }
    this.preRender(context, frameState);
    if (render3 && dw >= 0.5 && dh >= 0.5) {
      const dx = transform2[4];
      const dy = transform2[5];
      const opacity = layerState.opacity;
      if (opacity !== 1) {
        context.save();
        context.globalAlpha = opacity;
      }
      context.drawImage(img, 0, 0, +img.width, +img.height, dx, dy, dw, dh);
      if (opacity !== 1) {
        context.restore();
      }
    }
    this.postRender(this.context, frameState);
    if (clipped) {
      context.restore();
    }
    context.imageSmoothingEnabled = true;
    return this.container;
  }
};
var ImageLayer_default = CanvasImageLayerRenderer;

// node_modules/ol/layer/BaseImage.js
var BaseImageLayer = class extends Layer_default2 {
  /**
   * @param {Options<ImageSourceType>} [options] Layer options.
   */
  constructor(options) {
    options = options ? options : {};
    super(options);
  }
};
var BaseImage_default = BaseImageLayer;

// node_modules/ol/layer/Image.js
var ImageLayer = class extends BaseImage_default {
  /**
   * @param {import("./BaseImage.js").Options<ImageSourceType>} [options] Layer options.
   */
  constructor(options) {
    super(options);
  }
  /**
   * @override
   */
  createRenderer() {
    return new ImageLayer_default(this);
  }
  /**
   * Get data for a pixel location.  A four element RGBA array will be returned.  For requests outside the
   * layer extent, `null` will be returned.  Data for an image can only be retrieved if the
   * source's `crossOrigin` property is set.
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
var Image_default4 = ImageLayer;

// node_modules/ol/source/Raster.js
function createMinion(operation) {
  return function(data) {
    const buffers = data["buffers"];
    const meta = data["meta"];
    const imageOps = data["imageOps"];
    const width = data["width"];
    const height = data["height"];
    const numBuffers = buffers.length;
    const numBytes = buffers[0].byteLength;
    if (imageOps) {
      const images = new Array(numBuffers);
      for (let b = 0; b < numBuffers; ++b) {
        images[b] = new ImageData(new Uint8ClampedArray(buffers[b]), width, height);
      }
      const output2 = operation(images, meta).data;
      return output2.buffer;
    }
    const output = new Uint8ClampedArray(numBytes);
    const arrays = new Array(numBuffers);
    const pixels = new Array(numBuffers);
    for (let b = 0; b < numBuffers; ++b) {
      arrays[b] = new Uint8ClampedArray(buffers[b]);
      pixels[b] = [0, 0, 0, 0];
    }
    for (let i = 0; i < numBytes; i += 4) {
      for (let j = 0; j < numBuffers; ++j) {
        const array = arrays[j];
        pixels[j][0] = array[i];
        pixels[j][1] = array[i + 1];
        pixels[j][2] = array[i + 2];
        pixels[j][3] = array[i + 3];
      }
      const pixel = operation(pixels, meta);
      output[i] = pixel[0];
      output[i + 1] = pixel[1];
      output[i + 2] = pixel[2];
      output[i + 3] = pixel[3];
    }
    return output.buffer;
  };
}
function createWorker(config, onMessage) {
  const lib = Object.keys(config.lib || {}).map(function(name) {
    return "const " + name + " = " + config.lib[name].toString() + ";";
  });
  const lines = lib.concat(["const __minion__ = (" + createMinion.toString() + ")(", config.operation.toString(), ");", 'self.addEventListener("message", function(event) {', "  const buffer = __minion__(event.data);", "  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);", "});"]);
  const worker = new Worker(typeof Blob === "undefined" ? "data:text/javascript;base64," + Buffer.from(lines.join("\n"), "binary").toString("base64") : URL.createObjectURL(new Blob(lines, {
    type: "text/javascript"
  })));
  worker.addEventListener("message", onMessage);
  return worker;
}
function createFauxWorker(config, onMessage) {
  const minion = createMinion(config.operation);
  let terminated = false;
  return {
    postMessage: function(data) {
      setTimeout(function() {
        if (terminated) {
          return;
        }
        onMessage({
          data: {
            buffer: minion(data),
            meta: data["meta"]
          }
        });
      }, 0);
    },
    terminate: function() {
      terminated = true;
    }
  };
}
var Processor = class extends Disposable_default {
  /**
   * @param {ProcessorOptions} config Configuration.
   */
  constructor(config) {
    super();
    this.imageOps_ = !!config.imageOps;
    let threads;
    if (config.threads === 0) {
      threads = 0;
    } else if (this.imageOps_) {
      threads = 1;
    } else {
      threads = config.threads || 1;
    }
    const workers = new Array(threads);
    if (threads) {
      for (let i = 0; i < threads; ++i) {
        workers[i] = createWorker(config, this.onWorkerMessage_.bind(this, i));
      }
    } else {
      workers[0] = createFauxWorker(config, this.onWorkerMessage_.bind(this, 0));
    }
    this.workers_ = workers;
    this.queue_ = [];
    this.maxQueueLength_ = config.queue || Infinity;
    this.running_ = 0;
    this.dataLookup_ = {};
    this.job_ = null;
  }
  /**
   * Run operation on input data.
   * @param {Array<ImageData>} inputs Array of image data.
   * @param {Object} meta A user data object.  This is passed to all operations
   *     and must be serializable.
   * @param {function(Error, ImageData, Object): void} callback Called when work
   *     completes.  The first argument is any error.  The second is the ImageData
   *     generated by operations.  The third is the user data object.
   */
  process(inputs, meta, callback) {
    this.enqueue_({
      inputs,
      meta,
      callback
    });
    this.dispatch_();
  }
  /**
   * Add a job to the queue.
   * @param {Job} job The job.
   */
  enqueue_(job) {
    this.queue_.push(job);
    while (this.queue_.length > this.maxQueueLength_) {
      this.queue_.shift().callback(null, null);
    }
  }
  /**
   * Dispatch a job.
   */
  dispatch_() {
    if (this.running_ || this.queue_.length === 0) {
      return;
    }
    const job = this.queue_.shift();
    this.job_ = job;
    const width = job.inputs[0].width;
    const height = job.inputs[0].height;
    const buffers = job.inputs.map(function(input) {
      return input.data.buffer;
    });
    const threads = this.workers_.length;
    this.running_ = threads;
    if (threads === 1) {
      this.workers_[0].postMessage({
        buffers,
        meta: job.meta,
        imageOps: this.imageOps_,
        width,
        height
      }, buffers);
      return;
    }
    const length = job.inputs[0].data.length;
    const segmentLength = 4 * Math.ceil(length / 4 / threads);
    for (let i = 0; i < threads; ++i) {
      const offset = i * segmentLength;
      const slices = [];
      for (let j = 0, jj = buffers.length; j < jj; ++j) {
        slices.push(buffers[j].slice(offset, offset + segmentLength));
      }
      this.workers_[i].postMessage({
        buffers: slices,
        meta: job.meta,
        imageOps: this.imageOps_,
        width,
        height
      }, slices);
    }
  }
  /**
   * Handle messages from the worker.
   * @param {number} index The worker index.
   * @param {MessageEvent} event The message event.
   */
  onWorkerMessage_(index, event) {
    if (this.disposed) {
      return;
    }
    this.dataLookup_[index] = event.data;
    --this.running_;
    if (this.running_ === 0) {
      this.resolveJob_();
    }
  }
  /**
   * Resolve a job.  If there are no more worker threads, the processor callback
   * will be called.
   */
  resolveJob_() {
    const job = this.job_;
    const threads = this.workers_.length;
    let data, meta;
    if (threads === 1) {
      data = new Uint8ClampedArray(this.dataLookup_[0]["buffer"]);
      meta = this.dataLookup_[0]["meta"];
    } else {
      const length = job.inputs[0].data.length;
      data = new Uint8ClampedArray(length);
      meta = new Array(threads);
      const segmentLength = 4 * Math.ceil(length / 4 / threads);
      for (let i = 0; i < threads; ++i) {
        const buffer3 = this.dataLookup_[i]["buffer"];
        const offset = i * segmentLength;
        data.set(new Uint8ClampedArray(buffer3), offset);
        meta[i] = this.dataLookup_[i]["meta"];
      }
    }
    this.job_ = null;
    this.dataLookup_ = {};
    job.callback(null, new ImageData(data, job.inputs[0].width, job.inputs[0].height), meta);
    this.dispatch_();
  }
  /**
   * Terminate all workers associated with the processor.
   * @override
   */
  disposeInternal() {
    for (let i = 0; i < this.workers_.length; ++i) {
      this.workers_[i].terminate();
    }
    this.workers_.length = 0;
  }
};
var RasterEventType = {
  /**
   * Triggered before operations are run.  Listeners will receive an event object with
   * a `data` property that can be used to make data available to operations.
   * @event module:ol/source/Raster.RasterSourceEvent#beforeoperations
   * @api
   */
  BEFOREOPERATIONS: "beforeoperations",
  /**
   * Triggered after operations are run.  Listeners will receive an event object with
   * a `data` property.  If more than one thread is used, `data` will be an array of
   * objects.  If a single thread is used, `data` will be a single object.
   * @event module:ol/source/Raster.RasterSourceEvent#afteroperations
   * @api
   */
  AFTEROPERATIONS: "afteroperations"
};
var RasterSourceEvent = class extends Event_default {
  /**
   * @param {string} type Type.
   * @param {import("../Map.js").FrameState} frameState The frame state.
   * @param {Object|Array<Object>} data An object made available to operations.  For "afteroperations" evenets
   * this will be an array of objects if more than one thread is used.
   */
  constructor(type, frameState, data) {
    super(type);
    this.extent = frameState.extent;
    this.resolution = frameState.viewState.resolution / frameState.pixelRatio;
    this.data = data;
  }
};
var RasterSource = class extends Image_default3 {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    super({
      projection: null
    });
    this.on;
    this.once;
    this.un;
    this.processor_ = null;
    this.operationType_ = options.operationType !== void 0 ? options.operationType : "pixel";
    this.threads_ = options.threads !== void 0 ? options.threads : 1;
    this.layers_ = createLayers(options.sources);
    const changed = this.changed.bind(this);
    for (let i = 0, ii = this.layers_.length; i < ii; ++i) {
      this.layers_[i].addEventListener(EventType_default.CHANGE, changed);
    }
    this.useResolutions_ = options.resolutions !== null;
    this.tileQueue_ = new TileQueue_default(function() {
      return 1;
    }, this.processSources_.bind(this));
    this.requestedFrameState_;
    this.renderedImageCanvas_ = null;
    this.renderedRevision_;
    this.frameState_ = {
      animate: false,
      coordinateToPixelTransform: create(),
      declutter: null,
      extent: null,
      index: 0,
      layerIndex: 0,
      layerStatesArray: getLayerStatesArray(this.layers_),
      pixelRatio: 1,
      pixelToCoordinateTransform: create(),
      postRenderFunctions: [],
      size: [0, 0],
      tileQueue: this.tileQueue_,
      time: Date.now(),
      usedTiles: {},
      viewState: (
        /** @type {import("../View.js").State} */
        {
          rotation: 0
        }
      ),
      viewHints: [],
      wantedTiles: {},
      mapId: getUid(this),
      renderTargets: {}
    };
    this.setAttributions(function(frameState) {
      const attributions = [];
      for (let i = 0, iMax = options.sources.length; i < iMax; ++i) {
        const sourceOrLayer = options.sources[i];
        const source = sourceOrLayer instanceof Source_default ? sourceOrLayer : sourceOrLayer.getSource();
        if (!source) {
          continue;
        }
        const sourceAttributions = source.getAttributions()?.(frameState);
        if (typeof sourceAttributions === "string") {
          attributions.push(sourceAttributions);
        } else if (sourceAttributions !== void 0) {
          attributions.push(...sourceAttributions);
        }
      }
      return attributions;
    });
    if (options.operation !== void 0) {
      this.setOperation(options.operation, options.lib);
    }
  }
  /**
   * Set the operation.
   * @param {Operation} operation New operation.
   * @param {Object} [lib] Functions that will be available to operations run
   *     in a worker.
   * @api
   */
  setOperation(operation, lib) {
    if (this.processor_) {
      this.processor_.dispose();
    }
    this.processor_ = new Processor({
      operation,
      imageOps: this.operationType_ === "image",
      queue: 1,
      lib,
      threads: this.threads_
    });
    this.changed();
  }
  /**
   * Update the stored frame state.
   * @param {import("../extent.js").Extent} extent The view extent (in map units).
   * @param {number} resolution The view resolution.
   * @param {import("../proj/Projection.js").default} projection The view projection.
   * @return {import("../Map.js").FrameState} The updated frame state.
   * @private
   */
  updateFrameState_(extent, resolution, projection) {
    const frameState = (
      /** @type {import("../Map.js").FrameState} */
      Object.assign({}, this.frameState_)
    );
    frameState.viewState = /** @type {import("../View.js").State} */
    Object.assign({}, frameState.viewState);
    const center = getCenter(extent);
    frameState.size[0] = Math.ceil(getWidth(extent) / resolution);
    frameState.size[1] = Math.ceil(getHeight(extent) / resolution);
    frameState.extent = [center[0] - frameState.size[0] * resolution / 2, center[1] - frameState.size[1] * resolution / 2, center[0] + frameState.size[0] * resolution / 2, center[1] + frameState.size[1] * resolution / 2];
    frameState.time = Date.now();
    const viewState = frameState.viewState;
    viewState.center = center;
    viewState.projection = projection;
    viewState.resolution = resolution;
    return frameState;
  }
  /**
   * Determine if all sources are ready.
   * @return {boolean} All sources are ready.
   * @private
   */
  allSourcesReady_() {
    let ready = true;
    let source;
    for (let i = 0, ii = this.layers_.length; i < ii; ++i) {
      source = this.layers_[i].getSource();
      if (!source || source.getState() !== "ready") {
        ready = false;
        break;
      }
    }
    return ready;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../ImageCanvas.js").default} Single image.
   * @override
   */
  getImage(extent, resolution, pixelRatio, projection) {
    if (!this.allSourcesReady_()) {
      return null;
    }
    this.tileQueue_.loadMoreTiles(16, 16);
    resolution = this.findNearestResolution(resolution);
    const frameState = this.updateFrameState_(extent, resolution, projection);
    this.requestedFrameState_ = frameState;
    if (this.renderedImageCanvas_) {
      const renderedResolution = this.renderedImageCanvas_.getResolution();
      const renderedExtent = this.renderedImageCanvas_.getExtent();
      if (resolution !== renderedResolution || !equals(frameState.extent, renderedExtent)) {
        this.renderedImageCanvas_ = null;
      }
    }
    if (!this.renderedImageCanvas_ || this.getRevision() !== this.renderedRevision_) {
      this.processSources_();
    }
    if (frameState.animate) {
      requestAnimationFrame(this.changed.bind(this));
    }
    return this.renderedImageCanvas_;
  }
  /**
   * Start processing source data.
   * @private
   */
  processSources_() {
    const frameState = this.requestedFrameState_;
    const len = this.layers_.length;
    const imageDatas = new Array(len);
    for (let i = 0; i < len; ++i) {
      frameState.layerIndex = i;
      frameState.renderTargets = {};
      const imageData = getImageData(this.layers_[i], frameState);
      if (imageData) {
        imageDatas[i] = imageData;
      } else {
        return;
      }
    }
    const data = {};
    this.dispatchEvent(new RasterSourceEvent(RasterEventType.BEFOREOPERATIONS, frameState, data));
    this.processor_.process(imageDatas, data, this.onWorkerComplete_.bind(this, frameState));
  }
  /**
   * Called when pixel processing is complete.
   * @param {import("../Map.js").FrameState} frameState The frame state.
   * @param {Error} err Any error during processing.
   * @param {ImageData} output The output image data.
   * @param {Object|Array<Object>} data The user data (or an array if more than one thread).
   * @private
   */
  onWorkerComplete_(frameState, err, output, data) {
    if (err || !output) {
      return;
    }
    const extent = frameState.extent;
    const resolution = frameState.viewState.resolution;
    if (resolution !== this.requestedFrameState_.viewState.resolution || !equals(extent, this.requestedFrameState_.extent)) {
      return;
    }
    let context;
    if (this.renderedImageCanvas_) {
      context = this.renderedImageCanvas_.getImage().getContext("2d");
    } else {
      const width = Math.round(getWidth(extent) / resolution);
      const height = Math.round(getHeight(extent) / resolution);
      context = createCanvasContext2D(width, height);
      this.renderedImageCanvas_ = new ImageCanvas_default(extent, resolution, 1, context.canvas);
    }
    context.putImageData(output, 0, 0);
    if (frameState.animate) {
      requestAnimationFrame(this.changed.bind(this));
    } else {
      this.changed();
    }
    this.renderedRevision_ = this.getRevision();
    this.dispatchEvent(new RasterSourceEvent(RasterEventType.AFTEROPERATIONS, frameState, data));
  }
  /**
   * @param {import("../proj/Projection").default} [projection] Projection.
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions(projection) {
    if (!this.useResolutions_) {
      return null;
    }
    let resolutions = super.getResolutions();
    if (!resolutions) {
      for (let i = 0, ii = this.layers_.length; i < ii; ++i) {
        const source = this.layers_[i].getSource();
        resolutions = source.getResolutions(projection);
        if (resolutions) {
          break;
        }
      }
    }
    return resolutions;
  }
  /**
   * @override
   */
  disposeInternal() {
    if (this.processor_) {
      this.processor_.dispose();
    }
    super.disposeInternal();
  }
};
RasterSource.prototype.dispose;
var sharedContext = null;
function getImageData(layer, frameState) {
  const renderer = layer.getRenderer();
  if (!renderer) {
    throw new Error("Unsupported layer type: " + layer);
  }
  if (!renderer.prepareFrame(frameState)) {
    return null;
  }
  const width = frameState.size[0];
  const height = frameState.size[1];
  if (width === 0 || height === 0) {
    return null;
  }
  const container = renderer.renderFrame(frameState, null);
  let element;
  if (container instanceof HTMLCanvasElement) {
    element = container;
  } else {
    if (container) {
      element = container.firstElementChild;
    }
    if (!(element instanceof HTMLCanvasElement)) {
      throw new Error("Unsupported rendered element: " + element);
    }
    if (element.width === width && element.height === height) {
      const context = element.getContext("2d");
      return context.getImageData(0, 0, width, height);
    }
  }
  if (!sharedContext) {
    sharedContext = createCanvasContext2D(width, height, void 0, {
      willReadFrequently: true
    });
  } else {
    const canvas = sharedContext.canvas;
    if (canvas.width !== width || canvas.height !== height) {
      sharedContext = createCanvasContext2D(width, height, void 0, {
        willReadFrequently: true
      });
    } else {
      sharedContext.clearRect(0, 0, width, height);
    }
  }
  sharedContext.drawImage(element, 0, 0, width, height);
  return sharedContext.getImageData(0, 0, width, height);
}
function getLayerStatesArray(layers) {
  return layers.map(function(layer) {
    return layer.getLayerState();
  });
}
function createLayers(sources) {
  const len = sources.length;
  const layers = new Array(len);
  for (let i = 0; i < len; ++i) {
    layers[i] = createLayer(sources[i]);
  }
  return layers;
}
function createLayer(layerOrSource) {
  let layer;
  if (layerOrSource instanceof Source_default) {
    if (layerOrSource instanceof Tile_default4) {
      layer = new Tile_default3({
        source: layerOrSource
      });
    } else if (layerOrSource instanceof Image_default3) {
      layer = new Image_default4({
        source: layerOrSource
      });
    }
  } else {
    layer = layerOrSource;
  }
  return layer;
}
var Raster_default = RasterSource;

// node_modules/ol/source/StadiaMaps.js
var STADIA_ATTRIBUTION = '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>';
var OMT_ATTRIBUTION = '&copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>';
var STAMEN_ATTRIBUTION = '&copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a>';
var LayerConfig = {
  "stamen_terrain": {
    extension: "png"
  },
  "stamen_terrain_background": {
    extension: "png"
  },
  "stamen_terrain_labels": {
    extension: "png"
  },
  "stamen_terrain_lines": {
    extension: "png"
  },
  "stamen_toner_background": {
    extension: "png"
  },
  "stamen_toner": {
    extension: "png"
  },
  "stamen_toner_labels": {
    extension: "png"
  },
  "stamen_toner_lines": {
    extension: "png"
  },
  "stamen_toner_lite": {
    extension: "png"
  },
  "stamen_watercolor": {
    extension: "jpg"
  },
  "alidade_smooth": {
    extension: "png"
  },
  "alidade_smooth_dark": {
    extension: "png"
  },
  "alidade_satellite": {
    extension: "png"
  },
  "outdoors": {
    extension: "png"
  },
  "osm_bright": {
    extension: "png"
  }
};
var ProviderConfig = {
  "stamen_terrain": {
    minZoom: 0,
    maxZoom: 18,
    retina: true
  },
  "stamen_toner": {
    minZoom: 0,
    maxZoom: 20,
    retina: true
  },
  "stamen_watercolor": {
    minZoom: 1,
    maxZoom: 18,
    retina: false
  }
};
var StadiaMaps = class extends XYZ_default {
  /**
   * @param {Options} options StadiaMaps options.
   */
  constructor(options) {
    const i = options.layer.indexOf("-");
    const provider = i == -1 ? options.layer : options.layer.slice(0, i);
    const providerConfig = ProviderConfig[provider] || {
      "minZoom": 0,
      "maxZoom": 20,
      "retina": true
    };
    const layerConfig = LayerConfig[options.layer];
    const query = options.apiKey ? "?api_key=" + options.apiKey : "";
    const retina = providerConfig.retina && options.retina ? "@2x" : "";
    const url = options.url !== void 0 ? options.url : "https://tiles.stadiamaps.com/tiles/" + options.layer + "/{z}/{x}/{y}" + retina + "." + layerConfig.extension + query;
    const attributions = [STADIA_ATTRIBUTION, OMT_ATTRIBUTION, ATTRIBUTION];
    if (options.layer.startsWith("stamen_")) {
      attributions.splice(1, 0, STAMEN_ATTRIBUTION);
    }
    super({
      attributions,
      cacheSize: options.cacheSize,
      crossOrigin: "anonymous",
      interpolate: options.interpolate,
      maxZoom: options.maxZoom !== void 0 ? options.maxZoom : providerConfig.maxZoom,
      minZoom: options.minZoom !== void 0 ? options.minZoom : providerConfig.minZoom,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      transition: options.transition,
      url,
      tilePixelRatio: retina ? 2 : 1,
      wrapX: options.wrapX,
      zDirection: options.zDirection
    });
  }
};
var StadiaMaps_default = StadiaMaps;

// node_modules/ol/source/TileArcGISRest.js
var TileArcGISRest = class extends TileImage_default {
  /**
   * @param {Options} [options] Tile ArcGIS Rest options.
   */
  constructor(options) {
    options = options ? options : {};
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.params_ = Object.assign({}, options.params);
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.tmpExtent_ = createEmpty();
    this.setKey(this.getKeyForParams_());
  }
  /**
   * @private
   * @return {string} The key for the current params.
   */
  getKeyForParams_() {
    let i = 0;
    const res = [];
    for (const key in this.params_) {
      res[i++] = key + "-" + this.params_[key];
    }
    return res.join("/");
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../size.js").Size} tileSize Tile size.
   * @param {import("../extent.js").Extent} tileExtent Tile extent.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {Object} params Params.
   * @return {string|undefined} Request URL.
   * @private
   */
  getRequestUrl_(tileCoord, tileSize, tileExtent, pixelRatio, projection, params) {
    const urls = this.urls;
    if (!urls) {
      return void 0;
    }
    let url;
    if (urls.length == 1) {
      url = urls[0];
    } else {
      const index = modulo(hash(tileCoord), urls.length);
      url = urls[index];
    }
    return getRequestUrl(url, tileExtent, (this.tileGrid || this.getTileGridForProjection(projection)).getResolution(tileCoord[0]), pixelRatio, projection, params);
  }
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   * @override
   */
  getTilePixelRatio(pixelRatio) {
    return this.hidpi_ ? pixelRatio : 1;
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.setKey(this.getKeyForParams_());
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord The tile coordinate
   * @param {number} pixelRatio The pixel ratio
   * @param {import("../proj/Projection.js").default} projection The projection
   * @return {string|undefined} The tile URL
   * @override
   */
  tileUrlFunction(tileCoord, pixelRatio, projection) {
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(projection);
    }
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return void 0;
    }
    if (pixelRatio != 1 && !this.hidpi_) {
      pixelRatio = 1;
    }
    const tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
    let tileSize = toSize(tileGrid.getTileSize(tileCoord[0]), this.tmpSize);
    if (pixelRatio != 1) {
      tileSize = scale2(tileSize, pixelRatio, this.tmpSize);
    }
    const baseParams = {
      "F": "image",
      "FORMAT": "PNG32",
      "TRANSPARENT": true
    };
    Object.assign(baseParams, this.params_);
    return this.getRequestUrl_(tileCoord, tileSize, tileExtent, pixelRatio, projection, baseParams);
  }
};
var TileArcGISRest_default = TileArcGISRest;

// node_modules/ol/source/TileDebug.js
var TileDebug = class extends ImageTile_default2 {
  /**
   * @param {Options} [options] Debug tile options.
   */
  constructor(options) {
    options = options || {};
    const template = options.template || "z:{z} x:{x} y:{y}";
    const source = options.source;
    super({
      transition: 0,
      wrapX: options.wrapX !== void 0 ? options.wrapX : source !== void 0 ? source.getWrapX() : void 0
    });
    const setReady = () => {
      this.projection = options.projection !== void 0 ? get(options.projection) : source !== void 0 ? source.getProjection() : this.projection;
      this.tileGrid = options.tileGrid !== void 0 ? options.tileGrid : source !== void 0 ? source.getTileGrid() : this.tileGrid;
      this.zDirection = options.zDirection !== void 0 ? options.zDirection : source !== void 0 ? source.zDirection : this.zDirection;
      if (source instanceof DataTile_default3) {
        this.transformMatrix = source.transformMatrix?.slice() || null;
      }
      const tileGrid = this.tileGrid;
      if (tileGrid) {
        this.setTileSizes(tileGrid.getResolutions().map((r, i) => toSize(tileGrid.getTileSize(i)).map((s) => Math.max(Math.floor(s), 1))));
      }
      this.setLoader((z, x, y, loaderOptions) => {
        const text = renderXYZTemplate(template, z, x, y, loaderOptions.maxY);
        const [width, height] = this.getTileSize(z);
        const context = createCanvasContext2D(width, height);
        context.strokeStyle = "grey";
        context.strokeRect(0.5, 0.5, width + 0.5, height + 0.5);
        context.fillStyle = "grey";
        context.strokeStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "24px sans-serif";
        context.lineWidth = 4;
        context.strokeText(text, width / 2, height / 2, width);
        context.fillText(text, width / 2, height / 2, width);
        return context.canvas;
      });
      this.setState("ready");
    };
    if (source === void 0 || source.getState() === "ready") {
      setReady();
    } else {
      const handler2 = () => {
        if (source.getState() === "ready") {
          source.removeEventListener(EventType_default.CHANGE, handler2);
          setReady();
        }
      };
      source.addEventListener(EventType_default.CHANGE, handler2);
    }
  }
};
var TileDebug_default = TileDebug;

// node_modules/ol/source/TileJSON.js
var TileJSON = class extends TileImage_default {
  /**
   * @param {Options} options TileJSON options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: get("EPSG:3857"),
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      state: "loading",
      tileLoadFunction: options.tileLoadFunction,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.tileJSON_ = null;
    this.tileSize_ = options.tileSize;
    if (options.url) {
      if (options.jsonp) {
        jsonp(options.url, this.handleTileJSONResponse.bind(this), this.handleTileJSONError.bind(this));
      } else {
        const client = new XMLHttpRequest();
        client.addEventListener("load", this.onXHRLoad_.bind(this));
        client.addEventListener("error", this.onXHRError_.bind(this));
        client.open("GET", options.url);
        client.send();
      }
    } else if (options.tileJSON) {
      this.handleTileJSONResponse(options.tileJSON);
    } else {
      throw new Error("Either `url` or `tileJSON` options must be provided");
    }
  }
  /**
   * @private
   * @param {Event} event The load event.
   */
  onXHRLoad_(event) {
    const client = (
      /** @type {XMLHttpRequest} */
      event.target
    );
    if (!client.status || client.status >= 200 && client.status < 300) {
      let response;
      try {
        response = /** @type {Config} */
        JSON.parse(client.responseText);
      } catch {
        this.handleTileJSONError();
        return;
      }
      this.handleTileJSONResponse(response);
    } else {
      this.handleTileJSONError();
    }
  }
  /**
   * @private
   * @param {Event} event The error event.
   */
  onXHRError_(event) {
    this.handleTileJSONError();
  }
  /**
   * @return {Config} The tilejson object.
   * @api
   */
  getTileJSON() {
    return this.tileJSON_;
  }
  /**
   * @protected
   * @param {Config} tileJSON Tile JSON.
   */
  handleTileJSONResponse(tileJSON) {
    const epsg4326Projection = get("EPSG:4326");
    const sourceProjection = this.getProjection();
    let extent;
    if (tileJSON["bounds"] !== void 0) {
      const transform2 = getTransformFromProjections(epsg4326Projection, sourceProjection);
      extent = applyTransform(tileJSON["bounds"], transform2);
    }
    const gridExtent = extentFromProjection(sourceProjection);
    const minZoom = tileJSON["minzoom"] || 0;
    const maxZoom2 = tileJSON["maxzoom"] || 22;
    const tileGrid = createXYZ({
      extent: gridExtent,
      maxZoom: maxZoom2,
      minZoom,
      tileSize: this.tileSize_
    });
    this.tileGrid = tileGrid;
    this.tileUrlFunction = createFromTemplates(tileJSON["tiles"], tileGrid);
    if (tileJSON["attribution"] && !this.getAttributions()) {
      const attributionExtent = extent !== void 0 ? extent : gridExtent;
      this.setAttributions(function(frameState) {
        if (intersects(attributionExtent, frameState.extent)) {
          return [tileJSON["attribution"]];
        }
        return null;
      });
    }
    this.tileJSON_ = tileJSON;
    this.setState("ready");
  }
  /**
   * @protected
   */
  handleTileJSONError() {
    this.setState("error");
  }
};
var TileJSON_default = TileJSON;

// node_modules/ol/source/TileWMS.js
var TileWMS = class extends TileImage_default {
  /**
   * @param {Options} [options] Tile WMS options.
   */
  constructor(options) {
    options = options ? options : (
      /** @type {Options} */
      {}
    );
    const params = Object.assign({}, options.params);
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: options.tileClass,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
    this.params_ = params;
    this.v13_ = true;
    this.serverType_ = options.serverType;
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.tmpExtent_ = createEmpty();
    this.updateV13_();
    this.setKey(this.getKeyForParams_());
  }
  /**
   * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
   * projection. Return `undefined` if the GetFeatureInfo URL cannot be
   * constructed.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
   *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
   *     in the `LAYERS` parameter will be used. `VERSION` should not be
   *     specified here.
   * @return {string|undefined} GetFeatureInfo URL.
   * @api
   */
  getFeatureInfoUrl(coordinate, resolution, projection, params) {
    const projectionObj = get(projection);
    const sourceProjectionObj = this.getProjection() || projectionObj;
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(sourceProjectionObj);
    }
    const sourceProjCoord = transform(coordinate, projectionObj, sourceProjectionObj);
    const sourceResolution = calculateSourceResolution(sourceProjectionObj, projectionObj, coordinate, resolution);
    const z = tileGrid.getZForResolution(sourceResolution, this.zDirection);
    const tileResolution = tileGrid.getResolution(z);
    const tileCoord = tileGrid.getTileCoordForCoordAndZ(sourceProjCoord, z);
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return void 0;
    }
    let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
    const gutter = this.gutter_;
    if (gutter !== 0) {
      tileExtent = buffer(tileExtent, tileResolution * gutter, tileExtent);
    }
    const baseParams = {
      "QUERY_LAYERS": this.params_["LAYERS"]
    };
    Object.assign(baseParams, getRequestParams(this.params_, "GetFeatureInfo"), params);
    const x = Math.floor((sourceProjCoord[0] - tileExtent[0]) / tileResolution);
    const y = Math.floor((tileExtent[3] - sourceProjCoord[1]) / tileResolution);
    baseParams[this.v13_ ? "I" : "X"] = x;
    baseParams[this.v13_ ? "J" : "Y"] = y;
    return this.getRequestUrl_(tileCoord, tileExtent, 1, sourceProjectionObj || projectionObj, baseParams);
  }
  /**
   * Return the GetLegendGraphic URL, optionally optimized for the passed
   * resolution and possibly including any passed specific parameters. Returns
   * `undefined` if the GetLegendGraphic URL cannot be constructed.
   *
   * @param {number} [resolution] Resolution. If set to undefined, `SCALE`
   *     will not be calculated and included in URL.
   * @param {Object} [params] GetLegendGraphic params. If `LAYER` is set, the
   *     request is generated for this wms layer, else it will try to use the
   *     configured wms layer. Default `FORMAT` is `image/png`.
   *     `VERSION` should not be specified here.
   * @return {string|undefined} GetLegendGraphic URL.
   * @api
   */
  getLegendUrl(resolution, params) {
    if (this.urls[0] === void 0) {
      return void 0;
    }
    const baseParams = {
      "SERVICE": "WMS",
      "VERSION": DEFAULT_VERSION,
      "REQUEST": "GetLegendGraphic",
      "FORMAT": "image/png"
    };
    if (params === void 0 || params["LAYER"] === void 0) {
      const layers = this.params_.LAYERS;
      const isSingleLayer = !Array.isArray(layers) || layers.length === 1;
      if (!isSingleLayer) {
        return void 0;
      }
      baseParams["LAYER"] = layers;
    }
    if (resolution !== void 0) {
      const mpu = this.getProjection() ? this.getProjection().getMetersPerUnit() : 1;
      const pixelSize = 28e-5;
      baseParams["SCALE"] = resolution * mpu / pixelSize;
    }
    Object.assign(baseParams, params);
    return appendParams(
      /** @type {string} */
      this.urls[0],
      baseParams
    );
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} tileExtent Tile extent.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {Object} params Params.
   * @return {string|undefined} Request URL.
   * @private
   */
  getRequestUrl_(tileCoord, tileExtent, pixelRatio, projection, params) {
    const urls = this.urls;
    if (!urls) {
      return void 0;
    }
    let url;
    if (urls.length == 1) {
      url = urls[0];
    } else {
      const index = modulo(hash(tileCoord), urls.length);
      url = urls[index];
    }
    return getImageSrc(tileExtent, (this.tileGrid || this.getTileGridForProjection(projection)).getResolution(tileCoord[0]), pixelRatio, projection, url, params, this.serverType_);
  }
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   * @override
   */
  getTilePixelRatio(pixelRatio) {
    return !this.hidpi_ || this.serverType_ === void 0 ? 1 : pixelRatio;
  }
  /**
   * @private
   * @return {string} The key for the current params.
   */
  getKeyForParams_() {
    let i = 0;
    const res = [];
    for (const key in this.params_) {
      res[i++] = key + "-" + this.params_[key];
    }
    return res.join("/");
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.updateV13_();
    this.setKey(this.getKeyForParams_());
  }
  /**
   * @private
   */
  updateV13_() {
    const version = this.params_["VERSION"] || DEFAULT_VERSION;
    this.v13_ = compareVersions(version, "1.3") >= 0;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord The tile coordinate
   * @param {number} pixelRatio The pixel ratio
   * @param {import("../proj/Projection.js").default} projection The projection
   * @return {string|undefined} The tile URL
   * @override
   */
  tileUrlFunction(tileCoord, pixelRatio, projection) {
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(projection);
    }
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return void 0;
    }
    if (pixelRatio != 1 && (!this.hidpi_ || this.serverType_ === void 0)) {
      pixelRatio = 1;
    }
    const tileResolution = tileGrid.getResolution(tileCoord[0]);
    let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
    const gutter = this.gutter_;
    if (gutter !== 0) {
      tileExtent = buffer(tileExtent, tileResolution * gutter, tileExtent);
    }
    const baseParams = Object.assign({}, getRequestParams(this.params_, "GetMap"));
    return this.getRequestUrl_(tileCoord, tileExtent, pixelRatio, projection, baseParams);
  }
};
var TileWMS_default = TileWMS;

// node_modules/ol/source/UTFGrid.js
var CustomTile2 = class extends Tile_default {
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {import("../extent.js").Extent} extent Extent of the tile.
   * @param {boolean} preemptive Load the tile when visible (before it's needed).
   * @param {boolean} jsonp Load the tile as a script.
   */
  constructor(tileCoord, state, src, extent, preemptive, jsonp2) {
    super(tileCoord, state);
    this.src_ = src;
    this.extent_ = extent;
    this.preemptive_ = preemptive;
    this.grid_ = null;
    this.keys_ = null;
    this.data_ = null;
    this.jsonp_ = jsonp2;
  }
  /**
   * Get the image element for this tile.
   * @return {HTMLImageElement} Image.
   */
  getImage() {
    return null;
  }
  /**
   * Synchronously returns data at given coordinate (if available).
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {*} The data.
   */
  getData(coordinate) {
    if (!this.grid_ || !this.keys_) {
      return null;
    }
    const xRelative = (coordinate[0] - this.extent_[0]) / (this.extent_[2] - this.extent_[0]);
    const yRelative = (coordinate[1] - this.extent_[1]) / (this.extent_[3] - this.extent_[1]);
    const row = this.grid_[Math.floor((1 - yRelative) * this.grid_.length)];
    if (typeof row !== "string") {
      return null;
    }
    let code = row.charCodeAt(Math.floor(xRelative * row.length));
    if (code >= 93) {
      code--;
    }
    if (code >= 35) {
      code--;
    }
    code -= 32;
    let data = null;
    if (code in this.keys_) {
      const id = this.keys_[code];
      if (this.data_ && id in this.data_) {
        data = this.data_[id];
      } else {
        data = id;
      }
    }
    return data;
  }
  /**
   * Calls the callback (synchronously by default) with the available data
   * for given coordinate (or `null` if not yet loaded).
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {function(*): void} callback Callback.
   * @param {boolean} [request] If `true` the callback is always async.
   *                               The tile data is requested if not yet loaded.
   */
  forDataAtCoordinate(coordinate, callback, request) {
    if (this.state == TileState_default.EMPTY && request === true) {
      this.state = TileState_default.IDLE;
      listenOnce(this, EventType_default.CHANGE, (e) => {
        callback(this.getData(coordinate));
      });
      this.loadInternal_();
    } else {
      if (request === true) {
        setTimeout(() => {
          callback(this.getData(coordinate));
        }, 0);
      } else {
        callback(this.getData(coordinate));
      }
    }
  }
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @override
   */
  getKey() {
    return this.src_;
  }
  /**
   * @private
   */
  handleError_() {
    this.state = TileState_default.ERROR;
    this.changed();
  }
  /**
   * @param {!UTFGridJSON} json UTFGrid data.
   * @private
   */
  handleLoad_(json) {
    this.grid_ = json["grid"];
    this.keys_ = json["keys"];
    this.data_ = json["data"];
    this.state = TileState_default.LOADED;
    this.changed();
  }
  /**
   * @private
   */
  loadInternal_() {
    if (this.state == TileState_default.IDLE) {
      this.state = TileState_default.LOADING;
      if (this.jsonp_) {
        jsonp(this.src_, this.handleLoad_.bind(this), this.handleError_.bind(this));
      } else {
        const client = new XMLHttpRequest();
        client.addEventListener("load", this.onXHRLoad_.bind(this));
        client.addEventListener("error", this.onXHRError_.bind(this));
        client.open("GET", this.src_);
        client.send();
      }
    }
  }
  /**
   * @private
   * @param {Event} event The load event.
   */
  onXHRLoad_(event) {
    const client = (
      /** @type {XMLHttpRequest} */
      event.target
    );
    if (!client.status || client.status >= 200 && client.status < 300) {
      let response;
      try {
        response = /** @type {!UTFGridJSON} */
        JSON.parse(client.responseText);
      } catch {
        this.handleError_();
        return;
      }
      this.handleLoad_(response);
    } else {
      this.handleError_();
    }
  }
  /**
   * @private
   * @param {Event} event The error event.
   */
  onXHRError_(event) {
    this.handleError_();
  }
  /**
   * @override
   */
  load() {
    if (this.preemptive_) {
      this.loadInternal_();
    } else {
      this.setState(TileState_default.EMPTY);
    }
  }
};
var UTFGrid = class extends Tile_default4 {
  /**
   * @param {Options} options Source options.
   */
  constructor(options) {
    super({
      projection: get("EPSG:3857"),
      state: "loading",
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      zDirection: options.zDirection
    });
    this.preemptive_ = options.preemptive !== void 0 ? options.preemptive : true;
    this.tileUrlFunction_ = nullTileUrlFunction;
    this.template_ = void 0;
    this.jsonp_ = options.jsonp || false;
    if (options.url) {
      if (this.jsonp_) {
        jsonp(options.url, this.handleTileJSONResponse.bind(this), this.handleTileJSONError.bind(this));
      } else {
        const client = new XMLHttpRequest();
        client.addEventListener("load", this.onXHRLoad_.bind(this));
        client.addEventListener("error", this.onXHRError_.bind(this));
        client.open("GET", options.url);
        client.send();
      }
    } else if (options.tileJSON) {
      this.handleTileJSONResponse(options.tileJSON);
    } else {
      throw new Error("Either `url` or `tileJSON` options must be provided");
    }
  }
  /**
   * @private
   * @param {Event} event The load event.
   */
  onXHRLoad_(event) {
    const client = (
      /** @type {XMLHttpRequest} */
      event.target
    );
    if (!client.status || client.status >= 200 && client.status < 300) {
      let response;
      try {
        response = /** @type {import("./TileJSON.js").Config} */
        JSON.parse(client.responseText);
      } catch {
        this.handleTileJSONError();
        return;
      }
      this.handleTileJSONResponse(response);
    } else {
      this.handleTileJSONError();
    }
  }
  /**
   * @private
   * @param {Event} event The error event.
   */
  onXHRError_(event) {
    this.handleTileJSONError();
  }
  /**
   * Return the template from TileJSON.
   * @return {string|undefined} The template from TileJSON.
   * @api
   */
  getTemplate() {
    return this.template_;
  }
  /**
   * Calls the callback (synchronously by default) with the available data
   * for given coordinate and resolution (or `null` if not yet loaded or
   * in case of an error).
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {function(*): void} callback Callback.
   * @param {boolean} [request] If `true` the callback is always async.
   *                               The tile data is requested if not yet loaded.
   * @api
   */
  forDataAtCoordinateAndResolution(coordinate, resolution, callback, request) {
    if (this.tileGrid) {
      const z = this.tileGrid.getZForResolution(resolution, this.zDirection);
      const tileCoord = this.tileGrid.getTileCoordForCoordAndZ(coordinate, z);
      const tile = (
        /** @type {!CustomTile} */
        this.getTile(tileCoord[0], tileCoord[1], tileCoord[2], 1, this.getProjection())
      );
      tile.forDataAtCoordinate(coordinate, callback, request);
    } else {
      if (request === true) {
        setTimeout(function() {
          callback(null);
        }, 0);
      } else {
        callback(null);
      }
    }
  }
  /**
   * @protected
   */
  handleTileJSONError() {
    this.setState("error");
  }
  /**
   * TODO: very similar to ol/source/TileJSON#handleTileJSONResponse
   * @protected
   * @param {import("./TileJSON.js").Config} tileJSON Tile JSON.
   */
  handleTileJSONResponse(tileJSON) {
    const epsg4326Projection = get("EPSG:4326");
    const sourceProjection = this.getProjection();
    let extent;
    if (tileJSON["bounds"] !== void 0) {
      const transform2 = getTransformFromProjections(epsg4326Projection, sourceProjection);
      extent = applyTransform(tileJSON["bounds"], transform2);
    }
    const gridExtent = extentFromProjection(sourceProjection);
    const minZoom = tileJSON["minzoom"] || 0;
    const maxZoom2 = tileJSON["maxzoom"] || 22;
    const tileGrid = createXYZ({
      extent: gridExtent,
      maxZoom: maxZoom2,
      minZoom
    });
    this.tileGrid = tileGrid;
    this.template_ = tileJSON["template"];
    const grids = tileJSON["grids"];
    if (!grids) {
      this.setState("error");
      return;
    }
    this.tileUrlFunction_ = createFromTemplates(grids, tileGrid);
    if (tileJSON["attribution"]) {
      const attributionExtent = extent !== void 0 ? extent : gridExtent;
      this.setAttributions(function(frameState) {
        if (intersects(attributionExtent, frameState.extent)) {
          return [tileJSON["attribution"]];
        }
        return null;
      });
    }
    this.setState("ready");
  }
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!CustomTile} Tile.
   * @override
   */
  getTile(z, x, y, pixelRatio, projection) {
    const tileCoord = [z, x, y];
    const urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    const tileUrl2 = this.tileUrlFunction_(urlTileCoord, pixelRatio, projection);
    const tile = new CustomTile2(tileCoord, tileUrl2 !== void 0 ? TileState_default.IDLE : TileState_default.EMPTY, tileUrl2 !== void 0 ? tileUrl2 : "", this.tileGrid.getTileCoordExtent(tileCoord), this.preemptive_, this.jsonp_);
    return tile;
  }
};
var UTFGrid_default = UTFGrid;

// node_modules/ol/source/WMTS.js
var WMTS = class extends TileImage_default {
  /**
   * @param {Options} options WMTS options.
   */
  constructor(options) {
    const requestEncoding = options.requestEncoding !== void 0 ? options.requestEncoding : "KVP";
    const tileGrid = options.tileGrid;
    let urls = options.urls;
    if (urls === void 0 && options.url !== void 0) {
      urls = expandUrl(options.url);
    }
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: options.tileClass,
      tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : false,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.version_ = options.version !== void 0 ? options.version : "1.0.0";
    this.format_ = options.format !== void 0 ? options.format : "image/jpeg";
    this.dimensions_ = options.dimensions !== void 0 ? options.dimensions : {};
    this.layer_ = options.layer;
    this.matrixSet_ = options.matrixSet;
    this.style_ = options.style;
    this.requestEncoding_ = requestEncoding;
    this.setKey(this.getKeyForDimensions_());
    if (urls && urls.length > 0) {
      this.tileUrlFunction = createFromTileUrlFunctions(urls.map(this.createFromWMTSTemplate.bind(this)));
    }
  }
  /**
   * Set the URLs to use for requests.
   * URLs may contain OGC conform URL Template Variables: {TileMatrix}, {TileRow}, {TileCol}.
   * @param {Array<string>} urls URLs.
   * @override
   */
  setUrls(urls) {
    this.urls = urls;
    const key = urls.join("\n");
    this.setTileUrlFunction(createFromTileUrlFunctions(urls.map(this.createFromWMTSTemplate.bind(this))), key);
  }
  /**
   * Get the dimensions, i.e. those passed to the constructor through the
   * "dimensions" option, and possibly updated using the updateDimensions
   * method.
   * @return {!Object} Dimensions.
   * @api
   */
  getDimensions() {
    return this.dimensions_;
  }
  /**
   * Return the image format of the WMTS source.
   * @return {string} Format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * Return the layer of the WMTS source.
   * @return {string} Layer.
   * @api
   */
  getLayer() {
    return this.layer_;
  }
  /**
   * Return the matrix set of the WMTS source.
   * @return {string} MatrixSet.
   * @api
   */
  getMatrixSet() {
    return this.matrixSet_;
  }
  /**
   * Return the request encoding, either "KVP" or "REST".
   * @return {RequestEncoding} Request encoding.
   * @api
   */
  getRequestEncoding() {
    return this.requestEncoding_;
  }
  /**
   * Return the style of the WMTS source.
   * @return {string} Style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Return the version of the WMTS source.
   * @return {string} Version.
   * @api
   */
  getVersion() {
    return this.version_;
  }
  /**
   * @private
   * @return {string} The key for the current dimensions.
   */
  getKeyForDimensions_() {
    const res = this.urls ? this.urls.slice(0) : [];
    for (const key in this.dimensions_) {
      res.push(key + "-" + this.dimensions_[key]);
    }
    return res.join("/");
  }
  /**
   * Update the dimensions.
   * @param {Object} dimensions Dimensions.
   * @api
   */
  updateDimensions(dimensions) {
    Object.assign(this.dimensions_, dimensions);
    this.setKey(this.getKeyForDimensions_());
  }
  /**
   * @param {string} template Template.
   * @return {import("../Tile.js").UrlFunction} Tile URL function.
   */
  createFromWMTSTemplate(template) {
    const requestEncoding = this.requestEncoding_;
    const context = {
      "layer": this.layer_,
      "style": this.style_,
      "tilematrixset": this.matrixSet_
    };
    if (requestEncoding == "KVP") {
      Object.assign(context, {
        "Service": "WMTS",
        "Request": "GetTile",
        "Version": this.version_,
        "Format": this.format_
      });
    }
    template = requestEncoding == "KVP" ? appendParams(template, context) : template.replace(/\{(\w+?)\}/g, function(m, p) {
      return p.toLowerCase() in context ? context[p.toLowerCase()] : m;
    });
    const tileGrid = (
      /** @type {import("../tilegrid/WMTS.js").default} */
      this.tileGrid
    );
    const dimensions = this.dimensions_;
    return (
      /**
       * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
       * @param {number} pixelRatio Pixel ratio.
       * @param {import("../proj/Projection.js").default} projection Projection.
       * @return {string|undefined} Tile URL.
       */
      function(tileCoord, pixelRatio, projection) {
        if (!tileCoord) {
          return void 0;
        }
        const localContext = {
          "TileMatrix": tileGrid.getMatrixId(tileCoord[0]),
          "TileCol": tileCoord[1],
          "TileRow": tileCoord[2]
        };
        Object.assign(localContext, dimensions);
        let url = template;
        if (requestEncoding == "KVP") {
          url = appendParams(url, localContext);
        } else {
          url = url.replace(/\{(\w+?)\}/g, function(m, p) {
            return encodeURIComponent(localContext[p]);
          });
        }
        return url;
      }
    );
  }
};
var WMTS_default2 = WMTS;

// node_modules/ol/source.js
function sourcesFromTileGrid(tileGrid, factory) {
  const sourceCache = new LRUCache_default(32);
  const tileGridExtent = tileGrid.getExtent();
  return function(extent, resolution) {
    sourceCache.expireCache();
    if (tileGridExtent) {
      extent = getIntersection(tileGridExtent, extent);
    }
    const z = tileGrid.getZForResolution(resolution);
    const wantedSources = [];
    tileGrid.forEachTileCoord(extent, z, (tileCoord) => {
      const key = tileCoord.toString();
      if (!sourceCache.containsKey(key)) {
        const source = factory(tileCoord);
        sourceCache.set(key, source);
      }
      wantedSources.push(sourceCache.get(key));
    });
    return wantedSources;
  };
}
export {
  BingMaps_default as BingMaps,
  CartoDB_default as CartoDB,
  Cluster_default as Cluster,
  DataTile_default3 as DataTile,
  GeoTIFF_default as GeoTIFF,
  Google_default as Google,
  IIIF_default as IIIF,
  Image_default3 as Image,
  ImageArcGISRest_default as ImageArcGISRest,
  ImageCanvas_default2 as ImageCanvas,
  ImageMapGuide_default as ImageMapGuide,
  ImageStatic_default as ImageStatic,
  ImageTile_default2 as ImageTile,
  ImageWMS_default as ImageWMS,
  OGCMapTile_default as OGCMapTile,
  OGCVectorTile_default as OGCVectorTile,
  OSM_default as OSM,
  Raster_default as Raster,
  Source_default as Source,
  StadiaMaps_default as StadiaMaps,
  Tile_default4 as Tile,
  TileArcGISRest_default as TileArcGISRest,
  TileDebug_default as TileDebug,
  TileImage_default as TileImage,
  TileJSON_default as TileJSON,
  TileWMS_default as TileWMS,
  UTFGrid_default as UTFGrid,
  UrlTile_default as UrlTile,
  Vector_default as Vector,
  VectorTile_default2 as VectorTile,
  WMTS_default2 as WMTS,
  XYZ_default as XYZ,
  Zoomify_default as Zoomify,
  createLoader as createArcGISRestLoader,
  createLoader2 as createMapGuideLoader,
  createLoader3 as createStaticLoader,
  createLoader4 as createWMSLoader,
  sourcesFromTileGrid
};
//# sourceMappingURL=ol_source.js.map
