/* global describe, it */

'use strict'

const cookies = require('../../lib/routes/cookies')

require('should')

describe('/cookie/:name', function () {
  it('should response with one cookie', function (done) {
    const res = {}
    const req = {
      params: {
        name: 'foo'
      },
      cookies: {
        foo: 'bar'
      }
    }

    cookies.one(req, res, function () {
      res.body.should.equal(req.cookies.foo)

      done()
    })
  })

  it('should response with false when no cookies are defined', function (done) {
    const res = {}
    const req = {
      params: {
        name: 'foo'
      },
      cookies: {}
    }

    cookies.one(req, res, function () {
      res.body.should.be.false()

      done()
    })
  })

  it('should response with false when no match', function (done) {
    const res = {}
    const req = {
      params: {
        name: 'foo'
      }
    }

    cookies.one(req, res, function () {
      res.body.should.be.false()

      done()
    })
  })
})

describe('/cookie/:name', function () {
  it('should response with all cookies', function (done) {
    const res = {}
    const req = {
      har: {
        log: {
          entries: [
            {
              request: {
                cookies: ['test']
              }
            }
          ]
        }
      }
    }

    cookies.all(req, res, function () {
      res.body.should.equal(req.har.log.entries[0].request.cookies)

      done()
    })
  })
})
