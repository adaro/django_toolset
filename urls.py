from django.conf.urls import patterns, url
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from prodserv.raceview.views import Raceview
import views

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^$', csrf_exempt(Raceview.as_view()), name="raceview"),
                       )

# menu_items = (("presets", "Create Preset"),
#               ("editpresets", "Edit Preset"),
#               ("createscript", "Create Script"),
#               ("help", "Documentation"),
#                )

