import os
from django.shortcuts import render
from mako.lookup import TemplateLookup
from django.http import HttpResponse, HttpResponseRedirect

tpl_lookup = TemplateLookup(directories=[os.path.join
                                         (os.path.dirname(__file__), "..","UI")],
                            default_filters=['decode.utf8'],
                            input_encoding='utf-8',output_encoding='utf-8')

# Create your views here.


def home(request):
    if request.method == 'GET':
        tpl = tpl_lookup.get_template("index.html")
        return HttpResponse(tpl.render())
