from django.core.management.base import BaseCommand, CommandError
from authy.models import State
from authy.fixtures.states_data import states

class Command(BaseCommand):
    help = 'Loads All Nigerian States'

    def handle(self, *args, **options):
        for state_data in states:
            state, created = State.objects.get_or_create(name=state_data["name"])
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully Loaded state: {state.name} to the DB'))
            else:
                self.stdout.write(self.style.SUCCESS(f'State: {state.name} already exists in the DB'))
