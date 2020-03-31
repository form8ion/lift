import fs from 'fs';
import badgeInjectorPlugin from '@form8ion/remark-inject-badges';
import remark from '../thirdparty-wrappers/remark';

export default function ({projectRoot, results}) {
  const pathToReadme = `${projectRoot}/README.md`;

  return new Promise((resolve, reject) => {
    remark()
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
