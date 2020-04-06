from django.db import models
class User(models.Model): 

	name = models.CharField('Имя', max_length = 30) 
	last_name = models.CharField('Фамилия', max_length = 30) 
	email = models.CharField('Почта', max_length = 30, unique = True) 
	password = models.CharField('Пароль', max_length = 20) 
	token = models.CharField('Токен', max_length = 70, blank = True) 

	def __str__(self): 
		return self.name