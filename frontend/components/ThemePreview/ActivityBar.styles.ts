import { css } from 'emotion'

export const activityBarWidth = 8

export default {
  activityBar: css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${activityBarWidth}%`,
    height: '100%',
    paddingTop: '1%',
  }),

  icon: css({
    width: '100%',
    height: '6%',
    margin: '18% 0',
    opacity: 0.5,
  }),

  active: css({
    opacity: 1,
  }),
}
