#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
vrg2timeseries.py, SERVIR-Mekong (2017-07-26)

Downloads data from SERVIR-Mekong's Virtual Rain and Stream Gauge (VRSG) (vrsg-servir.adpc.net)
and calculates a time series of the daily data over an area
______________________________________________________________________


Usage
------

$ python vrg2timeseries.py {options}

{options} include:

--idate (-i)      : required 
                  : start date of the time series
                  : in format YYYY-MM-DD

--edate (-e)      : required 
                  : end date of the time series
                  : in format YYYY-MM-DD

--product (-p)    : required
                  : precipitation product to create the time series for
                  : options are TRMM or TRMM

--directory (-d)  : aerosol profile to use (default = Continental), for options see..
                  : https://github.com/robintw/Py6S/blob/master/Py6S/Params/aeroprofile.py

--shapefile       : defines parameter space of input variables (default = test)
                  : options are: test, test2, validation and full
                  : ! MUST use full to build functioning LUT but this can take hours !

Example Usage
-------------

1) create a time series from TRMM

  $ python vrg2timeseries.py -p TRMM -i 2017-01-01 -e 2017-01-31

2) create a time series from TRMM over specific region

  $ python vrg2timeseries.py -p TRMM -i 2017-01-01 -e 2017-01-31 -s ./test.shp

3) create a time series from TRMM in specific directory

  $ python vrg2timeseries.py -p TRMM -i 2017-01-01 -e 2017-01-31 -d ./Users/user/Desktop/
  
4) create a time series from TRMM over specific region an into specific directory

  $ python vrg2timeseries.py -p TRMM -i 2017-01-01 -e 2017-01-31 -s ./test.shp -d ./Users/user/Desktop/

