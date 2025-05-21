from django.contrib import admin
from .models import Producto, Pedido, DetallePedido, Pago

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'nombre', 'marca', 'precio', 'stock')
    search_fields = ('nombre', 'codigo')

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente_uid', 'fecha', 'estado', 'total')
    list_filter = ('estado',)
    date_hierarchy = 'fecha'

@admin.register(DetallePedido)
class DetallePedidoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'producto', 'cantidad', 'precio_unitario')

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('pedido', 'monto', 'metodo', 'confirmado')
    list_filter = ('confirmado',)