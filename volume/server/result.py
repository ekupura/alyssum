import pickle
import sys
import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy.cluster.hierarchy import *
import matplotlib.pyplot as plt
import os
from pathlib import Path
from pprint import pprint

init_setting = "Y14_1213_100_A_R"
init_size = 10
init_type = "train"

class ClusteringBeta:
    def __init__(self):
        self.data_df = None, None
        self.cluster_df = None
        self.load_sentence_data()
        self.load_cluster_data()

    def load_sentence_data(self, setting=init_setting, data_type=init_type):
        self.data_df = pd.read_pickle("data/{}/{}/data.xz.pkl".format(data_type, setting), compression="xz")
    
    def load_cluster_data(self, setting=init_setting, size=init_size, data_type=init_type):
        self.cluster_df = pd.read_pickle("data/{}/{}/{}/cluster.pkl".format(data_type, setting, size))

    def fcluster(self, size):
        # clustering
        cluster = self.cluster_list[size - 2]

        # sort by cluster number
        idx_list = [idx for idx in range(len(cluster))]
        cluster_list, idx_list = zip(*(sorted(zip(cluster, idx_list))))
        cluster_list, idx_list = list(cluster_list), list(idx_list)

        print(cluster_list)
        # to df
        return pd.DataFrame({"Number": cluster_list, "Idx": idx_list})

    def do_query(self, distance):
        # clustering
        return pd.merge(self.cluster_df, self.data_df, on="Idx")

    def update_df(self, df, problematic_list):
        for problematic_cluster in problematic_list:
            df["Human"] = (df["Number"] == problematic_cluster + 1)
        return df
    
    def write_df(self, df, setting=init_setting, data_type=init_type):
        dir_path = Path("data/updated") / data_type / setting
        os.makedirs(dir_path, exist_ok=True)
        file_path = dir_path / "updated.xz.pkl"
        df.to_pickle(file_path, compression="xz")
