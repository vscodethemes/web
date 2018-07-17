import Head from 'next/head'
import * as React from 'react'

interface MetaProps {
  title?: string
  description?: string
}

const Meta: React.SFC<MetaProps> = ({
  title = 'VSCodeThemes',
  description = 'Preview themes from the VSCode marketplace.',
}) => (
  <Head>
    <title>{title}</title>
    <meta key="description" name="description" content={description} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content="@_jschr" />
    <meta name="twitter:url" content="https://vscodethemes.com" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="/static/screenshot.png" />
  </Head>
)

export default Meta
