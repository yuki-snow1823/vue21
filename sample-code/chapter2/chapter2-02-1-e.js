async function execute() {
  try {
    const firstResult = await first('firstParameter');
    const secondResult = await second(firstResult);
    const thirdResult = await third(secondResult);
    console.log(thirdResult);
  } catch(error) {
    console.log(error);
  }
}

execute();