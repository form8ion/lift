import liftDocumentation from './documentation';

suite('documentation', () => {
  test('that the readme is updated', async () => {
    await liftDocumentation();
  });
});
