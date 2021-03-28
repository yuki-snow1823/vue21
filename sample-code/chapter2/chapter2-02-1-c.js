function first(firstParameter) {
  return new Promise(function (successCallback, failureCallback) {
    try {
      result = hoge(firstParameter);
      successCallback(result);
    } catch (error) {
      failureCallback(error);
    }
  });
}

function second(secondParameter) {
  return new Promise(function (successCallback, failureCallback) {
    try {
      result = hoge(secondParameter);
      successCallback(result);
    } catch (error) {
      failureCallback(error);
    }
  });
}

function third(thirdParameter) {
  return new Promise(function (successCallback, failureCallback) {
    try {
      result = hoge(thirdParameter);
      successCallback(result);
    } catch (error) {
      failureCallback(error);
    }
  });
}