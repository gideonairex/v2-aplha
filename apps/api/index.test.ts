import request from 'supertest'
import { createServer } from 'node:http'
import app from './index'

describe('Hono API', () => {
  it('GET /hello should return default message', async () => {
    const res = await app.request('/hello')
    const body = await res.json()  // Parse the response as JSON
    expect(res.status).toBe(200)
    expect(body).toEqual({ message: 'Hello, World!' })
  })

  it('GET /hello?name=X', async () => {
    const res = await app.request('/hello?name=X')
    const body = await res.json()  // Parse the response as JSON
    expect(res.status).toBe(200)
    expect(body).toEqual({ message: 'Hello, X!' })
  })
})

