from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Vendor)

class customerAdmin(admin.ModelAdmin):
    list_display=['get_username','mobile']
    def get_username(self,obj):
        return obj.user.username
admin.site.register(Customer,customerAdmin)


class orderAdmin(admin.ModelAdmin):
    list_display=['id','customer', 'order_time','order_status']
admin.site.register(Order,orderAdmin)





admin.site.register(ProductCategory)
admin.site.register(Product)
admin.site.register(OrderItems)
admin.site.register(CustomerAddress)




