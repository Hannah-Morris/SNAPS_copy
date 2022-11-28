# SNAPS (Simple NMR Assignments from Predicted Shifts)

## What is it?
SNAPS is a tool for using chemical shift predictions to help assign protein NMR spectra. SNAPS is currently under development, and has not been fully tested, so I can't currently make any promises about its accuracy (or functionality!).

## How it works
SNAPS assumes you have a list of observed chemical shifts for a protein, and a set of predicted chemical shifts for the same protein. The observed chemical shifts should come from 3D experiments (currently HNCO, HN(CA)CO, HNCA, HN(CO)CA, HNCACB and HN(CO)CACB are understood), and be grouped into spin systems. The chemical shift predictions can be generated from 3d protein structures using tools like SHIFTX2 (http://www.shiftx2.ca) or Sparta+ (https://spin.niddk.nih.gov/bax/nmrserver/sparta/). 

SNAPS will calculate the likelihood for each spin system matching with the predictions for each residue, and then assigns the spectrum to have the makimum likelihood overall. SNAPS can also check whether sequential assignments are consistent, and calculate the 2nd, 3rd most likely assignment. Finally, SNAPS can generate a form of strip plot to identify which areas are consistent, and which need more work.

Note that SNAPS does not directly use sequential connectivity information from the observed data to generate its assignment, unlike other automated assignment methods (although it does compare observed i-1 shifts to the predicted i-1 shifts). These means it can be used even if sequential data is missing, although it will have reduced accuracy.

## Does it work?
On a test set of 61 proteins (based on the set used to test SHIFTX2 - available from SHIFTX2 website), SNAPS was able to correctly assign 88% of spin systems, ranging between 65% and 100%. The correct assignment was within the top 3 assignment possibilities generated by SNAPS 95% of the time. Admittedly this is under ideal conditions, with largely complete sets of CA, CB, CO and HA chemical shifts, and with predictions from high resolution structures. Under more 'normal' conditions, it will likely perform less well. I envisage it being used as a way of speeding up assignment of the easy parts of the protein, with the user manually clearing up any problem regions. More data available soon!

## Python libraries required
numpy, scipy, plotnine, bokeh, pandas, Bio, sortedcontainers

## Example usage
To match observed chemical shifts with predicted ones, go to the top level directory and run something like:
python python/SNAPS.py shifts data/P3a_L273R/ccpn_shifts.txt output/test_output.txt --shift_type ccpn --pred_file data/P3a_L273R/shiftx2.cs --pred_type shiftx2 -c config/config.txt -l output/log.txt

Hopefully there will eventually be a better interface for doing this!
