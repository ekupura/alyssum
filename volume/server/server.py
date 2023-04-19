from fastapi import FastAPI
from pprint import pprint
from typing import Union
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import pandas as pd
from result import ClusteringBeta
from glob import glob
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)
beta = ClusteringBeta()


class Item(BaseModel):
    size: Union[str, int]
    setting: str
    mask: bool


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/distance")
def distance(item: Item):
    # setting
    size = 10 if not item.size else int(item.size)
    beta.load_hierarchy(setting=item.setting)
    beta.load_sentence_data(setting=item.setting)

    # process query
    result_df = beta.do_query(distance=size)
    color = result_df["Color"].to_list() if not item.mask else result_df["Mask_Color"].to_list()
    cluster_size = max(result_df["Number"].to_list())

    # make response
    responses = {"cluster": result_df["Number"].to_list(), "token": result_df["Token"].to_list(),
                 "color": color, "max": cluster_size}
    return responses

@app.get("/file")
def file():
    file_list = glob("data/*_counter_hierarchy.pkl")
    project_list = []
    for file_path in file_list:
        file_path = os.path.splitext(os.path.basename(file_path))[0]
        file_path = file_path.replace("_counter_hierarchy", "")
        project_list.append(str(file_path))
    responses = {"file": project_list}
    return responses
