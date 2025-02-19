import {
  Tile_default
} from "./chunk-AJCWPRKA.js";
import {
  TileState_default
} from "./chunk-PWOXHWUC.js";
import {
  ImageState_default,
  Image_default
} from "./chunk-5CXUNJWW.js";
import {
  createCanvasContext2D,
  releaseCanvas
} from "./chunk-TALNCFXE.js";
import {
  getUid
} from "./chunk-4VZCFOSN.js";

// node_modules/ol/ImageCanvas.js
var ImageCanvas = class extends Image_default {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {HTMLCanvasElement} canvas Canvas.
   * @param {Loader} [loader] Optional loader function to
   *     support asynchronous canvas drawing.
   */
  constructor(extent, resolution, pixelRatio, canvas, loader) {
    const state = loader !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
    super(extent, resolution, pixelRatio, state);
    this.loader_ = loader !== void 0 ? loader : null;
    this.canvas_ = canvas;
    this.error_ = null;
  }
  /**
   * Get any error associated with asynchronous rendering.
   * @return {?Error} Any error that occurred during rendering.
   */
  getError() {
    return this.error_;
  }
  /**
   * Handle async drawing complete.
   * @param {Error} [err] Any error during drawing.
   * @private
   */
  handleLoad_(err) {
    if (err) {
      this.error_ = err;
      this.state = ImageState_default.ERROR;
    } else {
      this.state = ImageState_default.LOADED;
    }
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
      this.loader_(this.handleLoad_.bind(this));
    }
  }
  /**
   * @return {HTMLCanvasElement} Canvas element.
   * @override
   */
  getImage() {
    return this.canvas_;
  }
};
var ImageCanvas_default = ImageCanvas;

// node_modules/ol/VectorRenderTile.js
var canvasPool = [];
var VectorRenderTile = class extends Tile_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
   * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function.
   * @param {function(VectorRenderTile):void} removeSourceTiles Function.
   */
  constructor(tileCoord, state, urlTileCoord, getSourceTiles, removeSourceTiles) {
    super(tileCoord, state, {
      transition: 0
    });
    this.context_ = null;
    this.executorGroups = {};
    this.loadingSourceTiles = 0;
    this.hitDetectionImageData = {};
    this.replayState_ = {};
    this.sourceTiles = [];
    this.errorTileKeys = {};
    this.wantedResolution;
    this.getSourceTiles = getSourceTiles.bind(void 0, this);
    this.removeSourceTiles_ = removeSourceTiles;
    this.wrappedTileCoord = urlTileCoord;
  }
  /**
   * @return {CanvasRenderingContext2D} The rendering context.
   */
  getContext() {
    if (!this.context_) {
      this.context_ = createCanvasContext2D(1, 1, canvasPool);
    }
    return this.context_;
  }
  /**
   * @return {boolean} Tile has a rendering context.
   */
  hasContext() {
    return !!this.context_;
  }
  /**
   * Get the Canvas for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage() {
    return this.hasContext() ? this.getContext().canvas : null;
  }
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {ReplayState} The replay state.
   */
  getReplayState(layer) {
    const key = getUid(layer);
    if (!(key in this.replayState_)) {
      this.replayState_[key] = {
        dirty: false,
        renderedRenderOrder: null,
        renderedResolution: NaN,
        renderedRevision: -1,
        renderedTileResolution: NaN,
        renderedTileRevision: -1,
        renderedTileZ: -1
      };
    }
    return this.replayState_[key];
  }
  /**
   * Load the tile.
   * @override
   */
  load() {
    this.getSourceTiles();
  }
  /**
   * Remove from the cache due to expiry
   * @override
   */
  release() {
    if (this.context_) {
      releaseCanvas(this.context_);
      canvasPool.push(this.context_.canvas);
      this.context_ = null;
    }
    this.removeSourceTiles_(this);
    this.sourceTiles.length = 0;
    super.release();
  }
};
var VectorRenderTile_default = VectorRenderTile;

// node_modules/ol/VectorTile.js
var VectorTile = class extends Tile_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Data source url.
   * @param {import("./format/Feature.js").default<FeatureType>} format Feature format.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(tileCoord, state, src, format, tileLoadFunction, options) {
    super(tileCoord, state, options);
    this.extent = null;
    this.format_ = format;
    this.features_ = null;
    this.loader_;
    this.projection = null;
    this.resolution;
    this.tileLoadFunction_ = tileLoadFunction;
    this.url_ = src;
    this.key = src;
  }
  /**
   * @return {string} Tile url.
   */
  getTileUrl() {
    return this.url_;
  }
  /**
   * Get the feature format assigned for reading this tile's features.
   * @return {import("./format/Feature.js").default<FeatureType>} Feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * Get the features for this tile. Geometries will be in the view projection.
   * @return {Array<FeatureType>} Features.
   * @api
   */
  getFeatures() {
    return this.features_;
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == TileState_default.IDLE) {
      this.setState(TileState_default.LOADING);
      this.tileLoadFunction_(this, this.url_);
      if (this.loader_) {
        this.loader_(this.extent, this.resolution, this.projection);
      }
    }
  }
  /**
   * Handler for successful tile load.
   * @param {Array<FeatureType>} features The loaded features.
   * @param {import("./proj/Projection.js").default} dataProjection Data projection.
   */
  onLoad(features, dataProjection) {
    this.setFeatures(features);
  }
  /**
   * Handler for tile load errors.
   */
  onError() {
    this.setState(TileState_default.ERROR);
  }
  /**
   * Function for use in a {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
   * Sets the features for the tile.
   * @param {Array<FeatureType>} features Features.
   * @api
   */
  setFeatures(features) {
    this.features_ = features;
    this.setState(TileState_default.LOADED);
  }
  /**
   * Set the feature loader for reading this tile's features.
   * @param {import("./featureloader.js").FeatureLoader<FeatureType>} loader Feature loader.
   * @api
   */
  setLoader(loader) {
    this.loader_ = loader;
  }
};
var VectorTile_default = VectorTile;

export {
  ImageCanvas_default,
  VectorRenderTile_default,
  VectorTile_default
};
//# sourceMappingURL=chunk-3GO465IU.js.map
