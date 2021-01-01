import deepmerge from 'deepmerge';

export default async function ({results, enhancers = {}, projectRoot}) {
  return Object.values(enhancers)
    .reduce(async (acc, enhancer) => {
      if (await enhancer.test({projectRoot})) {
        const previousResults = await acc;

        return deepmerge(
          previousResults,
          await enhancer.lift({results: previousResults, projectRoot})
        );
      }

      return acc;
    }, results);
}
