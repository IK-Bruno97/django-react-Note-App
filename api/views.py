from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note 
from . serializers import NoteSerializer
from . utils import *

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
  thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
  }
  return Response(thisdict)

@api_view(['GET', 'POST'])
def getNotes(request):
   if request.method == 'GET':
      return getNotesList(request)
    
   if request.method == 'POST':
      return createNote(request)

  
@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):
    if request.method == 'GET':
      return getNoteDetail(request, pk)

    if request.method == 'PUT':
      return updateNote(request, pk)

    if request.method == 'DELETE':
      return deleteNote(request, pk)