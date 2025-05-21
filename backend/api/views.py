from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Producto, Pedido, DetallePedido, Pago
from .serializers import (
    ProductoSerializer, 
    PedidoSerializer,
    DetallePedidoSerializer,
    PagoSerializer,
    PedidoCreateSerializer
)

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        nombre = request.query_params.get('nombre', '')
        productos = Producto.objects.filter(nombre__icontains=nombre)
        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return PedidoCreateSerializer
        return PedidoSerializer

    def get_queryset(self):
        # Filtra pedidos por el UID de Firebase del usuario
        user_uid = self.request.user.uid  # Asumiendo que el UID de Firebase está en request.user
        if self.request.user.rol == 'CLIENTE':
            return Pedido.objects.filter(cliente_uid=user_uid)
        return Pedido.objects.all()
    
    def perform_create(self, serializer):
        # Asigna automáticamente el UID del cliente desde Firebase
        serializer.save(cliente_uid=self.request.user.uid)

    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        pedido = self.get_object()
        if pedido.estado not in ['ENTREGADO', 'CANCELADO']:
            pedido.estado = 'CANCELADO'
            pedido.save()
            return Response({'status': 'Pedido cancelado'})
        return Response(
            {'error': 'No se puede cancelar este pedido'},
            status=status.HTTP_400_BAD_REQUEST
        )

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.all()
    serializer_class = DetallePedidoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Solo permite ver detalles de pedidos que el usuario puede ver
        pedido_ids = PedidoViewSet().get_queryset(self.request).values_list('id', flat=True)
        return self.queryset.filter(pedido_id__in=pedido_ids)

class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Filtra pagos según permisos del usuario
        if self.request.user.rol in ['CONTADOR', 'ADMIN']:
            return Pago.objects.all()
        
        # Para clientes y otros roles, solo sus propios pagos
        pedido_ids = Pedido.objects.filter(
            cliente_uid=self.request.user.uid
        ).values_list('id', flat=True)
        return Pago.objects.filter(pedido_id__in=pedido_ids)
    
    @action(detail=True, methods=['post'])
    def confirmar(self, request, pk=None):
        if request.user.rol != 'CONTADOR':
            return Response(
                {'error': 'Solo los contadores pueden confirmar pagos'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        pago = self.get_object()
        pago.confirmado = True
        pago.confirmado_por_uid = request.user.uid
        pago.save()
        
        # Opcional: Cambiar estado del pedido asociado
        pago.pedido.estado = 'PREPARACION'
        pago.pedido.save()
        
        return Response({'status': 'Pago confirmado'})