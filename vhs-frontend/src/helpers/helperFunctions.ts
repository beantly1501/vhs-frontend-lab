export function getBase64(file: File) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result;
    };
}

export function getSearchUrl(search: string | undefined, isAvailable: boolean) {
  let searchUrl = "/api/vhs";
  if (search && isAvailable) {
    searchUrl += `?title=${search}&isAvailable=${isAvailable}`
  }
  if (search) {
    searchUrl += `?title=${search}`;
  }
  else {
    searchUrl += `?isAvailable=${isAvailable}`;
  }

  return searchUrl;
}