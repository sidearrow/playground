from pyramid.config import Configurator


def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.add_renderer('.html', 'pyramid_jinja2.renderer_factory')
        config.include('pyramid_jinja2')
        config.include('.app')
        config.scan()
    return config.make_wsgi_app()
