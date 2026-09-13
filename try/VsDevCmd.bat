@echo off
setlocal enabledelayedexpansion

set vswhere="C:/Program Files (x86)/Microsoft Visual Studio/Installer/vswhere.exe"
for /f "usebackq tokens=*" %%i in (
  `%vswhere% -products Microsoft.VisualStudio.Product.BuildTools -latest -property installationPath`
) do %comspec% /k "%%i/Common7/Tools/VsDevCmd.bat"
