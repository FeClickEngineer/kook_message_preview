let globalModule = null;

export function markdownParse(str = '') {
  if (!globalModule) {
    globalModule = window.createMarkdownModule();
  }
  const {
    allocate,
    intArrayFromString,
    ALLOC_NORMAL,
    _mdtojson2,
    _getjsonsize,
    Pointer_stringify,
    _free,
  } = globalModule;
  let jsonVal = {};
  let jsonStr = '';
  if (!str) {
    return jsonVal;
  }
  try {
    let ptr = allocate(intArrayFromString(str), 'i8', ALLOC_NORMAL);
    let bytesize = _getjsonsize(ptr) + 100;
    let unit8Aray = new Uint8Array(bytesize);
    let outPtr = allocate(unit8Aray, 'i8', ALLOC_NORMAL);
    _mdtojson2(ptr, outPtr);
    jsonStr = Pointer_stringify(outPtr);
    if (jsonStr) {
      jsonVal = JSON.parse(jsonStr);
    }
    _free(ptr);
    _free(outPtr);
  } catch (e) {
    console.error('markdownParse', e);
  }
  console.log(`[markdownparse] ${str} =>`, jsonVal);
  return jsonVal;
}
