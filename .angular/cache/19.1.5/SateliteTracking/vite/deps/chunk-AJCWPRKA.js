import {
  TileState_default
} from "./chunk-PWOXHWUC.js";
import {
  listenImage
} from "./chunk-5CXUNJWW.js";
import {
  createCanvasContext2D
} from "./chunk-TALNCFXE.js";
import {
  easeIn
} from "./chunk-GVA6PU2J.js";
import {
  Target_default,
  abstract
} from "./chunk-4VZCFOSN.js";
import {
  EventType_default
} from "./chunk-ZD2NNC7F.js";

// node_modules/ol/Tile.js
var Tile = class extends Target_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {Options} [options] Tile options.
   */
  constructor(tileCoord, state, options) {
    super();
    options = options ? options : {};
    this.tileCoord = tileCoord;
    this.state = state;
    this.key = "";
    this.transition_ = options.transition === void 0 ? 250 : options.transition;
    this.transitionStarts_ = {};
    this.interpolate = !!options.interpolate;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(EventType_default.CHANGE);
  }
  /**
   * Called by the tile cache when the tile is removed from the cache due to expiry
   */
  release() {
    this.setState(TileState_default.EMPTY);
  }
  /**
   * @return {string} Key.
   */
  getKey() {
    return this.key + "/" + this.tileCoord;
  }
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */
  getTileCoord() {
    return this.tileCoord;
  }
  /**
   * @return {import("./TileState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {import("./TileState.js").default} state State.
   * @api
   */
  setState(state) {
    if (this.state === TileState_default.EMPTY) {
      return;
    }
    if (this.state !== TileState_default.ERROR && this.state > state) {
      throw new Error("Tile load sequence violation");
    }
    this.state = state;
    this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */
  load() {
    abstract();
  }
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */
  getAlpha(id, time) {
    if (!this.transition_) {
      return 1;
    }
    let start = this.transitionStarts_[id];
    if (!start) {
      start = time;
      this.transitionStarts_[id] = start;
    } else if (start === -1) {
      return 1;
    }
    const delta = time - start + 1e3 / 60;
    if (delta >= this.transition_) {
      return 1;
    }
    return easeIn(delta / this.transition_);
  }
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */
  inTransition(id) {
    if (!this.transition_) {
      return false;
    }
    return this.transitionStarts_[id] !== -1;
  }
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */
  endTransition(id) {
    if (this.transition_) {
      this.transitionStarts_[id] = -1;
    }
  }
  /**
   * @override
   */
  disposeInternal() {
    this.release();
    super.disposeInternal();
  }
};
var Tile_default = Tile;

