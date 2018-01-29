import { css, cx } from 'emotion'
import * as React from 'react'
import theme, { em } from '../theme'

export type Icons =
  | 'download'
  | 'github'
  | 'search'
  | 'star'
  | 'vscodeDebug'
  | 'vscodeExplorer'
  | 'vscodeExtensions'
  | 'vscodeGit'
  | 'vscodeSearch'

interface IconProps {
  icon: Icons
  className?: string
  fill?: string
}

const Icon: React.SFC<IconProps> = ({ icon, className, fill }) => (
  <svg
    className={cx(classes.svg, className)}
    viewBox={icons[icon].viewBox}
    style={{ fill }}
  >
    <path d={icons[icon].path} />
  </svg>
)

const icons = {
  download: {
    viewBox: '0 0 24 24',
    path: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z',
  },
  github: {
    viewBox: '0 0 24 24',
    path:
      'M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z',
  },
  search: {
    viewBox: '0 0 24 24',
    path:
      'M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z',
  },
  star: {
    viewBox: '2 2 20 20',
    path:
      'M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z',
  },
  // https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/parts/debug/browser/media/debug-dark.svg
  vscodeDebug: {
    viewBox: '0 0 32 32',
    path:
      'M17 19.488v4.248c0 .462.09 1.264-.373 1.264H15v-1h1v-3.19l-.173-.18c-1.453 1.205-3.528 1.248-4.67.108C10 19.578 10.118 18 11.376 16H8v1H7v-1.627C7 14.91 7.802 15 8.264 15h4.105L17 19.488zM14 9h-1V8h1.955c.46 0 1.045.22 1.045.682v3.345l.736.875c.18-.973.89-1.71 1.914-1.71.143 0 .35.014.35.04V9h1v2.618c0 .117.265.382.382.382H23v1h-2.233c.027 0 .042.154.042.298 0 1.025-.74 1.753-1.712 1.932l.875.77H23.318c.462 0 .682.583.682 1.045V19h-1v-1h-2.52L14 11.698V9zM16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm10 12c0 2.397-.85 4.6-2.262 6.324L9.676 8.262C11.4 6.85 13.602 6 16 6c5.514 0 10 4.486 10 10zM6 16c0-2.398.85-4.6 2.262-6.324L22.324 23.74C20.6 25.15 18.397 26 16 26c-5.514 0-10-4.486-10-10z',
  },
  // https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/parts/files/electron-browser/media/files-dark.svg
  vscodeExplorer: {
    viewBox: '0 0 32 32',
    path:
      'M17.705 8h-8.705s-2 .078-2 2v15s0 2 2 2l11-.004c2 .004 2-1.996 2-1.996v-11.491l-4.295-5.509zm-1.705 2v5h4v10h-11v-15h7zm5.509-6h-8.493s-2.016.016-2.031 2h8.015v.454l3.931 4.546h1.069v12c2 0 2-1.995 2-1.995v-11.357l-4.491-5.648z',
  },
  // https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/parts/extensions/electron-browser/media/extensions-dark.svg
  vscodeExtensions: {
    // Modified viewBox to scale down icon.
    viewBox: '-10 0 80 80',
    path:
      'M12.9,47.1H30V60H0V0h25.7v12.9H12.9V47.1z M17.1,42.9h25.7V17.1H17.1V42.9z M30,0v12.9h8.6V8.6h12.9v12.9 h-4.3V30H60V0H30z M47.1,47.1H34.3V60H60V34.3H47.1V47.1z',
  },
  // https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/parts/scm/electron-browser/media/icon-dark.svg
  vscodeGit: {
    viewBox: '0 0 10 16',
    path:
      'M8,1 C6.89,1 6,1.89 6,3 C6,3.73 6.41,4.38 7,4.72 L7,6 L5,8 L3,6 L3,4.72 C3.59,4.38 4,3.74 4,3 C4,1.89 3.11,1 2,1 C0.89,1 0,1.89 0,3 C0,3.73 0.41,4.38 1,4.72 L1,6.5 L4,9.5 L4,11.28 C3.41,11.62 3,12.26 3,13 C3,14.11 3.89,15 5,15 C6.11,15 7,14.11 7,13 C7,12.27 6.59,11.62 6,11.28 L6,9.5 L9,6.5 L9,4.72 C9.59,4.38 10,3.74 10,3 C10,1.89 9.11,1 8,1 L8,1 Z M2,4.2 C1.34,4.2 0.8,3.65 0.8,3 C0.8,2.35 1.35,1.8 2,1.8 C2.65,1.8 3.2,2.35 3.2,3 C3.2,3.65 2.65,4.2 2,4.2 L2,4.2 Z M5,14.2 C4.34,14.2 3.8,13.65 3.8,13 C3.8,12.35 4.35,11.8 5,11.8 C5.65,11.8 6.2,12.35 6.2,13 C6.2,13.65 5.65,14.2 5,14.2 L5,14.2 Z M8,4.2 C7.34,4.2 6.8,3.65 6.8,3 C6.8,2.35 7.35,1.8 8,1.8 C8.65,1.8 9.2,2.35 9.2,3 C9.2,3.65 8.65,4.2 8,4.2 L8,4.2 Z',
  },
  // https://github.com/Microsoft/vscode/blob/master/src/vs/workbench/parts/search/electron-browser/media/search-dark.svg
  vscodeSearch: {
    viewBox: '0 0 32 32',
    path:
      'M19.23 4.095c-4.842 0-8.769 3.928-8.769 8.771 0 1.781.539 3.43 1.449 4.815 0 0-5.482 5.455-7.102 7.102-1.621 1.646 1.001 4.071 2.602 2.409 1.602-1.659 7.006-7.005 7.006-7.005 1.384.911 3.035 1.45 4.814 1.45 4.845 0 8.772-3.93 8.772-8.771.001-4.844-3.927-8.771-8.772-8.771zm0 15.035c-3.459 0-6.265-2.804-6.265-6.264 0-3.46 2.805-6.265 6.265-6.265 3.462 0 6.266 2.804 6.266 6.265 0 3.46-2.804 6.264-6.266 6.264z',
  },
}

export const classes = {
  svg: css({
    fill: theme.colors.text,
    height: em(theme.fontSizes.md * 1.5),
  }),
}

export default Icon
