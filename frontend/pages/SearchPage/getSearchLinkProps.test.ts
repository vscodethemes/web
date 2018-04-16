import { defaultSearchParams } from '../../constants'
import getSearchLinkProps from './getSearchLinkProps'

test('Should return clean url for params', () => {
  const params = {
    sortBy: 'new',
    search: 'oceanic',
    light: true,
    dark: true,
    lang: 'html',
    page: 2,
    perPage: 10,
  }

  expect(getSearchLinkProps(params)).toEqual({
    href: {
      pathname: '/',
      query: params,
    },
    as: {
      pathname: '/new',
      query: {
        search: 'oceanic',
        light: 1,
        dark: 1,
        lang: 'html',
        page: 2,
        perPage: 10,
      },
    },
  })
})

test('Should return clean url for installs', () => {
  expect(getSearchLinkProps({ sortBy: 'installs' })).toEqual({
    href: {
      pathname: '/',
      query: { sortBy: 'installs' },
    },
    as: {
      pathname: '/',
      query: {},
    },
  })
})

test('Should return clean url for trending', () => {
  expect(getSearchLinkProps({ sortBy: 'trending' })).toEqual({
    href: {
      pathname: '/',
      query: { sortBy: 'trending' },
    },
    as: {
      pathname: '/trending',
      query: {},
    },
  })
})

test('Should return clean url for new', () => {
  expect(getSearchLinkProps({ sortBy: 'new' })).toEqual({
    href: {
      pathname: '/',
      query: { sortBy: 'new' },
    },
    as: {
      pathname: '/new',
      query: {},
    },
  })
})

test('Should return clean url for default page', () => {
  const page = defaultSearchParams.page
  expect(getSearchLinkProps({ page })).toEqual({
    href: {
      pathname: '/',
      query: { page },
    },
    as: {
      pathname: '/',
      query: {},
    },
  })
})

test('Should return clean url for default perPage', () => {
  const perPage = defaultSearchParams.perPage
  expect(getSearchLinkProps({ perPage })).toEqual({
    href: {
      pathname: '/',
      query: { perPage },
    },
    as: {
      pathname: '/',
      query: {},
    },
  })
})

test('Should return clean url for falsy dark', () => {
  const perPage = defaultSearchParams.perPage
  expect(getSearchLinkProps({ dark: false })).toEqual({
    href: {
      pathname: '/',
      query: {},
    },
    as: {
      pathname: '/',
      query: {},
    },
  })
})

test('Should return clean url for falsy light', () => {
  const perPage = defaultSearchParams.perPage
  expect(getSearchLinkProps({ light: false })).toEqual({
    href: {
      pathname: '/',
      query: {},
    },
    as: {
      pathname: '/',
      query: {},
    },
  })
})
