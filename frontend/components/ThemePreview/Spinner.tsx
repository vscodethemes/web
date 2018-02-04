import { css, cx, keyframes } from 'emotion'
import * as React from 'react'
import theme, { em } from '../../theme'

// Modified from http://tobiasahlin.com/spinkit/.

const Spinner: React.SFC<{}> = () => (
  <div className={classes.container}>
    <div className={classes.cube} />
    <div className={cx(classes.cube, classes.cube2)} />
    <div className={cx(classes.cube, classes.cube4)} />
    <div className={cx(classes.cube, classes.cube3)} />
  </div>
)

const animations = {
  foldCubeAngle: keyframes({
    '0%, 10%': {
      transform: 'perspective(140px) rotateX(-180deg)',
      opacity: 0,
    },
    '25%, 75%': {
      transform: 'perspective(140px) rotateX(0deg)',
      opacity: 1,
    },
    '90%, 100%': {
      transform: 'perspective(140px) rotateY(180deg)',
      opacity: 0,
    },
  }),
}

const classes = {
  container: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10,
    width: 20,
    height: 20,
    transform: 'rotateZ(45deg)',
    opacity: 0.2,
  }),

  cube: css({
    float: 'left',
    width: '50%',
    height: '50%',
    position: 'relative',
    transform: 'scale(1.1)',
    ':before': {
      content: `' '`,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.colors.palette[0],
      animation: `${animations.foldCubeAngle} 2.4s infinite linear both`,
      transformOrigin: '100% 100%',
    },
  }),

  cube2: css({
    transform: ' scale(1.1) rotateZ(90deg)',
    ':before': {
      animationDelay: '0.3s',
      backgroundColor: theme.colors.palette[1],
    },
  }),

  cube3: css({
    transform: 'scale(1.1) rotateZ(180deg)',
    ':before': {
      animationDelay: '0.6s',
      backgroundColor: theme.colors.palette[2],
    },
  }),

  cube4: css({
    transform: 'scale(1.1) rotateZ(270deg)',
    ':before': {
      animationDelay: '0.9s',
      backgroundColor: theme.colors.palette[3],
    },
  }),
}

export default Spinner
