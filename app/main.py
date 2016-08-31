import os
import json
import asyncio
import jinja2
from aiohttp import ClientSession
import aiohttp_jinja2
from aiohttp import web
from settings import settings


async def get_item(request):
    symbol = request.match_info['symbol']
    async with ClientSession() as session:
        async with session.get('http://data.benzinga.com/rest/richquoteDelayed?symbols={symbol}'.format(symbol=symbol)) as resp:
            body = await resp.json()
    if 'null' in body:
        return web.Response(status=404)
    body = body[symbol]
    return web.Response(status=200, content_type='application/json', text=json.dumps({
        'name': body['name'],
        'symbol': symbol,
        'bidPrice': body['bidPrice'],
        'askPrice': body['askPrice']
    }))

@aiohttp_jinja2.template('index.jinja2')
def index(request):
    return {}


def init_app(loop):
    app = web.Application()

    aiohttp_jinja2.setup(app,loader=jinja2.FileSystemLoader(settings.STATIC_DIR))

    app.router.add_route('GET', '/', index)
    app.router.add_route('GET', '/items/{symbol}', get_item)

    app.router.add_static(settings.STATIC_PATH, settings.STATIC_DIR)

    return app


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    app = init_app(loop=loop)
    web.run_app(app, host=settings.HOST, port=os.environ.get('PORT', settings.PORT))
