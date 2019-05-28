﻿if (Test-Path $SetupParameters.SigToolExecutable) {
    Copy-MissingNAVSipToHost -BranchSettings $BranchSettings

    $appPackageFileNames = Get-ChildItem -Path (Join-Path $SetupParameters.repository Artifacts) -Filter "*.app"
    foreach ($appPackageFileName in $appPackageFileNames) {
        if (Test-Path $SetupParameters.CodeSigningCertificate) {
          Write-Host "Signing APP package $($appPackageFileName.Name)..."
          & $($SetupParameters.SigToolExecutable) sign /t http://timestamp.verisign.com/scripts/timestamp.dll /f "$($SetupParameters.CodeSigningCertificate)" /p "$($SetupParameters.CodeSigningCertificatePassword)" "$($appPackageFileName.FullName)"
        }
        else
        {
            Write-Host -ForegroundColor Red "Code Signing Certificate not configured in GITSettings.json!"
        }
    }
}