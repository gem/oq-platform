from django.contrib.gis.db import models

# NOTE: this is a workaround to load custom sql inside Django

# add_icmp_unaccent_operator.sql
class AddIcmpUnaccentOperator(models.Model):
    dumb = models.IntegerField()

    class Meta:
        managed = False

