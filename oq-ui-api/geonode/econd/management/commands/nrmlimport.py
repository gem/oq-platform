__author__ = 'Simon Ruffle, CAR'

from django.core.management.base import BaseCommand, CommandError
from econd.nrmlimport import NRMLImporter


class Command(BaseCommand):
    args = '<file_name>'
    help = 'imports an NRML file into the GEMECD database'

    def handle(self, *args, **options):
        importer = NRMLImporter()

        file_name = args[0]
        success = importer.importfile(file_name)

        if success:
            self.stdout.write('File ' + file_name + ' imported successfully.\n')
        else:
            message = 'Import of ' + file_name + ' was aborted, ' + importer.getabortmessage().encode('utf-8')
            raise CommandError(message)