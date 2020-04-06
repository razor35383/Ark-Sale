from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from .models import User
import os

def index(request):
	if request.session.has_key('token'):
		return render(request, 'main/index2.html')
	else:
		return render(request, 'main/index.html')

def registration(request):
	if request.session.has_key('token'):
		return render(request, 'main/index.html')
	else:
		return render(request, 'registration/index.html')

def form(request):

	a = User(name = request.GET['fname'], last_name = request.GET['lname'],
	 email = request.GET['email'], password = request.GET['psw'])
	
	a.save()
	return render(request, 'form/index.html')
	

def auth(request):

	login = request.GET['login']
	password = request.GET['password']
	user = User.objects.get(email = login)

	if user.password == password:
		size = len(password)
		token = str(os.urandom(size))
		user.token = token
		user.save()

		request.session['token'] = token

		return render(request, 'main/index2.html')

def log_out(request):

	if request.session.has_key('token'):
		
		user = User.objects.get(token = request.session['token'])
		user.token = ""
		user.save()
		
		del  request.session["token"]
		return render(request, 'main/index.html')