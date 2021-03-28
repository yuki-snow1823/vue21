first('firstParameter')
  .then(firstResult => second(firstResult))
  .then(secondResult => third(secondResult))
  .then(thirdResult => console.log(thirdResult))
  .catch(error => console.log(error));