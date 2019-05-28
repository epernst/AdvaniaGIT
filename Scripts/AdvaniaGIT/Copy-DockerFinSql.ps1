﻿Function Copy-DockerFinSql {
    param(
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$SetupParameters,
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$BranchSettings
    )
    Invoke-ScriptInNavContainer -containerName $BranchSettings.dockerContainerName -ScriptBlock {
        param([String]$LogFolder)        
        Write-Host "Copying RoleTailored Client to Host Computer..."
        $Source = "C:\Program Files (x86)\Microsoft Dynamics NAV\*\RoleTailored Client"
        $Destination = Join-Path "C:\Host\Log" $LogFolder
        Copy-Item -Path $Source -Destination $Destination -Recurse -Force
    } -ArgumentList (Split-Path $SetupParameters.LogPath -Leaf)
}
        