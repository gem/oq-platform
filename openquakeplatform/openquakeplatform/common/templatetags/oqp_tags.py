from django import template

from geonode.maps.models import Map
from geonode.search.search import _filter_security

register = template.Library()


@register.assignment_tag(takes_context=True)
def latest_maps(context, count=5):
    request = context['request']
    maps = Map.objects.order_by("-last_modified")
    maps = _filter_security(maps, request.user, Map, 'view_map')[:count]
    return maps


@register.assignment_tag(takes_context=True)
def featured_maps(context, count=10):
    request = context['request']
    maps = Map.objects.filter(owner=2).order_by("id")
    maps = _filter_security(maps, request.user, Map, 'view_map')[:count]
    return maps
