import {Given} from 'cucumber';

Given('only general maintenance should be performed', async function () {
  this.chosenScaffolder = 'General Maintenance';
});
