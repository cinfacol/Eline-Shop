# Generated by Django 4.1 on 2022-09-27 22:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("category", "0003_alter_category_image"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="category",
            name="image",
        ),
    ]
