﻿
if ($BranchSettings.dockerContainerId -gt "") {
    Invoke-ScriptInNavContainer -containerName $BranchSettings.dockerContainerName -ScriptBlock {
        param([string]$ServerInstance)
        $CompanyName = (Get-NAVCompany $ServerInstance)[0]
        if ($CompanyName -cnotmatch "CRONUS") {
            Write-Host "Renaming compnany ${CompanyName} to CRONUS ${CompanyName}..."
            Rename-NAVCompany -CompanyName $CompanyName -NewCompanyName "CRONUS ${CompanyName}" -ServerInstance $ServerInstance -Force
        }            
    } -ArgumentList $BranchSettings.instanceName

} else {    
    Load-InstanceAdminTools -SetupParameters $SetupParameters 
    $CompanyName = (Get-NAVCompany $BranchSettings.instanceName)[0]
    if ($CompanyName -cnotmatch "CRONUS") {
        Write-Host "Renaming compnany ${CompanyName} to CRONUS ${CompanyName}..."
        Rename-NAVCompany -CompanyName $CompanyName -NewCompanyName "CRONUS ${CompanyName}" -ServerInstance $BranchSettings.instanceName -Force
    }            
}
