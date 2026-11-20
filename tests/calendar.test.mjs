import test from 'node:test'
import assert from 'node:assert/strict'
import { publicCalendarUrl } from '../src/lib/calendar.mjs'

test('accepts public HTTPS calendar links and rejects unsafe or missing URLs', () => {
  const url = 'https://outlook.office365.com/owa/calendar/example/calendar.html'
  assert.equal(publicCalendarUrl(` ${url} `), url)
  for (const value of ['', null, 'not a URL', 'http://example.com', 'javascript:alert(1)', 'https://user:pass@example.com/']) {
    assert.equal(publicCalendarUrl(value), null)
  }
})
