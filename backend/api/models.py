from django.db import models
from django.contrib.auth.models import User


class Vendor(models.Model):                 
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.TextField()
    mobile=models.PositiveBigIntegerField(unique=True,null=True)
    profile_img=models.ImageField(upload_to='seller_img',null=True)

    def __str__(self):
        return self.user.username
    
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField(unique=True)
    profile_img=models.ImageField(upload_to='customer_img',null=True)

    def __str__(self):
        return self.user.username

class ProductCategory(models.Model):
    title=models.CharField(max_length=200)
    def __str__(self):
        return self.title
    
class Product(models.Model):
    category=models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,blank=True)
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)
    price=models.FloatField()
    image = models.ImageField(upload_to='images', null=True, blank=True)
    # slug=models.CharField(max_length=300,unique=True,null=True)
    # tags=models.TextField(null=True)
    # demo_url=models.URLField(null=True,blank=True)
    # product_file=models.FileField(upload_to='product_files/',null=True)
    

    def __str__(self):
        return self.title
    
    def tag_list(self):
        tagList=self.tags.split(',')
        return tagList

class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="customer_orders")
    order_time=models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)

    def __str__(self):     
         return '%s' % (self.order_time)
     
class OrderItems(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name="customer_order")
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)

    def __str__(self):     
         return self.product.title


class CustomerAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
    address=models.TextField()
    # default_address=models.BooleanField(default=True)

    def __str__(self):
     return self.address
     

