export default function ({results, enhancers = {}}) {
  Object.values(enhancers).forEach(enhancer => {
    enhancer.lift({results});
  });
}
