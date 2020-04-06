Hello, this is a example about how to run this project.
You need to instal the latest python and django version 
For the first, you need to run "virtual box". Open in console direct Hello -> Script, and run file activate.bat. Now you can run the project.
You need to corect the db conect. Open Ark_Sale -> Ark_Sale, open settings.py and corret this dict for your own db.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'Ark_Sale',
        'USER': 'postgres',
        'PASSWORD': '123321EdO123321',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
Open console in direct Ark_sale and run this command: 

python(python3 if you have unix etc) manage.py makemigrations 
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
