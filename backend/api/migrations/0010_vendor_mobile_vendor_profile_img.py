# Generated by Django 4.2.7 on 2024-04-30 04:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_customeraddress_default_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='mobile',
            field=models.PositiveBigIntegerField(null=True, unique=True),
        ),
        migrations.AddField(
            model_name='vendor',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='seller_img'),
        ),
    ]