// node_modules/ol/ImageTile.js
var ImageTile = class extends Tile_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Image source URI.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(tileCoord, state, src, crossOrigin, tileLoadFunction, options) {
    super(tileCoord, state, options);
    this.crossOrigin_ = crossOrigin;
    this.src_ = src;
    this.key = src;
    this.image_ = new Image();
    if (crossOrigin !== null) {
      this.image_.crossOrigin = crossOrigin;
    }
    this.unlisten_ = null;
    this.tileLoadFunction_ = tileLoadFunction;
  }
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Sets an HTML image element for this tile (may be a Canvas or preloaded Image).
   * @param {HTMLCanvasElement|HTMLImageElement} element Element.
   */
  setImage(element) {
    this.image_ = element;
    this.state = TileState_default.LOADED;
    this.unlistenImage_();
    this.changed();
  }
  /**
   * Tracks loading or read errors.
   *
   * @private
   */
  handleImageError_() {
    this.state = TileState_default.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  }
  /**
   * Tracks successful image load.
   *
   * @private
   */
  handleImageLoad_() {
    const image = (
      /** @type {HTMLImageElement} */
      this.image_
    );
    if (image.naturalWidth && image.naturalHeight) {
      this.state = TileState_default.LOADED;
    } else {
      this.state = TileState_default.EMPTY;
    }
    this.unlistenImage_();
    this.changed();
  }
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   *
   * To retry loading tiles on failed requests, use a custom `tileLoadFunction`
   * that checks for error status codes and reloads only when the status code is
   * 408, 429, 500, 502, 503 and 504, and only when not too many retries have been
   * made already:
   *
   * ```js
   * const retryCodes = [408, 429, 500, 502, 503, 504];
   * const retries = {};
   * source.setTileLoadFunction((tile, src) => {
   *   const image = tile.getImage();
   *   fetch(src)
   *     .then((response) => {
   *       if (retryCodes.includes(response.status)) {
   *         retries[src] = (retries[src] || 0) + 1;
   *         if (retries[src] <= 3) {
   *           setTimeout(() => tile.load(), retries[src] * 1000);
   *         }
   *         return Promise.reject();
   *       }
   *       return response.blob();
   *     })
   *     .then((blob) => {
   *       const imageUrl = URL.createObjectURL(blob);
   *       image.src = imageUrl;
   *       setTimeout(() => URL.revokeObjectURL(imageUrl), 5000);
   *     })
   *     .catch(() => tile.setState(3)); // error
   * });
   * ```
   * @api
   * @override
   */
  load() {
    if (this.state == TileState_default.ERROR) {
      this.state = TileState_default.IDLE;
      this.image_ = new Image();
      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }
    if (this.state == TileState_default.IDLE) {
      this.state = TileState_default.LOADING;
      this.changed();
      this.tileLoadFunction_(this, this.src_);
      this.unlisten_ = listenImage(this.image_, this.handleImageLoad_.bind(this), this.handleImageError_.bind(this));
    }
  }
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */
  unlistenImage_() {
    if (this.unlisten_) {
      this.unlisten_();
      this.unlisten_ = null;
    }
  }
  /**
   * @override
   */
  disposeInternal() {
    this.unlistenImage_();
    this.image_ = null;
    super.disposeInternal();
  }
};
function getBlankImage() {
  const ctx = createCanvasContext2D(1, 1);
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}
var ImageTile_default = ImageTile;

// node_modules/ol/TileRange.js
var TileRange = class {
  /**
   * @param {number} minX Minimum X.
   * @param {number} maxX Maximum X.
   * @param {number} minY Minimum Y.
   * @param {number} maxY Maximum Y.
   */
  constructor(minX, maxX, minY, maxY) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @return {boolean} Contains tile coordinate.
   */
  contains(tileCoord) {
    return this.containsXY(tileCoord[1], tileCoord[2]);
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Contains.
   */
  containsTileRange(tileRange) {
    return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
  }
  /**
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @return {boolean} Contains coordinate.
   */
  containsXY(x, y) {
    return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Equals.
   */
  equals(tileRange) {
    return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   */
  extend(tileRange) {
    if (tileRange.minX < this.minX) {
      this.minX = tileRange.minX;
    }
    if (tileRange.maxX > this.maxX) {
      this.maxX = tileRange.maxX;
    }
    if (tileRange.minY < this.minY) {
      this.minY = tileRange.minY;
    }
    if (tileRange.maxY > this.maxY) {
      this.maxY = tileRange.maxY;
    }
  }
  /**
   * @return {number} Height.
   */
  getHeight() {
    return this.maxY - this.minY + 1;
  }
  /**
   * @return {import("./size.js").Size} Size.
   */
  getSize() {
    return [this.getWidth(), this.getHeight()];
  }
  /**
   * @return {number} Width.
   */
  getWidth() {
    return this.maxX - this.minX + 1;
  }
  /**
   * @param {TileRange} tileRange Tile range.
   * @return {boolean} Intersects.
   */
  intersects(tileRange) {
    return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
  }
};
function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== void 0) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  }
  return new TileRange(minX, maxX, minY, maxY);
}
var TileRange_default = TileRange;

export {
  Tile_default,
  ImageTile_default,
  createOrUpdate,
  TileRange_default
};
//# sourceMappingURL=chunk-AJCWPRKA.js.map
