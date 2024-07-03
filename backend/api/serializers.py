from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email']  


class vendorSerializer(serializers.ModelSerializer):
    # user=UserSerializer()
    class Meta:
        model=Vendor
        fields=['id','user','address','mobile','profile_img']
        # fields=['id','user','address']
        
        def create(self,**validated_data):
            vendor=vendor.objects.create_user(**validated_data)
            return vendor
        
    def __init__(self,*args,**kwargs):
        super(vendorSerializer,self).__init__(*args,**kwargs)
        # self.Meta.depth=1
    
class vendorDetailSerializer(serializers.ModelSerializer):
    # user=UserSerializer()
    class Meta:
        model=Vendor
        fields=['id','user','address','mobile','profile_img']

    # def __init__(self,*args,**kwargs):
    #     super(vendorDetailSerializer,self).__init__(*args,**kwargs)
    #     self.Meta.depth=1

    def to_representation(self,instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        # response['customer_orders']=OrderSerializer(instance.customer_orders).data
        return response
        


        



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=['id','user','mobile','customer_orders','profile_img']

    def __init__(self,*args,**kwargs):
        super(CustomerSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=Customer
        fields=['id','user','mobile','customer_orders','profile_img']

    def to_representation(self,instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        # response['customer_orders']=OrderSerializer(instance.customer_orders).data
        return response
        

    # def __init__(self,*args,**kwargs):
    #     super(CustomerSerializer,self).__init__(*args,**kwargs)
    #     self.Meta.depth=1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductCategory
        fields=["id","title"]

    def __init__(self,*args,**kwargs):
        super(CategorySerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1



class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        # fields=["id","category","vendor","title","detail","price","image","slug","tags","demo_url","product_file"]
        fields=["id","category","vendor","title","detail","price","image"]

    # def __init__(self,*args,**kwargs):
    #     super(ProductSerializer,self).__init__(*args,**kwargs)
    #     self.Meta.depth=1

# class OrderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Order
#         fields=['id','customer','order_time']

class OrderSerializer(serializers.ModelSerializer):
    # customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    customer=CustomerSerializer()
    class Meta:
        model = Order
        fields = ['id','customer', 'order_time','order_status']

    def __init__(self,*args,**kwargs):
        super(OrderSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1    

class OrderItemSerializer(serializers.ModelSerializer):#orderDetailSerializer
    order=OrderSerializer()
    class Meta:
        model=OrderItems
        fields=['id','order','product','qty','price']
    
    def __init__(self,*args,**kwargs):
        super(OrderItemSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1    

class  CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomerAddress
        fields=['id','customer','address']
        # fields=['id','customer','address','default_address']
    
    # def __init__(self,*args,**kwargs):
    #     super(CustomerAddressSerializer,self).__init__(*args,**kwargs)
    #     self.Meta.depth=1  

class orderItemSerializer(serializers.ModelSerializer):
    # order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    order=OrderSerializer()
    product=ProductSerializer()
    class Meta:
        model=OrderItems
        fields=['id','order','product','qty','price']

    # def __init__(self,*args,**kwargs):
    #     super(orderItemSerializer,self).__init__(*args,**kwargs)
    #     self.Meta.depth=1