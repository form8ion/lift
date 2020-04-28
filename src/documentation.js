import fs from 'fs';
import {info} from '@travi/cli-messages';
import badgeInjectorPlugin from '@form8ion/remark-inject-badges';
import updateLegacyBadgeMarkers from '@form8ion/remark-update-legacy-badge-markers';
import remark from '../thirdparty-wrappers/remark';

export default function ({projectRoot, results}) {
  info('Lifting Documentation');

  const pathToReadme = `${projectRoot}/README.md`;

  return new Promise((resolve, reject) => {
    remark()
      .use(updateLegacyBadgeMarkers)
      .use(badgeInjectorPlugin, results.badges)
      .process(fs.readFileSync(pathToReadme, 'utf8'), (err, file) => {
        if (err) reject(err);
        else {
          fs.writeFileSync(pathToReadme, file);
          resolve();
        }
      });
  });
}
