export default function ({results, enhancers = {}, projectRoot}) {
  return Promise.all(Object.values(enhancers).map(async enhancer => {
    if (await enhancer.test({projectRoot})) {
      return enhancer.lift({results, projectRoot});
    }

    return Promise.resolve();
  }));
}
