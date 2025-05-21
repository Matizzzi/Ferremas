from django.contrib import admin  # ¡Esta línea falta!
from django.urls import path, include
from core.views import home  # Importa tu vista personalizada

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]