import * as useragent from 'express-useragent'
import * as http from 'http'

export function isDesktop(req: http.IncomingMessage) {
  let userAgent: string | string[] = ''
  if (req) {
    // Server
    userAgent = req.headers['user-agent']
  } else if (typeof window !== 'undefined') {
    // Browser
    userAgent = window.navigator.userAgent
  }
  return useragent.parse(userAgent).isDesktop
}
