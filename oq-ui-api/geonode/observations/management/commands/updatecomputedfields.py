from django.core.management.base import NoArgsCommand
from observations import models as observations


class Command(NoArgsCommand):
    help = "Update autocomputed fields of the models of observations app"

    def handle(self, *args, **options):
        [fs.update_autocomputed_fields() for fs in FaultSource.objects.all()]
        [fs.update_autocomputed_fields() for fs in FaultSection.objects.all()]
        print "fields updated"
