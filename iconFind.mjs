import fs from 'fs';
import path from 'path';

export default function iconFind(iconName) {

  const extensions = ['.png', '.ico', '.svg', '.xpm'];

  const baseDirs = [
    '/usr/share/icons',
    '/usr/share/pixmaps',
    '/usr/share/view-base',
    '/usr/share/themes',
    '/usr/share/images',
    '/usr/share/xml/',
    '/usr/share/mime/',
    '/usr/share/Thunar/',
    '/usr/share/xfce4/',
    '/usr/share/plymouth/',
    '/usr/share/gnome-shell/',
    '/usr/share/color/',
    '/usr/share/colord',
    '/usr/share/xfce4',
    '/etc/xdg',
    '/etc/xfce4',
    `/home/${process.env.USER}/.local/bin/.icons`
  ];

  for (const baseDir of baseDirs) {
    const iconPath = fromDirectory(baseDir, iconName, extensions);
    if (iconPath) {
      const ext = path.extname(iconPath);
      let iconData;
      if (ext === '.svg') {
        iconData = fs.readFileSync(iconPath, 'utf8');
        return `data:image/svg+xml;base64,${Buffer.from(iconData).toString('base64')}`;
      } else {
        iconData = fs.readFileSync(iconPath);
        return `data:image/${ext.slice(1)};base64,${iconData.toString('base64')}`;
      }
    }
  }

  return null;
  
}

export function fromDirectory (dir, iconName, extensions) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      const result = fromDirectory(fullPath, iconName, extensions);
      if (result) return result;
    } else if (
      stat.isFile() &&
      extensions.includes(path.extname(fullPath)) &&
      path.basename(fullPath, path.extname(fullPath)) === iconName
    ) {
      return fullPath;
    }
  }

  return null;
}