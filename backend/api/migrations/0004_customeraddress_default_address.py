# Generated by Django 4.2.7 on 2024-04-17 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='customeraddress',
            name='default_address',
            field=models.BooleanField(default=False),
        ),
    ]
