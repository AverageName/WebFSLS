from fastapi import FastAPI
from models import segmTask

app = FastAPI()

@app.get('/')
def home():
    return {'key': 'hello'}

@app.post('/segmTask/')
def create_task(item: segmTask):
    pass