import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'src.settings')  # Ajusta 'src.settings' según la ubicación del archivo settings.py
application = get_wsgi_application()
