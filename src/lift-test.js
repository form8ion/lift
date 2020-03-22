import lift from './lift';

suite('lift', () => {
  test('that the chosen scaffolder is executed', async () => {
    await lift();
  });
});
