import pickle
import sys
import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy.cluster.hierarchy import *


class ClusteringBeta:
    def __init__(self):
        self.hierarchy, self.data_df = None, None
        self.load_hierarchy()
        self.load_sentence_data()

    def load_hierarchy(self, setting="Y14_1213_100_A_2"):
        with open("data/{}_counter_hierarchy.pkl".format(setting), "rb") as f:
            self.hierarchy = pickle.load(f)

    def load_sentence_data(self, setting="Y14_1213_100_A_2"):
        self.data_df = pd.read_pickle("data/{}_counter_data.xz.pkl".format(setting), compression="xz")

    def fcluster(self, size):
        cluster = fcluster(self.hierarchy, t=size, criterion="maxclust")
        # sort by cluster number
        idx_list = [idx for idx in range(len(cluster))]
        cluster_list, idx_list = zip(*sorted(zip(cluster, idx_list)))
        cluster_list, idx_list = list(cluster_list), list(idx_list)
        # to df
        return pd.DataFrame({"Number": cluster_list, "Idx": idx_list})

    def do_query(self, distance):
        # clustering
        cluster_df = self.fcluster(distance)
        return pd.merge(cluster_df, self.data_df, on="Idx")
