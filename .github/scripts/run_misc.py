import os
import requests

# Trigger the endpoint to rtrieve the analytics and save to database
response = requests.get(os.environ['MISC_ENDPOINT'])