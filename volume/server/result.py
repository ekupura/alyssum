import pickle
import sys
import pandas as pd
import numpy as np
from tqdm import tqdm
from scipy.cluster.hierarchy import *


class ClusteringResult:
    def __init__(self):
        self.cluster_df, self.data_df = None, None
        self.load_clustering_result(term="A", mask=False)
        self.load_sentence_data(term="A")

    def load_clustering_result(self, question="Y14_1213", term="A", mask=False):
        if mask:
            self.cluster_df = pd.read_pickle("data/{}_analytic_high_masked_{}.xz.pkl".format(question, term), compression="xz")
        else:
            self.cluster_df = pd.read_pickle("data/{}_analytic_high_cluster_{}.xz.pkl".format(question, term), compression="xz")

    def load_sentence_data(self, question="Y14_1213", term="A"):
        self.data_df = pd.read_pickle("data/{}_analytic_high_data_{}.xz.pkl".format(question, term), compression="xz")

    def do_query(self, cluster_size):
        select_df = self.cluster_df[self.cluster_df["Size"] == cluster_size]
        # select_df = select_df[select_df["Number"] == cluster_number]
        return pd.merge(select_df, self.data_df, on="Idx")


class ClusteringBeta:
    def __init__(self):
        self.hierarchy, self.data_df = None, None
        self.load_hierarchy()
        self.load_sentence_data()

    def load_hierarchy(self, question="Y14_1213", term="A", mask=False):
        with open("data/{}_analytic_high_hierarchy_{}.pkl".format(question, term), "rb") as f:
            self.hierarchy = pickle.load(f)

    def load_sentence_data(self, question="Y14_1213", term="A"):
        self.data_df = pd.read_pickle("data/{}_analytic_high_data_{}.xz.pkl".format(question, term), compression="xz")

    def fcluster(self, distance):
        cluster = fcluster(self.hierarchy, t=distance, criterion="distance")
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
        pass
