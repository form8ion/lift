export default function ({results, enhancers = {}, projectRoot}) {
  Object.values(enhancers).forEach(enhancer => {
    if (enhancer.test({projectRoot})) {
      enhancer.lift({results});
    }
  });
}
