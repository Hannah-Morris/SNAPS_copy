# -*- coding: utf-8 -*-
"""
Test how effective NAPS is at assigning with simulated predicted shifts, 
generated by adding Gaussian noise to the real shifts

@author: Alex
"""

import pandas as pd
from NAPS_importer import NAPS_importer
from NAPS_assigner import NAPS_assigner
from pathlib import Path

path = Path("..")

# Import metadata on the test datasets
testset_df = pd.read_table(path/"data/testset/testset.txt", header=None, 
                           names=["ID","PDB","BMRB","Resolution","Length"])
testset_df["obs_file"] = [path/x for x in "data/testset/simplified_BMRB/"+testset_df["BMRB"].astype(str)+".txt"]
testset_df["preds_file"] = [path/x for x in "data/testset/shiftx2_results/"+testset_df["ID"]+"_"+testset_df["PDB"]+".cs"]
testset_df["out_name"] = testset_df["ID"]+"_"+testset_df["BMRB"].astype(str)
testset_df.index = testset_df["ID"]

#%% 
a = NAPS_assigner()

a.read_config_file(path/"config/config.txt")


# Import observed and (simulated) predicted shifts
importer = NAPS_importer()
importer.import_testset_shifts(path/"data/testset/simplified_BMRB/6338.txt")
    
a.obs = importer.obs

a.import_pred_shifts(path/"data/testset/shiftx2_results/A002_1XMTA.cs", "shiftx2")

sim_pred_sd = {"H":0.1711, "N":1.1169, "HA":0.1231, "C":0.5330, "CA":0.4412, "CB":0.5163}
#{"C":1,"CA":1,"CB":1,"H":10,"N":10,"HA":10}


sim_preds = a.simulate_pred_shifts(path/"data/testset/simplified_BMRB/6338.txt", sim_pred_sd)

#%% Try doing the assignment
a.add_dummy_rows()
a.calc_log_prob_matrix2(sf=1, verbose=False)
matching = a.find_best_assignments()
a.make_assign_df(matching, set_assign_df=True)
assign_df = a.check_assignment_consistency(threshold=0.1)

sum((assign_df["Res_name"]==assign_df["SS_name"]))