import {
  __async
} from "./chunk-4MWRP73S.js";

// node_modules/geotiff/dist-module/predictor.js
function decodeRowAcc(row, stride) {
  let length = row.length - stride;
  let offset = 0;
  do {
    for (let i = stride; i > 0; i--) {
      row[offset + stride] += row[offset];
      offset++;
    }
    length -= stride;
  } while (length > 0);
}
function decodeRowFloatingPoint(row, stride, bytesPerSample) {
  let index = 0;
  let count = row.length;
  const wc = count / bytesPerSample;
  while (count > stride) {
    for (let i = stride; i > 0; --i) {
      row[index + stride] += row[index];
      ++index;
    }
    count -= stride;
  }
  const copy = row.slice();
  for (let i = 0; i < wc; ++i) {
    for (let b = 0; b < bytesPerSample; ++b) {
      row[bytesPerSample * i + b] = copy[(bytesPerSample - b - 1) * wc + i];
    }
  }
}
function applyPredictor(block, predictor, width, height, bitsPerSample, planarConfiguration) {
  if (!predictor || predictor === 1) {
    return block;
  }
  for (let i = 0; i < bitsPerSample.length; ++i) {
    if (bitsPerSample[i] % 8 !== 0) {
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    }
    if (bitsPerSample[i] !== bitsPerSample[0]) {
      throw new Error("When decoding with predictor, all samples must have the same size.");
    }
  }
  const bytesPerSample = bitsPerSample[0] / 8;
  const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;
  for (let i = 0; i < height; ++i) {
    if (i * stride * width * bytesPerSample >= block.byteLength) {
      break;
    }
    let row;
    if (predictor === 2) {
      switch (bitsPerSample[0]) {
        case 8:
          row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
          break;
        case 16:
          row = new Uint16Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 2);
          break;
        case 32:
          row = new Uint32Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample / 4);
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
      }
      decodeRowAcc(row, stride, bytesPerSample);
    } else if (predictor === 3) {
      row = new Uint8Array(block, i * stride * width * bytesPerSample, stride * width * bytesPerSample);
      decodeRowFloatingPoint(row, stride, bytesPerSample);
    }
  }
  return block;
}

// node_modules/geotiff/dist-module/compression/basedecoder.js
var BaseDecoder = class {
  decode(fileDirectory, buffer) {
    return __async(this, null, function* () {
      const decoded = yield this.decodeBlock(buffer);
      const predictor = fileDirectory.Predictor || 1;
      if (predictor !== 1) {
        const isTiled = !fileDirectory.StripOffsets;
        const tileWidth = isTiled ? fileDirectory.TileWidth : fileDirectory.ImageWidth;
        const tileHeight = isTiled ? fileDirectory.TileLength : fileDirectory.RowsPerStrip || fileDirectory.ImageLength;
        return applyPredictor(decoded, predictor, tileWidth, tileHeight, fileDirectory.BitsPerSample, fileDirectory.PlanarConfiguration);
      }
      return decoded;
    });
  }
};

export {
  BaseDecoder
};
//# sourceMappingURL=chunk-JSOACJM5.js.map
