from django.shortcuts import redirect, render, render_to_response, HttpResponse
from django.views.generic.base import View, TemplateView
from django.views.generic.detail import SingleObjectTemplateResponseMixin
import traceback
import json, pprint

from utils import utilities

class JSONResponseMixin(object):
    """
    A mixin that can be used to render a JSON response.
    """
    response_class = HttpResponse

    def render_to_json_response(self, context, **response_kwargs):
        """
        Returns a JSON response, transforming 'context' to make the payload.
        """

        response_kwargs['content_type'] = 'application/json'
        return self.response_class(
            self.convert_context_to_json(context),
            **response_kwargs
        )
    #end render_to_response

    def convert_context_to_json(self, context):
        "Convert the context dictionary into a JSON object"
        # Note: This is *EXTREMELY* naive; in reality, you'll need
        # to do much more complex handling to ensure that arbitrary
        # objects -- such as Django model instances or querysets
        # -- can be serialized as JSON.
        return json.dumps(context)
    #end convert_context_to_json
#end JSONResponseMixin

class Raceview(TemplateView, JSONResponseMixin):

    template_name = "raceview_admin/table.html"

    json_mixin = JSONResponseMixin() #TODO: mixin class should not have to create object

    def render_to_response(self, context, **response_kwargs):
        if self.request.GET.get('format') == 'json':
            try:
                race_data_array = utilities.gather_race_data()
                host_data_array = utilities.gather_host_data()
            except Exception, error:
                tb = traceback.format_exc()
                print tb
                print error, 100

            finally:
                context["job_data_array"] = race_data_array
                context["host_data_array"] = host_data_array
                try:
                    self.json_mixin.render_to_json_response(context, **response_kwargs)
                except Exception, error:
                    print error
            return self.json_mixin.render_to_json_response(context, **response_kwargs)
        else:
            return super(Raceview, self).render_to_response(context)


    def post(self):
        pass
#end Raceview
