# Generated by Django 4.1 on 2023-01-08 05:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_issued',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 8, 0, 12, 57, 839551)),
        ),
    ]
