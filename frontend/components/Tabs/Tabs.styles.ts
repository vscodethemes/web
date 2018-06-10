import { css } from 'emotion'
import { em } from '../../theme'

export default {
  tabs: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    maxWidth: em(210),
  }),
}
