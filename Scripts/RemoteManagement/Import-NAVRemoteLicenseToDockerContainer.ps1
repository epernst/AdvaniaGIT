﻿Function Import-NAVRemoteLicenseToDockerContainer
{
    param(
        [Parameter(Mandatory=$True, ValueFromPipelineByPropertyname=$true)]
        [System.Management.Automation.Runspaces.PSSession]$Session,
        [parameter(Mandatory=$true)]
        [String]$LicenseFile
    )

    Invoke-Command -Session $Session -ScriptBlock `
    {
        param([String]$LicenseFile)
        $LicenseFileName = (Get-Item -Path $LicenseFile).Name

        Invoke-ScriptInNavContainer -containerName $BranchSettings.dockerContainerName-ScriptBlock `
        {
            param([String]$LicenseFileName)           
            $LicenseFilePath = Join-Path "C:\GIT" $LicenseFileName
            Import-Module AdvaniaGIT | Out-Null
            $SetupParameters = Get-GITSettings
            $BranchSettings = Get-BranchSettings -SetupParameters $SetupParameters
            Load-InstanceAdminTools -SetupParameters $SetupParameters
            Update-NAVLicense -BranchSettings $BranchSettings -LicenseFilePath $LicenseFilePath
            UnLoad-InstanceAdminTools
        } -ArgumentList $LicenseFileName
    } -ArgumentList $LicenseFile
}