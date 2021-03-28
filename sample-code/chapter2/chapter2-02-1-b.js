first('firstParameter', function (firstResult) {
  // first関数の成功時コールバック
  second(firstResult, function (secondResult) {
    // second関数の成功時コールバック
    third(secondResult, function (thirdResult) {
      // third関数の成功時コールバック
      console.log(thirdResult);
    }, function(thirdError) {
      // third関数の失敗時コールバック
      console.log(thirdError);
    });
  }, function(secondError) {
    // second関数の失敗時コールバック
    console.log(secondError);
  });
}, function(firstError) {
  // first関数の失敗時コールバック
  console.log(firstError);
});