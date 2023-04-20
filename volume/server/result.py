import pickle
import sys
import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy.cluster.hierarchy import *
import matplotlib.pyplot as plt


init_setting = "Y14_1213_A_R"
init_size=10
pass
class ClusteringBeta:
    def __init__(self):
        self.hierarchy, self.data_df = None, None
        self.cluster_df = None
        self.load_hierarchy()
        self.load_sentence_data()
        self.load_cluster_data()

    def load_hierarchy(self, setting=init_setting):
        with open("data/{}_counter_hierarchy.pkl".format(setting), "rb") as f:
            self.hierarchy = pickle.load(f)

    def load_sentence_data(self, setting=init_setting):
        self.data_df = pd.read_pickle("data/{}_counter_data.xz.pkl".format(setting), compression="xz")
    
    def load_cluster_data(self, setting=init_setting, size=init_size):
        self.cluster_df = pd.read_pickle("data/figure/{}/{}_counter_cluster.pkl".format(size, setting))

    def fcluster(self, size):
        # clustering
        # cluster = fcluster(self.hierarchy, t=size, criterion="maxclust")
        cluster = self.cluster_list[size - 2]
        print(cluster)

        # generate dendrogram
        # self.dump_dendrogram(size)

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
