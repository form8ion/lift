export default function ({results, enhancers = {}, projectRoot}) {
  Object.values(enhancers).forEach(async enhancer => {
    if (await enhancer.test({projectRoot})) {
      enhancer.lift({results, projectRoot});
    }
  });
}
