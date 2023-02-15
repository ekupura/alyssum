import sys
import pandas as pd
import numpy as np
from tqdm import tqdm


class ClusteringResult:
    def __init__(self):
        self.cluster_df, self.data_df = None, None
        self.load_clustering_result(term="A", mask=False)
        self.load_sentence_data(term="A")

    def load_clustering_result(self, term="A", mask=False):
        if mask:
            self.cluster_df = pd.read_pickle("data/masked_{}.xz.pkl".format(term), compression="xz")
        else:
            self.cluster_df = pd.read_pickle("data/cluster_{}.xz.pkl".format(term), compression="xz")

    def load_sentence_data(self, term="A"):
        self.data_df = pd.read_pickle("data/data_{}.xz.pkl".format(term), compression="xz")

    def do_query(self, cluster_size):
        select_df = self.cluster_df[self.cluster_df["Size"] == cluster_size]
        return pd.merge(select_df, self.data_df, on="Idx")
