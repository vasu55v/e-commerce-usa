from django.urls import path
from . import views
from rest_framework import routers


router=routers.DefaultRouter()

router.register('address',views.customerAddressViewSet)


urlpatterns = [

    path('vendor/',views.vendorView.as_view(),name="vendor"),
    path('vendor/<int:pk>/',views.vendorDetailView.as_view(),name="vendor_detail"),
    path('vendor/register/',views.vendor_register,name="vendor_register"), 
    path('vendor/login/',views.vendor_login,name="vendor_login"),  
    path('vendor/<int:pk>/orderItem/',views.VendorOrderDetailView.as_view()), 

    path('vendor/<int:pk>/product/',views.VendorProductView.as_view()),    
  
    path('vendor/<int:pk>/customer/',views.VendorCustomerList.as_view()),    
    path('vendor/<int:pk>/panel/',views.vendor_panel),        
    path('vendor_change_password/<int:vendor_id>/',views.vendor_change_password),

    
     
    path('customer/',views.CreateCustomerView.as_view(),name="customer"),
    path('customer/<int:pk>/',views.CustomerDetailView.as_view(),name="customer_detail"),
    path('customer/login/',views.customer_login,name="customer_login"), 
    path('customer/register/',views.customer_register,name="customer_register"),
    path('customer/<int:pk>/orderItem/',views.CustomerOrderDetailView.as_view()),         
    path('user/<int:pk>/',views.UserDetailView.as_view(),name="user_detail"),
    path('category/',views.createCategoryView.as_view(),name="category"),
    path('category/<int:pk>/',views.categoryDetailView.as_view(),name="category_detail"),
    path('customer/<int:pk>/address/',views.customerAddressShow.as_view(),name="customer_address"),
    path('customer_change_password/<int:customer_id>/',views.customer_change_password),


    path('product/',views.createProductView.as_view(),name="product"),
    path('product/<int:pk>/',views.productDetailView.as_view(),name="product_detail"),
    path('order/',views.createOrderView.as_view()),
    path('order/<int:pk>/',views.OrderDetailView.as_view()),  
    path('order_update/<int:pk>/',views.OrderUpdateViews.as_view()),
    path('customer_order_delete/<int:customer_id>/',views.delete_customer_order),    
    path('orderItem/',views.orderItemView.as_view()),        
]

urlpatterns+=router.urls