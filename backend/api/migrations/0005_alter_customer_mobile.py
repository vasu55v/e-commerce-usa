# Generated by Django 4.2.7 on 2024-04-24 05:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_customeraddress_default_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.PositiveBigIntegerField(unique=True),
        ),
    ]
