const noopMediaQueryList = {
  matches: false,
  addEventListener() {},
  removeEventListener() {},
};

export const queryMedia = query => {
  if (typeof window.matchMedia === "function") {
    return window.matchMedia(query);
  }

  return noopMediaQueryList;
};