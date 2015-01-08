import math

from geonode.utils import forward_mercator


def set_bbox(map):
    bbox = map.set_bounds_from_layers(map.local_layers)

    if bbox is not None:
        minx, miny, maxx, maxy = [float(c) for c in bbox]
        x = (minx + maxx) / 2
        y = (miny + maxy) / 2
        (map.center_x, map.center_y) = forward_mercator((x, y))

        width_zoom = math.log(360 / (maxx - minx), 2)
        height_zoom = math.log(360 / (maxy - miny), 2)

        map.zoom = math.ceil(min(width_zoom, height_zoom))