"""

from __future__ import division,print_function
import os
import sys
import glob
import argparse
import ftplib
import datetime
import netCDF4
import numpy as np
import pandas as pd
from time import sleep
from osgeo import gdal,osr,ogr
import matplotlib.pyplot as plt


# Print iterations progress
def printProgressBar (iteration, total, prefix = '', suffix = '', decimals = 1, length = 100, fill = '█'):
    """
    Call in a loop to create terminal progress bar
    @params:
        iteration   - Required  : current iteration (Int)
        total       - Required  : total iterations (Int)
        prefix      - Optional  : prefix string (Str)
        suffix      - Optional  : suffix string (Str)
        decimals    - Optional  : positive number of decimals in percent complete (Int)
        length      - Optional  : character length of bar (Int)
        fill        - Optional  : bar fill character (Str)
    """
    percent = ("{0:." + str(decimals) + "f}").format(100 * (iteration / float(total)))
    filledLength = int(length * iteration // total)
    bar = fill * filledLength + '-' * (length - filledLength)
    sys.stdout.write('\r%s |%s| %s%% %s\r' % (prefix, bar, percent, suffix))
    # Print New Line on Complete
    if iteration == total: 
        print()
        
    return
    

class vrg2ts(object):
    
    def __init__(self,directory,product,shapefile,iniTime,endTime):
        self.directory = directory
        self.product = product
        self.shapefile = shapefile
        self.iniTime = iniTime
        self.endTime = endTime
        
        stime = iniTime.split('-')
        etime = endTime.split('-')
        
        self.syr = stime[0]
        self.smon = stime[1]
        self.sday = stime[2]
        self.eyr = etime[0]
        self.emon = etime[1]
        self.eday = etime[2]
        
        
        
    def getPrecip(self):
        ftpUrl = '58.137.55.93'
		
        
        t1 = datetime.date(int(self.syr),int(self.smon),int(self.sday))
        t2 = datetime.date(int(self.eyr),int(self.emon),int(self.eday))
        
        offSet = t2 - t1
        
        n_iter = offSet.days+1
        
        datadir = self.directory+'data/'+self.product+'/'
        
        if os.path.exists(self.directory+'data/') == False:
            os.mkdir(self.directory+'data/')
        
        if os.path.exists(datadir) == False:
            os.mkdir(datadir)
            
        ftp = ftplib.FTP(ftpUrl)
        ftp.login('downloader','Down0000')
        
        for i in range(n_iter):
            
            now = t1 + datetime.timedelta(i)
        
            if self.product == 'GTRMM':
                ftpDir = '/VRG/TRMM/DAILY_STD/MM/{0}/{1:02d}/'.format(now.year,now.month)
                ftpFile = 'MM_TRMM_gauge.{0}{1:02d}{2:02d}.0.1d.daily.00Z-23Z.v7.1002.0.nc'.format(now.year,now.month,now.day)
                ftpPath = ftpDir + ftpFile
            else:
                ftpDir = '/VRG/TRMM/RT_DAILY/MM/'.format(now.year,now.month)
                ftpFile = 'MM_3B42RT_daily.{0}.{1:02d}.{2:02d}.7.nc'.format(now.year,now.month,now.day)
                ftpPath = ftpDir + ftpFile
                
            if os.path.exists(datadir+ftpFile) == False:
                try:
                    with open(datadir+ftpFile, 'wb') as outfile:
                        ftp.retrbinary("RETR " + ftpPath, outfile.write)
                except:
                    pass
            
            sleep(0.1)
            printProgressBar(i + 1, n_iter, prefix='Download Progress:', suffix='Complete', length=40)
            
        ftp.quit()
            
        return
    
    def makeTimeSeries(self):
        
        datadir = self.directory+'data/'+self.product+'/'
        
        t1 = datetime.date(int(self.syr),int(self.smon),int(self.sday))
        t2 = datetime.date(int(self.eyr),int(self.emon),int(self.eday))
        
        offSet = t2 - t1
        
        n_iter = offSet.days+1
        
        ts = np.zeros([n_iter])
        
        for i in range(n_iter):
            now = t1 + datetime.timedelta(i)
            ncs = datadir + 'MM_3B42RT_daily.{0}.{1:02d}.{2:02d}.7.nc'.format(now.year,now.month,now.day)
            print(ncs)

            try:
                nc = netCDF4.Dataset(ncs,'r')
            
                if self.product == 'GTRMM':
                    pr_var = nc.variables['precip']
                    precip  = pr_var[0,:,:]
                    noData = pr_var.missing_value
                else:
                    pr_var = nc.variables['precipitation']
                    precip  = pr_var[0,:,:]
                    noData = pr_var.missing_value
                
                precip = np.swapaxes(precip,0,1)
                #precip = np.flipud(precip)
                precip = np.ma.masked_where(precip==noData,precip)
                
                if self.shapefile != None:
                
                    if i == 0:
                        lons = nc.variables['lon']
                        lats = nc.variables['lat']
                        mask = self.makeMask(lons[:],lats[:],0.25)
                    
                    precip = np.ma.masked_where(mask==0,precip)
                
                ts[i] = np.nanmean(precip)
                #ts[i] = np.nansum(precip)
            
                nc.close()

            except:
                ts[i] = -9999
                
            sleep(0.1)
            printProgressBar(i + 1, n_iter, prefix='Time Series Progress:', suffix='Complete', length=40)
            
        print(self.directory)
        outfile = self.directory + 'vrg_timeseries_{0}_{1}.csv'.format(t1.strftime("%Y-%m-%d").replace('-',''),t2.strftime("%Y-%m-%d").replace('-',''))
        
        dates = pd.date_range(t1, t2, freq='D')
        print(dates.size,ts.size)
        p_series = pd.Series(ts, index=dates)
        
        df = pd.DataFrame(p_series)
        df.index.name = 'Date'
        df.columns = ['Precipitation']
        df.to_csv(outfile)        
            
        return
    
    def makeMask(self,lon,lat,res):

        print('making mask...')
        
        source_ds = ogr.Open(self.shapefile)
        source_layer = source_ds.GetLayer()
        
         # Create high res raster in memory
        mem_ds = gdal.GetDriverByName('MEM').Create('', lon.size, lat.size, gdal.GDT_Byte)
        mem_ds.SetGeoTransform((lon.min(), res, 0, lat.max(), 0, -res))
        band = mem_ds.GetRasterBand(1)
        
        # Rasterize shapefile to grid
        gdal.RasterizeLayer(mem_ds, [1], source_layer, burn_values=[1])
        
        # Get rasterized shapefile as numpy array
        array = band.ReadAsArray()
        
        plt.imshow(array)
        plt.savefig(self.directory+'extract_region.png')
        
        # Flush memory file
        mem_ds = None
        band = None
        
        return array

def main():
    parser = argparse.ArgumentParser(description="Download netCDF data from SERVIR Mekong's Virtual Rain and \
                                     and Stream Gauge tool and convert it to a time series")
    
    parser.add_argument('--idate','-i', type=str,required=True,
                        help="Start date to download data and process time series in format 'YYYY-MM-DD'")
    parser.add_argument('--edate','-e', type=str,required=True,
                        help="End date to download data and process time series in format 'YYYY-MM-DD'")
    parser.add_argument('--product','-p',choices=['TRMM','GTRMM'],required=True,
                        help='VRSG product to create time series from')
    parser.add_argument('--directory','-d',type=str,
                        help='Folder directory to store the downloaded netCDF data')
    parser.add_argument('--shapefile','-s',type=str,
                        help='Shapefile to extract the time series for')
    
    args = parser.parse_args()
    
    if args.directory == None:
        print('No directory was given for output data...\nUsing current working directory:{}\n'.format(os.getcwd()))
        args.directory = os.getcwd()+'/'
        
    if args.shapefile == None:
        print('No shapefile was given for spatial averaging...\nUsing entire raster area\n')
        
    if args.product not in ['TRMM','GTRMM']:
        print('Product type not recognized: {0}\nPlease select either TRMM or TRMM',format(args.product))
        sys.exit()
    
    vrgts = vrg2ts(args.directory,args.product,args.shapefile,args.idate,args.edate)
    
    vrgts.getPrecip()
    vrgts.makeTimeSeries()
        
    return
    
if __name__ == "__main__":
    main()
