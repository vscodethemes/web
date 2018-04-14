// import { LanguageOptions, Theme } from '@vscodethemes/types'
// import { css } from 'emotion'
// import * as React from 'react'
// import theme, { em } from '../../theme'
// import { isPlaceholder } from '../../utils/generatePlaceholderThemes'
// import ActivityBar from './ActivityBar'
// import Code from './Code'
// import Editor from './Editor'
// import Loading from './Loading'
// import StatusBar from './StatusBar'
// import Tab from './Tab'
// import TabBar from './TabBar'
// import TabContent from './TabContent'
// import TopBar from './TopBar'

// interface ThemePreviewProps {
//   theme: Theme
//   language?: LanguageOptions
//   onLanguage: (language: LanguageOptions) => void
// }

// const ThemePreview: React.SFC<ThemePreviewProps> = ({
//   theme: themeProps,
//   language = 'javascript',
//   onLanguage,
// }) => {
//   return (
//     <div className={classes.container}>
//       <TopBar name={themeProps.name} type={themeProps.type} />
//       <Editor colors={themeProps.colors}>
//         <ActivityBar colors={themeProps.colors} />
//         <TabBar colors={themeProps.colors}>
//           <Tab
//             colors={themeProps.colors}
//             active={language === 'javascript'}
//             onClick={() => onLanguage('javascript')}
//           >
//             main.js
//           </Tab>
//           <Tab
//             colors={themeProps.colors}
//             active={language === 'css'}
//             onClick={() => onLanguage('css')}
//           >
//             styles.css
//           </Tab>
//           <Tab
//             colors={themeProps.colors}
//             active={language === 'html'}
//             onClick={() => onLanguage('html')}
//           >
//             index.html
//           </Tab>
//         </TabBar>
//         <TabContent>
//           {!isPlaceholder(themeProps) && (
//             <Code colors={themeProps.colors} language={language} />
//           )}
//         </TabContent>
//         {isPlaceholder(themeProps) && <Loading />}
//       </Editor>
//       <StatusBar
//         colors={themeProps.colors}
//         repository={themeProps.repository}
//         repositoryOwner={themeProps.repositoryOwner}
//         extensionName={themeProps.extensionName}
//         publisherName={themeProps.publisherName}
//       />
//     </div>
//   )
// }

// const classes = {
//   container: css({
//     position: 'relative',
//     marginBottom: em(theme.gutters.lg),
//     boxShadow: theme.shadows.md,
//   }),
// }

// export default ThemePreview
