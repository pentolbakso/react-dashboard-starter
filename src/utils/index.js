export const createError = e => {
  if (e.response && e.response.data) {
    let errorString = "";
    let obj = e.response.data;
    if (obj.errors) {
      for (let field in obj.errors) {
        let msg = obj.errors[field];
        errorString = errorString + field + " " + msg + " | ";
      }
    } else if (obj.message) {
      errorString = obj.message + " | ";
    }
    return {
      status: obj.status,
      message: errorString
    };
  } else {
    return {
      status: 0,
      message: e.message
    };
  }
};
