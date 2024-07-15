let MarkdownModule = window.createMarkdownModule
  ? window.createMarkdownModule()
  : {};

export function markdownParse(str = '', { supportFont = true } = {}) {
  const {
    allocate,
    intArrayFromString,
    ALLOC_NORMAL,
    _mdtojson2,
    _mdtojson3,
    Pointer_stringify,
    _free,
  } = MarkdownModule;

  let jsonVal = {};
  let jsonStr = '';
  if (!str || str.length > 6200) {
    return jsonVal;
  }
  try {
    let ptr = allocate(intArrayFromString(str), 'i8', ALLOC_NORMAL);
    let unit8Aray = new Uint8Array(95000);
    let outPtr = allocate(unit8Aray, 'i8', ALLOC_NORMAL);
    if (supportFont) {
      _mdtojson3(ptr, outPtr);
    } else {
      _mdtojson2(ptr, outPtr);
    }
    jsonStr = Pointer_stringify(outPtr);
    if (jsonStr) {
      jsonVal = JSON.parse(jsonStr);
    }
    _free(ptr);
    _free(outPtr);
    ptr = null;
    outPtr = null;
    unit8Aray = null;
  } catch (e) {
    MarkdownModule = window.createMarkdownModule
      ? window.createMarkdownModule()
      : {};
    console.error('markdownParse', e);
  }

  return jsonVal;
}
