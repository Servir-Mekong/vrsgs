from importlib.resources import path
import os
import ftplib

def get_download_folder():
    home = os.path.expanduser("~")
    return os.path.join(home, "Downloads")

def ftpDownloadLink():
    FTP_URL = '203.146.112.250'
    USER = 'cccrm'
    PWD = '@dpc0000'

    ftp = ftplib.FTP(FTP_URL)
    ftp.login(USER, PWD)
    path = 'Download/VRG/IMERG/30MIN_EARLY/2022/272/KH'
    ftp.cwd(path)
    file = 'KH_3B-HHR-E.MS.MRG.3IMERG.20220929-S000000-E002959.0000.V05B.nc'
    download_path = get_download_folder()
    
    with open(download_path+file, 'wb') as fp:
        ftp.retrbinary('RETR ' +file, fp.write)


# ftpDownloadLink()

# python manage.py shell < ./mapviewer/core.py