from django.shortcuts import render , redirect
from django.http import Http404

from .models import Profile
from .forms import ProfileForm

# Create your views here.
def profile_detail_view(request, username, *args, **kwargs):
    return render(request, "profiles/detail.html", {"username": username})


#when changing to api make sure that the user is authenicated before making changes 
def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        #keep this next thing in mind when making the api take them where they want 
        #to go after logging on
        return redirect ("/login?next=/profile/update")

    user = request.user
    my_profile = user.profile
    initial ={
        "first_name" : user.first_name,
        "last_name"  : user.last_name,
        "email"      : user.email


    }
    form = ProfileForm(request.POST or None, instance = my_profile, initial = initial)
    if form.is_valid():
        profile_obj = form.save(commit = False)
        first_name = form.cleaned_data.get("first_name")
        last_name = form.cleaned_data.get("last_name")
        email = form.cleaned_data.get("email")
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        my_profile.save()
    context = {
        "form" : form,
        "btn_label" : "Save",
        "title" : "Update Profile"
    }
    return render (request, "profiles/form.html",context)