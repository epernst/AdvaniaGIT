﻿function Create-NAVDatabaseBackup
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$SetupParameters,
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [PSObject]$BranchSettings,
        [Parameter(Mandatory=$False, ValueFromPipelineByPropertyname=$true)]
        [String]$BackupFilePath
    )
    $TempBackupFilePath = Join-Path $SetupParameters.LogPath "NAVBackup.bak"
    $command = "select @@version as [Version]"
    $result = Get-SQLCommandResult -Server (Get-DatabaseServer -BranchSettings $BranchSettings) -Database $BranchSettings.databaseName -Command $command -Username $SetupParameters.SqlUsername -Password $SetupParameters.SqlPassword
    if ($result.Version -imatch 'Express') {
        $command = "BACKUP DATABASE [$($BranchSettings.databaseName)] TO DISK = N'$TempBackupFilePath' WITH COPY_ONLY, NOFORMAT, INIT, NAME = N'NAVAPP_QA_MT-Full Database Backup', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
    } else {
        $command = "BACKUP DATABASE [$($BranchSettings.databaseName)] TO DISK = N'$TempBackupFilePath' WITH COPY_ONLY, COMPRESSION, NOFORMAT, INIT, NAME = N'NAVAPP_QA_MT-Full Database Backup', SKIP, NOREWIND, NOUNLOAD, STATS = 10"
    }
    Get-SQLCommandResult -Server (Get-DatabaseServer -BranchSettings $BranchSettings) -Database master -Command $command -CommandTimeout 30000 -Username $SetupParameters.SqlUsername -Password $SetupParameters.SqlPassword | Out-Null
    if (!$BackupFilePath) { $BackupFilePath = Join-Path $SetupParameters.BackupPath "$($SetupParameters.navRelease)-$($SetupParameters.projectName).bak" }
    if (!(Test-Path $TempBackupFilePath)) { Throw "Failed to create backup" }
    Move-Item -Path $TempBackupFilePath -Destination $BackupFilePath -Force    
    Write-Host "Backup $BackupFilePath Created..."
}
    