import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono + TypeScript!'))


app.get('/hello', (c) => {
  const name = c.req.query('name') || 'World'
  return c.json({ message: `Hello, ${name}!` })
})



export default app
