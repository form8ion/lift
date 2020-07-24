export default async function ({results, enhancers = {}, projectRoot}) {
  const enhancerResults = await Promise.all(Object.values(enhancers).map(async enhancer => {
    if (await enhancer.test({projectRoot})) {
      return enhancer.lift({results, projectRoot});
    }

    return Promise.resolve();
  }));

  return enhancerResults.reduce((acc, result) => {
    if (result && result.nextSteps) return {nextSteps: [...acc.nextSteps, ...result.nextSteps]};

    return acc;
  }, {nextSteps: []});
}
