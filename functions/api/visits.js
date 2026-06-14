// GET  /api/visits → 返回当前总游玩次数
// POST /api/visits → 计数 +1 并返回新值（每个浏览器会话只调用一次）
// KV binding: STATS (在 CF Pages 项目 Settings → Bindings 中绑定)

export async function onRequestGet({ env }) {
  const n = parseInt((await env.STATS.get('visits')) || '0', 10);
  return json({ visits: n });
}

export async function onRequestPost({ env }) {
  const cur = parseInt((await env.STATS.get('visits')) || '0', 10);
  const next = cur + 1;
  await env.STATS.put('visits', String(next));
  return json({ visits: next });
}

function json(obj) {
  return new Response(JSON.stringify(obj), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}
