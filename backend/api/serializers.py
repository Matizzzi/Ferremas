from rest_framework import serializers
from .models import Producto, Pedido, DetallePedido, Pago

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ('id', 'codigo')

class DetallePedidoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(),
        source='producto',
        write_only=True
    )
    
    class Meta:
        model = DetallePedido
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(many=True, read_only=True)
    estado_display = serializers.CharField(
        source='get_estado_display',
        read_only=True
    )
    
    class Meta:
        model = Pedido
        fields = '__all__'
        read_only_fields = ('cliente_uid', 'fecha', 'total')

class PedidoCreateSerializer(serializers.ModelSerializer):
    items = DetallePedidoSerializer(many=True, write_only=True)
    
    class Meta:
        model = Pedido
        fields = ['items', 'metodo_pago']
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        pedido = Pedido.objects.create(
            cliente_uid=self.context['request'].user.uid,
            **validated_data
        )
        
        total = 0
        for item_data in items_data:
            producto = item_data['producto']
            DetallePedido.objects.create(
                pedido=pedido,
                producto=producto,
                cantidad=item_data['cantidad'],
                precio_unitario=producto.precio
            )
            total += producto.precio * item_data['cantidad']
        
        pedido.total = total
        pedido.save()
        
        return pedido

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'
        read_only_fields = ('confirmado', 'confirmado_por_uid', 'fecha')