import getConfig from 'next/config'
import Head from 'next/head'
import * as React from 'react'

const { publicRuntimeConfig } = getConfig()
const { host } = publicRuntimeConfig

interface MetaProps {
  title?: string
  description?: string
  path?: string
}

const Meta: React.SFC<MetaProps> = ({
  title = 'VSCodeThemes — Preview Visual Studio Code Themes.',
  description = 'Preview VSCode themes from the Visual Studio Marketplace. Browse by trending, dark, or light themes.',
  path = '',
}) => (
  <Head>
    <title>{title}</title>
    <meta key="description" name="description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@_jschr" />
    <meta name="twitter:url" content={`${host}/${path}`} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${host}/static/screenshot.png`} />
  </Head>
)

export default Meta
