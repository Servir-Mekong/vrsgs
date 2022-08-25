import xarray as xr
import os

netcdf_file = '/home/asus/Desktop/servir/vrsgs/vrsgs/static/data/IMERG/KH_3B-HHR-E.MS.MRG.3IMERG.20220706-S033000-E035959.0210.V05B.nc'

ds = xr.open_dataset(netcdf_file)
df = ds.to_dataframe()

df.to_csv("/home/asus/Desktop/servir/vrsgs/vrsgs/static/data/test.csv")

# python3 /home/asus/Desktop/servir/vrsgs/vrsgs/scripts/netcdf_to_csv.py