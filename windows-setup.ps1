Clear-Host;
$path = [Environment]::GetFolderPath("MyDocuments");
Write-Host "Directorio de instalacion: $path";
Start-Sleep -Seconds 3

Set-Location $path
git clone https://github.com/Alopezfu/youtube-mp3.git
Set-Location youtube-mp3
Clear-Host;
Write-Host "Instalando dependencias..."
Start-Sleep -Seconds 3
npm install
npm i pm2 --global

Clear-Host;
Write-Host "Añadiendo al inicio de Windows..."
Start-Sleep -Seconds 3

cd $env:APPDATA"\Microsoft\Windows\Start Menu\Programs\Startup\"
Add-Content -Path youtube-mp3.cmd -Value 'cd %USERPROFILE%\Documents\youtube-mp3
start /min cmd /c "pm2 start app.js"';
