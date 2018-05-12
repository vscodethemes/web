import * as fetch from 'jest-fetch-mock'
import createServices from '../services/mock'
import createCFEvent from '../utils/createCFEvent'
import tokenize, { cacheAge } from './tokenize'

afterEach(() => fetch.resetMocks())

function mockThemeResponse(tokenColors: any[] = []) {
  return JSON.stringify({ tokenColors })
}

function hasCorsHeaders(response: any) {
  return (
    response.headers['Access-Control-Allow-Origin'] &&
    response.headers['Access-Control-Allow-Methods'] &&
    response.headers['Access-Control-Allow-Headers']
  )
}

function mockTokenizer(tokens: any[][] = []) {
  let lineIndex = 0
  return {
    line() {
      const lineTokens = tokens[lineIndex]
      lineIndex += 1
      return lineTokens
    },
  }
}

test('Should return tokenized html', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    lang: 'javascript',
    code: 'code\ncode\ncode',
  })

  // Tokens needs be have the same number of items
  // as the number of lines in event.code.
  const tokens: any[][] = [
    [
      {
        token: 'foo',
        style: {
          color: 'color',
          fontStyle: 'fontStyle',
          fontWeight: 'fontWeight',
          textDecoration: 'textDecoration',
        },
      },
    ],
    [{ token: ' ', style: {} }],
    [{ token: '<', style: {} }],
  ]

  // Mocks.
  fetch.mockResponseOnce(mockThemeResponse())
  jest
    .spyOn(services.tokenizer, 'create')
    .mockImplementation(() => mockTokenizer(tokens))

  const res = await tokenize(services, event)
  expect(res.status).toEqual(200)
  expect(res.headers['Content-Type']).toEqual('text/html')
  expect(res.headers['Cache-Control']).toEqual(`max-age=${cacheAge}`)
  expect(res.body).toEqual(
    [
      [
        '<div>',
        '<span',
        ' style="color:color;font-style:fontStyle;font-weight:fontWeight;text-decoration:textDecoration;"',
        '>',
        'foo',
        '</span>',
        '</div>',
      ].join(''),
      '<div><span style="">&nbsp;</span></div>',
      '<div><span style="">&lt;</span></div>',
    ].join(''),
  )
})

test('Should return status 400 with missing theme', async () => {
  const services = createServices()
  const event = createCFEvent({
    lang: 'javascript',
    code: 'code\ncode\ncode',
  })

  fetch.mockResponseOnce(mockThemeResponse())
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 with missing code', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    lang: 'javascript',
  })

  fetch.mockResponseOnce(mockThemeResponse())
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 with missing lang', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
  })

  fetch.mockResponseOnce(mockThemeResponse())
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 with unsupported lang', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
    lang: 'unsupported',
  })

  fetch.mockResponseOnce(mockThemeResponse())
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 when fetching theme fails', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
    lang: 'javascript',
  })

  fetch.mockResponseOnce('', { status: 404 })
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 when parsing theme fails', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
    lang: 'javascript',
  })

  fetch.mockResponseOnce('invalid')
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 400 for invalid theme', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
    lang: 'javascript',
  })

  fetch.mockResponseOnce('{}')
  const res = await tokenize(services, event)
  expect(res.status).toEqual(400)
})

test('Should return status 500 for unexpected errors', async () => {
  const services = createServices()
  const event = createCFEvent({
    theme: 'theme',
    code: 'code\ncode\ncode',
    lang: 'javascript',
  })

  fetch.mockResponseOnce(mockThemeResponse())
  jest.spyOn(services, 'reportError')
  jest.spyOn(services.tokenizer, 'create').mockImplementation(() => {
    throw new Error('Unexpected')
  })

  const res = await tokenize(services, event)
  expect(res.status).toEqual(500)
  expect(services.reportError).toHaveBeenCalled()
})
