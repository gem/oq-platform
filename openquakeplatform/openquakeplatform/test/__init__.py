from openquake.moon import platform_get, platform_del


def setup_package():
    pla = platform_get()
    pla.init()


def teardown_package():
    platform_del()
