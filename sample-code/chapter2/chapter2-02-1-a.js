function first(firstParameter, successCallback, failureCallback) {
  try {
    result = hoge(firstParameter);
    successCallback(result);
  } catch (error) {
    failureCallback(error);
  }
}

function second(secondParameter, successCallback, failureCallback) {
  try {
    result = hoge(secondParameter);
    successCallback(result);
  } catch (error) {
    failureCallback(error);
  }
}

function third(thirdParameter, successCallback, failureCallback) {
  try {
    result = hoge(thirdParameter);
    successCallback(result);
  } catch (error) {
    failureCallback(error);
  }
}