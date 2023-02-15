from fastapi import FastAPI
from pprint import pprint
from typing import Union
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import pandas as pd
from result import ClusteringResult

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   # 追記により追加
    allow_methods=["*"],      # 追記により追加
    allow_headers=["*"]       # 追記により追加
)
result = ClusteringResult()


class Item(BaseModel):
    size: Union[str, int]
    term: str
    mask: bool


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/clustering")
def clustering(item: Item):
    # init
    size = 30 if not item.size else int(item.size)
    # setting
    result.load_sentence_data(term=item.term)
    result.load_clustering_result(term=item.term, mask=item.mask)
    # process query
    result_df = result.do_query(cluster_size=size)
    color = result_df["Color"].to_list()
    # make response
    responses = {"cluster": result_df["Number"].to_list(), "token": result_df["Token"].to_list(), "color": color}
    return responses
