from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password



class vendorView(generics.ListCreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = vendorSerializer
    permission_classes = [AllowAny]


class vendorDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = vendorDetailSerializer
    permission_classes = [AllowAny]


@csrf_exempt  # whenever we have post request in django it should have csrf token
def vendor_register(request):
    first_name = request.POST.get("first_name")
    last_name = request.POST.get("last_name")
    username = request.POST.get("username")
    email = request.POST.get("email")
    mobile = request.POST.get("mobile")
    address = request.POST.get("address")
    password = request.POST.get("password")

    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        )

        if user:
            try:
                vendor = Vendor.objects.create(
                    user=user,
                    mobile=mobile,
                    address=address,
                )
                msg = {
                    "bool": True,
                    "user": user.id,
                    "customer": vendor.id,
                    "msg": "Thanks for registration. Now you can login",
                }

            except IntegrityError:
                msg = {"bool": False, "msg": "mobile number already exist."}

        else:
            msg = {"bool": False, "msg": "oops... something went wrong."}

    except IntegrityError:
        msg = {"bool": False, "msg": "Username already exist."}

    return JsonResponse(msg)


def vendor_panel(request, pk):
    vendor_id = pk
    total_products = Product.objects.filter(vendor__id=vendor_id).count()
    total_order = OrderItems.objects.filter(product__vendor__id=vendor_id).count()
    total_customer = (
        OrderItems.objects.filter(product__vendor__id=vendor_id)
        .values("order__customer")
        .count()
    )

    msg = {
        "total_products": total_products,
        "total_order": total_order,
        "total_customer": total_customer,
    }

    return JsonResponse(msg)

@csrf_exempt
def vendor_change_password(request,vendor_id):
    password=request.POST.get('password')
    vendor=Vendor.objects.get(id=vendor_id)
    user=vendor.user
    user.password=make_password(password)
    user.save()
    msg={
        'bool':True,
        'msg':'password has been changed'
    }

    return JsonResponse(msg)

@csrf_exempt  # whenever we have post request in django it should have csrf token
def vendor_login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    if user:
        vendor = Vendor.objects.get(user=user)
        msg = {
            "bool": True,
            "user": user.username,
            "id": vendor.id,
        }
    else:
        msg = {"bool": False, "msg": "not valid username or password"}
    return JsonResponse(msg)


class CreateCustomerView(generics.ListCreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Customer.objects.all()


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer
    permission_classes = [AllowAny]


class CustomerOrderDetailView(generics.ListAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs["pk"]
        qs = qs.filter(order__customer__id=customer_id)
        return qs


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class createCategoryView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ProductCategory.objects.all()


class categoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class createProductView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Product.objects.all()


class productDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class createOrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    # def post(self, request, *args, **kwargs):
    #     print(request.POST)
    #     serializer = self.get_serializer(data=request.POST)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class orderDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset=Order.objects.all()
#     serializer_class=OrderSerializer


class orderItemView(generics.ListCreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = orderItemSerializer
    permission_classes = [AllowAny]


class OrderUpdateViews(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]


class OrderDetailView(generics.ListAPIView):
    # queryset=OrderItems.objects.all()
    serializer_class = orderItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        order_id = self.kwargs["pk"]
        order = Order.objects.get(id=order_id)
        order_items = OrderItems.objects.filter(order=order)
        return order_items


# #OrderModifyView
# class OrderDeleteView(generics.ListAPIView):
#     # queryset=OrderItems.objects.all()
#     serializer_class=orderItemSerializer
#     permission_classes =[AllowAny]


@csrf_exempt
def delete_customer_order(request, customer_id):
    if request.method == "DELETE":
        order = Order.objects.filter(customer__id=customer_id).delete()
        msg = {"bool": False}
        if order:
            msg = {"bool": True}

    return JsonResponse(msg)


class VendorOrderDetailView(generics.ListAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = orderItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs


class VendorCustomerList(generics.ListAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = OrderItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs
    
class VendorProductView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs["pk"]
        qs = qs.filter(vendor__id=vendor_id)
        return qs



class customerAddressViewSet(viewsets.ModelViewSet):
    queryset = CustomerAddress.objects.all()
    serializer_class = CustomerAddressSerializer
    permission_classes = [AllowAny]


class customerAddressShow(generics.ListAPIView):
    queryset = CustomerAddress.objects.all()
    serializer_class = CustomerAddressSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs["pk"]
        qs = qs.filter(customer__id=customer_id)
        return qs


@csrf_exempt  # whenever we have post request in django it should have csrf token
def customer_login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    if user:
        customer = Customer.objects.get(user=user)
        msg = {
            "bool": True,
            "user": user.username,
            "id": customer.id,
        }
    else:
        msg = {"bool": False, "msg": "not valid username or password"}
    return JsonResponse(msg)


@csrf_exempt  # whenever we have post request in django it should have csrf token
def customer_register(request):
    first_name = request.POST.get("first_name")
    last_name = request.POST.get("last_name")
    username = request.POST.get("username")
    email = request.POST.get("email")
    mobile = request.POST.get("mobile")
    password = request.POST.get("password")

    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        )

        if user:
            try:
                customer = Customer.objects.create(user=user, mobile=mobile)
                msg = {
                    "bool": True,
                    "user": user.id,
                    "customer": customer.id,
                    "msg": "Thanks for registration. Now you can login",
                }

            except IntegrityError:
                msg = {"bool": False, "msg": "mobile number already exist."}

        else:
            msg = {"bool": False, "msg": "oops... something went wrong."}

    except IntegrityError:
        msg = {"bool": False, "msg": "Username already exist."}

    return JsonResponse(msg)

@csrf_exempt
def customer_change_password(request,customer_id):
    password=request.POST.get('password')
    customer=Customer.objects.get(id=customer_id)
    user=customer.user
    user.password=make_password(password)
    user.save()
    msg={
        'bool':True,
        'msg':'password has been changed'
    }

    return JsonResponse(msg)



