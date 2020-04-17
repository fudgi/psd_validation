echo %0
mkdir C:\psdvalid
copy "psdvalid.exe" "C:/psdvalid/"
rem  set __COMPAT_LAYER=RunAsInvoker  
REGEDIT.EXE  /S  "%~dp0\psdvalid.reg"