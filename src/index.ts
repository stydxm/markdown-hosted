/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import sha256 from 'crypto-js/sha256'
const KEY_REGEX = new RegExp('^/([0-9a-f]{64})/?$')

export default {
    async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
        const path = new URL(request.url).pathname
        if ((request.method == 'POST') && (path == '/')) {
            const content = (await request.text()).trim()
            const max_size_bytes = parseInt(env.MAX_UPLOAD_SIZE_MB) * 1024 * 1024
            if (content.length > max_size_bytes) {
                return new Response('Payload Too Large', { status: 413 })
            }
            if (!content.substring(0, 64).toLowerCase().startsWith('<!doctype html>')) {
                return new Response('Bad Request', { status: 400 })
            }
            const key = sha256(content).toString()
            const kv_content = await env.KV.get(`html-sha1:${key}`)
            if (kv_content && kv_content === content) { return new Response('Existed', { status: 403, headers: { 'Content-Type': 'text/plain' } }) }
            await env.KV.put(`html-sha1:${key}`, content)
            const origin = new URL(request.url).origin
            return new Response(`${origin}/${key}\n`, { status: 302, headers: { 'Location': `${origin}/${key}` } })
        }

        const key = KEY_REGEX.exec(path)
        if ((request.method == 'GET') && key) {
            const content = await env.KV.get(`html-sha1:${key[1]}`)
            if (!content) { return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } }) }
            return new Response(content, { headers: { 'Content-Type': 'text/html' } })
        }

        return new Response(`/${env.INDEX_SHA256}\n`, { status: 302, headers: { 'Location': `/${env.INDEX_SHA256}` } })
    },
};
